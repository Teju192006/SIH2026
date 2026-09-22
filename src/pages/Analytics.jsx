import DemoTag from "../components/DemoTag";
import {
  MonthlyScreeningTrend, RiskDistributionChart, SeverityDistributionChart,
  ImageQualityTrendChart, FollowupCompletionChart,
} from "../components/ReportCharts";
import StatCard from "../components/StatCard";
import { ScanEye, AlertTriangle, Send, CalendarClock } from "lucide-react";
import { OVERVIEW_STATS } from "../data/mockData";

export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
      <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Analytics</h1>
          <p className="text-sm text-ink/55 mt-1">Screening volume, risk distribution and outcomes over time.</p>
        </div>
        <DemoTag>Demo data — not real patient information</DemoTag>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Screenings" value={OVERVIEW_STATS.totalScreenings.toLocaleString()} icon={ScanEye} accent="clinical" />
        <StatCard label="At Risk" value={OVERVIEW_STATS.atRisk} icon={AlertTriangle} accent="caution" />
        <StatCard label="Referred" value={OVERVIEW_STATS.referred} icon={Send} accent="danger" />
        <StatCard label="Follow-ups Due" value={OVERVIEW_STATS.followUpsDue} icon={CalendarClock} accent="xai" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <MonthlyScreeningTrend />
        <RiskDistributionChart />
        <SeverityDistributionChart />
        <ImageQualityTrendChart />
        <div className="lg:col-span-2"><FollowupCompletionChart /></div>
      </div>
    </div>
  );
}
