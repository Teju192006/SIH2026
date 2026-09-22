import { useNavigate, Link } from "react-router-dom";
import {
  ScanEye, Users, AlertTriangle, Send, CalendarClock, ArrowRight,
  Camera, ScanSearch, Sparkles, MessageSquareText, FileCheck, UserPlus,
  WifiOff, ShieldCheck, KeyRound, Lock, ClipboardList, Fingerprint, Eye,
} from "lucide-react";
import StatCard from "../components/StatCard";
import StatusPill from "../components/StatusPill";
import SectionHeading from "../components/SectionHeading";
import DemoTag from "../components/DemoTag";
import SolutionPipeline from "../components/SolutionPipeline";
import PipelineDiagram from "../components/PipelineDiagram";
import StakeholderCard from "../components/StakeholderCard";
import EstimationCard from "../components/EstimationCard";
import Roadmap from "../components/Roadmap";
import PatientTable from "../components/PatientTable";
import { RiskDistributionChart, MonthlyScreeningTrend } from "../components/ReportCharts";
import {
  OVERVIEW_STATS, STAKEHOLDERS, ROADMAP, FUTURE_CAPABILITIES, DATASETS,
  ESTIMATION, ACTIVE_PATIENTS,
} from "../data/mockData";

const SCAN_STEPS = [
  { icon: UserPlus, title: "Register Patient", desc: "Capture basic patient and clinical details." },
  { icon: Camera, title: "Capture Fundus Image", desc: "Use a compatible fundus camera to photograph the retina." },
  { icon: ScanSearch, title: "Check Image Quality", desc: "Focus, illumination and field of view are assessed automatically." },
  { icon: Sparkles, title: "AI Screening", desc: "The retina is classified for signs of diabetic retinopathy." },
  { icon: MessageSquareText, title: "Explain Result", desc: "An attention heatmap shows what the model responded to." },
  { icon: FileCheck, title: "Generate Report", desc: "A multilingual report is produced for the patient and clinic." },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-hero text-white relative overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: "radial-gradient(circle, #00D4FF 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }} />
        
        {/* Glowing orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-cyan/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-purple/10 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <DemoTag>SIH26038 — Academic prototype, not a certified medical device</DemoTag>
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-semibold">
                <span className="bg-gradient-to-r from-cyan via-blue-300 to-purple bg-clip-text text-transparent">
                  Early detection.
                </span>
                <span className="block text-white">Explainable AI. Rural healthcare.</span>
              </h1>
              <p className="mt-5 text-white/75 text-lg leading-relaxed max-w-xl">
                AI-assisted diabetic retinopathy screening designed for low-resource rural healthcare environments —
                from image capture to specialist referral.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => navigate("/retinascan")} className="btn-primary bg-gradient-to-r from-cyan to-blue-500 hover:from-cyan/90 hover:to-blue-600 shadow-glow-cyan">
                  <ScanEye size={17} /> Start New Scan
                </button>
                <button onClick={() => navigate("/hologram")} className="btn-secondary !bg-white/10 !border-cyan/30 !text-white hover:!bg-white/15 hover:!border-cyan/50">
                  <Eye size={16} /> 3D Eye Scan
                </button>
                <a href="#solution" className="btn-secondary !bg-white/10 !border-cyan/30 !text-white hover:!bg-white/15 hover:!border-cyan/50">
                  See how it works <ArrowRight size={16} />
                </a>
              </div>
            </div>

            {/* 3D Preview teaser */}
            <div className="hidden lg:block relative h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan/10 to-purple/10 rounded-2xl border border-cyan/30 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4 opacity-50">👁️</div>
                    <p className="text-white/70 text-sm">3D Retinal Scan</p>
                    <p className="text-cyan text-xs mt-2">AI-Powered Eye Diagnostics</p>
                  </div>
                </div>
                {/* Animated grid */}
                <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: "linear-gradient(90deg, #00D4FF 1px, transparent 1px), linear-gradient(#00D4FF 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }} />
                {/* Floating elements */}
                <div className="absolute top-10 right-10 w-8 h-8 rounded-full border-2 border-cyan/50 animate-pulse" />
                <div className="absolute bottom-10 left-10 w-6 h-6 rounded-full border-2 border-purple/50 animate-pulse" />
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard label="Total Screenings" value={OVERVIEW_STATS.totalScreenings.toLocaleString()} icon={ScanEye} accent="clinical" />
            <StatCard label="At Risk" value={OVERVIEW_STATS.atRisk} icon={AlertTriangle} accent="caution" />
            <StatCard label="Referred" value={OVERVIEW_STATS.referred} icon={Send} accent="danger" />
            <StatCard label="Follow-ups Due" value={OVERVIEW_STATS.followUpsDue} icon={CalendarClock} accent="xai" />
          </div>
          <div className="mt-3">
            <DemoTag>Demo data — not real patient information</DemoTag>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-cyan/10 pt-6">
            <StatusPill label="AI Screening Engine — Operational" />
            <StatusPill label="Image Quality Engine — Operational" />
            <StatusPill label="Offline Mode — Available" />
            <StatusPill label="3D Eye Scanner — Available" />
          </div>
        </div>
      </section>

      {/* SCAN + AI PIPELINE */}
      <section id="scan-overview" className="max-w-7xl mx-auto px-4 md:px-6 py-16 scroll-mt-20">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 card p-6 md:p-7 border-l-4 border-l-cyan hover:shadow-glow-cyan transition-all">
            <SectionHeading eyebrow="Retinal screening" title="From capture to a specialist-ready result" />
            <p className="text-ink/65 leading-relaxed mt-4 mb-6">
              Capture a clear retinal fundus image using a compatible fundus camera. The system evaluates
              focus, illumination, field of view and image artifacts before allowing AI screening — so a
              screening decision is never made on an unusable image.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mb-7">
              {SCAN_STEPS.map((s, i) => (
                <div key={s.title} className="flex gap-3 p-3 rounded-lg hover:bg-mist transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan/20 to-purple/20 text-cyan flex items-center justify-center shrink-0 border border-cyan/20">
                    <s.icon size={17} />
                  </div>
                  <div>
                    <p className="font-medium text-ink text-sm">{s.title}</p>
                    <p className="text-xs text-ink/55 mt-0.5 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate("/retinascan")} className="btn-primary bg-gradient-to-r from-cyan to-blue-500 hover:from-cyan/90 hover:to-blue-600">
              <ScanEye size={17} /> Start New Scan
            </button>
          </div>

          <div className="lg:col-span-2 card p-6 md:p-7 border-r-4 border-r-purple hover:shadow-glow-purple transition-all">
            <h3 className="font-semibold text-ink mb-1">Solution pipeline</h3>
            <p className="text-sm text-ink/55 mb-5">Every screening passes through a full quality-gated pipeline.</p>
            <SolutionPipeline />
          </div>
        </div>
      </section>

      {/* ANALYTICS PREVIEW */}
      <section className="bg-white border-y border-line">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-7">
            <SectionHeading eyebrow="Analytics" title="Screening activity at a glance" />
            <Link to="/analytics" className="text-sm font-medium text-clinical-600 flex items-center gap-1 hover:gap-1.5 transition-all">
              Full analytics <ArrowRight size={15} />
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-5">
            <MonthlyScreeningTrend />
            <RiskDistributionChart />
          </div>
        </div>
      </section>

      {/* ACTIVE PATIENTS */}
      <section id="active-patients" className="max-w-7xl mx-auto px-4 md:px-6 py-16 scroll-mt-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <SectionHeading eyebrow="Active patients" title="Patients needing follow-up or monitoring" />
          <DemoTag>Demo / synthetic patient data</DemoTag>
        </div>
        <PatientTable patients={ACTIVE_PATIENTS} />
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-7xl mx-auto px-4 md:px-6 py-16 scroll-mt-20">
        <SectionHeading
          eyebrow="About the project"
          title="About AstraNetra"
          description="AstraNetra aims to make diabetic-retinopathy screening more accessible in rural India using explainable AI, portable retinal imaging, image-quality assessment and multilingual reporting."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {[
            "Limited access to ophthalmologists",
            "Long travel distances to reach a clinic",
            "Screening cost for low-income households",
            "Poor awareness of diabetic retinopathy risk",
            "Variable-quality retinal images in the field",
            "Weak or intermittent internet connectivity",
            "Need for local-language communication",
          ].map((problem) => (
            <div key={problem} className="card p-4 text-sm text-ink/70 leading-relaxed">{problem}</div>
          ))}
        </div>
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-2">Research datasets referenced</p>
          <div className="flex flex-wrap gap-2">
            {DATASETS.map((d) => (
              <a key={d.name} href={d.url} target="_blank" rel="noreferrer" className="text-xs px-3 py-1.5 rounded-full border border-line hover:bg-mist text-ink/60">
                {d.name}
              </a>
            ))}
          </div>
          <p className="text-xs text-ink/40 mt-2">These datasets are used for research reference only — they are not clinically equivalent to the target rural population.</p>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="bg-gradient-to-b from-ink to-ink/95 text-white scroll-mt-20 relative overflow-hidden">
        {/* Glowing accents */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple/5 rounded-full blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 relative">
          <p className="section-label !text-cyan mb-2">Solution architecture</p>
          <h2 className="text-3xl md:text-4xl font-semibold mb-3">A quality-gated pipeline, not a black box</h2>
          <p className="text-white/60 max-w-2xl mb-8 leading-relaxed">
            Every image is checked, enhanced if needed, and re-checked before any AI classification runs —
            and every classification is explained and referred when confidence is low.
          </p>
          <div className="overflow-x-auto pb-2 -mx-1 px-1">
            <PipelineDiagram />
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {[
              "Early detection", "Lower screening barriers", "Explainable predictions", "Multilingual reports",
              "Offline capability", "Patient history", "Specialist referral", "Quality-gated capture",
            ].map((b) => (
              <div key={b} className="rounded-lg border border-cyan/20 bg-gradient-card px-4 py-3 text-sm text-white/80 hover:border-cyan/40 hover:bg-gradient-to-br hover:from-cyan/10 hover:to-purple/10 transition-all">
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAKEHOLDERS */}
      <section id="stakeholders" className="max-w-7xl mx-auto px-4 md:px-6 py-16 scroll-mt-20">
        <SectionHeading
          eyebrow="Stakeholders"
          title="Who this serves"
          description="Every part of the pipeline is designed around a specific stakeholder's constraints — from the patient in the village to the regulator overseeing health data."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {STAKEHOLDERS.map((s, i) => (
            <StakeholderCard key={s.role} {...s} index={i + 1} />
          ))}
        </div>
      </section>

      {/* RURAL-FIRST + SECURITY */}
      <section className="bg-white border-y border-line">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16 grid lg:grid-cols-2 gap-10">
          <div>
            <SectionHeading eyebrow="Rural-first design" title="Built for low-resource, low-connectivity settings" />
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {[
                "Local-language interface", "Large buttons, minimal typing", "Simple, familiar icons",
                "Offline-first workflow", "Low-bandwidth image compression", "Background sync on reconnect",
                "Clear, plain-language errors", "Tablet-friendly capture screen", "Runs on low-end hardware",
              ].map((f) => (
                <div key={f} className="flex items-center gap-2.5 text-sm text-ink/70">
                  <span className="w-1.5 h-1.5 rounded-full bg-clinical-500 shrink-0" /> {f}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-safe font-medium">
              <WifiOff size={17} /> Offline Screening Ready — results sync automatically when connectivity returns.
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="Security & privacy" title="Patient data handled responsibly" />
            <div className="grid sm:grid-cols-2 gap-3 mt-6">
              {[
                { icon: KeyRound, label: "Role-based access control" },
                { icon: Lock, label: "Encrypted patient data & images" },
                { icon: ClipboardList, label: "Full audit logging" },
                { icon: Fingerprint, label: "Patient ID over personal identifiers" },
                { icon: ShieldCheck, label: "Anonymization for AI training" },
                { icon: Users, label: "Consent management" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2.5 text-sm text-ink/70">
                  <f.icon size={16} className="text-clinical-500 shrink-0" /> {f.label}
                </div>
              ))}
            </div>
            <p className="text-xs text-ink/45 mt-5 leading-relaxed">
              A production deployment of this system must comply with applicable Indian healthcare and
              data-protection requirements. This prototype implements these concepts for demonstration only.
            </p>
          </div>
        </div>
      </section>

      {/* ESTIMATION */}
      <section id="estimation" className="max-w-7xl mx-auto px-4 md:px-6 py-16 scroll-mt-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
          <SectionHeading eyebrow="Project estimation" title="Illustrative pilot cost breakdown" />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <EstimationCard title="Hardware" items={ESTIMATION.hardware} />
          <EstimationCard title="Software" items={ESTIMATION.software} />
          <EstimationCard title="Deployment" items={ESTIMATION.deployment} />
        </div>
        <p className="text-xs text-ink/45 mt-4">
          Illustrative estimates — actual costs depend on hardware, vendor and deployment scale. These figures
          are not an official procurement quote.
        </p>
      </section>

      {/* ROADMAP */}
      <section className="bg-white border-y border-line">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
          <SectionHeading eyebrow="Future roadmap" title="Upcoming solutions" />
          <div className="mt-8">
            <Roadmap items={ROADMAP} />
          </div>
          <div className="mt-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-3">Potential future capabilities</p>
            <div className="flex flex-wrap gap-2">
              {FUTURE_CAPABILITIES.map((c) => (
                <span key={c} className="text-xs px-3 py-1.5 rounded-full bg-mist border border-line text-ink/65">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
