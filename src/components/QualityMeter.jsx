function bandFor(score) {
  if (score >= 70) return { label: "Good", color: "bg-safe", text: "text-safe" };
  if (score >= 50) return { label: "Acceptable with caution", color: "bg-caution", text: "text-caution" };
  return { label: "Poor", color: "bg-danger", text: "text-danger" };
}

export default function QualityMeter({ label, score, showBand = false }) {
  const band = bandFor(score);
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm text-ink/70">{label}</span>
        <span className="text-sm font-semibold text-ink">{score}%{showBand && <span className={`ml-2 text-xs font-medium ${band.text}`}>{band.label}</span>}</span>
      </div>
      <div className="h-2 rounded-full bg-line overflow-hidden">
        <div className={`h-full rounded-full ${band.color} transition-all duration-500`} style={{ width: `${Math.max(3, score)}%` }} />
      </div>
    </div>
  );
}
