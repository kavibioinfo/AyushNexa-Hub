'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Home, ArrowLeft, Heart, Sparkles, Share2 } from 'lucide-react';

export default function BiodataSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Soft overlay lights */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-amber-150/20 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-amber-100/30 rounded-full filter blur-3xl pointer-events-none" />

      <div className="relative bg-white rounded-3xl p-8 sm:p-12 max-w-xl w-full border border-zinc-200/60 shadow-2xl text-center space-y-6 z-10 overflow-hidden">
        
        {/* Confetti decoration */}
        <div className="absolute top-0 left-0 w-full h-2 bg-amber-600" />

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-emerald-500/10">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            {/* Sparkle badge */}
            <span className="absolute -top-1 -right-1 bg-amber-400 p-1.5 rounded-full text-slate-900 shadow animate-bounce">
              <Sparkles className="w-4 h-4 fill-current" />
            </span>
          </div>
        </div>

        {/* Marathi Greeting */}
        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
            🎉 अभिनंदन! डाऊनलोड यशस्वी!
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-950">
            तुमचा विवाह बायोडाटा यशस्वीरीत्या तयार झाला आहे!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-serif leading-relaxed">
            आता हा सुंदर, आकर्षक, आणि व्यावसायिक बायोडाटा तुम्ही तुमच्या नातेवाईकांशी व्हाट्सॲप किंवा इतर माध्यमांवर शेअर करू शकता.
          </p>
        </div>

        <span className="block border-t border-dashed border-zinc-200 my-6" />

        {/* Info checklist */}
        <div className="bg-zinc-50 rounded-2xl p-5 text-left text-xs space-y-2.5 border border-zinc-150">
          <div className="flex items-start gap-2 text-slate-700 font-bold font-sans">
            <span className="text-amber-600">💡</span>
            <span>पुढील बदल केव्हाही करा:</span>
          </div>
          <div className="text-slate-500 space-y-1.5 pl-6 list-disc font-sans">
            <p>• तुम्ही केव्हाही पुन्हा येऊन या बायोडाटामध्ये आवडीप्रमाणे फेरबदल (Edit) करू शकता.</p>
            <p>• तुमची माहिती मोबाईलमध्ये सुरक्षित स्थानिक साठवणुकीत (localStorage) सुरक्षित सेव्ह आहे.</p>
            <p>• नवीन फोटो किंवा १० पैकी इतर कोणतीही थीम निवडून तात्काळ दुसरे व्हर्जन डाऊनलोड करू शकता.</p>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <Link
            href="/tools/vivah-parichay/preview"
            className="w-full bg-white hover:bg-zinc-50 border-2 border-slate-900 text-slate-900 font-bold text-sm py-4 px-6 rounded-2xl transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>प्रीव्ह्यूवर परत जा</span>
          </Link>

          <Link
            href="/tools/vivah-parichay"
            className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm py-4 px-6 rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 hover:shadow-lg shadow-amber-200/30"
          >
            <Home className="w-4 h-4" />
            <span>मुख्य दालन (Home)</span>
          </Link>
        </div>

        <div className="text-center pt-2">
          <p className="text-[10px] text-zinc-400 font-mono">
            AyushNexa Hub • प्रीमियम डिजिटल विवाह सोबती
          </p>
        </div>

      </div>
    </div>
  );
}
