'use client';

import { useState, useEffect } from 'react';

export default function ExitPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !show) {
        setShow(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        <button 
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
        >
          ✕
        </button>
        
        <div className="text-center">
          <span className="text-4xl mb-2 block">🎁</span>
          <h3 className="text-xl font-black text-slate-900 mb-2">
            Wait! Don't Miss Out
          </h3>
          <p className="text-sm text-slate-600 mb-4">
            Get an extra <strong>₹50 off</strong> any premium kit if you buy in the next 10 minutes!
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <p className="text-amber-800 font-bold text-sm">Use code: LASTCHANCE50</p>
          </div>
          <a
           href="/products/business-kit?coupon=LASTCHANCE50"
           onClick={() => setShow(false)}
           className="block w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
           Claim My Discount →
          </a>
        </div>
      </div>
    </div>
  );
} 
