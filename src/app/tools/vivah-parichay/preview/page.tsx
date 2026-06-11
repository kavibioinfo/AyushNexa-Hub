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
  Lock,
} from 'lucide-react';

export default function BiodataPreviewWorkspace() {
  const router = useRouter();
  const { state, updateState, updateNestedState } = useBiodata();

  const [activeThemeId, setActiveThemeId] = useState(state.themeId);
  const [activeTab, setActiveTab] = useState<'themes' | 'toggles'>('themes');
  const [isPremium, setIsPremium] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const freeThemeId = PREMIUM_THEMES[0]?.id;

  useEffect(() => {
    const premiumStatus = localStorage.getItem('vivah_premium_unlocked');
    if (premiumStatus === 'true') setIsPremium(true);
    if (!state.themeId && freeThemeId) {
      updateState({ themeId: freeThemeId });
      setActiveThemeId(freeThemeId);
    }
  }, [freeThemeId, state.themeId, updateState]);

  const handleThemeChange = (themeId: string) => {
    if (!isPremium) {
      alert('कृपया प्रथम ₹151 भरून प्रीमियम अनलॉक करा.');
      return;
    }
    setActiveThemeId(themeId);
    updateState({ themeId });
  };

  const handlePrint = () => {
    if (!isPremium) {
      alert('कृपया प्रथम पेमेंट करून प्रीमियम अनलॉक करा.');
      return;
    }
    window.print();
    // ✅ No redirect – just print, stay on same page
  };

  const handlePaymentSuccess = () => {
    setIsPremium(true);
    localStorage.setItem('vivah_premium_unlocked', 'true');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* Print CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; }
          body * { visibility: hidden !important; }
          #biodata-print-area, #biodata-print-area * { visibility: visible !important; }
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
          header, nav, button, footer, .no-print, .lg\\:sticky { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      ` }} />

      {/* Header */}
      <header className="bg-white border-b border-zinc-200/60 shadow-sm sticky top-0 z-30 px-3 sm:px-4 py-2.5 sm:py-3.5 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <Link href="/tools/vivah-parichay/form" className="flex items-center gap-1 font-bold text-xs sm:text-sm text-slate-700 hover:text-amber-600 transition-colors shrink-0">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>रूपांतरित करा</span>
          </Link>
          <h2 className="hidden md:block font-black text-slate-900 text-sm sm:text-base">💍 लाईव्ह प्रीव्ह्यू व डाऊनलोड डॅशबोर्ड</h2>
          <div className="flex items-center gap-2">
            {!isPremium && (
              <button onClick={() => document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-slate-900 hover:bg-slate-800 text-white text-[11px] sm:text-xs font-bold py-1.5 px-3 sm:py-2 sm:px-4 rounded-full flex items-center gap-1 shadow-md active:scale-95 transition-all">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse fill-white" />
                <span>अनलॉक करा (₹१५१)</span>
              </button>
            )}
            {isPremium && (
              <span className="bg-emerald-100 text-emerald-800 text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Premium Active
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-green-600 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold animate-fade-in-out">
          🎉 प्रीमियम अनलॉक झाले! आता सर्व थीम्स वापरा.
        </div>
      )}

      {/* Main Workspace */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Preview */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center">
          <div className="w-full bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 text-xs sm:text-sm flex gap-2 items-start no-print">
            <span className="text-base sm:text-lg">💡</span>
            <div><span className="font-bold">टीप:</span> खालील बायोडाटा जसा दिसेल, तसाच तो PDF मध्ये प्रिंट होईल.</div>
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
              <button onClick={() => setActiveTab('themes')} className={`py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 ${activeTab === 'themes' ? 'bg-white text-slate-900 border-b-2 border-amber-600' : 'text-slate-500 hover:text-slate-800'}`}>
                <Palette className="w-4 h-4 text-amber-600" /> थीम्स ({PREMIUM_THEMES.length})
              </button>
              <button onClick={() => setActiveTab('toggles')} className={`py-3 sm:py-3.5 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-1.5 ${activeTab === 'toggles' ? 'bg-white text-slate-900 border-b-2 border-amber-600' : 'text-slate-500 hover:text-slate-800'}`}>
                <Settings className="w-4 h-4 text-amber-600" /> विभाग टॉगल्स
              </button>
            </div>

            {activeTab === 'themes' && (
              <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 max-h-[380px] overflow-y-auto">
                {PREMIUM_THEMES.map((theme) => {
                  const isActive = theme.id === activeThemeId;
                  const isLocked = !isPremium;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => handleThemeChange(theme.id)}
                      disabled={isLocked}
                      className={`w-full text-left p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all flex items-center justify-between ${
                        isActive
                          ? 'border-amber-600 bg-amber-50/20 text-amber-900 ring-2 ring-amber-400/25'
                          : 'border-zinc-200 bg-white hover:bg-zinc-50 text-slate-700'
                      } ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full border shadow-sm shrink-0" style={{ backgroundColor: theme.primaryColor }} />
                        <div>
                          <span className="font-bold text-sm sm:text-base leading-none block">{theme.marathiName}</span>
                          <span className="text-[9px] sm:text-[10px] text-zinc-400 font-mono uppercase tracking-widest">{theme.name}</span>
                        </div>
                      </div>
                      {isLocked && <Lock className="w-4 h-4 text-gray-400" />}
                      {isActive && !isLocked && <span className="text-amber-600 font-sans text-[10px] sm:text-xs font-bold flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-ping" /> Active</span>}
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
                    <label key={key} className="flex items-center justify-between p-3 sm:p-3.5 rounded-xl border border-zinc-150 cursor-pointer hover:bg-zinc-50 text-xs sm:text-sm font-bold text-slate-800">
                      <span className="pr-2">{item.label}</span>
                      <input type="checkbox" checked={state.optionalToggles[key]} onChange={(e) => updateNestedState('optionalToggles', { [key]: e.target.checked })} className="h-4 w-4 sm:h-5 sm:w-5 rounded border-zinc-300 text-amber-600 focus:ring-amber-500 cursor-pointer shrink-0" />
                    </label>
                  );
                })}
              </div>
            )}
          </div>

          {/* Payment Section – only if not premium */}
          {!isPremium && (
            <div id="payment-section" className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-zinc-200 shadow-md space-y-4">
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 border-b pb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" /> प्रीमियम अनलॉक करा
              </h4>
              <p className="text-xs text-slate-600">फक्त एकदाच पेमेंट ₹151 करा आणि अनलॉक करा सर्व १० थीम्स, फोटो, आणि प्रिंट/PDF डाउनलोड.</p>
              <RazorpayButton
                productId="vivah_premium_single"
                amount={151}
                productName="Vivah Parichay Premium"
                label="₹151 भरून प्रीमियम अनलॉक करा"
                onSuccess={handlePaymentSuccess}
                userEmail={state.contact.mobile || ''}
              />
            </div>
          )}

          {/* Download Panel – only if premium */}
          {isPremium && (
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-zinc-200 shadow-md space-y-4">
              <h4 className="font-extrabold text-sm sm:text-base text-slate-900 border-b pb-2 flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-600" /> डाऊनलोड आणि शेअर पर्याय
              </h4>
              <button onClick={handlePrint} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm sm:text-base py-3.5 sm:py-4 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95">
                <Download className="w-4 h-4 sm:w-5 sm:h-5" /> प्रिंटेबल A4 PDF / प्रिंट डाऊनलोड करा
              </button>
              <p className="text-[10px] sm:text-[11px] text-zinc-500 leading-relaxed">💡 <strong>टीप:</strong> वरील बटण दाबल्यावर प्रिंट विंडो उघडेल. <strong>Save as PDF</strong> निवडा, <strong>Margins: None</strong> आणि <strong>Background graphics ✓</strong> चालू करा.</p>
              <div className="border-t border-dashed pt-3 flex items-center justify-between text-[10px] sm:text-[11px] text-zinc-400 font-mono"><span>🖨️ A4 सुसंगत प्रिंट</span><span>✔️ वॉटरमार्क मुक्त</span></div>
            </div>
          )}

          {/* QR Code Panel */}
          <div className="bg-gradient-to-tr from-amber-50 to-amber-100/15 border-2 border-amber-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-1.5 text-amber-900"><QrCode className="w-5 h-5 text-amber-700 shrink-0" /><h4 className="font-extrabold text-sm sm:text-base">प्रीमियम QR कोड</h4></div>
            <div className="flex items-center gap-3 sm:gap-4 bg-white/70 p-3 rounded-xl border border-amber-200">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-zinc-200 shrink-0 rounded border overflow-hidden">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=tel:${state.contact.mobile || '9876543210'}`} alt="Contact QR" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <span className="text-[11px] sm:text-xs font-bold text-slate-800 block">मोबाईल संपर्क कोड</span>
                <span className="text-[10px] sm:text-[11px] text-amber-800 font-semibold block mt-0.5 font-mono break-all">{state.contact.mobile || '९८७६५४३२१०'}</span>
                {!isPremium && <button onClick={() => document.getElementById('payment-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-[10px] sm:text-[11px] text-amber-600 underline font-black block mt-1.5">प्रीमियम मध्ये समाविष्ट करा</button>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fade animation for toast */}
      <style jsx global>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -20px); }
          10% { opacity: 1; transform: translate(-50%, 0); }
          90% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -20px); }
        }
        .animate-fade-in-out {
          animation: fadeInOut 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}