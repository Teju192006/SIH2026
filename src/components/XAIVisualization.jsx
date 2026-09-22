import { Lightbulb, ShieldQuestion } from "lucide-react";

export default function XAIVisualization({ confidence, uncertainty, stage }) {
  const lowConfidence = confidence < 75;
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-1">
        <Lightbulb size={17} className="text-xai" />
        <h4 className="font-semibold text-ink">Why did the AI flag this image?</h4>
      </div>
      <p className="text-sm text-ink/60 mb-4">Grad-CAM style attention heatmap over the fundus image</p>

      <div className="aspect-[4/3] rounded-lg overflow-hidden relative mb-4 bg-ink">
        <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 42% 40%, #b5623a 0%, #5c2712 60%, #12203a 100%)" }} />
        <div className="absolute inset-0" style={{
          background: "radial-gradient(circle at 62% 45%, rgba(255,80,40,0.55) 0%, rgba(255,80,40,0.0) 30%), radial-gradient(circle at 35% 65%, rgba(255,180,40,0.45) 0%, rgba(255,180,40,0) 26%)",
          mixBlendMode: "screen",
        }} />
        <span className="absolute bottom-2 right-2.5 text-[10px] text-white/60 bg-black/40 px-2 py-0.5 rounded">Simulated heatmap — demo only</span>
      </div>

      <p className="text-sm text-ink/70 leading-relaxed mb-4">
        The model concentrated attention on regions with abnormal vascular and lesion-like patterns
        consistent with a <span className="font-medium text-ink">{stage}</span> classification. Highlighted
        areas do not represent verified clinical findings.
      </p>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-lg bg-violet-50 border border-violet-200 p-3.5">
          <p className="text-xs text-xai/80 font-medium mb-1">AI Confidence</p>
          <p className="text-xl font-display font-semibold text-xai">{confidence}%</p>
        </div>
        <div className="rounded-lg bg-mist border border-line p-3.5">
          <p className="text-xs text-ink/50 font-medium mb-1">Uncertainty</p>
          <p className="text-xl font-display font-semibold text-ink">{uncertainty}%</p>
        </div>
      </div>

      {lowConfidence && (
        <div className="flex items-start gap-2.5 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-3">
          <ShieldQuestion size={18} className="text-caution shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-caution leading-snug">Specialist review recommended — confidence is insufficient for a standalone result.</p>
        </div>
      )}
    </div>
  );
}
