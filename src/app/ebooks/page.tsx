'use client';

import React, { useState } from 'react';
import {
  BookText,
  Upload,
  ShieldCheck,
  Download,
  Eye,
  Plus,
  Search,
  CheckCircle2,
  DollarSign,
  Layers,
  Lock,
  Smartphone,
  Save,
} from 'lucide-react';

interface EbookItem {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  discountPrice?: number;
  pages: number;
  totalDownloads: number;
  drmWatermark: boolean;
  deviceLimit: number;
  status: 'PUBLISHED' | 'DRAFT';
}

const DUMMY_ADMIN_EBOOKS: EbookItem[] = [
  {
    id: 'eb-1',
    title: 'Modern Web Architecture & SaaS Engineering (2026 Edition)',
    author: 'Dr. Rafiqul Islam & Engr. Tanvir Ahmed',
    category: 'Architecture & Systems',
    price: 650,
    discountPrice: 350,
    pages: 284,
    totalDownloads: 1420,
    drmWatermark: true,
    deviceLimit: 3,
    status: 'PUBLISHED',
  },
  {
    id: 'eb-2',
    title: 'The Flutter Clean Code & Architecture Playbook',
    author: 'Dr. Rafiqul Islam',
    category: 'Mobile Engineering',
    price: 499,
    discountPrice: 299,
    pages: 198,
    totalDownloads: 980,
    drmWatermark: true,
    deviceLimit: 3,
    status: 'PUBLISHED',
  },
  {
    id: 'eb-3',
    title: 'Generative AI & LLM Engineering in Production',
    author: 'Sarah Mahmud',
    category: 'Artificial Intelligence',
    price: 799,
    discountPrice: 450,
    pages: 240,
    totalDownloads: 1650,
    drmWatermark: true,
    deviceLimit: 3,
    status: 'PUBLISHED',
  },
];

