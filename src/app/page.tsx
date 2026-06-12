'use client';

import { useState } from "react";
import Link from "next/link";

// ---------- SVG Banners (unchanged) ----------
const VivahBanner = () => (
  <svg className="w-full block" viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="110" fill="#FDF6EE" />
    <rect x="0" y="0" width="340" height="4" fill="#C0392B" />
    <rect x="0" y="4" width="340" height="2" fill="#E8A020" />
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
);

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
);

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
);

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
);

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
);

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
);

const BusinessKitBanner = () => (
  <svg className="w-full block" viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="110" fill="#EEF4FF"/>
    <rect x="0" y="0" width="340" height="4" fill="#2563EB"/>
    <rect x="0" y="4" width="340" height="2" fill="#1E40AF"/>
    <rect x="50" y="38" width="70" height="52" rx="3" fill="#1E3A8A"/>
    <rect x="50" y="38" width="70" height="18" rx="3" fill="#2563EB"/>
    <text x="85" y="51" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">SHOP</text>
    <rect x="62" y="62" width="18" height="22" rx="1" fill="#93C5FD"/>
    <rect x="86" y="62" width="18" height="22" rx="1" fill="#93C5FD"/>
    <rect x="110" y="62" width="6" height="22" rx="1" fill="#1E3A8A"/>
    <rect x="136" y="22" width="68" height="28" rx="6" fill="#25D366"/>
    <path d="M140 50 L136 58 L152 52" fill="#25D366"/>
    <text x="170" y="34" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">WhatsApp</text>
    <text x="170" y="44" textAnchor="middle" fontSize="7" fill="white">Campaign ✓</text>
    <rect x="218" y="72" width="10" height="16" rx="1" fill="#60A5FA"/>
    <rect x="232" y="60" width="10" height="28" rx="1" fill="#2563EB"/>
    <rect x="246" y="46" width="10" height="42" rx="1" fill="#1E40AF"/>
    <rect x="260" y="54" width="10" height="34" rx="1" fill="#2563EB"/>
    <rect x="274" y="38" width="10" height="50" rx="1" fill="#1E3A8A"/>
    <line x1="214" y1="90" x2="288" y2="90" stroke="#93C5FD" strokeWidth="0.8" opacity=".5"/>
    <text x="148" y="72" textAnchor="middle" fontSize="9" fill="#FBBF24">★★★★★</text>
    <text x="148" y="82" textAnchor="middle" fontSize="6.5" fill="#1E3A8A" fontWeight="600">Google Reviews</text>
    <rect x="285" y="18" width="40" height="16" rx="8" fill="#DBEAFE" stroke="#2563EB" strokeWidth="0.8"/>
    <text x="305" y="29" textAnchor="middle" fontSize="8" fill="#1E40AF" fontWeight="700">₹199</text>
  </svg>
);

