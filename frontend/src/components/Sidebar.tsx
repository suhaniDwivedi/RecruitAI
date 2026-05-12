import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const role = localStorage.getItem('user_role');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col h-screen sticky top-0 border-r border-slate-800">
      <div className="p-8 border-b border-slate-800">
        <h2 className="text-2xl font-black tracking-tighter text-blue-500">RecruitAI</h2>
        <div className="mt-1 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">System Online</span>
        </div>
      </div>
      
      <nav className="flex-1 p-6 space-y-2">
        {role === 'admin' && (
          <NavLink
            to="/admin/companies"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span>Companies</span>
          </NavLink>
        )}
        
        {role === 'company' && (
          <NavLink
            to="/company/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <span>Dashboard</span>
          </NavLink>
        )}

        <NavLink
          to="/jobs"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
              isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`
          }
        >
          <span>Jobs List</span>
        </NavLink>
      </nav>

      <div className="p-6 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold bg-slate-800 text-slate-400 hover:bg-red-900/20 hover:text-red-400 transition-all border border-slate-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
