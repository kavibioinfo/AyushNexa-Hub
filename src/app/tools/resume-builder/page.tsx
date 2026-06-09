"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Lock,
  Sparkles,
  Plus,
  Trash2,
  Star,
  Zap,
  CheckCircle,
  X,
  Briefcase,
  User,
  Mail,
  Phone,
  MapPin,
  Link2,
  Github,
  Linkedin,
  Camera,
  Target,
  TrendingUp,
  Eye,
  Globe,
  AlertTriangle,
  RefreshCw,
  Award,
  BookOpen,
  Heart,
  FileText,
} from "lucide-react";
import Logo from "@/components/Logo";

// ---------- Language Support ----------
type Language = "en" | "mr";
const translations = {
  en: {
    upgradePremium: "Upgrade Premium ₹49",
    premiumActive: "Premium Active",
    livePreview: "Live Preview",
    downloadPDF: "Download PDF",
    unlockPremium: "Unlock Premium",
    unlockNow: "Unlock Now with Razorpay",
    back: "Back",
    next: "Next",
    clearAll: "Clear All",
    clearConfirm: "Are you sure? This will erase all your resume data.",
    yesClear: "Yes, Clear All",
    cancel: "Cancel",
    atsScore: "ATS Resume Score",
    autoImprove: "Auto Improve with AI",
    aiSummary: "AI Generate Summary",
    aiSkills: "AI Suggest Skills",
    aiProject: "AI Suggest Project",
    upgradeToUnlock: "Upgrade to unlock ATS score & AI features",
    resumeReady: "Your resume is ready! Scroll to see full preview.",
    photoUpload: "Upload Photo",
    photoMaxSize: "Max 2MB, JPG or PNG",
    remove: "Remove",
    add: "Add",
    fullName: "Full Name",
    professionalTitle: "Professional Title",
    email: "Email",
    phone: "Phone",
    address: "Address",
    linkedin: "LinkedIn",
    github: "GitHub",
    portfolio: "Portfolio",
    profilePhoto: "Profile Photo",
    careerSummary: "Career Summary",
    professionalSummary: "Professional Summary",
    institution: "Institution",
    degree: "Degree",
    fieldOfStudy: "Field of Study",
    grade: "Grade / CGPA",
    startDate: "Start Date",
    endDate: "End Date",
    description: "Description",
    company: "Company",
    position: "Position",
    location: "Location",
    currentWorkHere: "I currently work here",
    projectName: "Project Name",
    technologies: "Technologies (comma separated)",
    projectLink: "Project Link",
    technicalSkills: "Technical Skills",
    skillPlaceholder: "e.g., React, Python, UI/UX",
    achievements: "Achievements",
    certifications: "Certifications",
    languages: "Languages",
    hobbies: "Hobbies & Interests",
    addEducation: "Add Education",
    addExperience: "Add Experience",
    addProject: "Add Project",
    addAchievement: "Add Achievement",
    addCertification: "Add Certification",
    addLanguage: "Add Language",
    addHobby: "Add Hobby",
    certificationName: "Certification Name",
    issuer: "Issuer",
    date: "Date",
    credentialId: "Credential ID (optional)",
    languageName: "Language",
    proficiency: "Proficiency",
    hobbyName: "Hobby / Interest",
    stepPersonal: "Personal",
    stepEducation: "Education",
    stepExperience: "Experience",
    stepSkills: "Skills",
    stepProjects: "Projects",
    stepAchievements: "Achievements",
    stepPreview: "Preview",
    templateClassic: "Classic Minimal",
    templateCorporate: "Corporate Duo",
    templateExecutive: "Executive Ruby",
    templateSleek: "Sleek Tech",
    templateWhitehall: "Whitehall Black",
    templateModern: "Modern ATS Pro",
    basic: "Basic",
    advanced: "Advanced",
    edit: "Edit",
    save: "Save",
  },
  mr: {
    upgradePremium: "प्रीमियम अपग्रेड करा ₹49",
    premiumActive: "प्रीमियम सक्रिय",
    livePreview: "लाइव्ह पूर्वावलोकन",
    downloadPDF: "पीडीएफ डाउनलोड करा",
    unlockPremium: "प्रीमियम अनलॉक करा",
    unlockNow: "आता अनलॉक करा (रझरपे)",
    back: "मागे",
    next: "पुढे",
    clearAll: "सर्व हटवा",
    clearConfirm: "तुम्हाला खात्री आहे? सर्व रेझ्युमे डेटा हटेल.",
    yesClear: "होय, सर्व हटवा",
    cancel: "रद्द करा",
    atsScore: "एटीएस रेझ्युमे स्कोअर",
    autoImprove: "एआयने सुधारणा करा",
    aiSummary: "एआय सारांश तयार करा",
    aiSkills: "एआय कौशल्ये सुचवा",
    aiProject: "एआय प्रकल्प सुचवा",
    upgradeToUnlock: "एटीएस स्कोअर आणि एआय फीचर्ससाठी अपग्रेड करा",
    resumeReady: "तुमचा रेझ्युमे तयार आहे! उजव्या बाजूला पूर्ण पूर्वावलोकन पहा.",
    photoUpload: "फोटो अपलोड करा",
    photoMaxSize: "कमाल २एमबी, जेपीजी किंवा पीएनजी",
    remove: "हटवा",
    add: "जोडा",
    fullName: "पूर्ण नाव",
    professionalTitle: "व्यावसायिक शीर्षक",
    email: "ईमेल",
    phone: "फोन",
    address: "पत्ता",
    linkedin: "लिंक्डइन",
    github: "गिटहब",
    portfolio: "पोर्टफोलिओ",
    profilePhoto: "प्रोफाइल फोटो",
    careerSummary: "करिअर सारांश",
    professionalSummary: "व्यावसायिक सारांश",
    institution: "शिक्षण संस्था",
    degree: "पदवी",
    fieldOfStudy: "अभ्यास क्षेत्र",
    grade: "ग्रेड / सीजीपीए",
    startDate: "सुरुवात तारीख",
    endDate: "शेवटची तारीख",
    description: "वर्णन",
    company: "कंपनी",
    position: "पद",
    location: "स्थान",
    currentWorkHere: "मी सध्या येथे कार्यरत आहे",
    projectName: "प्रकल्प नाव",
    technologies: "तंत्रज्ञान (स्वल्पविरामाने विभागलेले)",
    projectLink: "प्रकल्प लिंक",
    technicalSkills: "तांत्रिक कौशल्ये",
    skillPlaceholder: "उदा., React, Python, UI/UX",
    achievements: "कामगिरी",
    certifications: "प्रमाणपत्रे",
    languages: "भाषा",
    hobbies: "छंद आणि आवडी",
    addEducation: "शिक्षण जोडा",
    addExperience: "अनुभव जोडा",
    addProject: "प्रकल्प जोडा",
    addAchievement: "कामगिरी जोडा",
    addCertification: "प्रमाणपत्र जोडा",
    addLanguage: "भाषा जोडा",
    addHobby: "छंद जोडा",
    certificationName: "प्रमाणपत्र नाव",
    issuer: "प्रदाता",
    date: "तारीख",
    credentialId: "क्रेडेन्शियल आयडी (पर्यायी)",
    languageName: "भाषा",
    proficiency: "प्रवीणता",
    hobbyName: "छंद / आवड",
    stepPersonal: "वैयक्तिक",
    stepEducation: "शिक्षण",
    stepExperience: "अनुभव",
    stepSkills: "कौशल्ये",
    stepProjects: "प्रकल्प",
    stepAchievements: "कामगिरी",
    stepPreview: "पूर्वावलोकन",
    templateClassic: "क्लासिक मिनिमल",
    templateCorporate: "कॉर्पोरेट डुओ",
    templateExecutive: "एक्झिक्युटिव्ह रुबी",
    templateSleek: "स्लीक टेक",
    templateWhitehall: "व्हाइटहॉल ब्लॅक",
    templateModern: "मॉडर्न एटीएस प्रो",
    basic: "मूलभूत",
    advanced: "प्रगत",
    edit: "संपादित करा",
    save: "जतन करा",
  },
};

