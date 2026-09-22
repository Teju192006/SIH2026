import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Download, Eye, ArrowLeft, Stethoscope, Languages } from "lucide-react";
import DemoTag from "../components/DemoTag";
import DRSeverityBadge from "../components/DRSeverityBadge";
import RiskBadge from "../components/RiskBadge";
import LanguageSelector from "../components/LanguageSelector";
import PatientTimeline from "../components/PatientTimeline";
import { PATIENTS, REPORT_SUMMARY_TRANSLATIONS, LANGUAGES } from "../data/mockData";

export default function Report() {
  const { patientId } = useParams();
  const patient = PATIENTS.find((p) => p.id === patientId) || PATIENTS[0];
  const [lang, setLang] = useState("en");
  const [showPreview, setShowPreview] = useState(false);
  const langName = LANGUAGES.find((l) => l.code === lang)?.name || "English";

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-ink/55 hover:text-ink mb-4">
        <ArrowLeft size={15} /> Back to dashboard
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Screening Report — {patient.id}</h1>
          <p className="text-sm text-ink/55 mt-1">{patient.name} · {patient.village}, {patient.district}</p>
        </div>
        <DemoTag>Demo data — not real patient information</DemoTag>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-4">Patient Summary</h3>
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                ["Name", patient.name], ["Age", patient.age], ["Gender", patient.gender],
                ["Diabetes duration", patient.diabetesDuration], ["Blood glucose", patient.bloodGlucose],
                ["Blood pressure", patient.bloodPressure], ["Previous DR history", patient.previousDrHistory],
                ["Village / district", `${patient.village}, ${patient.district}`],
              ].map(([label, val]) => (
                <div key={label} className="flex justify-between border-b border-line/70 pb-2">
                  <span className="text-ink/50">{label}</span>
                  <span className="font-medium text-ink">{val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-4">Screening & AI Result</h3>
            <div className="grid sm:grid-cols-4 gap-4 mb-4">
              <div>
                <p className="text-xs text-ink/45 mb-1.5">Screening date</p>
                <p className="font-medium text-ink text-sm">{patient.lastScan}</p>
              </div>
              <div>
                <p className="text-xs text-ink/45 mb-1.5">Image quality</p>
                <p className="font-medium text-ink text-sm">{patient.imageQuality}%</p>
              </div>
              <div>
                <p className="text-xs text-ink/45 mb-1.5">Severity</p>
                <DRSeverityBadge stage={patient.stage} size="sm" />
              </div>
              <div>
                <p className="text-xs text-ink/45 mb-1.5">Risk</p>
                <RiskBadge level={patient.risk} size="sm" />
              </div>
            </div>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {Object.entries(patient.lesions).map(([k, v]) => (
                <div key={k} className="rounded-lg border border-line px-3 py-2 flex items-center justify-between text-sm">
                  <span className="text-ink/60 capitalize">{k.replace(/([A-Z])/g, " $1")}</span>
                  <span className={v > 0 ? "text-danger font-medium" : "text-ink/35"}>{v}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-ink/70 leading-relaxed border-t border-line pt-4">
              <span className="font-medium text-ink">Explanation: </span>
              The model concentrated attention on vascular and lesion-like regions consistent with a {patient.stage} classification, with {patient.confidence}% confidence.
            </p>
            <p className="text-xs text-ink/45 mt-3">AI-assisted screening result. This does not replace examination by a qualified ophthalmologist.</p>
          </div>

          <PatientTimeline progression={patient.progression} />

          <div className="card p-5">
            <h3 className="font-semibold text-ink mb-3">Recommendations & Follow-up</h3>
            <p className="text-sm text-ink/70 leading-relaxed mb-3">
              {REPORT_SUMMARY_TRANSLATIONS.en}
            </p>
            <div className="flex items-center gap-2 text-sm text-ink/60">
              <Stethoscope size={15} className="text-clinical-500" /> Next follow-up recommended by <span className="font-medium text-ink">{patient.nextFollowUp}</span>
            </div>
            <div className="mt-3 text-sm text-ink/60">Doctor review status: <span className="font-medium text-ink">Pending ophthalmologist confirmation</span></div>
          </div>
        </div>

        {/* Right rail: language + download */}
        <div className="space-y-6">
          <div className="card p-5 lg:sticky lg:top-24">
            <LanguageSelector value={lang} onChange={setLang} />
            <div className="mt-5 flex flex-col gap-2.5">
              <button onClick={() => setShowPreview(true)} className="btn-secondary w-full justify-center">
                <Eye size={16} /> Preview Report
              </button>
              <button onClick={() => window.print()} className="btn-primary w-full justify-center">
                <Download size={16} /> Download PDF
              </button>
            </div>
            <p className="text-xs text-ink/40 mt-3 leading-relaxed">
              Report language: <span className="font-medium text-ink/60">{langName}</span>. In this prototype, only the plain-language summary line is translated per language.
            </p>
          </div>
        </div>
      </div>

      {showPreview && (
        <div className="fixed inset-0 bg-ink/50 flex items-center justify-center p-4 z-50" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4 text-clinical-600">
              <Languages size={16} /> <span className="text-sm font-medium">{langName} report preview</span>
            </div>
            <h3 className="font-semibold text-ink mb-1">AstraNetra — Screening Report</h3>
            <p className="text-sm text-ink/60 mb-4">{patient.name} · {patient.id} · {patient.lastScan}</p>
            <p className="text-sm text-ink/80 leading-relaxed border border-line rounded-lg p-4 bg-mist">
              {REPORT_SUMMARY_TRANSLATIONS[lang] || REPORT_SUMMARY_TRANSLATIONS.en}
            </p>
            <button onClick={() => setShowPreview(false)} className="btn-secondary w-full justify-center mt-5">Close preview</button>
          </div>
        </div>
      )}
    </div>
  );
}
