'use client';

import React, { useState } from 'react';
import {
  Send,
  Tag,
  Gift,
  Share2,
  Mail,
  Smartphone,
  Plus,
  Search,
  CheckCircle2,
  TrendingUp,
  Percent,
  Calendar,
  Users,
  Copy,
  Check,
} from 'lucide-react';

interface CouponItem {
  id: string;
  code: string;
  discountPercentage: number;
  maxDiscountAmount: number;
  minSpend: number;
  totalUsed: number;
  maxUsage: number;
  expiryDate: string;
  status: 'ACTIVE' | 'EXPIRED' | 'DISABLED';
}

const DUMMY_COUPONS: CouponItem[] = [
  {
    id: 'c-1',
    code: 'EID2026',
    discountPercentage: 25,
    maxDiscountAmount: 1500,
    minSpend: 2000,
    totalUsed: 142,
    maxUsage: 500,
    expiryDate: '2026-09-30',
    status: 'ACTIVE',
  },
  {
    id: 'c-2',
    code: 'DEVLAUNCH',
    discountPercentage: 20,
    maxDiscountAmount: 1000,
    minSpend: 1500,
    totalUsed: 380,
    maxUsage: 400,
    expiryDate: '2026-08-31',
    status: 'ACTIVE',
  },
  {
    id: 'c-3',
    code: 'STUDENT500',
    discountPercentage: 15,
    maxDiscountAmount: 500,
    minSpend: 1000,
    totalUsed: 890,
    maxUsage: 1000,
    expiryDate: '2026-12-31',
    status: 'ACTIVE',
  },
];

