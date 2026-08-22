'use client';

import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  Search,
  Sliders,
  DollarSign,
  Smartphone,
  ExternalLink,
  Layers,
} from 'lucide-react';

interface PaymentGateway {
  id: string;
  name: string;
  code: 'bkash' | 'nagad' | 'rocket' | 'sslcommerz' | 'visa_mastercard';
  logo: string;
  status: 'ACTIVE' | 'TEST_MODE' | 'DISABLED';
  currency: string;
  feePercentage: number;
  totalVolume: number;
  successRate: number;
  mode: 'LIVE' | 'SANDBOX';
}

const DUMMY_GATEWAYS: PaymentGateway[] = [
  {
    id: 'gw-1',
    name: 'bKash Direct Merchant (Tokenized IPN)',
    code: 'bkash',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100',
    status: 'ACTIVE',
    currency: 'BDT',
    feePercentage: 1.5,
    totalVolume: 845000,
    successRate: 98.4,
    mode: 'LIVE',
  },
  {
    id: 'gw-2',
    name: 'Nagad Online Gateway',
    code: 'nagad',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100',
    status: 'ACTIVE',
    currency: 'BDT',
    feePercentage: 1.2,
    totalVolume: 320000,
    successRate: 97.2,
    mode: 'LIVE',
  },
  {
    id: 'gw-3',
    name: 'Rocket (DBBL Mobile Banking)',
    code: 'rocket',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100',
    status: 'ACTIVE',
    currency: 'BDT',
    feePercentage: 1.4,
    totalVolume: 125000,
    successRate: 96.0,
    mode: 'LIVE',
  },
  {
    id: 'gw-4',
    name: 'SSLCommerz (Master Multi-Gateway)',
    code: 'sslcommerz',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100',
    status: 'ACTIVE',
    currency: 'BDT / USD',
    feePercentage: 2.0,
    totalVolume: 490000,
    successRate: 99.1,
    mode: 'LIVE',
  },
  {
    id: 'gw-5',
    name: 'Visa & Mastercard International Cards',
    code: 'visa_mastercard',
    logo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100',
    status: 'ACTIVE',
    currency: 'USD / BDT',
    feePercentage: 2.5,
    totalVolume: 280000,
    successRate: 98.9,
    mode: 'LIVE',
  },
];

const DUMMY_TRANSACTIONS = [
  {
    id: 'trx-1',
    trxId: 'BK9A84K2918',
    gateway: 'bKash Direct',
    studentName: 'Tanvir Ahmed',
    studentEmail: 'student@example.com',
    amount: 3500,
    fee: 52.5,
    netAmount: 3447.5,
    status: 'SUCCESS',
    timestamp: 'Aug 22, 2026 • 04:30 PM',
  },
  {
    id: 'trx-2',
    trxId: 'SSL8472910384',
    gateway: 'SSLCommerz (Visa)',
    studentName: 'Sadia Afreen',
    studentEmail: 'sadia@gmail.com',
    amount: 2900,
    fee: 58.0,
    netAmount: 2842.0,
    status: 'SUCCESS',
    timestamp: 'Aug 22, 2026 • 02:15 PM',
  },
  {
    id: 'trx-3',
    trxId: 'NG98421034',
    gateway: 'Nagad Gateway',
    studentName: 'Kamrul Hasan',
    studentEmail: 'kamrul@outlook.com',
    amount: 4200,
    fee: 50.4,
    netAmount: 4149.6,
    status: 'SUCCESS',
    timestamp: 'Aug 22, 2026 • 11:00 AM',
  },
  {
    id: 'trx-4',
    trxId: 'RCK7820194',
    gateway: 'Rocket DBBL',
    studentName: 'Mahmudur Rahman',
    studentEmail: 'mahmud@yahoo.com',
    amount: 3200,
    fee: 44.8,
    netAmount: 3155.2,
    status: 'SUCCESS',
    timestamp: 'Aug 21, 2026 • 07:45 PM',
  },
];

