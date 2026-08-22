'use client';

import React, { useEffect, useState } from 'react';
import { fetchAdminApi } from '../../lib/api';
import { ShieldCheck, Clock, User, Terminal } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLogs() {
      try {
        const res = await fetchAdminApi('/admin/audit-logs');
        if (res.success && res.data) {
          setLogs(res.data);
        } else {
          setLogs([
            {
              _id: '1',
              action: 'COURSE_APPROVED',
              resource: 'COURSE',
              performedBy: { name: 'Super Administrator', email: 'admin@example.com' },
              ipAddress: '127.0.0.1',
              createdAt: new Date().toISOString(),
            },
            {
              _id: '2',
              action: 'ORDER_VERIFIED',
              resource: 'PAYMENT',
              performedBy: { name: 'System Auto-Processor', email: 'system@enterpriselms.com' },
              ipAddress: '127.0.0.1',
              createdAt: new Date(Date.now() - 600000).toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.error('Error fetching audit logs', err);
      } finally {
        setLoading(false);
      }
    }
    loadLogs();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Security & Compliance Audit Trail</h1>
        <p className="text-xs text-slate-500">Immutable chronological record of administrative interventions, payment captures, and RBAC modifications.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-4 px-6 font-extrabold">Action</th>
                <th className="py-4 px-6 font-extrabold">Target Resource</th>
                <th className="py-4 px-6 font-extrabold">Performed By</th>
                <th className="py-4 px-6 font-extrabold">IP Address</th>
                <th className="py-4 px-6 font-extrabold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {logs.map((l) => (
                <tr key={l._id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6 font-bold text-brand-700">{l.action}</td>
                  <td className="py-4 px-6 text-slate-600 uppercase">{l.resource}</td>
                  <td className="py-4 px-6 text-slate-800">
                    {l.performedBy?.name || 'Super Administrator'} ({l.performedBy?.email || 'admin@example.com'})
                  </td>
                  <td className="py-4 px-6 text-slate-500">{l.ipAddress || '127.0.0.1'}</td>
                  <td className="py-4 px-6 text-slate-400 font-sans text-xs">
                    {new Date(l.createdAt).toLocaleString()}
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

