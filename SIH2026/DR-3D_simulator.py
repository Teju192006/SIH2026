# 3D Diabetic Retinopathy Eye Simulator
# Educational visualization — not a medical diagnostic tool
# Run: pip install plotly numpy
# Then: python DR-3D_simulator.py

import tkinter as tk
from tkinter import ttk
import webbrowser
import tempfile
import os

import numpy as np
import plotly.graph_objects as go

# ---------------------------------------------------------------------------
# Geometry helpers
# ---------------------------------------------------------------------------

def sphere_mesh(n_lat=48, n_lon=96, radius=1.0):
    lat = np.linspace(0, np.pi, n_lat)
    lon = np.linspace(0, 2 * np.pi, n_lon)
    lon, lat = np.meshgrid(lon, lat)
    x = radius * np.sin(lat) * np.cos(lon)
    y = radius * np.sin(lat) * np.sin(lon)
    z = radius * np.cos(lat)
    return x, y, z


def sph_to_cart(theta, phi, r=1.0):
    """theta: polar [0, pi], phi: azimuth [0, 2pi]"""
    x = r * np.sin(theta) * np.cos(phi)
    y = r * np.sin(theta) * np.sin(phi)
    z = r * np.cos(theta)
    return x, y, z


def great_circle_arc(p0, p1, n=24, r=1.002):
    """Short geodesic on sphere between two unit vectors."""
    a = np.array(p0, dtype=float)
    b = np.array(p1, dtype=float)
    a /= np.linalg.norm(a)
    b /= np.linalg.norm(b)
    dot = np.clip(np.dot(a, b), -1.0, 1.0)
    omega = np.arccos(dot)
    if omega < 1e-6:
        return np.stack([a * r] * n)
    t = np.linspace(0, 1, n)[:, None]
    pts = (np.sin((1 - t) * omega) * a + np.sin(t * omega) * b) / np.sin(omega)
    pts *= r
    return pts


def rand_on_retina(rng, n, avoid_disc=True, disc_center=None, disc_cos=0.92):
    """Uniform-ish points on anterior/posterior retina hemisphere facing camera."""
    pts = []
    while len(pts) < n:
        u = rng.uniform(-1, 1)
        phi = rng.uniform(0, 2 * np.pi)
        z = u
        rxy = np.sqrt(max(1.0 - z * z, 0.0))
        x = rxy * np.cos(phi)
        y = rxy * np.sin(phi)
        p = np.array([x, y, z])
        if p[0] < -0.15:
            continue
        if avoid_disc and disc_center is not None:
            if np.dot(p, disc_center) > disc_cos:
                continue
        pts.append(p)
    return np.array(pts)


# ---------------------------------------------------------------------------
# Anatomical landmarks (unit sphere, optical axis +X)
# ---------------------------------------------------------------------------

OPTIC_DISC = np.array([0.72, 0.38, 0.18])
OPTIC_DISC = OPTIC_DISC / np.linalg.norm(OPTIC_DISC)
MACULA = np.array([0.98, -0.12, 0.05])
MACULA = MACULA / np.linalg.norm(MACULA)


def vessel_tree():
    """Hand-authored + branched vessel skeleton on the sphere."""
    targets = [
        np.array([0.55, 0.75, 0.35]),
        np.array([0.50, 0.70, -0.40]),
        np.array([0.60, -0.20, 0.75]),
        np.array([0.58, -0.55, 0.40]),
        np.array([0.62, -0.50, -0.55]),
        np.array([0.48, 0.15, -0.85]),
        np.array([0.85, 0.40, -0.25]),
        np.array([0.88, -0.35, 0.20]),
    ]
    branches = []
    for t in targets:
        t = t / np.linalg.norm(t)
        branches.append((OPTIC_DISC, t))
        for k in range(2):
            jitter = np.array([
                0.05,
                0.35 * np.cos(k * 2.1 + t[1] * 4),
                0.35 * np.sin(k * 1.7 + t[2] * 3),
            ])
            t2 = t + jitter
            t2 = t2 / np.linalg.norm(t2)
            mid = (OPTIC_DISC * 0.25 + t * 0.75)
            mid = mid / np.linalg.norm(mid)
            branches.append((mid, t2))
    return branches


