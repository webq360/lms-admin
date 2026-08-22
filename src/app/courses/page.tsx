'use client';

import React, { useEffect, useState } from 'react';
import { fetchAdminApi } from '../../lib/api';
import { BookOpen, CheckCircle2, XCircle, Eye, Search, Filter } from 'lucide-react';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('');

  const loadCourses = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminApi('/courses');
      if (res.success && res.data) {
        setCourses(res.data);
      }
    } catch (err) {
      console.error('Error fetching courses', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await fetchAdminApi(`/courses/${id}/review`, {
        method: 'POST',
        body: JSON.stringify({ isApproved: true }),
      });
      alert('Course successfully approved and published! 🚀');
      loadCourses();
    } catch (e: any) {
      alert(e.message || 'Approval failed');
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Please enter rejection feedback reason for the instructor:');
    if (!reason) return;
    try {
      await fetchAdminApi(`/courses/${id}/review`, {
        method: 'POST',
        body: JSON.stringify({ isApproved: false, feedback: reason }),
      });
      alert('Course rejection feedback sent to instructor.');
      loadCourses();
    } catch (e: any) {
      alert(e.message || 'Rejection failed');
    }
  };

  const filteredCourses = filterStatus ? courses.filter((c) => c.status === filterStatus) : courses;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Course Moderation & Quality Queue</h1>
          <p className="text-xs text-slate-500">Review submitted course syllabi, verify video previews, and manage publication state.</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="PENDING_REVIEW">Pending Review</option>
            <option value="PUBLISHED">Published</option>
            <option value="DRAFT">Draft</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-slate-400">Loading course queue...</div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-extrabold">Course Title</th>
                  <th className="py-4 px-6 font-extrabold">Instructor</th>
                  <th className="py-4 px-6 font-extrabold">Price</th>
                  <th className="py-4 px-6 font-extrabold">Status</th>
                  <th className="py-4 px-6 font-extrabold text-right">Moderation Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCourses.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <img src={c.thumbnail} alt="" className="w-14 aspect-video rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-900 line-clamp-1">{c.title}</p>
                          <p className="text-[11px] text-slate-400">{c.category?.name || 'Development'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-slate-800">{c.instructorId?.name || 'Dr. Rafiqul Islam'}</p>
                      <p className="text-[10px] text-slate-400">{c.instructorId?.email || 'teacher@example.com'}</p>
                    </td>
                    <td className="py-4 px-6 font-bold text-slate-900">
                      {c.isFree ? 'FREE' : `৳${c.price}`}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                          c.status === 'PUBLISHED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : c.status === 'PENDING_REVIEW'
                            ? 'bg-amber-100 text-amber-800 animate-pulse'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button
                        onClick={() => handleApprove(c._id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(c._id)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

