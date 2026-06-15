'use client';

import React from 'react';
import { BiodataState } from './types';
import { PREMIUM_THEMES } from './themes';

interface PreviewTemplateProps {
  state: BiodataState;
  customThemeId?: string;
}

// Beautiful traditional Ganesha icon matching theme colors
export const GaneshaIcon: React.FC<{ color?: string }> = ({ color = '#b91c1c' }) => (
  <svg viewBox="0 0 100 100" width="36" height="36" fill={color} xmlns="http://www.w3.org/2000/svg">
    <path d="M42,10 L58,10 L53,18 L47,18 Z" />
    <path d="M38,20 C42,17 58,17 62,20 L60,25 C55,23 45,23 40,25 Z" />
    <path d="M45,26 L55,26 L53,30 L47,30 Z" />
    <path d="M49,21 L51,21 L51,27 L49,27 Z" fill="#b91c1c" />
    <circle cx="50" cy="29" r="1.5" fill="#b91c1c" />
    <path d="M38,22 C25,23 20,38 34,44 C37,45 39,42 37,39 C29,36 30,28 38,27 Z" />
    <path d="M62,22 C75,23 80,38 66,44 C63,45 61,42 63,39 C71,36 70,28 62,27 Z" />
    <path d="M36,32 C42,28 58,28 64,32 C65,42 58,45 54,48 C51,51 51,55 53,60 C55,64 59,64 62,60 C64,57 65,58 64,61 C61,66 52,69 49,60 C47,53 48,49 51,46 C54,43 59,41 58,35 C58,34 42,34 42,35 C42,41 47,43 50,45 C51,46 51,47 50,47 C46,45 36,41 36,32 Z" />
    <path d="M41,35 L37,36 L41,37 Z" />
    <circle cx="34" cy="50" r="3" />
    <path d="M31,48 C28,52 35,58 38,55 Z" />
  </svg>
);

// Koyari/Mango leaf decorative topper overlay
export const TraditionalBorderMotif: React.FC<{ className?: string; color?: string }> = ({ className, color = '#9e1a1a' }) => (
  <svg viewBox="0 0 100 20" className={className} style={{ width: '224px', height: 'auto', margin: '0 auto', opacity: 0.35 }} fill={color}>
    <path d="M0,10 Q10,0 20,10 T40,10 T60,10 T80,10 T100,10" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="M10,5 Q15,15 20,5 Q25,15 30,5 T50,5 T70,5 T90,5" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2,2" />
  </svg>
);

