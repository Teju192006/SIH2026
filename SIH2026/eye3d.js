/* ═══════════════════════════════════════════════════════
   eye3d.js  —  Static 2D fundus image renderer
   Replaces the 3D spinning sphere with flat retina images
   that closely match the clinical reference style.
═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     Draw a static 2D fundus image onto a canvas
  ───────────────────────────────────────────── */
  function drawFundus(canvas, infected) {
    const S   = canvas.width  = canvas.parentElement.clientWidth  || 320;
    const H   = canvas.height = canvas.parentElement.clientHeight || 280;
    const ctx = canvas.getContext('2d');
    const CX  = S / 2;
    const CY  = H / 2;
    const R   = Math.min(S, H) / 2 - 6;

    /* 1 — Dark background */
    ctx.fillStyle = '#0d1b2a';
    ctx.fillRect(0, 0, S, H);

    /* 2 — Outer glow ring */
    const glow = ctx.createRadialGradient(CX, CY, R * 0.72, CX, CY, R + 10);
    glow.addColorStop(0, infected ? 'rgba(220,50,50,0)' : 'rgba(40,200,80,0)');
    glow.addColorStop(1, infected ? 'rgba(220,50,50,0.45)' : 'rgba(40,200,80,0.45)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, S, H);

    /* 3 — Clip everything to the retinal circle */
    ctx.save();
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.clip();

    /* 3a — Base radial fill */
    const base = ctx.createRadialGradient(CX, CY, 0, CX, CY, R);
    if (infected) {
      base.addColorStop(0,   '#3d0e0e');
      base.addColorStop(0.5, '#230909');
      base.addColorStop(1,   '#0e0303');
    } else {
      base.addColorStop(0,   '#0c3018');
      base.addColorStop(0.5, '#071d0e');
      base.addColorStop(1,   '#030e07');
    }
    ctx.fillStyle = base;
    ctx.fillRect(0, 0, S, H);

    /* 3b — Inner softer circle */
    const inner = ctx.createRadialGradient(CX, CY, 0, CX, CY, R * 0.55);
    if (infected) {
      inner.addColorStop(0, 'rgba(80,18,18,0.65)');
      inner.addColorStop(1, 'rgba(0,0,0,0)');
    } else {
      inner.addColorStop(0, 'rgba(18,72,28,0.55)');
      inner.addColorStop(1, 'rgba(0,0,0,0)');
    }
    ctx.fillStyle = inner;
    ctx.fillRect(0, 0, S, H);

    /* 4 — Optic disc */
    const DX = CX + R * 0.22;
    const DY = CY - R * 0.06;
    const DR = R * 0.14;

    // disc glow
    const dg = ctx.createRadialGradient(DX, DY, 0, DX, DY, DR * 2.4);
    dg.addColorStop(0,   'rgba(240,180,30,0.40)');
    dg.addColorStop(0.5, 'rgba(200,130,10,0.12)');
    dg.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = dg;
    ctx.fillRect(0, 0, S, H);

    // disc body
    const dd = ctx.createRadialGradient(DX - DR * 0.1, DY - DR * 0.1, 0, DX, DY, DR);
    dd.addColorStop(0,   '#ffe84a');
    dd.addColorStop(0.4, '#f0a800');
    dd.addColorStop(1,   '#b06000');
    ctx.fillStyle = dd;
    ctx.beginPath();
    ctx.arc(DX, DY, DR, 0, Math.PI * 2);
    ctx.fill();

    // disc bright spot
    const ds = ctx.createRadialGradient(DX, DY, 0, DX, DY, DR * 0.38);
    ds.addColorStop(0, 'rgba(255,245,180,0.9)');
    ds.addColorStop(1, 'rgba(255,200,50,0)');
    ctx.fillStyle = ds;
    ctx.beginPath();
    ctx.arc(DX, DY, DR * 0.38, 0, Math.PI * 2);
    ctx.fill();

    /* 5 — Blood vessels */
    function vessel(pts, lw, alpha) {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = '#cc3322';
      ctx.lineWidth   = lw;
      ctx.lineCap     = 'round';
      ctx.lineJoin    = 'round';
      ctx.shadowColor = 'rgba(180,20,10,0.55)';
      ctx.shadowBlur  = lw * 2;
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      for (let i = 1; i < pts.length - 1; i++) {
        const mx = (pts[i][0] + pts[i + 1][0]) / 2;
        const my = (pts[i][1] + pts[i + 1][1]) / 2;
        ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
      }
      ctx.lineTo(pts[pts.length - 1][0], pts[pts.length - 1][1]);
      ctx.stroke();
      ctx.restore();
    }

    // Convert relative coords to absolute
    function p(arr) { return arr.map(([rx, ry]) => [CX + rx * R * 2, CY + ry * R * 2]); }

    vessel(p([[0.11,-0.03],[0.04,-0.10],[-0.05,-0.18],[-0.15,-0.24],[-0.24,-0.25]]), 3.5, 0.90);
    vessel(p([[0.11,-0.03],[0.04, 0.08],[-0.05, 0.16],[-0.15, 0.22],[-0.24, 0.23]]), 3.5, 0.90);
    vessel(p([[0.11,-0.03],[-0.02,-0.01],[-0.10, 0.00],[-0.18, 0.01]]),              3.0, 0.85);
    vessel(p([[0.11,-0.03],[0.20,-0.08],[0.28,-0.14],[0.34,-0.20]]),                  2.5, 0.80);
    vessel(p([[0.11,-0.03],[0.20, 0.04],[0.28, 0.10],[0.34, 0.16]]),                  2.5, 0.80);

    /* 6 — Macula */
    const FX = CX - R * 0.17;
    const FY = CY + R * 0.02;
    const fm = ctx.createRadialGradient(FX, FY, 0, FX, FY, R * 0.09);
    fm.addColorStop(0, infected ? 'rgba(110,40,20,0.70)' : 'rgba(80,30,10,0.60)');
    fm.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = fm;
    ctx.fillRect(0, 0, S, H);

    /* 7 — Lesions (infected only) */
    if (infected) {
      // Microaneurysms
      const MAs = [
        [CX - R*0.08, CY + R*0.10, 4],
        [CX + R*0.12, CY + R*0.16, 3.5],
        [CX - R*0.24, CY + R*0.20, 3],
        [CX + R*0.02, CY + R*0.28, 3],
        [CX - R*0.16, CY + R*0.32, 3],
        [CX + R*0.20, CY + R*0.06, 3.5],
        [CX - R*0.12, CY - R*0.16, 3],
        [CX + R*0.08, CY - R*0.12, 3.5],
        [CX - R*0.30, CY - R*0.08, 3],
        [CX + R*0.26, CY + R*0.30, 3],
        [CX - R*0.04, CY - R*0.30, 3],
        [CX + R*0.34, CY - R*0.18, 3],
        [CX - R*0.36, CY + R*0.10, 3],
        [CX + R*0.14, CY - R*0.36, 3],
      ];
      MAs.forEach(([x, y, r]) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r * 2.2);
        g.addColorStop(0, 'rgba(210,55,55,0.95)');
        g.addColorStop(0.5,'rgba(155,20,20,0.55)');
        g.addColorStop(1, 'rgba(100,0,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r * 2.2, 0, Math.PI * 2);
        ctx.fill();
      });

      // Hard exudates
      const EX = [
        [CX - R*0.08, CY + R*0.36, 5.5],
        [CX + R*0.04, CY + R*0.44, 5],
        [CX - R*0.20, CY + R*0.40, 4.5],
        [CX + R*0.12, CY + R*0.38, 4.5],
        [CX - R*0.14, CY + R*0.48, 4],
        [CX + R*0.02, CY + R*0.54, 4],
        [CX + R*0.22, CY + R*0.46, 4],
        [CX - R*0.26, CY + R*0.52, 3.5],
      ];
      EX.forEach(([x, y, r]) => {
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0, 'rgba(255,205,55,1)');
        g.addColorStop(0.5,'rgba(220,155,20,0.70)');
        g.addColorStop(1, 'rgba(180,100,0,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Hemorrhages
      const HM = [
        { x: CX - R*0.44, y: CY - R*0.02, rx: 13, ry: 7,  color: 'rgba(110,80,140,0.80)' },
        { x: CX + R*0.36, y: CY + R*0.14, rx: 10, ry: 6,  color: 'rgba(130,100,150,0.75)' },
        { x: CX - R*0.40, y: CY + R*0.24, rx: 11, ry: 6,  color: 'rgba(120,90,140,0.72)' },
        { x: CX + R*0.44, y: CY - R*0.12, rx:  9, ry: 5,  color: 'rgba(100,75,125,0.70)' },
        { x: CX - R*0.10, y: CY - R*0.44, rx:  8, ry: 5,  color: 'rgba(115,85,135,0.68)' },
        { x: CX + R*0.18, y: CY + R*0.52, rx:  7, ry: 4,  color: 'rgba(108,78,130,0.65)' },
      ];
      HM.forEach(h => {
        ctx.save();
        ctx.fillStyle = h.color;
        ctx.beginPath();
        ctx.ellipse(h.x, h.y, h.rx, h.ry, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
    }

    /* 8 — Vignette */
    const vig = ctx.createRadialGradient(CX, CY, R * 0.52, CX, CY, R);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.80)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, S, H);

    ctx.restore(); // end clip

    /* 9 — Outer ring border */
    ctx.save();
    ctx.beginPath();
    ctx.arc(CX, CY, R, 0, Math.PI * 2);
    ctx.strokeStyle = infected ? '#dd3333' : '#2ecc5a';
    ctx.lineWidth   = 3;
    ctx.shadowColor = infected ? 'rgba(220,40,40,0.75)' : 'rgba(46,204,90,0.75)';
    ctx.shadowBlur  = 14;
    ctx.stroke();
    ctx.restore();
  }

  /* ─────────────────────────────────────────────
     Replace the canvas inside each eye-3d-wrap
  ───────────────────────────────────────────── */
  function initEye(canvasId, infected) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    // Replace the canvas with a plain 2D one (remove any existing style/size)
    canvas.style.display = 'block';
    canvas.style.borderRadius = '50%';
    drawFundus(canvas, infected);

    // Redraw on resize
    window.addEventListener('resize', () => {
      canvas.width  = 0;
      canvas.height = 0;
      drawFundus(canvas, infected);
    });
  }

  function init() {
    initEye('canvas3dNormal',   false);
    initEye('canvas3dInfected', true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
