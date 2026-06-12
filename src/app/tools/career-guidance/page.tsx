"use client";

import { useState } from "react";
import Header from "@/components/header";
import RazorpayButton from "@/components/RazorpayButton";
import { CheckCircle, Sparkles, Download } from "lucide-react";

async function generatePDF(elementId: string, filename: string) {
  const html2pdf = (await import("html2pdf.js")).default;
  const element = document.getElementById(elementId);
  if (!element) return;
  const opt = {
    margin: [0.5, 0.5, 0.5, 0.5],
    filename: filename,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, letterRendering: true, useCORS: true },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
  };
  await html2pdf().set(opt as any).from(element).save();
}

export default function CareerGuidance() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [city, setCity] = useState("Latur");
  const [currentClass, setCurrentClass] = useState("10th");
  const [percentage, setPercentage] = useState("");
  const [favSubject, setFavSubject] = useState("");
  const [budget, setBudget] = useState("Moderate (Local/Pune)");
  const [mathAptitude, setMathAptitude] = useState(3);
  const [healthcareInterest, setHealthcareInterest] = useState(3);
  const [businessMindset, setBusinessMindset] = useState(3);
  const [govtJobPreference, setGovtJobPreference] = useState(3);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [generating, setGenerating] = useState(false);

  const goToStep2 = (e: React.FormEvent) => { e.preventDefault(); if (name && percentage) setStep(2); };
  const goToStep3 = () => setStep(3);
  const handlePaymentSuccess = () => { setIsPremiumUnlocked(true); setShowPaywall(false); };

  const handleDownloadPDF = async () => {
    setGenerating(true);
    await generatePDF("swot-report-content", `SWOT_${name || "Student"}_CareerReport.pdf`);
    setGenerating(false);
  };

  // Determine top career recommendations based on aptitude
  const getTopRecommendations = () => {
    const scores = [
      { field: "Computer Science & Data Engineering", score: mathAptitude, icon: "💻", description: "High demand in Pune, Mumbai IT hubs. Average salary ₹6-12 LPA." },
      { field: "Healthcare & Pharmacy", score: healthcareInterest, icon: "💊", description: "Stable career in clinics, hospitals, pharma. Starting salary ₹3-6 LPA." },
      { field: "Business & Commerce", score: businessMindset, icon: "📊", description: "Entrepreneurship, corporate management, finance. Growth potential high." },
      { field: "Government Services", score: govtJobPreference, icon: "🏛️", description: "Job security, pensions, social respect. MPSC, UPSC, Banking." }
    ];
    return scores.sort((a,b) => b.score - a.score);
  };

  const topRecommendations = getTopRecommendations();
  const primaryRecommendation = topRecommendations[0];

  // Helper: format budget description
  const getBudgetDescription = () => {
    switch(budget) {
      case "Low": return "affordable government colleges (₹20k-50k/year). Scholarships and fee waivers are available.";
      case "Moderate (Local/Pune)": return "moderate private or semi‑government institutions (₹50k-2L/year). Good value for money.";
      default: return "premium private institutions (₹2L+/year). Consider education loans and merit scholarships.";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pb-12">
      <div className="print:hidden"><Header /></div>
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="text-center max-w-3xl mx-auto mb-10 print:hidden">
          <span className="inline-block bg-[#2563EB]/10 text-[#2563EB] text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider mb-2">AyushNexa Premium Initiative</span>
          <h1 className="text-3xl font-black sm:text-4xl">🧠 FuturePath AI Career Consultant</h1>
          <p className="text-[#64748B] text-sm mt-2">Tailored for Maharashtra families – discover high‑growth, secure, and budget‑friendly career roadmaps.</p>
        </div>

        {step === 1 && (
          <div className="max-w-2xl mx-auto bg-white border rounded-2xl p-8 shadow-sm print:hidden">
            <h2 className="text-lg font-bold border-b pb-3 mb-5">📋 Step 1: Student Profile Context</h2>
            <form onSubmit={goToStep2} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="block text-xs font-bold uppercase mb-1">Full Name *</label><input type="text" required className="w-full rounded-lg border p-2.5 text-sm" value={name} onChange={e => setName(e.target.value)} /></div>
                <div><label className="block text-xs font-bold uppercase mb-1">City / Town *</label><input type="text" required className="w-full rounded-lg border p-2.5 text-sm" value={city} onChange={e => setCity(e.target.value)} /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="block text-xs font-bold uppercase mb-1">Current Education Level *</label><select className="w-full rounded-lg border p-2.5 text-sm bg-white" value={currentClass} onChange={e => setCurrentClass(e.target.value)}><option value="10th">Class 10th</option><option value="12th_Science">Class 12th (Science)</option><option value="12th_Commerce">Class 12th (Commerce/Arts)</option><option value="Graduate">Undergraduate</option></select></div>
                <div><label className="block text-xs font-bold uppercase mb-1">Academic Percentage *</label><input type="number" required className="w-full rounded-lg border p-2.5 text-sm" value={percentage} onChange={e => setPercentage(e.target.value)} /></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div><label className="block text-xs font-bold uppercase mb-1">Most Favorite Subject</label><input type="text" className="w-full rounded-lg border p-2.5 text-sm" value={favSubject} onChange={e => setFavSubject(e.target.value)} /></div>
                <div><label className="block text-xs font-bold uppercase mb-1">Annual Education Budget</label><select className="w-full rounded-lg border p-2.5 text-sm bg-white" value={budget} onChange={e => setBudget(e.target.value)}><option value="Low">Affordable Govt Colleges (₹20k-50k/Yr)</option><option value="Moderate (Local/Pune)">Moderate Private (₹50k-2L/Yr)</option><option value="High">Premium Private (₹2L+/Yr)</option></select></div>
              </div>
              <button type="submit" className="w-full h-11 rounded-xl bg-[#2563EB] text-white font-bold text-sm">Continue to Psychometric Assessment →</button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="max-w-2xl mx-auto bg-white border rounded-2xl p-8 shadow-sm print:hidden space-y-6">
            <div><h2 className="text-lg font-bold">🧠 Step 2: Mindset & Core Skill Mapping</h2><p className="text-xs text-[#64748B]">Rate your interest from Low (1) to High (5).</p></div>
            <div className="space-y-4">
              {[
                { label: "1. Mathematical & Logical Thinking", value: mathAptitude, setter: setMathAptitude },
                { label: "2. Medical / Healthcare / Helping Patients", value: healthcareInterest, setter: setHealthcareInterest },
                { label: "3. Business / Financial Growth / Sales", value: businessMindset, setter: setBusinessMindset },
                { label: "4. Government Service Job Stability (MPSC/UPSC/Banking)", value: govtJobPreference, setter: setGovtJobPreference }
              ].map(item => (
                <div key={item.label} className="bg-[#F8FAFC] p-4 rounded-xl border">
                  <div className="flex justify-between text-xs font-bold mb-2"><span>{item.label}</span><span className="text-[#2563EB]">{item.value} / 5</span></div>
                  <input type="range" min="1" max="5" className="w-full accent-[#2563EB]" value={item.value} onChange={e => item.setter(Number(e.target.value))} />
                </div>
              ))}
            </div>
            <button onClick={goToStep3} className="w-full h-11 rounded-xl bg-[#0F172A] text-white font-bold text-sm">Analyze Future Blueprint →</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="bg-white border p-6 rounded-2xl shadow-sm flex justify-between items-center flex-wrap gap-4">
              <div><span className="text-xs font-bold uppercase text-[#64748B]">Active Report File</span><h3 className="text-xl font-bold">Student Profile: {name || "Student"}</h3><div className="text-xs text-[#64748B] flex gap-x-4">📍 {city} | 📊 {percentage}% | 💰 {budget}</div></div>
              <button onClick={() => window.print()} className="h-9 px-4 rounded-lg bg-[#10B981] text-white text-xs font-bold">📥 Print Summary</button>
            </div>

            <div className="grid gap-8 lg:grid-cols-3 items-start">
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-md font-bold text-[#2563EB]">✨ Free Career Pathways (Based on your aptitude)</h3>
                {topRecommendations.slice(0,3).map((rec, idx) => (
                  <div key={idx} className="bg-white border-2 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-2 mb-3"><span className="text-2xl">{rec.icon}</span><h4 className="text-lg font-bold">{rec.field}</h4></div>
                    <p className="text-sm text-[#64748B]">{rec.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white border rounded-2xl p-6 shadow-md space-y-5 h-fit">
                <div className="text-center border-b pb-3"><span className="bg-purple-100 text-purple-700 text-[9px] px-2 py-0.5 rounded-full uppercase">In‑depth Vault</span><h3 className="text-md font-black mt-2">Unlock 15‑Page Analytical Dossier</h3><p className="text-xs text-[#64748B]">Personalised SWOT analysis & institute recommendations.</p></div>
                {!isPremiumUnlocked ? (
                  <div className="space-y-4">
                    <div className="text-center bg-[#F8FAFC] py-3 rounded-lg border"><span className="text-2xl font-black">₹199</span><span className="text-xs text-[#64748B] block">One‑time launch price</span></div>
                    <RazorpayButton productId="career_guidance" amount={199} productName="Career Guidance Premium Report" label="Unlock Premium Blueprint 🔒" onSuccess={handlePaymentSuccess} userEmail="" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-purple-50 border p-4 rounded-xl text-center"><CheckCircle className="w-6 h-6 text-purple-700 mx-auto mb-2" /><span className="font-bold block text-purple-700">✅ Premium Unlocked!</span><p className="text-xs text-purple-800">Your SWOT analysis is ready.</p></div>
                    <button onClick={handleDownloadPDF} disabled={generating} className="w-full h-11 bg-[#10B981] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 disabled:opacity-50"><Download className="w-4 h-4" />{generating ? "Generating PDF..." : "📑 Download 15-Page SWOT Report"}</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ===== DYNAMIC PDF CONTENT (always present, hidden) ===== */}
        <div id="swot-report-content" style={{ display: "none" }}>
          <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
            <h1 style={{ color: "#1E3A8A", textAlign: "center" }}>Personalised Career SWOT Analysis</h1>
            <p style={{ textAlign: "center" }}><strong>Prepared for:</strong> {name || "Student"} | <strong>Date:</strong> {new Date().toLocaleDateString()}</p>
            <hr />

            <h2>📌 Student Profile Summary</h2>
            <ul>
              <li><strong>Name:</strong> {name || "Not provided"}</li>
              <li><strong>City:</strong> {city}</li>
              <li><strong>Current Class:</strong> {currentClass}</li>
              <li><strong>Academic Percentage:</strong> {percentage}%</li>
              <li><strong>Favorite Subject:</strong> {favSubject || "Not specified"}</li>
              <li><strong>Annual Budget:</strong> {budget}</li>
            </ul>
            <div style={{ pageBreakBefore: "always" }}></div>

            <h2>🎯 Aptitude & Interest Scores (1-5)</h2>
            <ul>
              <li>Mathematical & Logical Thinking: {mathAptitude}/5</li>
              <li>Medical / Healthcare Interest: {healthcareInterest}/5</li>
              <li>Business Mindset: {businessMindset}/5</li>
              <li>Government Job Preference: {govtJobPreference}/5</li>
            </ul>
            <p><strong>Primary Career Recommendation:</strong> {primaryRecommendation?.field} (score {primaryRecommendation?.score}/5).</p>
            <div style={{ pageBreakBefore: "always" }}></div>

            <h2>💪 Strengths (S)</h2>
            <p>Based on your profile:</p>
            <ul>
              {mathAptitude >= 4 && <li>Strong logical and analytical skills – excellent for engineering, data science, or finance.</li>}
              {healthcareInterest >= 4 && <li>Genuine interest in healthcare – ideal for pharmacy, nursing, or allied health sciences.</li>}
              {businessMindset >= 4 && <li>Entrepreneurial and business acumen – suited for management, marketing, or family business.</li>}
              {govtJobPreference >= 4 && <li>Desire for stability – good fit for competitive exams (MPSC, UPSC, Banking).</li>}
              {percentage && parseFloat(percentage) >= 70 && <li>Good academic record ({percentage}%) – opens doors to reputed colleges.</li>}
              {!mathAptitude && !healthcareInterest && !businessMindset && !govtJobPreference && <li>You have a balanced set of interests. You are adaptable and can explore multiple fields.</li>}
            </ul>
            <div style={{ pageBreakBefore: "always" }}></div>

            <h2>⚠️ Weaknesses (W)</h2>
            <ul>
              {percentage && parseFloat(percentage) < 60 && <li>Academic percentage below 60% – may limit admission to top colleges. Consider improvement exams or diploma pathways.</li>}
              {budget === "Low" && <li>Limited budget – focus on government colleges, scholarships, and education loans.</li>}
              {mathAptitude < 3 && <li>Lower interest in mathematics – avoid engineering or heavy quantitative courses. Explore humanities, law, or design.</li>}
              {healthcareInterest < 3 && businessMindset < 3 && govtJobPreference < 3 && <li>No clear strong interest – explore career counseling and internships to discover your passion.</li>}
              <li>Lack of exposure to modern career options (AI, data science, digital marketing) is common in semi‑urban areas. We will address this in opportunities.</li>
            </ul>
            <div style={{ pageBreakBefore: "always" }}></div>

            <h2>🌱 Opportunities (O)</h2>
            <ul>
              <li>Maharashtra has booming IT hubs in Pune, Mumbai, Nashik – high demand for software engineers, data analysts, and cloud professionals.</li>
              <li>Healthcare sector is expanding rapidly – pharmacists, lab technicians, and healthcare administrators are needed.</li>
              <li>Government initiatives (Startup India, Skill India) offer free certification courses.</li>
              <li>Online learning platforms (Coursera, NPTEL, Udemy) provide affordable upskilling.</li>
              <li>Your city {city} has local opportunities: {city === "Latur" ? "Latur has developing IT parks and healthcare institutions. Network with local professionals." : "Check for nearby industrial zones and educational hubs."}</li>
              <li>Scholarships for Maharashtra students (EBC, Rajarshi Shahu, etc.) can reduce financial burden.</li>
            </ul>
            <div style={{ pageBreakBefore: "always" }}></div>

            <h2>⚠️ Threats (T)</h2>
            <ul>
              <li>Increasing competition due to AI and automation – essential to keep learning new skills.</li>
              <li>Limited seats in top colleges – need strong entrance exam preparation (JEE, NEET, CET).</li>
              <li>Rising cost of education – plan finances early, explore part‑time work or freelancing.</li>
              <li>Lack of guidance from family/friends – use AyushNexa’s career resources and online communities.</li>
            </ul>
            <div style={{ pageBreakBefore: "always" }}></div>

            <h2>📅 5‑Year Action Plan</h2>
            <h3>Year 1 (Current):</h3>
            <ul>
              <li>Enrol in online certifications related to {primaryRecommendation?.field || "your chosen field"}.</li>
              <li>Improve academic score if below 60%.</li>
              <li>Start preparing for entrance exams (if applicable).</li>
            </ul>
            <h3>Year 2-3:</h3>
            <ul>
              <li>Join a college degree program aligned with your interest.</li>
              <li>Participate in internships and workshops.</li>
              <li>Build a portfolio (coding projects, business plans, etc.).</li>
            </ul>
            <h3>Year 4-5:</h3>
            <ul>
              <li>Graduate with good grades and placement.</li>
              <li>Consider higher education (Masters, MBA) or start a business.</li>
              <li>Network with alumni and industry professionals.</li>
            </ul>
            <div style={{ pageBreakBefore: "always" }}></div>

            <h2>🏛️ Recommended Institutions (Maharashtra)</h2>
            <ul>
              <li><strong>Engineering/CS:</strong> COEP Pune, VJTI Mumbai, MIT WPU, VIIT Pune.</li>
              <li><strong>Pharmacy/Healthcare:</strong> Government College of Pharmacy, Karad; Bharati Vidyapeeth, Pune.</li>
              <li><strong>Commerce/Management:</strong> Jai Hind College Mumbai, Symbiosis Pune, IMDR Pune.</li>
              <li><strong>Government Exams:</strong> Yashwantrao Chavan Academy (YASHADA), Pune for MPSC training.</li>
            </ul>
            <div style={{ pageBreakBefore: "always" }}></div>

            <h2>💡 Scholarships & Financial Aid</h2>
            <ul>
              <li>EBC (Economically Backward Class) scholarship – up to ₹20,000/year.</li>
              <li>Rajarshi Shahu Maharaj Merit Scholarship.</li>
              <li>National Scholarship Portal (NSP) – central schemes.</li>
              <li>Merit‑cum‑means scholarship for minority students.</li>
            </ul>
            <div style={{ pageBreakBefore: "always" }}></div>

            <h2>📝 Conclusion</h2>
            <p>Dear {name || "Student"}, your profile shows potential in <strong>{primaryRecommendation?.field || "multiple areas"}</strong>. With focused effort and the action plan above, you can build a successful career. Remember to stay curious, keep learning, and leverage Maharashtra's growing ecosystem. AyushNexa wishes you the very best!</p>
            <p><em>Report generated by AyushNexa AI Career Consultant – Empowering Maharashtra's youth.</em></p>
          </div>
        </div>
      </main>
    </div>
  );
}