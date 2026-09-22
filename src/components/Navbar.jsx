import { useState, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Eye, Bell, Globe, ChevronDown, Menu, X, ScanEye,
  User, Settings, LogOut, ShieldCheck, AlertTriangle,
  CheckCircle2, Info, Clock,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/" },
  { label: "Hologram",  to: "/hologram" },
  { label: "Analytics", to: "/analytics" },
  { label: "About",     to: "/about" },
];

const NOTIFICATIONS = [
  { id: 1, icon: AlertTriangle, color: "text-danger",     title: "Urgent referral required",    desc: "Patient P018 (Grade 4 PDR) needs immediate specialist review.", time: "2 min ago",  read: false },
  { id: 2, icon: AlertTriangle, color: "text-caution",    title: "Follow-up overdue",           desc: "3 patients have missed their scheduled 6-week follow-up.",      time: "1 hr ago",   read: false },
  { id: 3, icon: CheckCircle2,  color: "text-safe",       title: "Screening batch complete",    desc: "12 screenings processed today. 2 flagged for referral.",          time: "3 hrs ago",  read: true  },
  { id: 4, icon: Info,          color: "text-clinical-500", title: "AI model updated",          desc: "Sensitivity improved to 92.1% after latest model update.",       time: "Yesterday",  read: true  },
  { id: 5, icon: Clock,         color: "text-xai",        title: "Scheduled maintenance",       desc: "System maintenance window: Sunday 2–4 AM IST.",                  time: "2 days ago", read: true  },
];

const PROFILE = {
  name: "Dr. Arjun Rao", role: "Screening Coordinator",
  initials: "AR", email: "arjun.rao@astranetra.health",
  location: "PHC Ramanagara, Karnataka",
};

