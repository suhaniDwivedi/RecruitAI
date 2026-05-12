import React, { useEffect, useState } from 'react';
import { Plus, Loader, Check, AlertCircle, Building2, Users, Trash2 } from 'lucide-react';
import api from '../utils/api';
import { showToast } from '../utils/toast';

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [addingCompany, setAddingCompany] = useState(false);
  const [addingUser, setAddingUser] = useState(false);

  // For adding user to company
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await api.get('/api/companies/');
      setCompanies(res.data);
      if (res.data.length === 0) {
        showToast.info('No companies yet. Create one to get started!');
      }
    } catch (err) {
      showToast.error('Failed to fetch companies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim()) {
      showToast.error('Please enter a company name');
      return;
    }

    setAddingCompany(true);
    try {
      await api.post('/api/companies/', { name: newCompanyName });
      setNewCompanyName('');
      showToast.success(`Company "${newCompanyName}" added successfully!`);
      await fetchCompanies();
    } catch (err: any) {
      showToast.error(err.response?.data?.detail || 'Failed to add company');
      console.error(err);
    } finally {
      setAddingCompany(false);
    }
  };

  const handleAddUserToCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompanyId) {
      showToast.error('Please select a company first');
      return;
    }

    if (!firstName.trim() || !username.trim() || !password.trim()) {
      showToast.error('Please fill in all fields');
      return;
    }

    setAddingUser(true);
    try {
      await api.post(`/api/companies/${selectedCompanyId}/add_user/`, {
        username,
        password,
        first_name: firstName
      });
      setUsername('');
      setPassword('');
      setFirstName('');
      showToast.success(`User "${firstName}" added successfully!`);
    } catch (err: any) {
      const errorMessage = err.response?.data?.detail || JSON.stringify(err.response?.data);
      showToast.error(errorMessage);
      console.error(err.response?.data);
    } finally {
      setAddingUser(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={40} />
          <p className="text-slate-600 font-medium">Loading companies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Building2 className="text-blue-600" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-slate-900">Company Management</h1>
              <p className="text-slate-600 text-sm mt-1">Manage companies and assign users</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Add Company & List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add Company Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Plus size={20} className="text-blue-600" />
                Add New Company
              </h2>
              <form onSubmit={handleAddCompany} className="flex gap-3">
                <input
                  type="text"
                  className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-slate-50 transition-all text-slate-900 placeholder-slate-400"
                  placeholder="Enter company name (e.g., Acme Corp)"
                  value={newCompanyName}
                  onChange={(e) => setNewCompanyName(e.target.value)}
                  disabled={addingCompany}
                  required
                />
                <button
                  type="submit"
                  disabled={addingCompany}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold px-8 py-3 rounded-lg transition-all shadow-md shadow-blue-600/30 flex items-center gap-2"
                >
                  {addingCompany ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Add
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Companies Table */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
                <h2 className="text-lg font-bold text-slate-900">All Companies</h2>
                <p className="text-sm text-slate-600 mt-1">{companies.length} registered</p>
              </div>

              {companies.length === 0 ? (
                <div className="p-12 text-center">
                  <Building2 className="mx-auto text-slate-300 mb-4" size={48} />
                  <h3 className="text-slate-600 font-semibold text-lg mb-2">No companies yet</h3>
                  <p className="text-slate-500">Create your first company to get started</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-slate-700">ID</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Company Name</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {companies.map((company: any) => (
                        <tr
                          key={company.id}
                          className={`hover:bg-blue-50 transition-colors cursor-pointer ${
                            selectedCompanyId === company.id ? 'bg-blue-50 border-l-4 border-blue-600' : ''
                          }`}
                        >
                          <td className="px-6 py-4">
                            <span className="text-slate-500 font-mono text-xs bg-slate-100 px-2 py-1 rounded">
                              #{company.id}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-semibold text-slate-900">{company.name}</p>
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => setSelectedCompanyId(company.id)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                selectedCompanyId === company.id
                                  ? 'bg-blue-600 text-white shadow-md'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {selectedCompanyId === company.id ? 'Selected' : 'Select'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Add User Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-4">
              <h2 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                <Users size={20} className="text-blue-600" />
                Assign User
              </h2>

              {!selectedCompanyId ? (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex gap-3">
                    <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Select a company first</p>
                      <p className="text-xs text-yellow-700 mt-1">Choose from the list to assign users</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Check className="text-blue-600 flex-shrink-0" size={18} />
                    <div>
                      <p className="text-sm font-semibold text-blue-900">Company Selected</p>
                      <p className="text-xs text-blue-700 mt-1">
                        {companies.find((c: any) => c.id === selectedCompanyId)?.name || 'Company'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleAddUserToCompany} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2 ml-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-slate-50 disabled:text-slate-400 bg-slate-50 transition-all text-slate-900 placeholder-slate-400"
                    placeholder="John Doe"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={!selectedCompanyId || addingUser}
                    required
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2 ml-1">
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-slate-50 disabled:text-slate-400 bg-slate-50 transition-all text-slate-900 placeholder-slate-400"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={!selectedCompanyId || addingUser}
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-2 ml-1">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none disabled:bg-slate-50 disabled:text-slate-400 bg-slate-50 transition-all text-slate-900 placeholder-slate-400"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!selectedCompanyId || addingUser}
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!selectedCompanyId || addingUser}
                  className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 rounded-lg transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 mt-6"
                >
                  {addingUser ? (
                    <>
                      <Loader size={16} className="animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      <Users size={16} />
                      Create User Account
                    </>
                  )}
                </button>
              </form>

              {/* Info Box */}
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-slate-700 leading-relaxed">
                  <span className="font-semibold text-slate-900">💡 Tip:</span> User credentials will be sent to the registered company email after creation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Companies;
