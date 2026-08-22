'use client';

import React from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { Bell, Search, ShieldCheck } from 'lucide-react';

export const AdminHeader: React.FC = () => {
  const { user } = useAdminAuth();

  return (
    <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Global Search */}
      <div className="flex items-center gap-3 w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students, courses, orders, audit logs..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>
      </div>

      {/* Right User & Notifications */}
      <div className="flex items-center gap-5">
        <button className="relative p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'}
            alt=""
            className="w-9 h-9 rounded-xl object-cover"
          />
          <div>
            <p className="text-xs font-bold text-slate-900">{user?.name || 'Administrator'}</p>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span className="text-[10px] font-extrabold uppercase text-slate-400">
                {user?.role || 'SUPER_ADMIN'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

