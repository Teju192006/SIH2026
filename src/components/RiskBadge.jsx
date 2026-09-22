const STYLES = {
  Low: "bg-emerald-50 text-safe border-emerald-200",
  Moderate: "bg-amber-50 text-caution border-amber-200",
  High: "bg-red-50 text-danger border-red-200",
  Critical: "bg-red-100 text-danger border-red-300",
};

export default function RiskBadge({ level, size = "md" }) {
  const cls = STYLES[level] || STYLES.Low;
  const pad = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-medium ${pad} ${cls}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {level} risk
    </span>
  );
}