// ---------- Types ----------
interface PersonalInfo {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  address: string;
  linkedin: string;
  github: string;
  portfolio: string;
  photo: string;
  careerSummary: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  grade: string;
  description: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link: string;
  startDate: string;
  endDate: string;
}

interface Skill {
  id: string;
  name: string;
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId: string;
}

interface LanguageItem {
  id: string;
  name: string;
  proficiency: "Basic" | "Conversational" | "Professional" | "Native";
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
}

interface Hobby {
  id: string;
  name: string;
}

interface ResumeData {
  personal: PersonalInfo;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: Skill[];
  certifications: Certification[];
  languages: LanguageItem[];
  achievements: Achievement[];
  hobbies: Hobby[];
}

// ---------- Default Empty Data ----------
const emptyPersonal: PersonalInfo = {
  fullName: "",
  professionalTitle: "",
  email: "",
  phone: "",
  address: "",
  linkedin: "",
  github: "",
  portfolio: "",
  photo: "",
  careerSummary: "",
};

const emptyResumeData: ResumeData = {
  personal: emptyPersonal,
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  languages: [],
  achievements: [],
  hobbies: [],
};

// ---------- Context ----------
interface ResumeContextType {
  resumeData: ResumeData;
  updatePersonal: (data: Partial<PersonalInfo>) => void;
  addEducation: (edu: Education) => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  addExperience: (exp: Experience) => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, data: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addSkill: (skill: Skill) => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;
  addCertification: (cert: Certification) => void;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
  addLanguage: (lang: LanguageItem) => void;
  updateLanguage: (id: string, data: Partial<LanguageItem>) => void;
  removeLanguage: (id: string) => void;
  addAchievement: (ach: Achievement) => void;
  updateAchievement: (id: string, data: Partial<Achievement>) => void;
  removeAchievement: (id: string) => void;
  addHobby: (hobby: Hobby) => void;
  updateHobby: (id: string, data: Partial<Hobby>) => void;
  removeHobby: (id: string) => void;
  isPremium: boolean;
  setIsPremium: (val: boolean) => void;
  selectedTemplate: string;
  setSelectedTemplate: (template: string) => void;
  resetAll: () => void;
  lang: Language;
  setLang: (lang: Language) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error("useResume must be used within ResumeProvider");
  return ctx;
};

// ---------- Provider ----------
function ResumeProvider({ children }: { children: React.ReactNode }) {
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [isPremium, setIsPremium] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("Classic Minimal");
  const [lang, setLang] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("ayushnexa_resume_data");
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (e) {}
    }
    const premiumSaved = localStorage.getItem("ayushnexa_premium");
    if (premiumSaved === "true") setIsPremium(true);
    const templateSaved = localStorage.getItem("ayushnexa_template");
    if (templateSaved) setSelectedTemplate(templateSaved);
    const langSaved = localStorage.getItem("ayushnexa_lang") as Language;
    if (langSaved === "en" || langSaved === "mr") setLang(langSaved);
  }, []);

  useEffect(() => {
    localStorage.setItem("ayushnexa_resume_data", JSON.stringify(resumeData));
  }, [resumeData]);

  useEffect(() => {
    localStorage.setItem("ayushnexa_premium", String(isPremium));
  }, [isPremium]);

  useEffect(() => {
    localStorage.setItem("ayushnexa_template", selectedTemplate);
  }, [selectedTemplate]);

  useEffect(() => {
    localStorage.setItem("ayushnexa_lang", lang);
  }, [lang]);

  const resetAll = () => {
    setResumeData(emptyResumeData);
    localStorage.removeItem("ayushnexa_resume_data");
  };

  const updatePersonal = (data: Partial<PersonalInfo>) => {
    setResumeData((prev) => ({
      ...prev,
      personal: { ...prev.personal, ...data },
    }));
  };

  const addEducation = (edu: Education) => {
    setResumeData((prev) => ({
      ...prev,
      education: [...prev.education, edu],
    }));
  };

  const updateEducation = (id: string, data: Partial<Education>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((e) =>
        e.id === id ? { ...e, ...data } : e
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((e) => e.id !== id),
    }));
  };

  const addExperience = (exp: Experience) => {
    setResumeData((prev) => ({
      ...prev,
      experience: [...prev.experience, exp],
    }));
  };

  const updateExperience = (id: string, data: Partial<Experience>) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) =>
        e.id === id ? { ...e, ...data } : e
      ),
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experience: prev.experience.filter((e) => e.id !== id),
    }));
  };

  const addProject = (project: Project) => {
    setResumeData((prev) => ({
      ...prev,
      projects: [...prev.projects, project],
    }));
  };

  const updateProject = (id: string, data: Partial<Project>) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    }));
  };

  const removeProject = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const addSkill = (skill: Skill) => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, skill],
    }));
  };

  const updateSkill = (id: string, data: Partial<Skill>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, ...data } : s)),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const addCertification = (cert: Certification) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: [...prev.certifications, cert],
    }));
  };

  const updateCertification = (id: string, data: Partial<Certification>) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.map((c) =>
        c.id === id ? { ...c, ...data } : c
      ),
    }));
  };

  const removeCertification = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((c) => c.id !== id),
    }));
  };

  const addLanguage = (lang: LanguageItem) => {
    setResumeData((prev) => ({
      ...prev,
      languages: [...prev.languages, lang],
    }));
  };

  const updateLanguage = (id: string, data: Partial<LanguageItem>) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.map((l) =>
        l.id === id ? { ...l, ...data } : l
      ),
    }));
  };

  const removeLanguage = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      languages: prev.languages.filter((l) => l.id !== id),
    }));
  };

  const addAchievement = (ach: Achievement) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: [...prev.achievements, ach],
    }));
  };

  const updateAchievement = (id: string, data: Partial<Achievement>) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.map((a) =>
        a.id === id ? { ...a, ...data } : a
      ),
    }));
  };

  const removeAchievement = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((a) => a.id !== id),
    }));
  };

  const addHobby = (hobby: Hobby) => {
    setResumeData((prev) => ({
      ...prev,
      hobbies: [...prev.hobbies, hobby],
    }));
  };

  const updateHobby = (id: string, data: Partial<Hobby>) => {
    setResumeData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.map((h) =>
        h.id === id ? { ...h, ...data } : h
      ),
    }));
  };

  const removeHobby = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((h) => h.id !== id),
    }));
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        updatePersonal,
        addEducation,
        updateEducation,
        removeEducation,
        addExperience,
        updateExperience,
        removeExperience,
        addProject,
        updateProject,
        removeProject,
        addSkill,
        updateSkill,
        removeSkill,
        addCertification,
        updateCertification,
        removeCertification,
        addLanguage,
        updateLanguage,
        removeLanguage,
        addAchievement,
        updateAchievement,
        removeAchievement,
        addHobby,
        updateHobby,
        removeHobby,
        isPremium,
        setIsPremium,
        selectedTemplate,
        setSelectedTemplate,
        resetAll,
        lang,
        setLang,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
}

