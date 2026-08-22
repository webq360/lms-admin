'use client';

import React, { useEffect, useState } from 'react';
import { fetchAdminApi } from '../../lib/api';
import { Gift, Package, Truck, CheckCircle2 } from 'lucide-react';

export default function AdminGiftsPage() {
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadGifts = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminApi('/gifts/deliveries');
      if (res.success && res.data) {
        setDeliveries(res.data);
      } else {
        // Fallback
        setDeliveries([
          {
            _id: '1',
            giftName: 'Premium Enterprise LMS Developer Hoodie',
            giftType: 'PHYSICAL_GIFT',
            recipientName: 'Tanvir Ahmed',
            recipientPhone: '+8801700000003',
            shippingAddress: 'House 42, Road 11, Dhanmondi, Dhaka',
            status: 'PROCESSING',
            courierName: 'Pathao Courier',
            trackingNumber: 'PTH-90214',
          },
        ]);
      }
    } catch (err) {
      console.error('Error fetching gift deliveries', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGifts();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    const courier = prompt('Courier Name:', 'Pathao Courier');
    const tracking = prompt('Tracking Number:', `TRK-${Date.now().toString().slice(-6)}`);
    try {
      await fetchAdminApi(`/gifts/deliveries/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status, courierName: courier, trackingNumber: tracking }),
      });
      alert(`Gift shipment status updated to ${status}`);
      loadGifts();
    } catch (e: any) {
      alert(e.message || 'Update failed');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Bonus Gift Logistics & Dispatch</h1>
        <p className="text-xs text-slate-500">Manage physical merchandise packaging, couriers, and live shipment tracking.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-4 px-6 font-extrabold">Gift Item</th>
                <th className="py-4 px-6 font-extrabold">Recipient & Address</th>
                <th className="py-4 px-6 font-extrabold">Courier Tracking</th>
                <th className="py-4 px-6 font-extrabold">Status</th>
                <th className="py-4 px-6 font-extrabold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {deliveries.map((d) => (
                <tr key={d._id} className="hover:bg-slate-50/50">
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-900">{d.giftName}</p>
                    <span className="text-[10px] font-extrabold text-amber-600 uppercase">{d.giftType}</span>
                  </td>
                  <td className="py-4 px-6">
                    <p className="font-bold text-slate-900">{d.recipientName} ({d.recipientPhone})</p>
                    <p className="text-[11px] text-slate-500 max-w-xs">{d.shippingAddress}</p>
                  </td>
                  <td className="py-4 px-6 font-mono text-[11px] text-slate-600">
                    {d.trackingNumber ? `${d.courierName || 'Courier'}: ${d.trackingNumber}` : 'Unassigned'}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                        d.status === 'DELIVERED'
                          ? 'bg-emerald-100 text-emerald-800'
                          : d.status === 'SHIPPED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleUpdateStatus(d._id, 'SHIPPED')}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      <Truck className="w-3.5 h-3.5" /> Mark Shipped
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(d._id, 'DELIVERED')}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-lg transition-colors inline-flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Mark Delivered
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