const MedicalKitBanner = () => (
  <svg className="w-full block" viewBox="0 0 340 110" xmlns="http://www.w3.org/2000/svg">
    <rect width="340" height="110" fill="#F0FDF4"/>
    <rect x="0" y="0" width="340" height="4" fill="#059669"/>
    <rect x="0" y="4" width="340" height="2" fill="#065F46"/>
    <circle cx="75" cy="65" r="18" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5"/>
    <circle cx="75" cy="65" r="10" fill="#059669" opacity=".15"/>
    <circle cx="75" cy="65" r="5" fill="#059669" opacity=".4"/>
    <path d="M75 47 Q75 32 90 28 Q105 24 105 38" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="105" cy="37" r="4" fill="#065F46"/>
    <circle cx="100" cy="33" r="3" fill="#065F46"/>
    <rect x="130" y="32" width="80" height="58" rx="3" fill="#D1FAE5" stroke="#059669" strokeWidth="1"/>
    <rect x="130" y="32" width="80" height="20" rx="3" fill="#059669"/>
    <text x="170" y="46" textAnchor="middle" fontSize="8" fill="white" fontWeight="700">CLINIC / OPD</text>
    <rect x="152" y="62" width="16" height="22" rx="1" fill="#6EE7B7"/>
    <rect x="178" y="62" width="16" height="22" rx="1" fill="#6EE7B7"/>
    <rect x="163" y="36" width="4" height="12" rx="1" fill="white"/>
    <rect x="159" y="40" width="12" height="4" rx="1" fill="white"/>
    <rect x="228" y="28" width="56" height="70" rx="3" fill="white" stroke="#6EE7B7" strokeWidth="1"/>
    <rect x="228" y="28" width="56" height="14" rx="3" fill="#059669"/>
    <text x="256" y="38" textAnchor="middle" fontSize="7" fill="white" fontWeight="700">Patient Chart</text>
    <rect x="234" y="48" width="36" height="2.5" rx="1" fill="#6EE7B7"/>
    <rect x="234" y="54" width="28" height="2.5" rx="1" fill="#6EE7B7"/>
    <rect x="234" y="60" width="32" height="2.5" rx="1" fill="#6EE7B7"/>
    <rect x="234" y="66" width="20" height="2.5" rx="1" fill="#6EE7B7"/>
    <rect x="234" y="72" width="30" height="2.5" rx="1" fill="#6EE7B7"/>
    <rect x="234" y="78" width="24" height="2.5" rx="1" fill="#6EE7B7"/>
    <rect x="46" y="24" width="42" height="16" rx="8" fill="#D1FAE5" stroke="#059669" strokeWidth="0.8"/>
    <text x="67" y="35" textAnchor="middle" fontSize="8" fill="#065F46" fontWeight="700">₹399</text>
  </svg>
);

