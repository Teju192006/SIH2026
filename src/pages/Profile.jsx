import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, User, Mail, Phone, MapPin, Building2,
  Calendar, Edit3, Save, X, Camera, CheckCircle2,
} from "lucide-react";
import DemoTag from "../components/DemoTag";

const INITIAL_PROFILE = {
  name: "Dr. Arjun Rao",
  role: "Screening Coordinator",
  initials: "AR",
  email: "arjun.rao@astranetra.health",
  phone: "+91 94483 00001",
  location: "PHC Ramanagara, Karnataka",
  organisation: "Primary Health Centre, Ramanagara",
  joined: "March 2024",
  screenings: 312,
  referrals: 47,
  reports: 298,
};

export default function Profile() {
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [draft, setDraft] = useState(INITIAL_PROFILE);

  function startEdit() { setDraft(profile); setEditing(true); setSaved(false); }
  function cancelEdit() { setEditing(false); }
  function saveEdit() {
    setProfile(draft);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }
  function update(key, val) { setDraft((d) => ({ ...d, [key]: val })); }

  const fields = [
    { key: "name",         label: "Full Name",      icon: User,      type: "text" },
    { key: "email",        label: "Email",           icon: Mail,      type: "email" },
    { key: "phone",        label: "Phone",           icon: Phone,     type: "text" },
    { key: "location",     label: "Location",        icon: MapPin,    type: "text" },
    { key: "organisation", label: "Organisation",    icon: Building2, type: "text" },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
      <button onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-ink/55 hover:text-ink mb-5">
        <ArrowLeft size={15} /> Back
      </button>

      <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
        <h1 className="text-2xl font-semibold text-ink">My Profile</h1>
        <DemoTag>Demo profile — not real data</DemoTag>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-safe bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 mb-5 text-sm font-medium">
          <CheckCircle2 size={16} /> Profile updated successfully
        </div>
      )}

      {/* Avatar + stats */}
      <div className="card p-6 mb-5 bg-gradient-to-br from-ink to-ink/90 text-white border-0">
        <div className="flex items-center gap-5 flex-wrap">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan to-purple flex items-center justify-center text-2xl font-bold shadow-glow-cyan">
              {profile.initials}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-clinical-500 flex items-center justify-center border-2 border-white hover:bg-clinical-600 transition-colors">
              <Camera size={13} className="text-white" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-white/60 text-sm mt-0.5">{profile.role}</p>
            <p className="text-white/40 text-xs mt-1 flex items-center gap-1.5">
              <Calendar size={11} /> Member since {profile.joined}
            </p>
          </div>
          <div className="ml-auto flex gap-6">
            {[
              { val: profile.screenings, lbl: "Screenings" },
              { val: profile.referrals,  lbl: "Referrals"  },
              { val: profile.reports,    lbl: "Reports"    },
            ].map((s) => (
              <div key={s.lbl} className="text-center">
                <p className="text-2xl font-bold text-cyan">{s.val}</p>
                <p className="text-xs text-white/50 mt-0.5">{s.lbl}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details card */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-ink">Personal Details</h3>
          {!editing ? (
            <button onClick={startEdit} className="btn-secondary !py-2 text-sm flex items-center gap-1.5">
              <Edit3 size={14} /> Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button onClick={cancelEdit} className="btn-secondary !py-2 text-sm flex items-center gap-1.5">
                <X size={14} /> Cancel
              </button>
              <button onClick={saveEdit} className="btn-primary !py-2 text-sm flex items-center gap-1.5">
                <Save size={14} /> Save Changes
              </button>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {fields.map((f) => (
            <div key={f.key} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-lg bg-mist border border-line flex items-center justify-center shrink-0 mt-0.5">
                <f.icon size={15} className="text-ink/40" />
              </div>
              <div className="flex-1">
                <label className="text-xs text-ink/45 mb-1 block">{f.label}</label>
                {editing ? (
                  <input
                    type={f.type}
                    value={draft[f.key]}
                    onChange={(e) => update(f.key, e.target.value)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-line focus:outline-none focus:ring-2 focus:ring-clinical-400"
                  />
                ) : (
                  <p className="text-sm text-ink font-medium">{profile[f.key]}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
