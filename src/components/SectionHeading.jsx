export default function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <div id={id} className="max-w-2xl scroll-mt-24">
      {eyebrow && <p className="section-label mb-2 text-cyan">{eyebrow}</p>}
      <h2 className="text-2xl md:text-3xl font-semibold text-ink mb-3 hover:gradient-text transition-all">{title}</h2>
      {description && <p className="text-ink/65 leading-relaxed">{description}</p>}
    </div>
  );
}