# ---------------------------------------------------------------------------
# Stage metadata
# ---------------------------------------------------------------------------

STAGE_META = {
    0: {
        "name": "Healthy Retina",
        "icdrs": "No apparent DR",
        "notes": "Clear media. Optic disc and macula visible. No microaneurysms or hemorrhages.",
        "ma": 0, "blot": 0, "exudate": 0, "cws": 0, "nve": 0,
        "vessel_widen": 1.0,
    },
    1: {
        "name": "Mild NPDR",
        "icdrs": "Mild non-proliferative diabetic retinopathy",
        "notes": "Microaneurysms only. Earliest clinically visible lesion of DR.",
        "ma": 22, "blot": 0, "exudate": 0, "cws": 0, "nve": 0,
        "vessel_widen": 1.05,
    },
    2: {
        "name": "Moderate NPDR",
        "icdrs": "Moderate non-proliferative diabetic retinopathy",
        "notes": "More than just microaneurysms: dot/blot hemorrhages, possible hard exudates.",
        "ma": 40, "blot": 18, "exudate": 12, "cws": 3, "nve": 0,
        "vessel_widen": 1.18,
    },
    3: {
        "name": "Severe NPDR",
        "icdrs": "Severe non-proliferative diabetic retinopathy (4-2-1 rule territory)",
        "notes": "Extensive hemorrhages, venous beading appearance, cotton-wool spots. High risk of progression to PDR.",
        "ma": 55, "blot": 36, "exudate": 22, "cws": 10, "nve": 0,
        "vessel_widen": 1.35,
    },
    4: {
        "name": "Proliferative DR (schematic)",
        "icdrs": "Proliferative diabetic retinopathy (educational schematic)",
        "notes": "Neovascular fronds near disc/arcades (drawn schematically). Not a clinical photo substitute.",
        "ma": 50, "blot": 42, "exudate": 18, "cws": 12, "nve": 8,
        "vessel_widen": 1.45,
    },
}


# ---------------------------------------------------------------------------
# Figure builder  (identical logic to the original)
# ---------------------------------------------------------------------------

