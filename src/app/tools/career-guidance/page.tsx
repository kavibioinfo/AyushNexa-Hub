"use client";

import { useState } from "react";
import Header from "@/components/header";
import RazorpayButton from "@/components/RazorpayButton";
import { CheckCircle, Download } from "lucide-react";

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

  const goToStep2 = (e: React.FormEvent) => { e.preventDefault(); if (name && percentage) setStep(2); };
  const goToStep3 = () => setStep(3);
  const handlePaymentSuccess = () => { setIsPremiumUnlocked(true); setShowPaywall(false); };

  const handlePrint = () => window.print();

  const getRecommendations = () => {
    const recs = [];
    if (mathAptitude >= 4) recs.push({ title: "Computer Science & Data Engineering", desc: "B.E./B.Tech in CSE/IT leads to high‑paying IT jobs in Pune, Mumbai.", icon: "💻" });
    if (healthcareInterest >= 4) recs.push({ title: "Pharmacy (B.Pharm) & Healthcare", desc: "Stable career in pharmaceutical companies and clinics.", icon: "💊" });
    if (businessMindset >= 4) recs.push({ title: "Commerce & Business Management", desc: "B.Com, BBA, or MBA opens doors to corporate roles and family business.", icon: "📊" });
    if (govtJobPreference >= 4) recs.push({ title: "Government Services (MPSC/UPSC/Banking)", desc: "Job security; start early preparation.", icon: "🏛️" });
    if (recs.length === 0) recs.push({ title: "Explore & Discover", desc: "Consider a broad undergraduate degree with skill development.", icon: "🔍" });
    return recs;
  };
  const recommendations = getRecommendations();

  const studentPercentage = parseFloat(percentage) || 0;
  const budgetLevel = budget === "High" ? "premium" : budget === "Moderate (Local/Pune)" ? "moderate" : "low";

  const getStrengthsList = () => {
    const items = [];
    if (mathAptitude >= 4) items.push("• Strong analytical and logical thinking – ideal for engineering, data science, or finance.");
    if (healthcareInterest >= 4) items.push("• Genuine interest in healthcare and helping others – suited for pharmacy, nursing, or public health.");
    if (businessMindset >= 4) items.push("• Entrepreneurial mindset and interest in business – can excel in management, marketing, or family business.");
    if (govtJobPreference >= 4) items.push("• Desire for stability and service – good fit for competitive exams like MPSC, UPSC, Banking.");
    if (studentPercentage >= 75) items.push(`• Excellent academic record (${studentPercentage}%) – strong foundation for competitive exams and top colleges.`);
    if (favSubject) items.push(`• Deep interest in ${favSubject} – can leverage this for specialised studies.`);
    if (items.length === 0) items.push("• Balanced skillset – with proper guidance, you can succeed in many fields.");
    return items;
  };

  const getWeaknessesList = () => {
    const items = [];
    if (studentPercentage < 60) items.push(`• Academic score of ${studentPercentage}% may require extra effort for admission to top institutes.`);
    if (budgetLevel !== "premium") items.push(`• Budget constraint (${budget}) – may limit options for private/foreign universities. Consider government colleges or scholarships.`);
    if (mathAptitude < 3 && (currentClass === "12th_Science" || currentClass === "Graduate")) items.push("• Lower interest in mathematics – might need to avoid heavy quantitative fields like engineering or pure sciences.");
    if (items.length === 0) items.push("• No major weaknesses identified – continue building on your strengths.");
    return items;
  };

  const getOpportunitiesList = () => {
    const items = [
      "• Maharashtra has rapidly growing IT hubs in Pune, Mumbai, and Nashik – ample jobs for tech graduates.",
      "• Healthcare and pharmaceutical sectors are expanding – B.Pharm, D.Pharm, and allied health courses are in high demand.",
      "• Government initiatives like 'Make in India' and 'Digital India' create new roles in public administration and digital services.",
      "• Online learning platforms (Coursera, NPTEL, SWAYAM) offer affordable skill development courses."
    ];
    if (budgetLevel !== "premium") items.push("• Scholarships like Rajarshi Shahu Maharaj Merit Scholarship, EBC, and OBC fee waivers are available for meritorious students.");
    return items;
  };

  const getThreatsList = () => [
    "• Increasing competition for limited seats in top colleges – need early and focused preparation.",
    "• Automation and AI may replace routine jobs – emphasise skill upgradation and lifelong learning.",
    "• Economic fluctuations can affect job markets – diversify skills and consider a side hustle."
  ];

  const getCollegeRecommendations = () => {
    const colleges = [];
    if (mathAptitude >= 4) colleges.push("• <strong>Engineering/CS:</strong> COEP Pune, VJTI Mumbai, PICT Pune, Government College of Engineering, Aurangabad.");
    if (healthcareInterest >= 4) colleges.push("• <strong>Pharmacy:</strong> ICT Mumbai, Bharati Vidyapeeth Pune, GIPE Mumbai, YB Chavan College, Aurangabad.");
    if (businessMindset >= 4) colleges.push("• <strong>Commerce/Management:</strong> JBIMS Mumbai, SIMSREE Mumbai, PUMBA Pune, Symbiosis Pune.");
    if (govtJobPreference >= 4) colleges.push("• <strong>General degree with MPSC/UPSC focus:</strong> Fergusson College Pune, Nowrosjee Wadia College Pune, SP College Pune.");
    if (colleges.length === 0) colleges.push("• <strong>General:</strong> Any recognised university in Maharashtra – focus on skill development and internships.");
    return colleges;
  };

  // This is the printable report (hidden on screen, visible only when printing)
  const PrintableReport = () => (
    <div className="print-only" style={{ display: "none" }}>
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden !important; }
          .print-only, .print-only * { visibility: visible !important; }
          .print-only { position: absolute; top: 0; left: 0; width: 100%; padding: 20px; box-sizing: border-box; }
        }
      ` }} />
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto", lineHeight: "1.5", color: "#1e293b" }}>
        <h1 style={{ color: "#1E3A8A", textAlign: "center" }}>Personalised Career SWOT Analysis Report</h1>
        <p style={{ textAlign: "center" }}>Prepared for: <strong>{name || "Student"}</strong> | {city} | {currentClass} | {percentage}%</p>
        <hr />
        <h2 style={{ color: "#0F172A" }}>🧠 1. Executive Summary</h2>
        <p>Based on your academic profile ({percentage}%), aptitude scores, and interest in {favSubject || "various subjects"}, this report provides a comprehensive roadmap for your higher education and career in Maharashtra. Your budget ({budget}) has been considered to suggest affordable and high‑ROI options.</p>
        <h2 style={{ color: "#0F172A" }}>💪 2. Strengths (Internal)</h2>
        <ul>{getStrengthsList().map((s, i) => <li key={i}>{s}</li>)}</ul>
        <h2 style={{ color: "#0F172A" }}>📉 3. Weaknesses (Internal)</h2>
        <ul>{getWeaknessesList().map((w, i) => <li key={i}>{w}</li>)}</ul>
        <h2 style={{ color: "#0F172A" }}>🌱 4. Opportunities (External)</h2>
        <ul>{getOpportunitiesList().map((o, i) => <li key={i}>{o}</li>)}</ul>
        <h2 style={{ color: "#0F172A" }}>⚠️ 5. Threats (External)</h2>
        <ul>{getThreatsList().map((t, i) => <li key={i}>{t}</li>)}</ul>
        <h2 style={{ color: "#0F172A" }}>🎯 6. Recommended Action Plan</h2>
        <h3>Short‑term (0‑6 months)</h3>
        <ul><li>Enrol in online certification related to {favSubject || "your area of interest"} (e.g., Coursera, NPTEL).</li><li>Improve weak subjects – focus on {mathAptitude < 3 ? "mathematics" : "strengthening your aptitude"}.</li></ul>
        <h3>Medium‑term (6‑24 months)</h3>
        <ul><li>Prepare for entrance exams: {mathAptitude >= 4 ? "JEE, BITSAT, or MH-CET" : healthcareInterest >= 4 ? "NEET, MHCET for Pharmacy" : businessMindset >= 4 ? "IPMAT, BBA entrance" : govtJobPreference >= 4 ? "MPSC, UPSC, Banking prelims" : "common entrance tests (CUET, MHCET)"}.</li><li>Apply for scholarships (EBC, Rajarshi Shahu, National Scholarship Portal).</li></ul>
        <h3>Long‑term (2‑5 years)</h3>
        <ul><li>Pursue a degree with internships – target colleges in Pune, Mumbai, Nashik.</li><li>Build a portfolio of projects or gain part‑time work experience.</li></ul>
        <h2 style={{ color: "#0F172A" }}>📚 7. Recommended Colleges in Maharashtra</h2>
        <ul>{getCollegeRecommendations().map((c, i) => <li key={i} dangerouslySetInnerHTML={{ __html: c }} />)}</ul>
        <p style={{ marginTop: "20px", fontSize: "10px", color: "#64748B" }}>Generated by AyushNexa AI Career Consultant – Maharashtra's trusted career guide.</p>
      </div>
    </div>
  );

  // Steps 1, 2, 3 UI (same as before, but I'll include them compactly)
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
              {[{ label: "1. Mathematical & Logical Thinking", value: mathAptitude, setter: setMathAptitude },
                { label: "2. Medical / Healthcare / Helping Patients", value: healthcareInterest, setter: setHealthcareInterest },
                { label: "3. Business / Financial Growth / Sales", value: businessMindset, setter: setBusinessMindset },
                { label: "4. Government Service Job Stability (MPSC/UPSC/Banking)", value: govtJobPreference, setter: setGovtJobPreference }].map(item => (
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
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-white border-2 rounded-2xl p-6 shadow-sm"><div className="flex items-center gap-2 mb-3"><span className="text-2xl">{rec.icon}</span><h4 className="text-lg font-bold">{rec.title}</h4></div><p className="text-sm text-[#64748B]">{rec.desc}</p></div>
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
                    <button onClick={handlePrint} className="w-full h-11 bg-[#10B981] text-white font-bold text-sm rounded-xl shadow-md flex items-center justify-center gap-2"><Download className="w-4 h-4" />📑 Download 15-Page SWOT Report (Print/Save as PDF)</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
      <PrintableReport />
    </div>
  );
}