// ---------- UI Components ----------
const Input = ({
  label,
  icon: Icon,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: React.ElementType;
}) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
      )}
      <input
        {...props}
        className={`w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none ${
          Icon ? "pl-9" : ""
        }`}
      />
    </div>
  </div>
);

const TextArea = ({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <textarea
      {...props}
      className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none"
      rows={4}
    />
  </div>
);

const SectionCard = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 hover:shadow-md transition">
    <div className="flex items-center gap-2">
      {Icon && <Icon className="w-5 h-5 text-indigo-500" />}
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    {children}
  </div>
);

// ---------- Step Components ----------
function PersonalInfoStep() {
  const { resumeData, updatePersonal, isPremium, lang } = useResume();
  const t = translations[lang];
  const [photoPreview, setPhotoPreview] = useState(resumeData.personal.photo);

  useEffect(() => {
    setPhotoPreview(resumeData.personal.photo);
  }, [resumeData.personal.photo]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert(t.photoMaxSize);
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhotoPreview(base64);
        updatePersonal({ photo: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoPreview("");
    updatePersonal({ photo: "" });
  };

  const generateAISummary = () => {
    if (!isPremium) return;
    const { fullName, professionalTitle } = resumeData.personal;
    const skillNames = resumeData.skills.slice(0, 3).map((s) => s.name).filter(Boolean);
    const summary = `${fullName || "Candidate"} is a ${professionalTitle || "professional"} with expertise in ${skillNames.join(", ") || "various technologies"}. Proven track record of delivering high-impact solutions.`;
    updatePersonal({ careerSummary: summary });
  };

  return (
    <div className="space-y-6">
      <SectionCard title={t.profilePhoto} icon={Camera}>
        <div className="flex items-center gap-4">
          {photoPreview ? (
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-gray-100 border-2 border-indigo-100 shadow-sm">
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
              <button onClick={removePhoto} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 shadow-md">
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <label className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
              <Camera className="w-4 h-4" />
              <span className="text-sm">{t.photoUpload}</span>
              <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={handlePhotoUpload} />
            </label>
          )}
        </div>
        <p className="text-xs text-gray-400">{t.photoMaxSize}</p>
      </SectionCard>

      <SectionCard title={t.basic} icon={User}>
        <div className="grid md:grid-cols-2 gap-4">
          <Input label={t.fullName} value={resumeData.personal.fullName} onChange={(e) => updatePersonal({ fullName: e.target.value })} placeholder="Rahul Sharma" />
          <Input label={t.professionalTitle} value={resumeData.personal.professionalTitle} onChange={(e) => updatePersonal({ professionalTitle: e.target.value })} placeholder="Software Engineer" />
          <Input label={t.email} type="email" value={resumeData.personal.email} onChange={(e) => updatePersonal({ email: e.target.value })} placeholder="hello@example.com" />
          <Input label={t.phone} value={resumeData.personal.phone} onChange={(e) => updatePersonal({ phone: e.target.value })} placeholder="+91 98765 43210" />
          <Input label={t.address} value={resumeData.personal.address} onChange={(e) => updatePersonal({ address: e.target.value })} placeholder="Mumbai, India" />
          <Input label={t.linkedin} value={resumeData.personal.linkedin} onChange={(e) => updatePersonal({ linkedin: e.target.value })} placeholder="linkedin.com/in/username" />
          <Input label={t.github} value={resumeData.personal.github} onChange={(e) => updatePersonal({ github: e.target.value })} placeholder="github.com/username" />
          <Input label={t.portfolio} value={resumeData.personal.portfolio} onChange={(e) => updatePersonal({ portfolio: e.target.value })} placeholder="yourportfolio.com" />
        </div>
      </SectionCard>

      <SectionCard title={t.careerSummary} icon={FileText}>
        <TextArea label={t.professionalSummary} value={resumeData.personal.careerSummary} onChange={(e) => updatePersonal({ careerSummary: e.target.value })} placeholder="Write a compelling summary..." />
        {isPremium && (
          <button onClick={generateAISummary} className="flex items-center gap-2 text-indigo-600 text-sm font-medium">
            <Sparkles className="w-4 h-4" /> {t.aiSummary}
          </button>
        )}
      </SectionCard>
    </div>
  );
}

function EducationStep() {
  const { resumeData, addEducation, updateEducation, removeEducation, lang } = useResume();
  const t = translations[lang];

  const addNew = () => {
    addEducation({
      id: Date.now().toString(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      grade: "",
      description: "",
    });
  };

  return (
    <div className="space-y-4">
      {resumeData.education.map((edu) => (
        <SectionCard key={edu.id} title={t.institution} icon={BookOpen}>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label={t.institution} value={edu.institution} onChange={(e) => updateEducation(edu.id, { institution: e.target.value })} placeholder="IIT Delhi" />
            <Input label={t.degree} value={edu.degree} onChange={(e) => updateEducation(edu.id, { degree: e.target.value })} placeholder="B.Tech" />
            <Input label={t.fieldOfStudy} value={edu.fieldOfStudy} onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })} placeholder="Computer Science" />
            <Input label={t.grade} value={edu.grade} onChange={(e) => updateEducation(edu.id, { grade: e.target.value })} placeholder="8.5 CGPA" />
            <Input label={t.startDate} type="month" value={edu.startDate} onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })} />
            <Input label={t.endDate} type="month" value={edu.endDate} onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })} />
          </div>
          <TextArea label={t.description} value={edu.description} onChange={(e) => updateEducation(edu.id, { description: e.target.value })} placeholder="Relevant coursework..." />
          <button onClick={() => removeEducation(edu.id)} className="text-red-500 text-sm flex items-center gap-1"><Trash2 className="w-4 h-4" /> {t.remove}</button>
        </SectionCard>
      ))}
      <button onClick={addNew} className="flex items-center gap-2 text-indigo-600"><Plus className="w-4 h-4" /> {t.addEducation}</button>
    </div>
  );
}

