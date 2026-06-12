"use client";

import { useState } from "react";
import Header from "@/components/header";
import RazorpayButton from "@/components/RazorpayButton";
import { CheckCircle, Sparkles, Download, ChevronRight, ChevronLeft } from "lucide-react";

// ---------- Helper: html2pdf dynamic import ----------
async function generatePDF(elementId: string, filename: string) {
  const html2pdf = (await import("html2pdf.js")).default;
  const element = document.getElementById(elementId);
  if (!element) return;
  
  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5] as const,          // tuple literal
    filename: filename,
    image: { type: "jpeg" as const, quality: 0.98 }, // literal type
    html2canvas: { scale: 2, letterRendering: true, useCORS: true },
    jsPDF: { unit: "in" as const, format: "a4" as const, orientation: "portrait" as const },
  };
  
  await html2pdf().set(opt).from(element).save();
}


export default function CareerGuidance() {
  // ---------- Step control ----------
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // ---------- Student Profile ----------
  const [name, setName] = useState("");
  const [city, setCity] = useState("Latur");
  const [currentClass, setCurrentClass] = useState("10th");
  const [percentage, setPercentage] = useState("");
  const [favSubject, setFavSubject] = useState("");
  const [budget, setBudget] = useState("Moderate (Local/Pune)");

  // ---------- Aptitude (1-5) ----------
  const [mathAptitude, setMathAptitude] = useState(3);
  const [healthcareInterest, setHealthcareInterest] = useState(3);
  const [businessMindset, setBusinessMindset] = useState(3);
  const [govtJobPreference, setGovtJobPreference] = useState(3);

  // ---------- Payment & Premium ----------
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [generating, setGenerating] = useState(false);

  // ---------- Navigation ----------
  const goToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !percentage) return;
    setStep(2);
  };

  const goToStep3 = () => setStep(3);

  const handlePaymentSuccess = () => {
    setIsPremiumUnlocked(true);
    setShowPaywall(false);
  };

  // ---------- Generate SWOT PDF (personalised) ----------
  const handleDownloadPDF = async () => {
    setGenerating(true);
    // Wait a moment for any DOM updates
    await new Promise((r) => setTimeout(r, 100));
    await generatePDF("swot-report-content", `SWOT_${name || "Student"}_CareerReport.pdf`);
    setGenerating(false);
  };

  // ---------- Basic free recommendations (shown in step 3) ----------
  const getRecommendations = () => {
    const recs: { title: string; desc: string; icon: string }[] = [];
    if (mathAptitude >= 4)
      recs.push({
        title: "Computer Science & Data Engineering",
        desc: "Ideal for students with strong logical thinking. B.E./B.Tech in CSE/IT leads to high‑paying IT jobs in Pune, Mumbai.",
        icon: "💻",
      });
    if (healthcareInterest >= 4)
      recs.push({
        title: "Pharmacy (B.Pharm) & Healthcare",
        desc: "Perfect for those interested in patient care. Stable career with opportunities in pharmaceutical companies and clinics.",
        icon: "💊",
      });
    if (businessMindset >= 4)
      recs.push({
        title: "Commerce & Business Management",
        desc: "Ideal for future entrepreneurs. B.Com, BBA, or MBA opens doors to corporate roles and family business growth.",
        icon: "📊",
      });
    if (govtJobPreference >= 4)
      recs.push({
        title: "Government Services (MPSC / UPSC / Banking)",
        desc: "Suitable for students seeking job security. Start preparation early with a focus on current affairs and aptitude.",
        icon: "🏛️",
      });
    if (recs.length === 0) {
      recs.push({
        title: "Explore & Discover",
        desc: "Based on your inputs, we recommend exploring a mix of technical and soft skills. Consider a broad undergraduate degree.",
        icon: "🔍",
      });
    }
    return recs;
  };

  const recommendations = getRecommendations();

  // ---------- Render ----------
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased pb-12">
      <div className="print:hidden">
        <Header />
      </div>

      <main className="max-w-5xl mx-auto px-6 py-10">
        {/* Top Branding */}
        <div className="text-center max-w-3xl mx-auto mb-10 print:hidden">
          <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2">
            AyushNexa Premium Initiative
          </span>
          <h1 className="font-sans text-3xl font-black tracking-tight sm:text-4xl text-[#0F172A]">
            🧠 FuturePath AI Career Consultant
          </h1>
          <p className="text-[#64748B] text-sm mt-2">
            Tailored for Maharashtra families – discover high‑growth, secure, and budget‑friendly career roadmaps.
          </p>
        </div>

        {/* ========== STEP 1: PROFILE ========== */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm print:hidden">
            <h2 className="text-lg font-bold border-b border-[#E2E8F0] pb-3 text-[#0F172A] mb-5">
              📋 Step 1: Student Profile Context
            </h2>
            <form onSubmit={goToStep2} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">Student Full Name *</label>
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
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">City / Town *</label>
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
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">Current Education Level *</label>
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
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">Academic Percentage *</label>
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
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">Most Favorite Subject</label>
                  <input
                    type="text"
                    placeholder="e.g., Mathematics, Biology"
                    className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB]"
                    value={favSubject}
                    onChange={(e) => setFavSubject(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">Annual Education Budget Limit</label>
                  <select
                    className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm bg-white"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  >
                    <option value="Low">Affordable Govt Colleges (₹20k - ₹50k/Yr)</option>
                    <option value="Moderate (Local/Pune)">Moderate Private/Semi-Govt (₹50k - ₹2 Lakh/Yr)</option>
                    <option value="High">Premium Private Institutions (₹2 Lakh+/Yr)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-[#2563EB] text-white font-bold text-sm hover:bg-[#2563EB]/90 transition-all shadow mt-4"
              >
                Continue to Psychometric Assessment →
              </button>
            </form>
          </div>
        )}

        {/* ========== STEP 2: APTITUDE ========== */}
        {step === 2 && (
          <div className="max-w-2xl mx-auto bg-white border border-[#E2E8F0] rounded-2xl p-8 shadow-sm print:hidden space-y-6">
            <div className="border-b border-[#E2E8F0] pb-3">
              <h2 className="text-lg font-bold text-[#0F172A]">🧠 Step 2: Mindset & Core Skill Mapping</h2>
              <p className="text-xs text-[#64748B] mt-0.5">
                Please rank your genuine interest level for each metric from Low (1) to High (5).
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: "1. Mathematical & Logical Thinking", value: mathAptitude, setter: setMathAptitude },
                { label: "2. Medical / Healthcare / Helping Patients", value: healthcareInterest, setter: setHealthcareInterest },
                { label: "3. Business / Financial Growth / Sales", value: businessMindset, setter: setBusinessMindset },
                { label: "4. Government Service Job Stability (MPSC/UPSC/Banking)", value: govtJobPreference, setter: setGovtJobPreference },
              ].map((item) => (
                <div key={item.label} className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                  <div className="flex justify-between text-xs font-bold uppercase mb-2">
                    <span>{item.label}</span>
                    <span className="text-[#2563EB]">{item.value} / 5</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    className="w-full accent-[#2563EB]"
                    value={item.value}
                    onChange={(e) => item.setter(Number(e.target.value))}
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={goToStep3}
              className="w-full h-11 rounded-xl bg-[#0F172A] text-white font-bold text-sm hover:bg-[#0F172A]/90 transition-all shadow"
            >
              Analyze Future Blueprint →
            </button>
          </div>
        )}

        {/* ========== STEP 3: RESULTS & PREMIUM DASHBOARD ========== */}
        {step === 3 && (
          <div className="space-y-8">
            {/* Student summary banner */}
            <div className="bg-white border border-[#E2E8F0] p-6 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#64748B]">Active Report File</span>
                <h3 className="font-sans text-xl font-bold text-[#0F172A] mt-0.5">Student Profile: {name || "Student"}</h3>
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
                📥 Print Summary
              </button>
            </div>

            {/* Main recommendations grid */}
            <div className="grid gap-8 lg:grid-cols-3 items-start">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-md font-bold text-[#2563EB]">✨ Free Career Pathways (Based on your aptitude)</h3>
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-white border-2 border-[#E2E8F0] rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{rec.icon}</span>
                      <h4 className="text-lg font-bold text-[#0F172A]">{rec.title}</h4>
                    </div>
                    <p className="text-sm text-[#64748B]">{rec.desc}</p>
                  </div>
                ))}
                <div className="bg-[#FEF2F2] border border-[#FEE2E2] rounded-xl p-5 text-xs text-[#991B1B]">
                  <h4 className="font-bold text-sm uppercase tracking-wide mb-2">⚠️ Potential Regional Mistakes to Avoid:</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    <li>Do not blindly pursue general engineering degrees from low‑placement colleges.</li>
                    <li>Avoid skipping skill‑upgrades – a simple graduate certificate is not enough in 2026.</li>
                  </ul>
                </div>
              </div>

              {/* Premium panel (upsell or download) */}
              <div className="lg:col-span-1 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-md print:hidden space-y-5 h-fit">
                <div className="text-center pb-3 border-b border-[#E2E8F0]">
                  <span className="bg-purple-100 text-purple-700 font-bold text-[9px] px-2 py-0.5 rounded-full uppercase">
                    In‑depth Vault
                  </span>
                  <h3 className="text-md font-black text-[#0F172A] mt-2">Unlock 15‑Page Analytical Dossier</h3>
                  <p className="text-xs text-[#64748B] mt-1">
                    Get personalised SWOT analysis, scholarship matching, and top Maharashtra institute recommendations.
                  </p>
                </div>

                {!isPremiumUnlocked ? (
                  <div className="space-y-4">
                    <div className="text-center bg-[#F8FAFC] py-3 rounded-lg border border-[#E2E8F0]">
                      <span className="text-2xl font-black text-[#0F172A] font-sans">₹199</span>
                      <span className="text-xs text-[#64748B] block mt-0.5 font-medium">One‑time launch price</span>
                    </div>
                    <RazorpayButton
                      productId="career_guidance"
                      amount={199}
                      productName="Career Guidance Premium Report"
                      label="Unlock Premium Blueprint 🔒"
                      onSuccess={handlePaymentSuccess}
                      userEmail=""
                    />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-purple-50 border border-purple-200 p-4 rounded-xl text-center">
                      <CheckCircle className="w-6 h-6 text-purple-700 mx-auto mb-2" />
                      <span className="font-bold block text-purple-700">✅ Premium Unlocked!</span>
                      <p className="text-xs text-purple-800 mt-1">Your full SWOT analysis is ready.</p>
                    </div>
                    <button
                      onClick={handleDownloadPDF}
                      disabled={generating}
                      className="w-full h-11 bg-[#10B981] text-white font-bold text-sm rounded-xl shadow-md hover:bg-[#10B981]/90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      {generating ? "Generating PDF..." : "📑 Download 15-Page SWOT Report"}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Hidden SWOT report content (for PDF generation) */}
            {isPremiumUnlocked && (
              <div id="swot-report-content" className="hidden">
                <div style={{ fontFamily: "Arial, sans-serif", padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
                  <h1 style={{ color: "#1E3A8A" }}>Personalised SWOT Analysis Report</h1>
                  <p><strong>Student Name:</strong> {name || "Student"}</p>
                  <p><strong>City:</strong> {city}</p>
                  <p><strong>Current Class:</strong> {currentClass}</p>
                  <p><strong>Percentage:</strong> {percentage}%</p>
                  <hr />
                  <h2>Strengths</h2>
                  <p>Based on your {mathAptitude >= 4 ? "strong mathematical aptitude" : "balanced skills"}, and interest in {favSubject || "various subjects"}, you have a solid foundation for {recommendations[0]?.title || "a successful career"}.</p>
                  <h2>Weaknesses</h2>
                  <p>Your budget constraint ({budget}) may limit access to premium institutions. We recommend exploring scholarships and government colleges.</p>
                  <h2>Opportunities</h2>
                  <p>Maharashtra has booming IT hubs in Pune, Mumbai, and Nashik. Healthcare and pharmaceutical sectors are also rapidly growing.</p>
                  <h2>Threats</h2>
                  <p>Increasing competition and automation require continuous upskilling. Avoid delaying career decisions.</p>
                  <h2>Recommended Action Plan</h2>
                  <ul>
                    <li>Short‑term: Enrol in online certifications related to {favSubject || "your field of interest"}.</li>
                    <li>Medium‑term: Prepare for entrance exams (JEE, NEET, MPSC, etc.) based on your aptitude.</li>
                    <li>Long‑term: Pursue a degree with internships and networking in Pune or Mumbai.</li>
                  </ul>
                  <p><em>Generated by AyushNexa AI Career Consultant – Maharashtra’s trusted career guide.</em></p>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}