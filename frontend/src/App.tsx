import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Login from "./pages/Login";
import Companies from "./pages/Companies";
import CompanyDashboard from "./pages/CompanyDashboard";
import CompanySettings from "./pages/CompanySettings";
import Jobs from "./pages/Jobs";
import Sidebar from "./components/Sidebar";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Toaster
        position="top-right"
        theme="light"
        richColors
        closeButton
        expand
      />
      {!isLoginPage && <Sidebar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/companies" element={<Companies />} />
          <Route path="/company/dashboard" element={<CompanyDashboard />} />
          <Route path="/company/settings" element={<CompanySettings />} />
          <Route path="/jobs" element={<Jobs />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;