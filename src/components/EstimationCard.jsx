function fmt(n) {
  return `₹${n.toLocaleString("en-IN")}`;
}

export default function EstimationCard({ title, items }) {
  const totalLow = items.reduce((s, i) => s + i.low, 0);
  const totalHigh = items.reduce((s, i) => s + i.high, 0);
  return (
    <div className="card p-5">
      <h4 className="font-semibold text-ink mb-4">{title}</h4>
      <ul className="space-y-3 mb-4">
        {items.map((i) => (
          <li key={i.item} className="flex items-center justify-between text-sm gap-3">
            <span className="text-ink/70">{i.item}</span>
            <span className="font-mono text-ink font-medium whitespace-nowrap">{fmt(i.low)} – {fmt(i.high)}</span>
          </li>
        ))}
      </ul>
      <div className="pt-3 border-t border-line flex items-center justify-between">
        <span className="text-sm font-medium text-ink">Subtotal</span>
        <span className="font-mono text-clinical-600 font-semibold">{fmt(totalLow)} – {fmt(totalHigh)}</span>
      </div>
    </div>
  );
}
