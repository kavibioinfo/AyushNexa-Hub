// app/tools/vivah-parichay/layout.tsx
import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '💍 विवाह परिचय पत्रिका | Vivah-Parichay Marathi Biodata Generator',
  description: 'फक्त माहिती भरा आणि काही क्षणांत सुंदर, प्रिंटेबल विवाह बायोडाटा तयार करा. Choose from 10+ premium themes.',
};

export default function VivahParichayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300">
      {children}
    </div>
  );
}
