'use client';

import React, { useEffect, useState } from 'react';
import { fetchAdminApi } from '../../lib/api';
import { Users, ShieldCheck, UserX, UserCheck, Key } from 'lucide-react';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminApi('/admin/users');
      if (res.success && res.data) {
        setUsers(res.data);
      } else {
        // Mock fallback
        setUsers([
          { _id: '1', name: 'Super Administrator', email: 'admin@example.com', role: 'SUPER_ADMIN', isSuspended: false },
          { _id: '2', name: 'Dr. Rafiqul Islam', email: 'teacher@example.com', role: 'TEACHER', isSuspended: false },
          { _id: '3', name: 'Tanvir Ahmed', email: 'student@example.com', role: 'STUDENT', isSuspended: false },
        ]);
      }
    } catch (err) {
      console.error('Error fetching users', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleToggleSuspend = async (id: string, currentStatus: boolean) => {
    try {
      await fetchAdminApi(`/admin/users/${id}/suspend`, {
        method: 'PATCH',
        body: JSON.stringify({ isSuspended: !currentStatus }),
      });
      alert(`User ${!currentStatus ? 'suspended' : 'activated'} successfully`);
      loadUsers();
    } catch (e: any) {
      alert(e.message || 'Action failed');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">User Directory & RBAC Security</h1>
        <p className="text-xs text-slate-500">Manage user accounts, roles, access permissions, and suspension states.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-4 px-6 font-extrabold">User</th>
                <th className="py-4 px-6 font-extrabold">Email</th>
                <th className="py-4 px-6 font-extrabold">Role</th>
                <th className="py-4 px-6 font-extrabold">Status</th>
                <th className="py-4 px-6 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6 font-bold text-slate-900">{u.name}</td>
                  <td className="py-4 px-6 text-slate-500">{u.email}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-brand-50 text-brand-700">
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        u.isSuspended ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {u.isSuspended ? 'Suspended' : 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleToggleSuspend(u._id, u.isSuspended)}
                      className={`px-3 py-1.5 font-bold rounded-lg transition-colors text-xs inline-flex items-center gap-1 ${
                        u.isSuspended ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {u.isSuspended ? 'Reactivate' : 'Suspend'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

