import React, { useEffect, useState } from 'react';
import api from '../utils/api';

const Companies: React.FC = () => {
  const [companies, setCompanies] = useState([]);
  const [newCompanyName, setNewCompanyName] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | null>(null);
  
  // For adding user to company
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');

  const fetchCompanies = async () => {
    try {
      const res = await api.get('/api/companies/');
      setCompanies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/api/companies/', { name: newCompanyName });
      setNewCompanyName('');
      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddUserToCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompanyId) return;
    try {
      await api.post(`/api/companies/${selectedCompanyId}/add_user/`, {
        username,
        password,
        first_name: firstName
      });
      setUsername('');
      setPassword('');
      setFirstName('');
      alert('User added successfully!');
    } catch (err: any) {
      alert(JSON.stringify(err.response?.data));
    }
  };

  return (
    <div className="p-8 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Company Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side: Company List & Add Company */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-bold mb-4 text-slate-700">Add New Company</h2>
            <form onSubmit={handleAddCompany} className="flex gap-2">
              <input
                type="text"
                className="flex-1 border border-slate-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Company Name"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                required
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors">
                Add
              </button>
            </form>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-700">All Companies</h2>
            </div>
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-bold">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {companies.map((company: any) => (
                  <tr key={company.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-400">#{company.id}</td>
                    <td className="px-6 py-4 font-semibold text-slate-700">{company.name}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedCompanyId(company.id)}
                        className={`px-3 py-1 rounded-lg text-sm font-bold transition-all ${selectedCompanyId === company.id ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Add User to Selected Company */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit sticky top-8">
          <h2 className="text-xl font-bold mb-2 text-slate-700">Assign User to Company</h2>
          {selectedCompanyId ? (
            <p className="text-slate-500 mb-6 text-sm">Adding user to company <span className="font-bold text-blue-600">#{selectedCompanyId}</span></p>
          ) : (
            <p className="text-red-500 mb-6 text-sm font-medium italic">Please select a company from the list first</p>
          )}

          <form onSubmit={handleAddUserToCompany} className="space-y-4">
            <div>
              <label className="block text-slate-600 text-xs font-bold uppercase mb-1 ml-1">Full Name</label>
              <input
                type="text"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-50"
                placeholder="John Doe"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={!selectedCompanyId}
              />
            </div>
            <div>
              <label className="block text-slate-600 text-xs font-bold uppercase mb-1 ml-1">Username</label>
              <input
                type="text"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-50"
                placeholder="johndoe"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={!selectedCompanyId}
              />
            </div>
            <div>
              <label className="block text-slate-600 text-xs font-bold uppercase mb-1 ml-1">Password</label>
              <input
                type="password"
                className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-slate-50"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={!selectedCompanyId}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 shadow-xl shadow-slate-900/10"
              disabled={!selectedCompanyId}
            >
              Create User Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Companies;
