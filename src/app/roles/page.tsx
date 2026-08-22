'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  ShieldAlert,
  Users,
  Key,
  CheckCircle2,
  Lock,
  Plus,
  Save,
  Check,
  X,
  Sparkles,
} from 'lucide-react';

interface PermissionRow {
  module: string;
  permissions: {
    key: string;
    label: string;
    superAdmin: boolean;
    admin: boolean;
    moderator: boolean;
    instructor: boolean;
    student: boolean;
  }[];
}

const INITIAL_PERMISSION_MATRIX: PermissionRow[] = [
  {
    module: 'Course Management',
    permissions: [
      { key: 'course_view', label: 'View All Courses', superAdmin: true, admin: true, moderator: true, instructor: true, student: true },
      { key: 'course_create', label: 'Create & Upload Course Lectures', superAdmin: true, admin: true, moderator: false, instructor: true, student: false },
      { key: 'course_approve', label: 'Approve & Moderate Course Submissions', superAdmin: true, admin: true, moderator: true, instructor: false, student: false },
      { key: 'course_publish', label: 'Publish to Public Marketplace', superAdmin: true, admin: true, moderator: false, instructor: false, student: false },
    ],
  },
  {
    module: 'eBook & DRM Management',
    permissions: [
      { key: 'ebook_upload', label: 'Upload eBook & Configure Pricing', superAdmin: true, admin: true, moderator: false, instructor: true, student: false },
      { key: 'ebook_drm', label: 'Configure Watermarking & DRM Rules', superAdmin: true, admin: true, moderator: false, instructor: false, student: false },
    ],
  },
  {
    module: 'Financials & Payments',
    permissions: [
      { key: 'pay_view', label: 'View Financial Transactions & Volume', superAdmin: true, admin: true, moderator: false, instructor: false, student: false },
      { key: 'pay_gateway_config', label: 'Configure bKash / SSLCommerz API Keys', superAdmin: true, admin: false, moderator: false, instructor: false, student: false },
      { key: 'pay_refund', label: 'Trigger Customer Refund to Gateway', superAdmin: true, admin: true, moderator: false, instructor: false, student: false },
    ],
  },
  {
    module: 'User Management & Security',
    permissions: [
      { key: 'user_manage', label: 'Manage Student / Teacher Accounts', superAdmin: true, admin: true, moderator: true, instructor: false, student: false },
      { key: 'user_ban', label: 'Suspend / Ban Student Access', superAdmin: true, admin: true, moderator: true, instructor: false, student: false },
      { key: 'audit_view', label: 'Inspect Security Audit Log Trails', superAdmin: true, admin: true, moderator: false, instructor: false, student: false },
    ],
  },
  {
    module: 'Logistics & Marketing',
    permissions: [
      { key: 'gift_dispatch', label: 'Dispatch Bonus Gift to Courier', superAdmin: true, admin: true, moderator: true, instructor: false, student: false },
      { key: 'coupon_create', label: 'Generate Promo Coupon Codes', superAdmin: true, admin: true, moderator: false, instructor: false, student: false },
      { key: 'sms_campaign', label: 'Send Bulk SMS Broadcast', superAdmin: true, admin: true, moderator: false, instructor: false, student: false },
    ],
  },
];

export default function RolesPermissionsPage() {
  const [matrix, setMatrix] = useState<PermissionRow[]>(INITIAL_PERMISSION_MATRIX);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const togglePermission = (modIdx: number, permIdx: number, role: 'superAdmin' | 'admin' | 'moderator' | 'instructor' | 'student') => {
    if (role === 'superAdmin') return; // Super admin always has full privileges
    const copy = [...matrix];
    copy[modIdx].permissions[permIdx][role] = !copy[modIdx].permissions[permIdx][role];
    setMatrix(copy);
  };

  const handleSaveMatrix = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Role Management & RBAC Permissions</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure granular permissions across Super Admin, Admin, Moderator, Instructor, and Student roles.
          </p>
        </div>

        <button
          onClick={handleSaveMatrix}
          className="px-6 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-2xl shadow-lg shadow-brand-500/25 flex items-center gap-2 cursor-pointer transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Permission Changes</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>RBAC Permission Matrix updated and synced across all active sessions!</span>
        </div>
      )}

      {/* Roles Summary Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {[
          { name: 'SUPER_ADMIN', users: '2 Admins', color: 'bg-rose-50 text-rose-700 border-rose-200' },
          { name: 'ADMIN', users: '4 Staff', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
          { name: 'MODERATOR', users: '6 Staff', color: 'bg-amber-50 text-amber-700 border-amber-200' },
          { name: 'INSTRUCTOR', users: '14 Teachers', color: 'bg-brand-50 text-brand-700 border-brand-200' },
          { name: 'STUDENT', users: '840 Learners', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
        ].map((r) => (
          <div key={r.name} className={`p-4 rounded-2xl border ${r.color} space-y-1 shadow-sm`}>
            <span className="text-[10px] font-black tracking-wider block">{r.name}</span>
            <p className="text-xs font-bold opacity-80">{r.users}</p>
          </div>
        ))}
      </div>

      {/* Permission Matrix Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-black text-slate-900 text-base">Granular Capability Matrix</h3>
          <span className="text-xs text-slate-400">Click any checkbox to toggle role access</span>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-x-auto text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="p-3.5">Action & Permission</th>
                <th className="p-3.5 text-center">Super Admin</th>
                <th className="p-3.5 text-center">Admin</th>
                <th className="p-3.5 text-center">Moderator</th>
                <th className="p-3.5 text-center">Instructor</th>
                <th className="p-3.5 text-center">Student</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {matrix.map((row, modIdx) => (
                <React.Fragment key={modIdx}>
                  <tr className="bg-slate-100/70 font-bold text-slate-800 text-[11px] uppercase tracking-wider">
                    <td colSpan={6} className="px-3.5 py-2">
                      {row.module}
                    </td>
                  </tr>
                  {row.permissions.map((p, permIdx) => (
                    <tr key={p.key} className="hover:bg-slate-50/50">
                      <td className="p-3.5 font-medium text-slate-900">{p.label}</td>

                      {/* Super Admin */}
                      <td className="p-3.5 text-center">
                        <span className="inline-flex w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 items-center justify-center font-bold">
                          ✓
                        </span>
                      </td>

                      {/* Admin */}
                      <td className="p-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={p.admin}
                          onChange={() => togglePermission(modIdx, permIdx, 'admin')}
                          className="w-4 h-4 rounded accent-brand-600 cursor-pointer"
                        />
                      </td>

                      {/* Moderator */}
                      <td className="p-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={p.moderator}
                          onChange={() => togglePermission(modIdx, permIdx, 'moderator')}
                          className="w-4 h-4 rounded accent-brand-600 cursor-pointer"
                        />
                      </td>

                      {/* Instructor */}
                      <td className="p-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={p.instructor}
                          onChange={() => togglePermission(modIdx, permIdx, 'instructor')}
                          className="w-4 h-4 rounded accent-brand-600 cursor-pointer"
                        />
                      </td>

                      {/* Student */}
                      <td className="p-3.5 text-center">
                        <input
                          type="checkbox"
                          checked={p.student}
                          onChange={() => togglePermission(modIdx, permIdx, 'student')}
                          className="w-4 h-4 rounded accent-brand-600 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

