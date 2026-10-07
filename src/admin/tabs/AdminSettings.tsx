import React, { useState } from 'react';
import { RestaurantSettings } from '../../types';
import { saveSettings, changeAdminPassword, resetDataToDefaults } from '../../services/dataService';
import { Save, KeyRound, RotateCcw, Check, AlertCircle } from 'lucide-react';

interface AdminSettingsProps {
  settings: RestaurantSettings;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ settings }) => {
  const [formData, setFormData] = useState<RestaurantSettings>(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Password change state
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (field: keyof RestaurantSettings, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    saveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }

    if (newPassword.length < 6) {
      setPasswordMsg({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }

    const res = await changeAdminPassword(oldPassword, newPassword);
    if (res.success) {
      setPasswordMsg({ type: 'success', text: 'Password successfully updated!' });
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPasswordMsg({ type: 'error', text: res.error || 'Failed to update password.' });
    }
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to restore all categories, products, orders, and settings back to original defaults?')) {
      resetDataToDefaults();
      setFormData(settings);
      alert('Data restored to initial defaults.');
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Website & Restaurant Settings
          </h1>
          <p className="text-sm text-neutral-400 mt-1">
            Configure contact numbers, WhatsApp ordering hotline, delivery pricing, and security.
          </p>
        </div>

        {savedSuccess && (
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-lg text-xs font-bold">
            <Check className="h-4 w-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        {/* Brand identity */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Brand Identity</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Restaurant Name *
              </label>
              <input
                type="text"
                required
                value={formData.restaurantName}
                onChange={e => handleChange('restaurantName', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Tagline / Slogan
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={e => handleChange('tagline', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp & Contact */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Contact & WhatsApp Ordering Hotline</h3>
          <p className="text-xs text-neutral-400">
            This WhatsApp number receives all 1-click orders formatted with item breakdown and customer details.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-400 mb-1.5">
                WhatsApp Order Number (International format e.g. +15557893663) *
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={e => handleChange('whatsappNumber', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-emerald-500/40 rounded-lg text-sm text-white focus:outline-none focus:border-emerald-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Phone Number (for general calls) *
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Physical Street Address *
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={e => handleChange('address', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Operating / Opening Hours *
              </label>
              <input
                type="text"
                required
                value={formData.openingHours}
                onChange={e => handleChange('openingHours', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Financial & Delivery rules */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-white">Pricing & Delivery Logistics</h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Currency Symbol
              </label>
              <input
                type="text"
                value={formData.currency}
                onChange={e => handleChange('currency', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Standard Delivery Fee
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.deliveryFee}
                onChange={e => handleChange('deliveryFee', parseFloat(e.target.value) || 0)}
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
                Free Delivery Minimum Order
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.freeDeliveryThreshold}
                onChange={e =>
                  handleChange('freeDeliveryThreshold', parseFloat(e.target.value) || 0)
                }
                className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500 tabular-nums"
              />
            </div>
          </div>
        </div>

        {/* Submit general settings */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Save className="h-4 w-4" />
            <span>Save Restaurant Settings</span>
          </button>
        </div>
      </form>

      {/* Security & Password Section */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-white">
          <KeyRound className="h-5 w-5 text-amber-500" />
          <h3 className="text-base font-bold">Admin Password & Security</h3>
        </div>
        <p className="text-xs text-neutral-400">
          Passwords are cryptographic SHA-256 hashed and verified client/session side. Never plain text.
        </p>

        {passwordMsg && (
          <div
            className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              passwordMsg.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
                : 'bg-red-500/10 border border-red-500/30 text-red-400'
            }`}
          >
            {passwordMsg.type === 'success' ? (
              <Check className="h-4 w-4 shrink-0" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0" />
            )}
            <span>{passwordMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Current Password
            </label>
            <input
              type="password"
              required
              value={oldPassword}
              onChange={e => setOldPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              New Password (min 6 characters)
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-neutral-300 mb-1.5">
              Confirm New Password
            </label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-neutral-950 border border-neutral-800 rounded-lg text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs rounded-xl transition-colors"
          >
            Update Admin Password
          </button>
        </form>
      </div>

      {/* Danger Zone / Sample Reset */}
      <div className="bg-neutral-900 border border-red-500/20 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Restore Factory Seed Data</h4>
          <p className="text-xs text-neutral-400 mt-0.5">
            Reset all categories, products, customer reviews, and orders back to initial demo items.
          </p>
        </div>

        <button
          type="button"
          onClick={handleResetData}
          className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset All Data</span>
        </button>
      </div>
    </div>
  );
};
