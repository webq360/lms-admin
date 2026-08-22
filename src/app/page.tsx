'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAdminApi } from '../lib/api';
import {
  Users,
  BookOpen,
  DollarSign,
  ShoppingBag,
  Gift,
  TrendingUp,
  Award,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  XCircle,
  BookText,
  CreditCard,
  Activity,
  Send,
  ShieldCheck,
  FileBarChart,
  Globe,
  Sliders,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // High-fidelity fallback analytics data matching user's spec
  const dashboardData = {
    kpis: {
      totalRevenue: 1548000,
      monthlyRevenue: 345000,
      totalSales: 620,
      totalStudents: 840,
      totalTeachers: 14,
      totalCourses: 18,
      totalEbooks: 6,
      activeUsers: 124,
      pendingApprovals: 2,
      pendingGifts: 5,
    },
    recentOrders: [
      {
        _id: 'ord-1',
        orderNumber: 'EN-94820',
        customerName: 'Tanvir Ahmed',
        customerEmail: 'student@example.com',
        courseName: 'Full-Stack Next.js 14 & Enterprise SaaS Architecture',
        totalAmount: 3500,
        gateway: 'bKash IPN',
        status: 'COMPLETED',
        createdAt: '10 mins ago',
      },
      {
        _id: 'ord-2',
        orderNumber: 'EN-87410',
        customerName: 'Sadia Afreen',
        customerEmail: 'sadia@gmail.com',
        courseName: 'Modern Web Architecture & SaaS eBook',
        totalAmount: 350,
        gateway: 'SSLCommerz',
        status: 'COMPLETED',
        createdAt: '45 mins ago',
      },
      {
        _id: 'ord-3',
        orderNumber: 'EN-79201',
        customerName: 'Kamrul Hasan',
        customerEmail: 'kamrul@outlook.com',
        courseName: 'Enterprise Flutter 3.4 & Clean Architecture',
        totalAmount: 2900,
        gateway: 'Nagad Direct',
        status: 'COMPLETED',
        createdAt: '2 hours ago',
      },
      {
        _id: 'ord-4',
        orderNumber: 'EN-68219',
        customerName: 'Nusrat Jahan',
        customerEmail: 'nusrat@yahoo.com',
        courseName: 'Applied Generative AI, LLM Engineering & Agents',
        totalAmount: 4200,
        gateway: 'Visa Card',
        status: 'COMPLETED',
        createdAt: '4 hours ago',
      },
    ],
    pendingCourses: [
      {
        id: 'c-pen-1',
        title: 'Kubernetes Multi-Cluster Orchestration & Istio Mesh',
        instructor: 'Kamrul Hasan',
        submittedAt: 'Today • 02:00 PM',
        lessons: 64,
      },
      {
        id: 'c-pen-2',
        title: 'Cybersecurity SOC Analyst & Threat Hunting Bootcamp',
        instructor: 'Zubair Hossain',
        submittedAt: 'Yesterday',
        lessons: 52,
      },
    ],
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
              Live Production Cluster • 124 Active Online Learners
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
            Executive Operations Console
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/reports"
            className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold rounded-2xl border border-slate-200 shadow-sm flex items-center gap-1.5 transition-colors"
          >
            <FileBarChart className="w-3.5 h-3.5 text-brand-600" />
            <span>Generate Reports</span>
          </Link>
          <Link
            href="/courses"
            className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-2xl shadow-lg shadow-brand-500/25 flex items-center gap-1.5 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Manage Courses</span>
          </Link>
        </div>
      </div>

      {/* 2. ALL 8 CORE KPI STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. Revenue */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Gross Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black text-sm">
              ৳
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">৳ {dashboardData.kpis.totalRevenue.toLocaleString()}</h3>
          <p className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> ৳{dashboardData.kpis.monthlyRevenue.toLocaleString()} this month
          </p>
        </div>

        {/* 2. Sales */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Sales & Orders</span>
            <div className="w-8 h-8 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{dashboardData.kpis.totalSales} Paid Orders</h3>
          <p className="text-[11px] text-slate-400 font-medium">Average ৳2,496 / order</p>
        </div>

        {/* 3. Students */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Students</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{dashboardData.kpis.totalStudents} Learners</h3>
          <p className="text-[11px] text-indigo-600 font-bold flex items-center gap-1">
            <Activity className="w-3.5 h-3.5" /> 124 live online right now
          </p>
        </div>

        {/* 4. Teachers */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Faculty & Mentors</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{dashboardData.kpis.totalTeachers} Verified Mentors</h3>
          <p className="text-[11px] text-slate-400">⭐️ 4.9 Average Rating</p>
        </div>

        {/* 5. Courses */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Published Courses</span>
            <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{dashboardData.kpis.totalCourses} Masterclasses</h3>
          <p className="text-[11px] text-amber-600 font-bold">
            {dashboardData.kpis.pendingApprovals} Pending Approval
          </p>
        </div>

        {/* 6. eBooks */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Digital eBooks</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <BookText className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{dashboardData.kpis.totalEbooks} Handbooks</h3>
          <p className="text-[11px] text-purple-600 font-bold">4,050 Total Downloads</p>
        </div>

        {/* 7. Bonus Gifts Logistics */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Bonus Gifts Courier</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              <Gift className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">{dashboardData.kpis.pendingGifts} To Dispatch</h3>
          <p className="text-[11px] text-rose-600 font-bold">Steadfast / Pathao API Active</p>
        </div>

        {/* 8. Payment Settlement */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Payment Gateways</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-black text-slate-900">5 Gateways Active</h3>
          <p className="text-[11px] text-emerald-600 font-bold">bKash, Nagad, SSLCommerz 100% Up</p>
        </div>
      </div>

      {/* 3. Quick Action Operations Bar */}
      <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl space-y-4 shadow-xl">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-400">Quick Administrative Actions</span>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs font-bold">
          <Link
            href="/courses"
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-brand-300" />
            <span>Approve Course</span>
          </Link>
          <Link
            href="/users"
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
          >
            <Users className="w-4 h-4 text-indigo-300" />
            <span>Add Instructor</span>
          </Link>
          <Link
            href="/ebooks"
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
          >
            <BookText className="w-4 h-4 text-purple-300" />
            <span>Upload eBook</span>
          </Link>
          <Link
            href="/gifts"
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
          >
            <Gift className="w-4 h-4 text-rose-300" />
            <span>Dispatch Gifts</span>
          </Link>
          <Link
            href="/marketing"
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
          >
            <Send className="w-4 h-4 text-amber-300" />
            <span>SMS Broadcast</span>
          </Link>
          <Link
            href="/payments"
            className="p-3.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-colors flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
          >
            <CreditCard className="w-4 h-4 text-emerald-300" />
            <span>Gateway Health</span>
          </Link>
        </div>
      </div>

      {/* 4. Real-time Transactions & Course Approvals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Orders (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-slate-900 text-lg">Real-Time Transactions</h3>
              <p className="text-xs text-slate-400">Live order stream with gateway IPN confirmation</p>
            </div>
            <Link href="/orders" className="text-xs font-bold text-brand-600 hover:underline">
              View All Orders →
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {dashboardData.recentOrders.map((ord) => (
              <div key={ord._id} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{ord.orderNumber}</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      {ord.gateway}
                    </span>
                  </div>
                  <p className="font-semibold text-slate-700">{ord.courseName}</p>
                  <p className="text-[11px] text-slate-400">
                    {ord.customerName} ({ord.customerEmail}) • {ord.createdAt}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-black text-slate-900">৳ {ord.totalAmount.toLocaleString()}</span>
                  <span className="block text-[10px] text-emerald-600 font-bold">✓ Settled</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Course Approval Queue (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base">Course Approvals</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
              2 Pending
            </span>
          </div>

          <div className="space-y-3">
            {dashboardData.pendingCourses.map((c) => (
              <div key={c.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <h4 className="font-bold text-slate-900 leading-tight">{c.title}</h4>
                <p className="text-[11px] text-slate-500">
                  By {c.instructor} • {c.lessons} Lessons
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                  <span className="text-[10px] text-slate-400">{c.submittedAt}</span>
                  <Link
                    href="/courses"
                    className="px-3 py-1 bg-brand-600 text-white font-bold text-[11px] rounded-lg hover:bg-brand-700"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
