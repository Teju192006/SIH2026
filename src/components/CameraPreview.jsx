import { Camera, RotateCcw, Upload, Eye } from "lucide-react";

export default function CameraPreview({ stage, capturedImage, onCapture, onUpload, onRetake }) {
  return (
    <div className="card overflow-hidden">
      <div className="aspect-[4/3] bg-ink relative flex items-center justify-center">
        {capturedImage ? (
          <div className="absolute inset-0 bg-gradient-radial flex items-center justify-center" style={{ background: "radial-gradient(circle at center, #7a3a1f 0%, #2b1108 55%, #0B1F3A 100%)" }}>
            <div className="w-56 h-56 rounded-full border-4 border-white/10" style={{ background: "radial-gradient(circle at 40% 35%, #c9713f, #7a3a1f 60%, #401d0f 100%)" }}>
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-70">
                <circle cx="100" cy="100" r="14" fill="#ffe9d6" opacity="0.9" />
                {[...Array(7)].map((_, i) => (
                  <path
                    key={i}
                    d={`M100,100 Q ${100 + 60 * Math.cos((i * 51 * Math.PI) / 180)},${100 + 60 * Math.sin((i * 51 * Math.PI) / 180)} ${100 + 95 * Math.cos((i * 51 * Math.PI) / 180)},${100 + 95 * Math.sin((i * 51 * Math.PI) / 180)}`}
                    stroke="#8a2b20"
                    strokeWidth="2.5"
                    fill="none"
                  />
                ))}
              </svg>
            </div>
          </div>
        ) : (
          <div className="text-white/40 flex flex-col items-center gap-2">
            <Eye size={40} strokeWidth={1.5} />
            <p className="text-sm">Live camera preview</p>
          </div>
        )}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/40 backdrop-blur px-2.5 py-1 rounded-full text-xs text-white">
          <span className="w-1.5 h-1.5 rounded-full bg-safe animate-pulse" />
          Camera Connected
        </div>
        {stage === "captured" && (
          <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur px-2.5 py-1 rounded-full text-xs text-white">
            Fundus image — right eye — demo capture
          </div>
        )}
      </div>
      <div className="p-4 flex flex-wrap gap-3">
        {stage !== "captured" ? (
          <>
            <button onClick={onCapture} className="btn-primary flex-1 justify-center">
              <Camera size={16} /> Capture Image
            </button>
            <button onClick={onUpload} className="btn-secondary flex-1 justify-center">
              <Upload size={16} /> Upload Image
            </button>
          </>
        ) : (
          <button onClick={onRetake} className="btn-secondary flex-1 justify-center">
            <RotateCcw size={16} /> Retake
          </button>
        )}
      </div>
    </div>
  );
}
