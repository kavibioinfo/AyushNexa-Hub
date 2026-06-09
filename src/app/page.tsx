"use client"

import { useState } from "react"
import Link from "next/link"

const VivahBanner = () => (
  <svg className="w-full block" viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="110" fill="#FDF6EE"/>
    <rect x="0" y="0" width="340" height="4" fill="#C0392B"/>
    <rect x="0" y="4" width="340" height="2" fill="#E8A020"/>
    <circle cx="30" cy="55" r="18" fill="#FCEBD8"/><circle cx="30" cy="55" r="11" fill="#F5C9A0"/><circle cx="30" cy="55" r="5" fill="#E8A020"/>
    <circle cx="310" cy="55" r="18" fill="#FCEBD8"/><circle cx="310" cy="55" r="11" fill="#F5C9A0"/><circle cx="310" cy="55" r="5" fill="#E8A020"/>
    <line x1="30" y1="37" x2="30" y2="28" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="30" y1="73" x2="30" y2="82" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="12" y1="55" x2="4" y2="55" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="48" y1="55" x2="56" y2="55" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="18" y1="43" x2="12" y2="37" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="42" y1="43" x2="48" y2="37" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="18" y1="67" x2="12" y2="73" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="42" y1="67" x2="48" y2="73" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="310" y1="37" x2="310" y2="28" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="310" y1="73" x2="310" y2="82" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="292" y1="55" x2="284" y2="55" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="328" y1="55" x2="336" y2="55" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="298" y1="43" x2="292" y2="37" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="322" y1="43" x2="328" y2="37" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="298" y1="67" x2="292" y2="73" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="322" y1="67" x2="328" y2="73" stroke="#E8A020" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="110" y="14" width="120" height="82" rx="5" fill="white" stroke="#C0392B" strokeWidth="1"/>
    <rect x="110" y="14" width="120" height="22" rx="5" fill="#C0392B"/>
    <rect x="110" y="28" width="120" height="8" fill="#C0392B"/>
    <text x="170" y="27" textAnchor="middle" fontSize="7.5" fill="white" fontWeight="700" fontFamily="serif">॥ विवाह बायोडाटा ॥</text>
    <rect x="192" y="42" width="28" height="32" rx="2" fill="#FCEBD8" stroke="#E8A020" strokeWidth="0.5" strokeDasharray="2,1"/>
    <circle cx="206" cy="54" r="7" fill="#E8A020" opacity=".35"/>
    <rect x="197" y="63" width="18" height="8" rx="1" fill="#E8A020" opacity=".2"/>
    <line x1="118" y1="42" x2="186" y2="42" stroke="#C0392B" strokeWidth="0.8" opacity=".25"/>
    <line x1="118" y1="50" x2="186" y2="50" stroke="#C0392B" strokeWidth="0.8" opacity=".25"/>
    <line x1="118" y1="58" x2="186" y2="58" stroke="#C0392B" strokeWidth="0.8" opacity=".25"/>
    <line x1="118" y1="66" x2="228" y2="66" stroke="#C0392B" strokeWidth="0.8" opacity=".25"/>
    <line x1="118" y1="74" x2="228" y2="74" stroke="#C0392B" strokeWidth="0.8" opacity=".25"/>
    <circle cx="145" cy="90" r="2.5" fill="#C0392B"/><circle cx="155" cy="88" r="2" fill="#E8A020"/>
    <circle cx="163" cy="87" r="1.5" fill="#C0392B"/><circle cx="170" cy="87" r="2.5" fill="#8B1A1A"/>
    <circle cx="177" cy="87" r="1.5" fill="#C0392B"/><circle cx="185" cy="88" r="2" fill="#E8A020"/>
    <circle cx="195" cy="90" r="2.5" fill="#C0392B"/>
    <path d="M145 90 Q170 96 195 90" fill="none" stroke="#C0392B" strokeWidth="0.8"/>
    <rect x="0" y="106" width="340" height="2" fill="#E8A020"/>
    <rect x="0" y="108" width="340" height="2" fill="#C0392B"/>
  </svg>
)