function useOutsideClick(ref, handler) {
  useEffect(() => {
    function listener(e) {
      if (ref.current && !ref.current.contains(e.target)) handler();
    }
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen]       = useState(false);
  const [lang, setLang]                   = useState("English");
  const [notifOpen, setNotifOpen]         = useState(false);
  const [profileOpen, setProfileOpen]     = useState(false);
  const [signOutOpen, setSignOutOpen]     = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const navigate = useNavigate();

  const notifRef   = useRef(null);
  const profileRef = useRef(null);

  useOutsideClick(notifRef,   () => setNotifOpen(false));
  useOutsideClick(profileRef, () => setProfileOpen(false));

  const unread = notifications.filter((n) => !n.read).length;

  function markAllRead() { setNotifications((ns) => ns.map((n) => ({ ...n, read: true }))); }
  function markRead(id)  { setNotifications((ns) => ns.map((n) => n.id === id ? { ...n, read: true } : n)); }
  function goTo(path)    { setNotifOpen(false); setProfileOpen(false); setMobileOpen(false); navigate(path); }

  return (
    <>
      <header className="sticky top-0 z-40 bg-gradient-to-r from-ink via-ink to-ink/95 text-white border-b border-cyan/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="h-16 flex items-center justify-between gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 shrink-0">
              <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan to-purple flex items-center justify-center shadow-glow-cyan">
                <Eye size={19} className="text-white" />
              </span>
              <span className="leading-tight">
                <span className="block font-display font-semibold text-[15px] bg-gradient-to-r from-cyan to-purple bg-clip-text text-transparent">AstraNetra</span>
                <span className="block text-[11px] text-white/55">Explainable AI for DR Screening</span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.to} to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            {/* Right controls */}
            <div className="hidden md:flex items-center gap-3">

              {/* Language */}
              <div className="relative group">
                <button className="flex items-center gap-1.5 text-white/70 hover:text-white text-sm px-2 py-2">
                  <Globe size={16} /> {lang} <ChevronDown size={14} />
                </button>
                <div className="absolute right-0 mt-1 w-40 bg-white text-ink rounded-lg shadow-lg border border-line hidden group-hover:block overflow-hidden z-50">
                  {["English", "हिन्दी", "தமிழ்", "తెలుగు", "ಕನ್ನಡ"].map((l) => (
                    <button key={l} onClick={() => setLang(l)}
                      className="block w-full text-left px-3.5 py-2 text-sm hover:bg-mist">{l}</button>
                  ))}
                </div>
              </div>

              {/* Notifications */}
              <div className="relative" ref={notifRef}>
                <button onClick={() => { setNotifOpen((v) => !v); setProfileOpen(false); }}
                  className="relative text-white/70 hover:text-white p-2 rounded-md hover:bg-white/5 transition-colors"
                  aria-label="Notifications">
                  <Bell size={18} />
                  {unread > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 bg-danger rounded-full text-[9px] font-bold flex items-center justify-center text-white">
                      {unread}
                    </span>
                  )}
                </button>

                {notifOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white text-ink rounded-xl shadow-xl border border-line z-50 overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-line">
                      <span className="font-semibold text-sm">Notifications</span>
                      <div className="flex items-center gap-3">
                        {unread > 0 && (
                          <span className="text-xs font-semibold bg-danger/10 text-danger px-2 py-0.5 rounded-full">{unread} new</span>
                        )}
                        <button onClick={markAllRead} className="text-xs text-clinical-500 hover:text-clinical-700 font-medium">
                          Mark all read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-line">
                      {notifications.map((n) => (
                        <button key={n.id} onClick={() => markRead(n.id)}
                          className={`w-full text-left flex gap-3 px-4 py-3 hover:bg-mist transition-colors ${!n.read ? "bg-clinical-50/60" : ""}`}>
                          <span className={`mt-0.5 shrink-0 ${n.color}`}><n.icon size={16} /></span>
                          <div className="min-w-0">
                            <p className={`text-sm font-medium leading-snug ${!n.read ? "text-ink" : "text-ink/70"}`}>{n.title}</p>
                            <p className="text-xs text-ink/50 mt-0.5">{n.desc}</p>
                            <p className="text-[11px] text-ink/35 mt-1">{n.time}</p>
                          </div>
                          {!n.read && <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-clinical-500" />}
                        </button>
                      ))}
                    </div>
                    <div className="px-4 py-2.5 border-t border-line text-center">
                      <button onClick={() => goTo("/notifications")}
                        className="text-xs text-clinical-500 hover:text-clinical-700 font-medium">
                        View all notifications →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative" ref={profileRef}>
                <button onClick={() => { setProfileOpen((v) => !v); setNotifOpen(false); }}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-white/5 transition-colors"
                  aria-label="Profile">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan to-purple text-white font-semibold text-xs flex items-center justify-center shadow-glow-cyan">
                    {PROFILE.initials}
                  </span>
                  <ChevronDown size={13} className="text-white/50" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white text-ink rounded-xl shadow-xl border border-line z-50 overflow-hidden">
                    {/* User card */}
                    <div className="px-4 py-4 bg-gradient-to-br from-ink to-ink/90 text-white">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center font-bold text-sm shadow-glow-cyan">
                          {PROFILE.initials}
                        </span>
                        <div>
                          <p className="font-semibold text-sm">{PROFILE.name}</p>
                          <p className="text-xs text-white/55">{PROFILE.role}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-white/10 space-y-1">
                        <p className="text-[11px] text-white/45">{PROFILE.email}</p>
                        <p className="text-[11px] text-white/45">{PROFILE.location}</p>
                      </div>
                    </div>

                    <div className="py-1.5">
                      {[
                        { icon: User,        label: "My Profile",        sub: "View & edit your details", path: "/profile"  },
                        { icon: ShieldCheck, label: "Access & Security",  sub: "Roles, permissions",       path: "/security" },
                        { icon: Settings,    label: "Settings",           sub: "App preferences",          path: "/settings" },
                      ].map((item) => (
                        <button key={item.label} onClick={() => goTo(item.path)}
                          className="w-full flex items-start gap-3 px-4 py-2.5 hover:bg-mist transition-colors text-left">
                          <item.icon size={16} className="text-ink/40 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-ink">{item.label}</p>
                            <p className="text-[11px] text-ink/45">{item.sub}</p>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div className="border-t border-line py-1.5">
                      <button onClick={() => { setProfileOpen(false); setSignOutOpen(true); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors text-left text-danger">
                        <LogOut size={16} className="shrink-0" />
                        <span className="text-sm font-medium">Sign out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Start New Scan */}
              <button onClick={() => navigate("/retinascan")} className="btn-primary !py-2.5 !px-4 text-sm">
                <ScanEye size={16} /> Start New Scan
              </button>
            </div>

            {/* Mobile hamburger */}
            <button className="lg:hidden text-white p-2" onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-white/10 bg-ink px-4 py-3 space-y-1">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md text-sm font-medium ${isActive ? "bg-white/10 text-white" : "text-white/70"}`
                }>
                {item.label}
              </NavLink>
            ))}
            {[
              { icon: Bell,        label: "Notifications",     path: "/notifications" },
              { icon: User,        label: "My Profile",        path: "/profile"       },
              { icon: Settings,    label: "Settings",          path: "/settings"      },
              { icon: ShieldCheck, label: "Access & Security", path: "/security"      },
            ].map((item) => (
              <button key={item.path} onClick={() => goTo(item.path)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/5">
                <item.icon size={16} />
                {item.label}
                {item.path === "/notifications" && unread > 0 && (
                  <span className="ml-auto text-[10px] font-bold bg-danger text-white px-1.5 py-0.5 rounded-full">{unread}</span>
                )}
              </button>
            ))}
            <div className="border-t border-white/10 pt-2">
              <button onClick={() => { setMobileOpen(false); setSignOutOpen(true); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium text-danger hover:bg-red-900/20">
                <LogOut size={16} /> Sign out
              </button>
            </div>
            <button onClick={() => { setMobileOpen(false); navigate("/retinascan"); }}
              className="btn-primary w-full justify-center mt-2 text-sm">
              <ScanEye size={16} /> Start New Scan
            </button>
          </div>
        )}
      </header>

      {/* Sign out confirm modal */}
      {signOutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-line">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <LogOut size={22} className="text-danger" />
            </div>
            <h3 className="text-lg font-semibold text-ink text-center">Sign out?</h3>
            <p className="text-sm text-ink/55 text-center mt-1.5 leading-relaxed">
              You'll be signed out of AstraNetra. Any unsaved changes will be lost.
            </p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setSignOutOpen(false)} className="btn-secondary flex-1 justify-center">
                Cancel
              </button>
              <button onClick={() => { setSignOutOpen(false); navigate("/"); }}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-danger hover:bg-red-700 text-white font-medium px-5 py-3 rounded-lg transition-colors">
                <LogOut size={15} /> Sign out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
