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
  const { state, updateState, updateNestedState } = useBiodata();

  const [activeThemeId, setActiveThemeId] = useState(state.themeId);
  const [activeTab, setActiveTab] = useState<'themes' | 'toggles'>('themes');
  const [purchasedPlan, setPurchasedPlan] = useState<number>(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [selectedUpgradePrice, setSelectedUpgradePrice] = useState<number>(151);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const freeThemeId = PREMIUM_THEMES[0]?.id;

  const getMaxTemplates = (amount: number): number => {
    if (amount >= 251) return PREMIUM_THEMES.length;
    if (amount >= 151) return 3;
    if (amount >= 51) return 1;
    return 0;
  };

  const maxTemplates = getMaxTemplates(purchasedPlan);
  const isAnyPlanPurchased = purchasedPlan > 0;

  useEffect(() => {
    const storedPlan = localStorage.getItem('vivah_purchased_plan');
    if (storedPlan) {
      const planAmount = parseInt(storedPlan, 10);
      setPurchasedPlan(planAmount);
    }
    if (!state.themeId && freeThemeId) {
      updateState({ themeId: freeThemeId });
      setActiveThemeId(freeThemeId);
    }
  }, [freeThemeId, state.themeId, updateState]);

  const handleThemeChange = (themeId: string) => {
    const themeIndex = PREMIUM_THEMES.findIndex(t => t.id === themeId);
    if (!isAnyPlanPurchased && themeIndex !== 0) {
      setShowUpgradeModal(true);
      return;
    }
    if (isAnyPlanPurchased && themeIndex >= maxTemplates) {
      setShowUpgradeModal(true);
      return;
    }
    setActiveThemeId(themeId);
    updateState({ themeId });
  };

  const handlePrint = () => {
    if (!isAnyPlanPurchased) {
      alert('कृपया प्रथम पेमेंट करून प्रीमियम अनलॉक करा.');
      return;
    }
    window.print();
  };

  const handlePaymentSuccess = (amount: number) => {
    localStorage.setItem('vivah_premium_unlocked', 'true');
    localStorage.setItem('vivah_purchased_plan', amount.toString());
    setPurchasedPlan(amount);
    setShowUpgradeModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
    window.location.reload();
  };

  const pricePlans = [
    { amount: 51, label: 'Basic Biodata', description: '1 Template (PDF format)' },
    { amount: 151, label: 'Premium Biodata', description: '3 Premium Templates' },
    { amount: 251, label: 'Pro Biodata', description: 'All 10 Templates + Support' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* ================= PRODUCTION PRINT CSS WITH IMAGE FIX ================= */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          /* Exact A4 size, zero page margins */
          @page {
            size: A4 portrait;
            margin: 0;
          }

          /* Hide all non‑biodata elements */
          body * {
            visibility: hidden !important;
          }

          /* Show only the biodata container */
          #biodata-print-area,
          #biodata-print-area * {
            visibility: visible !important;
          }

          /* Make the biodata container fill the printable area */
          #biodata-print-area {
            position: relative !important;
            width: 210mm !important;
            min-height: 297mm !important;
            margin: 0 auto !important;
            padding: 10mm 12mm !important;
            background: white !important;
            box-sizing: border-box !important;
            overflow: visible !important;
            transform: none !important;
            height: auto !important;
            max-height: none !important;
          }

          /* Remove any height/overflow restrictions from all ancestors */
          #biodata-print-area,
          #biodata-print-area *,
          #biodata-print-area > div,
          #biodata-print-area section,
          #biodata-print-area .preview-container {
            height: auto !important;
            max-height: none !important;
            min-height: auto !important;
            overflow: visible !important;
          }

          /* --- FIX IMAGE STRETCHING --- */
          /* Target the photo image and its containers */
          #biodata-print-area img,
          #biodata-print-area .photo-wrapper img,
          #biodata-print-area [class*="photo"] img,
          #biodata-print-area .rounded-full img,
          #biodata-print-area .object-cover {
            width: auto !important;
            max-width: 140px !important;
            height: auto !important;
            max-height: 140px !important;
            object-fit: contain !important;
            border-radius: 50% !important;
          }

          /* Reset any fixed size containers that may constrain the photo */
          #biodata-print-area .h-32,
          #biodata-print-area .w-32,
          #biodata-print-area .h-24,
          #biodata-print-area .w-24,
          #biodata-print-area .h-20,
          #biodata-print-area .w-20 {
            height: auto !important;
            width: auto !important;
            max-width: 150px !important;
            max-height: 150px !important;
          }

          /* Prevent content from being clipped */
          #biodata-print-area {
            clip: auto !important;
          }

          /* Keep related content together where possible */
          section, .border-b, .mb-4, .print-section {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          /* Ensure images and tables don't overflow */
          img, table, .qr-code {
            max-width: 100% !important;
            height: auto !important;
          }

          /* Preserve all background colors and graphics */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Hide all UI controls */
          header, nav, button, footer, .no-print, .lg\\:sticky,
          .fixed, .sticky, [class*="sticky"], [class*="fixed"] {
            display: none !important;
          }
        }
      ` }} />

      {/* Header – unchanged */}
      <header className="bg-white border-b border-zinc-200/60 shadow-sm sticky top-0 z-30 px-3 sm:px-4 py-2.5 sm:py-3.5 no-print">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <Link href="/tools/vivah-parichay/form" className="flex items-center gap-1 font-bold text-xs sm:text-sm text-slate-700 hover:text-amber-600 transition-colors shrink-0">
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>रूपांतरित करा</span>
          </Link>
          <h2 className="hidden md:block font-black text-slate-900 text-sm sm:text-base">💍 लाईव्ह प्रीव्ह्यू व डाऊनलोड डॅशबोर्ड</h2>
          <div className="flex items-center gap-2">
            {!isAnyPlanPurchased && (
              <button onClick={() => setShowUpgradeModal(true)} className="bg-slate-900 hover:bg-slate-800 text-white text-[11px] sm:text-xs font-bold py-1.5 px-3 sm:py-2 sm:px-4 rounded-full flex items-center gap-1 shadow-md active:scale-95 transition-all">
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-pulse fill-white" />
                <span>अनलॉक प्लॅन्स</span>
              </button>
            )}
            {isAnyPlanPurchased && (
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

      {/* Main Workspace – unchanged except adding id to print container */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Preview */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-center">
          <div className="w-full bg-blue-50 border border-blue-200 text-blue-900 rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 text-xs sm:text-sm flex gap-2 items-start no-print">
            <span className="text-base sm:text-lg">💡</span>
            <div><span className="font-bold">टीप:</span> खालील बायोडाटा जसा दिसेल, तसाच तो PDF मध्ये प्रिंट होईल.</div>
          </div>
          <div className="w-full bg-white rounded-2xl sm:rounded-3xl p-2 sm:p-6 border border-zinc-200 shadow-2xl overflow-x-auto min-h-[500px] sm:min-h-[600px] flex justify-center items-start">
            <div id="biodata-print-area" className="min-w-[280px] sm:min-w-[320px] max-w-full">
              <PreviewTemplate state={state} />
            </div>
          </div>
        </div>

        {/* Right Controls – unchanged (exact same as before) */}
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
                {PREMIUM_THEMES.map((theme, idx) => {
                  const isActive = theme.id === activeThemeId;
                  const isLocked = idx >= maxTemplates && !isAnyPlanPurchased;
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

          {/* Download Panel – only if plan purchased */}
          {isAnyPlanPurchased && (
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
                {!isAnyPlanPurchased && <button onClick={() => setShowUpgradeModal(true)} className="text-[10px] sm:text-[11px] text-amber-600 underline font-black block mt-1.5">प्रीमियम मध्ये समाविष्ट करा</button>}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-lg w-full border border-zinc-200 shadow-2xl relative space-y-5 sm:space-y-6">
            <button onClick={() => setShowUpgradeModal(false)} className="absolute top-3 right-3 sm:top-4 sm:right-4 text-zinc-400 hover:text-slate-700 p-1.5 bg-zinc-50 border rounded-full"><X className="w-4 h-4 sm:w-5 sm:h-5" /></button>
            <div className="text-center space-y-1">
              <span className="bg-amber-100 text-amber-900 text-[10px] sm:text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">👑 AyushNexa Premium</span>
              <h3 className="text-lg sm:text-2xl font-black text-slate-950">तुमचा प्लॅन निवडा</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-serif">प्रीमियम थीम्स, फोटो, QR कोड आणि PDF डाउनलोड अनलॉक करा.</p>
            </div>
            <div className="space-y-3">
              {pricePlans.map((plan) => (
                <label key={plan.amount} className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition ${selectedUpgradePrice === plan.amount ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="upgradePlan" value={plan.amount} checked={selectedUpgradePrice === plan.amount} onChange={() => setSelectedUpgradePrice(plan.amount)} className="w-4 h-4 text-amber-600" />
                    <div>
                      <div className="font-semibold text-slate-800">{plan.label}</div>
                      <div className="text-xs text-slate-500">{plan.description}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-amber-600">₹{plan.amount}</div>
                </label>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] sm:text-xs text-zinc-400 block font-mono">One-time payment</span>
                <div className="flex items-baseline gap-2"><span className="text-2xl sm:text-3xl font-black text-slate-900">₹{selectedUpgradePrice}</span></div>
              </div>
              <RazorpayButton
                productId={`vivah_upgrade_${selectedUpgradePrice}`}
                amount={selectedUpgradePrice}
                productName={`Vivah Parichay Upgrade - ${pricePlans.find(p => p.amount === selectedUpgradePrice)?.label}`}
                label="सुरक्षित पेमेंट (Razorpay)"
                onSuccess={() => handlePaymentSuccess(selectedUpgradePrice)}
                userEmail={state.contact.mobile || ''}
              />
            </div>
            <p className="text-center text-[8px] sm:text-[9px] text-zinc-400 font-mono">🔒 सुरक्षित पेमेंट गेटवे - Razorpay</p>
          </div>
        </div>
      )}

      {/* Toast animation */}
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