const ResumeBanner = () => (
  <svg className="w-full block" viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="110" fill="#EEF4FF"/>
    <rect x="0" y="0" width="340" height="4" fill="#2563EB"/>
    <rect x="60" y="82" width="220" height="5" rx="2" fill="#B5D4F4"/>
    <rect x="112" y="18" width="88" height="66" rx="4" fill="white" stroke="#85B7EB" strokeWidth="1"/>
    <circle cx="135" cy="35" r="10" fill="#E6F1FB" stroke="#378ADD" strokeWidth="0.8"/>
    <circle cx="135" cy="32" r="4" fill="#85B7EB"/>
    <path d="M126 44 Q135 39 144 44" fill="#85B7EB"/>
    <rect x="150" y="27" width="38" height="4" rx="2" fill="#378ADD" opacity=".7"/>
    <rect x="150" y="34" width="28" height="2.5" rx="1" fill="#85B7EB"/>
    <rect x="150" y="40" width="32" height="2.5" rx="1" fill="#85B7EB"/>
    <line x1="118" y1="50" x2="192" y2="50" stroke="#B5D4F4" strokeWidth="0.8"/>
    <rect x="118" y="55" width="62" height="2" rx="1" fill="#B5D4F4"/>
    <rect x="118" y="60" width="52" height="2" rx="1" fill="#B5D4F4"/>
    <rect x="118" y="65" width="58" height="2" rx="1" fill="#B5D4F4"/>
    <rect x="118" y="70" width="44" height="2" rx="1" fill="#B5D4F4"/>
    <rect x="174" y="20" width="20" height="10" rx="3" fill="#2563EB"/>
    <text x="184" y="28" textAnchor="middle" fontSize="6" fill="white" fontWeight="700">HIRED</text>
    <circle cx="78" cy="46" r="14" fill="#DBEAFE" stroke="#85B7EB" strokeWidth="0.5"/>
    <text x="78" y="44" textAnchor="middle" fontSize="10" fill="#185FA5">✓</text>
    <text x="78" y="54" textAnchor="middle" fontSize="6" fill="#185FA5" fontWeight="600">Ready</text>
    <circle cx="255" cy="52" r="13" fill="#DBEAFE" stroke="#85B7EB" strokeWidth="0.5"/>
    <text x="255" y="49" textAnchor="middle" fontSize="7" fill="#185FA5" fontWeight="600">PDF</text>
    <text x="255" y="59" textAnchor="middle" fontSize="6" fill="#185FA5">Export</text>
  </svg>
)

const ExpenseBanner = () => (
  <svg className="w-full block" viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="110" fill="#F0FDF4"/>
    <rect x="0" y="0" width="340" height="4" fill="#639922"/>
    <rect x="90" y="28" width="60" height="44" rx="5" fill="#3B6D11"/>
    <rect x="90" y="28" width="60" height="14" rx="5" fill="#27500A"/>
    <rect x="136" y="35" width="20" height="14" rx="7" fill="#639922" stroke="#27500A" strokeWidth="1"/>
    <circle cx="146" cy="42" r="3" fill="#27500A"/>
    <circle cx="170" cy="60" r="10" fill="#EF9F27" stroke="#BA7517" strokeWidth="1"/>
    <text x="170" y="64" textAnchor="middle" fontSize="9" fill="#633806" fontWeight="700">₹</text>
    <circle cx="192" cy="52" r="8" fill="#EF9F27" stroke="#BA7517" strokeWidth="1"/>
    <text x="192" y="56" textAnchor="middle" fontSize="8" fill="#633806" fontWeight="700">₹</text>
    <circle cx="210" cy="64" r="7" fill="#FAC775" stroke="#EF9F27" strokeWidth="0.8"/>
    <text x="210" y="68" textAnchor="middle" fontSize="7" fill="#633806" fontWeight="700">₹</text>
    <rect x="232" y="70" width="11" height="20" rx="2" fill="#97C459"/>
    <rect x="247" y="58" width="11" height="32" rx="2" fill="#639922"/>
    <rect x="262" y="48" width="11" height="42" rx="2" fill="#3B6D11"/>
    <rect x="277" y="62" width="11" height="28" rx="2" fill="#97C459"/>
    <line x1="228" y1="92" x2="292" y2="92" stroke="#27500A" strokeWidth="0.8" opacity=".4"/>
    <rect x="56" y="52" width="26" height="14" rx="3" fill="#EAF3DE" stroke="#97C459" strokeWidth="0.5"/>
    <text x="69" y="62" textAnchor="middle" fontSize="7" fill="#27500A" fontWeight="600">Save</text>
  </svg>
)

const CareerBanner = () => (
  <svg className="w-full block" viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="110" fill="#F5F3FF"/>
    <rect x="0" y="0" width="340" height="4" fill="#7F77DD"/>
    <path d="M38 92 Q100 80 162 60 Q222 40 302 28" fill="none" stroke="#AFA9EC" strokeWidth="10" strokeLinecap="round"/>
    <path d="M38 92 Q100 80 162 60 Q222 40 302 28" fill="none" stroke="white" strokeWidth="2" strokeDasharray="8,6" strokeLinecap="round"/>
    <line x1="100" y1="80" x2="100" y2="60" stroke="#534AB7" strokeWidth="1.5"/>
    <rect x="87" y="48" width="26" height="13" rx="2" fill="#534AB7"/>
    <text x="100" y="58" textAnchor="middle" fontSize="7" fill="white" fontWeight="600">10th</text>
    <line x1="175" y1="58" x2="175" y2="38" stroke="#7F77DD" strokeWidth="1.5"/>
    <rect x="160" y="26" width="32" height="13" rx="2" fill="#7F77DD"/>
    <text x="176" y="36" textAnchor="middle" fontSize="7" fill="white" fontWeight="600">Degree</text>
    <line x1="256" y1="37" x2="256" y2="16" stroke="#3C3489" strokeWidth="1.5"/>
    <rect x="240" y="10" width="32" height="13" rx="2" fill="#3C3489"/>
    <text x="256" y="20" textAnchor="middle" fontSize="7" fill="white" fontWeight="600">Career</text>
    <circle cx="54" cy="80" r="6" fill="#7F77DD"/>
    <line x1="54" y1="86" x2="54" y2="97" stroke="#7F77DD" strokeWidth="2" strokeLinecap="round"/>
    <line x1="54" y1="89" x2="48" y2="95" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="54" y1="89" x2="60" y2="95" stroke="#7F77DD" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="302" cy="28" r="12" fill="#EEEDFE" stroke="#7F77DD" strokeWidth="1"/>
    <text x="302" y="33" textAnchor="middle" fontSize="14" fill="#534AB7">★</text>
  </svg>
)

