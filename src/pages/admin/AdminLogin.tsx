import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck, ArrowRight, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AuthContext';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const ok = login(email, password);
    if (ok) {
      navigate('/admin');
    } else {
      setError('Invalid admin credentials. Please verify your email and password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-4 bg-gradient-to-b from-[#0b1d30] to-navy">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 sm:p-10 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-[#006bb6] flex items-center justify-center mx-auto mb-4 text-[#006bb6] shadow-sm">
            <Lock className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#006bb6] block mb-1">
            Secure Portal
          </span>
          <h1 className="text-2xl font-black text-navy tracking-tight">
            BAYAN PROJECTS
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Media Management & Administration Panel
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2.5 text-xs text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="mkccc86@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-navy focus:bg-white focus:outline-none focus:border-[#006bb6] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-navy focus:bg-white focus:outline-none focus:border-[#006bb6] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#006bb6] hover:bg-[#005590] text-white font-bold rounded-lg text-sm shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 mt-2"
          >
            <span>Log In to Media Manager</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <div className="inline-flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Encrypted Session • Base64 Storage Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

