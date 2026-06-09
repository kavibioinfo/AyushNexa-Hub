"use client"

import { useState } from "react"
import Header from "@/components/header"

export default function HealthAssistant() {
  // 🎛️ SUB-TAB CONTROL CENTER ('remedies' | 'bmi')
  const [activeSubTab, setActiveSubTab] = useState<"remedies" | "bmi">("remedies")

  // 📝 REMEDIES STATES
  const [userName, setUserName] = useState("")
  const [age, setAge] = useState("")
  const [symptoms, setSymptoms] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [remedies, setRemedies] = useState<any | null>(null)

  // 📊 BMI STATES
  const [weight, setWeight] = useState("")
  const [heightFeet, setHeightFeet] = useState("")
  const [heightInches, setHeightInches] = useState("")
  const [bmiResult, setBmiResult] = useState<number | null>(null)
  const [bmiStatus, setBmiStatus] = useState("")
  const [bmiAdvice, setBmiAdvice] = useState("")

  // 🏡 HANDLER: REMEDIES INITIAL
  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!userName || !symptoms) return
    setShowLeadForm(true)
  }

  // 🏡 HANDLER: REMEDIES FINAL WITH LEAD LOCK
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!whatsapp) return

    const inputLower = symptoms.toLowerCase()
    let generatedRemedies = {
      title: "General Wellness & Immunity Boosting Care (सामान्य आरोग्य सल्ला)",
      items: [
        "दिवसभर कोमट पाणी प्या, यामुळे घसा आणि पोटाला आराम मिळतो. (Drink warm water throughout the day).",
        "जड, तेलकट, तिखट किंवा खूप थंड पदार्थ खाणे टाळा. (Avoid heavy, oily, or cold food items).",
        "ताजा आल्याचा चहा किंवा हळद घातलेले दूध प्यावे. (Consume fresh ginger tea or warm turmeric milk)."
      ],
      doctorNote: "Visit local clinics like Ayush General Hospital or nearby certified practitioners for a professional diagnosis."
    }

    if (inputLower.includes("cough") || inputLower.includes("cold") || inputLower.includes("सर्दी") || inputLower.includes("खोकला")) {
      generatedRemedies = {
        title: "Verified Remedies for Cough & Cold (सर्दी-खोकला घरगुती उपाय)",
        items: [
          "Steam Inhalation: गरम पाण्यात निलगिरी तेलाचे (Eucalyptus oil) १-२ थेंब टाकून दिवसातून २ वेळा वाफ घ्या.",
          "Golden Milk: रात्री झोपण्यापूर्वी कोमट दुधात अर्धा चमचा हळद आणि चिमूटभर मिरी पूड टाकून प्या.",
          "Herbal Kadha: तुळशीची पाने, किसलेले आले, काळी मिरी आणि मध एकत्र उकळून कोमट काढा हळूहळू घ्या."
        ],
        doctorNote: "🚨 महत्त्वाचा सल्ला: जर ३ दिवसांपेक्षा जास्त काळ तीव्र ताप किंवा श्वास घेण्यास त्रास होत असेल, तर त्वरित तज्ज्ञ डॉक्टरांचा सल्ला घ्या."
      }
    } else if (inputLower.includes("acidity") || inputLower.includes("stomach") || inputLower.includes("गॅस") || inputLower.includes("अपचन")) {
      generatedRemedies = {
        title: "Verified Remedies for Acidity & Indigestion (ॲसिडिटी आणि अपचन उपाय)",
        items: [
          "Jeera Water: १ चमचा जिरे पाण्यात उकळवून घ्या, ते थंड झाल्यावर जेवणानंतर पाणी प्या, गॅस कमी होईल.",
          "Cold Milk: छातीत जळजळ होत असल्यास अर्धा ग्लास थंड दूध (विना साखर) प्या, तात्काळ आराम मिळतो.",
          "Fennel Seeds: दुपारच्या आणि रात्रीच्या जेवणानंतर १ चमचा बडीशेप चावून खा, पचनक्रिया सुधारेल."
        ],
        doctorNote: "🚨 महत्त्वाचा सल्ला: जर जुनाट किंवा तीव्र छातीत जळजळ होत असेल, तर स्वतः गोळ्या न घेता तज्ज्ञ फिजिशियन कडून तपासणी करून घ्या."
      }
    }

    setRemedies(generatedRemedies)
    setShowLeadForm(false)
  }

  // 📊 HANDLER: BMI MATRIC MATHEMATICAL CALCULATOR
  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault()
    const w = parseFloat(weight)
    const ft = parseFloat(heightFeet)
    const inch = parseFloat(heightInches) || 0

    if (w > 0 && ft > 0) {
      // Convert feet and inches to total inches, then to meters (1 inch = 0.0254 meters)
      const totalInches = (ft * 12) + inch
      const heightInMeters = totalInches * 0.0254
      
      // BMI Standard Formula: weight (kg) / height^2 (m^2)
      const bmi = w / (heightInMeters * heightInMeters)
      const finalBmi = parseFloat(bmi.toFixed(1))
      setBmiResult(finalBmi)

      // Evaluation Logic based on clinical standards
      if (finalBmi < 18.5) {
        setBmiStatus("Underweight (वजन कमी आहे ⚠️)")
        setBmiAdvice("तुम्हाला पौष्टिक आहार आणि प्रथिनांची (Protein) गरज आहे. आहारात केळी, दूध, सुकामेवा समाविष्ट करा.")
      } else if (finalBmi >= 18.5 && finalBmi <= 24.9) {
        setBmiStatus("Normal & Healthy (एकदम परफेक्ट वजन! ✅)")
        setBmiAdvice("अभिनंदन! तुमचे वजन तुमच्या उंचीनुसार अगदी योग्य आहे. हे आरोग्य टिकवण्यासाठी रोज व्यायाम आणि संतुलित आहार सुरू ठेवा.")
      } else if (finalBmi >= 25 && finalBmi <= 29.9) {
        setBmiStatus("Overweight (वजन थोडे जास्त आहे ⚠️)")
        setBmiAdvice("वजन नियंत्रणात आणण्यासाठी गोड आणि तेलकट पदार्थ थोडे कमी करा. रोज किमान ३० मिनिटे वेगाने चालायला सुरुवात करा.")
      } else {
        setBmiStatus("Obese / Obesity (लठ्ठपणा धोक्याची पातळी 🚨)")
        setBmiAdvice("हृदय आणि साखरेचे आजार टाळण्यासाठी वजन कमी करणे अत्यंत गरजेचे आहे. कडक डाएट प्लॅनसाठी आमच्या तज्ज्ञांचा सल्ला घ्या.")
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* BREADCRUMB */}
        <div className="text-sm text-[#64748B] mb-4">
          Tools &rarr; Personal &rarr; <span className="text-[#2563EB] font-medium">Smart AI Health Suite</span>
        </div>

        {/* TOP INTERACTIVE SUB-TAB CONTROLLER */}
        <div className="flex rounded-xl bg-white p-1 border border-[#E2E8F0] shadow-sm max-w-md mb-8">
          <button 
            onClick={() => setActiveSubTab("remedies")}
            className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition-all ${activeSubTab === "remedies" ? "bg-[#0F172A] text-white shadow" : "text-[#64748B] hover:text-[#0F172A]"}`}
          >
            🩺 AI Home Remedies
          </button>
          <button 
            onClick={() => setActiveSubTab("bmi")}
            className={`flex-1 rounded-lg py-2.5 text-xs font-bold transition-all ${activeSubTab === "bmi" ? "bg-[#0F172A] text-white shadow" : "text-[#64748B] hover:text-[#0F172A]"}`}
          >
            📊 Premium BMI Calculator
          </button>
        </div>

        {/* ========================================================
            MODULE A: AI HOME REMEDIES WORKSPACE
           ======================================================== */}
        {activeSubTab === "remedies" && (
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1 bg-white border border-[#E2E8F0] rounded-xl p-6 h-fit shadow-sm">
              <form onSubmit={handleInitialSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">Your Name</label>
                  <input type="text" placeholder="e.g., Gopal Patil" required className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB]" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">Describe Mild Symptoms *</label>
                  <textarea rows={3} placeholder="उदा. २ दिवसांपासून खोकला आणि सर्दी आहे..." required className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB] resize-none" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
                </div>
                <button type="submit" className="w-full h-10 rounded-lg bg-[#2563EB] text-white font-bold text-sm hover:bg-[#2563EB]/90 transition-colors shadow">Get Safe Remedies</button>
              </form>
            </div>

            <div className="md:col-span-2 border border-[#E2E8F0] bg-white rounded-xl p-6 min-h-[350px] flex flex-col justify-start shadow-sm">
              <h2 className="text-md font-bold border-b border-[#E2E8F0] pb-3 mb-5 text-[#0F172A]">🏡 Verified Home Treatment Blueprint</h2>
              {!remedies && !showLeadForm && <div className="text-center my-auto py-12 text-[#64748B] text-sm">Fill out your mild wellness symptoms on the left.</div>}
              
              {showLeadForm && (
                <div className="border-2 border-[#2563EB]/20 rounded-xl p-6 my-auto max-w-sm mx-auto bg-[#F8FAFC]">
                  <form onSubmit={handleLeadSubmit} className="space-y-3 text-center">
                    <span className="bg-[#10B981]/10 text-[#10B981] text-xs px-2.5 py-0.5 rounded-full font-bold">🔒 Secure Access</span>
                    <h3 className="text-sm font-bold mt-2">Where should we save your report?</h3>
                    <input type="tel" placeholder="Your WhatsApp Number" required className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm bg-white mt-2" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} />
                    <button type="submit" className="w-full h-10 rounded-lg bg-[#0F172A] text-white font-bold text-sm shadow">Unlock Ayurvedic Remedies &rarr;</button>
                  </form>
                </div>
              )}

              {remedies && !showLeadForm && (
                <div className="space-y-5">
                  <div className="bg-[#10B981]/5 border border-[#10B981]/20 p-4 rounded-xl"><h3 className="font-bold text-[#10B981] text-sm">{remedies.title}</h3></div>
                  <ul className="space-y-3">{remedies.items.map((item: string, i: number) => (<li key={i} className="flex items-start gap-2 text-sm text-[#334155]"><strong>✓</strong> <span>{item}</span></li>))}</ul>
                  <div className="mt-8 pt-5 border-t border-[#FDE68A] bg-[#FFFBEB] p-4 rounded-xl text-xs text-[#B45309]">
                    <p className="font-bold">{remedies.doctorNote}</p>
                    <p className="text-[10px] text-[#64748B] mt-2">⚠️ Legal Disclaimer: This module provides educational care suggestions only. It does not replace clinical prescriptions.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================
            MODULE B: MOVED INTERACTIVE PREMIUM BMI CALCULATOR
           ======================================================== */}
        {activeSubTab === "bmi" && (
          <div className="grid gap-8 md:grid-cols-3">
            {/* BMI INPUT SHEET */}
            <div className="md:col-span-1 bg-white border border-[#E2E8F0] rounded-xl p-6 h-fit shadow-sm">
              <form onSubmit={calculateBMI} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">Your Weight (वजन - KG)</label>
                  <input type="number" placeholder="e.g., 70" required className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB]" value={weight} onChange={(e) => setWeight(e.target.value)} />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">Height (उंची - Feet)</label>
                    <input type="number" placeholder="e.g., 5" required className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB]" value={heightFeet} onChange={(e) => setHeightFeet(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-[#64748B] mb-1">Inches (इंच)</label>
                    <input type="number" placeholder="e.g., 6" className="w-full rounded-lg border border-[#E2E8F0] p-2.5 text-sm outline-none focus:border-[#2563EB]" value={heightInches} onChange={(e) => setHeightInches(e.target.value)} />
                  </div>
                </div>

                <button type="submit" className="w-full h-10 rounded-lg bg-[#2563EB] text-white font-bold text-sm hover:bg-[#2563EB]/90 transition-colors shadow">Calculate BMI Index</button>
              </form>
            </div>

            {/* BMI INTERACTIVE OUTPUT DISPLAY */}
            <div className="md:col-span-2 border border-[#E2E8F0] bg-white rounded-xl p-8 min-h-[350px] flex flex-col justify-center shadow-sm">
              {bmiResult === null ? (
                <div className="text-center text-[#64748B] text-sm py-12">
                  <p>तुमचे वजन आणि उंची डावीकडे भरा, तुमचा अचूक फिटनेस इंडेक्स इथे समजेल.</p>
                </div>
              ) : (
                <div className="space-y-6 text-center sm:text-left">
                  <div className="border-b border-[#E2E8F0] pb-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#64748B]">Your Calculated Score</span>
                      <h2 className="text-5xl font-black text-[#0F172A] mt-1">{bmiResult} <span className="text-sm font-medium text-[#64748B]">BMI Index</span></h2>
                    </div>
                    <div className="bg-[#2563EB]/5 border border-[#2563EB]/20 px-4 py-2 rounded-xl text-center">
                      <span className="text-xs text-[#64748B] block">Current Health Status</span>
                      <span className="text-md font-bold text-[#2563EB] mt-0.5 block">{bmiStatus}</span>
                    </div>
                  </div>

                  <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-xl">
                    <h4 className="font-bold text-sm text-[#0F172A] mb-1">💡 एक्सपर्ट आहार व आरोग्य सल्ला (Expert Advice):</h4>
                    <p className="text-sm text-[#475569] leading-relaxed mt-2">{bmiAdvice}</p>
                  </div>

                  {/* 🎯 LOCAL GYM & DOCTOR LEAD HOOK */}
                  <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                    <p className="text-emerald-800 font-medium">वजन नियंत्रणात आणण्यासाठी किंवा डाएट प्लॅनसाठी लातूरमधील सर्वोत्तम तज्ज्ञ डॉक्टरांशी संपर्क साधावा?</p>
                    <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noopener noreferrer" className="bg-[#0F172A] text-white px-4 py-2 rounded-lg font-bold whitespace-nowrap">Connect on WhatsApp &rarr;</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </main>
    </div>
  )
}