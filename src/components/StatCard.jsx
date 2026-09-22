export default function StatCard({ label, value, icon: Icon, accent = "clinical", suffix = "" }) {
  const accentMap = {
    clinical: "text-cyan bg-gradient-to-br from-cyan/10 to-blue-100 border border-cyan/30",
    danger: "text-danger bg-red-50 border border-red-100",
    caution: "text-caution bg-amber-50 border border-amber-100",
    safe: "text-safe bg-emerald-50 border border-emerald-100",
    xai: "text-purple bg-gradient-to-br from-purple/10 to-violet-100 border border-purple/30",
  };
  return (
    <div className="card p-5 flex items-start justify-between hover:shadow-glow-cyan transition-all border-l-2 border-l-cyan/50">
      <div>
        <p className="text-sm text-ink/60 mb-1">{label}</p>
        <p className="text-3xl font-display font-semibold bg-gradient-to-r from-ink to-ink/70 bg-clip-text text-transparent">{value}{suffix}</p>
      </div>
      {Icon && (
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${accentMap[accent]}`}>
          <Icon size={22} strokeWidth={2} />
        </div>
      )}
    </div>
  );
}
