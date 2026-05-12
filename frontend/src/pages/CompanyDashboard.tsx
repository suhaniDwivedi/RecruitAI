import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const CompanyDashboard: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/api/users/me/');
        setUserData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  if (!userData) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="bg-slate-800 border border-slate-700 p-12 rounded-3xl shadow-2xl max-w-2xl w-full text-center">
        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-xl shadow-blue-900/20">
          <span className="text-3xl font-bold text-white">HI</span>
        </div>
        <h1 className="text-5xl font-black text-white mb-4 tracking-tight">
          Hello <span className="text-blue-500">{userData.first_name || userData.username}</span>,
        </h1>
        <p className="text-2xl text-slate-400 font-medium">
          from company <span className="text-white italic underline decoration-blue-500/50 decoration-4 underline-offset-8">{userData.profile?.company_name || 'N/A'}</span>
        </p>
        
        <div className="mt-16 grid grid-cols-3 gap-4">
            <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700">
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Status</div>
                <div className="text-green-400 font-bold">Active</div>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700">
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Role</div>
                <div className="text-blue-400 font-bold uppercase">{userData.profile?.role}</div>
            </div>
            <div className="bg-slate-700/30 p-4 rounded-xl border border-slate-700">
                <div className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Company ID</div>
                <div className="text-slate-300 font-bold">#{userData.profile?.company || '0'}</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