const BmiBanner = () => (
  <svg className="w-full block" viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="110" fill="#ECFDF5"/>
    <rect x="0" y="0" width="340" height="4" fill="#1D9E75"/>
    <rect x="68" y="76" width="62" height="8" rx="3" fill="#085041"/>
    <rect x="87" y="48" width="24" height="30" rx="2" fill="#0F6E56"/>
    <ellipse cx="99" cy="48" rx="28" ry="6" fill="#1D9E75"/>
    <ellipse cx="99" cy="48" rx="20" ry="4" fill="#5DCAA5"/>
    <line x1="99" y1="48" x2="118" y2="37" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    <circle cx="99" cy="48" r="3" fill="white"/>
    <text x="99" y="69" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">BMI</text>
    <rect x="52" y="26" width="34" height="14" rx="4" fill="#1D9E75" opacity=".15" stroke="#1D9E75" strokeWidth="0.5"/>
    <text x="69" y="37" textAnchor="middle" fontSize="8" fill="#085041" fontWeight="700">Free</text>
    <line x1="210" y1="90" x2="210" y2="44" stroke="#3B6D11" strokeWidth="2" strokeLinecap="round"/>
    <ellipse cx="210" cy="62" rx="18" ry="10" fill="#97C459" transform="rotate(-30 210 62)"/>
    <ellipse cx="210" cy="55" rx="14" ry="8" fill="#639922" transform="rotate(20 210 55)"/>
    <ellipse cx="210" cy="70" rx="16" ry="9" fill="#C0DD97" transform="rotate(-50 210 70)"/>
    <ellipse cx="270" cy="79" rx="25" ry="8" fill="#9FE1CB" stroke="#1D9E75" strokeWidth="0.8"/>
    <rect x="245" y="71" width="50" height="10" fill="#9FE1CB"/>
    <ellipse cx="270" cy="71" rx="25" ry="8" fill="#E1F5EE" stroke="#1D9E75" strokeWidth="0.8"/>
    <ellipse cx="270" cy="71" rx="16" ry="5" fill="#5DCAA5" opacity=".5"/>
    <path d="M258 67 Q260 60 258 53" fill="none" stroke="#1D9E75" strokeWidth="1" strokeLinecap="round" opacity=".6"/>
    <path d="M270 65 Q272 58 270 51" fill="none" stroke="#1D9E75" strokeWidth="1" strokeLinecap="round" opacity=".6"/>
    <path d="M282 67 Q284 60 282 53" fill="none" stroke="#1D9E75" strokeWidth="1" strokeLinecap="round" opacity=".6"/>
  </svg>
)