export const PreviewTemplate: React.FC<PreviewTemplateProps> = ({ state, customThemeId }) => {
  const activeThemeId = customThemeId || state.themeId;
  const theme = PREMIUM_THEMES.find((t) => t.id === activeThemeId) || PREMIUM_THEMES[0];
  const pc = theme.primaryColor || '#b45309';
  
  // Resolve theme background colors elegantly
  const getThemeBg = (themeId: string) => {
    switch (themeId) {
      case 'traditional-marathi': return '#fffbeb';
      case 'royal-gold': return '#fafafa';
      case 'modern-premium': return '#f8fafc';
      case 'minimal-white': return '#ffffff';
      case 'community-classic': return '#fef2f2';
      case 'floral-premium': return '#fdf4ff';
      case 'elegant-beige': return '#fff7ed';
      case 'temple-heritage': return '#fffbeb';
      case 'luxury-crimson': return '#fff1f2';
      case 'contemporary-wedding': return 'linear-gradient(to top right, #f8fafc, #f0fdfa)';
      default: return '#fffbf2';
    }
  };

  const getThemeBorderStyle = (themeId: string, color: string) => {
    switch (themeId) {
      case 'traditional-marathi':
      case 'floral-premium':
      case 'temple-heritage':
        return `double 8px ${color}`;
      case 'royal-gold':
      case 'luxury-crimson':
        return `solid 6px ${color}`;
      case 'minimal-white':
      case 'modern-premium':
        return `solid 2px ${color}`;
      default:
        return `solid 4px ${color}`;
    }
  };

  const bg = getThemeBg(theme.id);
  const borderStyleForTheme = getThemeBorderStyle(theme.id, pc);

  // Hook for perfect, lag-free dynamic resizing on screens on any size
  const [scale, setScale] = React.useState(1);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        if (parent) {
          const parentWidth = parent.getBoundingClientRect().width;
          if (parentWidth > 0) {
            // Base pixel design is 794px width. Scale proportionally.
            const s = Math.min(1.05, parentWidth / 794);
            setScale(s);
          }
        }
      }
    };

    handleResize();

    if (typeof window === 'undefined') return;

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(handleResize);
      if (containerRef.current?.parentElement) {
        observer.observe(containerRef.current.parentElement);
      }
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // Compact Single-Line field mapping
  const F = (label: string, value: string | number | undefined) => {
    if (!value || String(value).trim() === '') return null;
    return (
      <div style={{ display: 'flex', fontSize: '10px', lineHeight: '1.6', borderBottom: '1px dashed #e5e7eb', padding: '1.5px 0' }}>
        <span style={{ width: '40%', color: '#6b7280', fontWeight: 600, flexShrink: 0 }}>{label}</span>
        <span style={{ color: '#111827', fontWeight: 700 }}>: {value}</span>
      </div>
    );
  };

  // Section titles mapping
  const renderSectionHeader = (emoji: string, titleMarathi: string, titleEnglish: string) => (
    <div style={{ fontSize: '11px', fontWeight: 900, borderBottom: `2px solid ${pc}`, paddingBottom: '3px', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '3px', color: pc }}>
      <span style={{ marginRight: '2px' }}>{emoji}</span>
      <span>{titleMarathi}</span>
      <span style={{ fontSize: '8px', color: '#9ca3af', fontWeight: 500, marginLeft: '2px' }}>({titleEnglish})</span>
    </div>
  );

  const box = (bg2: string): React.CSSProperties => ({
    background: bg2,
    border: '1px solid rgba(0,0,0,0.06)',
    borderRadius: '7px',
    padding: '7px 8px',
    boxSizing: 'border-box' as const,
  });

  return (
    <>
      <style>{`
        #biodata-print-area { font-family: 'Noto Sans Devanagari', 'Mangal', Arial, sans-serif; }
        @media print {
          @page { size: A4 portrait; margin: 0; }
          html, body { margin: 0 !important; padding: 0 !important; }
          body * { visibility: hidden !important; }
          #biodata-print-area, #biodata-print-area * { visibility: visible !important; }
          #biodata-print-area {
            position: fixed !important; top: 0 !important; left: 0 !important;
            width: 210mm !important; height: 297mm !important;
            margin: 0 !important; padding: 0 !important;
            overflow: hidden !important; box-shadow: none !important;
            transform: none !important; /* Force scale override to exactly 1 in physical print format */
          }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .biodata-scale-wrapper {
            height: auto !important;
            overflow: visible !important;
          }
        }
      `}</style>

      {/* Responsive Scaling Screen Wrapper */}
      <div
        ref={containerRef}
        className="biodata-scale-wrapper"
        style={{
          width: '100%',
          height: `${1123 * scale}px`,
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        {/* A4 Page layout: Designed beautifully at 794px width x 1123px height */}
        <div
          id="biodata-print-area"
          style={{
            width: '794px',
            height: '1123px',
            background: bg,
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            fontFamily: "'Noto Sans Devanagari', Arial, sans-serif",
            flexShrink: 0,
            boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)',
          }}
        >
          {/* Theme Dynamic Decorative Outer Border */}
          <div style={{ position: 'absolute', inset: '7px', border: borderStyleForTheme, opacity: 0.75, pointerEvents: 'none', boxSizing: 'border-box' }} />
          <div style={{ position: 'absolute', inset: '13px', border: `1px dashed ${pc}`, opacity: 0.35, pointerEvents: 'none', boxSizing: 'border-box' }} />

          {/* Theme-specific traditional header overlay for beautiful marathi aesthetic */}
          {theme.id === 'traditional-marathi' && (
            <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 5 }}>
              <TraditionalBorderMotif color={pc} />
            </div>
          )}

          {/* Main Content inside Borders */}
          <div style={{ position: 'absolute', inset: '20px', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden' }}>

            {/* HEADER */}
            <div style={{ textAlign: 'center', flexShrink: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2px', marginTop: theme.id === 'traditional-marathi' ? '20px' : '6px' }}>
                <GaneshaIcon color={pc} />
              </div>
              <div style={{ fontSize: '7.5px', fontWeight: 'bold', color: pc, letterSpacing: '2px', textTransform: 'uppercase' }}>|| श्री गणेशाय नमः ||</div>
              <div style={{ fontSize: '26px', fontWeight: 900, color: pc, lineHeight: 1.1, marginTop: '2px' }}>
                {state.candidateType === 'Groom' ? '💍 विवाह बायोडाटा' : '💍 विवाह परिचय पत्रिका'}
              </div>
              <div style={{ fontSize: '8px', color: '#9ca3af', fontStyle: 'italic', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Vivah Parichay Patrika (Marriage Biodata)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '3px' }}>
                <div style={{ height: '1.5px', width: '50px', background: `linear-gradient(to right, transparent, ${pc})` }} />
                <span style={{ fontSize: '10px' }}>🌸</span>
                <div style={{ height: '1.5px', width: '50px', background: `linear-gradient(to left, transparent, ${pc})` }} />
              </div>
            </div>

            {/* ROW 1: Personal Details & Custom Portrait slot side-by-side */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <div style={{ ...box('rgba(251,191,36,0.09)'), flex: 2 }}>
                {renderSectionHeader('👤', 'वैयक्तिक माहिती', 'Personal Details')}
                {F('पूर्ण नाव', state.personalDetails.fullName)}
                {F('जन्म तारीख', state.personalDetails.dateOfBirth)}
                {F('वय', state.personalDetails.age > 0 ? `${state.personalDetails.age} वर्षे` : undefined)}
                {F('उंची', state.personalDetails.height)}
                {F('वजन', state.personalDetails.weight)}
                {F('रक्त गट', state.personalDetails.bloodGroup)}
                {F('वर्ण', state.personalDetails.complexion)}
                {F('पत्ता', state.personalDetails.currentAddress)}
                {F('मूळ गाव', state.personalDetails.nativePlace)}
              </div>
              {state.optionalToggles.showPhoto && (
                <div style={{ width: '150px', flexShrink: 0 }}>
                  <div style={{ width: '150px', height: '180px', border: `3px solid ${pc}`, borderRadius: '7px', overflow: 'hidden', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                    {state.photoUrl ? (
                      <img src={state.photoUrl} alt="Photo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} referrerPolicy="no-referrer" />
                    ) : (
                      <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: '11px' }}>
                        <span style={{ fontSize: '24px', display: 'block', marginBottom: '2px' }}>📷</span>
                        भेट फोटो <br />
                        (Photo Slot)
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* ROW 2: Horoscope / Birth & Education side-by-side */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              {(state.optionalToggles.showBirthDetails || state.optionalToggles.showHoroscope) && (
                <div style={{ ...box('rgba(239,68,68,0.04)'), flex: 1 }}>
                  {renderSectionHeader('🪐', 'जन्म व कुंडली', 'Birth & Horoscope')}
                  {state.optionalToggles.showBirthDetails && F('जन्म वेळ', state.birthDetails.timeOfBirth)}
                  {state.optionalToggles.showBirthDetails && F('जन्म ठिकाण', state.birthDetails.placeOfBirth)}
                  {state.optionalToggles.showHoroscope && F('राशी', state.horoscope.rashi)}
                  {state.optionalToggles.showHoroscope && F('नक्षत्र', state.horoscope.nakshatra)}
                  {state.optionalToggles.showHoroscope && F('गोत्र', state.horoscope.gotra)}
                  {state.optionalToggles.showHoroscope && F('नाडी', state.horoscope.nadi)}
                  {state.optionalToggles.showHoroscope && F('गण', state.horoscope.gan)}
                  {state.optionalToggles.showHoroscope && F('मंगळ', state.horoscope.manglik)}
                  {state.optionalToggles.showHoroscope && F('पत्रिका उपलब्ध', state.horoscope.kundaliAvailable)}
                </div>
              )}
              {(state.optionalToggles.showEducation || state.optionalToggles.showOccupation) && (
                <div style={{ ...box('rgba(251,191,36,0.06)'), flex: 1 }}>
                  {renderSectionHeader('🎓', 'शिक्षण व करिअर', 'Education & Job')}
                  {state.optionalToggles.showEducation && F('शिक्षण', state.education.education)}
                  {state.optionalToggles.showEducation && F('पदवी', state.education.degree)}
                  {state.optionalToggles.showEducation && F('कॉलेज', state.education.college)}
                  {state.optionalToggles.showEducation && F('युनिव्हर्सिटी', state.education.university)}
                  {state.optionalToggles.showEducation && F('इतर कोर्सेस', state.education.additionalCourses)}
                  {state.optionalToggles.showOccupation && F('व्यवसाय', state.occupation.occupation)}
                  {state.optionalToggles.showOccupation && F('कंपनी', state.occupation.company)}
                  {state.optionalToggles.showOccupation && F('वार्षिक उत्पन्न', state.occupation.annualIncome)}
                </div>
              )}
            </div>

            {/* ROW 3: Family details */}
            {state.optionalToggles.showFamily && (state.family.fatherName || state.family.motherName) && (
              <div style={{ ...box('rgba(239,68,68,0.03)'), flexShrink: 0 }}>
                {renderSectionHeader('👨‍👩‍👦', 'कौटुंबिक माहिती', 'Family Information')}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <div>
                    {F('वडिलांचे नाव', state.family.fatherName)}
                    {F('वडिलांचा व्यवसाय', state.family.fatherOccupation)}
                    {F('आईचे नाव', state.family.motherName)}
                    {F('आईचा व्यवसाय', state.family.motherOccupation)}
                  </div>
                  <div>
                    {F('भाऊ', state.family.brothers)}
                    {F('बहीण', state.family.sisters)}
                    {F('कुटुंब प्रकार', state.family.familyType)}
                    {F('पार्श्वभूमी', state.family.familyBackground)}
                  </div>
                </div>
              </div>
            )}

            {/* ROW 4: Property & Expectations side-by-side */}
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              {state.optionalToggles.showProperty && (state.property.house || state.property.agriculture) && (
                <div style={{ ...box('rgba(120,113,108,0.05)'), flex: 1 }}>
                  {renderSectionHeader('🏡', 'मालमत्ता व संपत्ती', 'Property & Assets')}
                  {F('घर / फ्लॅट', state.property.house || state.property.flat)}
                  {F('शेती / जागा', state.property.agriculture)}
                  {F('वाहन', state.property.vehicle)}
                  {F('इतर संपत्ती', state.property.otherAssets)}
                </div>
              )}
              {state.optionalToggles.showExpectations && (state.expectations.preferredEducation || state.expectations.preferredProfession) && (
                <div style={{ ...box('rgba(251,191,36,0.06)'), flex: 1 }}>
                  {renderSectionHeader('🤝', 'अपेक्षा', 'Expectations')}
                  {F('अपेक्षित शिक्षण', state.expectations.preferredEducation)}
                  {F('अपेक्षित नोकरी', state.expectations.preferredProfession)}
                  {F('वय गट', state.expectations.preferredAge)}
                  {F('पसंतीचे शहर', state.expectations.preferredCity)}
                  {F('इतर अपेक्षा', state.expectations.otherExpectations)}
                </div>
              )}
            </div>

            {/* Spacer pushes contact to direct bottom section */}
            <div style={{ flex: '1 1 auto' }} />

            {/* CONTACT CARD - styled perfectly at the bottom of page */}
            <div style={{
              background: pc,
              borderRadius: '8px',
              padding: '6px 10px',
              color: 'white',
              flexShrink: 0,
            }}>
              <div style={{ fontSize: '8px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '3px', marginBottom: '4px' }}>
                📞 संपर्क व संवाद (Contact Details)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px' }}>
                {state.contact.mobile && (
                  <div>
                    <div style={{ fontSize: '7.5px', opacity: 0.9 }}>संपर्क क्रमांक (Mobile 1):</div>
                    <div style={{ fontSize: '11px', fontWeight: 900 }}>{state.contact.mobile}</div>
                  </div>
                )}
                {state.contact.alternateMobile && (
                  <div>
                    <div style={{ fontSize: '7px', opacity: 0.8 }}>पर्यायी क्रमांक (Mobile 2):</div>
                    <div style={{ fontSize: '10px', fontWeight: 800 }}>{state.contact.alternateMobile}</div>
                  </div>
                )}
                {state.contact.whatsApp && (
                  <div>
                    <div style={{ fontSize: '7px', opacity: 0.8 }}>व्हॉट्सॲप (WhatsApp):</div>
                    <div style={{ fontSize: '10px', fontWeight: 800 }}>{state.contact.whatsApp}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Watermark */}
            <div style={{ textAlign: 'center', fontSize: '7px', color: '#9ca3af', fontFamily: 'monospace', flexShrink: 0, paddingBottom: '2px' }}>
              विवाह परिचय पत्रिका - AyushNexa Hub • www.ayushnexa.com
            </div>

          </div>
        </div>
      </div>
    </>
  );
};
