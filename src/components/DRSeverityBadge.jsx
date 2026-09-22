const STYLES = {
  "No DR": "bg-emerald-50 text-safe border-emerald-200",
  "Mild DR": "bg-sky-50 text-clinical-600 border-sky-200",
  "Moderate DR": "bg-amber-50 text-caution border-amber-200",
  "Severe DR": "bg-orange-50 text-orange-700 border-orange-200",
  "Proliferative DR": "bg-red-50 text-danger border-red-200",
};

export default function DRSeverityBadge({ stage, size = "md" }) {
  const cls = STYLES[stage] || STYLES["No DR"];
  const pad = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-sm";
  return <span className={`inline-flex items-center rounded-full border font-medium ${pad} ${cls}`}>{stage}</span>;
}