function ExperienceStep() {
  const { resumeData, addExperience, updateExperience, removeExperience, lang } = useResume();
  const t = translations[lang];

  const addNew = () => {
    addExperience({
      id: Date.now().toString(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      achievements: [],
    });
  };

  return (
    <div className="space-y-4">
      {resumeData.experience.map((exp) => (
        <SectionCard key={exp.id} title={t.company} icon={Briefcase}>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label={t.company} value={exp.company} onChange={(e) => updateExperience(exp.id, { company: e.target.value })} placeholder="Google" />
            <Input label={t.position} value={exp.position} onChange={(e) => updateExperience(exp.id, { position: e.target.value })} placeholder="Software Engineer" />
            <Input label={t.location} value={exp.location} onChange={(e) => updateExperience(exp.id, { location: e.target.value })} placeholder="Bangalore" />
            <Input label={t.startDate} type="month" value={exp.startDate} onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })} />
            <Input label={t.endDate} type="month" value={exp.endDate} onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })} disabled={exp.current} />
            <div className="flex items-center gap-2"><input type="checkbox" checked={exp.current} onChange={(e) => updateExperience(exp.id, { current: e.target.checked })} className="rounded" /><label>{t.currentWorkHere}</label></div>
          </div>
          <TextArea label={t.description} value={exp.description} onChange={(e) => updateExperience(exp.id, { description: e.target.value })} placeholder="Describe responsibilities..." />
          <button onClick={() => removeExperience(exp.id)} className="text-red-500 text-sm flex items-center gap-1"><Trash2 className="w-4 h-4" /> {t.remove}</button>
        </SectionCard>
      ))}
      <button onClick={addNew} className="flex items-center gap-2 text-indigo-600"><Plus className="w-4 h-4" /> {t.addExperience}</button>
    </div>
  );
}

