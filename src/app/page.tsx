'use client';

import { useState } from 'react';
import Link from 'next/link';
import CountdownTimer from '@/components/CountdownTimer';
import Testimonials from '@/components/Testimonials';

// ─── ICONS (Lightweight SVGs) ───
const Icon = ({ path, className = 'w-5 h-5' }: { path: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const Icons = {
  heart: <Icon path="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  fileText: <Icon path="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8" />,
  wallet: <Icon path="M21 12V7H5a2 2 0 0 1 0-4h14v4 M16 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14v4 M16 16h5v-4h-5" />,
  compass: <Icon path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M12 8v4 M12 16h.01" />,
  activity: <Icon path="M22 12h-4l-3 9L9 3l-3 9H2" />,
  calculator: <Icon path="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z M8 6h8 M8 10h8 M8 14h4 M8 18h4" />,
  shoppingBag: <Icon path="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0" />,
  stethoscope: <Icon path="M4.5 12.75l6 6.09 6-6.09M12 18.84V4.5M4.5 12.75V4.5h15v8.25" />,
  check: <Icon path="M20 6L9 17l-5-5" />,
  arrowRight: <Icon path="M5 12h14M12 5l7 7-7 7" />,
  star: <Icon path="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
  zap: <Icon path="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />,
  download: <Icon path="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />,
  award: <Icon path="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />,
  clock: <Icon path="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2" />,
  chevronDown: <Icon path="M6 9l6 6 6-6" />,
  menu: <Icon path="M3 12h18M3 6h18M3 18h18" />,
  x: <Icon path="M18 6L6 18M6 6l12 12" />,
  shield: <Icon path="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  users: <Icon path="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75" />,
  messageCircle: <Icon path="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
};

// ─── DATA ───
const freeTools = [
  {
    title: 'Vivah Parichay Patrika',
    subtitle: 'विवाह परिचय पत्रिका',
    desc: 'Beautiful Marathi marriage biodata with photo, kundali & family details. Shareable PDF in minutes.',
    icon: Icons.heart,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    tag: '₹51 / ₹101 / ₹151',
    tagColor: 'bg-amber-100 text-amber-800',
    slug: 'vivah-parichay',
    cta: 'Create Biodata →',
    popular: true,
  },
  {
    title: 'Instant Resume Builder',
    desc: 'ATS-friendly resumes in under 2 minutes. Photo-ready, optimized for top placements.',
    icon: Icons.fileText,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    tag: '₹49 Only',
    tagColor: 'bg-blue-100 text-blue-800',
    slug: 'resume-builder',
    cta: 'Build Resume →',
    popular: false,
  },
  {
    title: 'Smart Expense Tracker',
    desc: 'Track where your money goes. Full analytics, balance sheets & smart savings insights.',
    icon: Icons.wallet,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    tag: '₹49 Full Access',
    tagColor: 'bg-emerald-100 text-emerald-800',
    slug: 'expense-tracker',
    cta: 'Track Expenses →',
    popular: false,
  },
  {
    title: 'FuturePath AI Career',
    desc: 'AI-driven career roadmaps for Maharashtra students. Budget-based & psychometric guidance.',
    icon: Icons.compass,
    color: 'text-violet-600',
    bg: 'bg-violet-50',
    tag: '₹49 Only',
    tagColor: 'bg-violet-100 text-violet-800',
    slug: 'career-guidance',
    cta: 'Get Roadmap →',
    popular: false,
  },
  {
    title: 'AI Home Remedies & BMI',
    desc: 'Check BMI instantly + verified household wellness frameworks. Completely free health tools.',
    icon: Icons.activity,
    color: 'text-teal-600',
    bg: 'bg-teal-50',
    tag: '100% Free',
    tagColor: 'bg-green-100 text-green-800',
    slug: 'health-assistant',
    cta: 'Use Free Tool →',
    popular: false,
  },
  {
    title: 'Easy Loan EMI Calculator',
    desc: 'Simulate home, car & personal loan EMIs with interactive charts & monthly breakdowns.',
    icon: Icons.calculator,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    tag: '100% Free',
    tagColor: 'bg-green-100 text-green-800',
    slug: 'emi-calculator',
    cta: 'Calculate EMI →',
    popular: false,
  },
];

const premiumKits = [
  {
    title: 'Business Growth Kit',
    headline: 'Double Local Customer Enquiries In 30 Days',
    desc: '100+ AI Prompts, WhatsApp Campaigns, Google Review Systems & Marketing Templates for retail businesses.',
    price: '₹199',
    oldPrice: '₹14,999',
    icon: Icons.shoppingBag,
    color: 'blue',
    features: [
      '100 AI Business Prompts',
      'WhatsApp Marketing Scripts',
      'Google Review Growth Toolkit',
      '30-Day Social Content Calendar',
      'Canva Graphics & Excel Trackers',
      '3 Premium Bonuses',
    ],
    audience: 'Shops, Gyms, Cafes & Salons',
    slug: 'business-kit',
  },
  {
    title: 'Medical Practice Kit',
    headline: 'Maximize OPD Footfall & Clinical Authority',
    desc: 'Automated booking reminders, treatment prompts, review systems & patient diet charts for clinics.',
    price: '₹399',
    oldPrice: '₹29,999',
    icon: Icons.stethoscope,
    color: 'emerald',
    features: [
      'Medical AI Prompts Library',
      'Patient Care WhatsApp Scripts',
      'Clinical Google Review Kit',
      'Patient Diet Charts (Marathi)',
      'Canva Clinical Banners & Trackers',
      'Direct WhatsApp Consultation',
    ],
    audience: 'Clinics, Doctors & Dentists',
    slug: 'medical-kit',
  },
];

const stats = [
  { num: '500+', label: 'Downloads', icon: Icons.download },
  { num: '100+', label: 'AI Templates', icon: Icons.zap },
  { num: '11', label: 'Growth Kits', icon: Icons.award },
  { num: '24/7', label: 'Cloud Access', icon: Icons.clock },
];

const trustPills = [
  { icon: '📍', text: 'Built for Maharashtra' },
  { icon: '⚡', text: 'Instant Access' },
  { icon: '🛡️', text: 'Secure Payment' },
  { icon: '♾️', text: 'Lifetime Access' },
  { icon: '📱', text: 'Mobile Friendly' },
];

const steps = [
  { num: '01', title: 'Choose Your Tool', desc: 'Pick from free utilities or premium growth kits.' },
  { num: '02', title: 'Pay Securely', desc: 'One-time payment via Razorpay. No subscriptions.' },
  { num: '03', title: 'Start Growing', desc: 'Instant download. Use forever. Get results fast.' },
];

const faqs = [
  { q: 'Are the free tools really free?', a: 'Yes. BMI Calculator, EMI Calculator, and Home Remedies are 100% free with no hidden charges.' },
  { q: 'What happens after I buy a premium kit?', a: 'You get instant digital access via email. Download all templates, prompts, and trackers immediately.' },
  { q: 'Is this only for Maharashtra businesses?', a: 'Our tools are optimized for Maharashtra, but anyone in India can use them. Content includes Marathi where relevant.' },
];

// ─── COMPONENTS ───

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 500 500" fill="none">
              <path d="M250 80L380 320H320L250 180L180 320H120L250 80Z" fill="white"/>
              <path d="M380 200V320H330V240L290 320H250L310 200H380Z" fill="#2563EB"/>
            </svg>
          </div>
          <span className="font-bold text-slate-900 text-lg tracking-tight">
            AyushNexa <span className="text-blue-600">Hub</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
          <a href="#tools" className="hover:text-blue-600 transition-colors">Free Tools</a>
          <a href="#kits" className="hover:text-blue-600 transition-colors">Premium Kits</a>
          <a href="#how" className="hover:text-blue-600 transition-colors">How It Works</a>
          <a href="#faq" className="hover:text-blue-600 transition-colors">FAQ</a>
        </div>

        <div className="hidden md:block">
          <a href="#kits" className="inline-flex items-center gap-1.5 bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors">
            Get Started {Icons.arrowRight}
          </a>
        </div>

        <button 
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
        >
          {menuOpen ? Icons.x : Icons.menu}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 py-4 space-y-3">
          <a href="#tools" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold text-slate-600 py-2">Free Tools</a>
          <a href="#kits" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold text-slate-600 py-2">Premium Kits</a>
          <a href="#how" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold text-slate-600 py-2">How It Works</a>
          <a href="#faq" onClick={() => setMenuOpen(false)} className="block text-sm font-semibold text-slate-600 py-2">FAQ</a>
          <a href="#kits" onClick={() => setMenuOpen(false)} className="block w-full text-center bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-semibold mt-2">
            Get Started
          </a>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  return (
    <section className="relative bg-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-20 sm:pt-24 sm:pb-28 text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-semibold text-blue-300 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          Maharashtra's #1 Digital Toolkit
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1]">
          Grow Faster.
          <br />
          <span className="text-blue-400">Work Smarter.</span>
        </h1>
        
        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Free AI tools, business systems, and digital assets built for Maharashtra. 
          From marriage biodata to business growth kits.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#tools" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/30">
            Explore Free Tools {Icons.arrowRight}
          </a>
          <a href="#kits" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-white/20 transition-colors">
            View Premium Kits
          </a>
        </div>

        <div className="mt-12 flex flex-wrap justify-center items-center gap-6 text-sm text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="text-amber-400">{'★'.repeat(5)}</span>
            <span className="font-semibold text-slate-300">Trusted by 2,000+ Users</span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="flex items-center gap-1.5">
            {Icons.check}
            <span>500+ Downloads</span>
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="flex items-center gap-1.5">
            {Icons.shield}
            <span>Secure Payment</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function ToolCard({ tool }: { tool: typeof freeTools[0] }) {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl ${tool.bg} ${tool.color} flex items-center justify-center`}>
          {tool.icon}
        </div>
        {tool.popular && (
          <span className="text-xs font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
            🔥 Popular
          </span>
        )}
      </div>
      
      <div className="mb-3">
        <h3 className="text-lg font-bold text-slate-900">{tool.title}</h3>
        {tool.subtitle && (
          <p className="text-sm font-semibold text-rose-600 mt-0.5">{tool.subtitle}</p>
        )}
      </div>
      
      <p className="text-sm text-slate-500 leading-relaxed mb-4">{tool.desc}</p>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${tool.tagColor}`}>
          {tool.tag}
        </span>
        <Link 
          href={`/tools/${tool.slug}`}
          className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all"
        >
          {tool.cta}
        </Link>
      </div>
    </div>
  );
}