export default function PaymentManagementPage() {
  const [gateways, setGateways] = useState<PaymentGateway[]>(DUMMY_GATEWAYS);
  const [selectedGateway, setSelectedGateway] = useState<PaymentGateway | null>(null);
  const [activeTab, setActiveTab] = useState<'gateways' | 'transactions' | 'webhooks'>('gateways');
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Payment Gateways & Transactions</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure SSLCommerz, bKash, Nagad, Rocket, Visa/Mastercard credentials, IPN webhooks, and track real-time settlement logs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('All gateway webhook listeners synced successfully!')}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-sm flex items-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-brand-600" />
            <span>Test Webhook Ping</span>
          </button>
        </div>
      </div>

      {/* 4 Financial Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Total Processed Volume</span>
          <h3 className="text-2xl font-black text-slate-900">৳ 2,060,000</h3>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> 98.7% Success Rate
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">bKash Settlement Volume</span>
          <h3 className="text-2xl font-black text-pink-600">৳ 845,000</h3>
          <p className="text-[11px] text-slate-400">41% Total Share</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Nagad & Rocket Volume</span>
          <h3 className="text-2xl font-black text-amber-600">৳ 445,000</h3>
          <p className="text-[11px] text-slate-400">22% Total Share</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">SSLCommerz & Cards</span>
          <h3 className="text-2xl font-black text-brand-600">৳ 770,000</h3>
          <p className="text-[11px] text-slate-400">37% Total Share</p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold pb-2">
        {[
          { id: 'gateways', label: 'Configured Gateways (5)' },
          { id: 'transactions', label: 'Live Transaction Logs' },
          { id: 'webhooks', label: 'IPN Webhook Health' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: GATEWAYS */}
      {activeTab === 'gateways' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {gateways.map((gw) => (
            <div
              key={gw.id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                      <CreditCard className="w-5 h-5 text-brand-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{gw.name}</h3>
                      <p className="text-[11px] text-slate-400">{gw.currency} • Fee: {gw.feePercentage}%</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    {gw.mode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-medium block">Total Volume</span>
                    <span className="font-black text-slate-900">৳ {gw.totalVolume.toLocaleString()}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-medium block">Success Rate</span>
                    <span className="font-black text-emerald-600">{gw.successRate}%</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedGateway(gw)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-brand-600 text-white text-xs font-bold rounded-xl transition-colors text-center cursor-pointer"
                >
                  Configure API Keys & Webhook
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: TRANSACTIONS */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base">Recent Settled Transactions</h3>
            <span className="text-xs text-slate-400">Auto-updated via WebSocket IPN</span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-3.5">TRX ID</th>
                  <th className="p-3.5">Gateway</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5 text-right">Gross</th>
                  <th className="p-3.5 text-right">Gateway Fee</th>
                  <th className="p-3.5 text-right">Net Settled</th>
                  <th className="p-3.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {DUMMY_TRANSACTIONS.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-mono font-bold text-brand-600">{trx.trxId}</td>
                    <td className="p-3.5 font-medium text-slate-800">{trx.gateway}</td>
                    <td className="p-3.5">
                      <p className="font-bold text-slate-900">{trx.studentName}</p>
                      <p className="text-[10px] text-slate-400">{trx.studentEmail}</p>
                    </td>
                    <td className="p-3.5 text-right font-black text-slate-900">৳ {trx.amount}</td>
                    <td className="p-3.5 text-right text-rose-500 font-semibold">-৳ {trx.fee}</td>
                    <td className="p-3.5 text-right font-black text-emerald-600">৳ {trx.netAmount}</td>
                    <td className="p-3.5 text-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                        {trx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: WEBHOOK HEALTH */}
      {activeTab === 'webhooks' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fadeIn">
          <div className="space-y-1">
            <h3 className="font-black text-slate-900 text-base">IPN Webhook Listener Status</h3>
            <p className="text-xs text-slate-500">
              Automated idempotency verification and instant course enrollment dispatch.
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">bKash Webhook Callback</p>
                <code className="text-[11px] text-slate-500">https://api.edunexus.io/api/v1/payments/bkash/callback</code>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">
                Active (200 OK • 18ms latency)
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <div>
                <p className="font-bold text-slate-900">SSLCommerz IPN Notification</p>
                <code className="text-[11px] text-slate-500">https://api.edunexus.io/api/v1/payments/sslcommerz/ipn</code>
              </div>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-full text-[10px]">
                Active (200 OK • 24ms latency)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CONFIGURE MODAL */}
      {selectedGateway && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full border border-slate-200 shadow-2xl relative p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-brand-600 tracking-wider">Gateway Configuration</span>
                <h3 className="text-base font-bold text-slate-900">{selectedGateway.name}</h3>
              </div>
              <button
                onClick={() => setSelectedGateway(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSelectedGateway(null); alert('Gateway settings saved securely!'); }} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-900">Environment Mode:</label>
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" className="p-2.5 rounded-xl font-bold bg-slate-900 text-white text-center">
                    Production (LIVE)
                  </button>
                  <button type="button" className="p-2.5 rounded-xl font-bold bg-slate-100 text-slate-700 text-center">
                    Sandbox (Test)
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900">Merchant / Store ID:</label>
                <input
                  type="text"
                  defaultValue="EDUNEXUS_LIVE_MERCHANT_8941"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none font-mono text-xs"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900">Secret API Key / App Key:</label>
                <input
                  type="password"
                  defaultValue="sec_live_98492049182390184019"
                  className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none font-mono text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Save Credentials & Re-test
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

