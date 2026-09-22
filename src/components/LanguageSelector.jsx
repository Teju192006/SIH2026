import { Languages } from "lucide-react";
import { LANGUAGES } from "../data/mockData";

export default function LanguageSelector({ value, onChange }) {
  return (
    <div>
      <p className="text-sm font-medium text-ink mb-2 flex items-center gap-1.5">
        <Languages size={15} className="text-clinical-500" /> Choose report language
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {LANGUAGES.map((l) => (
          <button
            key={l.code}
            onClick={() => onChange(l.code)}
            className={`text-sm text-left px-3 py-2 rounded-lg border transition-colors ${
              value === l.code ? "border-clinical-500 bg-clinical-50 text-clinical-700 font-medium" : "border-line hover:bg-mist text-ink/70"
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>
    </div>
  );
}