def build_figure(severity: int, show_sclera: bool, seed: int):
    severity = int(np.clip(severity, 0, 4))
    meta = STAGE_META[severity]
    rng = np.random.default_rng(int(seed))

    fig = go.Figure()

    # Globe (inner retina tint)
    xs, ys, zs = sphere_mesh(42, 84, 1.0)
    fig.add_trace(go.Surface(
        x=xs, y=ys, z=zs,
        colorscale=[
            [0.0, "#4a1010"],
            [0.45, "#7a1c1c"],
            [0.75, "#9a2a22"],
            [1.0, "#c45a3a"],
        ],
        showscale=False,
        opacity=0.92,
        lighting=dict(ambient=0.55, diffuse=0.7, specular=0.25, roughness=0.6),
        lightposition=dict(x=1.6, y=0.4, z=0.8),
        hoverinfo="skip",
        name="Retina",
    ))

    if show_sclera:
        xo, yo, zo = sphere_mesh(24, 48, 1.08)
        fig.add_trace(go.Surface(
            x=xo, y=yo, z=zo,
            colorscale=[[0, "#e8e0d4"], [1, "#d4c4b0"]],
            showscale=False,
            opacity=0.12,
            hoverinfo="skip",
            name="Sclera ghost",
        ))

    # Optic disc
    disc_pts = []
    for _ in range(280):
        n = rng.normal(size=3)
        n = n / np.linalg.norm(n)
        p = OPTIC_DISC + 0.07 * n
        p = p / np.linalg.norm(p) * 1.012
        disc_pts.append(p)
    disc_pts = np.array(disc_pts)
    fig.add_trace(go.Scatter3d(
        x=disc_pts[:, 0], y=disc_pts[:, 1], z=disc_pts[:, 2],
        mode="markers",
        marker=dict(size=3.2, color="#e8a020", opacity=0.85),
        name="Optic disc",
        hovertemplate="Optic disc<extra></extra>",
    ))

    # Macula / fovea
    mac_pts = []
    for _ in range(90):
        n = rng.normal(size=3) * 0.035
        p = MACULA + n
        p = p / np.linalg.norm(p) * 1.01
        mac_pts.append(p)
    mac_pts = np.array(mac_pts)
    fig.add_trace(go.Scatter3d(
        x=mac_pts[:, 0], y=mac_pts[:, 1], z=mac_pts[:, 2],
        mode="markers",
        marker=dict(size=2.4, color="#5a1010", opacity=0.7),
        name="Macula",
        hovertemplate="Macula / foveal region<extra></extra>",
    ))

    # Vessels
    widen = meta["vessel_widen"]
    for a, b in vessel_tree():
        a = a / np.linalg.norm(a)
        b = b / np.linalg.norm(b)
        arc = great_circle_arc(a, b, n=28, r=1.015)
        fig.add_trace(go.Scatter3d(
            x=arc[:, 0], y=arc[:, 1], z=arc[:, 2],
            mode="lines",
            line=dict(color="#6b0b0b", width=4.5 * widen),
            hoverinfo="skip",
            showlegend=False,
        ))

    def sprinkle(n, size_lo, size_hi, color, name, hover, r=1.02):
        if n <= 0:
            return
        pts = rand_on_retina(rng, n, disc_center=OPTIC_DISC)
        pts = pts * r
        fig.add_trace(go.Scatter3d(
            x=pts[:, 0], y=pts[:, 1], z=pts[:, 2],
            mode="markers",
            marker=dict(
                size=rng.uniform(size_lo, size_hi, size=n),
                color=color,
                opacity=0.88,
                line=dict(width=0),
            ),
            name=name,
            hovertemplate=hover + "<extra></extra>",
        ))

    sprinkle(meta["ma"],     2.0,  4.5,  "#120808", "Microaneurysms",       "Microaneurysm")
    sprinkle(meta["blot"],   5.0, 10.0,  "#4a0000", "Dot/blot hemorrhages", "Hemorrhage")
    sprinkle(meta["exudate"],3.5,  6.5,  "#f0d060", "Hard exudates",        "Hard exudate")
    sprinkle(meta["cws"],    6.0,  9.0,  "#f5f0e6", "Cotton-wool spots",    "Cotton-wool spot")

    # Schematic neovascular tufts (PDR only)
    if meta["nve"] > 0:
        for i in range(meta["nve"]):
            base = OPTIC_DISC if i < 3 else rand_on_retina(rng, 1, disc_center=None)[0]
            frond = []
            for k in range(7):
                jitter = rng.normal(size=3) * 0.06
                p = base + jitter + np.array([0.04, 0, 0])
                p = p / np.linalg.norm(p) * 1.03
                frond.append(p)
            frond = np.array(frond)
            fig.add_trace(go.Scatter3d(
                x=frond[:, 0], y=frond[:, 1], z=frond[:, 2],
                mode="markers+lines",
                marker=dict(size=3, color="#8b0000"),
                line=dict(color="#aa2020", width=2),
                name="NVE/NVD schematic" if i == 0 else None,
                showlegend=(i == 0),
                hovertemplate="Schematic neovascular frond<extra></extra>",
            ))

    fig.update_layout(
        title=dict(
            text=f"<b>{meta['name']}</b><br><sup>{meta['icdrs']}</sup>",
            x=0.5,
            font=dict(size=18, color="#f2e8dc"),
        ),
        scene=dict(
            xaxis=dict(visible=False),
            yaxis=dict(visible=False),
            zaxis=dict(visible=False),
            aspectmode="data",
            bgcolor="#0b0708",
            camera=dict(
                eye=dict(x=1.85, y=0.35, z=0.25),
                up=dict(x=0, y=0, z=1),
            ),
        ),
        paper_bgcolor="#12090a",
        plot_bgcolor="#12090a",
        font=dict(color="#f2e8dc", family="Inter, Segoe UI, sans-serif"),
        legend=dict(
            bgcolor="rgba(20,10,10,0.65)",
            bordercolor="#5a3030",
            borderwidth=1,
            font=dict(size=11),
        ),
        margin=dict(l=0, r=0, t=70, b=0),
        height=720,
    )
    return fig, meta


