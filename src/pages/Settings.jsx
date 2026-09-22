import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Settings as SettingsIcon, Globe, Bell,
  Moon, Wifi, Monitor, Save, CheckCircle2,
} from "lucide-react";

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors focus:outline-none ${
        value ? "bg-clinical-500" : "bg-line"
      }`}
    >
      <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
        value ? "translate-x-5" : "translate-x-0"
      }`} />
    </button>
  );
}

function Section({ icon: Icon, title, children }) {
  return (
    <div className="card p-6 mb-4">
      <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-line">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan/20 to-purple/20 border border-cyan/20 flex items-center justify-center">
          <Icon size={16} className="text-cyan" />
        </div>
        <h3 className="font-semibold text-ink">{title}</h3>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Row({ label, sub, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {sub && <p className="text-xs text-ink/45 mt-0.5">{sub}</p>}
      </div>
      {children}
    </div>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);

  const [lang, setLang]           = useState("English");
  const [darkMode, setDarkMode]   = useState(false);
  const [offlineMode, setOffline] = useState(true);
  const [autoSync, setAutoSync]   = useState(true);
  const [notifSound, setNotifSound] = useState(true);
  const [notifEmail, setNotifEmail] = useState(false);
  const [notifUrgent, setNotifUrgent] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize]   = useState("Medium");

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-8">
      <button onClick={() => navigate(-1)}
        className="inline-flex items-center gap-1.5 text-sm text-ink/55 hover:text-ink mb-5">
        <ArrowLeft size={15} /> Back
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan/20 to-purple/20 border border-cyan/20 flex items-center justify-center">
          <SettingsIcon size={20} className="text-cyan" />
        </div>
        <h1 className="text-2xl font-semibold text-ink">Settings</h1>
      </div>

      {saved && (
        <div className="flex items-center gap-2 text-safe bg-emerald-50 border border-emerald-200 rounded-lg px-4 py-3 mb-5 text-sm font-medium">
          <CheckCircle2 size={16} /> Settings saved successfully
        </div>
      )}

      {/* Language */}
      <Section icon={Globe} title="Language & Region">
        <Row label="Interface Language" sub="Language used across all screens">
          <select value={lang} onChange={(e) => setLang(e.target.value)}
            className="text-sm border border-line rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-clinical-400 bg-white text-ink">
            {["English", "हिन्दी", "தமிழ்", "తెలుగు", "ಕನ್ನಡ", "বাংলা", "मराठी", "ગુજરાતી"].map((l) => (
              <option key={l}>{l}</option>
            ))}
          </select>
        </Row>
      </Section>

      {/* Appearance */}
      <Section icon={Monitor} title="Appearance">
        <Row label="Dark Mode" sub="Switch to a dark interface theme">
          <Toggle value={darkMode} onChange={setDarkMode} />
        </Row>
        <Row label="Compact View" sub="Reduce spacing for more content on screen">
          <Toggle value={compactView} onChange={setCompactView} />
        </Row>
        <Row label="High Contrast" sub="Improve visibility for accessibility">
          <Toggle value={highContrast} onChange={setHighContrast} />
        </Row>
        <Row label="Font Size" sub="Adjust text size across the app">
          <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}
            className="text-sm border border-line rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-clinical-400 bg-white text-ink">
            {["Small", "Medium", "Large"].map((s) => <option key={s}>{s}</option>)}
          </select>
        </Row>
      </Section>

      {/* Notifications */}
      <Section icon={Bell} title="Notification Preferences">
        <Row label="Sound Alerts" sub="Play a sound for new notifications">
          <Toggle value={notifSound} onChange={setNotifSound} />
        </Row>
        <Row label="Email Notifications" sub="Receive alerts at your registered email">
          <Toggle value={notifEmail} onChange={setNotifEmail} />
        </Row>
        <Row label="Urgent Alerts Only" sub="Only notify for Grade 3–4 urgent referrals">
          <Toggle value={notifUrgent} onChange={setNotifUrgent} />
        </Row>
      </Section>

      {/* Connectivity */}
      <Section icon={Wifi} title="Connectivity & Sync">
        <Row label="Offline Mode" sub="Allow screening without internet connection">
          <Toggle value={offlineMode} onChange={setOffline} />
        </Row>
        <Row label="Auto-Sync" sub="Sync data automatically when connection is restored">
          <Toggle value={autoSync} onChange={setAutoSync} />
        </Row>
      </Section>

      <button onClick={handleSave} className="btn-primary w-full justify-center">
        <Save size={16} /> Save Settings
      </button>
    </div>
  );
}
