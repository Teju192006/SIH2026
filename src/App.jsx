import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import ScanDashboard from "./pages/ScanDashboard";
import Report from "./pages/Report";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import HologramView from "./pages/HologramView";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Security from "./pages/Security";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <Routes>
      {/* Full-screen SIH2026 retina scan dashboard — no layout wrapper */}
      <Route path="/retinascan" element={<ScanDashboard />} />

      <Route path="/hologram" element={
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <HologramView />
          </main>
        </div>
      } />
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="report/:patientId" element={<Report />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="about" element={<About />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="security" element={<Security />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
