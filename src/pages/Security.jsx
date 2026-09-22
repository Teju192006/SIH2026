import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ShieldCheck, KeyRound, Fingerprint,
  Eye, EyeOff, Save, CheckCircle2, AlertTriangle,
  Users, ClipboardList, Lock,
} from "lucide-react";

function Section({ icon: Icon, title, accent = "cyan", children }) {
  const colors = { cyan: "text-cyan border-cyan/20 from-cyan/20 to-purple/20", orange: "text-caution border-amber-200 from-amber-50 to-amber-100" };
  return (
    <div className="card p-6 mb-4">
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-line">
        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${colors[accent]} border flex items-center justify-center`}>
          <Icon size={16} className={colors[accent].split(" ")[0]} />
        </div>
        <h3 className="font-semibold text-ink">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

const AUDIT_LOG = [
  { action: "Login",            detail: "Successful login from Chrome / Windows",  time: "Today, 7:02 PM",   ok: true  },
  { action: "Report Downloaded", detail: "Report for patient P012 downloaded",     time: "Today, 4:18 PM",   ok: true  },
  { action: "Screening Run",    detail: "AI screening completed for patient P025",  time: "Today, 2:45 PM",   ok: true  },
  { action: "Failed Login",     detail: "Failed login attempt — wrong password",   time: "Yesterday, 9:12 AM", ok: false },
  { action: "Settings Changed", detail: "Notification preferences updated",         time: "2 days ago",       ok: true  },
];

export default function Security() {
  const navigate = useNavigate();
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [currentPw, setCurrentPw]     = useState("");
  const [newPw, setNewPw]             = useState("");
  const [confirmPw, setConfirmPw]     = useState("");
  const [pwSaved, setPwSaved]         = useState(false);
  const [pwError, setPwError]         = useState("");
  const [mfa, setMfa]                 = useState(true);

  function handlePasswordSave() {
    if (!currentPw) { setPwError("Enter your current password."); return; }
    if (newPw.length < 8) { setPwError("New password must be at least 8 characters."); return; }
    if (newPw !== confirmPw) { setPwError("Passwords do not match."); return; }
    setPwError("");
    setCurrentPw(""); setNewPw(""); setConfirmPw("");
    setPwSaved(true);
    setTimeout(() => setPwSaved(false), 3000);
  }

  function PwField({ label, value, onChange, show, setShow }) {
    return (
      <div>
        <label className="text-xs text-ink/45 mb-1.5 block">{label}</label>
        <div className="relative">
          <input
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full px-3 py-2 pr-10 text-sm rounded-lg border border-line focus:outline-none focus:ring-2 focus:ring-clinical-400"
            placeholder="••••••••"
          />
          <button type="button" onClick={() => setShow(!show)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink/35 hover:text-ink">
            {show ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">
      <button onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-ink/55 hover:text-ink mb-5">
        <ArrowLeft size={15} /> Back
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan/20 to-purple/20 border border-cyan/20 flex items-center justify-center">
          <ShieldCheck size={20} className="text-cyan" />
        </div>
        <h1 className="text-2xl font-semibold text-ink">Access & Security</h1>
      </div>

      {pwSaved && (
        <div className="flex items-center gap-2 text-safe bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 mb-5 text-sm font-medium">
          <CheckCircle2 size={16} /> Password updated successfully
        </div>
      )}

      {/* Role */}
      <Section icon={Users} title="Role & Permissions">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <p className="text-sm font-medium text-ink">Current Role</p>
            <p className="text-xs text-ink/45 mt-0.5">Assigned by system administrator</p>
          </div>
          <span className="px-3 py-1.5 rounded-lg bg-clinical-50 border border-clinical-100 text-clinical-600 text-sm font-semibold">
            Screening Coordinator
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2 pt-2">
          {["View screenings", "Create reports", "Refer patients", "View analytics",
            "Manage own profile", "Export data"].map((p) => (
            <div key={p} className="flex items-center gap-2 text-sm text-ink/60">
              <CheckCircle2 size={14} className="text-safe shrink-0" /> {p}
            </div>
          ))}
        </div>
      </Section>

      {/* Change password */}
      <Section icon={KeyRound} title="Change Password">
        {pwError && (
          <div className="flex items-center gap-2 text-danger bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-sm">
            <AlertTriangle size={14} /> {pwError}
          </div>
        )}
        <PwField label="Current Password" value={currentPw} onChange={setCurrentPw} show={showCurrent} setShow={setShowCurrent} />
        <PwField label="New Password"     value={newPw}     onChange={setNewPw}     show={showNew}     setShow={setShowNew} />
        <PwField label="Confirm Password" value={confirmPw} onChange={setConfirmPw} show={showConfirm} setShow={setShowConfirm} />
        <button onClick={handlePasswordSave} className="btn-primary text-sm !py-2.5 flex items-center gap-2">
          <Save size={15} /> Update Password
        </button>
      </Section>

      {/* MFA */}
      <Section icon={Fingerprint} title="Multi-Factor Authentication">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-ink">Two-Factor Authentication</p>
            <p className="text-xs text-ink/45 mt-0.5">Adds an extra layer of security at login</p>
          </div>
          <button onClick={() => setMfa((v) => !v)}
            className={`relative inline-flex h-6 w-11 rounded-full border-2 border-transparent transition-colors ${mfa ? "bg-clinical-500" : "bg-line"}`}>
            <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${mfa ? "translate-x-5" : "translate-x-0"}`} />
          </button>
        </div>
        {mfa && (
          <div className="flex items-start gap-2 text-safe text-sm bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2.5">
            <ShieldCheck size={15} className="mt-0.5 shrink-0" />
            2FA is active. Your account is protected with an authenticator app.
          </div>
        )}
      </Section>

      {/* Audit log */}
      <Section icon={ClipboardList} title="Recent Activity">
        <div className="space-y-2">
          {AUDIT_LOG.map((l, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-line last:border-0">
              <span className={`mt-0.5 shrink-0 ${l.ok ? "text-safe" : "text-danger"}`}>
                {l.ok ? <CheckCircle2 size={15} /> : <AlertTriangle size={15} />}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink">{l.action}</p>
                <p className="text-xs text-ink/50">{l.detail}</p>
              </div>
              <span className="text-[11px] text-ink/35 shrink-0 whitespace-nowrap">{l.time}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Session */}
      <Section icon={Lock} title="Active Sessions">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-ink">Current session</p>
            <p className="text-xs text-ink/45 mt-0.5">Chrome · Windows · localhost:5174</p>
          </div>
          <span className="text-xs font-medium text-safe bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">Active</span>
        </div>
      </Section>
    </div>
  );
}
