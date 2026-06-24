 'use client';

import { useState, useEffect } from 'react';

export default function StickyBottomBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 md:hidden shadow-lg">
      <div className="flex gap-2 max-w-md mx-auto">
        <a
          href="#tools"
          className="flex-1 bg-slate-100 text-slate-900 text-center py-2.5 rounded-xl text-sm font-bold"
        >
          Free Tools
        </a>
        <a
          href="#kits"
          className="flex-1 bg-blue-600 text-white text-center py-2.5 rounded-xl text-sm font-bold"
        >
          Get Kits ₹199
        </a>
      </div>
    </div>
  );
}
