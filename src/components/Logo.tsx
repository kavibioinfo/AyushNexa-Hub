// src/components/Logo.tsx
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
        <path d="M250 80L380 320H320L250 180L180 320H120L250 80Z" fill="#0F172A" />
        <path d="M380 200V320H330V240L290 320H250L310 200H380Z" fill="#2563EB" />
      </svg>
      <span className="font-sans text-md font-black tracking-tight text-[#0F172A]">
        AyushNexa <span className="text-[#2563EB]">Hub</span>
      </span>
    </Link>
  );
}