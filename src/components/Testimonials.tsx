export default function Testimonials() {
  const testimonials = [
    {
      name: 'Rahul S.',
      location: 'Pune',
      text: 'The Vivah Biodata tool saved me 3 hours. The PDF looked amazing and my family loved it!',
      tool: 'Vivah Parichay',
    },
    {
      name: 'Dr. Priya M.',
      location: 'Mumbai',
      text: 'The Medical Practice Kit helped me get 15 new OPD patients in just 2 weeks. Worth every rupee.',
      tool: 'Medical Kit',
    },
    {
      name: 'Amit K.',
      location: 'Nagpur',
      text: 'Business Growth Kit gave me ready-to-use WhatsApp scripts. My salon bookings doubled.',
      tool: 'Business Kit',
    },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            What Users Say
          </h2>
          <p className="mt-3 text-slate-500">Real results from real people</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <div className="flex items-center gap-1 mb-3">
                {'★'.repeat(5).split('').map((_, j) => (
                  <span key={j} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">"{t.text}"</p>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-900">{t.name}</p>
                  <p className="text-xs text-slate-500">{t.location}</p>
                </div>
                <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                  {t.tool}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 
