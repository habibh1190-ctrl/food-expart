import React, { useState } from 'react';
import { adminLogin } from '../services/dataService';
import { Shield, Lock, ArrowLeft, KeyRound, AlertCircle } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setError('Please enter the administrator password.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await adminLogin(password);
      if (res.success) {
        onSuccess();
      } else {
        setError(res.error || 'Invalid administrator password.');
      }
    } catch {
      setError('An error occurred during verification.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setPassword('admin123');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8">
        {/* Top Cancel / Back button */}
        <button
          onClick={onCancel}
          className="absolute top-4 left-4 text-neutral-400 hover:text-white flex items-center gap-1.5 text-xs font-semibold min-h-[44px] px-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Exit to Website</span>
        </button>

        {/* Lock Icon */}
        <div className="mt-6 mx-auto h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
          <Shield className="h-7 w-7" />
        </div>

        <div className="text-center space-y-1 mb-6">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Admin Authentication
          </h2>
          <p className="text-xs text-neutral-400">
            Secure administrative control panel for Food Expert
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2.5 text-xs text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password..."
                className="w-full pl-10 pr-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl text-base sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-amber-500 min-h-[48px]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full min-h-[48px] py-3.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md active:scale-[0.99]"
          >
            <KeyRound className="h-4 w-4" />
            <span>{loading ? 'Verifying...' : 'Access Dashboard'}</span>
          </button>
        </form>

        {/* First time setup hint */}
        <div className="mt-6 pt-4 border-t border-neutral-800 text-center space-y-2">
          <p className="text-[11px] text-neutral-400">
            Default initial password is: <span className="font-mono text-amber-400 font-bold">admin123</span>
          </p>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[11px] font-semibold text-amber-400/90 hover:underline"
          >
            Auto-fill demo password
          </button>
          <p className="text-[10px] text-neutral-400">
            (You can customize this password anytime in Admin Settings)
          </p>
        </div>
      </div>
    </div>
  );
};
