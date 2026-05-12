import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, Briefcase, LayoutDashboard, Building2, Menu } from 'lucide-react';

const Sidebar: React.FC = () => {
  const role = localStorage.getItem('user_role');
  const userName = localStorage.getItem('user_name') || 'User';
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(true);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-2 bg-white rounded-lg border border-slate-200 hover:bg-slate-50"
      >
        <Menu size={20} className="text-slate-700" />
      </button>

      {/* Sidebar */}
      <div
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 w-64 bg-gradient-to-b from-white to-slate-50 text-slate-900 flex flex-col h-screen sticky top-0 border-r border-slate-200 shadow-sm z-30`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AI</span>
            </div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              RecruitAI
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-2">Welcome, {userName}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {role === 'admin' && (
            <NavLink
              to="/admin/companies"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <Building2 size={18} />
              <span>Companies</span>
            </NavLink>
          )}

          {role === 'company' && (
            <NavLink
              to="/company/dashboard"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-blue-50 text-blue-600 border border-blue-200'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>
          )}

          <NavLink
            to="/jobs"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`
            }
          >
            <Briefcase size={18} />
            <span>Jobs</span>
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all border border-red-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/30 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