const EmiBanner = () => (
  <svg className="w-full block" viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="110" fill="#FFF8F0"/>
    <rect x="0" y="0" width="340" height="4" fill="#BA7517"/>
    <rect x="50" y="26" width="36" height="14" rx="4" fill="#EF9F27" opacity=".2" stroke="#EF9F27" strokeWidth="0.5"/>
    <text x="68" y="37" textAnchor="middle" fontSize="8" fill="#633806" fontWeight="700">Free</text>
    <polygon points="120,30 155,56 85,56" fill="#EF9F27"/>
    <rect x="93" y="56" width="54" height="32" rx="2" fill="#FAC775" stroke="#BA7517" strokeWidth="0.8"/>
    <rect x="111" y="68" width="14" height="20" rx="1" fill="#854F0B"/>
    <rect x="100" y="62" width="10" height="10" rx="1" fill="#BA7517" opacity=".5"/>
    <rect x="127" y="62" width="10" height="10" rx="1" fill="#BA7517" opacity=".5"/>
    <rect x="185" y="68" width="50" height="20" rx="5" fill="#EF9F27"/>
    <rect x="192" y="62" width="36" height="14" rx="4" fill="#FAC775"/>
    <circle cx="196" cy="90" r="7" fill="#854F0B" stroke="#633806" strokeWidth="1"/>
    <circle cx="196" cy="90" r="3" fill="#EF9F27"/>
    <circle cx="225" cy="90" r="7" fill="#854F0B" stroke="#633806" strokeWidth="1"/>
    <circle cx="225" cy="90" r="3" fill="#EF9F27"/>
    <rect x="196" y="64" width="12" height="9" rx="2" fill="#85B7EB" opacity=".7"/>
    <rect x="212" y="64" width="12" height="9" rx="2" fill="#85B7EB" opacity=".7"/>
    <ellipse cx="285" cy="80" rx="18" ry="5" fill="#EF9F27" stroke="#BA7517" strokeWidth="0.8"/>
    <rect x="267" y="68" width="36" height="12" fill="#EF9F27"/>
    <ellipse cx="285" cy="68" rx="18" ry="5" fill="#FAC775" stroke="#BA7517" strokeWidth="0.8"/>
    <rect x="267" y="58" width="36" height="12" fill="#FAC775"/>
    <ellipse cx="285" cy="58" rx="18" ry="5" fill="white" stroke="#EF9F27" strokeWidth="0.8"/>
    <text x="285" y="62" textAnchor="middle" fontSize="9" fill="#633806" fontWeight="800">₹</text>
    <text x="176" y="78" textAnchor="middle" fontSize="14" fill="#BA7517" fontWeight="700">=</text>
    <rect x="244" y="32" width="54" height="14" rx="7" fill="#FAEEDA" stroke="#EF9F27" strokeWidth="0.8"/>
    <text x="271" y="42" textAnchor="middle" fontSize="7.5" fill="#633806" fontWeight="700">EMI / Month</text>
  </svg>
)

const BusinessKitBanner = () => (
  <svg className="w-full block" viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="110" fill="#EEF4FF"/>
    <rect x="0" y="0" width="340" height="4" fill="#2563EB"/>
    <rect x="0" y="4" width="340" height="2" fill="#1E40AF"/>
    {/* Shop front */}
    <rect x="50" y="38" width="70" height="52" rx="3" fill="#1E3A8A"/>
    <rect x="50" y="38" width="70" height="18" rx="3" fill="#2563EB"/>
    <text x="85" y="51" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">SHOP</text>
    <rect x="62" y="62" width="18" height="22" rx="1" fill="#93C5FD"/>
    <rect x="86" y="62" width="18" height="22" rx="1" fill="#93C5FD"/>
    <rect x="110" y="62" width="6" height="22" rx="1" fill="#1E3A8A"/>
    {/* WhatsApp bubble */}
    <rect x="136" y="22" width="68" height="28" rx="6" fill="#25D366"/>
    <path d="M140 50 L136 58 L152 52" fill="#25D366"/>
    <text x="170" y="34" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">WhatsApp</text>
    <text x="170" y="44" textAnchor="middle" fontSize="7" fill="white">Campaign ✓</text>
    {/* Growth chart */}
    <rect x="218" y="72" width="10" height="16" rx="1" fill="#60A5FA"/>
    <rect x="232" y="60" width="10" height="28" rx="1" fill="#2563EB"/>
    <rect x="246" y="46" width="10" height="42" rx="1" fill="#1E40AF"/>
    <rect x="260" y="54" width="10" height="34" rx="1" fill="#2563EB"/>
    <rect x="274" y="38" width="10" height="50" rx="1" fill="#1E3A8A"/>
    <line x1="214" y1="90" x2="288" y2="90" stroke="#93C5FD" strokeWidth="0.8" opacity=".5"/>
    {/* Star reviews */}
    <text x="148" y="72" textAnchor="middle" fontSize="9" fill="#FBBF24">★★★★★</text>
    <text x="148" y="82" textAnchor="middle" fontSize="6.5" fill="#1E3A8A" fontWeight="600">Google Reviews</text>
    {/* Rupee badge */}
    <rect x="285" y="18" width="40" height="16" rx="8" fill="#DBEAFE" stroke="#2563EB" strokeWidth="0.8"/>
    <text x="305" y="29" textAnchor="middle" fontSize="8" fill="#1E40AF" fontWeight="700">₹199</text>
  </svg>
)

