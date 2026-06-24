 'use client';

import { useState, useEffect } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const format = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-center">
      <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
        ⏰ Launch Offer Ends In:
      </p>
      <div className="flex items-center justify-center gap-2 text-red-700 font-black text-xl">
        <span className="bg-red-100 rounded-lg px-2 py-1">{format(timeLeft.hours)}</span>
        <span>:</span>
        <span className="bg-red-100 rounded-lg px-2 py-1">{format(timeLeft.minutes)}</span>
        <span>:</span>
        <span className="bg-red-100 rounded-lg px-2 py-1">{format(timeLeft.seconds)}</span>
      </div>
    </div>
  );
}
