import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";
import {
  MONTHLY_SCREENINGS, RISK_DISTRIBUTION, DR_SEVERITY_DISTRIBUTION,
  IMAGE_QUALITY_TREND, FOLLOWUP_COMPLETION,
} from "../data/mockData";

const SEVERITY_COLORS = ["#1E8E5A", "#2FA9CE", "#C7811C", "#e8823a", "#C22A2A"];

function ChartCard({ title, children, note }) {
  return (
    <div className="card p-5">
      <h4 className="font-semibold text-ink mb-4">{title}</h4>
      <div style={{ width: "100%", height: 260 }}>{children}</div>
      {note && <p className="text-xs text-ink/40 mt-3">{note}</p>}
    </div>
  );
}

export function MonthlyScreeningTrend() {
  return (
    <ChartCard title="Monthly Screening Trend">
      <ResponsiveContainer>
        <AreaChart data={MONTHLY_SCREENINGS} margin={{ left: -20, right: 10 }}>
          <defs>
            <linearGradient id="screenFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1487AC" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#1487AC" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E1E8F0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area type="monotone" dataKey="screenings" stroke="#1487AC" strokeWidth={2.5} fill="url(#screenFill)" />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function RiskDistributionChart() {
  return (
    <ChartCard title="Patient Risk Distribution">
      <ResponsiveContainer>
        <PieChart>
          <Pie data={RISK_DISTRIBUTION} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
            {RISK_DISTRIBUTION.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
          </Pie>
          <Tooltip formatter={(v) => `${v}%`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SeverityDistributionChart() {
  return (
    <ChartCard title="DR Severity Distribution">
      <ResponsiveContainer>
        <BarChart data={DR_SEVERITY_DISTRIBUTION} margin={{ left: -20, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E1E8F0" />
          <XAxis dataKey="stage" tick={{ fontSize: 10 }} interval={0} angle={-15} textAnchor="end" height={50} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {DR_SEVERITY_DISTRIBUTION.map((entry, i) => <Cell key={entry.stage} fill={SEVERITY_COLORS[i]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function ImageQualityTrendChart() {
  return (
    <ChartCard title="Average Image Quality Score">
      <ResponsiveContainer>
        <LineChart data={IMAGE_QUALITY_TREND} margin={{ left: -20, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E1E8F0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line type="monotone" dataKey="avgQuality" stroke="#6B4FBB" strokeWidth={2.5} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function FollowupCompletionChart() {
  return (
    <ChartCard title="Follow-up Completion" note="Completed vs. missed scheduled follow-ups per month.">
      <ResponsiveContainer>
        <BarChart data={FOLLOWUP_COMPLETION} margin={{ left: -20, right: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E1E8F0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" stackId="a" fill="#1E8E5A" radius={[0, 0, 0, 0]} />
          <Bar dataKey="missed" stackId="a" fill="#C22A2A" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
