import { User, Stethoscope, Camera, ScanSearch, Wand2, Brain, Lightbulb, ShieldAlert, FileText, UserCheck, CalendarClock } from "lucide-react";

const STEPS = [
  { icon: User, label: "Patient" },
  { icon: Stethoscope, label: "Frontline Health Worker" },
  { icon: Camera, label: "Fundus Camera" },
  { icon: ScanSearch, label: "Image Quality AI" },
  { icon: Wand2, label: "Enhancement" },
  { icon: Brain, label: "DR AI Classification" },
  { icon: Lightbulb, label: "Explainable AI" },
  { icon: ShieldAlert, label: "Risk Assessment" },
  { icon: FileText, label: "Report" },
  { icon: UserCheck, label: "Ophthalmologist" },
  { icon: CalendarClock, label: "Follow-up" },
];

export default function SolutionPipeline() {
  return (
    <div className="flex flex-col">
      {STEPS.map((step, i) => (
        <div key={step.label} className="flex items-start gap-4">
          <div className="flex flex-col items-center">
            <div className="w-11 h-11 rounded-full bg-white border-2 border-clinical-400 text-clinical-600 flex items-center justify-center shrink-0">
              <step.icon size={19} />
            </div>
            {i < STEPS.length - 1 && <div className="w-px flex-1 min-h-[28px] bg-line" />}
          </div>
          <div className="pt-2 pb-6">
            <p className="font-medium text-ink text-sm">{step.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
