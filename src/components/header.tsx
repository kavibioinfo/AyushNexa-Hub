// src/components/header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="p-4 border-b">
      <Link href="/" className="font-black text-xl">AyushNexa Hub</Link>
    </header>
  );
}