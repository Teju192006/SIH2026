import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { DR_STAGES } from "../data/mockData";

export default function PatientTimeline({ progression }) {
  const data = progression.map((p) => ({ month: p.month, stageIndex: p.stageIndex, stage: p.stage }));
  return (
    <div className="card p-5">
      <h4 className="font-semibold text-ink mb-1">Longitudinal Disease Progression</h4>
      <p className="text-xs text-ink/50 mb-4">Trend is intended for monitoring and does not replace ophthalmologist assessment.</p>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ left: -10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E1E8F0" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#0B1F3A99" }} />
            <YAxis
              domain={[0, 4]}
              ticks={[0, 1, 2, 3, 4]}
              tickFormatter={(v) => DR_STAGES[v]}
              width={100}
              tick={{ fontSize: 11, fill: "#0B1F3A99" }}
            />
            <Tooltip formatter={(v) => DR_STAGES[v]} labelFormatter={(l) => `Month: ${l}`} />
            <Line type="monotone" dataKey="stageIndex" stroke="#1487AC" strokeWidth={2.5} dot={{ r: 4, fill: "#1487AC" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
