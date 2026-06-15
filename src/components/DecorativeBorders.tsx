// components/DecorativeBorders.tsx
import React from 'react';

// Simple SVG icons (you can replace with actual SVGs later)
export const GaneshaSVG = ({ color, className }: { color: string; className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill={color}>
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1" fill="none" />
    <path d="M12 6v6l4 2" stroke={color} strokeWidth="1.5" fill="none" />
  </svg>
);
export const SwastikSVG = (props: any) => <div {...props} style={{ color: props.color }}>卐</div>;
export const OmSVG = (props: any) => <div {...props} style={{ color: props.color, fontSize: '1.5rem' }}>ॐ</div>;
export const KalashSVG = (props: any) => <div {...props} style={{ color: props.color }}>🏺</div>;
export const CrossSVG = (props: any) => <div {...props} style={{ color: props.color }}>✝</div>;
export const KhandaSVG = (props: any) => <div {...props} style={{ color: props.color }}>⚔️</div>;
export const MandalaSVG = (props: any) => <div {...props} style={{ color: props.color }}>🌸</div>;

// Garland / Toran component
export const ToranGarland = ({ color }: { color: string }) => (
  <div className="w-full flex justify-center gap-1 my-1">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="w-4 h-4 rounded-full" style={{ backgroundColor: color, opacity: 0.6 }} />
    ))}
  </div>
);

// Corner decorative components (CSS-based)
export const PaisleyCorner = ({ color, className }: { color: string; className?: string }) => (
  <div className={`relative w-12 h-12 ${className}`}>
    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 rounded-tl-2xl" style={{ borderColor: color }} />
    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 rounded-br-2xl" style={{ borderColor: color }} />
  </div>
);

export const MandalaCorner = ({ color, className }: { color: string; className?: string }) => (
  <div className={`relative w-12 h-12 ${className}`}>
    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 rounded-tl-full" style={{ borderColor: color }} />
    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 rounded-br-full" style={{ borderColor: color }} />
  </div>
);

export const ModernCorner = ({ color, className }: { color: string; className?: string }) => (
  <div className={`w-12 h-12 ${className}`} style={{ borderTop: `4px solid ${color}`, borderLeft: `4px solid ${color}` }} />
);