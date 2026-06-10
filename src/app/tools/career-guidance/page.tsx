"use client";

import { useState } from "react";
import Header from "@/components/header";
import PaymentButton from "@/components/PaymentButton"; // ✅ import the payment component

export default function CareerGuidance() {
  // STEPPER SYSTEM CONTROL
  const [step, setStep] = useState<number>(1);

  // STEP 1: STUDENT PROFILE DATA STATES
  const [name, setName] = useState("");
  const [city, setCity] = useState("Latur");
  const [currentClass, setCurrentClass] = useState("10th");
  const [percentage, setPercentage] = useState("");
  const [favSubject, setFavSubject] = useState("");
  const [budget, setBudget] = useState("Moderate (Local/Pune)");

  // STEP 2: APTITUDE & INTEREST STATES
  const [mathAptitude, setMathAptitude] = useState<number>(3);
  const [healthcareInterest, setHealthcareInterest] = useState<number>(3);
  const [businessMindset, setBusinessMindset] = useState<number>(3);
  const [govtJobPreference, setGovtJobPreference] = useState<number>(3);

  // PREMIUM REPORT UNLOCK STATE
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState<boolean>(false);

  // 🎛️ NAVIGATION HANDLERS
  const handleGoToQuestions = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !percentage) return;
    setStep(2);
  };

  const handleProcessAssessment = () => {
    setStep(3);
  };

  // ✅ This will be called after successful payment
  const handlePaymentSuccess = () => {
    setIsPremiumUnlocked(true);
    // Optionally save to local storage or call an API to mark premium in DB
    localStorage.setItem("career_premium_unlocked", "true");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased print:bg-white">
      <div className="print:hidden">
        <Header />
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* TOP BRANDING HERO HEADER (unchanged) */}
        <div className="text-center max-w-3xl mx-auto mb-10 print:hidden">
          <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2">
            AyushNexa Premium Initiative
          </span>
          <h1 className="font-sans text-3xl font-black tracking-tight sm:text-4xl text-[#0F172A]">
            🧠 FuturePath AI Career Consultant
          </h1>
          <p className="text-[#64748B] text-sm mt-2">
            Tailored scientifically for Maharashtra families to discover high-growth, secure, and budget-friendly career roadmaps.
          </p>
        </div>

        {/* STEP 1: FORM (unchanged) */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm print:hidden">
            <h2 className="text-lg font-bold border-b border-[#E2E8F0] pb-3 text-[#0F172A] mb-5">
              📋 Step 1: Student Profile Context
            </h2>

            <form onSubmit={handleGoToQuestions} className="space-y-4">
              {/* ... all form fields remain exactly the same ... */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Rohan Shinde"
                    className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Latur, Nanded"
                    className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB]"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">
                    Current Education Level *
                  </label>
                  <select
                    className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm bg-white"
                    value={currentClass}
                    onChange={(e) => setCurrentClass(e.target.value)}
                  >
                    <option value="10th">Class 10th Student</option>
                    <option value="12th_Science">Class 12th (Science)</option>
                    <option value="12th_Commerce">Class 12th (Commerce/Arts)</option>
                    <option value="Graduate">Undergraduate College Student</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">
                    Academic Percentage *
                  </label>
                  <input
                    type="number"
                    required
                    placeholder="e.g., 84"
                    className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB]"
                    value={percentage}
                    onChange={(e) => setPercentage(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">
                    Most Favorite Subject
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Mathematics, Biology"
                    className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB]"
                    value={favSubject}
                    onChange={(e) => setFavSubject(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">
                    Annual Education Budget Limit
                  </label>
                  <select
                    className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm bg-white"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="Low">Affordable Govt Colleges (₹20k - ₹50k/Yr)</option>
                    <option value="Moderate (Local/Pune)">
                      Moderate Private/Semi-Govt (₹50k - ₹2 Lakh/Yr)
                    </option>
                    <option value="High">Premium Private Institutions (₹2 Lakh+/Yr)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#2563EB] text-white font-bold text-sm hover:bg-[#2563EB]/90 transition-all shadow mt-4"
              >
                Continue to Psychometric Assessment &rarr;
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: APTITUDE SLIDERS (unchanged) */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm print:hidden space-y-6">
            <div className="border-b border-[#E2E8F0] pb-3">
              <h2 className="text-lg font-bold text-[#0F172A]">
                🧠 Step 2: Mindset & Core Skill Mapping
              </h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Please rank your genuine interest level for each metric from Low (1) to High (5).
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <div className="flex justify-between text-xs font-bold uppercase mb-2">
                  <span>1. Mathematical & Logical Thinking</span>
                  <span className="text-[#2563EB]">{mathAptitude} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-full accent-[#2563EB]"
                  value={mathAptitude}
                  onChange={(e) => setMathAptitude(Number(e.target.value))}
                />
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <div className="flex justify-between text-xs font-bold uppercase mb-2">
                  <span>2. Medical / Healthcare / Helping Patients</span>
                  <span className="text-[#2563EB]">{healthcareInterest} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-full accent-[#2563EB]"
                  value={healthcareInterest}
                  onChange={(e) => setHealthcareInterest(Number(e.target.value))}
                />
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <div className="flex justify-between text-xs font-bold uppercase mb-2">
                  <span>3. Business / Financial Growth / Sales</span>
                  <span className="text-[#2563EB]">{businessMindset} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-full accent-[#2563EB]"
                  value={businessMindset}
                  onChange={(e) => setBusinessMindset(Number(e.target.value))}
                />
              </div>

              <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                <div className="flex justify-between text-xs font-bold uppercase mb-2">
                  <span>4. Government Service Job Stability (MPSC/UPSC/Banking)</span>
                  <span className="text-[#2563EB]">{govtJobPreference} / 5</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  className="w-full accent-[#2563EB]"
                  value={govtJobPreference}
                  onChange={(e) => setGovtJobPreference(Number(e.target.value))}
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleProcessAssessment}
              className="w-full h-11 rounded-xl bg-[#0F172A] text-white font-bold text-sm hover:bg-[#0F172A]/90 transition-all shadow"
            >
              Analyze Future Blueprint &rarr;
            </button>
          </div>
        )}

        {/* STEP 3: REPORT DISPLAY (modified premium button) */}
        {step === 3 && (
          <div className="space-y-8">
            {/* Student profile banner – unchanged */}
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#64748B]">Active Report File</span>
                <h3 className="font-sans text-xl font-bold text-[#0F172A] mt-0.5">
                  Student Profile: {name}
                </h3>
                <div className="text-xs text-[#64748B] mt-1 flex flex-wrap gap-x-4">
                  <span>📍 Origin: {city}</span>
                  <span>📊 Score: {percentage}%</span>
                  <span>💰 Budget: {budget}</span>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="print:hidden h-9 px-4 rounded-lg bg-[#10B981] text-white text-xs font-bold shadow-sm"
              >
                📥 Print Complete Roadmap
              </button>
            </div>

            {/* MAIN RESULTS GRID */}
            <div className="grid gap-8 lg:grid-cols-3 items-start">
              {/* LEFT SIDE: RECOMMENDATIONS (unchanged) */}
              <div className="lg:col-span-2 space-y-6">
                {mathAptitude >= 4 && (
                  <div className="bg-white border-2 border-[#2563EB] rounded-2xl p-6 relative shadow-sm">
                    <span className="absolute top-4 right-4 bg-[#2563EB]/10 text-[#2563EB] font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                      Top Recommendation
                    </span>
                    <h3 className="text-xl font-black text-[#0F172A]">
                      Pathway 1: Computer Science & Data Systems Engineering
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1">
                      Perfect match based on high logical skills and structured problem-solving metrics.
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#E2E8F0] pt-4 text-xs">
                      <div>
                        <span className="text-[#64748B] block">Education Roadmap:</span>
                        <span className="font-bold text-[#0F172A]">12th Sci → B.E./B.Tech (CSE)</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block">Approx Duration & Cost:</span>
                        <span className="font-bold text-[#0F172A]">4 Years | ₹1.5L - ₹3L per Yr</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block">Expected Salary:</span>
                        <span className="font-bold text-[#10B981]">₹5,00,000 - ₹12,00,000 P.A.</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block">AI Threat Risk:</span>
                        <span className="font-bold text-orange-600">Low (Core Creator Role)</span>
                      </div>
                    </div>

                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg text-xs mt-4 text-[#334155]">
                      <strong>📍 Maharashtra Scope:</strong> High placement tracks at Pune, Mumbai, & Aurangabad IT
                      clusters. Excellent local node availability at Latur Engineering colleges.
                    </div>
                  </div>
                )}

                {healthcareInterest >= 4 && (
                  <div className="bg-white border-2 border-[#10B981] rounded-2xl p-6 relative shadow-sm">
                    <span className="absolute top-4 right-4 bg-[#10B981]/10 text-[#10B981] font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                      Top Recommendation
                    </span>
                    <h3 className="text-xl font-black text-[#0F172A]">
                      Pathway 2: Pharmacy (B.Pharm) & Pharmaceutical Research
                    </h3>
                    <p className="text-xs text-[#64748B] mt-1">
                      Matches patient care values without requiring high clinical budget metrics of MBBS.
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#E2E8F0] pt-4 text-xs">
                      <div>
                        <span className="text-[#64748B] block">Education Roadmap:</span>
                        <span className="font-bold text-[#0F172A]">12th Sci → B.Pharm Degree</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block">Approx Duration & Cost:</span>
                        <span className="font-bold text-[#0F172A]">4 Years | ₹80k - ₹1.5L per Yr</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block">Expected Salary:</span>
                        <span className="font-bold text-[#10B981]">₹3,00,000 - ₹6,50,000 P.A.</span>
                      </div>
                      <div>
                        <span className="text-[#64748B] block">AI Threat Risk:</span>
                        <span className="font-bold text-green-600">Minimal (Physical Lab Systems)</span>
                      </div>
                    </div>

                    <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-lg text-xs mt-4 text-[#334155]">
                      <strong>📍 Maharashtra Scope:</strong> Massive manufacturing hubs at Aurangabad, Nashik, & Tarapur.
                      High stable jobs across medical retailers in Marathwada.
                    </div>
                  </div>
                )}

                <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-[#0F172A]">
                    Pathway 3: Applied Commerce & Business Finance Architecture
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Best suited for students aiming to master local corporate frameworks or scale family assets.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[#E2E8F0] pt-4 text-xs">
                    <div>
                      <span className="text-[#64748B] block">Education Roadmap:</span>
                      <span className="font-bold text-[#0F172A]">B.Com/BBA → Applied Financial Analyst</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block">Approx Duration & Cost:</span>
                      <span className="font-bold text-[#0F172A]">3 Years | ₹30k - ₹70k per Yr</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block">Expected Salary:</span>
                      <span className="font-bold text-[#10B981]">₹2,50,000 - ₹5,00,000 P.A.</span>
                    </div>
                    <div>
                      <span className="text-[#64748B] block">AI Threat Risk:</span>
                      <span className="font-bold text-amber-500">Moderate (Requires Skill Updates)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-5 text-xs text-[#991B1B]">
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-2">
                    ⚠️ Potential Regional Mistakes to Avoid:
                  </h4>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>
                      Do not pursue general engineering degrees blindly from sub-standard colleges without solid
                      placement networks.
                    </li>
                    <li>
                      Avoid skipping skill-upgrades assuming a simple graduate certificate ensures financial security
                      in 2026.
                    </li>
                  </ul>
                </div>
              </div>

              {/* PREMIUM SIDEBAR – NOW USING REAL PAYMENT BUTTON */}
              <div className="lg:col-span-1 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md print:hidden space-y-5 h-fit">
                <div className="text-center pb-3 border-b border-[#E2E8F0]">
                  <span className="bg-purple-100 text-purple-700 font-bold text-[9px] px-2 py-0.5 rounded-full uppercase">
                    Indepth Vault
                  </span>
                  <h3 className="text-md font-black text-[#0F172A] mt-2">
                    Unlock 15-Page In-Depth Analytical Dossier
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Get comprehensive SWOT analysis graphs, tailored scholarship matching engines, and curated list of
                    local Maharashtra premium institutes.
                  </p>
                </div>

                {!isPremiumUnlocked ? (
                  <div className="space-y-4">
                    <div className="text-center bg-[#F8FAFC] py-3 rounded-lg border border-[#E2E8F0]">
                      <span className="text-2xl font-black text-[#0F172A] font-sans">₹199</span>
                      <span className="text-xs text-[#64748B] block mt-0.5 font-medium">
                        One-time launching tariff
                      </span>
                    </div>

                    {/* ✅ REPLACED FAKE BUTTON WITH REAL PAYMENT BUTTON */}
                    <PaymentButton
                      productId="career_guidance"
                      amount={199}
                      productName="Career Guidance Premium Report"
                      buttonText="Unlock Premium Blueprint 🔒"
                      onSuccess={handlePaymentSuccess}
                    />
                  </div>
                ) : (
                  <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-xs text-purple-900 space-y-2">
                    <span className="font-bold block text-purple-700">✅ Premium Version Unlocked!</span>
                    <p>
                      Your full psychometric evaluation profile is ready for deep inspection below or in print preview
                      sheets.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* PREMIUM REVEALED DOSSIER (unchanged) */}
            {isPremiumUnlocked && (
              <div className="mt-12 bg-white border border-[#E2E8F0] rounded-2xl p-8 space-y-8 shadow-sm">
                <div className="border-b-2 border-purple-700 pb-3">
                  <h2 className="text-2xl font-black tracking-tight text-[#0F172A]">
                    📊 Extended SWOT & Personality Profile Matrix
                  </h2>
                  <p className="text-xs text-[#64748B] mt-0.5">
                    Advanced premium tracking data compiled exclusively for family evaluation.
                  </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 text-xs">
                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                    <h4 className="font-bold text-[#2563EB] uppercase mb-1">💪 Core Strengths (S)</h4>
                    <p className="text-[#334155] leading-relaxed">
                      High mathematical capability with methodical structural processing. Shows high resilience
                      indicators suitable for technical degrees.
                    </p>
                  </div>
                  <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                    <h4 className="font-bold text-purple-700 uppercase mb-1">
                      🎓 College Selection Blueprint Strategy
                    </h4>
                    <p className="text-[#334155] leading-relaxed">
                      Targeting COEP Pune, VJTI Mumbai, or Top-tier engineering hubs in Marathwada region like COET
                      Latur to optimize educational budgets with premium ROI packages.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-900 text-white p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-sm">🤝 Need direct one-on-one personal counseling call?</h4>
                    <p className="text-xs text-purple-200 mt-0.5">
                      Connect directly with AyushNexa certified institutional experts.
                    </p>
                  </div>
                  <a
                    href="https://wa.me/91XXXXXXXXXX"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-9 px-4 bg-white text-purple-900 text-xs font-bold rounded-lg flex items-center justify-center whitespace-nowrap"
                  >
                    Book Counselor Session
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}