# ---------------------------------------------------------------------------
# Render: save to a temp HTML file and open in default browser
# ---------------------------------------------------------------------------

_tmp_file = None   # keep reference so it isn't cleaned up too early

def render_in_browser(severity, show_sclera, seed):
    global _tmp_file
    fig, meta = build_figure(severity, show_sclera, seed)

    # Build stage notes as plain HTML
    notes_html = f"""
    <div style="font-family:Inter,sans-serif;color:#f2e8dc;background:#12090a;
                padding:18px 24px;border-top:1px solid #3a1818;">
      <h3 style="margin:0 0 6px;color:#e8a020">{meta['name']}</h3>
      <p style="margin:0 0 4px;font-size:13px;color:#c09070">
        <strong>ICDRSS:</strong> {meta['icdrs']}
      </p>
      <p style="margin:0 0 12px;font-size:13px">{meta['notes']}</p>
      <table style="border-collapse:collapse;font-size:12px;color:#d4b0a0">
        <tr><th style="text-align:left;padding:3px 14px 3px 0;border-bottom:1px solid #5a3030">Lesion (schematic)</th>
            <th style="text-align:right;padding:3px 0;border-bottom:1px solid #5a3030">Count</th></tr>
        <tr><td style="padding:3px 14px 3px 0">Microaneurysms</td>        <td style="text-align:right">{meta['ma']}</td></tr>
        <tr><td style="padding:3px 14px 3px 0">Hemorrhages</td>           <td style="text-align:right">{meta['blot']}</td></tr>
        <tr><td style="padding:3px 14px 3px 0">Hard exudates</td>         <td style="text-align:right">{meta['exudate']}</td></tr>
        <tr><td style="padding:3px 14px 3px 0">Cotton-wool spots</td>     <td style="text-align:right">{meta['cws']}</td></tr>
        <tr><td style="padding:3px 14px 3px 0">Neovascular tufts</td>     <td style="text-align:right">{meta['nve']}</td></tr>
      </table>
      <p style="margin:10px 0 0;font-size:11px;color:#8a6060;font-style:italic">
        Teaching cartoon of lesion burden — not fundus photography or a diagnostic model.
        Drag to orbit the globe.
      </p>
    </div>
    """

    # Embed the notes below the plot in the same HTML page
    plot_html = fig.to_html(full_html=True, include_plotlyjs="cdn")
    # Inject notes just before </body>
    combined = plot_html.replace("</body>", notes_html + "\n</body>")

    # Write to a temp file
    fd, path = tempfile.mkstemp(suffix=".html", prefix="DR3D_")
    os.close(fd)
    with open(path, "w", encoding="utf-8") as f:
        f.write(combined)
    _tmp_file = path

    webbrowser.open("file:///" + path.replace("\\", "/"))


# ---------------------------------------------------------------------------
# Tkinter GUI
# ---------------------------------------------------------------------------

STAGE_NAMES = [
    "0 — Healthy Retina",
    "1 — Mild NPDR",
    "2 — Moderate NPDR",
    "3 — Severe NPDR",
    "4 — Proliferative DR (schematic)",
]

BG      = "#1a0d0d"
FG      = "#f2e8dc"
ACCENT  = "#e8a020"
BTN_BG  = "#6b1a1a"
BTN_HV  = "#8b2a2a"
ENTRY   = "#2a1010"
BORDER  = "#5a3030"


