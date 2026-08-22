'use client';

import React, { useState } from 'react';
import {
  FileBarChart,
  Download,
  Calendar,
  Filter,
  Users,
  DollarSign,
  Gift,
  BookOpen,
  TrendingUp,
  CreditCard,
  Printer,
  CheckCircle2,
} from 'lucide-react';

export default function ReportsManagementPage() {
  const [reportType, setReportType] = useState<'SALES' | 'STUDENTS' | 'TEACHERS' | 'REVENUE' | 'PAYMENTS' | 'GIFTS'>('SALES');
  const [dateRange, setDateRange] = useState('LAST_30_DAYS');

  const handleExportCSV = () => {
    alert(`Exporting ${reportType} report for period [${dateRange}] to CSV...`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Reports & Business Analytics</h1>
          <p className="text-xs text-slate-500 mt-1">
            Export granular performance reports for students, instructors, sales, revenue distributions, and gift logistics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-sm flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Report</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1.5">
            <label className="font-bold text-slate-900">Select Report Type:</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value as any)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-bold text-slate-800 focus:outline-none"
            >
              <option value="SALES">Sales & Enrollment Orders Report</option>
              <option value="REVENUE">Revenue & Net Profit Statement</option>
              <option value="STUDENTS">Student Progress & Completion Report</option>
              <option value="TEACHERS">Teacher Payout & Performance Report</option>
              <option value="PAYMENTS">Payment Gateway Settlement Report</option>
              <option value="GIFTS">Gift Courier Logistics & SLA Report</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-900">Time Range / Frequency:</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none"
            >
              <option value="TODAY">Today (Real-time)</option>
              <option value="LAST_7_DAYS">Last 7 Days</option>
              <option value="LAST_30_DAYS">Last 30 Days (Standard)</option>
              <option value="THIS_QUARTER">This Quarter (Q3 2026)</option>
              <option value="YEAR_TO_DATE">Year to Date (2026)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="font-bold text-slate-900">Currency / Grouping:</label>
            <div className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-bold text-slate-700 flex items-center justify-between">
              <span>BDT (৳) • Automated Daily Settlement</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Financial / Operational Metric Summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Gross Course Sales</span>
          <h3 className="text-2xl font-black text-slate-900">৳ 1,548,000</h3>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last period
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Instructor Payouts Distributed</span>
          <h3 className="text-2xl font-black text-brand-600">৳ 774,000</h3>
          <p className="text-[11px] text-slate-400">50% Standard Contract Share</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Certificate Completion Rate</span>
          <h3 className="text-2xl font-black text-indigo-600">76.8%</h3>
          <p className="text-[11px] text-slate-400">485 Certificates Issued</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Physical Gifts Dispatched</span>
          <h3 className="text-2xl font-black text-amber-600">320 Units</h3>
          <p className="text-[11px] text-slate-400">99.2% Delivered on SLA</p>
        </div>
      </div>

      {/* Granular Report Data Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 text-base">
            {reportType} Breakdown Table ({dateRange})
          </h3>
          <span className="text-xs text-slate-400">Showing top 5 aggregated lines</span>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="p-3.5">Category / Item</th>
                <th className="p-3.5 text-center">Volume / Enrolled</th>
                <th className="p-3.5 text-right">Gross Amount</th>
                <th className="p-3.5 text-right">Gateway Fees</th>
                <th className="p-3.5 text-right">Net Share</th>
                <th className="p-3.5 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="hover:bg-slate-50/50">
                <td className="p-3.5 font-bold text-slate-900">Full-Stack Next.js 14 & SaaS Architecture</td>
                <td className="p-3.5 text-center font-semibold text-slate-700">184</td>
                <td className="p-3.5 text-right font-bold text-slate-900">৳ 644,000</td>
                <td className="p-3.5 text-right text-rose-500 font-semibold">-৳ 9,660</td>
                <td className="p-3.5 text-right font-black text-emerald-600">৳ 634,340</td>
                <td className="p-3.5 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    RECONCILED
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-3.5 font-bold text-slate-900">Enterprise Flutter 3.4 & Clean Architecture</td>
                <td className="p-3.5 text-center font-semibold text-slate-700">142</td>
                <td className="p-3.5 text-right font-bold text-slate-900">৳ 411,800</td>
                <td className="p-3.5 text-right text-rose-500 font-semibold">-৳ 6,177</td>
                <td className="p-3.5 text-right font-black text-emerald-600">৳ 405,623</td>
                <td className="p-3.5 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    RECONCILED
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-3.5 font-bold text-slate-900">Applied Generative AI & Agentic Systems</td>
                <td className="p-3.5 text-center font-semibold text-slate-700">96</td>
                <td className="p-3.5 text-right font-bold text-slate-900">৳ 403,200</td>
                <td className="p-3.5 text-right text-rose-500 font-semibold">-৳ 6,048</td>
                <td className="p-3.5 text-right font-black text-emerald-600">৳ 397,152</td>
                <td className="p-3.5 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    RECONCILED
                  </span>
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50">
                <td className="p-3.5 font-bold text-slate-900">Modern Web Architecture & SaaS eBook</td>
                <td className="p-3.5 text-center font-semibold text-slate-700">254</td>
                <td className="p-3.5 text-right font-bold text-slate-900">৳ 88,900</td>
                <td className="p-3.5 text-right text-rose-500 font-semibold">-৳ 1,333</td>
                <td className="p-3.5 text-right font-black text-emerald-600">৳ 87,567</td>
                <td className="p-3.5 text-center">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                    RECONCILED
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

