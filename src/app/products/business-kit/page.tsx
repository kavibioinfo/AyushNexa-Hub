"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import RazorpayButton from "@/components/RazorpayButton";

// ✅ Your actual Google Drive folder link
const GOOGLE_DRIVE_LINK = "https://drive.google.com/drive/folders/1y7EQxQfnMK0yIcA4XuuApbOPX5AgJpxJ?usp=sharing";

export default function BusinessKit() {
  const [activeFile, setActiveFile] = useState<string>("ai-prompts");
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [showPaywall, setShowPaywall] = useState<boolean>(false);

  // Check localStorage on mount
  useEffect(() => {
    const unlocked = localStorage.getItem("business_kit_unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  // Save unlock status when it changes
  useEffect(() => {
    if (isUnlocked) {
      localStorage.setItem("business_kit_unlocked", "true");
    }
  }, [isUnlocked]);

  // Kit files (unchanged)
  const kitFiles: Record<string, { title: string; subtitle: string; icon: string; valueText: string; solution: string; desc: string; preview: string; color: string }> = {
    "ai-prompts": {
      title: "AI Prompts Guide.pdf",
      subtitle: "१००+ कडक बिझनेस प्रॉम्प्ट्स",
      icon: "🤖",
      valueText: "मूल्य: ₹१,९९९",
      solution: "✍️ सोशल मीडिया पोस्ट काय टाकावी हा त्रास आता कायमचा संपवा!",
      color: "border-blue-500 bg-blue-50/40 text-blue-900",
      desc: "तुमच्या व्यवसायाची विक्री वाढवण्यासाठी ChatGPT ला नक्की काय सांगावे, याचे रेडीमेड साचे.",
      preview: `🎯 मोफत प्रिव्ह्यू प्रॉम्प्ट (AI ला काय सांगावे):
"माझे कपड्यांचे दुकान आहे. उन्हाळी सुट्ट्यांसाठी (Summer Sale) ग्राहकांना आकर्षित करणाऱ्या ३ वेगवेगळ्या फेसबुक जाहिरातींच्या मराठी स्क्रिप्ट्स तयार कर, ज्यामध्ये ग्राहकांना 'Buy 1 Get 1 Free' चा हुक असेल."`
    },
    "whatsapp-templates": {
      title: "WhatsApp Templates.pdf",
      subtitle: "ग्राहकांना खिळवून ठेवणारे मेसेजेस",
      icon: "💬",
      valueText: "मूल्य: ₹१,५००",
      solution: "📈 रेडी-टू-सेंड व्हॉट्सॲप कॅम्पेन्स वापरून जुने ग्राहक परत मिळवा!",
      color: "border-emerald-500 bg-emerald-50/40 text-emerald-900",
      desc: "फेस्टिव्हल ऑफर्स, डिस्काउंट्स आणि ग्राहकांना आपलंसं करणाऱ्या मराठी मेसेजेसच्या कडक स्क्रिप्ट्स.",
      preview: `🎯 व्हॉट्सॲप मेसेज सॅम्पल:
"💥 गुढीपाडवा स्पेशल धमाका! 💥
खास आमच्या नियमित ग्राहकांसाठी... दुकानातील सर्व नवीन स्टॉकवर मिळवा थेट ३०% ची कडक सूट! Counter वर हा मेसेज दाखवा आणि तुमची प्रिमियम ऑफर आजच अनलॉक करा!"`
    },
    "google-review": {
      title: "Google Review Kit.pdf",
      subtitle: "गुगल मॅप्स ५-स्टार रिव्ह्यू ट्रिक्स",
      icon: "⭐",
      valueText: "मूल्य: ₹१,५००",
      solution: "🥇 लातूर परिसरातील गुगल मॅप्सवर तुमचे दुकान नंबर १ वर आणा!",
      color: "border-amber-500 bg-amber-50/40 text-amber-900",
      desc: "ग्राहकांकडून आनंदाने ५-स्टार रिव्ह्यू कसे घ्यायचे, जेणेकरून तुमचे दुकान गुगलवर सर्वात वर दिसेल.",
      preview: `🎯 गुगल मॅप सिक्रेट टिप:
"तुमच्या दुकानाच्या बिलिंग काउंटर जवळ एक सुंदर QR कोड लावा आणि लिहा: 'तुमचा प्रामाणिक रिव्ह्यू आम्हाला नक्की द्या आणि पुढील बिलावर ५% डिस्काउंट मिळवा.' याने एका महिन्यात तुमचे १००+ रिव्ह्यू वाढतील!"`
    },
    "calendar": {
      title: "Festival Marketing Calendar.pdf",
      subtitle: "१२ महिन्यांचे सण आणि ऑफर्स",
      icon: "📅",
      valueText: "मूल्य: ₹१,०००",
      solution: "📅 कोणत्या सणाला कोणती कडक ऑफर काढायची याचा पूर्ण वार्षिक प्लॅनर!",
      color: "border-purple-500 bg-purple-50/40 text-purple-900",
      desc: "महाराष्ट्रातील मुख्य सणांना क्लिनिक किंवा दुकानाचे बॅनर्स कसे रन करावेत याचा आराखडा.",
      preview: `🎯 जून २०२६ चा प्लॅनर:
"शाळा आणि कॉलेजेस सुरू होत आहेत! मुलांच्या कपड्यांवर किंवा बुटांवर पालकांसाठी खास 'Back to School' शैक्षणिक डिस्काउंट ऑफर रन करा."`
    },
    "canva-links": {
      title: "Canva Templates Links.pdf",
      subtitle: "रेडीमेड रंगीत ग्राफिक्स डिझाईन्स",
      icon: "🎨",
      valueText: "मूल्य: ₹२,५००",
      solution: "🎨 मोबाईलवर १ क्लिकमध्ये बॅनर्स आणि फोटो बदलण्यासाठीचे रेडी लेआउट्स!",
      color: "border-pink-500 bg-pink-50/40 text-pink-900",
      desc: "मोबाईलवर सहज एडिट करता येणारे रेडीमेड सोशल मीडिया डिझाईन लिंक्स.",
      preview: `🔒 प्रिमियम लिंक सुरक्षित लॉक आहे.
पेमेंट पूर्ण झाल्यानंतर तुम्हाला थेट कॅनव्हा प्रिमियम (Editable Links) चा ॲक्सेस गुगल डॉकमध्ये मिळेल.`
    },
    "seo-guide": {
      title: "Local SEO Guide.pdf",
      subtitle: "लातूर गल्लीबोळात गुगल रँकिंग",
      icon: "📍",
      valueText: "मूल्य: ₹१,५००",
      solution: "🚀 जाहिरातींवर १ रुपयाही खर्च न करता गुगलवरून रोज मोफत ग्राहक मिळवा!",
      color: "border-red-500 bg-red-50/40 text-red-900",
      desc: "स्थानिक पातळीवर गुगल मॅप्सवरून थेट कॉल्स आणि ग्राहक खेचण्याची गुपिते.",
      preview: `🎯 लोकल रँकिंग गुपित:
"गुगल माय बिझनेसवर दर आठवड्याला तुमच्या दुकानाचा किंवा कामाचा १ नवीन फोटो अपलोड करा. गुगलचे अल्गोरिदम ॲक्टिव्ह दुकानांना सर्वात आधी वर दाखवते."`
    },
    "retention-kit": {
      title: "Customer Retention Kit.pdf",
      subtitle: "जुने ग्राहक परत आणणे",
      icon: "👛",
      valueText: "मूल्य: ₹१,५००",
      solution: "👛 जे ग्राहक ६ महिने दुकान विसरलेत, त्यांना पुन्हा दुकानात आणण्याची युक्ती!",
      color: "border-indigo-500 bg-indigo-50/40 text-indigo-900",
      desc: "ग्राहकांना पुन्हा सक्रिय करण्यासाठी कडक मराठी मेसेज फनल्स.",
      preview: `🎯 कस्टमर रिटेंशन साचा:
"नमस्कार [नाव], दुकानात तुम्ही बरेच दिवस भेट दिली नाहीये! खास तुमच्यासाठी आम्ही या आठवड्यात ₹१०० चा कडक डिस्काउंट कूपन पाठवत आहोत. लवकर भेट द्या!"`
    },
    "content-planner": {
      title: "30 Day Content Calendar.pdf",
      subtitle: "३0 दिवसांचे सोशल मीडिया रील्स प्लॅनर",
      icon: "🎥",
      valueText: "मूल्य: ₹१,५००",
      solution: "🎥 इंस्टाग्रामवर रोज नक्की काय व्हिडिओ टाकावा याचा ३० दिवसांचा प्लॅन!",
      color: "border-teal-500 bg-teal-50/40 text-teal-900",
      desc: "फेसबुक आणि इंस्टाग्रामवर रोज काय रील्स बनवाव्यात याचा रेडीमेड अजेंडा.",
      preview: `🎯 दिवस ४ चा रील्स प्लॅन:
"दुकानाचा मालक स्वतः कॅमेऱ्यासमोर उभा राहून सांगेल: 'अनेक ग्राहक मला विचारतात की आमचे प्रॉडक्ट्स खरे आहेत का? आज आम्ही लाईव्ह टेस्ट करणार आहोत!' अशी ५ सेकंदाची कडक रील बनवा!"`
    },
    "tracker": {
      title: "Marketing Tracker.xlsx",
      subtitle: "जाहिरातींचा आणि नफ्याचा हिशोब",
      icon: "📊",
      valueText: "मूल्य: ₹२,०००",
      solution: "📊 कोणत्या जाहिरातीवरून किती ग्राहक आले आणि किती नफा झाला, मोजा एका क्लिकवर!",
      color: "border-green-500 bg-green-50/40 text-green-900",
      desc: "नफ्याचा आणि बजेटचा हिशोब ठेवणारी प्रिमियम एक्सेल शीट.",
      preview: `🔒 प्रिमियम एक्सेल फाईल लॉक आहे.
पेमेंट यशस्वी झाल्यानंतर तुम्हाला डाउनलोड करण्यासाठीची मूळ प्रिमियम एक्सेल फाईल गुगल ड्राईव्ह लिंक स्वरूपात मिळेल.`
    }
  };

  // ✅ Payment success handler
  const handlePaymentSuccess = () => {
    setIsUnlocked(true);
    setShowPaywall(false);
    // Optionally open the Google Drive link immediately
    window.open(GOOGLE_DRIVE_LINK, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased pb-12">
      <Header />
      <main className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-10">
        {/* Hero section - unchanged except price display updated to ₹199 */}
        <div className="bg-[#0F172A] text-white p-5 sm:p-8 rounded-2xl shadow-md flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6 sm:mb-8 border border-slate-800">
          <div>
            <span className="bg-[#2563EB]/20 text-[#2563EB] border border-[#2563EB]/30 text-[10px] sm:text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              🔥 १५,००० किमतीचा खजिना फक्त १९९ मध्ये!
            </span>
            <h1 className="font-sans text-2xl sm:text-3xl font-black mt-3 text-white tracking-tight">
              💼 Local Business AI Growth Kit
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1.5 max-w-xl">
              कपड्यांचे दुकान, जिम, कॅफे, सलून किंवा रिटेल स्टोअरचा गल्ला दुप्पट करण्यासाठी ११ प्रिमियम फाईल्स, एआइ प्रॉम्प्ट्स आणि एक्सेल ट्रॅकर्सचा मास्टर खजिना.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 text-[10px] font-bold text-slate-300">
              <span>🎯 कोणासाठी:</span>
              {["क्लिनिक्स", "जिम", "कॅफे", "सलून", "कपड्यांचे दुकान", "रिटेल शॉप्स"].map((t, i) => (
                <span key={i} className="bg-slate-800 px-1.5 py-0.5 rounded">• {t}</span>
              ))}
            </div>
          </div>

          {/* PRICE CARD - updated to ₹199 */}
          <div className="bg-slate-900 border border-slate-800 p-5 rounded-xl text-center w-full lg:w-auto shrink-0">
            <span className="text-xs font-semibold text-slate-400 block">
              एकूण मूल्य: <span className="line-through text-red-400 font-sans">₹14,999</span>
            </span>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="text-3xl font-black text-white font-sans">₹199</span>
              <span className="text-xs text-slate-400 bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">
                98% OFF
              </span>
            </div>
            <button
              type="button"
              onClick={() => setShowPaywall(true)}
              className="w-full lg:w-48 h-10 bg-[#2563EB] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#2563EB]/90 transition-all mt-3"
            >
              Unlock All 11 Kits 🔒
            </button>
          </div>
        </div>

        {/* Bonus bar - unchanged */}
        <div className="mb-6 bg-purple-50 border border-purple-100 rounded-xl p-3 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs font-bold text-purple-900 text-center sm:text-left">
          <span>🎁 आज खरेदी केल्यास ३ बोनसेस अगदी मोफत: 1. QR Review Builder, 2. Lead Tracker Sheet, 3. Business Checklist!</span>
          <span className="text-[10px] bg-purple-200 px-2 py-0.5 rounded uppercase shrink-0">Free Bonus Included</span>
        </div>

        {/* File selector and preview - unchanged */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-2 max-h-[480px] overflow-y-auto pr-1 scrollbar-none">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#64748B] mb-2 px-1">
              📦 Included Marketing Materials ({Object.keys(kitFiles).length} फाईल्स)
            </h3>
            {Object.keys(kitFiles).map((slug) => (
              <button
                key={slug}
                type="button"
                onClick={() => setActiveFile(slug)}
                className={`w-full p-3 rounded-xl text-left border transition-all flex items-center justify-between gap-3 ${
                  activeFile === slug
                    ? "bg-white border-[#0F172A] shadow-sm ring-1 ring-[#0F172A]"
                    : "bg-white/60 border-[#E2E8F0] hover:bg-white"
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-8 w-8 bg-[#F8FAFC] rounded-lg flex items-center justify-center text-md shrink-0 border border-gray-100">
                    {kitFiles[slug].icon}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#0F172A] truncate">{kitFiles[slug].title}</h4>
                    <p className="text-[10px] text-gray-400 truncate mt-0.5">{kitFiles[slug].subtitle}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded shrink-0 font-sans">
                  {kitFiles[slug].valueText}
                </span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-5 sm:p-6 shadow-sm min-h-[380px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-2.5">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#2563EB]">
                  📄 Live Course Material Preview
                </span>
                <span className="text-xs text-gray-400 font-bold font-mono">{kitFiles[activeFile].title}</span>
              </div>
              <div className="mt-4">
                <span className="text-[10px] bg-emerald-50 text-emerald-700 font-black px-2 py-0.5 rounded uppercase tracking-wide">
                  {kitFiles[activeFile].solution}
                </span>
                <p className="text-xs text-[#64748B] mt-2 font-medium">{kitFiles[activeFile].desc}</p>
              </div>
              <div className={`mt-4 border-l-4 p-4 rounded-r-xl font-sans text-xs whitespace-pre-line leading-relaxed ${kitFiles[activeFile].color}`}>
                {kitFiles[activeFile].preview}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
              <p className="text-[#64748B] font-medium text-center sm:text-left">
                अशा सर्व ११ प्रिमियम फाईल्स डाऊनलोड करण्यासाठीचा सिक्रेट मार्ग त्वरित मिळवा.
              </p>
              <button type="button" onClick={() => setShowPaywall(true)} className="text-[#2563EB] font-bold text-xs whitespace-nowrap shrink-0">
                Unlock Premium Vault &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* REVEAL VAULT - uses the actual Google Drive link */}
        {isUnlocked && (
          <div className="mt-10 bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center shadow-inner">
            <span className="text-3xl block mb-2">🎉 विजयोत्सव! नादच खुळा सर!</span>
            <h3 className="text-lg font-black text-emerald-950">Local Business AI Growth Kit पूर्णपणे अनलॉक झाली आहे!</h3>
            <p className="text-xs text-emerald-800 mt-1">
              खालील बटनावर क्लिक करून तुमच्या व्यवसायाची प्रिमियम गुगल मास्टर व्हॉल्ट फाईल ताबडतोब ताब्यात घ्या.
            </p>
            <a
              href={GOOGLE_DRIVE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-11 px-8 bg-[#10B981] text-white font-black text-sm rounded-xl items-center shadow-lg"
            >
              🚀 प्रिमियम गुगल मास्टर फाईल उघडा
            </a>
          </div>
        )}
      </main>

      {/* PAYWALL - now uses real RazorpayButton with price ₹199 */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center border border-[#E2E8F0]">
            <span className="inline-block bg-blue-100 text-[#2563EB] text-xs px-3 py-1 rounded-full font-bold mb-3">
              👛 Master Kit Unlocking
            </span>
            <h3 className="text-lg font-black text-[#0F172A]">Unlock Master Kit</h3>
            <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
              ₹१४,९९९ मूल्य असलेल्या सर्व ११ फाईल्स फक्त ₹१९९ मध्ये मिळवा.
            </p>

            <div className="mt-5 space-y-2">
              {/* ✅ Real RazorpayButton with price 199 and userEmail (optional) */}
              <RazorpayButton
                amount={199}
                label="Pay ₹199 Securely"
                userEmail="" // Replace with actual user email if available
                onSuccess={handlePaymentSuccess}
              />

              <button
                type="button"
                onClick={() => setShowPaywall(false)}
                className="w-full h-10 bg-white border border-[#E2E8F0] text-xs text-gray-500 font-bold rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}