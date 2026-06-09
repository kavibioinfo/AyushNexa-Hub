'use client';

import React, { useState } from 'react';

export interface PlanConfig {
  id: string;
  name: string;
  marathiName: string;
  price: number;
  originalPrice: number;
  recommended: boolean;
  features: string[];
  featuresEnglish: string[];
  razorpayButtonId?: string; // Modular hooks to host payment portal buttons
  paymentLinkUrl: string; // Direct links to pre-configured Razorpay payment buttons
}

export const BIODATA_PLANS: PlanConfig[] = [
  {
    id: 'basic-plan',
    name: 'Basic Plan',
    marathiName: 'बेसिक प्लॅन - ३ थीम्स',
    price: 51,
    originalPrice: 151,
    recommended: false,
    features: [
      '३ उत्कृष्ट डिझायनर थीम्स',
      'प्रिंटेबल A4 PDF डाऊनलोड',
      'लाईव्ह एडिटिंग व प्रीव्ह्यू',
      'लाईफटाईम ड्राफ्ट सेव्ह (ब्राउझर)',
    ],
    featuresEnglish: [
      '3 Elegant themes',
      'Printable A4 PDF Download',
      'Live editing & pre-rendering',
      'Lifetime draft save (local)',
    ],
    paymentLinkUrl: 'https://rzp.io/l/vivah-basic-51',
  },
  {
    id: 'premium-plan',
    name: 'Premium Plan',
    marathiName: 'प्रीमियम प्लॅन - १० थीम्स (शिफारस)',
    price: 151,
    originalPrice: 499,
    recommended: true,
    features: [
      'सर्व १० प्रीमियम थीमचा सुवर्ण प्रवेश',
      'A4 PDF, JPG आणि PNG डाऊनलोड',
      'संपर्क माहितीसह स्कॅन करण्यायोग्य QR कोड',
      'प्रिमियम फॉन्ट्स व बॉर्डर डिझाईन्स',
      'तात्काळ ईमेल डिलिव्हरी',
    ],
    featuresEnglish: [
      'Access to all 10 premium themes',
      'Download as PDF, JPG & PNG',
      'Scannable contact details QR code',
      'Premium fonts and decorative frames',
      'Instant delivery on email',
    ],
    paymentLinkUrl: 'https://rzp.io/l/vivah-premium-151',
  },
  {
    id: 'family-plan',
    name: 'Family Plan',
    marathiName: 'फॅमिली पॅक - अमर्यादित बायोडाटा',
    price: 251,
    originalPrice: 799,
    recommended: false,
    features: [
      'अमर्यादित बायोडाटा निर्मिती',
      'सर्व चालू व नवीन येणारे डिझाइन्स',
      'प्रीमियम डाऊनलोड क्वालिटी',
      '२४/७ प्राधान्य मराठी ग्राहक सपोर्ट',
      'भावी सुधारणा व अपडेट्स मोफत',
    ],
    featuresEnglish: [
      'Unlimited Biodata generation',
      'All present & upcoming themes',
      'Highest density downloads',
      'Priority 24/7 vernacular support',
      'Future updates and additions free',
    ],
    paymentLinkUrl: 'https://rzp.io/l/vivah-family-251',
  },
];

interface PricingShowcaseProps {
  onPlanSelect?: (plan: PlanConfig) => void;
}

export const PricingShowcase: React.FC<PricingShowcaseProps> = ({ onPlanSelect }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium-plan');

  const handleCheckoutRedirect = (plan: PlanConfig) => {
    if (onPlanSelect) {
      onPlanSelect(plan);
      return;
    }
    // Default checkout router to external modular razorpay buttons
    console.log(`Initiating checkout routing for plan: ${plan.name} at price: ₹${plan.price}`);
    alert(
      `Razorpay Payment Simulator:\n` +
      `---------------------------------\n` +
      `योजना: ${plan.marathiName}\n` +
      `किंमत: ₹${plan.price}\n\n` +
      `हे बटण पुढील Razorpay गेटवेवर निर्देशित करेल:\n` +
      `${plan.paymentLinkUrl}\n\n` +
      `या साखळीद्वारे आपण विवाह पत्रिकेचे सर्व प्रगत पर्याय अनलॉक करू शकता!`
    );
    window.open(plan.paymentLinkUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="py-12 px-2 max-w-6xl mx-auto" id="pricing-showcase-section">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="bg-amber-100 text-amber-900 border border-amber-200 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider">
          💎 परवडणारी आणि पारदर्शक किंमत
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">
          तुमच्या आवडीची योजना निवडा (Choose Plan)
        </h2>
        <p className="text-sm sm:text-base text-slate-500 mt-2 font-serif">
          ना नफा ना तोटा तत्त्वावर कमीत कमी दरात, आकर्षक बायोडाटा डाऊनलोड करा.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {BIODATA_PLANS.map((plan) => {
          const discountPercent = Math.round(((plan.originalPrice - plan.price) / plan.originalPrice) * 100);
          return (
            <div
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                plan.recommended
                  ? 'bg-gradient-to-b from-amber-50 to-amber-100/10 border-2 border-amber-600 shadow-xl scale-[1.03] md:scale-[1.05]'
                  : selectedPlan === plan.id
                  ? 'bg-zinc-50 border-2 border-slate-900 shadow-md'
                  : 'bg-white border border-zinc-200 hover:shadow-lg'
              }`}
            >
              {/* Premium Badge */}
              {plan.recommended && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-600 text-white font-bold text-xs tracking-wider uppercase px-4 py-1.5 rounded-full shadow-lg">
                  👑 सर्वाधिक लोकप्रिय (Recommended)
                </span>
              )}

              <div>
                {/* Title */}
                <div className="mb-4">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900">{plan.marathiName}</h3>
                  <p className="text-xs text-slate-400 font-mono italic mt-1 font-semibold">{plan.name}</p>
                </div>

                {/* Price tag */}
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">₹{plan.price}</span>
                  <span className="text-sm font-medium text-slate-400 line-through">₹{plan.originalPrice}</span>
                  <span className="bg-amber-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
                    {discountPercent}% OFF
                  </span>
                </div>

                {/* Features divider */}
                <span className="block border-t border-dashed border-zinc-200 my-4" />

                {/* Features list */}
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="text-emerald-600 bg-emerald-50 rounded-full p-0.5 shrink-0">
                        ✓
                      </span>
                      <div>
                        <span className="font-semibold block text-slate-800 leading-tight">{feature}</span>
                        <span className="text-[10px] text-slate-400 font-mono tracking-tight">
                          ({plan.featuresEnglish[i]})
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCheckoutRedirect(plan);
                }}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 ${
                  plan.recommended
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                }`}
              >
                योजना निवडा आणि अनलॉक करा (Unlock Plan)
              </button>
            </div>
          );
        })}
      </div>

      {/* Trust factors credit */}
      <p className="text-center text-xs text-zinc-400 font-mono mt-8">
        🔒 व्यवहार सुरक्षितता Razorpay द्वारा हाताळली जाते.
      </p>
    </div>
  );
};
