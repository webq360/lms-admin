'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  CreditCard,
  Gift,
  Tag,
  BookText,
  FileBarChart,
  Globe,
  Settings,
  ShieldCheck,
  LogOut,
  GraduationCap,
  Sparkles,
  ShieldAlert,
  Send,
  Sliders,
} from 'lucide-react';
import { useAdminAuth } from '../context/AdminAuthContext';

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  const navGroups = [
    {
      group: 'Overview & Operations',
      items: [
        { label: 'Executive Dashboard', href: '/', icon: <LayoutDashboard className="w-4 h-4" /> },
        { label: 'User Management', href: '/users', icon: <Users className="w-4 h-4" /> },
        { label: 'Roles & Permissions', href: '/roles', icon: <ShieldCheck className="w-4 h-4" /> },
        { label: 'Course Management', href: '/courses', icon: <BookOpen className="w-4 h-4" /> },
        { label: 'eBook Management', href: '/ebooks', icon: <BookText className="w-4 h-4" /> },
      ],
    },
    {
      group: 'Finance & Logistics',
      items: [
        { label: 'Payment Gateways', href: '/payments', icon: <CreditCard className="w-4 h-4" /> },
        { label: 'Orders & Invoices', href: '/orders', icon: <Tag className="w-4 h-4" /> },
        { label: 'Gift Inventory & Delivery', href: '/gifts', icon: <Gift className="w-4 h-4" /> },
      ],
    },
    {
      group: 'Growth & Content',
      items: [
        { label: 'Marketing & Campaigns', href: '/marketing', icon: <Send className="w-4 h-4" /> },
        { label: 'Reports & Analytics', href: '/reports', icon: <FileBarChart className="w-4 h-4" /> },
        { label: 'CMS & Website Content', href: '/cms', icon: <Globe className="w-4 h-4" /> },
      ],
    },
    {
      group: 'System & Security',
      items: [
        { label: 'Audit Trail Logs', href: '/audit-logs', icon: <ShieldAlert className="w-4 h-4" /> },
        { label: 'System Settings', href: '/settings', icon: <Settings className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-400 flex flex-col justify-between border-r border-slate-900 min-h-screen p-4 sm:p-5 shrink-0 select-none">
      <div className="space-y-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3 px-2">
          <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 shrink-0">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-black text-lg text-white tracking-tight leading-none">
              EDU<span className="text-brand-500">ADMIN</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">
              Enterprise Console
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <div className="space-y-6">
          {navGroups.map((grp, idx) => (
            <div key={idx} className="space-y-1.5">
              <p className="px-3 text-[10px] font-extrabold uppercase tracking-widest text-slate-600">
                {grp.group}
              </p>
              <div className="space-y-0.5">
                {grp.items.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-brand-600 text-white shadow-md shadow-brand-600/20'
                          : 'hover:bg-slate-900 hover:text-white text-slate-400'
                      }`}
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout button */}
      <div className="pt-4 border-t border-slate-900">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/30 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out Session</span>
        </button>
      </div>
    </aside>
  );
};
