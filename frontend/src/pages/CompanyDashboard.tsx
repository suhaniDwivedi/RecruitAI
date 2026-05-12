import React, { useEffect, useState } from 'react';
import { Loader, CheckCircle, Shield, Building } from 'lucide-react';
import api from '../utils/api';
import { showToast } from '../utils/toast';

const CompanyDashboard: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await api.get('/api/users/me/');
      setUserData(res.data);
      showToast.success('Dashboard loaded successfully');
    } catch (err) {
      showToast.error('Failed to load dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={40} />
          <p className="text-slate-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-slate-600 font-medium">Unable to load user data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden mb-8">
          {/* Header Gradient */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-blue-700" />

          {/* Content */}
          <div className="px-6 lg:px-12 pb-10">
            {/* Avatar Section */}
            <div className="flex flex-col items-center -mt-16 mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg border-4 border-white">
                <span className="text-5xl font-bold text-white">
                  {userData.first_name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Welcome back, <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  {userData.first_name || userData.username}
                </span>
              </h1>
              <p className="text-slate-600 text-lg">
                You're connected to <span className="font-semibold text-slate-900">{userData.profile?.company_name || 'your company'}</span>
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Status Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-200 p-2 rounded-lg">
                    <CheckCircle className="text-emerald-600" size={24} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Status</h3>
                </div>
                <p className="text-3xl font-bold text-emerald-600">Active</p>
                <p className="text-sm text-emerald-600/70 mt-1">All systems operational</p>
              </div>

              {/* Role Card */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-200 p-2 rounded-lg">
                    <Shield className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Role</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600 uppercase">
                  {userData.profile?.role || 'N/A'}
                </p>
                <p className="text-sm text-blue-600/70 mt-1">Account type</p>
              </div>

              {/* Company ID Card */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-purple-200 p-2 rounded-lg">
                    <Building className="text-purple-600" size={24} />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">Company ID</h3>
                </div>
                <p className="text-3xl font-bold text-purple-600">
                  #{userData.profile?.company || '0'}
                </p>
                <p className="text-sm text-purple-600/70 mt-1">Unique identifier</p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 pt-8">
              {/* Additional Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-4">Account Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-slate-600 mb-1">Username</p>
                    <p className="font-medium text-slate-900">{userData.username}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 mb-1">Email</p>
                    <p className="font-medium text-slate-900">{userData.email || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center text-slate-600 text-sm">
          <p>Protected by RecruitAI • Dashboard v1.0</p>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;
