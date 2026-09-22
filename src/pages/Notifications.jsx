import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Bell, AlertTriangle, CheckCircle2, Info, Clock, Trash2, CheckCheck } from "lucide-react";

const INITIAL = [
  {
    id: 1, type: "urgent", icon: AlertTriangle, color: "text-danger", bg: "bg-red-50",
    border: "border-red-200", dot: "bg-danger",
    title: "Urgent referral required",
    desc: "Patient P018 (Grade 4 — Proliferative DR) needs immediate specialist review. Risk of irreversible vision loss without intervention.",
    time: "2 min ago", read: false, category: "Clinical",
  },
  {
    id: 2, type: "warning", icon: AlertTriangle, color: "text-caution", bg: "bg-amber-50",
    border: "border-amber-200", dot: "bg-caution",
    title: "Follow-up overdue",
    desc: "3 patients have missed their scheduled 6-week follow-up appointments. Please contact P007, P011, P019.",
    time: "1 hr ago", read: false, category: "Clinical",
  },
  {
    id: 3, type: "success", icon: CheckCircle2, color: "text-safe", bg: "bg-emerald-50",
    border: "border-emerald-200", dot: "bg-safe",
    title: "Screening batch complete",
    desc: "12 screenings processed today. 2 patients flagged for urgent referral. 4 scheduled for routine monitoring.",
    time: "3 hrs ago", read: false, category: "System",
  },
  {
    id: 4, type: "info", icon: Info, color: "text-clinical-500", bg: "bg-clinical-50",
    border: "border-clinical-100", dot: "bg-clinical-500",
    title: "AI model updated",
    desc: "The DR classification model has been updated. Sensitivity improved from 91.4% to 92.1%. Specificity: 88.8%.",
    time: "Yesterday", read: true, category: "System",
  },
  {
    id: 5, type: "info", icon: Clock, color: "text-xai", bg: "bg-violet-50",
    border: "border-violet-200", dot: "bg-xai",
    title: "Scheduled maintenance",
    desc: "System maintenance window is scheduled for Sunday 2:00–4:00 AM IST. Offline mode will remain available.",
    time: "2 days ago", read: true, category: "System",
  },
  {
    id: 6, type: "success", icon: CheckCircle2, color: "text-safe", bg: "bg-emerald-50",
    border: "border-emerald-200", dot: "bg-safe",
    title: "Report downloaded",
    desc: "Screening report for patient P012 was successfully generated and downloaded.",
    time: "3 days ago", read: true, category: "Reports",
  },
];

const CATEGORIES = ["All", "Clinical", "System", "Reports"];

export default function Notifications() {
  const navigate = useNavigate();
  const [items, setItems] = useState(INITIAL);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? items : items.filter((n) => n.category === filter);
  const unread = items.filter((n) => !n.read).length;

  function markAllRead() { setItems((ns) => ns.map((n) => ({ ...n, read: true }))); }
  function markRead(id)  { setItems((ns) => ns.map((n) => n.id === id ? { ...n, read: true } : n)); }
  function dismiss(id)   { setItems((ns) => ns.filter((n) => n.id !== id)); }
  function clearAll()    { setItems([]); }

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
      {/* Header */}
      <button onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-ink/55 hover:text-ink mb-5">
        <ArrowLeft size={15} /> Back
      </button>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan/20 to-purple/20 border border-cyan/20 flex items-center justify-center">
            <Bell size={20} className="text-cyan" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-ink">Notifications</h1>
            <p className="text-sm text-ink/50 mt-0.5">
              {unread > 0 ? `${unread} unread notification${unread > 1 ? "s" : ""}` : "All caught up"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {unread > 0 && (
            <button onClick={markAllRead}
              className="btn-secondary text-sm !py-2 flex items-center gap-1.5">
              <CheckCheck size={15} /> Mark all read
            </button>
          )}
          {items.length > 0 && (
            <button onClick={clearAll}
              className="btn-secondary text-sm !py-2 text-danger border-red-200 hover:bg-red-50 flex items-center gap-1.5">
              <Trash2 size={15} /> Clear all
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              filter === c
                ? "bg-ink text-white border-ink"
                : "bg-white text-ink/60 border-line hover:border-ink/30 hover:text-ink"
            }`}>
            {c}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center text-ink/40">
          <Bell size={36} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium">No notifications here</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((n) => (
            <div key={n.id}
              className={`card p-4 border ${n.border} ${!n.read ? n.bg : "bg-white"} flex gap-4 transition-all`}>
              <span className={`mt-0.5 shrink-0 ${n.color}`}><n.icon size={20} /></span>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-sm font-semibold ${!n.read ? "text-ink" : "text-ink/70"}`}>{n.title}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    {!n.read && <span className={`w-2 h-2 rounded-full ${n.dot}`} />}
                    <span className="text-[11px] text-ink/35 whitespace-nowrap">{n.time}</span>
                  </div>
                </div>
                <p className="text-sm text-ink/55 mt-1 leading-relaxed">{n.desc}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-[11px] font-medium text-ink/35 bg-mist border border-line px-2 py-0.5 rounded-full">
                    {n.category}
                  </span>
                  {!n.read && (
                    <button onClick={() => markRead(n.id)}
                      className="text-xs text-clinical-500 hover:text-clinical-700 font-medium">
                      Mark as read
                    </button>
                  )}
                  <button onClick={() => dismiss(n.id)}
                    className="text-xs text-ink/35 hover:text-danger ml-auto flex items-center gap-1">
                    <Trash2 size={12} /> Dismiss
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
