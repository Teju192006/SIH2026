import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function ScanDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // Only redirect if this was a cold/direct load (no React Router state),
  // not when navigated to from within the app via navigate("/retinascan").
  useEffect(() => {
    // location.key is "default" only on a hard/cold page load.
    // Any in-app navigation sets a unique key.
    if (location.key === "default") {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div style={{ position: "fixed", inset: 0, display: "flex", flexDirection: "column" }}>
      <iframe
        src="/sih2026/index.html"
        title="AstraNetra — Explainable DR Screening"
        style={{ flex: 1, width: "100%", border: "none", display: "block" }}
        allow="camera; microphone"
      />
    </div>
  );
}