const MedicalKitBanner = () => (
  <svg className="w-full block" viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="110" fill="#F0FDF4"/>
    <rect x="0" y="0" width="340" height="4" fill="#059669"/>
    <rect x="0" y="4" width="340" height="2" fill="#065F46"/>
    {/* Stethoscope */}
    <circle cx="75" cy="65" r="18" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5"/>
    <circle cx="75" cy="65" r="10" fill="#059669" opacity=".15"/>
    <circle cx="75" cy="65" r="5" fill="#059669" opacity=".4"/>
    <path d="M75 47 Q75 32 90 28 Q105 24 105 38" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="105" cy="37" r="4" fill="#065F46"/>
    <circle cx="100" cy="33" r="3" fill="#065F46"/>
    {/* Clinic building */}
    <rect x="130" y="32" width="80" height="58" rx="3" fill="#D1FAE5" stroke="#059669" strokeWidth="1"/>
    <rect x="130" y="32" width="80" height="20" rx="3" fill="#059669"/>
    <text x="170" y="46" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">CLINIC / OPD</text>
    <rect x="152" y="62" width="16" height="22" rx="1" fill="#6EE7B7"/>
    <rect x="178" y="62" width="16" height="22" rx="1" fill="#6EE7B7"/>
    {/* Cross on building */}
    <rect x="163" y="36" width="4" height="12" rx="1" fill="white"/>
    <rect x="159" y="40" width="12" height="4" rx="1" fill="white"/>
    {/* Patient chart */}
    <rect x="228" y="28" width="56" height="70" rx="3" fill="white" stroke="#6EE7B7" strokeWidth="1"/>
    <rect x="228" y="28" width="56" height="14" rx="3" fill="#059669"/>
    <text x="256" y="38" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">Patient Chart</text>
    <rect x="234" y="48" width="36" height="2.5" rx="1" fill="#6EE7B7"/>
    <rect x="234" y="54" width="28" height="2.5" rx="1" fill="#6EE7B7"/>
    <rect x="234" y="60" width="32" height="2.5" rx="1" fill="#6EE7B7"/>
    <rect x="234" y="66" width="20" height="2.5" rx="1" fill="#6EE7B7"/>
    <rect x="234" y="72" width="30" height="2.5" rx="1" fill="#6EE7B7"/>
    <rect x="234" y="78" width="24" height="2.5" rx="1" fill="#6EE7B7"/>
    {/* Price badge */}
    <rect x="46" y="24" width="42" height="16" rx="8" fill="#D1FAE5" stroke="#059669" strokeWidth="0.8"/>
    <text x="67" y="35" textAnchor="middle" fontSize="8" fill="#065F46" fontWeight="700">₹399</text>
  </svg>
)