export default function MarketingManagementPage() {
  const [activeTab, setActiveTab] = useState<'coupons' | 'referral' | 'email' | 'sms'>('coupons');
  const [coupons, setCoupons] = useState<CouponItem[]>(DUMMY_COUPONS);
  const [createCouponOpen, setCreateCouponOpen] = useState(false);

  // Email form state
  const [emailSubject, setEmailSubject] = useState('');
  const [emailAudience, setEmailAudience] = useState('ALL_STUDENTS');
  const [emailBody, setEmailBody] = useState('');

  // SMS form state
  const [smsMessage, setSmsMessage] = useState('');
  const [smsAudience, setSmsAudience] = useState('ACTIVE_STUDENTS');

  // New coupon state
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState('20');
  const [newExpiry, setNewExpiry] = useState('2026-12-31');

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const item: CouponItem = {
      id: `c-${Date.now()}`,
      code: newCode.toUpperCase(),
      discountPercentage: Number(newDiscount),
      maxDiscountAmount: 1000,
      minSpend: 1000,
      totalUsed: 0,
      maxUsage: 500,
      expiryDate: newExpiry,
      status: 'ACTIVE',
    };
    setCoupons([item, ...coupons]);
    setCreateCouponOpen(false);
    setNewCode('');
    alert(`Coupon ${item.code} created and activated!`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Marketing & Growth Campaigns</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage discount vouchers, affiliate referral programs, bulk email newsletters, and SMS broadcasts.
          </p>
        </div>

        {activeTab === 'coupons' && (
          <button
            onClick={() => setCreateCouponOpen(true)}
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-2xl shadow-lg shadow-brand-500/25 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Promo Coupon</span>
          </button>
        )}
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Active Promo Vouchers</span>
          <h3 className="text-2xl font-black text-slate-900">{coupons.length} Active</h3>
          <p className="text-[11px] text-emerald-600 font-bold">1,412 Total Redemptions</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Affiliate Commissions Paid</span>
          <h3 className="text-2xl font-black text-brand-600">৳ 184,500</h3>
          <p className="text-[11px] text-slate-400">15% Standard Commission</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Email Deliverability</span>
          <h3 className="text-2xl font-black text-indigo-600">99.4%</h3>
          <p className="text-[11px] text-slate-400">AWS SES Dedicated IP</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">SMS Gateway Balance</span>
          <h3 className="text-2xl font-black text-amber-600">4,850 SMS</h3>
          <p className="text-[11px] text-slate-400">Greenweb BD Gateway</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold pb-2">
        {[
          { id: 'coupons', label: 'Coupons & Vouchers', icon: <Tag className="w-3.5 h-3.5" /> },
          { id: 'referral', label: 'Affiliate & Referral Rules', icon: <Share2 className="w-3.5 h-3.5" /> },
          { id: 'email', label: 'Bulk Email Broadcast', icon: <Mail className="w-3.5 h-3.5" /> },
          { id: 'sms', label: 'SMS Campaign Sender', icon: <Smartphone className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: COUPONS */}
      {activeTab === 'coupons' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base">Active Discount Coupons</h3>
            <span className="text-xs text-slate-400">Auto-applied at checkout upon validation</span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-3.5">Promo Code</th>
                  <th className="p-3.5">Discount</th>
                  <th className="p-3.5">Min Spend</th>
                  <th className="p-3.5">Max Cap</th>
                  <th className="p-3.5">Usage / Limit</th>
                  <th className="p-3.5">Expiry Date</th>
                  <th className="p-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coupons.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-mono font-black text-brand-600 text-sm">{c.code}</td>
                    <td className="p-3.5 font-bold text-slate-900">{c.discountPercentage}% OFF</td>
                    <td className="p-3.5 text-slate-600">৳ {c.minSpend}</td>
                    <td className="p-3.5 text-slate-600">৳ {c.maxDiscountAmount}</td>
                    <td className="p-3.5">
                      <div className="space-y-1">
                        <span className="font-bold text-slate-800">{c.totalUsed} / {c.maxUsage}</span>
                        <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-brand-600 h-full" style={{ width: `${(c.totalUsed / c.maxUsage) * 100}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="p-3.5 text-slate-500 whitespace-nowrap">{c.expiryDate}</td>
                    <td className="p-3.5 text-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: REFERRAL RULES */}
      {activeTab === 'referral' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <h3 className="font-black text-slate-900 text-base">Affiliate Commission Matrix</h3>
            <p className="text-xs text-slate-500">Configure global student referral reward rates and payout thresholds.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <label className="font-bold text-slate-900 block">Standard Commission Rate:</label>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue="15" className="w-20 p-2.5 rounded-xl border border-slate-200 font-bold bg-white text-sm" />
                <span className="font-bold text-slate-700">% per paid enrollment</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <label className="font-bold text-slate-900 block">Referred Friend Discount:</label>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue="15" className="w-20 p-2.5 rounded-xl border border-slate-200 font-bold bg-white text-sm" />
                <span className="font-bold text-slate-700">% off course price</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <label className="font-bold text-slate-900 block">Minimum Payout Threshold:</label>
              <div className="flex items-center gap-2">
                <input type="number" defaultValue="500" className="w-24 p-2.5 rounded-xl border border-slate-200 font-bold bg-white text-sm" />
                <span className="font-bold text-slate-700">BDT</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100">
            <button
              onClick={() => alert('Referral rules updated globally!')}
              className="px-6 py-2.5 bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Save Affiliate Rules
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: EMAIL BROADCAST */}
      {activeTab === 'email' && (
        <form onSubmit={(e) => { e.preventDefault(); alert('Email newsletter dispatched to audience!'); }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5 animate-fadeIn text-xs">
          <div className="space-y-1">
            <h3 className="font-black text-slate-900 text-base">Bulk Email Newsletter & Announcements</h3>
            <p className="text-xs text-slate-500">Send high-deliverability HTML announcements to enrolled students.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-900">Target Audience:</label>
              <select
                value={emailAudience}
                onChange={(e) => setEmailAudience(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none"
              >
                <option value="ALL_STUDENTS">All Registered Students (840)</option>
                <option value="ENROLLED_NEXTJS">Full-Stack Next.js Enrolled Only (120)</option>
                <option value="ENROLLED_FLUTTER">Flutter Masterclass Enrolled Only (95)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-900">Subject Line:</label>
              <input
                type="text"
                required
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                placeholder="e.g. 🚀 Special Weekend Masterclass Lab: Next.js 14 Streaming"
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-900">Email Body (Markdown / HTML Supported):</label>
            <textarea
              required
              rows={6}
              value={emailBody}
              onChange={(e) => setEmailBody(e.target.value)}
              placeholder="Write your announcement or newsletter content here..."
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" /> Send Email Broadcast
            </button>
          </div>
        </form>
      )}

      {/* TAB 4: SMS CAMPAIGN */}
      {activeTab === 'sms' && (
        <form onSubmit={(e) => { e.preventDefault(); alert('SMS broadcast triggered to registered phones!'); }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5 animate-fadeIn text-xs">
          <div className="space-y-1">
            <h3 className="font-black text-slate-900 text-base">Bangladeshi SMS Gateway Broadcast</h3>
            <p className="text-xs text-slate-500">Send urgent class start alerts or coupon notices directly to mobile SMS.</p>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-900">SMS Target Group:</label>
            <select
              value={smsAudience}
              onChange={(e) => setSmsAudience(e.target.value)}
              className="w-full sm:w-80 p-3 rounded-xl border border-slate-200 bg-white font-medium focus:outline-none"
            >
              <option value="ACTIVE_STUDENTS">Active Students with Verified BD Phone (780)</option>
              <option value="CART_ABANDONED">Cart Abandoned in last 48 hours (32)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-900">SMS Message Content (Max 160 chars per SMS):</label>
            <textarea
              required
              maxLength={160}
              rows={3}
              value={smsMessage}
              onChange={(e) => setSmsMessage(e.target.value)}
              placeholder="e.g. EduNexus: Use code EID2026 to get 25% OFF on all live tech masterclasses. Offer ends tonight! Visit edunexus.io"
              className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none leading-relaxed"
            />
            <span className="text-[11px] text-slate-400">{smsMessage.length} / 160 characters (1 SMS)</span>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-slate-900 hover:bg-brand-600 text-white font-extrabold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Smartphone className="w-4 h-4" /> Dispatch SMS Campaign
            </button>
          </div>
        </form>
      )}

      {/* CREATE COUPON MODAL */}
      {createCouponOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full border border-slate-200 shadow-2xl relative p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-brand-600 tracking-wider">New Promotion</span>
                <h3 className="text-base font-bold text-slate-900">Create Promo Voucher</h3>
              </div>
              <button
                onClick={() => setCreateCouponOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-900">Coupon Promo Code:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SPECIAL30"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 uppercase font-mono font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-900">Discount (%):</label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    required
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-900">Expiry Date:</label>
                  <input
                    type="date"
                    required
                    value={newExpiry}
                    onChange={(e) => setNewExpiry(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Save & Activate Coupon
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

