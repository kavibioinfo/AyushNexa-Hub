// ---------- Template 2: Corporate Duo ----------
const CorporateDuoTemplate = memo(({ data }: { data: ResumeData }) => {
  const validHobbies = data.hobbies.filter(h => h.name?.trim());
  const validCerts = data.certifications.filter(c => c.name?.trim());
  const validAchievements = data.achievements.filter(a => a.title?.trim());
  const validLanguages = data.languages.filter(l => l.name?.trim());

  return (
    <div className="resume-print-container bg-white text-gray-800 font-sans p-6 shadow-lg border border-gray-200 print:p-0 print:shadow-none print:border-none">
      <style>{printWrapperStyles}</style>
      
      <div className="flex flex-col md:flex-row gap-6 print-grid-sidebar">
        {/* Left Sidebar */}
        <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg space-y-4 print:bg-gray-50 print:w-auto print:p-2 print:rounded-none">
          {data.personal.photo && (
            <div className="flex justify-center">
              <img src={data.personal.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500 shadow print:w-16 print:h-16 print:border" />
            </div>
          )}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 print:text-base">{data.personal.fullName || "Your Name"}</h3>
            <p className="text-xs sm:text-sm text-indigo-600 font-medium print:text-xs">{data.personal.professionalTitle || "Professional Title"}</p>
            <div className="mt-4 space-y-1 text-xs text-gray-600 break-words print:mt-2 print:text-xs">
              {data.personal.email && <div className="flex items-center gap-1"><Mail className="w-3 h-3" /> {data.personal.email}</div>}
              {data.personal.phone && <div className="flex items-center gap-1"><Phone className="w-3 h-3" /> {data.personal.phone}</div>}
              {data.personal.address && <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {data.personal.address}</div>}
              {data.personal.linkedin && <div className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> {data.personal.linkedin}</div>}
              {data.personal.github && <div className="flex items-center gap-1"><Github className="w-3 h-3" /> {data.personal.github}</div>}
            </div>
          </div>
          {data.skills.length > 0 && (
            <div className="print-avoid-break">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 print:text-xs">Skills</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.skills.map(s => <span key={s.id} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded print:bg-indigo-100">{s.name}</span>)}
              </div>
            </div>
          )}
          {validLanguages.length > 0 && (
            <div className="print-avoid-break">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 print:text-xs">Languages</h4>
              <div className="text-xs space-y-1 mt-1 print:text-xs">
                {validLanguages.map(l => <div key={l.id}>{l.name} – {l.proficiency}</div>)}
              </div>
            </div>
          )}
          {validCerts.length > 0 && (
            <div className="print-avoid-break">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 print:text-xs">Certifications</h4>
              <ul className="text-xs list-disc list-inside mt-1 print:text-xs">
                {validCerts.map(cert => <li key={cert.id}>{cert.name}</li>)}
              </ul>
            </div>
          )}
          {validHobbies.length > 0 && (
            <div className="print-avoid-break">
              <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-500 print:text-xs">Hobbies</h4>
              <div className="flex flex-wrap gap-1 mt-1">
                {validHobbies.map(h => <span key={h.id} className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded print:bg-gray-200">{h.name}</span>)}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Content */}
        <div className="w-full md:w-2/3 space-y-4 print:w-auto">
          {data.personal.careerSummary && (
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase text-indigo-600 border-b pb-1 mb-2 print:text-xs">Professional Summary</h2>
              <p className="text-xs sm:text-sm text-gray-700 print:text-xs">{data.personal.careerSummary}</p>
            </div>
          )}
          {data.experience.length > 0 && (
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase text-indigo-600 border-b pb-1 mb-2 print:text-xs">Work Experience</h2>
              {data.experience.map(exp => (
                <div key={exp.id} className="mb-3 print:mb-2">
                  <div className="flex justify-between items-baseline flex-wrap gap-2">
                    <h3 className="font-semibold text-gray-800 text-sm print:text-xs">{exp.position}</h3>
                    <span className="text-xs text-gray-500 print:text-xs">{exp.startDate || "?"} – {exp.current ? "Present" : (exp.endDate || "?")}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 print:text-xs">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  {exp.description && <p className="text-xs text-gray-500 mt-1 print:text-xs">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {data.education.length > 0 && (
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase text-indigo-600 border-b pb-1 mb-2 print:text-xs">Education</h2>
              {data.education.map(edu => (
                <div key={edu.id} className="mb-2">
                  <div className="flex justify-between gap-2 flex-wrap">
                    <span className="font-semibold text-gray-800 text-sm print:text-xs">{edu.degree}</span>
                    <span className="text-xs text-gray-500 print:text-xs">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 print:text-xs">{edu.institution}</p>
                  {edu.grade && <p className="text-xs text-gray-500 print:text-xs">Grade: {edu.grade}</p>}
                </div>
              ))}
            </div>
          )}
          {data.projects.length > 0 && (
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase text-indigo-600 border-b pb-1 mb-2 print:text-xs">Projects</h2>
              {data.projects.map(proj => (
                <div key={proj.id} className="mb-2">
                  <div className="font-semibold text-sm print:text-xs">{proj.name}</div>
                  {proj.technologies.length > 0 && <div className="text-xs text-gray-500 print:text-xs">{proj.technologies.join(", ")}</div>}
                  {proj.description && <p className="text-xs text-gray-600 mt-1 print:text-xs">{proj.description}</p>}
                </div>
              ))}
            </div>
          )}
          {validAchievements.length > 0 && (
            <div className="print-avoid-break">
              <h2 className="text-xs sm:text-sm font-bold uppercase text-indigo-600 border-b pb-1 mb-2 print:text-xs">Achievements</h2>
              <ul className="list-disc list-inside text-xs text-gray-700 print:text-xs">
                {validAchievements.map(ach => <li key={ach.id}>{ach.title}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
CorporateDuoTemplate.displayName = "CorporateDuoTemplate";

// ---------- Template 3: Executive Ruby ----------
const ExecutiveRubyTemplate = memo(({ data }: { data: ResumeData }) => {
  const validHobbies = data.hobbies.filter(h => h.name?.trim());
  const validCerts = data.certifications.filter(c => c.name?.trim());
  const validAchievements = data.achievements.filter(a => a.title?.trim());
  const validLanguages = data.languages.filter(l => l.name?.trim());

  return (
    <div className="resume-print-container bg-white text-gray-800 font-serif p-6 sm:p-8 shadow-lg border-t-4 border-red-600 print:p-0 print:shadow-none print:border-t-2">
      <style>{printWrapperStyles}</style>
      
      <div className="flex flex-col md:flex-row gap-6 items-start print:gap-4">
        {data.personal.photo && (
          <div className="flex-shrink-0">
            <img src={data.personal.photo} alt="Profile" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-red-200 shadow print:w-20 print:h-20 print:border" />
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 print:text-xl">{data.personal.fullName || "Your Name"}</h1>
          <p className="text-base sm:text-lg text-red-600 font-medium print:text-sm">{data.personal.professionalTitle || "Professional Title"}</p>
          <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-500 mt-1 break-words print:text-xs print:gap-2">
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.phone && <span>{data.personal.phone}</span>}
            {data.personal.address && <span>{data.personal.address}</span>}
          </div>
        </div>
      </div>
      
      <div className="mt-6 space-y-5 print:mt-4 print:space-y-3">
        {data.personal.careerSummary && (
          <section className="print-avoid-break">
            <h2 className="text-base sm:text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-1 print:text-sm">Summary</h2>
            <p className="text-xs sm:text-sm mt-2 print:text-xs print:mt-1">{data.personal.careerSummary}</p>
          </section>
        )}
        {data.experience.length > 0 && (
          <section className="print-avoid-break">
            <h2 className="text-base sm:text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-1 print:text-sm">Experience</h2>
            {data.experience.map(exp => (
              <div key={exp.id} className="mt-3 print:mt-2">
                <h3 className="font-semibold text-sm print:text-xs">{exp.position}</h3>
                <p className="text-xs sm:text-sm text-gray-600 print:text-xs">{exp.company} ({exp.startDate} – {exp.current ? "Present" : exp.endDate})</p>
                {exp.description && <p className="text-xs text-gray-500 mt-1 print:text-xs">{exp.description}</p>}
              </div>
            ))}
          </section>
        )}
        {data.education.length > 0 && (
          <section className="print-avoid-break">
            <h2 className="text-base sm:text-xl font-serif font-bold text-gray-800 border-b border-gray-200 pb-1 print:text-sm">Education</h2>
            {data.education.map(edu => (
              <div key={edu.id} className="mt-2">
                <h3 className="font-semibold text-sm print:text-xs">{edu.degree}</h3>
                <p className="text-xs sm:text-sm text-gray-600 print:text-xs">{edu.institution} ({edu.startDate} – {edu.endDate})</p>
                {edu.grade && <p className="text-xs text-gray-500 print:text-xs">Grade: {edu.grade}</p>}
              </div>
            ))}
          </section>
        )}
        {data.skills.length > 0 && (
          <section className="print-avoid-break">
            <h2 className="text-sm sm:text-lg font-serif font-bold border-b pb-1 print:text-xs">Skills</h2>
            <div className="flex flex-wrap gap-1 mt-1">{data.skills.map(s => <span key={s.id} className="bg-gray-100 px-2 py-0.5 rounded text-xs print:bg-gray-100">{s.name}</span>)}</div>
          </section>
        )}
        {data.projects.length > 0 && (
          <section className="print-avoid-break">
            <h2 className="text-sm sm:text-lg font-serif font-bold border-b pb-1 print:text-xs">Projects</h2>
            {data.projects.map(proj => (
              <div key={proj.id} className="mt-1">
                <div className="font-semibold text-sm print:text-xs">{proj.name}</div>
                {proj.description && <p className="text-xs text-gray-600 print:text-xs">{proj.description}</p>}
              </div>
            ))}
          </section>
        )}
        {validCerts.length > 0 && (
          <section className="print-avoid-break">
            <h2 className="text-sm sm:text-lg font-serif font-bold border-b pb-1 print:text-xs">Certifications</h2>
            <ul className="list-disc list-inside text-xs mt-1 print:text-xs">{validCerts.map(cert => <li key={cert.id}>{cert.name}</li>)}</ul>
          </section>
        )}
        {validLanguages.length > 0 && (
          <section className="print-avoid-break">
            <h2 className="text-sm sm:text-lg font-serif font-bold border-b pb-1 print:text-xs">Languages</h2>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm mt-1 print:text-xs">{validLanguages.map(l => <span key={l.id}>{l.name} – {l.proficiency}</span>)}</div>
          </section>
        )}
        {validAchievements.length > 0 && (
          <section className="print-avoid-break">
            <h2 className="text-sm sm:text-lg font-serif font-bold border-b pb-1 print:text-xs">Achievements</h2>
            <ul className="list-disc list-inside text-xs print:text-xs">{validAchievements.map(ach => <li key={ach.id}>{ach.title}</li>)}</ul>
          </section>
        )}
        {validHobbies.length > 0 && (
          <section className="print-avoid-break">
            <h2 className="text-sm sm:text-lg font-serif font-bold border-b pb-1 print:text-xs">Hobbies</h2>
            <div className="flex flex-wrap gap-1 mt-1">{validHobbies.map(h => <span key={h.id} className="bg-gray-100 px-2 py-0.5 rounded text-xs print:bg-gray-100">{h.name}</span>)}</div>
          </section>
        )}
      </div>
    </div>
  );
});
ExecutiveRubyTemplate.displayName = "ExecutiveRubyTemplate";

// ---------- Template 4: Sleek Tech (Dark) ----------
const SleekTechTemplate = memo(({ data }: { data: ResumeData }) => {
  const validHobbies = data.hobbies.filter(h => h.name?.trim());
  const validCerts = data.certifications.filter(c => c.name?.trim());
  const validAchievements = data.achievements.filter(a => a.title?.trim());
  const validLanguages = data.languages.filter(l => l.name?.trim());

  return (
    <div className="resume-print-container" style={{ background: '#1f2937', color: 'white' }}>
      <style>{printWrapperStyles}</style>
      <style>{`
        .sleek-dark * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        @media print {
          .sleek-dark {
            background: #1f2937 !important;
            color: white !important;
          }
          .sleek-dark .text-indigo-300, .sleek-dark .text-indigo-400 {
            color: #a5b4fc !important;
          }
          .sleek-dark .text-gray-400, .sleek-dark .text-gray-500 {
            color: #d1d5db !important;
          }
          .sleek-dark .bg-gray-700, .sleek-dark .bg-gray-800 {
            background: #374151 !important;
          }
        }
      `}</style>
      
      <div className="sleek-dark p-6 print:p-0" style={{ background: '#1f2937', color: 'white' }}>
        {/* Header */}
        <div className="flex flex-col gap-2 mb-4 print:mb-3">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold print:text-lg" style={{ color: 'white' }}>{data.personal.fullName || "Your Name"}</h1>
              <p className="text-sm sm:text-base text-indigo-300 print:text-xs" style={{ color: '#a5b4fc' }}>{data.personal.professionalTitle || "Professional Title"}</p>
            </div>
            {data.personal.photo && (
              <img src={data.personal.photo} alt="Profile" className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-indigo-400 print:w-14 print:h-14" />
            )}
          </div>
          <div className="text-xs text-gray-400 flex flex-wrap gap-x-4 gap-y-1 print:text-xs" style={{ color: '#9ca3af' }}>
            {data.personal.email && <span>{data.personal.email}</span>}
            {data.personal.phone && <span>{data.personal.phone}</span>}
            {data.personal.address && <span>{data.personal.address}</span>}
            {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
            {data.personal.github && <span>{data.personal.github}</span>}
          </div>
        </div>

        <hr className="border-gray-600 mb-4 print:mb-3" style={{ borderColor: '#4b5563' }} />

        {/* Two-column layout */}
        <div className="print-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1.5rem' }}>
          {/* Sidebar */}
          <div>
            {data.skills.length > 0 && (
              <section className="print-avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 print:text-xs" style={{ color: '#a5b4fc' }}>Skills</h3>
                <div className="flex flex-wrap gap-1">
                  {data.skills.map(s => (
                    <span key={s.id} className="px-2 py-0.5 rounded text-xs" style={{ background: '#374151' }}>{s.name}</span>
                  ))}
                </div>
              </section>
            )}

            {validLanguages.length > 0 && (
              <section className="mt-4 print:mt-2 print-avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 print:text-xs" style={{ color: '#a5b4fc' }}>Languages</h3>
                <div className="text-xs" style={{ color: '#d1d5db' }}>
                  {validLanguages.map(l => <div key={l.id}>{l.name} ({l.proficiency})</div>)}
                </div>
              </section>
            )}

            {validCerts.length > 0 && (
              <section className="mt-4 print:mt-2 print-avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 print:text-xs" style={{ color: '#a5b4fc' }}>Certifications</h3>
                <div className="text-xs" style={{ color: '#d1d5db' }}>
                  {validCerts.map(cert => <div key={cert.id}>{cert.name}</div>)}
                </div>
              </section>
            )}

            {validHobbies.length > 0 && (
              <section className="mt-4 print:mt-2 print-avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 print:text-xs" style={{ color: '#a5b4fc' }}>Hobbies</h3>
                <div className="flex flex-wrap gap-1">
                  {validHobbies.map(h => (
                    <span key={h.id} className="px-2 py-0.5 rounded text-xs" style={{ background: '#374151' }}>{h.name}</span>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Main Content */}
          <div>
            {data.personal.careerSummary && (
              <section className="print-avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 print:text-xs" style={{ color: '#a5b4fc' }}>Summary</h3>
                <p className="text-xs mb-4 print:text-xs print:mb-2" style={{ color: '#d1d5db' }}>{data.personal.careerSummary}</p>
              </section>
            )}

            {data.experience.length > 0 && (
              <section className="print-avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 print:text-xs" style={{ color: '#a5b4fc' }}>Experience</h3>
                {data.experience.map(exp => (
                  <div key={exp.id} className="mb-3 print:mb-2">
                    <div className="font-bold text-sm print:text-xs" style={{ color: 'white' }}>{exp.position}</div>
                    <div className="text-xs" style={{ color: '#9ca3af' }}>{exp.company} ({exp.startDate} – {exp.current ? "Present" : exp.endDate})</div>
                    {exp.description && <p className="text-xs mt-1 print:text-xs" style={{ color: '#d1d5db' }}>{exp.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {data.education.length > 0 && (
              <section className="print-avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 print:text-xs" style={{ color: '#a5b4fc' }}>Education</h3>
                {data.education.map(edu => (
                  <div key={edu.id} className="mb-2">
                    <div className="font-bold text-sm print:text-xs" style={{ color: 'white' }}>{edu.degree}</div>
                    <div className="text-xs" style={{ color: '#9ca3af' }}>{edu.institution}</div>
                  </div>
                ))}
              </section>
            )}

            {data.projects.length > 0 && (
              <section className="print-avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 print:text-xs" style={{ color: '#a5b4fc' }}>Projects</h3>
                {data.projects.map(proj => (
                  <div key={proj.id} className="mb-2">
                    <div className="font-bold text-sm print:text-xs" style={{ color: 'white' }}>{proj.name}</div>
                    {proj.description && <p className="text-xs mt-1 print:text-xs" style={{ color: '#d1d5db' }}>{proj.description}</p>}
                  </div>
                ))}
              </section>
            )}

            {validAchievements.length > 0 && (
              <section className="print-avoid-break">
                <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 print:text-xs" style={{ color: '#a5b4fc' }}>Achievements</h3>
                <ul className="list-disc pl-4 text-xs" style={{ color: '#d1d5db' }}>
                  {validAchievements.map(ach => <li key={ach.id}>{ach.title}</li>)}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
SleekTechTemplate.displayName = "SleekTechTemplate";

// ---------- Template 5: Whitehall Black ----------
const WhitehallBlackTemplate = memo(({ data }: { data: ResumeData }) => {
  const validHobbies = data.hobbies.filter(h => h.name?.trim());
  const validCerts = data.certifications.filter(c => c.name?.trim());
  const validAchievements = data.achievements.filter(a => a.title?.trim());
  const validLanguages = data.languages.filter(l => l.name?.trim());

  return (
    <div className="resume-print-container bg-white text-gray-900 font-sans p-6 sm:p-8 border border-black shadow-xl print:p-0 print:shadow-none print:border-none">
      <style>{printWrapperStyles}</style>
      
      <div className="text-center border-b-2 border-black pb-4 print:pb-3">
        {data.personal.photo && (
          <div className="flex justify-center mb-3">
            <img src={data.personal.photo} alt="Profile" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-black print:w-16 print:h-16" />
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl uppercase tracking-wide font-bold print:text-xl">{data.personal.fullName || "Your Name"}</h1>
        <p className="text-gray-600 text-xs sm:text-sm print:text-xs">{data.personal.professionalTitle || "Professional Title"}</p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-2 print:text-xs">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.address && <span>{data.personal.address}</span>}
        </div>
      </div>
      
      <div className="mt-6 space-y-4 print:mt-4 print:space-y-3">
        {data.personal.careerSummary && (
          <div className="print-avoid-break">
            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wide border-b border-black pb-1 print:text-xs">Profile</h2>
            <p className="text-xs sm:text-sm mt-1 print:text-xs">{data.personal.careerSummary}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2 print:gap-4">
          <div>
            {data.experience.length > 0 && (
              <div className="print-avoid-break">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wide border-b border-black pb-1 print:text-xs">Work Experience</h2>
                {data.experience.map(exp => (
                  <div key={exp.id} className="mt-2">
                    <div className="font-semibold text-sm print:text-xs">{exp.position}</div>
                    <div className="text-xs text-gray-600 print:text-xs">{exp.company} ({exp.startDate} – {exp.current ? "Present" : exp.endDate})</div>
                    {exp.description && <p className="text-xs text-gray-500 mt-1 print:text-xs">{exp.description}</p>}
                  </div>
                ))}
              </div>
            )}
            {data.projects.length > 0 && (
              <div className="mt-4 print:mt-2 print-avoid-break">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wide border-b border-black pb-1 print:text-xs">Projects</h2>
                {data.projects.map(proj => (
                  <div key={proj.id} className="mt-1">
                    <div className="font-semibold text-sm print:text-xs">{proj.name}</div>
                    {proj.description && <p className="text-xs text-gray-600 print:text-xs">{proj.description}</p>}
                  </div>
                ))}
              </div>
            )}
            {validAchievements.length > 0 && (
              <div className="mt-4 print:mt-2 print-avoid-break">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wide border-b border-black pb-1 print:text-xs">Achievements</h2>
                <ul className="list-disc list-inside text-xs mt-1 print:text-xs">{validAchievements.map(ach => <li key={ach.id}>{ach.title}</li>)}</ul>
              </div>
            )}
          </div>
          <div>
            {data.education.length > 0 && (
              <div className="print-avoid-break">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wide border-b border-black pb-1 print:text-xs">Education</h2>
                {data.education.map(edu => (
                  <div key={edu.id} className="mt-2">
                    <div className="font-semibold text-sm print:text-xs">{edu.degree}</div>
                    <div className="text-xs text-gray-600 print:text-xs">{edu.institution} – {edu.grade && `Grade: ${edu.grade}`}</div>
                  </div>
                ))}
              </div>
            )}
            {data.skills.length > 0 && (
              <div className="mt-4 print:mt-2 print-avoid-break">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wide border-b border-black pb-1 print:text-xs">Skills</h2>
                <div className="flex flex-wrap gap-1 mt-1">{data.skills.map(s => <span key={s.id} className="bg-gray-100 px-2 py-0.5 rounded text-xs print:bg-gray-100">{s.name}</span>)}</div>
              </div>
            )}
            {validCerts.length > 0 && (
              <div className="mt-4 print:mt-2 print-avoid-break">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wide border-b border-black pb-1 print:text-xs">Certifications</h2>
                <ul className="list-disc list-inside text-xs print:text-xs">{validCerts.map(cert => <li key={cert.id}>{cert.name}</li>)}</ul>
              </div>
            )}
            {validLanguages.length > 0 && (
              <div className="mt-4 print:mt-2 print-avoid-break">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wide border-b border-black pb-1 print:text-xs">Languages</h2>
                <div className="text-xs print:text-xs">{validLanguages.map(l => <div key={l.id}>{l.name} – {l.proficiency}</div>)}</div>
              </div>
            )}
            {validHobbies.length > 0 && (
              <div className="mt-4 print:mt-2 print-avoid-break">
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wide border-b border-black pb-1 print:text-xs">Hobbies</h2>
                <div className="flex flex-wrap gap-1 mt-1">{validHobbies.map(h => <span key={h.id} className="bg-gray-100 px-2 py-0.5 rounded text-xs print:bg-gray-100">{h.name}</span>)}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
WhitehallBlackTemplate.displayName = "WhitehallBlackTemplate";

// ---------- Template 6: Modern ATS Pro ----------
const ModernATSProTemplate = memo(({ data }: { data: ResumeData }) => {
  const validHobbies = data.hobbies.filter(h => h.name?.trim());
  const validCerts = data.certifications.filter(c => c.name?.trim());
  const validAchievements = data.achievements.filter(a => a.title?.trim());
  const validLanguages = data.languages.filter(l => l.name?.trim());

  return (
    <div className="resume-print-container bg-white text-gray-800 font-sans p-6 shadow-lg border border-gray-200 print:p-0 print:shadow-none print:border-none">
      <style>{printWrapperStyles}</style>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 print:grid-cols-3 print:gap-4">
        {/* Left Sidebar */}
        <div className="bg-indigo-50 p-4 rounded-lg space-y-3 print:bg-indigo-50 print:p-2 print:rounded-none">
          {data.personal.photo && (
            <div className="flex justify-center">
              <img src={data.personal.photo} alt="Profile" className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-indigo-400 print:w-16 print:h-16" />
            </div>
          )}
          <div className="print-avoid-break">
            <h3 className="text-xs sm:text-sm font-bold uppercase text-indigo-700 print:text-xs">Contact</h3>
            <div className="text-xs space-y-1 mt-1 break-words print:text-xs">
              {data.personal.email && <div className="flex items-center gap-1"><Mail className="w-3 h-3" /> {data.personal.email}</div>}
              {data.personal.phone && <div className="flex items-center gap-1"><Phone className="w-3 h-3" /> {data.personal.phone}</div>}
              {data.personal.address && <div className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {data.personal.address}</div>}
            </div>
          </div>
          {data.skills.length > 0 && (
            <div className="print-avoid-break">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-indigo-700 print:text-xs">Skills</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {data.skills.map(s => (
                  <span key={s.id} className="bg-indigo-100 text-indigo-800 text-xs px-2 py-0.5 rounded print:bg-indigo-100">{s.name}</span>
                ))}
              </div>
            </div>
          )}
          {validLanguages.length > 0 && (
            <div className="print-avoid-break">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-indigo-700 print:text-xs">Languages</h3>
              <div className="text-xs space-y-0.5 mt-1 print:text-xs">
                {validLanguages.map(l => <div key={l.id}>{l.name} – {l.proficiency}</div>)}
              </div>
            </div>
          )}
          {validCerts.length > 0 && (
            <div className="print-avoid-break">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-indigo-700 print:text-xs">Certifications</h3>
              <div className="text-xs space-y-0.5 mt-1 print:text-xs">
                {validCerts.map(cert => <div key={cert.id}>{cert.name}</div>)}
              </div>
            </div>
          )}
          {validHobbies.length > 0 && (
            <div className="print-avoid-break">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-indigo-700 print:text-xs">Hobbies</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                {validHobbies.map(h => <span key={h.id} className="bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded print:bg-gray-200">{h.name}</span>)}
              </div>
            </div>
          )}
        </div>
        
        {/* Right Content */}
        <div className="md:col-span-2 space-y-4 print:col-span-2">
          <div className="print-avoid-break">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 print:text-base">{data.personal.fullName || "Your Name"}</h2>
            <p className="text-indigo-600 font-medium text-sm print:text-xs">{data.personal.professionalTitle || "Professional Title"}</p>
            <div className="flex flex-wrap gap-2 text-xs text-gray-500 mt-1 break-words print:text-xs">
              {data.personal.linkedin && <span className="flex items-center gap-1"><Linkedin className="w-3 h-3" /> {data.personal.linkedin}</span>}
              {data.personal.github && <span className="flex items-center gap-1"><Github className="w-3 h-3" /> {data.personal.github}</span>}
            </div>
          </div>
          {data.personal.careerSummary && (
            <div className="print-avoid-break">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-indigo-700 print:text-xs">Profile</h3>
              <p className="text-xs sm:text-sm print:text-xs">{data.personal.careerSummary}</p>
            </div>
          )}
          {data.experience.length > 0 && (
            <div className="print-avoid-break">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-indigo-700 print:text-xs">Experience</h3>
              {data.experience.map(exp => (
                <div key={exp.id} className="mt-2">
                  <div className="font-semibold text-sm print:text-xs">{exp.position}</div>
                  <div className="text-xs text-gray-600 print:text-xs">{exp.company} – {exp.startDate} to {exp.current ? "Present" : exp.endDate}</div>
                  {exp.description && <p className="text-xs text-gray-500 mt-1 print:text-xs">{exp.description}</p>}
                </div>
              ))}
            </div>
          )}
          {data.education.length > 0 && (
            <div className="print-avoid-break">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-indigo-700 print:text-xs">Education</h3>
              {data.education.map(edu => (
                <div key={edu.id} className="mt-1">
                  <div className="font-semibold text-sm print:text-xs">{edu.degree}</div>
                  <div className="text-xs text-gray-600 print:text-xs">{edu.institution} – {edu.grade && `CGPA: ${edu.grade}`}</div>
                </div>
              ))}
            </div>
          )}
          {data.projects.length > 0 && (
            <div className="print-avoid-break">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-indigo-700 print:text-xs">Projects</h3>
              {data.projects.map(proj => (
                <div key={proj.id} className="mt-1">
                  <div className="font-semibold text-sm print:text-xs">{proj.name}</div>
                  <p className="text-xs text-gray-600 print:text-xs">{proj.description}</p>
                </div>
              ))}
            </div>
          )}
          {validAchievements.length > 0 && (
            <div className="print-avoid-break">
              <h3 className="text-xs sm:text-sm font-bold uppercase text-indigo-700 print:text-xs">Achievements</h3>
              <ul className="list-disc list-inside text-xs print:text-xs">
                {validAchievements.map(ach => <li key={ach.id}>{ach.title}</li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
ModernATSProTemplate.displayName = "ModernATSProTemplate";

const TemplatePreview = memo(({ data, templateName }: { data: ResumeData; templateName: string }) => {
  switch (templateName) {
    case "Corporate Duo": return <CorporateDuoTemplate data={data} />;
    case "Executive Ruby": return <ExecutiveRubyTemplate data={data} />;
    case "Sleek Tech": return <SleekTechTemplate data={data} />;
    case "Whitehall Black": return <WhitehallBlackTemplate data={data} />;
    case "Modern ATS Pro": return <ModernATSProTemplate data={data} />;
    default: return <ClassicMinimalTemplate data={data} />;
  }
});
TemplatePreview.displayName = "TemplatePreview";

// ---------- Template Selector ----------
function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate, isPremium, lang } = useResume();
  const t = translations[lang];
  const templates = isPremium 
    ? ["Classic Minimal", "Corporate Duo", "Executive Ruby", "Sleek Tech", "Whitehall Black", "Modern ATS Pro"]
    : ["Classic Minimal"];
  const templateKeys = isPremium
    ? [t.templateClassic, t.templateCorporate, t.templateExecutive, t.templateSleek, t.templateWhitehall, t.templateModern]
    : [t.templateClassic];
  const actualKeys = ["Classic Minimal", "Corporate Duo", "Executive Ruby", "Sleek Tech", "Whitehall Black", "Modern ATS Pro"];
  return (
    <div className="template-selector mb-4 p-3 bg-gray-50 rounded-xl">
      <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
      <div className="flex flex-wrap gap-2">
        {templates.map((tpl, idx) => (
          <button key={tpl} onClick={() => setSelectedTemplate(actualKeys[idx])} className={`px-3 py-1 rounded-full text-sm transition ${selectedTemplate === actualKeys[idx] ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 hover:border-indigo-300"}`}>{templateKeys[idx]}</button>
        ))}
      </div>
      {!isPremium && <p className="text-xs text-gray-400 mt-2">Upgrade to unlock 5 more templates</p>}
    </div>
  );
}

// ---------- Main Component ----------
export default function ResumeBuilderPage() {
  return (
    <ResumeProvider>
      <ResumeBuilderContent />
    </ResumeProvider>
  );
}

function ResumeBuilderContent() {
  const [currentStep, setCurrentStep] = useState(0);
  const { isPremium, resumeData, setIsPremium, resetAll, lang, setLang, selectedTemplate } = useResume();
  const previewRef = useRef<HTMLDivElement>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const t = translations[lang];

  const steps = [t.stepPersonal, t.stepEducation, t.stepExperience, t.stepSkills, t.stepProjects, t.stepAchievements, t.stepPreview];
  const stepComponents = [<PersonalInfoStep key="p" />, <EducationStep key="e" />, <ExperienceStep key="ex" />, <SkillsStep key="s" />, <ProjectsStep key="pr" />, <AchievementsStep key="a" />, <PreviewStep key="pv" />];

  const nextStep = () => { if (currentStep < steps.length - 1) setCurrentStep(s => s + 1); };
  const prevStep = () => { if (currentStep > 0) setCurrentStep(s => s - 1); };

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  const handleClearAll = () => { resetAll(); setShowClearConfirm(false); };
  const handlePaymentSuccess = () => {
    setIsPremium(true);
    setShowPremiumModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header - no-print */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 no-print">
          <Logo />
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button onClick={() => setLang(lang === "en" ? "mr" : "en")} className="flex items-center gap-1 px-3 py-1.5 bg-white border rounded-xl hover:bg-gray-50 text-sm font-medium">
              <Globe className="w-4 h-4" /><span>{lang === "en" ? "मराठी" : "English"}</span>
            </button>
            {!isPremium && (
              <button onClick={() => setShowPremiumModal(true)} className="px-4 py-1.5 sm:px-5 sm:py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow-lg flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                <Star className="w-4 h-4" /> {t.upgradePremium}
              </button>
            )}
            {isPremium && (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs sm:text-sm">
                <CheckCircle className="w-4 h-4" /> {t.premiumActive}
              </div>
            )}
            <button onClick={() => setShowClearConfirm(true)} className="px-3 py-1.5 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 flex items-center gap-1 text-sm">
              <RefreshCw className="w-4 h-4" /> {t.clearAll}
            </button>
          </div>
        </div>

        {/* Step indicator - no-print */}
        <div className="step-indicator flex items-center justify-between mb-8 overflow-x-auto pb-2 space-x-2 no-print">
          {steps.map((label, idx) => (
            <div key={idx} className={`flex flex-col items-center ${idx <= currentStep ? "text-indigo-600" : "text-gray-400"} shrink-0`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${idx <= currentStep ? "bg-indigo-600 text-white shadow-md" : "bg-gray-200 text-gray-500"}`}>{idx + 1}</div>
              <span className="text-xs mt-1 hidden sm:inline">{label}</span>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left editor - no-print */}
          <div className="editor-panel bg-white rounded-3xl shadow-xl p-5 sm:p-6 overflow-auto max-h-[80vh] custom-scrollbar no-print">
            <TemplateSelector />
            {stepComponents[currentStep]}
            <div className="flex justify-between mt-8 pt-4 border-t">
              <button onClick={prevStep} disabled={currentStep === 0} className="px-4 py-2 border rounded-xl disabled:opacity-50 text-sm font-medium flex items-center gap-1">
                <ChevronLeft className="w-4 h-4" /> {t.back}
              </button>
              {currentStep === steps.length - 1 ? (
                <div className="flex gap-3">
                  <button onClick={handlePrint} className="px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-2 text-sm font-medium">
                    <Download className="w-4 h-4" /> {t.downloadPDF}
                  </button>
                  {!isPremium && (
                    <button onClick={() => setShowPremiumModal(true)} className="px-4 py-2 bg-amber-500 text-white rounded-xl text-sm font-medium">
                      {t.unlockPremium}
                    </button>
                  )}
                </div>
              ) : (
                <button onClick={nextStep} className="px-4 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-1 text-sm font-medium">
                  {t.next} <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Right preview – Screen only */}
          <div className="relative flex justify-center items-start no-print">
            <div className="bg-gray-100 rounded-3xl p-4 sm:p-6 shadow-inner w-full overflow-y-auto max-h-[80vh]">
              <div className="preview-label flex justify-between items-center mb-3 px-2">
                <h3 className="font-medium text-gray-500 text-sm">{t.livePreview}</h3>
                <Eye className="w-4 h-4 text-gray-400" />
              </div>
              <div className="bg-white shadow-2xl rounded-2xl mx-auto w-full max-w-[210mm] transition-all">
                <div ref={previewRef}>
                  <TemplatePreview data={resumeData} templateName={selectedTemplate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals (no-print) */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 no-print">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center gap-3 text-red-600 mb-4">
              <AlertTriangle className="w-6 h-6" /><h2 className="text-xl font-bold">{t.clearAll}</h2>
            </div>
            <p className="text-gray-600 mb-6">{t.clearConfirm}</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setShowClearConfirm(false)} className="px-4 py-2 border rounded-xl">{t.cancel}</button>
              <button onClick={handleClearAll} className="px-4 py-2 bg-red-600 text-white rounded-xl">{t.yesClear}</button>
            </div>
          </div>
        </div>
      )}

      {showPremiumModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 no-print">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{t.unlockPremium}</h2>
              <button onClick={() => setShowPremiumModal(false)}><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> 5 ATS Templates</div>
              <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-500" /> AI Summary & Skills</div>
              <div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-blue-500" /> ATS Score & Keywords</div>
              <div className="flex items-center gap-2"><Download className="w-4 h-4 text-indigo-500" /> Unlimited PDF</div>
            </div>
            <div className="text-3xl font-bold mb-4">₹49 <span className="text-sm font-normal">one-time</span></div>
            <RazorpayButton
              productId="premium_resume"
              amount={49}
              productName="Premium Resume Builder"
              userEmail={resumeData.personal.email}
              userName={resumeData.personal.fullName}
              userPhone={resumeData.personal.phone}
              userCity={resumeData.personal.address}
              label={t.unlockNow}
              onSuccess={handlePaymentSuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}