function ProjectsStep() {
  const { resumeData, addProject, updateProject, removeProject, isPremium, lang } = useResume();
  const t = translations[lang];

  const addNew = () => {
    addProject({
      id: Date.now().toString(),
      name: "",
      description: "",
      technologies: [],
      link: "",
      startDate: "",
      endDate: "",
    });
  };

  const generateAIProjects = () => {
    if (!isPremium) return;
    addProject({
      id: Date.now().toString(),
      name: "AI Suggested Project",
      description: "A full-stack application demonstrating technical skills.",
      technologies: ["Next.js", "TypeScript", "Tailwind"],
      link: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="space-y-4">
      {resumeData.projects.map((proj) => (
        <SectionCard key={proj.id} title={t.projectName} icon={Target}>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label={t.projectName} value={proj.name} onChange={(e) => updateProject(proj.id, { name: e.target.value })} placeholder="E-commerce App" />
            <Input label={t.technologies} value={proj.technologies.join(", ")} onChange={(e) => updateProject(proj.id, { technologies: e.target.value.split(",").map(t => t.trim()) })} placeholder="React, Node.js" />
            <Input label={t.projectLink} value={proj.link} onChange={(e) => updateProject(proj.id, { link: e.target.value })} placeholder="github.com/username/project" />
            <Input label={t.startDate} type="month" value={proj.startDate} onChange={(e) => updateProject(proj.id, { startDate: e.target.value })} />
            <Input label={t.endDate} type="month" value={proj.endDate} onChange={(e) => updateProject(proj.id, { endDate: e.target.value })} />
          </div>
          <TextArea label={t.description} value={proj.description} onChange={(e) => updateProject(proj.id, { description: e.target.value })} placeholder="Explain the project..." />
          <button onClick={() => removeProject(proj.id)} className="text-red-500 text-sm"><Trash2 className="w-4 h-4 inline" /> {t.remove}</button>
        </SectionCard>
      ))}
      <div className="flex gap-3">
        <button onClick={addNew} className="flex items-center gap-2 text-indigo-600"><Plus className="w-4 h-4" /> {t.addProject}</button>
        {isPremium && <button onClick={generateAIProjects} className="flex items-center gap-2 text-purple-600"><Sparkles className="w-4 h-4" /> {t.aiProject}</button>}
      </div>
    </div>
  );
}

function SkillsStep() {
  const { resumeData, addSkill, removeSkill, isPremium, lang } = useResume();
  const t = translations[lang];
  const [newSkill, setNewSkill] = useState("");

  const handleAdd = () => {
    if (newSkill.trim()) {
      addSkill({ id: Date.now().toString(), name: newSkill.trim(), level: "Intermediate" });
      setNewSkill("");
    }
  };

  const suggestAISkills = () => {
    if (!isPremium) return;
    const suggestions = ["TypeScript", "Tailwind CSS", "Next.js", "Python", "GraphQL"];
    suggestions.forEach(skill => {
      if (!resumeData.skills.some(s => s.name === skill)) {
        addSkill({ id: Date.now().toString(), name: skill, level: "Intermediate" });
      }
    });
  };

  return (
    <div className="space-y-4">
      <SectionCard title={t.technicalSkills} icon={Zap}>
        <div className="flex gap-2">
          <div className="flex-1"><Input label="" placeholder={t.skillPlaceholder} value={newSkill} onChange={(e) => setNewSkill(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} /></div>
          <button onClick={handleAdd} className="px-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700">{t.add}</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {resumeData.skills.map(skill => (
            <span key={skill.id} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-2">{skill.name}<button onClick={() => removeSkill(skill.id)}><X className="w-3 h-3" /></button></span>
          ))}
        </div>
        {isPremium && <button onClick={suggestAISkills} className="flex items-center gap-2 text-indigo-600 text-sm"><Sparkles className="w-4 h-4" /> {t.aiSkills}</button>}
      </SectionCard>
    </div>
  );
}

// Writable certifications, languages, hobbies components
function CertificationsSection() {
  const { resumeData, addCertification, updateCertification, removeCertification, lang } = useResume();
  const t = translations[lang];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Certification>({ id: "", name: "", issuer: "", date: "", credentialId: "" });

  const addNew = () => {
    const newCert = { id: Date.now().toString(), name: "", issuer: "", date: "", credentialId: "" };
    addCertification(newCert);
    setEditingId(newCert.id);
    setEditForm(newCert);
  };

  const startEdit = (cert: Certification) => {
    setEditingId(cert.id);
    setEditForm({ ...cert });
  };

  const saveEdit = () => {
    if (editingId) {
      updateCertification(editingId, editForm);
      setEditingId(null);
    }
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <SectionCard title={t.certifications} icon={Award}>
      {resumeData.certifications.map(cert => (
        <div key={cert.id} className="border-b pb-3 mb-3 last:border-0">
          {editingId === cert.id ? (
            <div className="space-y-3">
              <Input label={t.certificationName} value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} placeholder="AWS Certified Developer" />
              <Input label={t.issuer} value={editForm.issuer} onChange={e => setEditForm({ ...editForm, issuer: e.target.value })} placeholder="Amazon" />
              <Input label={t.date} type="month" value={editForm.date} onChange={e => setEditForm({ ...editForm, date: e.target.value })} />
              <Input label={t.credentialId} value={editForm.credentialId} onChange={e => setEditForm({ ...editForm, credentialId: e.target.value })} />
              <div className="flex gap-2">
                <button onClick={saveEdit} className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm">Save</button>
                <button onClick={cancelEdit} className="px-3 py-1 bg-gray-300 rounded-lg text-sm">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{cert.name || "Untitled"}</p>
                <p className="text-sm text-gray-500">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(cert)} className="text-indigo-600 text-sm">Edit</button>
                <button onClick={() => removeCertification(cert.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={addNew} className="flex items-center gap-2 text-indigo-600 mt-2"><Plus className="w-4 h-4" /> {t.addCertification}</button>
    </SectionCard>
  );
}

function LanguagesSection() {
  const { resumeData, addLanguage, updateLanguage, removeLanguage, lang } = useResume();
  const t = translations[lang];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<LanguageItem>({ id: "", name: "", proficiency: "Professional" });

  const addNew = () => {
    const newLang = { id: Date.now().toString(), name: "", proficiency: "Professional" as const };
    addLanguage(newLang);
    setEditingId(newLang.id);
    setEditForm(newLang);
  };

  const startEdit = (langItem: LanguageItem) => {
    setEditingId(langItem.id);
    setEditForm({ ...langItem });
  };

  const saveEdit = () => {
    if (editingId) {
      updateLanguage(editingId, editForm);
      setEditingId(null);
    }
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <SectionCard title={t.languages} icon={Globe}>
      {resumeData.languages.map(langItem => (
        <div key={langItem.id} className="border-b pb-3 mb-3 last:border-0">
          {editingId === langItem.id ? (
            <div className="space-y-3">
              <Input label={t.languageName} value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} placeholder="English" />
              <select value={editForm.proficiency} onChange={e => setEditForm({ ...editForm, proficiency: e.target.value as any })} className="w-full px-3 py-2 border rounded-xl">
                <option value="Basic">Basic</option>
                <option value="Conversational">Conversational</option>
                <option value="Professional">Professional</option>
                <option value="Native">Native</option>
              </select>
              <div className="flex gap-2">
                <button onClick={saveEdit} className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm">Save</button>
                <button onClick={cancelEdit} className="px-3 py-1 bg-gray-300 rounded-lg text-sm">Cancel</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div><span className="font-medium">{langItem.name || "Language"}</span><span className="text-sm text-gray-500 ml-2">({langItem.proficiency})</span></div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(langItem)} className="text-indigo-600 text-sm">Edit</button>
                <button onClick={() => removeLanguage(langItem.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={addNew} className="flex items-center gap-2 text-indigo-600 mt-2"><Plus className="w-4 h-4" /> {t.addLanguage}</button>
    </SectionCard>
  );
}

function HobbiesSection() {
  const { resumeData, addHobby, updateHobby, removeHobby, lang } = useResume();
  const t = translations[lang];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const addNew = () => {
    const newHobby = { id: Date.now().toString(), name: "" };
    addHobby(newHobby);
    setEditingId(newHobby.id);
    setEditValue("");
  };

  const startEdit = (hobby: Hobby) => {
    setEditingId(hobby.id);
    setEditValue(hobby.name);
  };

  const saveEdit = () => {
    if (editingId && editValue.trim()) {
      updateHobby(editingId, { name: editValue.trim() });
      setEditingId(null);
      setEditValue("");
    }
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <SectionCard title={t.hobbies} icon={Heart}>
      <div className="flex flex-wrap gap-2 mb-3">
        {resumeData.hobbies.map(hobby => (
          editingId === hobby.id ? (
            <div key={hobby.id} className="flex items-center gap-2 bg-white border rounded-full px-3 py-1">
              <input value={editValue} onChange={e => setEditValue(e.target.value)} className="outline-none text-sm" placeholder="Hobby" autoFocus />
              <button onClick={saveEdit} className="text-green-600 text-xs">✓</button>
              <button onClick={cancelEdit} className="text-gray-500 text-xs">✗</button>
            </div>
          ) : (
            <span key={hobby.id} className="inline-flex items-center gap-1 bg-gray-100 rounded-full px-3 py-1 text-sm">
              {hobby.name}
              <button onClick={() => startEdit(hobby)} className="text-indigo-500 text-xs ml-1">✎</button>
              <button onClick={() => removeHobby(hobby.id)}><X className="w-3 h-3 text-gray-500" /></button>
            </span>
          )
        ))}
      </div>
      <button onClick={addNew} className="flex items-center gap-2 text-indigo-600 text-sm"><Plus className="w-4 h-4" /> {t.addHobby}</button>
    </SectionCard>
  );
}

function AchievementsStep() {
  const { resumeData, addAchievement, updateAchievement, removeAchievement, lang } = useResume();
  const t = translations[lang];
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Achievement>({ id: "", title: "", description: "", date: "" });

  const addNew = () => {
    const newAch = { id: Date.now().toString(), title: "", description: "", date: "" };
    addAchievement(newAch);
    setEditingId(newAch.id);
    setEditForm(newAch);
  };

  const startEdit = (ach: Achievement) => {
    setEditingId(ach.id);
    setEditForm({ ...ach });
  };

  const saveEdit = () => {
    if (editingId) {
      updateAchievement(editingId, editForm);
      setEditingId(null);
    }
  };

  const cancelEdit = () => setEditingId(null);

  return (
    <div className="space-y-6">
      <SectionCard title={t.achievements} icon={Award}>
        {resumeData.achievements.map(ach => (
          <div key={ach.id} className="border-b pb-3 mb-3 last:border-0">
            {editingId === ach.id ? (
              <div className="space-y-3">
                <Input label="Title" value={editForm.title} onChange={e => setEditForm({ ...editForm, title: e.target.value })} placeholder="Hackathon Winner" />
                <TextArea label="Description" value={editForm.description} onChange={e => setEditForm({ ...editForm, description: e.target.value })} placeholder="Describe the achievement..." />
                <Input label="Date" type="month" value={editForm.date} onChange={e => setEditForm({ ...editForm, date: e.target.value })} />
                <div className="flex gap-2">
                  <button onClick={saveEdit} className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm">Save</button>
                  <button onClick={cancelEdit} className="px-3 py-1 bg-gray-300 rounded-lg text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{ach.title || "Untitled"}</p>
                  <p className="text-sm text-gray-500">{ach.description}</p>
                  {ach.date && <p className="text-xs text-gray-400">{ach.date}</p>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(ach)} className="text-indigo-600 text-sm">Edit</button>
                  <button onClick={() => removeAchievement(ach.id)} className="text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            )}
          </div>
        ))}
        <button onClick={addNew} className="flex items-center gap-2 text-indigo-600"><Plus className="w-4 h-4" /> {t.addAchievement}</button>
      </SectionCard>

      <CertificationsSection />
      <LanguagesSection />
      <HobbiesSection />
    </div>
  );
}

// ---------- ATS Analysis ----------
function ATSAnalysis({ onAutoImprove }: { onAutoImprove: () => void }) {
  const { resumeData, lang } = useResume();
  const t = translations[lang];
  const [score, setScore] = useState(0);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    let s = 0;
    const sugg: string[] = [];
    const { personal, skills, experience, projects, education } = resumeData;
    if (personal.fullName && personal.email) s += 10;
    else sugg.push("Add full name and email");
    if (personal.careerSummary.length > 50) s += 10;
    else sugg.push("Write a detailed career summary (50+ chars)");
    if (skills.length >= 5) s += 15;
    else sugg.push("Add at least 5 technical skills");
    if (experience.length > 0) { s += 20; if (experience.some(e => e.achievements?.length)) s += 10; else sugg.push("Add measurable achievements in experience"); } else sugg.push("Add work experience or internships");
    if (projects.length > 0) s += 15;
    if (education.length > 0) s += 10;
    if (personal.linkedin || personal.github) s += 5;
    s = Math.min(s, 100);
    setScore(s);
    setSuggestions(sugg.slice(0, 4));
  }, [resumeData]);

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl p-6 border border-indigo-100 mt-6">
      <div className="flex justify-between items-center"><div className="flex items-center gap-2"><Target className="w-5 h-5 text-indigo-600" /><h3 className="font-semibold">{t.atsScore}</h3></div><span className="text-2xl font-bold text-indigo-600">{score}%</span></div>
      <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-indigo-600 rounded-full transition-all" style={{ width: `${score}%` }} /></div>
      <div className="mt-4 space-y-2">{suggestions.map((sug, idx) => <div key={idx} className="flex items-start gap-2 text-sm text-gray-600"><span className="text-indigo-500">•</span>{sug}</div>)}</div>
      <button onClick={onAutoImprove} className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 flex items-center justify-center gap-2"><Zap className="w-4 h-4" /> {t.autoImprove}</button>
    </div>
  );
}

function PreviewStep() {
  const { isPremium, lang } = useResume();
  const t = translations[lang];
  const [showATSAnalysis] = useState(true);
  const handleAutoImprove = () => alert("AI improvement demo");
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center"><h2 className="text-xl font-semibold">{t.livePreview}</h2>{!isPremium && <div className="bg-amber-50 px-3 py-1 rounded-full text-amber-700 text-xs flex items-center gap-1"><Lock className="w-3 h-3" /> {t.upgradeToUnlock}</div>}</div>
      {isPremium && showATSAnalysis && <ATSAnalysis onAutoImprove={handleAutoImprove} />}
      <div className="text-center text-gray-500 text-sm mt-8">{t.resumeReady}</div>
    </div>
  );
}

// ---------- Premium Redesigned Classic Minimal Template ----------
const ClassicMinimalTemplate = memo(({ data }: { data: ResumeData }) => {
  return (
    <div className="bg-white text-gray-800 font-['Inter',system-ui,sans-serif] p-8 max-w-4xl mx-auto shadow-sm">
      <div className="text-center border-b border-gray-200 pb-6 mb-6">
        {data.personal.photo && (
          <div className="flex justify-center mb-4">
            <img
              src={data.personal.photo}
              alt="Profile"
              className="w-28 h-28 rounded-full object-cover border-2 border-gray-100 shadow-md"
            />
          </div>
        )}
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{data.personal.fullName || "Your Name"}</h1>
        <p className="text-lg text-gray-600 mt-1">{data.personal.professionalTitle || "Professional Title"}</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-gray-500 mt-3">
          {data.personal.email && <span>{data.personal.email}</span>}
          {data.personal.phone && <span>{data.personal.phone}</span>}
          {data.personal.address && <span>{data.personal.address}</span>}
          {data.personal.linkedin && <span>{data.personal.linkedin}</span>}
          {data.personal.github && <span>{data.personal.github}</span>}
        </div>
      </div>

      <div className="space-y-5">
        {data.personal.careerSummary && (
          <section>
            <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-200 pb-1 mb-3">PROFESSIONAL SUMMARY</h2>
            <p className="text-gray-700 text-sm leading-relaxed">{data.personal.careerSummary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-200 pb-1 mb-3">WORK EXPERIENCE</h2>
            <div className="space-y-4">
              {data.experience.map(exp => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <h3 className="text-md font-semibold text-gray-800">{exp.position}</h3>
                    <span className="text-xs text-gray-500">{exp.startDate} – {exp.current ? "Present" : exp.endDate}</span>
                  </div>
                  <p className="text-sm font-medium text-gray-600">{exp.company}{exp.location && `, ${exp.location}`}</p>
                  {exp.description && <p className="text-sm text-gray-600 mt-1">{exp.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.education.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-200 pb-1 mb-3">EDUCATION</h2>
            <div className="space-y-3">
              {data.education.map(edu => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline flex-wrap">
                    <h3 className="text-md font-semibold text-gray-800">{edu.degree}{edu.fieldOfStudy && ` in ${edu.fieldOfStudy}`}</h3>
                    <span className="text-xs text-gray-500">{edu.startDate} – {edu.endDate}</span>
                  </div>
                  <p className="text-sm text-gray-600">{edu.institution}</p>
                  {edu.grade && <p className="text-xs text-gray-500">Grade: {edu.grade}</p>}
                  {edu.description && <p className="text-sm text-gray-600 mt-1">{edu.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.skills.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-200 pb-1 mb-3">TECHNICAL SKILLS</h2>
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map(skill => (
                <span key={skill.id} className="bg-gray-100 text-gray-700 text-xs px-2.5 py-1 rounded-full">{skill.name}</span>
              ))}
            </div>
          </section>
        )}

        {data.projects.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-200 pb-1 mb-3">PROJECTS</h2>
            <div className="space-y-3">
              {data.projects.map(proj => (
                <div key={proj.id}>
                  <h3 className="text-md font-semibold text-gray-800">{proj.name}</h3>
                  {proj.technologies.length > 0 && <p className="text-xs text-gray-500">{proj.technologies.join(", ")}</p>}
                  {proj.description && <p className="text-sm text-gray-600 mt-1">{proj.description}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {data.certifications.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-200 pb-1 mb-3">CERTIFICATIONS</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {data.certifications.map(cert => (
                <li key={cert.id}>{cert.name}{cert.issuer && ` (${cert.issuer})`}</li>
              ))}
            </ul>
          </section>
        )}

        {data.languages.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-200 pb-1 mb-3">LANGUAGES</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              {data.languages.map(lang => (
                <span key={lang.id}>{lang.name} – {lang.proficiency}</span>
              ))}
            </div>
          </section>
        )}

        {data.achievements.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-200 pb-1 mb-3">ACHIEVEMENTS</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              {data.achievements.map(ach => (
                <li key={ach.id}>{ach.title}</li>
              ))}
            </ul>
          </section>
        )}

        {data.hobbies.length > 0 && (
          <section>
            <h2 className="text-xs font-semibold tracking-wider text-gray-500 uppercase border-b border-gray-200 pb-1 mb-3">HOBBIES & INTERESTS</h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {data.hobbies.map(hobby => (
                <span key={hobby.id} className="bg-gray-50 px-2 py-0.5 rounded-full">{hobby.name}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
});
ClassicMinimalTemplate.displayName = "ClassicMinimalTemplate";

// ---------- Other Templates ----------
const CorporateDuoTemplate = memo(({ data }: { data: ResumeData }) => (
  <div className="bg-white text-gray-800 p-8 font-sans"><div className="flex gap-6"><div className="w-1/3 bg-gray-100 p-4 rounded"><h3 className="font-bold">{data.personal.fullName || "Your Name"}</h3><p className="text-sm">{data.personal.professionalTitle}</p></div><div className="w-2/3"><h2 className="font-semibold">Experience</h2>{data.experience.slice(0,2).map(exp => <div key={exp.id}><p className="font-medium">{exp.position}</p><p className="text-sm">{exp.company}</p></div>)}</div></div></div>
));
CorporateDuoTemplate.displayName = "CorporateDuoTemplate";

const ExecutiveRubyTemplate = memo(({ data }: { data: ResumeData }) => (
  <div className="bg-white text-gray-800 p-8 font-sans border-t-4 border-red-600"><h1 className="text-3xl font-serif">{data.personal.fullName || "Your Name"}</h1><div className="mt-4"><h2 className="text-xl font-serif">Summary</h2><p>{data.personal.careerSummary || "Your summary here"}</p></div></div>
));
ExecutiveRubyTemplate.displayName = "ExecutiveRubyTemplate";

const SleekTechTemplate = memo(({ data }: { data: ResumeData }) => (
  <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white p-8 font-sans"><div className="flex justify-between"><h1 className="text-2xl font-mono">{data.personal.fullName || "Your Name"}</h1><div className="text-right"><p>{data.personal.email}</p><p>{data.personal.phone}</p></div></div><hr className="my-4" /><div className="flex gap-4"><div className="w-1/3"><h3 className="font-mono">Skills</h3><ul>{data.skills.slice(0,4).map(s => <li key={s.id}>{s.name}</li>)}</ul></div><div className="w-2/3"><h3 className="font-mono">Experience</h3>{data.experience.slice(0,2).map(exp => <div key={exp.id}><p>{exp.position} at {exp.company}</p></div>)}</div></div></div>
));
SleekTechTemplate.displayName = "SleekTechTemplate";

const WhitehallBlackTemplate = memo(({ data }: { data: ResumeData }) => (
  <div className="bg-white text-gray-800 p-8 font-sans border border-black shadow-xl"><div className="text-center border-b pb-4"><h1 className="text-2xl uppercase tracking-wide">{data.personal.fullName || "Your Name"}</h1><p className="text-gray-600">{data.personal.professionalTitle}</p></div><div className="mt-4"><h2 className="font-bold text-sm uppercase">Profile</h2><p>{data.personal.careerSummary || "Profile here"}</p></div></div>
));
WhitehallBlackTemplate.displayName = "WhitehallBlackTemplate";

const ModernATSProTemplate = memo(({ data }: { data: ResumeData }) => (
  <div className="bg-white text-gray-800 p-8 font-sans"><div className="grid grid-cols-3 gap-4"><div className="col-span-1 bg-indigo-50 p-3 rounded"><h3 className="font-semibold">Contact</h3><p className="text-sm">{data.personal.email}</p><h3 className="font-semibold mt-2">Skills</h3><div className="flex flex-wrap gap-1">{data.skills.slice(0,5).map(s => <span key={s.id} className="bg-indigo-100 px-2 py-0.5 rounded text-xs">{s.name}</span>)}</div></div><div className="col-span-2"><h2 className="text-xl font-bold">{data.personal.fullName || "Your Name"}</h2><p className="text-gray-600">{data.personal.professionalTitle}</p><div className="mt-2"><h3 className="font-semibold">Experience</h3>{data.experience.slice(0,2).map(exp => <div key={exp.id}><p className="font-medium">{exp.position}</p><p>{exp.company}</p></div>)}</div></div></div></div>
));
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
    <div className="mb-4 p-3 bg-gray-50 rounded-xl">
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

  const generatePDF = useCallback(async () => {
    if (!previewRef.current) return;
    const html2pdf = (await import("html2pdf.js")).default;
    const element = previewRef.current;
    const opt = {
      margin:        [0.5, 0.5, 0.5, 0.5] as [number, number, number, number],
      filename:     `${resumeData.personal.fullName || "Resume"}.pdf`,
      image:        { type: "jpeg" as const, quality: 0.98 },
      html2canvas:  { scale: 2, letterRendering: true, useCORS: true, logging: false },
      jsPDF:        { unit: "in", format: "a4", orientation: "portrait" } as const,
    };
    await html2pdf().set(opt).from(element).save();
  }, [resumeData.personal.fullName]);

  const handleClearAll = () => { resetAll(); setShowClearConfirm(false); };
  const handleUpgrade = () => {
    alert("Razorpay integration ready. Payment successful (demo).\n\nUser data can be saved to Google Drive via webhook.");
    setIsPremium(true);
    setShowPremiumModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <Logo />
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === "en" ? "mr" : "en")} className="flex items-center gap-1 px-3 py-1.5 bg-white border rounded-xl hover:bg-gray-50"><Globe className="w-4 h-4" /><span className="text-sm font-medium">{lang === "en" ? "मराठी" : "English"}</span></button>
            {!isPremium && <button onClick={() => setShowPremiumModal(true)} className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium shadow-lg flex items-center gap-2"><Star className="w-4 h-4" /> {t.upgradePremium}</button>}
            {isPremium && <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full"><CheckCircle className="w-4 h-4" /> {t.premiumActive}</div>}
            <button onClick={() => setShowClearConfirm(true)} className="px-3 py-2 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 flex items-center gap-1"><RefreshCw className="w-4 h-4" /> {t.clearAll}</button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-8 overflow-x-auto pb-2">
          {steps.map((label, idx) => (
            <div key={idx} className={`flex items-center ${idx <= currentStep ? "text-indigo-600" : "text-gray-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${idx <= currentStep ? "bg-indigo-600 text-white shadow-md" : "bg-gray-200 text-gray-500"}`}>{idx + 1}</div>
              <span className="ml-2 text-sm font-medium hidden md:inline">{label}</span>
              {idx < steps.length - 1 && <div className="w-8 h-px bg-gray-300 mx-2 hidden md:block" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl p-6 overflow-auto max-h-[80vh] custom-scrollbar">
            <TemplateSelector />
            {stepComponents[currentStep]}
            <div className="flex justify-between mt-8 pt-4 border-t">
              <button onClick={prevStep} disabled={currentStep === 0} className="px-5 py-2 border rounded-xl disabled:opacity-50"><ChevronLeft className="w-4 h-4 inline" /> {t.back}</button>
              {currentStep === steps.length - 1 ? (
                <div className="flex gap-3">
                  <button onClick={generatePDF} className="px-5 py-2 bg-indigo-600 text-white rounded-xl flex items-center gap-2"><Download className="w-4 h-4" /> {t.downloadPDF}</button>
                  {!isPremium && <button onClick={() => setShowPremiumModal(true)} className="px-5 py-2 bg-amber-500 text-white rounded-xl">{t.unlockPremium}</button>}
                </div>
              ) : <button onClick={nextStep} className="px-5 py-2 bg-indigo-600 text-white rounded-xl">{t.next} <ChevronRight className="w-4 h-4 inline" /></button>}
            </div>
          </div>

          {/* A4 preview container */}
          <div className="relative flex justify-center items-start">
            <div className="bg-gray-100 rounded-3xl p-6 shadow-inner w-full">
              <div className="flex justify-between items-center mb-3 px-2"><h3 className="font-medium text-gray-500">{t.livePreview}</h3><Eye className="w-4 h-4 text-gray-400" /></div>
              <div className="bg-white shadow-2xl rounded-2xl overflow-hidden mx-auto w-full max-w-[210mm] transition-all">
                <div ref={previewRef} className="max-w-full">
                  <TemplatePreview data={resumeData} templateName={selectedTemplate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        @media print {
          body * {
            visibility: hidden;
          }
          #print-area, #print-area * {
            visibility: visible;
          }
          #print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>

      {showClearConfirm && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-md w-full p-6"><div className="flex items-center gap-3 text-red-600 mb-4"><AlertTriangle className="w-6 h-6" /><h2 className="text-xl font-bold">{t.clearAll}</h2></div><p className="text-gray-600 mb-6">{t.clearConfirm}</p><div className="flex gap-3 justify-end"><button onClick={() => setShowClearConfirm(false)} className="px-4 py-2 border rounded-xl">{t.cancel}</button><button onClick={handleClearAll} className="px-4 py-2 bg-red-600 text-white rounded-xl">{t.yesClear}</button></div></div></div>}

      {showPremiumModal && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-2xl max-w-md w-full p-6"><div className="flex justify-between items-center mb-4"><h2 className="text-2xl font-bold">{t.unlockPremium}</h2><button onClick={() => setShowPremiumModal(false)}><X className="w-5 h-5" /></button></div><div className="space-y-3 mb-6"><div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> 5 ATS Templates</div><div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-purple-500" /> AI Summary & Skills</div><div className="flex items-center gap-2"><TrendingUp className="w-4 h-4 text-blue-500" /> ATS Score & Keywords</div><div className="flex items-center gap-2"><Download className="w-4 h-4 text-indigo-500" /> Unlimited PDF</div></div><div className="text-3xl font-bold mb-4">₹49 <span className="text-sm font-normal">one-time</span></div><button onClick={handleUpgrade} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold">{t.unlockNow}</button></div></div>}
    </div>
  );
}