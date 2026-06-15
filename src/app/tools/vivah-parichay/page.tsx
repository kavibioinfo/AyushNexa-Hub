'use client';
/* eslint-disable react-hooks/set-state-in-effect */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBiodata } from '@/hooks/useBiodata';
import { PREMIUM_THEMES } from '@/components/vivah-parichay/themes';
import RazorpayButton from "@/components/RazorpayButton";
import { safeStorage } from '@/lib/safeStorage';
import { motion } from 'motion/react';
import {
  Heart,
  FileText,
  Palette,
  Download,
  Image as ImageIcon,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Languages,
  RotateCcw,
  X,
  Crown,
} from 'lucide-react';

export default function VivahParichayLandingPage() {
  const { state, resetToDefault } = useBiodata();
  const [hasDraft, setHasDraft] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number>(101); // default middle plan

  useEffect(() => {
    const saved = safeStorage.getItem('vivah_parichay_biodata');
    setHasDraft(!!saved);
    const premiumStatus = localStorage.getItem('vivah_premium_unlocked');
    const storedPlan = localStorage.getItem('vivah_purchased_plan');
    if (premiumStatus === 'true') setIsPremiumUnlocked(true);
  }, []);

  const [activeThemeShowcase, setActiveThemeShowcase] = useState(PREMIUM_THEMES[0].id);

  // FAQ accordion state
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      q: 'बायोडाटा बनवल्यानंतर तो मोबाईलवर कसा दिसेल?',
      a: 'आम्ही बनवलेला प्रत्येक लेआउट पूर्णपणे रिस्पॉन्सिव्ह आहे. बायोडाटा मोबाईलवर वाचताना अतिशय आकर्षक दिसतो आणि तो पीडीएफ किंवा इमेजेसच्या स्वरुपात व्हाट्सॲपवर सहज शेअर करता येतो.',
    },
    {
      q: 'माझा बायोडाटा सुरक्षित आहे का?',
      a: 'होय, तुमची सर्व माहिती पूर्णपणे सुरक्षित आहे. तुमची माहिती थेट तुमच्या ब्राउझरमध्ये (localStorage) जतन केली जाते आणि आम्ही कोणतीही संवेदनशील वैयक्तिक माहिती चुकीच्या पद्धतीने साठवत नाही.',
    },
    {
      q: 'मला एकापेक्षा जास्त थीम्स बदलता येतील का?',
      a: 'होय, पेमेंट केल्यानंतर तुम्ही सर्व १० प्रीमियम थीम्स मध्ये तात्काळ बदल करू शकता. तुम्हाला हवी ती थीम निवडून एका क्लिकवर अपडेटेड डिझाईन डाऊनलोड करता येईल.',
    },
    {
      q: 'बायोडाटा मराठी आणि इंग्रजी अशा दोन्ही भाषांमध्ये टाईप करता येतो का?',
      a: 'होय, युझर कोणत्याही भाषेत टाईप करू शकतात. फॉर्ममध्ये सोयीसाठी मराठी लेबलसोबत इंग्रजी नावाचे संकेत दिले आहेत, ज्यामुळे माहिती भरणे सोपे जाते.',
    },
    {
      q: 'पेमेंट संदर्भात काही अडचण आल्यास कोणाशी संपर्क साधावा?',
      a: 'काही अडचण आल्यास तुम्ही २४/७ आमच्या AyushNexa हेल्प डेस्कवर संपर्क साधू शकता. आम्हाला kavibioinfo@gmail.com या ईमेलवर तुमची अडचण कळवू शकता.',
    },
  ];

  const handlePaymentSuccess = (amount: number) => {
    setIsPremiumUnlocked(true);
    localStorage.setItem('vivah_premium_unlocked', 'true');
    localStorage.setItem('vivah_purchased_plan', amount.toString());
    setShowPremiumModal(false);
  };

  // Different price plans
  const pricePlans = [
    { amount: 51, label: 'Basic Biodata', description: '1 Template (PDF format)' },
    { amount: 101, label: 'Premium Biodata', description: '3 Premium Templates' },
    { amount: 151, label: 'Pro Biodata', description: 'All 10 Templates + Support' },
  ];

  return (
    <div className="relative overflow-hidden font-sans bg-slate-50 min-h-screen">
      {/* Background radial soft lights */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 border-b border-slate-200 px-3 sm:px-4 py-2.5 sm:py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <Link href="/tools/vivah-parichay" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
            <div>
              <h1 className="font-extrabold text-sm sm:text-base text-slate-800 tracking-tight leading-none">
                AyushNexa <span className="text-amber-600">Hub</span>
              </h1>
              <span className="text-[8px] sm:text-[9px] font-mono font-medium text-slate-400 uppercase tracking-widest block mt-0.5">
                विवाह परिचय पत्रिका
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-500">
            <a href="#features-section" className="hover:text-amber-600 transition-colors">वैशिष्ट्ये</a>
            <a href="#themes-section" className="hover:text-amber-600 transition-colors">थीम्स दालन</a>
            <a href="#pricing-section" className="hover:text-amber-600 transition-colors">किंमती</a>
            <a href="#faq-section" className="hover:text-amber-600 transition-colors">प्रश्नोत्तरे</a>
          </nav>

          <div className="flex items-center gap-2">
            {!isPremiumUnlocked && (
              <button
                onClick={() => setShowPremiumModal(true)}
                className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full"
              >
                <Crown className="w-3 h-3" /> Unlock Premium
              </button>
            )}
            <Link
              href="/tools/vivah-parichay/form"
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-semibold rounded-full hover:shadow transition-colors px-4 py-2 sm:px-5 sm:py-2.5 whitespace-nowrap"
            >
              सुरू करा
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-10 pb-16 sm:pt-12 sm:pb-20 px-4 max-w-7xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5 sm:space-y-6"
        >
          <span className="inline-flex items-center gap-1.5 bg-amber-50 border border-amber-100/60 text-amber-700 text-[11px] sm:text-xs px-3 py-1.5 rounded-full font-bold uppercase tracking-wider mx-auto">
            <Heart className="w-3 h-3 text-amber-600 animate-pulse fill-amber-600" /> महाराष्ट्र क्र. १ विवाह बायोडाटा मेकर
          </span>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15] sm:leading-[1.1] max-w-4xl mx-auto text-slate-900">
            विवाह परिचय <br />
            <span className="text-amber-600 font-serif italic text-2xl sm:text-4xl md:text-5xl">Vivah Parichay</span>
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-700 tracking-wide mt-1">
            फक्त माहिती भरा आणि काही क्षणांत सुंदर, प्रिंटेबल विवाह बायोडाटा तयार करा.
          </p>

          <p className="text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed px-2">
            आकर्षक पारंपरिक आणि आधुनिक डिझाईन्स, उच्च दर्जाचे PDF डाऊनलोड्स, फोटो कस्टमायझेशन आणि सुलभ मराठी-इंग्रजी मांडणीसह व्यावसायिक विवाह बायोडाटा अवघ्या ५ मिनिटांत तयार करा.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-4">
            <Link
              href="/tools/vivah-parichay/form"
              className="w-full sm:w-auto py-3.5 sm:py-4 px-6 sm:px-8 bg-amber-600 text-white rounded-xl font-bold text-base sm:text-lg shadow-lg shadow-amber-200/50 hover:scale-[1.02] hover:bg-amber-700 transition-all flex items-center justify-center gap-2"
            >
              <span>नवीन बायोडाटा बनवा</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            {hasDraft && (
              <Link
                href="/tools/vivah-parichay/form"
                className="w-full sm:w-auto bg-white hover:bg-zinc-50 border-2 border-slate-900 text-slate-900 font-bold text-sm sm:text-base py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4 text-amber-600" />
                <span>अपूर्ण ड्राफ्ट चालवा</span>
              </Link>
            )}
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] sm:text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> सुरक्षित लोकल साठवणूक
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Languages className="w-3.5 h-3.5 text-emerald-600" /> द्विभाषिक (Marathi / English)
            </span>
          </div>
        </motion.div>
      </section>

      {/* Multi-step Workflow */}
      <section className="bg-gradient-to-b from-white to-slate-50 py-12 sm:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-950">
              अवघ्या तीन सोप्या पाऱ्यांत डाऊनलोड करा (Process)
            </h2>
            <p className="text-sm text-slate-550 mt-2 font-serif">
              बायोडाटा बनवणे झाले आता अतिशय सोपे आणि जलद.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200/60 shadow-sm relative text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-slate-100 text-slate-850 font-bold text-base sm:text-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">१</div>
              <h4 className="font-bold text-base sm:text-lg text-slate-900">माहिती भरा (Fill Details)</h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">वैयक्तिक माहिती, जन्म, कुंडली, शिक्षण, नोकरी/व्यवसाय, आणि कौटुंबिक पार्श्वभूमी सोप्या टप्प्यात भरा.</p>
            </div>
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200/60 shadow-sm relative text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-amber-100 text-amber-800 font-bold text-base sm:text-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">२</div>
              <h4 className="font-bold text-base sm:text-lg text-slate-900">थीम निवडा (Choose Theme)</h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">आमच्या १०+ आकर्षक पारंपरिक व आधुनिक थीम्स पैकी तुमच्या आवडीची डिझाईन एका क्लिकवर निवडा.</p>
            </div>
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-zinc-200/60 shadow-sm relative text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-emerald-100 text-emerald-800 font-bold text-base sm:text-lg flex items-center justify-center mx-auto mb-3 sm:mb-4">३</div>
              <h4 className="font-bold text-base sm:text-lg text-slate-900">डाऊनलोड करा (Download)</h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-2">प्रिंटेबल हाय-रिझोल्यूशन PDF किंवा उत्कृष्ट इमेजेस (JPG/PNG) स्वरूपात डाऊनलोड करा व शेअर करा.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grids */}
      <section id="features-section" className="py-16 sm:py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="bg-slate-100 text-slate-800 text-[11px] sm:text-xs px-3 py-1 rounded-full font-bold">प्रीमियम युटिलिटी वैशिष्ट्ये</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2">विविध प्रगत फीचर्स जे लग्नपत्रिका सुंदर बनवतील</h2>
          <p className="text-sm text-slate-500 font-serif mt-1">AyushNexa Hub चे मूळ आणि सर्वात दर्जेदार सुप्रसिद्ध साधन.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <div className="p-5 sm:p-6 bg-white rounded-2xl border border-zinc-200/60 shadow-sm hover:shadow-md transition-shadow">
            <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-red-700 mb-3" />
            <h4 className="font-bold text-sm sm:text-base text-slate-900">१० प्रीमियम थीम्स</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">पारंपारिक मराठा, सुवर्ण शाही, आधुनिक बेज, वेडिंग फ्लोरल अशा विविध १० आकर्षक शैलींमधून निवडा.</p>
          </div>
          <div className="p-5 sm:p-6 bg-white rounded-2xl border border-zinc-200/60 shadow-sm hover:shadow-md transition-shadow">
            <Palette className="w-7 h-7 sm:w-8 sm:h-8 text-amber-700 mb-3" />
            <h4 className="font-bold text-sm sm:text-base text-slate-900">न झिझकता बदला</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">माहिती संपादित करताना बदल रियल-टाईम स्क्रीनवर एका बाजूला दिसतात. रीफ्रेश करण्याची गरज नाही.</p>
          </div>
          <div className="p-5 sm:p-6 bg-white rounded-2xl border border-zinc-200/60 shadow-sm hover:shadow-md transition-shadow">
            <Download className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-700 mb-3" />
            <h4 className="font-bold text-sm sm:text-base text-slate-900">हाय-रिझोल्यूशन PDF</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">प्रिंटींगसाठी योग्य, अचूक मार्जिनसह व न कट होता डाऊनलोड होणारे उत्कृष्ट A4 आकारातील पीडीएफ.</p>
          </div>
          <div className="p-5 sm:p-6 bg-white rounded-2xl border border-zinc-200/60 shadow-sm hover:shadow-md transition-shadow">
            <ImageIcon className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-700 mb-3" />
            <h4 className="font-bold text-sm sm:text-base text-slate-900">फोटो क्रॉप व अ‍ॅडजस्ट</h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">फोटो ड्रॅग व ड्रॉप करून, अचूक १८00 x २०00 आस्पेक्ट रेशो नुसार सुंदर पद्धतीने समाविष्ट करा.</p>
          </div>
        </div>
      </section>

      {/* Theme Showcases Deck */}
      <section id="themes-section" className="bg-slate-100/50 py-16 sm:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="bg-amber-50 text-amber-800 border border-amber-200/60 text-[11px] sm:text-xs px-3 py-1 rounded-full font-bold">थीम्स दालन (Glimpse)</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2">आमच्या विविध उत्कृष्ट थीम्स</h2>
            <p className="text-sm text-slate-500 mt-2 font-serif">पारंपरिक मराठी संस्कृती आणि आधुनिक डिझाईन्सचा अप्रतिम संगम.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
            {PREMIUM_THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveThemeShowcase(t.id)}
                className={`py-1.5 px-3 sm:py-2 sm:px-4 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 ${
                  activeThemeShowcase === t.id
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-white hover:bg-zinc-100/50 text-slate-700 border border-zinc-200'
                }`}
              >
                {t.marathiName} ({t.name})
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-12 border border-zinc-200 max-w-3xl mx-auto shadow-xl text-center">
            {(() => {
              const themeObj = PREMIUM_THEMES.find((t) => t.id === activeThemeShowcase)!;
              return (
                <div className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border-4 ${themeObj.cardClass} relative overflow-hidden`}>
                  <div className="absolute inset-1 sm:inset-2 border border-dashed border-red-852/40 pointer-events-none" />
                  <div className={`${themeObj.textPrimaryClass} space-y-3 font-serif`}>
                    <div className="text-2xl sm:text-3xl">🌸</div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight">|| विवाह बायोडाटा ||</h3>
                    <p className={`text-[10px] sm:text-xs ${themeObj.textSecondaryClass} uppercase`}>
                      प्रिव्ह्यू थीम: <span className="font-bold underline">{themeObj.marathiName}</span>
                    </p>
                    <div className="border-t border-dashed border-zinc-250/50 my-2 sm:my-3" />
                    <div className="space-y-1.5 sm:space-y-2 text-left max-w-sm mx-auto text-xs sm:text-sm">
                      <div className="flex flex-wrap justify-between border-b pb-1 gap-2">
                        <span className="font-semibold">नाव</span>
                        <span>राहुल आनंदराव गायकवाड</span>
                      </div>
                      <div className="flex flex-wrap justify-between border-b pb-1 gap-2">
                        <span className="font-semibold">शिक्षण</span>
                        <span>बी.ई. कॉम्प्युटर सायन्स</span>
                      </div>
                      <div className="flex flex-wrap justify-between border-b pb-1 gap-2">
                        <span className="font-semibold">व्यवसाय</span>
                        <span>सॉफ्टवेअर इंजिनिअर (TCS, पुणे)</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="mt-6 sm:mt-8">
              <Link
                href="/tools/vivah-parichay/form"
                className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm sm:text-base py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl shadow-md transition-all"
              >
                <span>या थीममध्ये बनवून पहा</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section with Payment Buttons */}
      <section id="pricing-section" className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="bg-amber-100 text-amber-800 text-[11px] sm:text-xs px-3 py-1 rounded-full font-bold">निवडा तुमचा प्लॅन</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mt-2">तुमच्या गरजेनुसार प्रीमियम प्लॅन</h2>
            <p className="text-sm text-slate-500 mt-2">एकदाच पेमेंट, आयुष्यभर वापरा सर्व प्रीमियम थीम्स आणि फीचर्स.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {pricePlans.map((plan) => (
              <div key={plan.amount} className="bg-slate-50 rounded-2xl border border-slate-200 p-6 text-center hover:shadow-lg transition">
                <div className="text-3xl font-black text-slate-900">₹{plan.amount}</div>
                <h3 className="text-lg font-bold mt-2">{plan.label}</h3>
                <p className="text-xs text-slate-500 mt-1">{plan.description}</p>
                <div className="mt-6">
                  <RazorpayButton
                    productId={`vivah_biodata_${plan.amount}`}
                    amount={plan.amount}
                    productName={`Vivah Biodata - ${plan.label}`}
                    label={`Pay ₹${plan.amount} & Unlock`}
                    onSuccess={() => handlePaymentSuccess(plan.amount)}
                  />
                </div>
              </div>
            ))}
          </div>

          {isPremiumUnlocked && (
            <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
              <CheckCircle className="w-5 h-5 text-emerald-600 inline mr-2" />
              <span className="text-emerald-800 font-bold">प्रीमियम अनलॉक झाले! तुम्ही आता सर्व थीम्स आणि डाउनलोड वैशिष्ट्ये वापरू शकता.</span>
            </div>
          )}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className="bg-white py-16 sm:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <span className="bg-amber-100 text-amber-900 text-[11px] sm:text-xs px-3 py-1 rounded-full font-bold">मदत आणि उत्तरे (FAQ)</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-950 mt-2">नेहमी विचारले जाणारे प्रश्न</h2>
            <p className="text-sm text-slate-500 mt-2 font-serif">बायोडाटा निर्मिती संदर्भातील शंकांचे निरसन.</p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFAQ === index;
              return (
                <div key={index} className="border border-zinc-200 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300">
                  <button
                    type="button"
                    onClick={() => setOpenFAQ(isOpen ? null : index)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 bg-zinc-50 hover:bg-zinc-100/50 text-left transition-colors duration-200"
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
                      {faq.q}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-500 ml-2">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 bg-white border-t border-zinc-150 text-xs sm:text-sm text-slate-650 leading-relaxed font-sans">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-slate-900 text-white py-12 sm:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight">आजच तुमच्या कुटुंबासाठी सुंदर बायोडाटा तयार करा!</h2>
          <p className="text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed px-2">सुरक्षित, सुटसुटीत, आणि उच्च दर्जाच्या फॉन्टसह मिळणारा सर्वोत्कृष्ट विवाह परिचय बायोडाटा अवघ्या काही मिनिटांत तयार होईल.</p>
          <div className="pt-2">
            <Link
              href="/tools/vivah-parichay/form"
              className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm sm:text-base py-3.5 sm:py-4 px-8 sm:px-10 rounded-xl shadow-lg hover:scale-[1.02] transition-all inline-flex items-center gap-2"
            >
              <span>बायोडाटा बनवणे सुरू करा</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
          <p className="text-[9px] sm:text-[10px] text-slate-500 font-mono">AyushNexa Hub • © 2026 Vivah Parichay Patrika Generator. All rights reserved.</p>
        </div>
      </section>

      {/* Premium Modal */}
      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Crown className="w-5 h-5 text-amber-500" /> Premium Access
              </h3>
              <button onClick={() => setShowPremiumModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-sm text-slate-600 mb-4">Choose your plan and unlock premium themes, high‑resolution PDF downloads, and advanced customization.</p>

            <div className="space-y-3">
              {pricePlans.map((plan) => (
                <label
                  key={plan.amount}
                  className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer transition ${
                    selectedPrice === plan.amount ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="pricePlan"
                      value={plan.amount}
                      checked={selectedPrice === plan.amount}
                      onChange={() => setSelectedPrice(plan.amount)}
                      className="w-4 h-4 text-amber-600"
                    />
                    <div>
                      <div className="font-semibold text-slate-800">{plan.label}</div>
                      <div className="text-xs text-slate-500">{plan.description}</div>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-amber-600">₹{plan.amount}</div>
                </label>
              ))}
            </div>

            <div className="mt-6">
              <RazorpayButton
                productId={`vivah_biodata_${selectedPrice}`}
                amount={selectedPrice}
                productName={`Vivah Biodata (₹${selectedPrice} plan)`}
                label={`Pay ₹${selectedPrice} & Unlock Now`}
                onSuccess={() => handlePaymentSuccess(selectedPrice)}
                userEmail={""}
                userName={""}
                userPhone={""}
                userCity={""}
              />
            </div>

            <p className="text-[10px] text-slate-400 text-center mt-4">Secure payment via Razorpay. One‑time payment, lifetime access.</p>
          </div>
        </div>
      )}
    </div>
  );
}