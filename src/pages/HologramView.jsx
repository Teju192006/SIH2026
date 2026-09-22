import { useRef, useState } from 'react';
import { Heart, Brain, Wind, Activity, AlertCircle, TrendingUp, Eye } from 'lucide-react';
import HolographicDisplay from '../components/HolographicDisplay';

const VITAL_SIGNS = [
  { label: 'Visual Acuity', value: '20/20', unit: 'clarity', icon: Eye, status: 'normal', trend: 'optimal' },
  { label: 'Intraocular Pressure', value: '15', unit: 'mmHg', icon: Activity, status: 'normal', trend: 'stable' },
  { label: 'Retinal Blood Flow', value: '98', unit: '%', icon: Wind, status: 'normal', trend: '+2' },
  { label: 'Optic Nerve Health', value: '95', unit: '%', icon: Brain, status: 'normal', trend: 'monitor' },
];

export default function HologramView() {
  const [selectedFeature, setSelectedFeature] = useState('retina');
  const [scanMode, setScanMode] = useState('full-eye');

  return (
    <div className="min-h-screen bg-gradient-hero overflow-hidden flex flex-col relative">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, #00D4FF 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }} />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 md:px-6 py-8 flex flex-col">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-white mb-2">
            <span className="bg-gradient-to-r from-cyan via-blue-300 to-purple bg-clip-text text-transparent">
              👁️ Retinal Scan Analysis
            </span>
          </h1>
          <p className="text-white/60">High-resolution 3D eye model with AI-powered diagnostics</p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6 flex-1">
          {/* Main 3D Display */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="card overflow-hidden border-l-4 border-l-cyan relative flex-1 min-h-[500px]">
              {/* Scan Mode Badge */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan to-blue-500 text-white text-xs font-semibold">
                {scanMode === 'full-eye' ? '👁️ Full Eye Scan' : `🔍 ${selectedFeature.toUpperCase()} Analysis`}
              </div>

              {/* 3D Canvas */}
              <HolographicDisplay />

              {/* Scan Info Cards */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap">
                <div className="bg-black/50 backdrop-blur-md border border-cyan/30 rounded-lg px-3 py-1.5 text-xs text-cyan">
                  Resolution: 8K
                </div>
                <div className="bg-black/50 backdrop-blur-md border border-cyan/30 rounded-lg px-3 py-1.5 text-xs text-cyan">
                  Depth Map: Active
                </div>
                <div className="bg-black/50 backdrop-blur-md border border-cyan/30 rounded-lg px-3 py-1.5 text-xs text-cyan">
                  AI Status: Ready
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Diagnostics & Vitals */}
          <div className="space-y-4 flex flex-col">
            {/* Eye Vitals */}
            <div className="card p-5 border-t-4 border-t-cyan overflow-y-auto max-h-72">
              <h3 className="font-semibold text-ink mb-4 flex items-center gap-2 sticky top-0 bg-white pb-2">
                <Eye size={18} className="text-cyan" />
                Eye Vitals
              </h3>
              <div className="space-y-3">
                {VITAL_SIGNS.map((vital) => (
                  <div key={vital.label} className="p-3 rounded-lg bg-gradient-card border border-cyan/20 hover:border-cyan/40 transition-all">
                    <div className="flex items-start justify-between mb-1">
                      <span className="text-xs font-medium text-ink/70">{vital.label}</span>
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${
                        vital.status === 'normal' 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {vital.status}
                      </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-semibold text-ink">{vital.value}</span>
                      <span className="text-xs text-ink/50">{vital.unit}</span>
                    </div>
                    <div className="text-xs text-cyan mt-1">{vital.trend}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Eye Structure Focus */}
            <div className="card p-5 border-t-4 border-t-purple">
              <h3 className="font-semibold text-ink mb-4 flex items-center gap-2">
                <Eye size={18} className="text-purple" />
                Examine
              </h3>
              <div className="space-y-2">
                {[
                  { id: 'retina', label: 'Retina', emoji: '🔴' },
                  { id: 'opticnerve', label: 'Optic Nerve', emoji: '🟠' },
                  { id: 'vessels', label: 'Blood Vessels', emoji: '🔵' },
                  { id: 'macula', label: 'Macula', emoji: '🟡' },
                ].map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setSelectedFeature(feature.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all font-medium ${
                      selectedFeature === feature.id
                        ? 'bg-gradient-to-r from-cyan/20 to-purple/20 border-cyan/50 shadow-glow-cyan text-ink'
                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-cyan/30 text-ink'
                    }`}
                  >
                    <span className="text-lg">{feature.emoji}</span>
                    <span className="text-sm font-semibold">
                      {feature.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnostic Alert */}
            <div className="card p-4 border-l-4 border-l-emerald-400 bg-gradient-to-br from-emerald-50 to-green-50">
              <div className="flex gap-3">
                <div className="text-lg">✓</div>
                <div>
                  <p className="text-sm font-semibold text-emerald-900 mb-1">Status: Healthy</p>
                  <p className="text-xs text-emerald-800/70">No diabetic retinopathy detected.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Analysis Panels */}
        <div className="grid md:grid-cols-3 gap-4 mt-6">
          <div className="card p-4 border-t-2 border-t-cyan/50">
            <p className="text-xs font-semibold text-cyan mb-2">DIAGNOSTIC RESULT</p>
            <p className="text-sm text-ink/70">Grade: 0 - No DR</p>
            <div className="mt-3 flex gap-1">
              <div className="h-1 flex-1 rounded-full bg-cyan/30" />
              <div className="h-1 flex-1 rounded-full bg-cyan/20" />
              <div className="h-1 flex-1 rounded-full bg-cyan/10" />
            </div>
          </div>

          <div className="card p-4 border-t-2 border-t-purple/50">
            <p className="text-xs font-semibold text-purple mb-2">IMAGE QUALITY</p>
            <p className="text-sm text-ink/70">99.8% Clarity</p>
            <div className="mt-3 text-xs text-ink/50">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1" />
              Excellent
            </div>
          </div>

          <div className="card p-4 border-t-2 border-t-neon/50">
            <p className="text-xs font-semibold text-neon mb-2">ANALYSIS TIME</p>
            <p className="text-sm text-ink/70">0.15 seconds</p>
            <div className="mt-3 text-xs text-ink/50">
              <TrendingUp size={12} className="inline mr-1" />
              Real-time Processing
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