function PremiumCard({ kit }: { kit: typeof premiumKits[0] }) {
  const colorMap: Record<string, { bg: string; border: string; text: string; btn: string; btnHover: string; light: string }> = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-600', btn: 'bg-blue-600', btnHover: 'hover:bg-blue-700', light: 'bg-blue-100' },
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600', btn: 'bg-emerald-600', btnHover: 'hover:bg-emerald-700', light: 'bg-emerald-100' },
  };
  const c = colorMap[kit.color];

  return (
    <div className="bg-white rounded-2xl border-2 border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className={`${c.bg} px-6 py-8 sm:px-8 sm:py-10`}>
        <div className="flex items-center gap-3 mb-4">
          <div className={`w-10 h-10 rounded-lg ${c.light} ${c.text} flex items-center justify-center`}>
            {kit.icon}
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{kit.audience}</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{kit.headline}</h3>
        <p className="mt-3 text-slate-600 leading-relaxed">{kit.desc}</p>
      </div>
      
      <div className="px-6 py-6 sm:px-8">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">What's Included:</p>
        <div className="grid gap-2.5">
          {kit.features.map((f, i) => (
            <div key={i} className="flex items-center gap-2.5 text-sm text-slate-600">
              <span className={`w-5 h-5 rounded-full ${c.light} ${c.text} flex items-center justify-center flex-shrink-0`}>
                <Icon path="M20 6L9 17l-5-5" className="w-3 h-3" />
              </span>
              {f}
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <CountdownTimer />
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{kit.price}</span>
              <span className="text-sm text-slate-400 line-through">{kit.oldPrice}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">One-time payment • Lifetime access</p>
          </div>
          <Link 
            href={`/products/${kit.slug}`}
            className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 ${c.btn} text-white px-6 py-3 rounded-xl font-bold ${c.btnHover} transition-colors shadow-md`}
          >
            Get Instant Access {Icons.arrowRight}
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="bg-white border-y border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-slate-100 text-slate-600 mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-black text-slate-900">{stat.num}</div>
              <div className="text-sm font-semibold text-slate-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how" className="bg-slate-50 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">How It Works</h2>
          <p className="mt-3 text-slate-500">Get started in 3 simple steps</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center hover:shadow-md transition-shadow">
                <div className="text-5xl font-black text-slate-100 mb-4">{step.num}</div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
              {i < 2 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                    <Icon path="M5 12h14M12 5l7 7-7 7" className="w-4 h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  return (
    <section id="faq" className="bg-white py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Common Questions</h2>
          <p className="mt-3 text-slate-500">Everything you need to know</p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-900 pr-4">{faq.q}</span>
                <span className={`text-slate-400 flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`}>
                  {Icons.chevronDown}
                </span>
              </button>
              {openIndex === i && (
                <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  return (
    <section className="bg-slate-50 border-y border-slate-200 py-6">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          {trustPills.map((pill, i) => (
            <div key={i} className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <span className="text-lg">{pill.icon}</span>
              <span>{pill.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 500 500" fill="none">
                <path d="M250 80L380 320H320L250 180L180 320H120L250 80Z" fill="white"/>
                <path d="M380 200V320H330V240L290 320H250L310 200H380Z" fill="#2563EB"/>
              </svg>
            </div>
            <span className="font-bold text-white text-lg">
              AyushNexa <span className="text-blue-400">Hub</span>
            </span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm font-semibold">
            <a href="#tools" className="hover:text-white transition-colors">Free Tools</a>
            <a href="#kits" className="hover:text-white transition-colors">Premium Kits</a>
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-white/10 text-center text-xs">
          <p className="flex items-center justify-center gap-2 mb-2">
            <span>🛡️</span>
            <span>100% Secure SSL Payment via Razorpay</span>
          </p>
          <p>© 2026 AyushNexa Hub. All Rights Reserved. Engineered for Maharashtra.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── MAIN PAGE ───
export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased">
      <Navbar />
      <Hero />
      <TrustBar />
      
      <section id="tools" className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
              Free Utility Tools
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Powerful Tools, Zero Cost
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Essential utilities for everyday needs. Some are completely free, others start at just ₹49.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {freeTools.map((tool, i) => (
              <ToolCard key={i} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <Stats />
      <Testimonials />
      
      <section id="kits" className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full mb-4">
              Limited Time Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              Premium Growth Frameworks
            </h2>
            <p className="mt-3 text-slate-500 max-w-xl mx-auto">
              Complete business systems with AI prompts, templates, and marketing tools. One-time purchase.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {premiumKits.map((kit, i) => (
              <PremiumCard key={i} kit={kit} />
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <FAQ />
      
      <section className="bg-slate-900 text-white py-16 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Ready to Grow Your Business?
          </h2>
          <p className="mt-4 text-slate-300 text-lg">
            Join 2,000+ users across Maharashtra using AyushNexa Hub to save time and scale faster.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#tools" className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/30">
              Start with Free Tools {Icons.arrowRight}
            </a>
            <a href="#kits" className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-white/20 transition-colors">
              Explore Premium Kits
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}