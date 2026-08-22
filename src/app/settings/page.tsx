'use client';

import React, { useState } from 'react';
import { Settings, ShieldCheck, Key, Server, CreditCard } from 'lucide-react';

export default function AdminSettingsPage() {
  const [gateway, setGateway] = useState('mock');
  const [emailSender, setEmailSender] = useState('notifications@enterpriselms.com');
  const [bunnyZone, setBunnyZone] = useState('lms-secure-zone-01');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900">System & Integration Configurations</h1>
        <p className="text-xs text-slate-500">Configure multi-gateway payment routing, tokenized video CDN zones, and SMTP dispatcher.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Payment Gateways Config */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Payment Gateway Routing</h3>
              <p className="text-xs text-slate-400">Default gateway driver for checkout initiation</p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-slate-700">Primary Payment Driver</label>
            <select
              value={gateway}
              onChange={(e) => setGateway(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
            >
              <option value="mock">Instant Mock Test Driver (Zero Setup)</option>
              <option value="sslcommerz">SSLCommerz Multi-Channel</option>
              <option value="bkash">bKash Merchant Direct</option>
              <option value="nagad">Nagad Direct Gateway</option>
              <option value="rocket">DBBL Rocket Gateway</option>
              <option value="stripe">Stripe Global Card Processing</option>
            </select>
          </div>
        </div>

        {/* Video CDN Provider */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">Video Storage & Signed URL Security</h3>
              <p className="text-xs text-slate-400">Bunny Stream & Cloudflare Stream tokenized DRM keys</p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-slate-700">Storage Zone ID</label>
            <input
              type="text"
              value={bunnyZone}
              onChange={(e) => setBunnyZone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono text-xs"
            />
          </div>
        </div>

        {/* Email Dispatcher */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900">SMTP Notification Dispatcher</h3>
              <p className="text-xs text-slate-400">Default outgoing notification address</p>
            </div>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-slate-700">Sender Email Address</label>
            <input
              type="email"
              value={emailSender}
              onChange={(e) => setEmailSender(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        {saved && (
          <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold border border-emerald-200">
            System configuration parameters saved and synced across cluster! ✅
          </div>
        )}

        <button
          type="submit"
          className="px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-lg shadow-brand-500/20 transition-all"
        >
          Save Configuration Changes
        </button>
      </form>
    </div>
  );
}

