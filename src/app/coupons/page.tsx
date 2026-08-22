'use client';

import React, { useEffect, useState } from 'react';
import { fetchAdminApi } from '../../lib/api';
import { Tag, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState('PERCENTAGE');
  const [discountAmount, setDiscountAmount] = useState(20);
  const [minPurchase, setMinPurchase] = useState(1000);
  const [loading, setLoading] = useState(true);

  const loadCoupons = async () => {
    setLoading(true);
    try {
      const res = await fetchAdminApi('/coupons');
      if (res.success && res.data) {
        setCoupons(res.data);
      } else {
        setCoupons([
          { _id: '1', code: 'WELCOME50', discountType: 'PERCENTAGE', discountAmount: 50, minPurchaseAmount: 1000, isActive: true },
          { _id: '2', code: 'SPECIAL20', discountType: 'FIXED', discountAmount: 500, minPurchaseAmount: 1500, isActive: true },
        ]);
      }
    } catch (err) {
      console.error('Error fetching coupons', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetchAdminApi('/coupons', {
        method: 'POST',
        body: JSON.stringify({
          code: code.toUpperCase(),
          discountType,
          discountAmount: Number(discountAmount),
          minPurchaseAmount: Number(minPurchase),
          startDate: new Date(),
          expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        }),
      });
      alert(`Coupon ${code.toUpperCase()} created successfully! 🎉`);
      setCode('');
      loadCoupons();
    } catch (e: any) {
      alert(e.message || 'Creation failed');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900">Discount Coupons & Promotions</h1>
        <p className="text-xs text-slate-500">Create promotional promo codes with percentage or fixed discounts.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Create Coupon Form */}
        <form onSubmit={handleCreateCoupon} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
          <h3 className="text-base font-black text-slate-900">Create New Coupon</h3>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Coupon Code</label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. FLASH30"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs uppercase font-bold focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Discount Type</label>
            <select
              value={discountType}
              onChange={(e) => setDiscountType(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none bg-white"
            >
              <option value="PERCENTAGE">Percentage (%)</option>
              <option value="FIXED">Fixed Amount (৳)</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Discount Value</label>
            <input
              type="number"
              required
              value={discountAmount}
              onChange={(e) => setDiscountAmount(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Min Purchase Amount (৳)</label>
            <input
              type="number"
              value={minPurchase}
              onChange={(e) => setMinPurchase(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow transition-colors"
          >
            Create Coupon
          </button>
        </form>

        {/* Coupons List */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-slate-500 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-4 px-6 font-extrabold">Code</th>
                  <th className="py-4 px-6 font-extrabold">Discount</th>
                  <th className="py-4 px-6 font-extrabold">Min Purchase</th>
                  <th className="py-4 px-6 font-extrabold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {coupons.map((c) => (
                  <tr key={c._id} className="hover:bg-slate-50/50">
                    <td className="py-4 px-6 font-mono font-bold text-slate-900">{c.code}</td>
                    <td className="py-4 px-6 font-bold text-emerald-600">
                      {c.discountType === 'PERCENTAGE' ? `${c.discountAmount}%` : `৳${c.discountAmount}`}
                    </td>
                    <td className="py-4 px-6 text-slate-500">৳{c.minPurchaseAmount}</td>
                    <td className="py-4 px-6">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

