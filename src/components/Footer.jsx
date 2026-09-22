import { Eye, Mail, Github, FileText, Building2 } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white/80 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="w-8 h-8 rounded-lg bg-clinical-500 flex items-center justify-center">
              <Eye size={16} className="text-white" />
            </span>
            <span className="font-display font-semibold text-white text-[15px]">AstraNetra</span>
          </div>
          <p className="text-sm text-white/55 max-w-sm leading-relaxed">
            An explainable AI screening prototype for diabetic retinopathy, built for rural
            healthcare access under Smart India Hackathon problem statement SIH26038.
          </p>
          <p className="text-xs text-white/35 mt-4">
            Prototype for academic/hackathon evaluation. Not a certified medical device.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-white/40 mb-3 font-medium">Project</p>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Building2 size={14} className="text-white/40" /> Your Institution Name</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-white/40" /> team@example.com</li>
            <li className="flex items-center gap-2"><Github size={14} className="text-white/40" /> github.com/your-project</li>
            <li className="flex items-center gap-2"><FileText size={14} className="text-white/40" /> Research documentation on request</li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-white/40 mb-3 font-medium">Research datasets referenced</p>
          <ul className="space-y-2 text-sm text-white/60">
            <li>APTOS 2019 Blindness Detection</li>
            <li>IDRiD (Indian DR Image Dataset)</li>
            <li>DRIVE — Retinal Vessel Extraction</li>
            <li>Messidor-2</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/35">
        SIH26038 — AstraNetra is a demo prototype. Screening results require ophthalmologist confirmation.
      </div>
    </footer>
  );
}
