const LESION_LABELS = {
  microaneurysms: "Microaneurysms",
  hemorrhages: "Hemorrhages",
  exudates: "Hard Exudates",
  cottonWoolSpots: "Cotton-Wool Spots",
  neovascularization: "Neovascularization",
  irma: "IRMA",
};

const DOT_POS = [
  { top: "32%", left: "44%" }, { top: "58%", left: "36%" }, { top: "40%", left: "62%" },
  { top: "68%", left: "58%" }, { top: "25%", left: "60%" }, { top: "52%", left: "50%" },
  { top: "62%", left: "44%" }, { top: "35%", left: "30%" },
];

export default function LesionDetection({ lesions }) {
  const entries = Object.entries(lesions);
  const dots = [];
  entries.forEach(([key, count]) => {
    for (let i = 0; i < Math.min(count, 4); i++) {
      dots.push({ key, i });
    }
  });

  return (
    <div className="card p-5">
      <h4 className="font-semibold text-ink mb-1">Lesion Detection</h4>
      <p className="text-sm text-ink/60 mb-4">Simulated bounding regions over detected retinal features</p>

      <div className="aspect-[4/3] rounded-lg overflow-hidden relative mb-4 bg-ink">
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 45% 42%, #b5623a 0%, #5c2712 60%, #12203a 100%)" }} />
        {dots.map((d, idx) => {
          const pos = DOT_POS[idx % DOT_POS.length];
          return (
            <span
              key={idx}
              className="absolute w-4 h-4 rounded-full border-2 border-amber-300/90"
              style={{ top: pos.top, left: pos.left, boxShadow: "0 0 0 3px rgba(251,191,36,0.15)" }}
            />
          );
        })}
        <span className="absolute bottom-2 right-2.5 text-[10px] text-white/60 bg-black/40 px-2 py-0.5 rounded">Simulated overlay — demo only</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {entries.map(([key, count]) => (
          <div key={key} className="flex items-center justify-between rounded-lg border border-line px-3 py-2.5">
            <span className="text-sm text-ink/70">{LESION_LABELS[key]}</span>
            <span className={`text-sm font-semibold ${count > 0 ? "text-danger" : "text-ink/40"}`}>
              {count > 0 ? `Detected: ${count}` : "None"}
            </span>
          </div>
        ))}
      </div>
      <p className="text-xs text-ink/40 mt-3">These are simulated demo detections — not medically validated results.</p>
    </div>
  );
}
