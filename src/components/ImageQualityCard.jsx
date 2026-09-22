import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import QualityMeter from "./QualityMeter";

export default function ImageQualityCard({ metrics }) {
  const { focus, illumination, fieldOfView, artifactsLevel, overall } = metrics;

  let status, Icon, tone;
  if (overall >= 70) {
    status = "Image suitable for screening";
    Icon = CheckCircle2;
    tone = "text-safe bg-emerald-50 border-emerald-200";
  } else if (overall >= 50) {
    status = "Acceptable with caution — proceed carefully";
    Icon = AlertTriangle;
    tone = "text-caution bg-amber-50 border-amber-200";
  } else {
    status = "Retinal image is not suitable for reliable screening.";
    Icon = XCircle;
    tone = "text-danger bg-red-50 border-red-200";
  }

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-ink">Image Quality Assessment</h4>
        <span className="text-2xl font-display font-semibold text-ink">{overall}%</span>
      </div>

      <div className="space-y-3.5 mb-4">
        <QualityMeter label="Focus" score={focus} />
        <QualityMeter label="Illumination" score={illumination} />
        <QualityMeter label="Field of View" score={fieldOfView} />
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink/70">Artifacts</span>
          <span className="font-medium text-ink">{artifactsLevel}</span>
        </div>
      </div>

      <div className={`flex items-start gap-2.5 rounded-lg border px-3.5 py-3 ${tone}`}>
        <Icon size={18} className="shrink-0 mt-0.5" />
        <p className="text-sm font-medium leading-snug">{status}</p>
      </div>

      {overall < 70 && (
        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-ink/40 mb-2">Recommendations</p>
          <ul className="text-sm text-ink/70 space-y-1.5 list-disc list-inside">
            <li>Reposition the patient and stabilise the headrest</li>
            <li>Adjust camera working distance</li>
            <li>Improve room illumination</li>
            <li>Ask the patient to keep their eye open and still</li>
            <li>Clean the camera lens</li>
            <li>Recapture the image</li>
          </ul>
        </div>
      )}
    </div>
  );
}
