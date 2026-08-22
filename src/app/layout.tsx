import type { Metadata } from 'next';
import './globals.css';
import { AdminLayoutWrapper } from '../components/AdminLayoutWrapper';

export const metadata: Metadata = {
  title: 'EduAdmin — Enterprise LMS Administrator Console',
  description: 'Enterprise Administrative Console for EduNexus LMS Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-100 flex antialiased">
        <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
      </body>
    </html>
  );
}