export default function AdminEbookManagementPage() {
  const [ebooks, setEbooks] = useState<EbookItem[]>(DUMMY_ADMIN_EBOOKS);
  const [activeTab, setActiveTab] = useState<'catalog' | 'drm'>('catalog');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Upload Form State
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('Dr. Rafiqul Islam');
  const [category, setCategory] = useState('Architecture & Systems');
  const [price, setPrice] = useState('500');
  const [discountPrice, setDiscountPrice] = useState('300');
  const [pages, setPages] = useState('220');

  // DRM Settings State
  const [watermarkEnabled, setWatermarkEnabled] = useState(true);
  const [deviceLimit, setDeviceLimit] = useState(3);
  const [printLocked, setPrintLocked] = useState(true);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBook: EbookItem = {
      id: `eb-${Date.now()}`,
      title,
      author,
      category,
      price: Number(price),
      discountPrice: Number(discountPrice),
      pages: Number(pages),
      totalDownloads: 0,
      drmWatermark: true,
      deviceLimit: 3,
      status: 'PUBLISHED',
    };
    setEbooks([newBook, ...ebooks]);
    setUploadModalOpen(false);
    setTitle('');
    alert(`eBook "${newBook.title}" published with DRM protection!`);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">eBook & DRM Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Upload digital handbooks, set prices, track student downloads, and configure dynamic PDF watermarking DRM.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-2xl shadow-lg shadow-brand-500/25 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Upload className="w-4 h-4" />
          <span>Upload New eBook</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Published Handbooks</span>
          <h3 className="text-2xl font-black text-slate-900">{ebooks.length} Titles</h3>
          <p className="text-[11px] text-emerald-600 font-bold">100% DRM Protected</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Total Downloads Dispatched</span>
          <h3 className="text-2xl font-black text-brand-600">4,050 Reads</h3>
          <p className="text-[11px] text-slate-400">PDF & ePub formats</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Gross eBook Revenue</span>
          <h3 className="text-2xl font-black text-indigo-600">৳ 1,420,000</h3>
          <p className="text-[11px] text-slate-400">Average: ৳350 / unit</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-2">
          <span className="text-xs text-slate-400 font-medium">Active DRM Device Limit</span>
          <h3 className="text-2xl font-black text-emerald-600">3 Devices Max</h3>
          <p className="text-[11px] text-emerald-600 font-bold">Zero Piracy Breaches 🛡️</p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold pb-2">
        {[
          { id: 'catalog', label: 'eBook Library Catalog', icon: <BookText className="w-3.5 h-3.5" /> },
          { id: 'drm', label: 'DRM Watermark & Security Settings', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'bg-slate-900 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: CATALOG */}
      {activeTab === 'catalog' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base">Published Digital Books</h3>
            <span className="text-xs text-slate-400">Synchronized with Student Library</span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-3.5">eBook Title</th>
                  <th className="p-3.5">Author</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5 text-right">Price</th>
                  <th className="p-3.5 text-center">Pages</th>
                  <th className="p-3.5 text-center">Downloads</th>
                  <th className="p-3.5 text-center">DRM Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {ebooks.map((eb) => (
                  <tr key={eb.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-bold text-slate-900">{eb.title}</td>
                    <td className="p-3.5 text-slate-600">{eb.author}</td>
                    <td className="p-3.5 font-bold text-brand-600">{eb.category}</td>
                    <td className="p-3.5 text-right font-black text-slate-900">
                      ৳ {eb.discountPrice || eb.price}
                    </td>
                    <td className="p-3.5 text-center text-slate-600 font-semibold">{eb.pages}</td>
                    <td className="p-3.5 text-center font-bold text-slate-800">{eb.totalDownloads}</td>
                    <td className="p-3.5 text-center">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Active DRM (3 Dev)
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DRM SETTINGS */}
      {activeTab === 'drm' && (
        <form onSubmit={(e) => { e.preventDefault(); alert('DRM security rules updated globally!'); }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fadeIn text-xs">
          <div className="space-y-1">
            <h3 className="font-black text-slate-900 text-base">Digital Rights Management (DRM) Rules</h3>
            <p className="text-xs text-slate-500">Prevent unauthorized redistribution and leakage of technical proprietary handbooks.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <p className="font-bold text-slate-900">Dynamic Student Watermarking</p>
                <p className="text-[11px] text-slate-400">Embed student name, verified email, and order timestamp across all PDF pages</p>
              </div>
              <input
                type="checkbox"
                checked={watermarkEnabled}
                onChange={(e) => setWatermarkEnabled(e.target.checked)}
                className="w-5 h-5 rounded-lg accent-brand-600 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <p className="font-bold text-slate-900">Maximum Simultaneous Devices per Account</p>
                <p className="text-[11px] text-slate-400">Limits concurrent mobile app and browser download sessions</p>
              </div>
              <select
                value={deviceLimit}
                onChange={(e) => setDeviceLimit(Number(e.target.value))}
                className="p-2 bg-white border border-slate-200 rounded-xl font-bold text-xs focus:outline-none"
              >
                <option value={1}>1 Device</option>
                <option value={2}>2 Devices</option>
                <option value={3}>3 Devices (Standard)</option>
                <option value={5}>5 Devices (Pro)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div>
                <p className="font-bold text-slate-900">Print & Text Extraction Lock</p>
                <p className="text-[11px] text-slate-400">Disables right-click text copying and raster print dumps</p>
              </div>
              <input
                type="checkbox"
                checked={printLocked}
                onChange={(e) => setPrintLocked(e.target.checked)}
                className="w-5 h-5 rounded-lg accent-brand-600 cursor-pointer"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save DRM Configuration
            </button>
          </div>
        </form>
      )}

      {/* UPLOAD MODAL */}
      {uploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full border border-slate-200 shadow-2xl relative p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase text-brand-600 tracking-wider">Publishing Desk</span>
                <h3 className="text-base font-bold text-slate-900">Upload Digital eBook</h3>
              </div>
              <button
                onClick={() => setUploadModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-900">Book Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. High-Throughput Microservices in Go"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 font-medium focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-900">Price (BDT):</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-900">Discount Price (BDT):</label>
                  <input
                    type="number"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-900">Select PDF / ePub File:</label>
                <input
                  type="file"
                  required
                  accept=".pdf,.epub"
                  className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 cursor-pointer"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl shadow-lg transition-all cursor-pointer"
              >
                Publish eBook with DRM
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

