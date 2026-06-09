'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface ErrorProps {
  error?: Error & { digest?: string };
  reset?: () => void;
}

export default function VivahParichayError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Vivah-Parichay caught exception:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans text-center">
      <div className="bg-white rounded-3xl p-8 sm:p-12 max-w-md w-full border border-zinc-200 shadow-2xl space-y-6">
        
        {/* Error icon header */}
        <div className="flex justify-center text-red-650">
          <AlertTriangle className="w-16 h-16" />
        </div>

        {/* Marathi Warning information */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-red-750 bg-red-50 px-3 py-1 rounded-full uppercase tracking-wider">
            ⚠️ प्रणाली त्रुटी (System Exception)
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            काहीतरी अडचण आली आहे!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-serif leading-relaxed">
            कृपया हे पान रीलोड करून पहा किंवा मुख्य दालनावर परत जा. तुमची साठवलेली माहिती सुरक्षित राहील.
          </p>
        </div>

        <span className="block border-t border-dashed border-zinc-200 my-4" />

        {/* Error diagnosis (subtle) */}
        <p className="text-[10px] text-zinc-400 font-mono break-all line-clamp-2 max-w-xs mx-auto">
          अभिभावक कोड: {error?.message || 'unknown_digest_state'}
        </p>

        {/* Actions panel */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-slate-900 hover:bg-slate-850 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span>रीसेट करा (Reset)</span>
          </button>

          <Link
            href="/tools/vivah-parichay"
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs py-3.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-amber-200/30"
          >
            <Home className="w-4 h-4" />
            <span>मुख्य पान (Home)</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