export default function Home() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal")

  const personalTools = [
    {
      title: "Vivah Parichay Patrika",
      hindiTitle: "विवाह परिचय पत्रिका",
      description: "मराठी विवाह बायोडाटा तयार करा — फोटो, कुंडली व कौटुंबिक माहितीसह सुंदर पत्रिका मिनिटांत तयार होते.",
      category: "Marriage & Family",
      slug: "vivah-parichay",
      tag: "₹51 / ₹151 / ₹251",
      tagStyle: "bg-[#FFF8E7] text-[#8B5A00] border-[#E8A020]/40",
      ctaColor: "text-[#C0392B] group-hover:text-[#8B1A1A]",
      borderColor: "border-[#C0392B]/40 hover:border-[#C0392B]",
      dividerColor: "border-[#C0392B]/10",
      catColor: "text-[#8B1A1A]",
      cta: "आत्ताच तयार करा — Open Platform →",
      isVivah: true,
      Banner: VivahBanner,
    },
    {
      title: "Instant Resume Builder",
      description: "Create a modern, clean corporate resume with your profile photo instantly. Ready for regional, national and multi-national placement interviews.",
      category: "Professional Assets",
      slug: "resume-builder",
      tag: "₹49 Only",
      tagStyle: "text-[#2563EB] bg-[#2563EB]/5 border-[#2563EB]/10",
      ctaColor: "text-[#0F172A] group-hover:text-[#2563EB]",
      borderColor: "border-[#E2E8F0] hover:border-[#2563EB]",
      dividerColor: "border-[#E2E8F0]",
      catColor: "text-gray-400",
      cta: "Open Platform →",
      isVivah: false,
      Banner: ResumeBanner,
    },
    {
      title: "Smart Expense Tracker",
      description: "Track your daily expenses and manage savings. Unlock full asset balance sheet analytics for deep financial control.",
      category: "Financial Analytics",
      slug: "expense-tracker",
      tag: "₹99 Full Access",
      tagStyle: "text-[#27500A] bg-[#EAF3DE] border-[#97C459]/30",
      ctaColor: "text-[#0F172A] group-hover:text-[#3B6D11]",
      borderColor: "border-[#E2E8F0] hover:border-[#639922]",
      dividerColor: "border-[#E2E8F0]",
      catColor: "text-gray-400",
      cta: "Open Platform →",
      isVivah: false,
      Banner: ExpenseBanner,
    },
    {
      title: "FuturePath AI Career Consultant",
      description: "Discover high-growth career roadmaps built for Maharashtra students based on educational budget limits and psychometric aptitude core analysis.",
      category: "Education & Career",
      slug: "career-guidance",
      tag: "₹149 Only",
      tagStyle: "text-[#3C3489] bg-[#EEEDFE] border-[#AFA9EC]/30",
      ctaColor: "text-[#0F172A] group-hover:text-[#534AB7]",
      borderColor: "border-[#E2E8F0] hover:border-[#7F77DD]",
      dividerColor: "border-[#E2E8F0]",
      catColor: "text-gray-400",
      cta: "Open Platform →",
      isVivah: false,
      Banner: CareerBanner,
    },
    {
      title: "AI Home Remedies & BMI Suite",
      description: "Check your precise body mass index score and unlock safe, verified household wellness care frameworks in one simple click.",
      category: "Health & Fitness",
      slug: "health-assistant",
      tag: "100% Free",
      tagStyle: "text-[#065F46] bg-[#D1FAE5] border-[#6EE7B7]/40",
      ctaColor: "text-[#0F172A] group-hover:text-[#059669]",
      borderColor: "border-[#E2E8F0] hover:border-[#1D9E75]",
      dividerColor: "border-[#E2E8F0]",
      catColor: "text-gray-400",
      cta: "Open Free Platform →",
      isVivah: false,
      Banner: BmiBanner,
    },
    {
      title: "Easy Loan EMI Calculator",
      description: "Simulate Home, Car, or Personal Loan EMIs with granular monthly interest breakup layouts and interactive real-time data tracking charts.",
      category: "Financial Analytics",
      slug: "emi-calculator",
      tag: "100% Free",
      tagStyle: "text-[#633806] bg-[#FAEEDA] border-[#EF9F27]/30",
      ctaColor: "text-[#0F172A] group-hover:text-[#BA7517]",
      borderColor: "border-[#E2E8F0] hover:border-[#EF9F27]",
      dividerColor: "border-[#E2E8F0]",
      catColor: "text-gray-400",
      cta: "Open Free Platform →",
      isVivah: false,
      Banner: EmiBanner,
    },
  ]

  const businessKits = [
    {
      title: "Double Local Customer Enquiries In 30 Days",
      headline: "Never struggle with social media content or client retention again.",
      description: "100+ AI Prompts, WhatsApp Campaigns, Google Review Systems & Marketing Templates engineered to multiply retail sales.",
      valueStack: [
        "100 AI Business Prompts (₹1,999 value)",
        "WhatsApp Marketing Scripts (₹1,500 value)",
        "Google Review Growth Toolkit (₹1,500 value)",
        "30-Day Social Content Calendar (₹1,500 value)",
        "Canva Graphics & Excel Trackers (₹4,500 value)",
        "3 Premium Bonuses Included (Free)"
      ],
      originalPrice: "₹14,999",
      launchPrice: "₹199",
      slug: "business-kit",
      badge: "Launch Offer",
      targetAudience: "Shops, Gyms, Cafes & Salons",
      Banner: BusinessKitBanner,
      accentColor: "#2563EB",
      accentLight: "#EEF4FF",
    },
    {
      title: "Maximize OPD Footfall & Build Trusted Clinical Authority",
      headline: "Eliminate administrative scheduling hurdles and attract quality patients.",
      description: "Engineered specifically for Clinics, Dentists, and Practitioners. Contains automated booking reminders, treatment prompts, and review systems.",
      valueStack: [
        "Medical AI Prompts Library (₹2,999 value)",
        "Patient Care WhatsApp Scripts (₹2,500 value)",
        "Clinical HIPAA Google Review Kit (₹2,500 value)",
        "Patient Health Diet Charts in Marathi (₹4,500 value)",
        "Canva Clinical Banners & OPD Trackers (₹6,500 value)",
        "Direct WhatsApp Consultation Hook (Free)"
      ],
      originalPrice: "₹29,999",
      launchPrice: "₹399",
      slug: "medical-kit",
      badge: "Clinical Corporate Vault",
      targetAudience: "Clinics, Doctors & Dentists",
      Banner: MedicalKitBanner,
      accentColor: "#059669",
      accentLight: "#F0FDF4",
    }
  ]

  return (
    <div className="min-h-screen bg-white text-[#0F172A] font-sans antialiased">

      {/* ── NAVBAR ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#E2E8F0] px-4 sm:px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M250 80L380 320H320L250 180L180 320H120L250 80Z" fill="#0F172A"/>
                <path d="M380 200V320H330V240L290 320H250L310 200H380Z" fill="#2563EB"/>
              </svg>
              <Link href="/" className="text-md font-black tracking-tight text-[#0F172A]">
                AyushNexa <span className="text-[#2563EB]">Hub</span>
              </Link>
            </div>
            <span className="hidden lg:inline-block text-[9px] font-bold text-[#64748B] bg-[#F1F5F9] border border-[#E2E8F0] px-2 py-0.5 rounded uppercase tracking-wider">
              Tools • Templates • Growth Systems
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-wide text-[#64748B]">
            <a href="#explore" className="hover:text-[#2563EB] transition-colors">Tools</a>
            <a href="#explore" className="hover:text-[#2563EB] transition-colors">Growth Kits</a>
            <a href="#stats" className="hover:text-[#2563EB] transition-colors">Statistics</a>
            <a href="#founder" className="hover:text-[#2563EB] transition-colors">Credibility</a>
          </div>
          <a href="#explore" className="inline-flex h-9 items-center justify-center rounded-lg bg-[#0F172A] px-4 text-xs font-bold text-white shadow-sm hover:bg-[#2563EB] transition-colors">
            Get Started
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <header className="relative bg-gradient-to-b from-[#F8FAFC] to-white pt-24 pb-16 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF4FF] border border-[#DBEAFE] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse inline-block" />
            <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest">Maharashtra&apos;s #1 Digital Toolkit</span>
          </div>
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-[#0F172A] leading-[1.05]">
            Grow Faster.<br />
            <span className="bg-gradient-to-r from-[#2563EB] to-[#0F172A] bg-clip-text text-transparent">Work Smarter.</span>
          </h1>
          <p className="mt-6 text-lg text-[#64748B] max-w-2xl mx-auto font-medium leading-relaxed">
            Free AI Tools, Career Resources, Business Growth Kits and Digital Systems built for students, professionals and local businesses across Maharashtra.
          </p>
        </div>
      </header>

      {/* ── PRODUCTS ── */}
      <section id="explore" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">

          {/* Tab toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-xl bg-[#F1F5F9] p-1 border border-[#E2E8F0]">
              <button type="button" onClick={() => setActiveTab("personal")}
                className={`rounded-lg px-6 py-2 text-xs font-black tracking-wide uppercase transition-all ${activeTab === "personal" ? "bg-white text-[#2563EB] shadow-sm border border-gray-100" : "text-[#64748B]"}`}>
                🚀 Free Utility Tools
              </button>
              <button type="button" onClick={() => setActiveTab("business")}
                className={`rounded-lg px-6 py-2 text-xs font-black tracking-wide uppercase transition-all ${activeTab === "business" ? "bg-[#2563EB] text-white shadow-sm" : "text-[#64748B]"}`}>
                💼 Premium Growth Frameworks
              </button>
            </div>
          </div>

          {/* ── 6 TOOL CARDS ── */}
          {activeTab === "personal" && (
            <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
              {personalTools.map((tool, idx) => {
                const { Banner } = tool
                return (
                  <div key={idx} className={`relative overflow-hidden rounded-2xl border-2 ${tool.borderColor} hover:shadow-xl transition-all bg-white flex flex-col group`}>
                    <div className="overflow-hidden">
                      <Banner />
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-[9px] font-black uppercase tracking-wider ${tool.catColor}`}>{tool.category}</span>
                        <span className={`text-[9px] font-black px-2.5 py-0.5 rounded border ${tool.tagStyle}`}>{tool.tag}</span>
                      </div>
                      {tool.isVivah ? (
                        <>
                          <h3 className="text-md font-black text-[#0F172A]">{tool.hindiTitle}</h3>
                          <p className="text-[10px] font-semibold text-[#C0392B] mb-1">{tool.title}</p>
                        </>
                      ) : (
                        <h3 className="text-md font-black text-[#0F172A] mb-1">{tool.title}</h3>
                      )}
                      <p className="text-xs text-[#64748B] leading-relaxed flex-1">{tool.description}</p>
                      <div className={`mt-4 pt-4 border-t ${tool.dividerColor}`}>
                        <Link href={`/tools/${tool.slug}`} className={`text-xs font-black uppercase tracking-wide flex items-center gap-1 ${tool.ctaColor}`}>
                          {tool.cta}
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* ── 2 BUSINESS KIT CARDS ── */}
          {activeTab === "business" && (
            <div className="grid gap-8 max-w-4xl mx-auto">
              {businessKits.map((kit, idx) => {
                const { Banner } = kit
                return (
                  <div key={idx} className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden hover:shadow-xl transition-all group"
                    style={{ borderTop: `3px solid ${kit.accentColor}` }}>
                    {/* Banner */}
                    <div className="overflow-hidden">
                      <Banner />
                    </div>
                    <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-6">
                      {/* Left content */}
                      <div className="flex-1 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-black px-2.5 py-0.5 rounded-full border"
                            style={{ background: kit.accentLight, color: kit.accentColor, borderColor: kit.accentColor + "30" }}>
                            {kit.badge}
                          </span>
                          <span className="text-[10px] text-[#64748B] font-bold">• {kit.targetAudience}</span>
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl font-black text-[#0F172A] tracking-tight leading-tight">{kit.title}</h3>
                          <p className="text-xs font-bold mt-0.5" style={{ color: kit.accentColor }}>{kit.headline}</p>
                          <p className="text-xs text-[#64748B] mt-1.5 font-medium leading-relaxed">{kit.description}</p>
                        </div>
                        <div className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-4">
                          <span className="text-[10px] font-black text-[#0F172A] uppercase tracking-wider block border-b border-gray-200 pb-1.5 mb-2">
                            🎁 What&apos;s Included:
                          </span>
                          <div className="grid gap-1 sm:grid-cols-2 text-[11px] text-[#475569] font-semibold">
                            {kit.valueStack.map((item, i) => (
                              <div key={i} className="flex items-center gap-1">
                                <span style={{ color: kit.accentColor }}>✓</span> {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Right price box */}
                      <div className="w-full md:w-52 rounded-2xl border p-6 text-center flex flex-col justify-center shrink-0"
                        style={{ background: kit.accentLight, borderColor: kit.accentColor + "25" }}>
                        <span className="text-[10px] font-black uppercase tracking-widest block text-[#64748B]">Special Launch Price</span>
                        <div className="mt-2 flex items-baseline justify-center gap-2">
                          <span className="text-4xl font-black" style={{ color: kit.accentColor }}>{kit.launchPrice}</span>
                        </div>
                        <span className="text-xs text-[#94A3B8] line-through mt-0.5">{kit.originalPrice}</span>
                        <div className="mt-1 text-[9px] font-black uppercase px-3 py-0.5 rounded-full inline-block mx-auto"
                          style={{ background: kit.accentColor + "15", color: kit.accentColor }}>
                          Massive Savings
                        </div>
                        <Link href={`/products/${kit.slug}`}
                          className="w-full h-10 rounded-xl text-white font-bold text-xs flex items-center justify-center mt-5 shadow transition-all hover:opacity-90"
                          style={{ background: kit.accentColor }}>
                          Preview Blueprint →
                        </Link>
                        <p className="text-[9px] text-[#94A3B8] mt-2">Instant digital access</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── STATS ── */}
      <section id="stats" className="py-12 bg-white border-y border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
            {[
              ["500+", "Downloads Asset Packed", "#2563EB"],
              ["100+", "Verified AI Templates", "#0F172A"],
              ["11", "Premium Growth Kits", "#2563EB"],
              ["24/7", "Continuous Cloud Access", "#0F172A"]
            ].map(([num, label, col], i) => (
              <div key={i} className="p-5 text-center rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
                <h3 className="text-3xl font-black tracking-tight" style={{ color: col }}>{num}</h3>
                <p className="text-[10px] font-black text-[#64748B] uppercase tracking-widest mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR ── */}
      <section className="px-4 max-w-4xl mx-auto my-12">
        <div className="grid gap-2 grid-cols-2 sm:grid-cols-5 bg-[#F8FAFC] border border-[#E2E8F0] p-5 rounded-2xl text-center">
          {[["📍", "Built for Maharashtra"], ["⚡", "Instant Digital Access"], ["🛡️", "Secure Razorpay"], ["♾️", "Lifetime Access"], ["📱", "Mobile Friendly"]].map(([icon, label], i) => (
            <div key={i} className={`flex flex-col items-center justify-center p-1${i === 4 ? " col-span-2 sm:col-span-1" : ""}`}>
              <span className="text-xl">{icon}</span>
              <span className="text-[10px] font-black text-[#0F172A] uppercase tracking-wider mt-1.5">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOUNDER ── */}
      <section id="founder" className="py-16 bg-[#F8FAFC] border-t border-[#E2E8F0]">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="h-16 w-16 bg-[#0F172A] rounded-2xl flex items-center justify-center shadow-md shrink-0">
            <svg width="32" height="32" viewBox="0 0 500 500" fill="none">
              <path d="M250 80L380 320H320L250 180L180 320H120L250 80Z" fill="white"/>
              <path d="M380 200V320H330V240L290 320H250L310 200H380Z" fill="#2563EB"/>
            </svg>
          </div>
          <div>
            <span className="text-[10px] font-black text-[#2563EB] uppercase tracking-widest block">Brand Credibility Node</span>
            <h3 className="text-xl font-black text-[#0F172A] tracking-tight mt-0.5">Built by AyushNexa Digital Solutions</h3>
            <p className="text-xs text-[#64748B] mt-2 leading-relaxed font-medium">
              We are engineered specifically to help regional entrepreneurs, local businesses, doctors, clinics, gyms, salons, and coaching institutes streamline their tech stack. AyushNexa provides secure cloud utilities that maximize local visibility seamlessly across Maharashtra.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-[#E2E8F0] py-10 text-center text-xs text-[#64748B]">
        <div className="max-w-4xl mx-auto px-6 space-y-3">
          <div className="flex justify-center items-center gap-1 font-bold text-[#0F172A]">
            <span>🛡️</span><span>100% Secure SSL Payment Routing by Razorpay Network</span>
          </div>
          <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
            Encrypted lifetime access keys distributed directly upon successful authentication routing.
          </p>
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-400 gap-2">
            <span>&copy; 2026 AyushNexa Hub. All Rights Reserved. Engineered for Maharashtra.</span>
            <div className="flex gap-3 font-bold text-[#0F172A]">
              <a href="#explore">Free Utilities</a>
              <span>&bull;</span>
              <a href="#premium">Premium Vaults</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}