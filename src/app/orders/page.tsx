'use client';

import React, { useEffect, useState } from 'react';
import { fetchAdminApi } from '../../lib/api';
import { ShoppingBag, DollarSign, RefreshCw, FileText, CheckCircle2 } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminApi('/orders');
      if (res.success && res.data) {
        setOrders(res.data);
      } else {
        setOrders([
          {
            _id: '1',
            orderNumber: 'ORD-2026-8941',
            customerName: 'Tanvir Ahmed',
            customerEmail: 'student@example.com',
            totalAmount: 2499,
            paymentGateway: 'SSLCOMMERZ',
            status: 'COMPLETED',
            createdAt: new Date().toISOString(),
          },
          {
            _id: '2',
            orderNumber: 'ORD-2026-8940',
            customerName: 'Mahmudul Hasan',
            customerEmail: 'mahmud@example.com',
            totalAmount: 1999,
            paymentGateway: 'BKASH',
            status: 'COMPLETED',
            createdAt: new Date(Date.now() - 7200000).toISOString(),
          },
        ]);
      }
    } catch (err) {
      console.error('Error fetching orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleRefund = async (id: string, orderNumber: string) => {
    const reason = prompt(`Enter reason for refunding Order ${orderNumber}:`);
    if (!reason) return;
    try {
      await fetchAdminApi(`/orders/${id}/refund`, {
        method: 'POST',
        body: JSON.stringify({ reason }),
      });
      alert(`Order ${orderNumber} has been successfully refunded.`);
      loadOrders();
    } catch (e: any) {
      alert(e.message || 'Refund failed');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Orders, Invoices & Refunds</h1>
        <p className="text-xs text-slate-500">Inspect customer order receipts, verified payment transactions, and issue refunds.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-4 px-6 font-extrabold">Order No</th>
                <th className="py-4 px-6 font-extrabold">Customer</th>
                <th className="py-4 px-6 font-extrabold">Payment Gateway</th>
                <th className="py-4 px-6 font-extrabold">Total Amount</th>
                <th className="py-4 px-6 font-extrabold">Status</th>
                <th className="py-4 px-6 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((o) => (
                <tr key={o._id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6 font-mono font-bold text-slate-900">{o.orderNumber}</td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-900">{o.customerName}</p>
                    <p className="text-[10px] text-slate-400">{o.customerEmail}</p>
                  </td>
                  <td className="py-4 px-6 uppercase font-bold text-slate-600">{o.paymentGateway || 'MOCK'}</td>
                  <td className="py-4 px-6 font-black text-slate-900">৳{o.totalAmount?.toLocaleString('en-BD')}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        o.status === 'COMPLETED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : o.status === 'REFUNDED'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    {o.status !== 'REFUNDED' && (
                      <button
                        onClick={() => handleRefund(o._id, o.orderNumber)}
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Refund
                      </button>
                    )}
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

