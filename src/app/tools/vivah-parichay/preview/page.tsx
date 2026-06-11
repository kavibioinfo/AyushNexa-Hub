'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useBiodata } from '@/hooks/useBiodata';
import { PREMIUM_THEMES } from '@/components/vivah-parichay/themes';
import { PreviewTemplate } from '@/components/vivah-parichay/PreviewTemplate';
import RazorpayButton from '@/components/RazorpayButton';
import {
  ChevronLeft,
  Download,
  Palette,
  Sparkles,
  QrCode,
  Settings,
  X,
} from 'lucide-react';

export default function BiodataPreviewWorkspace() {
  const router = useRouter();
  const { state, updateState, updateNestedState } = useBiodata();

  const [activeThemeId, setActiveThemeId] = useState(state.themeId);
  const [showPremiumUpgradeModal, setShowPremiumUpgradeModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'themes' | 'toggles'>('themes');
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);

  // Determine the free theme ID (assume the first theme in the array is free)
  const freeThemeId = PREMIUM_THEMES[0]?.id;

  useEffect(() => {
    const premiumStatus = localStorage.getItem('vivah_premium_unlocked');
    if (premiumStatus === 'true') setIsPremiumUnlocked(true);
  }, []);

  const handleThemeChange = (themeId: string) => {
    const selectedTheme = PREMIUM_THEMES.find(t => t.id === themeId);
    // If theme is not free and user hasn't unlocked premium, show upgrade modal
    if (selectedTheme && !isPremiumUnlocked && themeId !== freeThemeId) {
      setShowPremiumUpgradeModal(true);
      return;
    }
    setActiveThemeId(themeId);
    updateState({ themeId });
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
      setTimeout(() => router.push('/tools/vivah-parichay/success'), 800);
    }
  };

  const handlePaymentSuccess = () => {
    setIsPremiumUnlocked(true);
    localStorage.setItem('vivah_premium_unlocked', 'true');
    setShowPremiumUpgradeModal(false);
    alert('Premium unlocked! You can now use all themes and features.');
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* ── PRINT CSS (unchanged) ── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body * {
            visibility: hidden !important;
          }
          #biodata-print-area,
          #biodata-print-area * {
            visibility: visible !important;
          }
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
          header,
          nav,
          button,
          footer,
          .no-print,
          .lg\\:sticky {
            display: none !important;
          }
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
        }
      ` }} />

      {/* Header */}
      <header className="bg-white border-b border-zinc-200/60 shadow-sm sticky top-0 z-30 px-3 sm:px-4 py-2.5 sm:py-3.5 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <Link
            href="/tools/vivah-parichay/form"
            className="flex items-center gap-1 font-bold text-xs sm:text-sm text-slate-700 hover:text-amber-600 transition-colors shrink-0"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>रूपांतरित करा</span>
          </Link>

          <h2 className="hidden md:block font-black text-slate-900 text-sm sm:text-base">
            💍 लाईव्ह प्रीव्ह्यू व डाऊनलोड डॅशबोर्ड
          </h2>

          <div className="flex items-center gap-2">
            {!isPremiumUnlocked && (
              <button
                onClick={() => setShowPremiumUpgradeModal(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white text-[11px] sm:text-xs font-bold py-1.5 px-3 sm:py-2 sm:px-4 rounded-full flex items-center gap-1 shadow-md active:scale-95 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse fill-white" />
                <span>अनलॉक (₹१५१)</span>
              </button>
            )}
            {isPremiumUnlocked && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Premium Active
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Preview */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center">
          <div className="w-full bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 text-xs sm:text-sm flex gap-2 items-start no-print">
            <span className="text-base sm:text-lg">💡</span>
            <div>
              <span className="font-bold">टीप:</span> खालील बायोडाटा जसा दिसेल, तसाच तो PDF मध्ये प्रिंट होईल.
            </div>
          </div>
          <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-2 sm:p-6 border border-zinc-200 shadow-2xl overflow-x-auto min-h-[500px] sm:min-h-[600px] flex justify-center items-start">
            <div className="min-w-[280px] sm:min-w-[320px] max-w-full">
              <PreviewTemplate state={state} />
            </div>
          </div>
        </div>

        {/* Right Controls */}
        <div className="lg:col-span-5 xl:col-span-4 space-y-5 sm:space-y-6 lg:sticky lg:top-24 no-print">
          {/* Theme + Toggle Tabs */}
          <div className="bg-white rounded-2xl sm:rounded-3xl border border-zinc-200 shadow-md overflow-hidden">
            <div className="grid grid-cols-2 text-center bg-zinc-50 border-b">
              <button
                onClick={() => setActiveTab('themes')}
                className={`py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === 'themes'
                    ? 'bg-white text-slate-900 border-b-2 border-amber-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Palette className="w-4 h-4 text-amber-600" />
                <span>थीम्स ({PREMIUM_THEMES.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('toggles')}
                className={`py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 transition-colors ${
                  activeTab === 'toggles'
                    ? 'bg-white text-slate-900 border-b-2 border-amber-600'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Settings className="w-4 h-4 text-amber-600" />
                <span>विभाग टॉगल्स</span>
              </button>
            </div>

            {activeTab === 'themes' && (
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-[380px] overflow-y-auto">
                {PREMIUM_THEMES.map((theme) => {
                  const isActive = theme.id === activeThemeId;
                  const isLocked = theme.id !== freeThemeId && !isPremiumUnlocked;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      disabled={isLocked}
                      className={`w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all flex items-center justify-between ${
                        isActive
                          ? 'border-amber-600 bg-amber-50/20 text-amber-900 ring-2 ring-amber-400/25'
                          : 'border-zinc-200 bg-white hover:bg-zinc-50 text-slate-700'
                      } ${isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-5 h-5 rounded-full border shadow-sm shrink-0"
                          style={{ backgroundColor: theme.primaryColor }}
                        />
                        <div>
                          <span className="font-bold text-sm sm:text-base leading-none block">
                            {theme.marathiName}
                          </span>
                          <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
                            {theme.name}
                          </span>
                        </div>
                      </div>
                      {isLocked && (
                        <span className="text-amber-600 text-[10px] sm:text-xs font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" /> Unlock
                        </span>
                      )}
                      {isActive && !isLocked && (
                        <span className="text-amber-600 font-sans text-[10px] sm:text-xs font-bold flex items-center gap-1">
                          <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-ping" /> Active
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {activeTab === 'toggles' && (
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
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
                      className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-zinc-150 cursor-pointer hover:bg-zinc-50 text-xs sm:text-sm font-bold text-slate-800"
                    >
                      <span className="pr-2">{item.label}</span>
                      <input
                        type="checkbox"
                        checked={state.optionalToggles[key]}
                        onChange={(e) =>
                          updateNestedState('optionalToggles', { [key]: e.target.checked })
                        }
                        className="h-4 w-4 sm:h-5 sm:w-5 rounded border-zinc-300 text-amber-600 focus:ring-amber-500 cursor-pointer shrink-0"
                      />
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Download Panel */}
          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-zinc-200 shadow-md space-y-4">
            <h4 className="font-extrabold text-sm sm:text-base text-slate-900 border-b pb-2 flex items-center gap-1.5">
              <Download className="w-4 h-4 text-emerald-600" />
              <span>डाऊनलोड आणि शेअर पर्याय</span>
            </h4>
            <button
              onClick={handlePrint}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm sm:text-base py-3.5 sm:py-4 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>प्रिंटेबल A4 PDF / प्रिंट डाऊनलोड करा</span>
            </button>
            <p className="text-[10px] sm:text-[11px] text-zinc-500 leading-relaxed">
              💡 <strong>टीप:</strong> वरील बटण दाबल्यावर प्रिंट विंडो उघडेल. <strong>Save as PDF</strong> निवडा,
              <strong> Margins: None</strong> आणि <strong>Background graphics ✓</strong> चालू करा.
            </p>
            <div className="border-t border-dashed pt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-400 font-mono">
              <span>🖨️ A4 सुसंगत प्रिंट</span>
              <span>✔️ वॉटरमार्क मुक्त</span>
            </div>
          </div>

          {/* QR Code Panel */}
          <div className="bg-gradient-to-tr from-amber-50 to-amber-100/15 border-2 border-amber-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-amber-900">
              <QrCode className="w-5 h-5 text-amber-700 shrink-0" />
              <h4 className="font-extrabold text-sm sm:text-base">प्रीमियम QR कोड</h4>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 bg-white/70 p-3 rounded-xl border border-amber-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-200 shrink-0 rounded border overflow-hidden">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=tel:${state.contact.mobile || '9876543210'}`}
                  alt="Contact QR"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 block">मोबाईल संपर्क कोड</span>
                <span className="text-[10px] sm:text-[11px] text-amber-800 font-semibold block mt-0.5 font-mono break-all">
                  {state.contact.mobile || '९८७६५४३२१०'}
                </span>
                {!isPremiumUnlocked && (
                  <button
                    onClick={() => setShowPremiumUpgradeModal(true)}
                    className="text-[10px] sm:text-[11px] text-amber-600 underline font-black block mt-1.5"
                  >
                    थीम मध्ये समाविष्ट करा (Premium)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Modal with RazorpayButton */}
      {showPremiumUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full border border-zinc-200 shadow-2xl relative space-y-5 sm:space-y-6">
            <button
              onClick={() => setShowPremiumUpgradeModal(false)}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-zinc-400 hover:text-slate-700 p-1.5 bg-zinc-50 border rounded-full"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="text-center space-y-1">
              <span className="bg-amber-100 text-amber-900 text-[10px] sm:text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                👑 AyushNexa Premium
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-slate-950">सर्व प्रगत पर्याय अनलॉक करा!</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-serif">
                फक्त ₹१५१ भरून १० थीम्स, फोटो आणि QR कोड मिळवा.
              </p>
            </div>

            <div className="border-t border-b border-dashed border-zinc-200 py-3 sm:py-4 space-y-2.5 sm:space-y-3">
              {[
                'सर्व १० डिझाईनर थीम्स',
                'फोटो अपलोडिंग व कस्टमायझेशन',
                'WhatsApp QR कोड',
                'अमर्यादित डाऊनलोड',
                'कोणताही वॉटरमार्क नसेल',
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 font-bold">
                  <span className="text-emerald-600 bg-emerald-50 rounded-full p-0.5">✓</span>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] sm:text-xs text-zinc-400 block font-mono">Premium Plan</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900">₹१५१</span>
                  <span className="text-xs text-zinc-400 line-through">₹४९९</span>
                </div>
              </div>
              <RazorpayButton
                productId="vivah_premium"
                amount={151}
                productName="Vivah Parichay Premium"
                label="सुरक्षित पेमेंट (Razorpay)"
                onSuccess={handlePaymentSuccess}
                userEmail={state.contact.mobile || ''}
              />
            </div>

            <p className="text-center text-[8px] sm:text-[9px] text-zinc-400 font-mono">
              🔒 सुरक्षित पेमेंट गेटवे - Razorpay
            </p>
          </div>
        </div>
      )}
    </div>
  );
}