'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBiodata } from '@/hooks/useBiodata';
import { PhotoUploader } from '@/components/vivah-parichay/PhotoUploader';
import { ChevronLeft, ChevronRight, Save, Trash2, Eye, RefreshCw, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function BiodataFormWizard() {
  const router = useRouter();
  const { state, updateState, updateNestedState, clearDraft, saveToCloud, isDirty, setIsDirty } = useBiodata();

  const [currentStep, setCurrentStep] = useState(1);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'failed'>('saved');

  // Multi-step definitions
  const steps = [
    { num: 1, name: 'वैयक्तिक माहिती', nameEng: 'Personal' },
    { num: 2, name: 'जन्म व कुंडली', nameEng: 'Astrorogy' },
    { num: 3, name: 'शिक्षण व नोकरी', nameEng: 'Career' },
    { num: 4, name: 'कौटुंबिक माहिती', nameEng: 'Family' },
    { num: 5, name: 'मालमत्ता व अपेक्षा', nameEng: 'Expectations' },
    { num: 6, name: 'फोटो आणि संपर्क', nameEng: 'Contact' },
  ];

  // Auto calculate age when Date of Birth changes
  useEffect(() => {
    if (state.personalDetails.dateOfBirth) {
      const birthDate = new Date(state.personalDetails.dateOfBirth);
      if (!isNaN(birthDate.getTime())) {
        const today = new Date('2026-06-07'); // based on workspace current time metadata
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        const finalAge = age >= 0 ? age : 0;
        if (state.personalDetails.age !== finalAge) {
          updateNestedState('personalDetails', { age: finalAge });
        }
      }
    }
  }, [state.personalDetails.dateOfBirth, state.personalDetails.age, updateNestedState]);

  // Set visual status indicators on unsaved states
  useEffect(() => {
    if (isDirty) {
      setSaveStatus('idle');
      const timer = setTimeout(() => {
        setSaveStatus('saving');
        // Simulate local storage auto storage debounce completion
        setTimeout(() => {
          setSaveStatus('saved');
          setIsDirty(false);
        }, 600);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [state, isDirty, setIsDirty]);

  // Handling Manual Cloud Save hook
  const handleCloudSave = async () => {
    setSaveStatus('saving');
    const result = await saveToCloud();
    if (result.success) {
      setSaveStatus('saved');
      alert(`यशस्वी! ${result.message}`);
    } else {
      setSaveStatus('failed');
      alert(`त्रुटी: ${result.message}`);
    }
  };

  // Safe reset routine
  const handleConfirmReset = () => {
    clearDraft();
    setShowResetConfirm(false);
    setCurrentStep(1);
    alert('सर्व माहिती यशस्वीरीत्या साफ केली आहे (Form Reset Successful)');
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Completed, redirect to preview template
      router.push('/tools/vivah-parichay/preview');
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans relative">
      {/* Upper Brand Header - Mobile Optimized */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-3 sm:px-4 py-2.5 sm:py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <Link href="/tools/vivah-parichay" className="flex items-center gap-1.5 hover:opacity-90 shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <div className="hidden xs:block">
              <h1 className="font-extrabold text-sm sm:text-base text-slate-800 tracking-tight leading-none">
                AyushNexa <span className="text-amber-600">Hub</span>
              </h1>
              <span className="text-[8px] sm:text-[9px] font-mono font-medium text-slate-400 uppercase tracking-widest block mt-0.5">
                Vivah-Parichay Form
              </span>
            </div>
          </Link>

          {/* Autosave Status Badge - Responsive */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-500 font-mono">
              {saveStatus === 'saved' && (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  जतन केली (Draft Saved)
                </>
              )}
              {saveStatus === 'saving' && (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-spin" />
                  जतन होत आहे...
                </>
              )}
              {saveStatus === 'idle' && (
                <>
                  <span className="h-1.5 w-1.5 rounded-full bg-zinc-400" />
                  बदल प्रलंबित
                </>
              )}
            </span>

            {/* Quick Actions - Touch friendly */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="text-slate-600 hover:bg-slate-50 hover:text-slate-800 text-[11px] sm:text-xs font-bold py-1.5 px-2 sm:py-2 sm:px-3 rounded-lg border border-slate-200 flex items-center gap-1 transition-all"
                title="फॉम साफ करा"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">साफ करा</span>
              </button>

              <Link
                href="/tools/vivah-parichay/preview"
                className="bg-amber-600 hover:bg-amber-700 text-white text-[11px] sm:text-xs font-extrabold py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg flex items-center gap-1 transition-all shadow-md shadow-amber-200/30"
              >
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>प्रीव्ह्यू</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
        
        {/* Step Progress - Mobile Optimized */}
        <div className="mb-6 sm:mb-8">
          {/* Progress bar - Hidden on very small, shown on tablet+ */}
          <div className="relative hidden sm:flex items-center justify-between">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-zinc-200 z-0" />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-amber-600 transition-all duration-300 z-0"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
            
            {steps.map((step) => (
              <button
                key={step.num}
                type="button"
                onClick={() => setCurrentStep(step.num)}
                className={`relative z-10 w-8 h-8 sm:w-11 sm:h-11 rounded-full flex flex-col items-center justify-center font-bold text-xs sm:text-sm border-2 transition-all ${
                  currentStep >= step.num
                    ? 'bg-amber-600 border-amber-600 text-white shadow-md'
                    : 'bg-white border-zinc-200 text-zinc-400 hover:border-zinc-300'
                }`}
              >
                {step.num}
                <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 hidden md:block text-[10px] whitespace-nowrap font-semibold text-slate-500">
                  {step.name}
                </span>
              </button>
            ))}
          </div>

          {/* Mobile Step Indicator - Card style */}
          <div className="sm:hidden bg-white rounded-xl border border-slate-100 shadow-sm p-3 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="p-2 rounded-full bg-slate-50 disabled:opacity-30"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-center">
              <span className="text-xs font-bold text-amber-600">टप्पा {currentStep} / {steps.length}</span>
              <p className="text-sm font-black text-slate-800 mt-0.5">{steps[currentStep-1].name}</p>
              <p className="text-[10px] text-slate-400">{steps[currentStep-1].nameEng}</p>
            </div>
            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-slate-50"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Wizard Form Main container - Responsive padding */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-10 border border-zinc-200 shadow-xl overflow-hidden relative z-10">
          
          {/* STEP 1: Personal Details - Mobile font sizes increased */}
          {currentStep === 1 && (
            <div className="space-y-5 sm:space-y-6 animate-fade-in-down">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 border-b pb-2 flex flex-wrap items-center gap-2">
                  <span>👤</span> वैयक्तिक माहिती 
                  <span className="text-[11px] sm:text-xs text-zinc-400 font-mono italic">(Personal Information)</span>
                </h3>
              </div>

              {/* Groom vs Bride Selector - Full width buttons */}
              <div className="space-y-2">
                <label className="block text-slate-700 font-bold text-sm sm:text-base">
                  बायोडाटा कोणासाठी बनवायचा आहे? (Candidate Type) *
                </label>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      updateState({ candidateType: 'Groom' });
                      updateNestedState('personalDetails', { gender: 'Male' });
                    }}
                    className={`py-3 sm:py-4 px-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                      state.candidateType === 'Groom'
                        ? 'border-amber-600 bg-amber-50/20 text-amber-900 shadow-md ring-2 ring-amber-400/25'
                        : 'border-zinc-200 hover:bg-zinc-50 text-slate-650'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl">👦</span>
                    <span>वर (Groom)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateState({ candidateType: 'Bride' });
                      updateNestedState('personalDetails', { gender: 'Female' });
                    }}
                    className={`py-3 sm:py-4 px-3 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                      state.candidateType === 'Bride'
                        ? 'border-amber-600 bg-amber-50/20 text-amber-900 shadow-md ring-2 ring-amber-400/25'
                        : 'border-zinc-200 hover:bg-zinc-50 text-slate-650'
                    }`}
                  >
                    <span className="text-xl sm:text-2xl">👧</span>
                    <span>वधू (Bride)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold text-sm sm:text-base">नाव (Full Name) *</label>
                  <input
                    type="text"
                    required
                    value={state.personalDetails.fullName}
                    onChange={(e) => updateNestedState('personalDetails', { fullName: e.target.value })}
                    placeholder="उदा. राहुल आनंदराव गायकवाड"
                    className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Date of birth */}
                {/* Date of birth - replaces the old <input type="date"> */}
<div className="space-y-1">
  <label className="block text-slate-700 font-bold text-sm sm:text-base">
    जन्म तारीख (Date of Birth) *
  </label>
  <div className="grid grid-cols-3 gap-2">
    {/* Day */}
    <select
      value={state.personalDetails.dateOfBirth.split('-')[2] || ''}
      onChange={(e) => {
        const year = state.personalDetails.dateOfBirth.split('-')[0] || '';
        const month = state.personalDetails.dateOfBirth.split('-')[1] || '';
        const newDate = `${year}-${month}-${e.target.value.padStart(2,'0')}`;
        updateNestedState('personalDetails', { dateOfBirth: newDate });
      }}
      className="border border-zinc-250 p-3 rounded-xl font-sans text-base focus:ring-2 focus:ring-red-400"
    >
      <option value="">दिवस</option>
      {[...Array(31)].map((_, i) => (
        <option key={i+1} value={i+1}>{i+1}</option>
      ))}
    </select>

    {/* Month */}
    <select
      value={state.personalDetails.dateOfBirth.split('-')[1] || ''}
      onChange={(e) => {
        const year = state.personalDetails.dateOfBirth.split('-')[0] || '';
        const day = state.personalDetails.dateOfBirth.split('-')[2] || '';
        const newDate = `${year}-${e.target.value.padStart(2,'0')}-${day}`;
        updateNestedState('personalDetails', { dateOfBirth: newDate });
      }}
      className="border border-zinc-250 p-3 rounded-xl font-sans text-base focus:ring-2 focus:ring-red-400"
    >
      <option value="">महिना</option>
      <option value="01">जानेवारी</option>
      <option value="02">फेब्रुवारी</option>
      <option value="03">मार्च</option>
      <option value="04">एप्रिल</option>
      <option value="05">मे</option>
      <option value="06">जून</option>
      <option value="07">जुलै</option>
      <option value="08">ऑगस्ट</option>
      <option value="09">सप्टेंबर</option>
      <option value="10">ऑक्टोबर</option>
      <option value="11">नोव्हेंबर</option>
      <option value="12">डिसेंबर</option>
    </select>

    {/* Year */}
    <select
      value={state.personalDetails.dateOfBirth.split('-')[0] || ''}
      onChange={(e) => {
        const month = state.personalDetails.dateOfBirth.split('-')[1] || '';
        const day = state.personalDetails.dateOfBirth.split('-')[2] || '';
        const newDate = `${e.target.value}-${month}-${day}`;
        updateNestedState('personalDetails', { dateOfBirth: newDate });
      }}
      className="border border-zinc-250 p-3 rounded-xl font-sans text-base focus:ring-2 focus:ring-red-400"
    >
      <option value="">वर्ष</option>
      {(() => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let y = currentYear - 80; y <= currentYear - 18; y++) {
          years.push(y);
        }
        return years.map(year => (
          <option key={year} value={year}>{year}</option>
        ));
      })()}
    </select>
  </div>
  <p className="text-[11px] sm:text-xs text-zinc-400 font-mono text-right">
    वय: {state.personalDetails.age > 0 ? `${state.personalDetails.age} वर्षे` : 'तारीख निवडा'}
  </p>
</div>

                {/* Height */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold text-sm sm:text-base">उंची (Height) *</label>
                  <input
                    type="text"
                    required
                    value={state.personalDetails.height}
                    onChange={(e) => updateNestedState('personalDetails', { height: e.target.value })}
                    placeholder="उदा. ५ फूट १० इंच"
                    className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Weight */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold text-sm sm:text-base">वजन (Weight)</label>
                  <input
                    type="text"
                    value={state.personalDetails.weight}
                    onChange={(e) => updateNestedState('personalDetails', { weight: e.target.value })}
                    placeholder="उदा. 70 kg"
                    className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Blood Group */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold text-sm sm:text-base">रक्त गट (Blood Group)</label>
                  <select
                    value={state.personalDetails.bloodGroup}
                    onChange={(e) => updateNestedState('personalDetails', { bloodGroup: e.target.value })}
                    className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                  >
                    <option value="">निवडा (Select)</option>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                {/* Complexion */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold text-sm sm:text-base">वर्ण (Complexion)</label>
                  <input
                    type="text"
                    value={state.personalDetails.complexion}
                    onChange={(e) => updateNestedState('personalDetails', { complexion: e.target.value })}
                    placeholder="उदा. गोरा, सावळा, गव्हाळ"
                    className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Native Place */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-slate-700 font-bold text-sm sm:text-base">मूळ गाव (Native Place)</label>
                  <input
                    type="text"
                    value={state.personalDetails.nativePlace}
                    onChange={(e) => updateNestedState('personalDetails', { nativePlace: e.target.value })}
                    placeholder="उदा. कराड, सांगली, सातारा"
                    className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Current address */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-slate-700 font-bold text-sm sm:text-base">राहण्याचा चालू पत्ता (Current Address)</label>
                  <textarea
                    value={state.personalDetails.currentAddress}
                    onChange={(e) => updateNestedState('personalDetails', { currentAddress: e.target.value })}
                    placeholder="उदा. फ्लॅट क्र. ४०२, साई रेसिडेन्सी, शनिवार पेठ, पुणे - ४११००३"
                    className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400 h-24 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Birth details and Horoscope - Responsive */}
          {currentStep === 2 && (
            <div className="space-y-5 sm:space-y-6 animate-fade-in-down">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                  <span>🪐</span> जन्म व कुंडली माहिती 
                  <span className="text-[11px] sm:text-xs text-zinc-400 font-mono italic">(Astrology)</span>
                </h3>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-650 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showBirthDetails}
                      onChange={(e) => updateNestedState('optionalToggles', { showBirthDetails: e.target.checked })}
                      className="rounded border-zinc-300 text-red-600 focus:ring-red-400 w-4 h-4"
                    />
                    जन्म दर्शवा
                  </label>
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-650 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showHoroscope}
                      onChange={(e) => updateNestedState('optionalToggles', { showHoroscope: e.target.checked })}
                      className="rounded border-zinc-300 text-red-600 focus:ring-red-400 w-4 h-4"
                    />
                    कुंडली दर्शवा
                  </label>
                </div>
              </div>

              {/* Birth Block */}
              {state.optionalToggles.showBirthDetails && (
                <div className="bg-amber-50/20 p-4 sm:p-5 rounded-2xl border border-amber-200/50 space-y-4">
                  <h4 className="font-bold text-sm sm:text-base text-amber-900">⏰ जन्माची अचूक माहिती</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">जन्म वेळ (Time of Birth)</label>
                      <input
                        type="text"
                        value={state.birthDetails.timeOfBirth}
                        onChange={(e) => updateNestedState('birthDetails', { timeOfBirth: e.target.value })}
                        placeholder="उदा. सकाळी १०:४५"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">जन्म ठिकाण (Place of Birth)</label>
                      <input
                        type="text"
                        value={state.birthDetails.placeOfBirth}
                        onChange={(e) => updateNestedState('birthDetails', { placeOfBirth: e.target.value })}
                        placeholder="उदा. मुंबई, सातारा"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Horoscope astrology elements - responsive grid */}
              {state.optionalToggles.showHoroscope && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 pt-2">
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">राशी (Rashi)</label>
                    <input
                      type="text"
                      value={state.horoscope.rashi}
                      onChange={(e) => updateNestedState('horoscope', { rashi: e.target.value })}
                      placeholder="उदा. तूळ, मेष"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">नक्षत्र (Nakshatra)</label>
                    <input
                      type="text"
                      value={state.horoscope.nakshatra}
                      onChange={(e) => updateNestedState('horoscope', { nakshatra: e.target.value })}
                      placeholder="उदा. स्वाती, हस्त"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">नाडी (Nadi)</label>
                    <input
                      type="text"
                      value={state.horoscope.nadi}
                      onChange={(e) => updateNestedState('horoscope', { nadi: e.target.value })}
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">गण (Gan)</label>
                    <input
                      type="text"
                      value={state.horoscope.gan}
                      onChange={(e) => updateNestedState('horoscope', { gan: e.target.value })}
                      placeholder="उदा. देव / मानुष"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">गोत्र (Gotra)</label>
                    <input
                      type="text"
                      value={state.horoscope.gotra}
                      onChange={(e) => updateNestedState('horoscope', { gotra: e.target.value })}
                      placeholder="उदा. कश्यप / भारद्वाज"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">मंगळ (Manglik) *</label>
                    <select
                      value={state.horoscope.manglik}
                      onChange={(e) => updateNestedState('horoscope', { manglik: e.target.value })}
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                    >
                      <option value="नाही (No)">नाही / No</option>
                      <option value="होय (Yes)">होय / Yes</option>
                      <option value="अंशत: (Anshik)">अंशत: / Anshik</option>
                      <option value="माहित नाही">माहित नाही</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">पत्रिका उपलब्ध?</label>
                    <div className="flex gap-4 p-2 bg-zinc-50 rounded-xl border border-zinc-200">
                      <label className="flex items-center gap-1.5 text-sm font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="kundali"
                          checked={state.horoscope.kundaliAvailable === 'होय (Yes)'}
                          onChange={() => updateNestedState('horoscope', { kundaliAvailable: 'होय (Yes)' })}
                          className="text-red-700 focus:ring-red-400 w-4 h-4"
                        />
                        होय
                      </label>
                      <label className="flex items-center gap-1.5 text-sm font-semibold cursor-pointer">
                        <input
                          type="radio"
                          name="kundali"
                          checked={state.horoscope.kundaliAvailable === 'नाही (No)'}
                          onChange={() => updateNestedState('horoscope', { kundaliAvailable: 'नाही (No)' })}
                          className="text-red-700 focus:ring-red-400 w-4 h-4"
                        />
                        नाही
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">पत्रिका टीप / इतर माहिती</label>
                    <input
                      type="text"
                      value={state.horoscope.horoscopeNotes}
                      onChange={(e) => updateNestedState('horoscope', { horoscopeNotes: e.target.value })}
                      placeholder="उदा. गुणमेलन आवश्यक आहे"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Education & Occupation - responsive toggles */}
          {currentStep === 3 && (
            <div className="space-y-5 sm:space-y-6 animate-fade-in-down">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                  <span>🎓</span> शिक्षण व नोकरी / व्यवसाय 
                  <span className="text-[11px] sm:text-xs text-zinc-400 font-mono italic">(Employment)</span>
                </h3>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-650 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showEducation}
                      onChange={(e) => updateNestedState('optionalToggles', { showEducation: e.target.checked })}
                      className="rounded border-zinc-300 text-red-600 w-4 h-4"
                    />
                    शिक्षण दर्शवा
                  </label>
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-650 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showOccupation}
                      onChange={(e) => updateNestedState('optionalToggles', { showOccupation: e.target.checked })}
                      className="rounded border-zinc-300 text-red-600 w-4 h-4"
                    />
                    करिअर दर्शवा
                  </label>
                </div>
              </div>

              {/* Education section */}
              {state.optionalToggles.showEducation && (
                <div className="space-y-4">
                  <h4 className="font-bold text-sm sm:text-base text-slate-800 border-l-4 border-amber-600 pl-2">🎓 शैक्षणिक तपशील</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">उच्च शिक्षण (Education Level) *</label>
                      <input
                        type="text"
                        required
                        value={state.education.education}
                        onChange={(e) => updateNestedState('education', { education: e.target.value })}
                        placeholder="उदा. बी.ई., एम.बी.ए."
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">पदवी / डिग्रीचे नाव</label>
                      <input
                        type="text"
                        value={state.education.degree}
                        onChange={(e) => updateNestedState('education', { degree: e.target.value })}
                        placeholder="उदा. B.Tech Computer Engineering"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">कॉलेज / विद्यापीठ</label>
                      <input
                        type="text"
                        value={state.education.college}
                        onChange={(e) => updateNestedState('education', { college: e.target.value })}
                        placeholder="उदा. पुणे युनिव्हर्सिटी"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">इतर प्रमाणपत्र / कोर्सेस</label>
                      <input
                        type="text"
                        value={state.education.additionalCourses}
                        onChange={(e) => updateNestedState('education', { additionalCourses: e.target.value })}
                        placeholder="उदा. वेब डेव्हलपमेंट"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Occupation section */}
              {state.optionalToggles.showOccupation && (
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-bold text-sm sm:text-base text-slate-800 border-l-4 border-amber-600 pl-2">💼 नोकरी / व्यवसाय</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">व्यवसाय / पोस्ट नाव *</label>
                      <input
                        type="text"
                        value={state.occupation.occupation}
                        onChange={(e) => updateNestedState('occupation', { occupation: e.target.value })}
                        placeholder="उदा. सॉफ्टवेअर इंजिनिअर"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">कंपनी / बिझनेसचे नाव</label>
                      <input
                        type="text"
                        value={state.occupation.company}
                        onChange={(e) => updateNestedState('occupation', { company: e.target.value })}
                        placeholder="उदा. टाटा मोटर्स"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">वार्षिक उत्पन्न</label>
                      <input
                        type="text"
                        value={state.occupation.annualIncome}
                        onChange={(e) => updateNestedState('occupation', { annualIncome: e.target.value })}
                        placeholder="उदा. ८ ते १० लाख रुपये"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Family Details - with better spacing */}
          {currentStep === 4 && (
            <div className="space-y-5 sm:space-y-6 animate-fade-in-down">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                  <span>👨‍👩‍👦</span> कौटुंबिक माहिती 
                  <span className="text-[11px] sm:text-xs text-zinc-400 font-mono italic">(Family)</span>
                </h3>
                <label className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-650 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={state.optionalToggles.showFamily}
                    onChange={(e) => updateNestedState('optionalToggles', { showFamily: e.target.checked })}
                    className="rounded border-zinc-300 text-red-600 w-4 h-4"
                  />
                  कुटुंब माहिती दर्शवा
                </label>
              </div>

              {state.optionalToggles.showFamily && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">वडिलांचे नाव (Father Name) *</label>
                    <input
                      type="text"
                      required
                      value={state.family.fatherName}
                      onChange={(e) => updateNestedState('family', { fatherName: e.target.value })}
                      placeholder="उदा. आनंदराव यशवंत गायकवाड"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">वडिलांचा व्यवसाय</label>
                    <input
                      type="text"
                      value={state.family.fatherOccupation}
                      onChange={(e) => updateNestedState('family', { fatherOccupation: e.target.value })}
                      placeholder="उदा. निवृत्त मुख्य लेखापाल"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">आईचे नाव (Mother Name) *</label>
                    <input
                      type="text"
                      required
                      value={state.family.motherName}
                      onChange={(e) => updateNestedState('family', { motherName: e.target.value })}
                      placeholder="उदा. श्रीमती सुलोचना गायकवाड"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">आईचा व्यवसाय</label>
                    <input
                      type="text"
                      value={state.family.motherOccupation}
                      onChange={(e) => updateNestedState('family', { motherOccupation: e.target.value })}
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">भाऊ (Brothers details)</label>
                    <input
                      type="text"
                      value={state.family.brothers}
                      onChange={(e) => updateNestedState('family', { brothers: e.target.value })}
                      placeholder="उदा. १ लहान भाऊ"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">बहीण (Sisters details)</label>
                    <input
                      type="text"
                      value={state.family.sisters}
                      onChange={(e) => updateNestedState('family', { sisters: e.target.value })}
                      placeholder="उदा. १ मोठी बहीण (विवाहित)"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">कुटुंब प्रकार</label>
                    <select
                      value={state.family.familyType}
                      onChange={(e) => updateNestedState('family', { familyType: e.target.value })}
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                    >
                      <option value="एकत्र कुटुंब (Joint Family)">एकत्र कुटुंब (Joint)</option>
                      <option value="विभक्त कुटुंब (Nuclear Family)">विभक्त कुटुंब (Nuclear)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">कुटुंब पार्श्वभूमी</label>
                    <input
                      type="text"
                      value={state.family.familyBackground}
                      onChange={(e) => updateNestedState('family', { familyBackground: e.target.value })}
                      placeholder="उदा. मध्यमवर्गीय, सुसंस्कृत मराठा घराणे"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Property and Expectations */}
          {currentStep === 5 && (
            <div className="space-y-5 sm:space-y-6 animate-fade-in-down">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-2 gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                  <span>🏡</span> मालमत्ता व अपेक्षा 
                  <span className="text-[11px] sm:text-xs text-zinc-400 font-mono italic">(Preferences)</span>
                </h3>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-650 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showProperty}
                      onChange={(e) => updateNestedState('optionalToggles', { showProperty: e.target.checked })}
                      className="rounded border-zinc-300 text-red-600 w-4 h-4"
                    />
                    मालमत्ता दर्शवा
                  </label>
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-650 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showExpectations}
                      onChange={(e) => updateNestedState('optionalToggles', { showExpectations: e.target.checked })}
                      className="rounded border-zinc-300 text-red-600 w-4 h-4"
                    />
                    अपेक्षा दर्शवा
                  </label>
                </div>
              </div>

              {/* Property details */}
              {state.optionalToggles.showProperty && (
                <div className="bg-stone-50 p-4 sm:p-5 rounded-2xl border border-zinc-200 space-y-4">
                  <h4 className="font-bold text-sm sm:text-base text-stone-900">🏡 मालमत्ता तपशील</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">घर / स्वतःचा फ्लॅट</label>
                      <input
                        type="text"
                        value={state.property.house}
                        onChange={(e) => updateNestedState('property', { house: e.target.value })}
                        placeholder="उदा. कोथरूड येथे स्वतःचे घर"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">शेती आणि जागा</label>
                      <input
                        type="text"
                        value={state.property.agriculture}
                        onChange={(e) => updateNestedState('property', { agriculture: e.target.value })}
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">चारचाकी/दुचाकी वाहने</label>
                      <input
                        type="text"
                        value={state.property.vehicle}
                        onChange={(e) => updateNestedState('property', { vehicle: e.target.value })}
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">इतर संपत्ती</label>
                      <input
                        type="text"
                        value={state.property.otherAssets}
                        onChange={(e) => updateNestedState('property', { otherAssets: e.target.value })}
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Expectations fields */}
              {state.optionalToggles.showExpectations && (
                <div className="space-y-4">
                  <h4 className="font-bold text-sm sm:text-base text-slate-800 border-l-4 border-amber-600 pl-2">🤝 पसंती आणि अपेक्षा</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">पसंतीचे शिक्षण</label>
                      <input
                        type="text"
                        value={state.expectations.preferredEducation}
                        onChange={(e) => updateNestedState('expectations', { preferredEducation: e.target.value })}
                        placeholder="उदा. पदवीधर किंवा उच्चशिक्षित"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">पसंतीचा व्यवसाय</label>
                      <input
                        type="text"
                        value={state.expectations.preferredProfession}
                        onChange={(e) => updateNestedState('expectations', { preferredProfession: e.target.value })}
                        placeholder="उदा. आयटी नोकरी किंवा सरकारी सेवा"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">अपेक्षित वय गट</label>
                      <input
                        type="text"
                        value={state.expectations.preferredAge}
                        onChange={(e) => updateNestedState('expectations', { preferredAge: e.target.value })}
                        placeholder="उदा. २३ ते २७ वर्षे"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">पसंतीचे शहर/जिल्हा</label>
                      <input
                        type="text"
                        value={state.expectations.preferredCity}
                        onChange={(e) => updateNestedState('expectations', { preferredCity: e.target.value })}
                        placeholder="उदा. पुणे, मुंबई, कोल्हापूर"
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base"
                      />
                    </div>
                    <div className="space-y-1 sm:col-span-2">
                      <label className="block text-slate-700 font-bold text-sm sm:text-base">इतर अपेक्षा नोट्स</label>
                      <textarea
                        value={state.expectations.otherExpectations}
                        onChange={(e) => updateNestedState('expectations', { otherExpectations: e.target.value })}
                        placeholder="उदा. मुलगी समजूतदार व सुसंस्कृत असावी."
                        className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base h-24 resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: Photos and Contacts */}
          {currentStep === 6 && (
            <div className="space-y-5 sm:space-y-6 animate-fade-in-down">
              <div className="border-b pb-2">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2 flex-wrap">
                  <span>📸</span> फोटो आणि संपर्क माहिती 
                  <span className="text-[11px] sm:text-xs text-zinc-400 font-mono italic">(Contact Details)</span>
                </h3>
              </div>

              {/* Photo uploader - responsive */}
              <div className="p-4 sm:p-5 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-bold text-sm sm:text-base text-slate-800 flex items-center gap-1.5">
                    <span>📷</span> वर / वधूचा फोटो अपलोड करा
                  </h4>
                  <label className="flex items-center gap-1.5 text-xs sm:text-sm text-zinc-650 cursor-pointer font-bold">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showPhoto}
                      onChange={(e) => updateNestedState('optionalToggles', { showPhoto: e.target.checked })}
                      className="rounded border-zinc-300 text-red-650 w-4 h-4"
                    />
                    बायोडाटामध्ये फोटो दाखवा
                  </label>
                </div>
                
                {state.optionalToggles.showPhoto && (
                  <PhotoUploader
                    photoUrl={state.photoUrl}
                    onPhotoChange={(base64Url) => updateState({ photoUrl: base64Url })}
                  />
                )}
              </div>

              {/* Contact information */}
              <div className="space-y-4">
                  <h4 className="font-bold text-sm sm:text-base text-slate-800 border-l-4 border-amber-600 pl-2">📞 संपर्क दूरध्वनी क्रमांक</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">मुख्य मोबाईल नंबर *</label>
                    <input
                      type="tel"
                      required
                      value={state.contact.mobile}
                      onChange={(e) => {
                        updateNestedState('contact', { mobile: e.target.value });
                        if (!state.contact.whatsApp) {
                          updateNestedState('contact', { whatsApp: e.target.value });
                        }
                      }}
                      placeholder="उदा. ९८७६५४३२१०"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">पर्यायी संपर्क नंबर</label>
                    <input
                      type="tel"
                      value={state.contact.alternateMobile}
                      onChange={(e) => updateNestedState('contact', { alternateMobile: e.target.value })}
                      placeholder="उदा. ९१२३४५६७८९"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base"
                    />
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="block text-slate-700 font-bold text-sm sm:text-base">व्हॉट्सॲप नंबर</label>
                    <input
                      type="tel"
                      value={state.contact.whatsApp}
                      onChange={(e) => updateNestedState('contact', { whatsApp: e.target.value })}
                      placeholder="उदा. ९८७६५४३२१०"
                      className="w-full border border-zinc-250 p-3 sm:p-3.5 rounded-xl font-sans text-base"
                    />
                    <p className="text-[11px] sm:text-xs text-zinc-400 italic">
                      टीप: हा नंबर प्रिमियम डाऊनलोडमध्ये व्हाट्सॲप क्यूआर कोडसाठी वापरला जाईल.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Navigation Footer - Larger touch targets */}
          <div className="border-t border-zinc-150 mt-8 sm:mt-10 pt-5 sm:pt-6 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-4 py-2.5 sm:px-5 sm:py-3.5 rounded-xl border border-zinc-300 hover:border-zinc-400 font-bold text-sm sm:text-base flex items-center gap-1.5 transition-all text-slate-750 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>मागे</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 sm:px-7 sm:py-3.5 rounded-xl font-extrabold text-sm sm:text-base flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <span>{currentStep === steps.length ? 'पूर्ण करा' : 'पुढे जा'}</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

        </div>

        {/* Small tips footer */}
        <p className="text-center text-[11px] sm:text-xs text-zinc-400 font-mono mt-5 sm:mt-6">
          🔔 माहिती टाईप करताना ती स्वयंचलित साठवणीत जतन (auto-saved) केली जाते.
        </p>
      </div>

      {/* CONFIRMATION OVERLAY RESET DIALOG - Mobile friendly */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 max-w-md w-full border border-zinc-200 shadow-2xl space-y-5 sm:space-y-6">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 shrink-0" />
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                फॉर्म साफ करायचा आहे का?
              </h3>
            </div>

            <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
              फॉर्म साफ केल्याने तुमची ड्राफ्ट स्वरूपातील सर्व माहिती तात्काळ मिटवली जाईल व रिकव्हर करता येणार नाही. तुम्हाला खात्री आहे का?
            </p>

            <div className="flex items-center gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-zinc-300 font-bold text-sm sm:text-base hover:bg-zinc-50 transition-colors"
              >
                रद्द करा
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-black text-sm sm:text-base shadow-md"
              >
                होय, साफ करा
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}