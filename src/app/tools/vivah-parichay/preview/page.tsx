'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBiodata } from '@/hooks/useBiodata';
import { PREMIUM_THEMES } from '@/components/vivah-parichay/themes';
import { PreviewTemplate } from '@/components/vivah-parichay/PreviewTemplate';
import {
  ChevronLeft,
  Download,
  Palette,
  Sparkles,
  QrCode,
  Settings,
  X,
  CreditCard,
} from 'lucide-react';

export default function BiodataPreviewWorkspace() {
  const router = useRouter();
  const { state, updateState, updateNestedState } = useBiodata();

  const [activeThemeId, setActiveThemeId] = useState(state.themeId);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPremiumUpgradeModal, setShowPremiumUpgradeModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'themes' | 'toggles'>('themes');

  const handleThemeChange = (themeId: string) => {
    setActiveThemeId(themeId);
    updateState({ themeId });
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
      setTimeout(() => {
        router.push('/tools/vivah-parichay/success');
      }, 800);
    }
  };

  const triggerPremiumUnlockRedirect = () => {
    window.open('https://rzp.io/l/vivah-premium-151', '_blank', 'noopener,noreferrer');
    setShowPremiumUpgradeModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">

      {/* ── PRINT CSS ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }

          /* Hide everything first */
          body * {
            visibility: hidden !important;
          }

          /* Show only the biodata print area */
          #biodata-print-area,
          #biodata-print-area * {
            visibility: visible !important;
          }

          /* Position print area to fill the A4 page */
          #biodata-print-area {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 210mm !important;
            min-height: auto !important;
            max-height: none !important;
            height: auto !important;
            overflow: visible !important;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 14px !important;
            box-sizing: border-box !important;
            transform: scale(0.82) !important;
            transform-origin: top left !important;
            width: 122% !important;
          }

          /* Hide all UI elements */
          header,
          nav,
          button,
          footer,
          .no-print,
          .lg\\:sticky {
            display: none !important;
          }

          /* Preserve all colors and backgrounds */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      ` }} />

      {/* Brand Header */}
      <header className="bg-white border-b border-zinc-200/60 shadow-sm sticky top-0 z-30 px-4 py-3.5 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/tools/vivah-parichay/form"
            className="flex items-center gap-1.5 font-bold text-xs sm:text-sm text-slate-700 hover:text-amber-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>रूपांतरित करा (Edit Form)</span>
          </Link>

          <h2 className="hidden md:block font-black text-slate-900 text-sm sm:text-base">
            💍 लाईव्ह प्रीव्ह्यू व डाऊनलोड डॅशबोर्ड
          </h2>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowPremiumUpgradeModal(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 px-4 rounded-full flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse fill-white" />
              <span>प्रीमियम अनलॉक करा (₹१५१)</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* LEFT: Live Preview */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center">
          <div className="w-full bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl p-4 mb-6 text-xs flex gap-2 items-start no-print">
            <span className="text-base">💡</span>
            <div>
              <span className="font-bold">टीप:</span> खालील बायोडाटा जसा दिसेल, तसाच तो PDF मध्ये प्रिंट होईल.
            </div>
          </div>

          <div className="w-full bg-white rounded-3xl p-2 sm:p-6 border border-zinc-250/60 shadow-2xl overflow-x-auto min-h-[600px] flex justify-center items-start">
            <div className="min-w-[320px] max-w-full">
              <PreviewTemplate state={state} />
            </div>
          </div>
        </div>

        {/* RIGHT: Controls */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-6 lg:sticky lg:top-24 no-print">

          {/* Theme + Toggle Tabs */}
          <div className="bg-white rounded-3xl border border-zinc-200 shadow-md divide-y overflow-hidden">
            <div className="grid grid-cols-2 text-center bg-zinc-50 border-b">
              <button
                type="button"
                onClick={() => setActiveTab('themes')}
                className={`py-3.5 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === 'themes' ? 'bg-white text-slate-900 border-b-2 border-amber-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Palette className="w-4 h-4 text-amber-600" />
                <span>थीम्स ({PREMIUM_THEMES.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('toggles')}
                className={`py-3.5 text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === 'toggles' ? 'bg-white text-slate-900 border-b-2 border-amber-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Settings className="w-4 h-4 text-amber-600" />
                <span>विभाग टॉगल्स</span>
              </button>
            </div>

            {activeTab === 'themes' && (
              <div className="p-6 space-y-4 max-h-[380px] overflow-y-auto">
                <div className="grid grid-cols-1 gap-2.5">
                  {PREMIUM_THEMES.map((theme) => {
                    const isActive = theme.id === activeThemeId;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => handleThemeChange(theme.id)}
                        className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                          isActive
                            ? 'border-amber-600 bg-amber-50/20 text-amber-900 ring-2 ring-amber-400/25'
                            : 'border-zinc-200 bg-white hover:bg-zinc-50 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full border shadow-sm shrink-0" style={{ backgroundColor: theme.primaryColor }} />
                          <div>
                            <span className="font-bold text-sm block leading-none">{theme.marathiName}</span>
                            <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">{theme.name}</span>
                          </div>
                        </div>
                        {isActive && (
                          <span className="text-amber-600 font-sans text-xs font-bold flex items-center gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-ping" /> Active
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'toggles' && (
              <div className="p-6 space-y-4">
                <div className="space-y-3.5">
                  {[
                    { label: 'जन्माची वेळ आणि ठिकाण', toggleKey: 'showBirthDetails' },
                    { label: 'राशी व नक्षत्र कुंडली', toggleKey: 'showHoroscope' },
                    { label: 'शैक्षणिक पात्रता तपशील', toggleKey: 'showEducation' },
                    { label: 'नोकरी आणि वार्षिक उत्पन्न', toggleKey: 'showOccupation' },
                    { label: 'कौटुंबिक माहिती', toggleKey: 'showFamily' },
                    { label: 'मालमत्ता व शेती संपत्ती', toggleKey: 'showProperty' },
                    { label: 'अपेक्षित वधू/वर पसंती', toggleKey: 'showExpectations' },
                    { label: 'फोटो दाखवा', toggleKey: 'showPhoto' },
                  ].map((item) => {
                    const key = item.toggleKey as keyof typeof state.optionalToggles;
                    return (
                      <label
                        key={key}
                        className="flex items-center justify-between p-3 rounded-xl border border-zinc-150 cursor-pointer hover:bg-zinc-50 text-xs font-bold text-slate-800"
                      >
                        <span>{item.label}</span>
                        <input
                          type="checkbox"
                          checked={state.optionalToggles[key]}
                          onChange={(e) => updateNestedState('optionalToggles', { [key]: e.target.checked })}
                          className="h-4 w-4 rounded border-zinc-300 text-amber-600 focus:ring-amber-500 cursor-pointer"
                        />
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Download Panel */}
          <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-md space-y-4">
            <h4 className="font-extrabold text-sm text-slate-900 border-b pb-2 flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-600" />
              <span>डाऊनलोड आणि शेअर पर्याय</span>
            </h4>

            <button
              type="button"
              onClick={handlePrint}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm py-4 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>प्रिंटेबल A4 PDF / प्रिंट डाऊनलोड करा</span>
            </button>

            <p className="text-[11px] text-zinc-500 leading-relaxed">
              💡 <strong>टीप:</strong> वरील बटण दाबल्यावर प्रिंट विंडो उघडेल. <strong>Save as PDF</strong> निवडा, <strong>Margins: None</strong> आणि <strong>Background graphics ✓</strong> चालू करा.
            </p>

            <div className="border-t border-dashed pt-3 flex items-center justify-between text-[11px] text-zinc-400 font-mono">
              <span>🖨️ A4 सुसंगत प्रिंट</span>
              <span>✔️ वॉटरमार्क मुक्त</span>
            </div>
          </div>

          {/* QR Code Panel */}
          <div className="bg-gradient-to-tr from-amber-50 to-amber-100/15 border-2 border-amber-200 rounded-3xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-amber-900">
              <QrCode className="w-5 h-5 text-amber-700 shrink-0" />
              <h4 className="font-extrabold text-sm">प्रीमियम QR कोड</h4>
            </div>
            <div className="flex items-center gap-4 bg-white/70 p-3 rounded-xl border border-amber-200">
              <div className="w-16 h-16 bg-zinc-200 shrink-0 rounded border overflow-hidden">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=tel:${state.contact.mobile || '9876543210'}`}
                  alt="Contact QR"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-800 block">मोबाईल संपर्क कोड</span>
                <span className="text-[9px] text-amber-800 font-semibold block mt-1 font-mono">
                  {state.contact.mobile || '९८७६५४३२१०'}
                </span>
                <button
                  type="button"
                  onClick={() => setShowPremiumUpgradeModal(true)}
                  className="text-[10px] text-amber-600 underline font-black block mt-1.5"
                >
                  थीम मध्ये समाविष्ट करा (Unlock Premium)
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Premium Modal */}
      {showPremiumUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-zinc-200 shadow-2xl relative space-y-6">
            <button
              onClick={() => setShowPremiumUpgradeModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-slate-700 p-1 bg-zinc-50 border rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="bg-amber-100 text-amber-900 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                👑 AyushNexa Premium
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-950">सर्व प्रगत पर्याय अनलॉक करा!</h3>
              <p className="text-xs text-slate-500 font-serif">फक्त ₹१५१ भरून १० थीम्स, फोटो आणि QR कोड मिळवा.</p>
            </div>

            <div className="border-t border-b border-dashed border-zinc-200 py-4 space-y-3">
              {[
                'सर्व १० डिझाईनर थीम्स',
                'फोटो अपलोडिंग व कस्टमायझेशन',
                'WhatsApp QR कोड',
                'अमर्यादित डाऊनलोड',
                'कोणताही वॉटरमार्क नसेल',
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                  <span className="text-emerald-600 bg-emerald-50 rounded-full p-0.5">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-zinc-400 block font-mono">Premium Plan</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-slate-900">₹१५१</span>
                  <span className="text-xs text-zinc-400 line-through">₹४९९</span>
                </div>
              </div>
              <button
                type="button"
                onClick={triggerPremiumUnlockRedirect}
                className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm py-4 px-6 rounded-xl shadow-lg flex items-center justify-center gap-2"
              >
                <CreditCard className="w-4 h-4 shrink-0" />
                <span>सुरक्षित पेमेंट (Razorpay)</span>
              </button>
            </div>

            <p className="text-center text-[9px] text-zinc-400 font-mono">
              🔒 सुरक्षित पेमेंट गेटवे - Razorpay
            </p>
          </div>
        </div>
      )}

    </div>
  );
}