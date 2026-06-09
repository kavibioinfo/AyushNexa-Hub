"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-bold">काहीतरी तांत्रिक अडचण आली आहे!</h2>
      <button 
        onClick={() => reset()} 
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        पुन्हा प्रयत्न करा
      </button>
    </div>
  );
}