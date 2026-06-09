export type CandidateType = 'Groom' | 'Bride';

export interface PersonalDetails {
  fullName: string;
  gender: string;
  dateOfBirth: string;
  age: number;
  height: string;
  weight: string;
  bloodGroup: string;
  complexion: string;
  mobile: string;
  whatsApp: string;
  email: string;
  currentAddress: string;
  nativePlace: string;
}

export interface BirthDetails {
  timeOfBirth: string;
  placeOfBirth: string;
}

export interface Horoscope {
  rashi: string;
  zodiacSign: string;
  nakshatra: string;
  gotra: string;
  gan: string;
  nadi: string;
  charan: string;
  manglik: string; // e.g., 'No' | 'Yes' | 'Anshik'
  kundaliAvailable: string; // e.g., 'Yes' | 'No'
  horoscopeNotes: string;
}

export interface Education {
  education: string;
  degree: string;
  college: string;
  university: string;
  additionalCourses: string;
}

export interface Occupation {
  occupation: string;
  company: string;
  business: string;
  department: string;
  salary: string;
  annualIncome: string;
}

export interface Family {
  fatherName: string;
  fatherOccupation: string;
  motherName: string;
  motherOccupation: string;
  brothers: string;
  sisters: string;
  familyType: string; // e.g., 'Joint' | 'Nuclear'
  familyBackground: string;
}

export interface Property {
  house: string;
  flat: string;
  agriculture: string;
  plot: string;
  business: string;
  vehicle: string;
  otherAssets: string;
}

export interface Expectations {
  preferredEducation: string;
  preferredProfession: string;
  preferredCity: string;
  preferredAge: string;
  preferredCommunity: string;
  otherExpectations: string;
}

export interface Contact {
  mobile: string;
  alternateMobile: string;
  whatsApp: string;
}

export interface OptionalToggles {
  showBirthDetails: boolean;
  showHoroscope: boolean;
  showEducation: boolean;
  showOccupation: boolean;
  showFamily: boolean;
  showProperty: boolean;
  showExpectations: boolean;
  showPhoto: boolean;
}

export interface BiodataState {
  candidateType: CandidateType;
  personalDetails: PersonalDetails;
  birthDetails: BirthDetails;
  horoscope: Horoscope;
  education: Education;
  occupation: Occupation;
  family: Family;
  property: Property;
  expectations: Expectations;
  contact: Contact;
  photoUrl: string; // Base64 or local blob URL
  themeId: string;
  optionalToggles: OptionalToggles;
}

export type ThemeId =
  | 'traditional-marathi'
  | 'royal-gold'
  | 'modern-premium'
  | 'minimal-white'
  | 'community-classic'
  | 'floral-premium'
  | 'elegant-beige'
  | 'temple-heritage'
  | 'luxury-crimson'
  | 'contemporary-wedding';

export interface BiodataTheme {
  id: ThemeId;
  name: string;
  marathiName: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundClass: string;
  cardClass: string;
  textPrimaryClass: string;
  textSecondaryClass: string;
  borderClass: string;
  accentClass: string;
  fontFamily: string;
  decorations?: {
    headerImage?: string;
    footerImage?: string;
    borderStyle?: string;
  };
}
