export default function StakeholderCard({ role, problem, help, index }) {
  return (
    <div className="card p-5">
      <div className="flex items-start gap-3 mb-3">
        <span className="w-7 h-7 rounded-md bg-ink text-white text-xs font-semibold flex items-center justify-center shrink-0">
          {index}
        </span>
        <h3 className="font-semibold text-ink leading-snug pt-0.5">{role}</h3>
      </div>
      <div className="space-y-2.5 text-sm">
        <p><span className="text-ink/45 font-medium">Problem — </span><span className="text-ink/70">{problem}</span></p>
        <p><span className="text-clinical-600 font-medium">How we help — </span><span className="text-ink/70">{help}</span></p>
      </div>
    </div>
  );
}
