"use client";

import { useState, FormEvent } from "react";
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

  const goToStep2 = (e: FormEvent) => { e.preventDefault(); if (name && percentage) setStep(2); };
  const goToStep3 = () => setStep(3);
  const handlePaymentSuccess = () => { setIsPremiumUnlocked(true); setShowPaywall(false); };

  // Helper functions for SWOT content
  const getStrengthsList = () => {
    const items = [];
    if (mathAptitude >= 4) items.push("• Strong analytical and logical thinking – ideal for engineering, data science, or finance.");
    if (healthcareInterest >= 4) items.push("• Genuine interest in healthcare and helping others – suited for pharmacy, nursing, or public health.");
    if (businessMindset >= 4) items.push("• Entrepreneurial mindset and interest in business – can excel in management, marketing, or family business.");
    if (govtJobPreference >= 4) items.push("• Desire for stability and service – good fit for competitive exams like MPSC, UPSC, Banking.");
    if (parseFloat(percentage) >= 75) items.push(`• Excellent academic record (${percentage}%) – strong foundation for competitive exams and top colleges.`);
    if (favSubject) items.push(`• Deep interest in ${favSubject} – can leverage this for specialised studies.`);
    if (items.length === 0) items.push("• Balanced skillset – with proper guidance, you can succeed in many fields.");
    return items;
  };

  const getWeaknessesList = () => {
    const items = [];
    const studentPercentage = parseFloat(percentage) || 0;
    const budgetLevel = budget === "High" ? "premium" : budget === "Moderate (Local/Pune)" ? "moderate" : "low";
    if (studentPercentage < 60) items.push(`• Academic score of ${studentPercentage}% may require extra effort for admission to top institutes.`);
    if (budgetLevel !== "premium") items.push(`• Budget constraint (${budget}) – may limit options for private/foreign universities. Consider government colleges or scholarships.`);
    if (mathAptitude < 3 && (currentClass === "12th_Science" || currentClass === "Graduate")) items.push("• Lower interest in mathematics – might need to avoid heavy quantitative fields like engineering or pure sciences.");
    if (items.length === 0) items.push("• No major weaknesses identified – continue building on your strengths.");
    return items;
  };

  const getOpportunitiesList = () => {
    const budgetLevel = budget === "High" ? "premium" : budget === "Moderate (Local/Pune)" ? "moderate" : "low";
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

  const generateReportHTML = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>SWOT Analysis Report</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
            line-height: 1.5;
            color: #1e293b;
          }
          h1 { color: #1E3A8A; text-align: center; }
          h2 { color: #0F172A; margin-top: 20px; }
          hr { margin: 20px 0; }
          ul { margin: 10px 0; }
          @media print {
            body { margin: 0; padding: 20px; }
          }
        </style>
      </head>
      <body>
        <h1>Personalised Career SWOT Analysis Report</h1>
        <p style="text-align: center;">Prepared for: <strong>${name || "Student"}</strong> | ${city} | ${currentClass} | ${percentage}%</p>
        <hr />
        <h2>🧠 1. Executive Summary</h2>
        <p>Based on your academic profile (${percentage}%), aptitude scores, and interest in ${favSubject || "various subjects"}, this report provides a comprehensive roadmap for your higher education and career in Maharashtra. Your budget (${budget}) has been considered to suggest affordable and high‑ROI options.</p>
        <h2>💪 2. Strengths (Internal)</h2>
        <ul>${getStrengthsList().map(s => `<li>${s}</li>`).join("")}</ul>
        <h2>📉 3. Weaknesses (Internal)</h2>
        <ul>${getWeaknessesList().map(w => `<li>${w}</li>`).join("")}</ul>
        <h2>🌱 4. Opportunities (External)</h2>
        <ul>${getOpportunitiesList().map(o => `<li>${o}</li>`).join("")}</ul>
        <h2>⚠️ 5. Threats (External)</h2>
        <ul>${getThreatsList().map(t => `<li>${t}</li>`).join("")}</ul>
        <h2>🎯 6. Recommended Action Plan</h2>
        <h3>Short‑term (0‑6 months)</h3>
        <ul><li>Enrol in online certification related to ${favSubject || "your area of interest"} (e.g., Coursera, NPTEL).</li><li>Improve weak subjects – focus on ${mathAptitude < 3 ? "mathematics" : "strengthening your aptitude"}.</li></ul>
        <h3>Medium‑term (6‑24 months)</h3>
        <ul><li>Prepare for entrance exams: ${mathAptitude >= 4 ? "JEE, BITSAT, or MH-CET" : healthcareInterest >= 4 ? "NEET, MHCET for Pharmacy" : businessMindset >= 4 ? "IPMAT, BBA entrance" : govtJobPreference >= 4 ? "MPSC, UPSC, Banking prelims" : "common entrance tests (CUET, MHCET)"}.</li><li>Apply for scholarships (EBC, Rajarshi Shahu, National Scholarship Portal).</li></ul>
        <h3>Long‑term (2‑5 years)</h3>
        <ul><li>Pursue a degree with internships – target colleges in Pune, Mumbai, Nashik.</li><li>Build a portfolio of projects or gain part‑time work experience.</li></ul>
        <h2>📚 7. Recommended Colleges in Maharashtra</h2>
        <ul>${getCollegeRecommendations().map(c => `<li>${c}</li>`).join("")}</ul>
        <p style="margin-top: 20px; font-size: 10px; color: #64748B;">Generated by AyushNexa AI Career Consultant – Maharashtra's trusted career guide.</p>
      </body>
      </html>
    `;
  };

  const handlePrintReport = () => {
    const reportHTML = generateReportHTML();
    const win = window.open();
    if (!win) {
      alert("Please allow pop-ups to generate the report.");
      return;
    }
    win.document.write(reportHTML);
    win.document.close();
    win.print();
  };

  // Free recommendations for step 3
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

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black text-center mb-8">🧠 FuturePath AI Career Consultant</h1>

        {step === 1 && (
          <div className="bg-white rounded-2xl p-6 shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">📋 Step 1: Student Profile</h2>
            <form onSubmit={goToStep2} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Full Name" required className="border p-2 rounded" value={name} onChange={e => setName(e.target.value)} />
                <input type="text" placeholder="City" required className="border p-2 rounded" value={city} onChange={e => setCity(e.target.value)} />
                <select className="border p-2 rounded" value={currentClass} onChange={e => setCurrentClass(e.target.value)}>
                  <option value="10th">Class 10th</option><option value="12th_Science">Class 12th Science</option>
                  <option value="12th_Commerce">Class 12th Commerce</option><option value="Graduate">Undergraduate</option>
                </select>
                <input type="number" placeholder="Percentage" required className="border p-2 rounded" value={percentage} onChange={e => setPercentage(e.target.value)} />
                <input type="text" placeholder="Favorite Subject" className="border p-2 rounded" value={favSubject} onChange={e => setFavSubject(e.target.value)} />
                <select className="border p-2 rounded" value={budget} onChange={e => setBudget(e.target.value)}>
                  <option value="Low">Low (₹20k-50k/yr)</option>
                  <option value="Moderate (Local/Pune)">Moderate (₹50k-2L/yr)</option>
                  <option value="High">High (₹2L+/yr)</option>
                </select>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">Continue →</button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white rounded-2xl p-6 shadow-md max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">🧠 Step 2: Aptitude Assessment (1-5)</h2>
            <div className="space-y-4">
              {[
                { label: "Mathematical & Logical Thinking", val: mathAptitude, set: setMathAptitude },
                { label: "Medical / Healthcare Interest", val: healthcareInterest, set: setHealthcareInterest },
                { label: "Business / Financial Growth", val: businessMindset, set: setBusinessMindset },
                { label: "Government Job Preference", val: govtJobPreference, set: setGovtJobPreference }
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between"><span>{item.label}</span><span>{item.val}/5</span></div>
                  <input type="range" min="1" max="5" className="w-full" value={item.val} onChange={e => item.set(Number(e.target.value))} />
                </div>
              ))}
            </div>
            <button onClick={goToStep3} className="bg-black text-white px-4 py-2 rounded w-full mt-6">Analyze →</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8">
            <div className="bg-white p-4 rounded shadow flex justify-between items-center">
              <div><strong>{name || "Student"}</strong> | {city} | {percentage}%</div>
              <button onClick={() => window.print()} className="bg-green-600 text-white px-3 py-1 rounded text-sm">Print Summary</button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold">✨ Free Career Pathways</h3>
                {recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-white p-4 rounded shadow">
                    <span className="text-2xl mr-2">{rec.icon}</span>
                    <strong>{rec.title}</strong>
                    <p className="text-sm mt-1">{rec.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-white p-6 rounded shadow text-center">
                <div className="border-b pb-2 mb-4">
                  <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded">In-depth Vault</span>
                  <h3 className="font-bold mt-2">Unlock 2‑Page SWOT Report</h3>
                </div>
                {!isPremiumUnlocked ? (
                  <>
                    <div className="text-2xl font-bold">₹49</div>
                    <RazorpayButton amount={49} productName="Career Guidance Premium Report" label="Unlock Premium" onSuccess={handlePaymentSuccess} userEmail="" />
                  </>
                ) : (
                  <>
                    <div className="bg-purple-50 p-3 rounded mb-4"><CheckCircle className="inline text-purple-700 mr-1" /> Premium Unlocked!</div>
                    <button onClick={handlePrintReport} className="bg-green-600 text-white px-4 py-2 rounded w-full flex items-center justify-center gap-2">
                      <Download size={16} /> Download SWOT Report (PDF)
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}