export default function Roadmap({ items }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((p) => (
        <div key={p.phase} className="card p-5 relative overflow-hidden">
          <span className="absolute -right-2 -top-2 text-6xl font-display font-bold text-line select-none">
            {p.phase.split(" ")[1]}
          </span>
          <p className="section-label mb-1 relative">{p.phase}</p>
          <h4 className="font-semibold text-ink mb-2 relative">{p.title}</h4>
          <p className="text-sm text-ink/65 leading-relaxed relative">{p.detail}</p>
        </div>
      ))}
    </div>
  );
}
