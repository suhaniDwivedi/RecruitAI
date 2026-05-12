import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/token/', { username, password });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Get user info to redirect based on role
      const userRes = await api.get('/api/users/me/');
      const role = userRes.data.profile?.role || 'student';
      
      localStorage.setItem('user_role', role);
      localStorage.setItem('user_name', userRes.data.first_name || userRes.data.username);

      if (role === 'admin') {
        navigate('/admin/companies');
      } else if (role === 'company') {
        navigate('/company/dashboard');
      } else {
        navigate('/jobs');
      }
    } catch (err: any) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-black p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20">
        <h1 className="text-4xl font-extrabold text-white text-center mb-2 tracking-tight">RecruitAI</h1>
        <p className="text-blue-200 text-center mb-8 font-medium">Welcome back, please login</p>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-blue-100 text-sm font-semibold mb-2 ml-1">Username</label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all placeholder-white/20"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-blue-100 text-sm font-semibold mb-2 ml-1">Password</label>
            <input
              type="password"
              className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all placeholder-white/20"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/50 transform transition-all active:scale-95 mt-4"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-8 text-center text-blue-300/60 text-sm">
          Protected by RecruitAI Security
        </div>
      </div>
    </div>
  );
};

export default Login;
