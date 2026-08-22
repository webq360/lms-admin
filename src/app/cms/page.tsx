'use client';

import React, { useState } from 'react';
import {
  Globe,
  FileText,
  Image,
  Sparkles,
  Plus,
  Search,
  CheckCircle2,
  Edit,
  Trash2,
  Eye,
  Save,
  Tag,
  Layers,
} from 'lucide-react';

export default function CmsManagementPage() {
  const [activeTab, setActiveTab] = useState<'banners' | 'blogs' | 'pages' | 'seo'>('banners');

  const [banners, setBanners] = useState([
    {
      id: 'b-1',
      title: 'Next-Gen Enterprise Learning Management System',
      subtitle: 'Build production-ready scalable cloud software with verified mentors',
      ctaText: 'Explore Courses',
      ctaLink: '/courses',
      badge: 'Summer Sale 40% OFF',
      status: 'PUBLISHED',
    },
    {
      id: 'b-2',
      title: 'Official Flutter 3.4 Clean Architecture Masterclass Launch',
      subtitle: 'Includes Free Architecture Playbook Delivered to Your Doorstep',
      ctaText: 'Enroll Now',
      ctaLink: '/courses/enterprise-flutter-clean-architecture',
      badge: 'New Release',
      status: 'PUBLISHED',
    },
  ]);

  const [blogs, setBlogs] = useState([
    {
      id: 'bl-1',
      title: 'Architecting Multi-Tenant Micro-Frontends in Next.js 14',
      author: 'Engr. Tanvir Ahmed',
      category: 'Software Architecture',
      views: 3420,
      status: 'PUBLISHED',
      publishedAt: 'Aug 18, 2026',
    },
    {
      id: 'bl-2',
      title: 'Top 10 Security Hardening Patterns for Production Node.js APIs',
      author: 'Dr. Rafiqul Islam',
      category: 'Cybersecurity',
      views: 2180,
      status: 'PUBLISHED',
      publishedAt: 'Aug 12, 2026',
    },
  ]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">CMS & Content Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage homepage banners, engineering blog articles, static custom pages, and global SEO OpenGraph metadata.
          </p>
        </div>

        <button
          onClick={() => alert('New content item creator opened!')}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold rounded-2xl shadow-lg shadow-brand-500/25 flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Content</span>
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 text-xs font-bold pb-2">
        {[
          { id: 'banners', label: 'Banners & Hero Sliders', icon: <Image className="w-3.5 h-3.5" /> },
          { id: 'blogs', label: 'Engineering Blogs & Articles', icon: <FileText className="w-3.5 h-3.5" /> },
          { id: 'pages', label: 'Static Pages (About, FAQ, Terms)', icon: <Globe className="w-3.5 h-3.5" /> },
          { id: 'seo', label: 'Global SEO Metadata', icon: <Sparkles className="w-3.5 h-3.5" /> },
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

      {/* TAB 1: BANNERS */}
      {activeTab === 'banners' && (
        <div className="space-y-4 animate-fadeIn">
          {banners.map((b) => (
            <div key={b.id} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[10px] font-bold border border-brand-200">
                  {b.badge}
                </span>
                <h3 className="font-bold text-slate-900 text-base">{b.title}</h3>
                <p className="text-xs text-slate-500">{b.subtitle}</p>
                <div className="flex items-center gap-2 text-xs text-brand-600 font-bold pt-1">
                  <span>CTA: "{b.ctaText}" → {b.ctaLink}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => alert(`Editing banner: ${b.title}`)}
                  className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">
                  {b.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: BLOGS */}
      {activeTab === 'blogs' && (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-slate-900 text-base">Published Technical Articles</h3>
            <span className="text-xs text-slate-400">Indexed for Google SEO Search</span>
          </div>

          <div className="border border-slate-200 rounded-2xl overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <tr>
                  <th className="p-3.5">Article Title</th>
                  <th className="p-3.5">Author</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5 text-center">Reads</th>
                  <th className="p-3.5 text-center">Published</th>
                  <th className="p-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogs.map((bl) => (
                  <tr key={bl.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-bold text-slate-900">{bl.title}</td>
                    <td className="p-3.5 text-slate-600">{bl.author}</td>
                    <td className="p-3.5 font-bold text-brand-600">{bl.category}</td>
                    <td className="p-3.5 text-center font-bold text-slate-700">{bl.views.toLocaleString()}</td>
                    <td className="p-3.5 text-center text-slate-400">{bl.publishedAt}</td>
                    <td className="p-3.5 text-center">
                      <button
                        onClick={() => alert(`Opening blog editor for: ${bl.title}`)}
                        className="px-3 py-1 bg-slate-100 hover:bg-brand-50 hover:text-brand-600 font-bold text-slate-700 rounded-lg text-[11px] transition-colors cursor-pointer"
                      >
                        Edit Article
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PAGES */}
      {activeTab === 'pages' && (
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6 animate-fadeIn text-xs">
          <div className="space-y-1">
            <h3 className="font-black text-slate-900 text-base">Static Legal & Information Pages</h3>
            <p className="text-xs text-slate-500">Edit rich markdown or HTML content for website standard pages.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['About Us (/about)', 'Privacy Policy (/privacy-policy)', 'Terms & Conditions (/terms-conditions)', 'Refund Policy (/refund-policy)', 'Frequently Asked Questions (/faq)'].map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900">{p}</h4>
                  <p className="text-[10px] text-slate-400">Last updated: Aug 2026</p>
                </div>
                <button
                  onClick={() => alert(`Opening editor for ${p}`)}
                  className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 font-bold text-[11px] rounded-lg hover:bg-slate-100 cursor-pointer"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: SEO METADATA */}
      {activeTab === 'seo' && (
        <form onSubmit={(e) => { e.preventDefault(); alert('Global SEO OpenGraph metadata updated!'); }} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-5 animate-fadeIn text-xs">
          <div className="space-y-1">
            <h3 className="font-black text-slate-900 text-base">Global Search Engine Optimization (SEO)</h3>
            <p className="text-xs text-slate-500">Configure default meta title, description, keywords, and OpenGraph social banner.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-900">Default Meta Title:</label>
              <input
                type="text"
                defaultValue="EduNexus — Enterprise Tech Learning Management System"
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none font-medium"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-900">Default Meta Description:</label>
              <textarea
                rows={3}
                defaultValue="Master production-grade cloud software engineering, Next.js 14, Flutter, Generative AI, and DevOps with verified industry mentors and accredited credentials."
                className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none leading-relaxed font-sans"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-900">OpenGraph Social Share Image URL (1200x630px):</label>
              <input
                type="url"
                defaultValue="https://edunexus.io/og-preview.png"
                className="w-full p-3 rounded-xl border border-slate-200 font-mono focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="px-8 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save SEO Settings
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

