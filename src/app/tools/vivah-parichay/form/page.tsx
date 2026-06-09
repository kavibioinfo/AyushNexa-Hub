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
      {/* Upper Brand Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/tools/vivah-parichay" className="flex items-center gap-1.5 hover:opacity-90">
            <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold shrink-0">A</div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-slate-800 tracking-tight leading-none">
                AyushNexa <span className="text-amber-600">Hub</span>
              </h1>
              <span className="text-[9px] font-mono font-medium text-slate-400 uppercase tracking-widest block mt-0.5">
                Vivah-Parichay Form
              </span>
            </div>
          </Link>

          {/* Autosave Status Badge */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              {saveStatus === 'saved' && (
                <>
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  सर्व माहिती जतन केली आहे (Draft Saved)
                </>
              )}
              {saveStatus === 'saving' && (
                <>
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-spin" />
                  जतन होत आहे (Saving Draft...)
                </>
              )}
              {saveStatus === 'idle' && (
                <>
                  <span className="h-2 w-2 rounded-full bg-zinc-400" />
                  बदल प्रलंबित (Pending changes)
                </>
              )}
            </span>

            {/* Quick Actions Panel */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                className="text-slate-600 hover:bg-slate-50 hover:text-slate-800 text-xs font-bold py-2 px-3 rounded-lg border border-slate-250 flex items-center gap-1 transition-all"
                title="फॉम साफ करा"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">साफ करा (Reset)</span>
              </button>

              <Link
                href="/tools/vivah-parichay/preview"
                className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-extrabold py-2 px-4 rounded-lg flex items-center gap-1 transition-all shadow-md shadow-amber-200/30"
              >
                <Eye className="w-4 h-4" />
                <span>प्रीव्ह्यू पहा (Preview)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Step Progress indicators */}
        <div className="mb-8">
          {/* Progress bar line */}
          <div className="relative flex items-center justify-between">
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
                className={`relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex flex-col items-center justify-center font-bold text-xs sm:text-sm border-2 transition-all ${
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
          {/* Mobile Step Name indicator */}
          <div className="mt-8 text-center md:hidden bg-zinc-100/50 rounded-lg py-2 border">
            <span className="text-xs font-bold text-slate-800">
              टप्पा {currentStep} ऑफ {steps.length}: {steps[currentStep - 1].name} ({steps[currentStep - 1].nameEng})
            </span>
          </div>
        </div>

        {/* Wizard Form Main container Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-250/60 shadow-xl overflow-hidden relative z-10">
          
          {/* STEP 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in-down">
              <div>
                <h3 className="text-xl font-bold text-slate-900 border-b pb-2 flex items-center gap-2">
                  <span>👤</span> वैयक्तिक माहिती <span className="text-xs text-zinc-400 font-mono italic">(Personal Information)</span>
                </h3>
              </div>

              {/* Groom vs Bride Selector */}
              <div className="space-y-2">
                <label className="block text-slate-700 font-bold text-xs sm:text-sm">
                  बायोडाटा कोणासाठी बनवायचा आहे? (Candidate Type) *
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      updateState({ candidateType: 'Groom' });
                      updateNestedState('personalDetails', { gender: 'Male' });
                    }}
                    className={`py-4 px-6 rounded-2xl font-bold text-sm border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                      state.candidateType === 'Groom'
                        ? 'border-amber-600 bg-amber-50/20 text-amber-900 shadow-md ring-2 ring-amber-400/25'
                        : 'border-zinc-200 hover:bg-zinc-50 text-slate-650'
                    }`}
                  >
                    <span className="text-2xl">👦</span>
                    <span>वर (Groom / मुलगा)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      updateState({ candidateType: 'Bride' });
                      updateNestedState('personalDetails', { gender: 'Female' });
                    }}
                    className={`py-4 px-6 rounded-2xl font-bold text-sm border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                      state.candidateType === 'Bride'
                        ? 'border-amber-600 bg-amber-50/20 text-amber-900 shadow-md ring-2 ring-amber-400/25'
                        : 'border-zinc-200 hover:bg-zinc-50 text-slate-650'
                    }`}
                  >
                    <span className="text-2xl">👧</span>
                    <span>वधू (Bride / मुलगी)</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold text-xs sm:text-sm">नाव (Full Name) *</label>
                  <input
                    type="text"
                    required
                    value={state.personalDetails.fullName}
                    onChange={(e) => updateNestedState('personalDetails', { fullName: e.target.value })}
                    placeholder="उदा. राहुल आनंदराव गायकवाड"
                    className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Date of birth */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold text-xs sm:text-sm">जन्म तारीख (Date of Birth) *</label>
                  <input
                    type="date"
                    required
                    value={state.personalDetails.dateOfBirth}
                    onChange={(e) => updateNestedState('personalDetails', { dateOfBirth: e.target.value })}
                    className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <p className="text-[10px] text-zinc-400 font-mono tracking-tight text-right">
                    वय (Age): {state.personalDetails.age > 0 ? `${state.personalDetails.age} वर्षे (Calculated)` : 'तारीख निवडा'}
                  </p>
                </div>

                {/* Height */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold text-xs sm:text-sm">उंची (Height) *</label>
                  <input
                    type="text"
                    required
                    value={state.personalDetails.height}
                    onChange={(e) => updateNestedState('personalDetails', { height: e.target.value })}
                    placeholder="उदा. ५ फूट १० इंच"
                    className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Weight */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold text-xs sm:text-sm">वजन (Weight)</label>
                  <input
                    type="text"
                    value={state.personalDetails.weight}
                    onChange={(e) => updateNestedState('personalDetails', { weight: e.target.value })}
                    placeholder="उदा. 70 kg"
                    className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Blood Group */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold text-xs sm:text-sm">रक्त गट (Blood Group)</label>
                  <select
                    value={state.personalDetails.bloodGroup}
                    onChange={(e) => updateNestedState('personalDetails', { bloodGroup: e.target.value })}
                    className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                  >
                    <option value="">निवडा (Select)</option>
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                {/* Complexion */}
                <div className="space-y-1">
                  <label className="block text-slate-700 font-bold text-xs sm:text-sm">वर्ण (Complexion)</label>
                  <input
                    type="text"
                    value={state.personalDetails.complexion}
                    onChange={(e) => updateNestedState('personalDetails', { complexion: e.target.value })}
                    placeholder="उदा. गोरा, सावळा, गव्हाळ, Wheatish"
                    className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Native Place */}
                <div className="space-y-1 md:col-span-2">
                  <label className="block text-slate-700 font-bold text-xs sm:text-sm">मूळ गाव (Native Place)</label>
                  <input
                    type="text"
                    value={state.personalDetails.nativePlace}
                    onChange={(e) => updateNestedState('personalDetails', { nativePlace: e.target.value })}
                    placeholder="उदा. कराड, सांगली, सातारा"
                    className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>

                {/* Current address */}
                <div className="space-y-1 md:col-span-2">
                  <label className="block text-slate-700 font-bold text-xs sm:text-sm">राहण्याचा चालू पत्ता (Current Address)</label>
                  <textarea
                    value={state.personalDetails.currentAddress}
                    onChange={(e) => updateNestedState('personalDetails', { currentAddress: e.target.value })}
                    placeholder="उदा. फ्लॅट क्र. ४०२, साई रेसिडेन्सी, शनिवार पेठ, पुणे - ४११००३"
                    className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400 h-24 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Birth details and Horoscope */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fade-in-down">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🪐</span> जन्म व कुंडली माहिती <span className="text-xs text-zinc-400 font-mono italic">(Astrorogy Details)</span>
                </h3>
                {/* Optional toggles */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-zinc-650 cursor-pointer font-bold font-sans">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showBirthDetails}
                      onChange={(e) => updateNestedState('optionalToggles', { showBirthDetails: e.target.checked })}
                      className="rounded border-zinc-300 text-red-600 focus:ring-red-400"
                    />
                    जन्म दर्शवा
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-zinc-650 cursor-pointer font-bold font-sans">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showHoroscope}
                      onChange={(e) => updateNestedState('optionalToggles', { showHoroscope: e.target.checked })}
                      className="rounded border-zinc-300 text-red-600 focus:ring-red-400"
                    />
                    कुंडली दर्शवा
                  </label>
                </div>
              </div>

              {/* Birth Block */}
              {state.optionalToggles.showBirthDetails && (
                <div className="bg-amber-50/20 p-5 rounded-2xl border border-amber-200/50 space-y-4">
                  <h4 className="font-bold text-sm text-amber-900">⏰ जन्माची अचूक माहिती (Birth Info)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">जन्म वेळ (Time of Birth)</label>
                      <input
                        type="text"
                        value={state.birthDetails.timeOfBirth}
                        onChange={(e) => updateNestedState('birthDetails', { timeOfBirth: e.target.value })}
                        placeholder="उदा. सुबह १०:४५"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">जन्म ठिकाण (Place of Birth)</label>
                      <input
                        type="text"
                        value={state.birthDetails.placeOfBirth}
                        onChange={(e) => updateNestedState('birthDetails', { placeOfBirth: e.target.value })}
                        placeholder="उदा. मुंबई, सातारा"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Horoscope astrology elements */}
              {state.optionalToggles.showHoroscope && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">राशी (Rashi)</label>
                    <input
                      type="text"
                      value={state.horoscope.rashi}
                      onChange={(e) => updateNestedState('horoscope', { rashi: e.target.value })}
                      placeholder="उदा. तूळ, मेष, मकर"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">नक्षत्र (Nakshatra)</label>
                    <input
                      type="text"
                      value={state.horoscope.nakshatra}
                      onChange={(e) => updateNestedState('horoscope', { nakshatra: e.target.value })}
                      placeholder="उदा. स्वाती, हस्त"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">नाडी (Nadi)</label>
                    <input
                      type="text"
                      value={state.horoscope.nadi}
                      onChange={(e) => updateNestedState('horoscope', { nadi: e.target.value })}
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">गण (Gan)</label>
                    <input
                      type="text"
                      value={state.horoscope.gan}
                      onChange={(e) => updateNestedState('horoscope', { gan: e.target.value })}
                      placeholder="उदा. देव / मानुष / राक्षस"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">गोत्र (Gotra)</label>
                    <input
                      type="text"
                      value={state.horoscope.gotra}
                      onChange={(e) => updateNestedState('horoscope', { gotra: e.target.value })}
                      placeholder="उदा. कश्यप / भारद्वाज"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">मंगळ (Manglik) *</label>
                    <select
                      value={state.horoscope.manglik}
                      onChange={(e) => updateNestedState('horoscope', { manglik: e.target.value })}
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                    >
                      <option value="नाही (No)">नाही / No</option>
                      <option value="होय (Yes)">होय / Yes</option>
                      <option value="अंशत: (Anshik)">अंशत: / Anshik Mangal</option>
                      <option value="माहित नाही">माहित नाही / Don&apos;t Know</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-slate-700">
                    <label className="block text-slate-750 font-bold text-xs sm:text-sm">पत्रिका उपलब्ध?</label>
                    <div className="flex gap-4 p-2 bg-zinc-50 rounded-xl border border-zinc-250/55">
                      <label className="flex items-center gap-1.5 text-xs font-semibold select-none cursor-pointer">
                        <input
                          type="radio"
                          name="kundali"
                          checked={state.horoscope.kundaliAvailable === 'होय (Yes)'}
                          onChange={() => updateNestedState('horoscope', { kundaliAvailable: 'होय (Yes)' })}
                          className="text-red-700 focus:ring-red-400"
                        />
                        होय
                      </label>
                      <label className="flex items-center gap-1.5 text-xs font-semibold select-none cursor-pointer">
                        <input
                          type="radio"
                          name="kundali"
                          checked={state.horoscope.kundaliAvailable === 'नाही (No)'}
                          onChange={() => updateNestedState('horoscope', { kundaliAvailable: 'नाही (No)' })}
                          className="text-red-700 focus:ring-red-400"
                        />
                        नाही
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1 sm:col-span-2">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">पत्रिका टीप / इतर माहिती / नोट्स</label>
                    <input
                      type="text"
                      value={state.horoscope.horoscopeNotes}
                      onChange={(e) => updateNestedState('horoscope', { horoscopeNotes: e.target.value })}
                      placeholder="उदा. गुणमेलन आवश्यक आहे"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: Education & Occupation */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fade-in-down">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🎓</span> शिक्षण व नोकरी / व्यवसाय <span className="text-xs text-zinc-400 font-mono italic">(Employment Details)</span>
                </h3>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-zinc-650 cursor-pointer font-bold font-sans">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showEducation}
                      onChange={(e) => updateNestedState('optionalToggles', { showEducation: e.target.checked })}
                      className="rounded border-zinc-300 text-red-600 focus:ring-red-400"
                    />
                    शिक्षण दर्शवा
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-zinc-650 cursor-pointer font-bold font-sans">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showOccupation}
                      onChange={(e) => updateNestedState('optionalToggles', { showOccupation: e.target.checked })}
                      className="rounded border-zinc-300 text-red-600 focus:ring-red-400"
                    />
                    करिअर दर्शवा
                  </label>
                </div>
              </div>

              {/* Education section details */}
              {state.optionalToggles.showEducation && (
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-slate-800 border-l-4 border-amber-600 pl-2">🎓 शैक्षणिक तपशील (Education)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">उच्च शिक्षण (Education Level) *</label>
                      <input
                        type="text"
                        required
                        value={state.education.education}
                        onChange={(e) => updateNestedState('education', { education: e.target.value })}
                        placeholder="उदा. बी.ई., एम.बी.ए., पदवीधर"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">पदवी / डिग्री च नाव (Degree Title)</label>
                      <input
                        type="text"
                        value={state.education.degree}
                        onChange={(e) => updateNestedState('education', { degree: e.target.value })}
                        placeholder="उदा. B.Tech Computer Engineering"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">कॉलेज / विद्यापीठ (College / University)</label>
                      <input
                        type="text"
                        value={state.education.college}
                        onChange={(e) => updateNestedState('education', { college: e.target.value })}
                        placeholder="उदा. पुणे युनिव्हर्सिटी"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1 bg-white">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">इतर शैक्षणिक प्रमाणपत्र / कोर्सेस</label>
                      <input
                        type="text"
                        value={state.education.additionalCourses}
                        onChange={(e) => updateNestedState('education', { additionalCourses: e.target.value })}
                        placeholder="उदा. वेब डेव्हलपमेंट, सीए"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Occupation detail modules */}
              {state.optionalToggles.showOccupation && (
                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-bold text-sm text-slate-800 border-l-4 border-amber-600 pl-2">💼 नोकरी / व्यवसाय (Career)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">व्यवसाय / पोस्ट नाव (Occupation / Job Title) *</label>
                      <input
                        type="text"
                        value={state.occupation.occupation}
                        onChange={(e) => updateNestedState('occupation', { occupation: e.target.value })}
                        placeholder="उदा. सरकारी नोकरी, मुख्य व्यवस्थापक, सॉफ्टवेअर इंजिनिअर"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">कंपनी / बिझनेस चे नाव (Company Name)</label>
                      <input
                        type="text"
                        value={state.occupation.company}
                        onChange={(e) => updateNestedState('occupation', { company: e.target.value })}
                        placeholder="उदा. टाटा मोटर्स, इन्फोसिस"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">वार्षिक उत्पन्न (Annual Income)</label>
                      <input
                        type="text"
                        value={state.occupation.annualIncome}
                        onChange={(e) => updateNestedState('occupation', { annualIncome: e.target.value })}
                        placeholder="उदा. ८ ते १० लाख रुपये प्रति वर्ष"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 4: Family Details */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fade-in-down">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>👨‍👩‍👦</span> कौटुंबिक माहिती <span className="text-xs text-zinc-400 font-mono italic">(Family Details)</span>
                </h3>
                <label className="flex items-center gap-1.5 text-xs text-zinc-650 cursor-pointer font-bold font-sans">
                  <input
                    type="checkbox"
                    checked={state.optionalToggles.showFamily}
                    onChange={(e) => updateNestedState('optionalToggles', { showFamily: e.target.checked })}
                    className="rounded border-zinc-300 text-red-600"
                  />
                  कुटुंब माहिती दर्शवा
                </label>
              </div>

              {state.optionalToggles.showFamily && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">वडिलांचे नाव (Father Name) *</label>
                    <input
                      type="text"
                      required
                      value={state.family.fatherName}
                      onChange={(e) => updateNestedState('family', { fatherName: e.target.value })}
                      placeholder="उदा. आनंदराव यशवंत गायकवाड"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">वडिलांचा व्यवसाय (Father Occupation)</label>
                    <input
                      type="text"
                      value={state.family.fatherOccupation}
                      onChange={(e) => updateNestedState('family', { fatherOccupation: e.target.value })}
                      placeholder="उदा. निवृत्त मुख्य लेखापाल"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">आईचे नाव (Mother Name) *</label>
                    <input
                      type="text"
                      required
                      value={state.family.motherName}
                      onChange={(e) => updateNestedState('family', { motherName: e.target.value })}
                      placeholder="उदा. श्रीमती सुलोचना गायकवाड"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">आईचा व्यवसाय (Mother Occupation)</label>
                    <input
                      type="text"
                      value={state.family.motherOccupation}
                      onChange={(e) => updateNestedState('family', { motherOccupation: e.target.value })}
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">भाऊ (Brothers count / details)</label>
                    <input
                      type="text"
                      value={state.family.brothers}
                      onChange={(e) => updateNestedState('family', { brothers: e.target.value })}
                      placeholder="उदा. १ लहान भाऊ (शिक्षण चालू)"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">बहीण (Sisters count / details)</label>
                    <input
                      type="text"
                      value={state.family.sisters}
                      onChange={(e) => updateNestedState('family', { sisters: e.target.value })}
                      placeholder="उदा. १ मोठी बहीण (विवाहित)"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">कुटुंब प्रकार (Family Type)</label>
                    <select
                      value={state.family.familyType}
                      onChange={(e) => updateNestedState('family', { familyType: e.target.value })}
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                    >
                      <option value="एकत्र कुटुंब (Joint Family)">एकत्र कुटुंब (Joint Family)</option>
                      <option value="विभक्त कुटुंब (Nuclear Family)">विभक्त कुटुंब (Nuclear Family)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">कुटुंब पार्श्वभूमी / सोशल पत</label>
                    <input
                      type="text"
                      value={state.family.familyBackground}
                      onChange={(e) => updateNestedState('family', { familyBackground: e.target.value })}
                      placeholder="उदा. मध्यमवर्गीय, सुसंस्कृत मराठा घराणे"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 5: Property and Expectations */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fade-in-down">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>🏡</span> मालमत्ता व मुलाकडून/मुलीकडून अपेक्षा <span className="text-xs text-zinc-400 font-mono italic">(Preferences)</span>
                </h3>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 text-xs text-zinc-650 cursor-pointer font-bold font-sans">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showProperty}
                      onChange={(e) => updateNestedState('optionalToggles', { showProperty: e.target.checked })}
                      className="rounded border-zinc-300 text-red-600"
                    />
                    मालमत्ता दर्शवा
                  </label>
                  <label className="flex items-center gap-1.5 text-xs text-zinc-650 cursor-pointer font-bold font-sans">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showExpectations}
                      onChange={(e) => updateNestedState('optionalToggles', { showExpectations: e.target.checked })}
                      className="rounded border-zinc-300 text-red-600"
                    />
                    अपेक्षा दर्शवा
                  </label>
                </div>
              </div>

              {/* Property details elements */}
              {state.optionalToggles.showProperty && (
                <div className="bg-stone-50 p-5 rounded-2xl border border-zinc-200 space-y-4">
                  <h4 className="font-bold text-sm text-stone-900">🏡 मालमत्ता तपशील (Optional Property details)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">घर / स्वतःचा फ्लॅट (House/Flat)</label>
                      <input
                        type="text"
                        value={state.property.house}
                        onChange={(e) => updateNestedState('property', { house: e.target.value })}
                        placeholder="उदा. कोथरूड येथे स्वतःचे घर"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">शेती आणि जागा (Agriculture Land)</label>
                      <input
                        type="text"
                        value={state.property.agriculture}
                        onChange={(e) => updateNestedState('property', { agriculture: e.target.value })}
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">चारचाकी/दुचाकी वाहने (Vehicle Owned)</label>
                      <input
                        type="text"
                        value={state.property.vehicle}
                        onChange={(e) => updateNestedState('property', { vehicle: e.target.value })}
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">इतर संपत्ती मालमत्ता (Other Assets)</label>
                      <input
                        type="text"
                        value={state.property.otherAssets}
                        onChange={(e) => updateNestedState('property', { otherAssets: e.target.value })}
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Expectations fields */}
              {state.optionalToggles.showExpectations && (
                <div className="space-y-4">
                  <h4 className="font-bold text-sm text-slate-800 border-l-4 border-amber-600 pl-2">🤝 पसंती आणि अपेक्षा (Preferred Partner Expectations)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">पसंतीचे शिक्षण (Preferred Education)</label>
                      <input
                        type="text"
                        value={state.expectations.preferredEducation}
                        onChange={(e) => updateNestedState('expectations', { preferredEducation: e.target.value })}
                        placeholder="उदा. पदवीधर किंवा उच्चशिक्षित"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">पसंतीचा व्यवसाय (Preferred Occupation)</label>
                      <input
                        type="text"
                        value={state.expectations.preferredProfession}
                        onChange={(e) => updateNestedState('expectations', { preferredProfession: e.target.value })}
                        placeholder="उदा. आयटी नोकरी किंवा सरकारी सेवा"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">अपेक्षित वय गट (Preferred Age)</label>
                      <input
                        type="text"
                        value={state.expectations.preferredAge}
                        onChange={(e) => updateNestedState('expectations', { preferredAge: e.target.value })}
                        placeholder="उदा. २३ ते २७ वर्षे"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">पसंतीचे शहर/जिल्हा (Preferred Location)</label>
                      <input
                        type="text"
                        value={state.expectations.preferredCity}
                        onChange={(e) => updateNestedState('expectations', { preferredCity: e.target.value })}
                        placeholder="उदा. पुणे, मुंबई, कोल्हापूर"
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <div className="space-y-1 md:col-span-2">
                      <label className="block text-slate-700 font-bold text-xs sm:text-sm">इतर अपेक्षा नोट्स (Other Notes / Expectations)</label>
                      <textarea
                        value={state.expectations.otherExpectations}
                        onChange={(e) => updateNestedState('expectations', { otherExpectations: e.target.value })}
                        placeholder="उदा. मुलगी समजूतदार व सुसंस्कृत असावी."
                        className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400 h-24 resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 6: Photos and Contacts */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fade-in-down">
              <div className="flex items-center justify-between border-b pb-2">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>📸</span> फोटो आणि संपर्क माहिती <span className="text-xs text-zinc-400 font-mono italic">(Contact Details)</span>
                </h3>
              </div>

              {/* Photo uploader */}
              <div className="p-5 rounded-2xl bg-zinc-50 border border-zinc-200/60 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                    <span>📷</span> वर / वधू चा फोटो अपलोड करा (Photo Upload)
                  </h4>
                  <label className="flex items-center gap-1.5 text-xs text-zinc-650 cursor-pointer font-bold font-sans">
                    <input
                      type="checkbox"
                      checked={state.optionalToggles.showPhoto}
                      onChange={(e) => updateNestedState('optionalToggles', { showPhoto: e.target.checked })}
                      className="rounded border-zinc-300 text-red-650"
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

              {/* Contact information fields */}
              <div className="space-y-4">
                  <h4 className="font-bold text-sm text-slate-800 border-l-4 border-amber-600 pl-2">📞 संपर्क दूरध्वनी क्रमांक (Contacts)</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">मुख्य मोबाईल नंबर (Primary Mobile) *</label>
                    <input
                      type="tel"
                      required
                      value={state.contact.mobile}
                      onChange={(e) => {
                        updateNestedState('contact', { mobile: e.target.value });
                        // sync secondary contacts
                        if (!state.contact.whatsApp) {
                          updateNestedState('contact', { whatsApp: e.target.value });
                        }
                      }}
                      placeholder="उदा. ९८७६५४३२१०"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">पर्यायी संपर्क नंबर (Secondary Mobile)</label>
                    <input
                      type="tel"
                      value={state.contact.alternateMobile}
                      onChange={(e) => updateNestedState('contact', { alternateMobile: e.target.value })}
                      placeholder="उदा. ९१२३४५६७८९"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  <div className="space-y-1 md:col-span-2">
                    <label className="block text-slate-700 font-bold text-xs sm:text-sm">व्हॉट्सॲप नंबर (WhatsApp Number)</label>
                    <input
                      type="tel"
                      value={state.contact.whatsApp}
                      onChange={(e) => updateNestedState('contact', { whatsApp: e.target.value })}
                      placeholder="उदा. ९८७६५४३२१०"
                      className="w-full border border-zinc-250 p-3.5 rounded-xl font-sans focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <p className="text-[10px] text-zinc-400 italic">
                      टीप: हा नंबर थेट प्रिमियम डाऊनलोड मध्ये व्हाट्सॲप मेसेजिंगसाठी क्यूआर कोड स्वरूपात अनलॉक होईल.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Wizard Navigation Footer block */}
          <div className="border-t border-zinc-150 mt-10 pt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentStep === 1}
              className="px-5 py-3.5 rounded-xl border border-zinc-300 hover:border-zinc-400 font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all text-slate-750 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>मागे जा (Previous)</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="bg-amber-600 hover:bg-amber-700 text-white px-7 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md active:scale-95"
            >
              <span>{currentStep === steps.length ? 'पूर्ण करा आणि डाऊनलोड करा' : 'पुढे जा (Next)'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Small tips overlay footer */}
        <p className="text-center text-xs text-zinc-400 font-mono mt-6">
          🔔 माहिती टाईप करताना ती स्वयंचलित साठवणीत जतन (auto-saved) केली जाते.
        </p>
      </div>

      {/* CONFIRMATION OVERLAY RESET DIALOG MODAL */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-zinc-200 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle className="w-10 h-10 shrink-0" />
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                फॉर्म साफ करायचा आहे का? (Confirm Form Reset)
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-sans">
              फॉर्म साफ केल्याने तुमची ड्राफ्ट स्वरूपातील सर्व माहिती तात्काळ मिटवली जाईल व रिकव्हर करता येणार नाही. तुम्हाला खात्री आहे का?
            </p>

            <div className="flex items-center gap-3 justify-end pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2.5 rounded-xl border border-zinc-300 font-bold text-xs sm:text-sm hover:bg-zinc-50 transition-colors"
              >
                रद्द करा (Cancel)
              </button>
              <button
                type="button"
                onClick={handleConfirmReset}
                className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm shadow-md"
              >
                होय, साफ करा (Reset Form)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
