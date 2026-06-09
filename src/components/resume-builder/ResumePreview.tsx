export const ResumePreview = ({ data }: { data: any }) => {
  return (
    <div className="relative bg-white shadow-2xl p-10 w-full max-w-[500px] mx-auto aspect-[1/1.414] border-[16px] border-double border-slate-800">
      {/* Header */}
      <div className="text-center mb-6 border-b-2 border-slate-800 pb-4">
        <h1 className="text-3xl font-black uppercase tracking-widest">{data.fullName || "NAME"}</h1>
        <p className="text-xs font-bold text-slate-500 mt-1">{data.email} • {data.phone}</p>
      </div>

      {/* Content Compartments */}
      <div className="space-y-6">
        <section>
          <h3 className="text-xs font-black uppercase text-blue-700 border-b border-blue-200 mb-2">Professional Summary</h3>
          <p className="text-sm text-slate-700">{data.summary || "Add your summary here..."}</p>
        </section>

        <section>
          <h3 className="text-xs font-black uppercase text-blue-700 border-b border-blue-200 mb-2">Experience</h3>
          <p className="text-sm text-slate-700">{data.experience || "Your professional journey..."}</p>
        </section>
      </div>

      {/* Premium Watermark */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-[10px] text-slate-400 font-bold">
        Powered by AyushNexa Hub
      </div>
    </div>
  );
};