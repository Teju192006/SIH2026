export default function StatusPill({ label, ok = true }) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/80 px-3 py-1.5 rounded-full border border-cyan/30 bg-white/5 hover:bg-white/10 transition-colors">
      <span className={`w-2 h-2 rounded-full ${ok ? "bg-neon" : "bg-caution"} animate-pulse`} />
      <span>{label}</span>
    </div>
  );
}
