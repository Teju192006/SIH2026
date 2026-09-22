import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Download, Share2, CalendarClock, Search, ChevronUp, ChevronDown } from "lucide-react";
import RiskBadge from "./RiskBadge";
import DRSeverityBadge from "./DRSeverityBadge";

const PAGE_SIZE = 8;

export default function PatientTable({ patients, columns = "full" }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [sortKey, setSortKey] = useState("lastScan");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);

  const stages = ["All", "No DR", "Mild DR", "Moderate DR", "Severe DR", "Proliferative DR"];
  const risks = ["All", "Low", "Moderate", "High", "Critical"];

  const filtered = useMemo(() => {
    let rows = patients.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.id.toLowerCase().includes(query.toLowerCase()) ||
        p.village.toLowerCase().includes(query.toLowerCase());
      const matchesStage = stageFilter === "All" || p.stage === stageFilter;
      const matchesRisk = riskFilter === "All" || p.risk === riskFilter;
      return matchesQuery && matchesStage && matchesRisk;
    });
    rows.sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return rows;
  }, [patients, query, stageFilter, riskFilter, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function toggleSort(key) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const SortIcon = ({ col }) =>
    sortKey === col ? (sortDir === "asc" ? <ChevronUp size={13} /> : <ChevronDown size={13} />) : null;

  return (
    <div className="card overflow-hidden">
      <div className="p-4 border-b border-line flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/35" />
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); setPage(1); }}
            placeholder="Search name, ID, village..."
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-line focus:outline-none focus:ring-2 focus:ring-clinical-400"
          />
        </div>
        <select value={stageFilter} onChange={(e) => { setStageFilter(e.target.value); setPage(1); }} className="text-sm border border-line rounded-lg px-3 py-2">
          {stages.map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={riskFilter} onChange={(e) => { setRiskFilter(e.target.value); setPage(1); }} className="text-sm border border-line rounded-lg px-3 py-2">
          {risks.map((r) => <option key={r}>{r}</option>)}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink/45 border-b border-line">
              <th className="px-4 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort("id")}>
                <span className="flex items-center gap-1">ID <SortIcon col="id" /></span>
              </th>
              <th className="px-4 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort("name")}>
                <span className="flex items-center gap-1">Patient <SortIcon col="name" /></span>
              </th>
              <th className="px-4 py-3 font-medium">Age</th>
              <th className="px-4 py-3 font-medium">Village</th>
              <th className="px-4 py-3 font-medium cursor-pointer select-none" onClick={() => toggleSort("lastScan")}>
                <span className="flex items-center gap-1">Last Scan <SortIcon col="lastScan" /></span>
              </th>
              <th className="px-4 py-3 font-medium">DR Stage</th>
              <th className="px-4 py-3 font-medium">Risk</th>
              <th className="px-4 py-3 font-medium">Quality</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 && (
              <tr><td colSpan={10} className="px-4 py-10 text-center text-ink/40">No patients match these filters.</td></tr>
            )}
            {pageRows.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0 hover:bg-mist/70">
                <td className="px-4 py-3 font-mono text-xs text-ink/60">{p.id}</td>
                <td className="px-4 py-3 font-medium text-ink">{p.name}</td>
                <td className="px-4 py-3 text-ink/70">{p.age}</td>
                <td className="px-4 py-3 text-ink/70">{p.village}</td>
                <td className="px-4 py-3 text-ink/70">{p.lastScan}</td>
                <td className="px-4 py-3"><DRSeverityBadge stage={p.stage} size="sm" /></td>
                <td className="px-4 py-3"><RiskBadge level={p.risk} size="sm" /></td>
                <td className="px-4 py-3 text-ink/70">{p.imageQuality}%</td>
                <td className="px-4 py-3 text-ink/60">{p.status}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button title="View" onClick={() => navigate(`/patients/${p.id}`)} className="p-1.5 rounded-md hover:bg-line text-ink/60"><Eye size={15} /></button>
                    <button title="Download report" onClick={() => navigate(`/report/${p.id}`)} className="p-1.5 rounded-md hover:bg-line text-ink/60"><Download size={15} /></button>
                    <button title="Share" className="p-1.5 rounded-md hover:bg-line text-ink/60"><Share2 size={15} /></button>
                    <button title="Follow-up" className="p-1.5 rounded-md hover:bg-line text-ink/60"><CalendarClock size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-line text-sm text-ink/60">
        <span>Showing {pageRows.length} of {filtered.length} patients</span>
        <div className="flex items-center gap-2">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-2.5 py-1 rounded-md border border-line disabled:opacity-40">Prev</button>
          <span>{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)} className="px-2.5 py-1 rounded-md border border-line disabled:opacity-40">Next</button>
        </div>
      </div>
    </div>
  );
}
