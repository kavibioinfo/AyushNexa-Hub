// app/tools/vivah-parichay/loading.tsx
import React from 'react';

export default function VivahParichayLoading() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 max-w-4xl mx-auto space-y-8 animate-pulse font-sans">
      
      {/* Top simulated bar */}
      <div className="flex items-center justify-between">
        <div className="h-10 w-40 bg-zinc-200 rounded-xl" />
        <div className="h-10 w-24 bg-zinc-200 rounded-xl" />
      </div>

      {/* Main skeleton card container */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-zinc-200/60 shadow-xl space-y-10">
        
        {/* Progress header dots */}
        <div className="flex items-center justify-between max-w-lg mx-auto">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <div key={idx} className="h-10 w-10 rounded-full bg-zinc-200" />
          ))}
        </div>

        {/* Big layout box */}
        <div className="space-y-6">
          <div className="h-8 w-48 bg-zinc-200 rounded-lg" />
          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div key={idx} className="space-y-2">
                <div className="h-4 w-32 bg-zinc-200 rounded" />
                <div className="h-12 w-full bg-zinc-150 rounded-xl" />
              </div>
            ))}
          </div>
        </div>

        {/* Buttons strip */}
        <div className="flex justify-between items-center pt-6 border-t font-sans">
          <div className="h-12 w-32 bg-zinc-200 rounded-xl" />
          <div className="h-12 w-32 bg-zinc-200 rounded-xl" />
        </div>

      </div>

      <div className="h-4 w-56 bg-zinc-200 rounded mx-auto" />

    </div>
  );
}