class App(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("3D Diabetic Retinopathy Simulator")
        self.configure(bg=BG)
        self.resizable(False, False)

        style = ttk.Style(self)
        style.theme_use("clam")
        style.configure("TScale",    background=BG, troughcolor=ENTRY, sliderlength=16)
        style.configure("TCheckbutton", background=BG, foreground=FG, focuscolor=BG)
        style.map("TCheckbutton", background=[("active", BG)])

        self._build_ui()

    # ── layout ──────────────────────────────────────────────────
    def _build_ui(self):
        pad = dict(padx=18, pady=8)

        # ── title ──
        tk.Label(self, text="3D Diabetic Retinopathy Simulator",
                 bg=BG, fg=ACCENT,
                 font=("Segoe UI", 15, "bold")).pack(pady=(20, 2))
        tk.Label(self,
                 text="Interactive educational globe  ·  not for diagnosis",
                 bg=BG, fg="#8a6060",
                 font=("Segoe UI", 9, "italic")).pack(pady=(0, 14))

        frame = tk.Frame(self, bg=BG, bd=1, relief="flat",
                         highlightbackground=BORDER, highlightthickness=1)
        frame.pack(padx=24, pady=4, fill="x")

        # ── Severity ──
        self._sev = tk.IntVar(value=0)
        tk.Label(frame, text="DR Severity", bg=BG, fg=FG,
                 font=("Segoe UI", 10, "bold")).grid(
            row=0, column=0, sticky="w", **pad)

        sev_frame = tk.Frame(frame, bg=BG)
        sev_frame.grid(row=0, column=1, sticky="ew", padx=(0, 18), pady=8)
        for i, name in enumerate(STAGE_NAMES):
            rb = tk.Radiobutton(
                sev_frame, text=name, variable=self._sev, value=i,
                bg=BG, fg=FG, selectcolor=ENTRY, activebackground=BG,
                activeforeground=ACCENT, font=("Segoe UI", 9),
                indicatoron=True, bd=0, highlightthickness=0,
            )
            rb.pack(anchor="w", pady=1)

        # ── Sclera shell ──
        self._sclera = tk.BooleanVar(value=False)
        tk.Label(frame, text="Sclera shell", bg=BG, fg=FG,
                 font=("Segoe UI", 10, "bold")).grid(
            row=1, column=0, sticky="w", **pad)
        cb = tk.Checkbutton(
            frame, text="Show faint outer sclera",
            variable=self._sclera,
            bg=BG, fg=FG, selectcolor=ENTRY, activebackground=BG,
            activeforeground=ACCENT, font=("Segoe UI", 9),
            bd=0, highlightthickness=0,
        )
        cb.grid(row=1, column=1, sticky="w", padx=(0, 18), pady=8)

        # ── Seed ──
        self._seed = tk.IntVar(value=10)
        tk.Label(frame, text="Random seed", bg=BG, fg=FG,
                 font=("Segoe UI", 10, "bold")).grid(
            row=2, column=0, sticky="w", **pad)

        seed_row = tk.Frame(frame, bg=BG)
        seed_row.grid(row=2, column=1, sticky="ew", padx=(0, 18), pady=8)

        self._seed_lbl = tk.Label(seed_row, text="10", bg=BG, fg=ACCENT,
                                  font=("Segoe UI", 10, "bold"), width=3)
        self._seed_lbl.pack(side="left")

        scale = ttk.Scale(seed_row, from_=1, to=99, orient="horizontal",
                          variable=self._seed, length=220,
                          command=self._on_seed)
        scale.pack(side="left", padx=(8, 0))

        frame.columnconfigure(1, weight=1)

        # ── Run button ──
        btn_frame = tk.Frame(self, bg=BG)
        btn_frame.pack(pady=(14, 20))

        run_btn = tk.Button(
            btn_frame,
            text="▶  Launch 3D Viewer",
            command=self._run,
            bg=BTN_BG, fg=FG, activebackground=BTN_HV, activeforeground=FG,
            font=("Segoe UI", 11, "bold"),
            relief="flat", bd=0, padx=22, pady=10, cursor="hand2",
        )
        run_btn.pack()

        # ── Status ──
        self._status = tk.StringVar(value="Ready — configure and click Launch.")
        tk.Label(self, textvariable=self._status,
                 bg=BG, fg="#8a6060",
                 font=("Segoe UI", 9, "italic")).pack(pady=(0, 16))

    # ── callbacks ───────────────────────────────────────────────
    def _on_seed(self, val):
        self._seed_lbl.config(text=str(int(float(val))))

    def _run(self):
        sev    = self._sev.get()
        sclera = self._sclera.get()
        seed   = self._seed.get()
        name   = STAGE_NAMES[sev]
        self._status.set(f"Rendering {name} (seed={seed})…")
        self.update_idletasks()
        try:
            render_in_browser(sev, sclera, seed)
            self._status.set(f"Opened in browser — {name}")
        except Exception as e:
            self._status.set(f"Error: {e}")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    app = App()
    app.mainloop()
