'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AdminAuthProvider, useAdminAuth } from '../context/AdminAuthContext';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';

const AdminLayoutInner: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, loading } = useAdminAuth();
  const isLoginPage = pathname === '/login';

  useEffect(() => {
    if (!loading) {
      if (!user && !isLoginPage) {
        router.replace('/login');
      } else if (user && isLoginPage) {
        router.replace('/');
      }
    }
  }, [user, loading, isLoginPage, router]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center space-y-4 text-white">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-400">Verifying administrator credentials...</p>
      </div>
    );
  }

  if (!user) {
    if (isLoginPage) {
      return <main className="min-h-screen w-full">{children}</main>;
    }
    return (
      <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center space-y-4 text-white">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-400">Redirecting to administrator login...</p>
      </div>
    );
  }

  if (isLoginPage) {
    return (
      <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center space-y-4 text-white">
        <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-bold text-slate-400">Redirecting to executive dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-slate-100">
        <AdminHeader />
        <main className="p-6 sm:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
};

export const AdminLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AdminAuthProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminAuthProvider>
  );
};