// ---------- Main Component ----------
export default function Home() {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal");

  const personalTools = [
    {
      title: "Vivah Parichay Patrika",
      hindiTitle: "विवाह परिचय पत्रिका",
      description: "Generate beautiful Marathi marriage biodata with photo, kundali and family details in minutes. Effortlessly shareable PDF.",
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
      floatingBadge: { text: "🔥 Trending", color: "bg-red-500 text-white" },
      chips: ["Marathi", "Kundali", "PDF"],
      rating: "4.9 ★ (2k+)",
      ratingLabel: "Most Used Tool",
    },
    {
      title: "Instant Resume Builder",
      description: "Build recruiter-approved resumes in under 2 minutes. ATS-friendly, photo-ready, and optimized for top placements.",
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
      floatingBadge: { text: "⚡ Fast", color: "bg-blue-500 text-white" },
      chips: ["ATS", "PDF", "Instant"],
      rating: "4.8 ★ (3k+)",
      ratingLabel: "Top Rated",
    },
    {
      title: "Smart Expense Tracker",
      description: "Discover exactly where your money goes every month. Full balance sheet analytics and smart savings insights.",
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
      floatingBadge: { text: "📊 Popular", color: "bg-emerald-500 text-white" },
      chips: ["Analytics", "Monthly", "Savings"],
      rating: "4.7 ★ (1.5k+)",
      ratingLabel: "10K+ Downloads",
    },
    {
      title: "FuturePath AI Career Consultant",
      description: "AI-driven career roadmaps based on your education budget and psychometric profile. Tailored for Maharashtra students.",
      category: "Education & Career",
      slug: "career-guidance",
      tag: "₹49 Only",
      tagStyle: "text-[#3C3489] bg-[#EEEDFE] border-[#AFA9EC]/30",
      ctaColor: "text-[#0F172A] group-hover:text-[#534AB7]",
      borderColor: "border-[#E2E8F0] hover:border-[#7F77DD]",
      dividerColor: "border-[#E2E8F0]",
      catColor: "text-gray-400",
      cta: "Open Platform →",
      isVivah: false,
      Banner: CareerBanner,
      floatingBadge: { text: "✨ AI Powered", color: "bg-purple-500 text-white" },
      chips: ["AI", "Psychometric", "Roadmap"],
      rating: "4.9 ★ (800+)",
      ratingLabel: "New",
    },
    {
      title: "AI Home Remedies & BMI Suite",
      description: "Check your BMI instantly and unlock verified household wellness frameworks. Free health tools for everyone.",
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
      floatingBadge: { text: "🆓 Free", color: "bg-green-500 text-white" },
      chips: ["BMI", "Remedies", "Verified"],
      rating: "4.8 ★ (5k+)",
      ratingLabel: "Most Used",
    },
    {
      title: "Easy Loan EMI Calculator",
      description: "Simulate home, car or personal loan EMIs with interactive charts and monthly interest breakdowns.",
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
      floatingBadge: { text: "❤️ Popular", color: "bg-orange-500 text-white" },
      chips: ["EMI", "Loan", "Chart"],
      rating: "4.6 ★ (1k+)",
      ratingLabel: "Trusted",
    },
  ];

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
        "3 Premium Bonuses Included (Free)",
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
        "Direct WhatsApp Consultation Hook (Free)",
      ],
      originalPrice: "₹29,999",
      launchPrice: "₹399",
      slug: "medical-kit",
      badge: "Clinical Corporate Vault",
      targetAudience: "Clinics, Doctors & Dentists",
      Banner: MedicalKitBanner,
      accentColor: "#059669",
      accentLight: "#F0FDF4",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50 text-[#0F172A] font-sans antialiased relative overflow-x-hidden">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-100/10 rounded-full blur-3xl"></div>
      </div>

      {/* ── NAVBAR (enhanced with glass) ── */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-white/20 shadow-sm px-4 sm:px-6 py-3.5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <svg width="28" height="28" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M250 80L380 320H320L250 180L180 320H120L250 80Z" fill="#0F172A"/>
                <path d="M380 200V320H330V240L290 320H250L310 200H380Z" fill="#2563EB"/>
              </svg>
              <Link href="/" className="text-md sm:text-lg font-black tracking-tight text-[#0F172A]">
                AyushNexa <span className="text-[#2563EB]">Hub</span>
              </Link>
            </div>
            <span className="hidden lg:inline-block text-[9px] sm:text-[10px] font-bold text-[#64748B] bg-white/60 backdrop-blur border border-[#E2E8F0] px-2 py-0.5 rounded uppercase tracking-wider">
              Tools • Templates • Growth Systems
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-bold uppercase tracking-wide text-[#64748B]">
            <a href="#explore" className="hover:text-[#2563EB] transition-colors">Tools</a>
            <a href="#explore" className="hover:text-[#2563EB] transition-colors">Growth Kits</a>
            <a href="#stats" className="hover:text-[#2563EB] transition-colors">Statistics</a>
            <a href="#founder" className="hover:text-[#2563EB] transition-colors">Credibility</a>
          </div>
          <a href="#explore" className="inline-flex h-9 items-center justify-center rounded-xl bg-gradient-to-r from-[#0F172A] to-[#2563EB] px-5 text-xs font-bold text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            Get Started
          </a>
        </div>
      </nav>

      {/* ── HERO (emotional, gradient, social proof) ── */}
      <header className="relative pt-20 pb-16 sm:pt-28 sm:pb-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/60 backdrop-blur-sm border border-[#DBEAFE] shadow-sm mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            <span className="text-[11px] font-black text-[#2563EB] uppercase tracking-widest">🚀 Maharashtra's #1 Digital Toolkit</span>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight leading-[1.1] sm:leading-[1.05]">
            Grow Faster.<br />
            <span className="bg-gradient-to-r from-[#2563EB] via-[#1E40AF] to-[#0F172A] bg-clip-text text-transparent animate-gradient">
              Work Smarter.
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-[#475569] max-w-2xl mx-auto font-medium leading-relaxed">
            Free AI Tools, Business Systems, Career Resources and Digital Assets built for Maharashtra.
          </p>
          {/* Social proof row */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold text-[#64748B]">
            <span className="flex items-center gap-1">⭐⭐⭐⭐⭐ Trusted by Thousands</span>
            <span>•</span>
            <span>📦 500+ Downloads</span>
            <span>•</span>
            <span>🧠 100+ Templates</span>
            <span>•</span>
            <span>☁️ 24/7 Cloud Access</span>
          </div>
        </div>
      </header>

      {/* ── PRODUCTS SECTION ── */}
      <section id="explore" className="relative py-16 sm:py-20 z-10">
        <div className="max-w-6xl mx-auto px-4">
          {/* Tab toggle */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex rounded-2xl bg-white/50 backdrop-blur-sm p-1 border border-gray-200 shadow-sm">
              <button
                type="button"
                onClick={() => setActiveTab("personal")}
                className={`rounded-xl px-5 sm:px-7 py-2 text-xs sm:text-sm font-black tracking-wide uppercase transition-all duration-300 ${
                  activeTab === "personal"
                    ? "bg-white text-[#2563EB] shadow-md border border-gray-100"
                    : "text-[#64748B] hover:text-[#2563EB]"
                }`}
              >
                🚀 Free Utility Tools
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("business")}
                className={`rounded-xl px-5 sm:px-7 py-2 text-xs sm:text-sm font-black tracking-wide uppercase transition-all duration-300 ${
                  activeTab === "business"
                    ? "bg-[#2563EB] text-white shadow-md"
                    : "text-[#64748B] hover:text-[#2563EB]"
                }`}
              >
                💼 Premium Growth Frameworks
              </button>
            </div>
          </div>

          {/* Personal Tools Grid - Premium Cards */}
          {activeTab === "personal" && (
            <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 max-w-5xl mx-auto">
              {personalTools.map((tool, idx) => {
                const { Banner, floatingBadge, chips, rating, ratingLabel } = tool;
                return (
                  <div
                    key={idx}
                    className="group relative bg-white/70 backdrop-blur-sm rounded-3xl border border-gray-200/60 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-[#2563EB]/30 flex flex-col overflow-hidden"
                  >
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent z-10 pointer-events-none"></div>
                    
                    {/* Floating Badge */}
                    <div className={`absolute top-4 right-4 z-20 text-[10px] font-black px-2.5 py-1 rounded-full shadow-md ${floatingBadge.color}`}>
                      {floatingBadge.text}
                    </div>

                    {/* Banner with zoom on hover */}
                    <div className="overflow-hidden transition-transform duration-500 group-hover:scale-105">
                      <Banner />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-start mb-3 gap-2 flex-wrap">
                        <span className={`text-[11px] sm:text-xs font-black uppercase tracking-wider ${tool.catColor}`}>
                          {tool.category}
                        </span>
                        <span className={`text-[11px] sm:text-xs font-black px-2.5 py-0.5 rounded-full border ${tool.tagStyle}`}>
                          {tool.tag}
                        </span>
                      </div>
                      {tool.isVivah ? (
                        <>
                          <h3 className="text-xl sm:text-2xl font-black text-[#0F172A]">{tool.hindiTitle}</h3>
                          <p className="text-[11px] sm:text-xs font-semibold text-[#C0392B] mb-2">{tool.title}</p>
                        </>
                      ) : (
                        <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] mb-2">{tool.title}</h3>
                      )}
                      <p className="text-sm text-[#475569] leading-relaxed flex-1">{tool.description}</p>
                      
                      {/* Feature Chips */}
                      <div className="flex flex-wrap gap-2 my-4">
                        {chips.map((chip, i) => (
                          <span key={i} className="text-[10px] font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded-full">{chip}</span>
                        ))}
                      </div>

                      {/* Rating & Social Proof */}
                      <div className="flex items-center justify-between text-[10px] text-gray-500 mb-4">
                        <span className="flex items-center gap-1">{rating} {ratingLabel && `• ${ratingLabel}`}</span>
                        <span>⭐⭐⭐⭐⭐</span>
                      </div>

                      <div className={`mt-2 pt-4 border-t ${tool.dividerColor}`}>
                        <Link
                          href={`/tools/${tool.slug}`}
                          className={`group/btn inline-flex items-center gap-2 text-sm font-black uppercase tracking-wide transition-all duration-300 ${tool.ctaColor} hover:gap-3`}
                        >
                          {tool.cta}
                          <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Business Kits - Premium Pricing Cards */}
          {activeTab === "business" && (
            <div className="grid gap-10 max-w-5xl mx-auto">
              {businessKits.map((kit, idx) => {
                const { Banner } = kit;
                return (
                  <div
                    key={idx}
                    className="group relative bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                    style={{ borderTop: `4px solid ${kit.accentColor}` }}
                  >
                    {/* Shine */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"></div>
                    
                    <div className="overflow-hidden transition-transform duration-500 group-hover:scale-105">
                      <Banner />
                    </div>
                    <div className="p-6 sm:p-10 flex flex-col lg:flex-row gap-8">
                      <div className="flex-1 space-y-5">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="text-[10px] sm:text-xs font-black px-3 py-1 rounded-full border shadow-sm" style={{ background: kit.accentLight, color: kit.accentColor, borderColor: kit.accentColor + "40" }}>
                            {kit.badge}
                          </span>
                          <span className="text-[11px] sm:text-xs text-[#64748B] font-bold">• {kit.targetAudience}</span>
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">{kit.title}</h3>
                          <p className="text-sm font-bold mt-1" style={{ color: kit.accentColor }}>{kit.headline}</p>
                          <p className="text-sm text-[#475569] mt-2 leading-relaxed">{kit.description}</p>
                        </div>
                        <div className="bg-white/70 rounded-xl border border-gray-200 p-5">
                          <span className="text-[11px] font-black text-[#0F172A] uppercase tracking-wider block border-b pb-2 mb-3">🎁 What's Included:</span>
                          <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 text-xs text-[#475569] font-semibold">
                            {kit.valueStack.map((item, i) => (
                              <div key={i} className="flex items-center gap-1.5">
                                <span style={{ color: kit.accentColor }}>✓</span> {item}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Price Card */}
                      <div className="w-full lg:w-64 rounded-2xl border p-6 text-center flex flex-col justify-center shadow-lg bg-white/80" style={{ borderColor: kit.accentColor + "30" }}>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#64748B]">Special Launch Price</span>
                        <div className="mt-2 flex items-baseline justify-center gap-1">
                          <span className="text-4xl font-black" style={{ color: kit.accentColor }}>{kit.launchPrice}</span>
                        </div>
                        <span className="text-xs text-[#94A3B8] line-through mt-0.5">{kit.originalPrice}</span>
                        <div className="mt-2 text-[9px] font-black uppercase px-3 py-0.5 rounded-full inline-block mx-auto" style={{ background: kit.accentColor + "15", color: kit.accentColor }}>
                          Massive Savings
                        </div>
                        <Link href={`/products/${kit.slug}`} className="w-full h-11 rounded-xl text-white font-bold text-sm flex items-center justify-center mt-6 shadow-md transition-all hover:shadow-lg hover:scale-105" style={{ background: kit.accentColor }}>
                          Preview Blueprint →
                        </Link>
                        <p className="text-[9px] text-[#94A3B8] mt-3">Instant digital access</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── STATS SECTION (floating cards) ── */}
      <section id="stats" className="py-16 bg-white/30 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {[
              { num: "500+", label: "Downloads Asset Packed", color: "#2563EB", icon: "📦" },
              { num: "100+", label: "Verified AI Templates", color: "#0F172A", icon: "🧠" },
              { num: "11", label: "Premium Growth Kits", color: "#2563EB", icon: "🎁" },
              { num: "24/7", label: "Continuous Cloud Access", color: "#0F172A", icon: "☁️" },
            ].map((stat, i) => (
              <div key={i} className="group p-6 text-center rounded-2xl bg-white/60 backdrop-blur-md border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <h3 className="text-3xl sm:text-4xl font-black tracking-tight transition-colors duration-300" style={{ color: stat.color }}>{stat.num}</h3>
                <p className="text-[10px] sm:text-xs font-black text-[#64748B] uppercase tracking-widest mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST BAR (glass capsules) ── */}
      <section className="px-4 max-w-5xl mx-auto my-12">
        <div className="grid gap-3 grid-cols-2 sm:grid-cols-5 bg-white/40 backdrop-blur-md border border-gray-200 p-5 rounded-2xl shadow-sm">
          {[
            ["📍", "Built for Maharashtra"],
            ["⚡", "Instant Digital Access"],
            ["🛡️", "Secure Razorpay"],
            ["♾️", "Lifetime Access"],
            ["📱", "Mobile Friendly"],
          ].map(([icon, label], i) => (
            <div key={i} className={`flex flex-col items-center justify-center p-2 ${i === 4 ? "col-span-2 sm:col-span-1" : ""}`}>
              <span className="text-xl sm:text-2xl">{icon}</span>
              <span className="text-[9px] sm:text-[10px] font-black text-[#0F172A] uppercase tracking-wider mt-1.5 text-center">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOUNDER (glass credibility card) ── */}
      <section id="founder" className="py-16 bg-white/40 backdrop-blur-sm border-y border-gray-200">
        <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-8">
          <div className="h-20 w-20 bg-gradient-to-br from-[#0F172A] to-[#2563EB] rounded-2xl flex items-center justify-center shadow-lg">
            <svg width="36" height="36" viewBox="0 0 500 500" fill="none">
              <path d="M250 80L380 320H320L250 180L180 320H120L250 80Z" fill="white"/>
              <path d="M380 200V320H330V240L290 320H250L310 200H380Z" fill="#2563EB"/>
            </svg>
          </div>
          <div className="text-center md:text-left">
            <span className="text-[11px] font-black text-[#2563EB] uppercase tracking-widest block">Brand Credibility Node</span>
            <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight mt-1">Built by AyushNexa Digital Solutions</h3>
            <p className="text-sm text-[#475569] mt-3 leading-relaxed font-medium max-w-xl">
              We are engineered specifically to help regional entrepreneurs, local businesses, doctors, clinics, gyms, salons, and coaching institutes streamline their tech stack. AyushNexa provides secure cloud utilities that maximize local visibility seamlessly across Maharashtra.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOOTER (premium startup style) ── */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-gray-200 py-10 text-center text-xs text-[#64748B]">
        <div className="max-w-5xl mx-auto px-6 space-y-4">
          <div className="flex justify-center items-center gap-2 font-bold text-[#0F172A] flex-wrap">
            <span>🛡️</span>
            <span>100% Secure SSL Payment Routing by Razorpay Network</span>
          </div>
          <p className="text-[10px] text-gray-400 max-w-sm mx-auto">
            Encrypted lifetime access keys distributed directly upon successful authentication routing.
          </p>
          <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center text-[10px] text-gray-400 gap-3">
            <span>&copy; 2026 AyushNexa Hub. All Rights Reserved. Engineered for Maharashtra.</span>
            <div className="flex gap-4 font-bold text-[#0F172A]">
              <a href="#explore" className="hover:text-[#2563EB]">Free Utilities</a>
              <span>&bull;</span>
              <a href="#explore" className="hover:text-[#2563EB]">Premium Vaults</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}