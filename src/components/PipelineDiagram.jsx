import { Camera, ScanSearch, GitBranch, Wand2, RefreshCcw, Brain, ScanLine, Lightbulb, Percent, GitPullRequestArrow, FileCheck2 } from "lucide-react";

const STAGES = [
  { icon: Camera, label: "Fundus Image", tone: "clinical" },
  { icon: ScanSearch, label: "Image Quality Assessment", tone: "clinical" },
  { icon: GitBranch, label: "Quality Gate", tone: "caution" },
  { icon: Wand2, label: "Enhancement", tone: "xai" },
  { icon: RefreshCcw, label: "Quality Recheck", tone: "clinical" },
  { icon: Brain, label: "DR Classification", tone: "xai" },
  { icon: ScanLine, label: "Lesion Localization", tone: "xai" },
  { icon: Lightbulb, label: "Explainable AI", tone: "xai" },
  { icon: Percent, label: "Confidence / Uncertainty", tone: "caution" },
  { icon: GitPullRequestArrow, label: "Referral Decision", tone: "danger" },
  { icon: FileCheck2, label: "Report", tone: "safe" },
];

const TONE = {
  clinical: "border-clinical-400 text-clinical-600 bg-clinical-50",
  caution: "border-amber-300 text-caution bg-amber-50",
  xai: "border-violet-300 text-xai bg-violet-50",
  danger: "border-red-300 text-danger bg-red-50",
  safe: "border-emerald-300 text-safe bg-emerald-50",
};

export default function PipelineDiagram() {
  return (
    <div className="flex flex-wrap items-stretch gap-2 md:gap-2.5">
      {STAGES.map((s, i) => (
        <div key={s.label} className="flex items-center gap-2 md:gap-2.5">
          <div className={`rounded-lg border px-3.5 py-3 flex items-center gap-2.5 min-w-[168px] transition-transform hover:-translate-y-0.5 ${TONE[s.tone]}`}>
            <s.icon size={18} className="shrink-0" />
            <span className="text-[13px] font-medium leading-tight">{s.label}</span>
          </div>
          {i < STAGES.length - 1 && <span className="text-ink/25 hidden md:inline">→</span>}
        </div>
      ))}
    </div>
  );
}
