export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string;
  date: string;
  image?: string;
  category: string;
  slug: string;
}

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  time?: string;
  location: string;
  category: string;
  image?: string;
}

export interface CouncilMember {
  id: string;
  name: string;
  role: string;
  image?: string;
  commission?: string;
}

export interface Document {
  id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: 'pdf' | 'doc' | 'other';
  date: string;
  category: string;
  size?: string;
}

export interface Association {
  id: string;
  name: string;
  description: string;
  contact?: string;
  email?: string;
  website?: string;
  category: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface QuickLink {
  icon: string;
  label: string;
  href: string;
  description?: string;
}

export interface Commerce {
  id: string;
  name: string;
  type: string;
  horaires: string;
  phone?: string;
}

export interface PointCarte {
  id: string;
  name: string;
  category: 'Mairie' | 'École' | 'Commerce' | 'Nature' | 'Équipement' | 'Culte';
  lat: number;
  lng: number;
  description?: string;
}

export interface HoraireJour {
  jour: string;
  horaires: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  caption?: string;
}

export interface PatrimoineItem {
  id: string;
  emoji: string;
  title: string;
  desc: string;
  tag: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  text: string;
}

export interface EtangInfo {
  id: string;
  name: string;
  superficie: string;
}

export interface Commission {
  id: string;
  name: string;
  president: string;
  members: string;
}

export interface Deliberation {
  id: string;
  ref: string;
  date: string;
  objet: string;
  vote: string;
}

export interface AffichageItem {
  id: string;
  date: string;
  titre: string;
  type: string;
}

export interface DecouvrirVignette {
  id: string;
  title: string;
  img: string;
  href: string;
}

export interface IntercoDelegue {
  id: string;
  name: string;
  role: string;
}

export interface IntercoCompetence {
  id: string;
  emoji: string;
  title: string;
  desc: string;
}

export interface IntercoLien {
  id: string;
  name: string;
  url: string;
  desc: string;
}

export interface DemarcheFaqEntry {
  id: string;
  q: string;
  a: string;
}

export interface LienUtile {
  id: string;
  label: string;
  url: string;
}

export interface DemarcheCategory {
  id: string;
  emoji: string;
  title: string;
  items: DemarcheFaqEntry[];
}

export interface SiteSettings {
  communeName: string;
  communeShort: string;
  communePostal: string;
  communeDepartment: string;
  communeRegion: string;
  communePopulation: string;
  communeSuperficie: string;
  communeAltitude: string;
  communeCodeInsee: string;
  communeLat: number;
  communeLng: number;
  mairieAddress: string;
  mairieCity: string;
  mairiePhone: string;
  mairieEmail: string;
  mairieHoraires: HoraireJour[];
  mayorName: string;
  mayorMessage: string;
  facebookUrl: string;
  intramurosUrl: string;
  marketTitle: string;
  marketSchedule: string;
  marketLocation: string;
  marketDescription: string;
  foodtruckTitle: string;
  foodtruckSchedule: string;
  foodtruckLocation: string;
  foodtruckPhone: string;
  foodtruckDescription: string;
  homeHeroImage: string;
  homeHeroTitle: string;
  homeHeroSubtitle: string;
  communePresentation: string;
  historiqueIntro: string;
  etangsIntro: string;
  etangsImage: string;
  forestIntro: string;
  forestImage: string;
  forestSentiers: string;
  ecoleName: string;
  ecoleAddress: string;
  ecolePhone: string;
  ecoleEmail: string;
  ecoleEffectif: string;
  ecoleHoraires: string;
  ecolePeriscolaire: string;
  ecoleCollegeLycee: string;
  ecoleInscriptions: string;
  intercoName: string;
  intercoIntro: string;
  intercoChiffres: string;
}
