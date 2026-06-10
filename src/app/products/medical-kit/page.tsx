"use client";

import { useState, useEffect } from "react";
import Header from "@/components/header";
import RazorpayButton from "@/components/RazorpayButton"; // ✅ real payment

// ✅ Your actual Google Drive folder link
const GOOGLE_DRIVE_LINK = "https://drive.google.com/drive/folders/1YFulScEFxWJs3nBj0CrI6U6FAu-cc64F?usp=sharing";

export default function MedicalKit() {
  const [activeFile, setActiveFile] = useState<string>("ai-medical-prompts");
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [showPaywall, setShowPaywall] = useState<boolean>(false);

  // Check localStorage on mount
  useEffect(() => {
    const unlocked = localStorage.getItem("medical_kit_unlocked");
    if (unlocked === "true") {
      setIsUnlocked(true);
    }
  }, []);

  // Save unlock status when it changes
  useEffect(() => {
    if (isUnlocked) {
      localStorage.setItem("medical_kit_unlocked", "true");
    }
  }, [isUnlocked]);

  // 📁 Medical files (unchanged)
  const medicalFiles: Record<string, { title: string; subtitle: string; icon: string; desc: string; preview: string; color: string }> = {
    "ai-medical-prompts": {
      title: "AI Medical Prompts Guide.pdf",
      subtitle: "डॉक्टरांसाठी १००+ प्रिमियम AI प्रॉम्प्ट्स",
      icon: "🩺",
      color: "border-blue-500 bg-blue-50/40 text-blue-900",
      desc: "क्लिनिकची रुग्ण संख्या (Patient Footfall) वाढवण्यासाठी आणि आरोग्य जनजागृती पोस्ट्स ChatGPT कडून लिहून घेण्याचे साचे.",
      preview: `🎯 मोफत प्रिव्ह्यू प्रॉम्प्ट:
"मी लातूरमध्ये लहान मुलांचा डॉक्टर (Pediatrician) आहे. पावसाळ्यात पालकांनी मुलांची काळजी कशी घ्यावी, यावर ५ कडक आणि सोप्या टिप्स देणारी फेसबुक/इन्स्टाग्राम मराठी पोस्ट लिहून दे, ज्यामध्ये माझ्या क्लिनिकची वेळ आणि नंबर असेल."`
    },
    "patient-reminders": {
      title: "WhatsApp Patient Reminders.pdf",
      subtitle: "अपॉइंटमेंट आणि फॉलो-अप स्क्रिप्ट्स",
      icon: "💬",
      color: "border-emerald-500 bg-emerald-50/40 text-emerald-900",
      desc: "रुग्णांना वेळेवर औषधांची, लस देण्याची (Vaccination) किंवा पुढील तपासणीची आठवण करून देणारे रेडीमेड मेसेजेस.",
      preview: `🎯 व्हॉट्सॲप मेसेज सॅम्पल:
"आदरणीय [रुग्णाचे नाव], आपल्या दातांच्या उपचाराची (Dental Follow-up) वेळ उद्या दुपारी ४ वाजता आहे. कृपया वेळेवर उपस्थित राहून सहकार्य करावे. 
📍 आय्युशनॅक्सा डेंटल क्लिनिक, लातूर. 📞 संपर्क: [नंबर]"`
    },
    "google-review-doctors": {
      title: "Medical Google Review Kit.pdf",
      subtitle: "क्लिनिक गुगल मॅप रँकिंग सिक्रेट्स",
      icon: "⭐",
      color: "border-amber-500 bg-amber-50/40 text-amber-900",
      desc: "रुग्णांची गोपनियता (Privacy) जपून त्यांच्याकडून गुगल मॅप्सवर कायदेशीररीत्या ५-स्टार रिव्ह्यू घेण्याची स्ट्रॅटेजी.",
      preview: `🎯 मेडिकल गुगल मॅप गुपित टिप:
"तुमच्या क्लिनिकच्या प्रिस्क्रिप्शन पॅडच्या खाली किंवा व्हॉट्सॲप थँक्यू मेसेजमध्ये एक क्युआर कोड (QR Code) जोडा. त्यावर लिहा: 'आमची वैद्यकीय सेवा तुम्हाला कशी वाटली? आपला अमूल्य अभिप्राय गुगलवर नक्की नोंदवा.' याने तुमचे क्लिनिक गुगलवर टॉपला येईल."`
    },
    "healthcare-calendar": {
      title: "Healthcare Awareness Calendar.pdf",
      subtitle: "३६५ दिवसांचे जागतिक आरोग्य दिन मार्गदर्शक",
      icon: "📅",
      color: "border-purple-500 bg-purple-50/40 text-purple-900",
      desc: "जागतिक हृदय दिन, मधुमेह दिन किंवा रक्तदाब दिनाला क्लिनिकचे बॅनर्स आणि हेल्थ ऑफर्स कशा रन कराव्यात याचा वार्षिक प्लॅनर.",
      preview: `🎯 वर्ल्ड हार्ट डे (World Heart Day) प्लॅनर:
"सप्टेंबर महिन्यात हृदय दिनानिमित्त तुमच्या क्लिनिकमध्ये 'मोफत ईसीजी (ECG) किंवा ब्लड प्रेशर चेकींग कॅम्प' आयोजित करा. त्याचा मेसेज स्थानिक व्हॉट्सॲप ग्रुप्सवर कसा व्हायरल करावा, याची पूर्ण स्क्रिप्ट यात आहे."`
    },
    "canva-medical-links": {
      title: "Canva Medical Design Links.pdf",
      subtitle: "क्लिनिकचे रेडीमेड रंगीत बॅनर्स आणि पोस्ट्स",
      icon: "🎨",
      color: "border-pink-500 bg-pink-50/40 text-pink-900",
      desc: "फक्त मोबाईलवर १ क्लिक करून तुमच्या क्लिनिकचे नाव, फोटो आणि पदवी बदलण्यासाठीचे १००+ रेडीमेड कॅनव्हा डिझाईन्स.",
      preview: `🔒 प्रिमियम मेडिकल कॅनव्हा डिझाईन्स लॉक आहेत.
पेमेंट यशस्वी झाल्यानंतर तुम्हाला थेट सर्व क्लिनिक फेस्टिव्हल बॅनर्सच्या एडिटेबल लिंक्स (Editable Links) गुगल मास्टर व्हॉल्टमध्ये मिळतील.`
    },
    "doctor-branding": {
      title: "Doctor Personal Branding Guide.pdf",
      subtitle: "स्थानिक भागात तज्ज्ञ डॉक्टर म्हणून ब्रँडिंग",
      icon: "👑",
      color: "border-indigo-500 bg-indigo-50/40 text-indigo-900",
      desc: "लातूर किंवा तुमच्या परिसरात तुमच्या आजाराचे सर्वात तज्ज्ञ आणि विश्वासू डॉक्टर म्हणून स्वतःचा ब्रँड कसा उभा करावा याची मार्गदर्शिका.",
      preview: `🎯 पर्सनल ब्रँडिंग टिप:
"दर आठवड्याला आरोग्याशी संबंधित कोणत्याही १ चालू विषयावर (उदा. उन्हाळ्यातील उष्माघात) १ मिनिटाचा सोपा माहितीपर व्हिडिओ (Instagram Reel) बनवा. रुग्णांचा अशा डॉक्टरांवर विश्वास वेगाने वाढतो."`
    },
    "patient-education": {
      title: "Patient Education Materials.pdf",
      subtitle: "रुग्णांसाठी आहाराचे आणि काळजीचे तक्ते",
      icon: "📋",
      color: "border-teal-500 bg-teal-50/40 text-teal-900",
      desc: "डायबेटीस, हाय बीपी किंवा प्रेग्नन्सीमध्ये रुग्णांना झेरॉक्स करून देण्यासाठीचे सोपे घरगुती मराठी आहाराचे रेडीमेड तक्ते.",
      preview: `🎯 डायबेटीस आहार तक्ता (Sample):
"सकाळी ७ वाजता: विनासाखरेचा चहा आणि २ मारी बिस्किटे. सकाळी ९ वाजता: १ वाटी कोंडावलेला उपमा किंवा पोहे. दुपारचे जेवण: २ चपात्या, १ वाटी डाळ आणि भरपूर हिरवी कोशिंबीर..."`
    },
    "clinic-tracker": {
      title: "Clinic Growth Tracker.xlsx",
      subtitle: "रुग्ण संख्या आणि क्लिनिक उत्पन्नाचा हिशोब",
      icon: "📊",
      color: "border-green-500 bg-green-50/40 text-green-900",
      desc: "महिनाभरात क्लिनिकमध्ये किती नवीन रुग्ण आले, किती जुने आले आणि ओपीडी (OPD) मधून किती निव्वळ नफा झाला, हे मोजणारी कडक एक्सेल फाईल.",
      preview: `🔒 प्रिमियम एक्सेल ट्रॅकर लॉक आहे.
पेमेंट यशस्वी झाल्यानंतर तुम्हाला डाउनलोड करण्यासाठीची मूळ प्रिमियम एक्सेल फाईल गुगल ड्राईव्ह लिंक स्वरूपात मिळेल.`
    }
  };

  // ✅ Payment success handler
  const handlePaymentSuccess = () => {
    setIsUnlocked(true);
    setShowPaywall(false);
    // Open the Google Drive link in a new tab
    window.open(GOOGLE_DRIVE_LINK, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] antialiased pb-12">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-10">
        {/* Breadcrumb */}
        <div className="text-sm text-[#64748B] mb-3">
          Products → Growth Kits → <span className="text-[#2563EB] font-medium">Medical Professionals Vault</span>
        </div>

        {/* Top hero – price updated to ₹399 */}
        <div className="bg-[#1E3A8A] text-white p-6 sm:p-8 rounded-2xl shadow-md flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border border-blue-800">
          <div>
            <span className="bg-white/20 text-white border border-white/30 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              ⚕️ डॉक्टरांसाठी विशेष प्रिमियम डिजिटल व्हॉल्ट
            </span>
            <h1 className="font-sans text-2xl sm:text-4xl font-black mt-3 text-white tracking-tight">
              🩺 Medical Professionals AI Growth Kit
            </h1>
            <p className="text-blue-200 text-xs sm:text-sm mt-2 max-w-2xl">
              Doctors, Dentists, Clinics आणि हॉस्पिटल्सचे स्थानिक ब्रँडिंग आणि रुग्ण संख्या वेगाने वाढवणारा ९ प्रिमियम फाईल्स, एआय प्रॉम्प्ट्स आणि आहार तक्त्यांचा मास्टर खजिना.
            </p>
          </div>

          {/* Price card – updated to ₹399 */}
          <div className="bg-blue-950 border border-blue-900 p-5 rounded-xl text-center w-full lg:w-auto shrink-0">
            <span className="text-xs font-semibold text-blue-300 block">One-time Corporate Price</span>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="text-3xl font-black text-white font-sans">₹399</span>
              <span className="text-sm text-blue-400 line-through">₹29,999</span>
            </div>
            <button
              type="button"
              onClick={() => setShowPaywall(true)}
              className="w-full lg:w-48 h-10 bg-[#10B981] text-white font-bold text-xs rounded-xl shadow-md hover:bg-[#10B981]/90 transition-all mt-3"
            >
              Unlock Corporate Kit 🔒
            </button>
          </div>
        </div>

        {/* File selector and preview (unchanged) */}
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-2.5 max-h-[550px] overflow-y-auto pr-1 scrollbar-thin">
            <h3 className="text-xs font-black uppercase tracking-widest text-[#64748B] mb-2 px-1">
              ⚕️ Included Clinical Materials ({Object.keys(medicalFiles).length} फाईल्स)
            </h3>
            {Object.keys(medicalFiles).map((slug) => (
              <button
                key={slug}
                type="button"
                onClick={() => setActiveFile(slug)}
                className={`w-full p-3 rounded-xl text-left border transition-all flex items-center gap-3 ${
                  activeFile === slug
                    ? "bg-white border-[#1E3A8A] shadow-sm ring-1 ring-[#1E3A8A]"
                    : "bg-white/60 border-[#E2E8F0] hover:bg-white"
                }`}
              >
                <div className="h-9 w-9 bg-[#F8FAFC] rounded-lg flex items-center justify-center text-lg shrink-0 border border-gray-100">
                  {medicalFiles[slug].icon}
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-[#0F172A] truncate">{medicalFiles[slug].title}</h4>
                  <p className="text-[11px] text-[#64748B] truncate mt-0.5">{medicalFiles[slug].subtitle}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="lg:col-span-7 bg-white border border-[#E2E8F0] rounded-2xl p-6 sm:p-8 shadow-sm min-h-[400px] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center border-b border-[#E2E8F0] pb-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#1E3A8A]">
                  📄 Live Clinical Material Preview
                </span>
                <span className="text-xs text-gray-400 font-bold font-mono">{medicalFiles[activeFile].title}</span>
              </div>
              <h3 className="text-md font-bold text-[#0F172A] mt-4">{medicalFiles[activeFile].subtitle}</h3>
              <p className="text-xs text-[#64748B] mt-1">{medicalFiles[activeFile].desc}</p>
              <div className={`mt-5 border-l-4 p-4 rounded-r-xl font-sans text-xs whitespace-pre-line leading-relaxed ${medicalFiles[activeFile].color}`}>
                {medicalFiles[activeFile].preview}
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
              <p className="text-[#64748B] font-medium text-center sm:text-left">
                अशा सर्व प्रिमियम फाईल्स डाऊनलोड करण्यासाठीचा अधिकृत मार्ग त्वरित मिळवा.
              </p>
              <button type="button" onClick={() => setShowPaywall(true)} className="text-[#1E3A8A] font-bold text-xs whitespace-nowrap shrink-0">
                Unlock Premium Vault →
              </button>
            </div>
          </div>
        </div>

        {/* Revealed vault after unlock – uses actual Google Drive link */}
        {isUnlocked && (
          <div className="mt-10 bg-emerald-50 border border-emerald-200 p-8 rounded-2xl text-center shadow-inner">
            <span className="text-3xl block mb-2">🎉 विजयोत्सव! नादच खुळा सर!</span>
            <h3 className="text-lg font-black text-emerald-950">Medical AI Growth Kit पूर्णपणे अनलॉक झाली आहे!</h3>
            <p className="text-xs text-emerald-800 mt-1 max-w-xl mx-auto">
              खालील अधिकृत बटनावर क्लिक करून क्लिनिक ब्रँडिंगचे सर्व प्रिमियम प्रॉम्प्ट्स, पेशंट आहाराचे तक्ते आणि एक्सेल ट्रॅकर्सचा मास्टर खजिना ताबडतोब ताब्यात घ्या.
            </p>
            <a
              href={GOOGLE_DRIVE_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex h-11 px-8 bg-[#10B981] text-white font-black text-sm rounded-xl items-center shadow-lg hover:bg-[#10B981]/90 transition-all"
            >
              🚀 प्रिमियम गुगल मेडिकल फाईल उघडा (Access Vault)
            </a>
          </div>
        )}
      </main>

      {/* 🔒 PAYWALL with real RazorpayButton (₹399) */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl text-center border border-[#E2E8F0]">
            <span className="inline-block bg-blue-100 text-[#1E3A8A] text-xs px-3 py-1 rounded-full font-bold mb-3">
              ⚕️ Medical Kit Wallet
            </span>
            <h3 className="text-lg font-black text-[#0F172A]">Unlock Corporate Kit</h3>
            <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
              ₹२९,००० मूल्य असलेल्या सर्व ९ प्रिमियम फाईल्स, कॅनव्हा डिझाईन्स आणि क्लिनिक ट्रॅकर्सचा सुरक्षित साठा मिळवा.
            </p>
            <div className="mt-5 space-y-2">
              <RazorpayButton
                amount={399}
                label="Pay ₹399 Securely"
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