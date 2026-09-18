import { useEffect, useState } from 'react';
import type {
  NewsItem, EventItem, Document, Association, Commerce, CouncilMember, PointCarte, SiteSettings,
  GalleryImage, PatrimoineItem, TimelineEvent, EtangInfo, Commission, Deliberation, AffichageItem,
  DecouvrirVignette, IntercoDelegue, IntercoCompetence, IntercoLien, DemarcheCategory,
} from '../types';
import {
  NEWS_DATA, EVENTS_DATA, DOCUMENTS_DATA, ASSOCIATIONS_DATA, COMMERCES_DATA, COUNCIL_MEMBERS, POINTS_CARTE,
  GALLERY_DATA, PATRIMOINE_DATA, TIMELINE_DATA, ETANGS_DATA, COMMISSIONS_DATA, DELIBERATIONS_DATA, AFFICHAGE_DATA,
  DECOUVRIR_VIGNETTES_DATA, INTERCO_DELEGUES_DATA, INTERCO_COMPETENCES_DATA, INTERCO_LIENS_DATA, DEMARCHES_DATA,
  COMMUNE_NAME, COMMUNE_SHORT, COMMUNE_POSTAL, COMMUNE_DEPARTMENT, COMMUNE_REGION,
  COMMUNE_POPULATION, COMMUNE_SUPERFICIE, COMMUNE_ALTITUDE, COMMUNE_CODE_INSEE, COMMUNE_COORDS,
  MAIRIE_ADDRESS, MAIRIE_CITY, MAIRIE_PHONE, MAIRIE_EMAIL, MAIRIE_HORAIRES,
  MAYOR_NAME, MAYOR_MESSAGE, SOCIAL_LINKS, MARKET_DATA, FOODTRUCK_DATA,
  HOME_HERO_IMAGE, HOME_HERO_TITLE, HOME_HERO_SUBTITLE,
  HISTORIQUE_INTRO, ETANGS_INTRO, ETANGS_IMAGE, FOREST_INTRO, FOREST_IMAGE, FOREST_SENTIERS,
  ECOLE_NAME, ECOLE_ADDRESS, ECOLE_PHONE, ECOLE_EMAIL, ECOLE_EFFECTIF, ECOLE_HORAIRES,
  ECOLE_PERISCOLAIRE, ECOLE_COLLEGE_LYCEE, ECOLE_INSCRIPTIONS,
  INTERCO_NAME, INTERCO_INTRO, INTERCO_CHIFFRES,
} from '../data';

/**
 * Stockage de contenu éditable par la mairie, persisté dans le navigateur (localStorage).
 * Chaque collection stockée remplace entièrement le jeu de données par défaut dès qu'elle existe,
 * ce qui permet à l'agent municipal d'ajouter, modifier ou supprimer du contenu depuis /admin
 * sans toucher au code. C'est une solution "sans backend" adaptée à un budget très limité : les
 * modifications sont visibles sur le navigateur où elles ont été faites ; pour qu'elles soient
 * visibles par tous les visiteurs, il faudra brancher un petit backend plus tard (voir note dans /admin).
 */

const CHANGE_EVENT = 'content-store-changed';

function notify() {
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function readValue<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeValue<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Stockage indisponible (navigation privée, quota…) : on ignore silencieusement.
  }
  notify();
}

function useStoredValue<T>(key: string, fallback: T): T {
  const [value, setValue] = useState<T>(() => readValue(key, fallback));

  useEffect(() => {
    const sync = () => setValue(readValue(key, fallback));
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return value;
}

function createListStore<T>(key: string, fallback: T[]) {
  return {
    use: () => useStoredValue<T[]>(key, fallback),
    get: () => readValue<T[]>(key, fallback),
    save: (items: T[]) => writeValue(key, items),
    reset: () => { localStorage.removeItem(key); notify(); },
  };
}

const newsStore = createListStore<NewsItem>('hindlingen_news_v1', NEWS_DATA);
const eventsStore = createListStore<EventItem>('hindlingen_events_v1', EVENTS_DATA);
const documentsStore = createListStore<Document>('hindlingen_documents_v1', DOCUMENTS_DATA);
const associationsStore = createListStore<Association>('hindlingen_associations_v1', ASSOCIATIONS_DATA);
const commercesStore = createListStore<Commerce>('hindlingen_commerces_v1', COMMERCES_DATA);
const councilStore = createListStore<CouncilMember>('hindlingen_council_v1', COUNCIL_MEMBERS);
const pointsStore = createListStore<PointCarte>('hindlingen_points_v1', POINTS_CARTE);
const galleryStore = createListStore<GalleryImage>('hindlingen_gallery_v1', GALLERY_DATA);
const patrimoineStore = createListStore<PatrimoineItem>('hindlingen_patrimoine_v1', PATRIMOINE_DATA);
const timelineStore = createListStore<TimelineEvent>('hindlingen_timeline_v1', TIMELINE_DATA);
const etangsStore = createListStore<EtangInfo>('hindlingen_etangs_v1', ETANGS_DATA);
const commissionsStore = createListStore<Commission>('hindlingen_commissions_v1', COMMISSIONS_DATA);
const deliberationsStore = createListStore<Deliberation>('hindlingen_deliberations_v1', DELIBERATIONS_DATA);
const affichageStore = createListStore<AffichageItem>('hindlingen_affichage_v1', AFFICHAGE_DATA);
const decouvrirVignettesStore = createListStore<DecouvrirVignette>('hindlingen_vignettes_v1', DECOUVRIR_VIGNETTES_DATA);
const intercoDeleguesStore = createListStore<IntercoDelegue>('hindlingen_interco_delegues_v1', INTERCO_DELEGUES_DATA);
const intercoCompetencesStore = createListStore<IntercoCompetence>('hindlingen_interco_competences_v1', INTERCO_COMPETENCES_DATA);
const intercoLiensStore = createListStore<IntercoLien>('hindlingen_interco_liens_v1', INTERCO_LIENS_DATA);
const demarchesStore = createListStore<DemarcheCategory>('hindlingen_demarches_v1', DEMARCHES_DATA);

export const useNews = newsStore.use;
export const getNews = newsStore.get;
export const saveNews = newsStore.save;
export const resetNews = newsStore.reset;

export const useEvents = eventsStore.use;
export const getEvents = eventsStore.get;
export const saveEvents = eventsStore.save;
export const resetEvents = eventsStore.reset;

export const useDocuments = documentsStore.use;
export const getDocuments = documentsStore.get;
export const saveDocuments = documentsStore.save;
export const resetDocuments = documentsStore.reset;

export const useAssociations = associationsStore.use;
export const getAssociations = associationsStore.get;
export const saveAssociations = associationsStore.save;
export const resetAssociations = associationsStore.reset;

export const useCommerces = commercesStore.use;
export const getCommerces = commercesStore.get;
export const saveCommerces = commercesStore.save;
export const resetCommerces = commercesStore.reset;

export const useCouncil = councilStore.use;
export const getCouncil = councilStore.get;
export const saveCouncil = councilStore.save;
export const resetCouncil = councilStore.reset;

export const usePoints = pointsStore.use;
export const getPoints = pointsStore.get;
export const savePoints = pointsStore.save;
export const resetPoints = pointsStore.reset;

export const useGallery = galleryStore.use;
export const getGallery = galleryStore.get;
export const saveGallery = galleryStore.save;
export const resetGallery = galleryStore.reset;

export const usePatrimoine = patrimoineStore.use;
export const getPatrimoine = patrimoineStore.get;
export const savePatrimoine = patrimoineStore.save;
export const resetPatrimoine = patrimoineStore.reset;

export const useTimeline = timelineStore.use;
export const getTimeline = timelineStore.get;
export const saveTimeline = timelineStore.save;
export const resetTimeline = timelineStore.reset;

export const useEtangs = etangsStore.use;
export const getEtangs = etangsStore.get;
export const saveEtangs = etangsStore.save;
export const resetEtangs = etangsStore.reset;

export const useCommissions = commissionsStore.use;
export const getCommissions = commissionsStore.get;
export const saveCommissions = commissionsStore.save;
export const resetCommissions = commissionsStore.reset;

export const useDeliberations = deliberationsStore.use;
export const getDeliberations = deliberationsStore.get;
export const saveDeliberations = deliberationsStore.save;
export const resetDeliberations = deliberationsStore.reset;

export const useAffichage = affichageStore.use;
export const getAffichage = affichageStore.get;
export const saveAffichage = affichageStore.save;
export const resetAffichage = affichageStore.reset;

export const useDecouvrirVignettes = decouvrirVignettesStore.use;
export const getDecouvrirVignettes = decouvrirVignettesStore.get;
export const saveDecouvrirVignettes = decouvrirVignettesStore.save;
export const resetDecouvrirVignettes = decouvrirVignettesStore.reset;

export const useIntercoDelegues = intercoDeleguesStore.use;
export const getIntercoDelegues = intercoDeleguesStore.get;
export const saveIntercoDelegues = intercoDeleguesStore.save;
export const resetIntercoDelegues = intercoDeleguesStore.reset;

export const useIntercoCompetences = intercoCompetencesStore.use;
export const getIntercoCompetences = intercoCompetencesStore.get;
export const saveIntercoCompetences = intercoCompetencesStore.save;
export const resetIntercoCompetences = intercoCompetencesStore.reset;

export const useIntercoLiens = intercoLiensStore.use;
export const getIntercoLiens = intercoLiensStore.get;
export const saveIntercoLiens = intercoLiensStore.save;
export const resetIntercoLiens = intercoLiensStore.reset;

export const useDemarches = demarchesStore.use;
export const getDemarches = demarchesStore.get;
export const saveDemarches = demarchesStore.save;
export const resetDemarches = demarchesStore.reset;

// --- Paramètres du site (objet unique) ---

const SETTINGS_KEY = 'hindlingen_settings_v1';

export const DEFAULT_SETTINGS: SiteSettings = {
  communeName: COMMUNE_NAME,
  communeShort: COMMUNE_SHORT,
  communePostal: COMMUNE_POSTAL,
  communeDepartment: COMMUNE_DEPARTMENT,
  communeRegion: COMMUNE_REGION,
  communePopulation: COMMUNE_POPULATION,
  communeSuperficie: COMMUNE_SUPERFICIE,
  communeAltitude: COMMUNE_ALTITUDE,
  communeCodeInsee: COMMUNE_CODE_INSEE,
  communeLat: COMMUNE_COORDS.lat,
  communeLng: COMMUNE_COORDS.lng,
  mairieAddress: MAIRIE_ADDRESS,
  mairieCity: MAIRIE_CITY,
  mairiePhone: MAIRIE_PHONE,
  mairieEmail: MAIRIE_EMAIL,
  mairieHoraires: MAIRIE_HORAIRES,
  mayorName: MAYOR_NAME,
  mayorMessage: MAYOR_MESSAGE,
  facebookUrl: SOCIAL_LINKS.facebook,
  intramurosUrl: SOCIAL_LINKS.intramuros,
  marketTitle: MARKET_DATA.title,
  marketSchedule: MARKET_DATA.schedule,
  marketLocation: MARKET_DATA.location,
  marketDescription: MARKET_DATA.description,
  foodtruckTitle: FOODTRUCK_DATA.title,
  foodtruckSchedule: FOODTRUCK_DATA.schedule,
  foodtruckLocation: FOODTRUCK_DATA.location,
  foodtruckPhone: FOODTRUCK_DATA.phone,
  foodtruckDescription: FOODTRUCK_DATA.description,
  homeHeroImage: HOME_HERO_IMAGE,
  homeHeroTitle: HOME_HERO_TITLE,
  homeHeroSubtitle: HOME_HERO_SUBTITLE,
  historiqueIntro: HISTORIQUE_INTRO,
  etangsIntro: ETANGS_INTRO,
  etangsImage: ETANGS_IMAGE,
  forestIntro: FOREST_INTRO,
  forestImage: FOREST_IMAGE,
  forestSentiers: FOREST_SENTIERS,
  ecoleName: ECOLE_NAME,
  ecoleAddress: ECOLE_ADDRESS,
  ecolePhone: ECOLE_PHONE,
  ecoleEmail: ECOLE_EMAIL,
  ecoleEffectif: ECOLE_EFFECTIF,
  ecoleHoraires: ECOLE_HORAIRES,
  ecolePeriscolaire: ECOLE_PERISCOLAIRE,
  ecoleCollegeLycee: ECOLE_COLLEGE_LYCEE,
  ecoleInscriptions: ECOLE_INSCRIPTIONS,
  intercoName: INTERCO_NAME,
  intercoIntro: INTERCO_INTRO,
  intercoChiffres: INTERCO_CHIFFRES,
};

export function useSettings(): SiteSettings {
  return useStoredValue<SiteSettings>(SETTINGS_KEY, DEFAULT_SETTINGS);
}

export function getSettings(): SiteSettings {
  return readValue<SiteSettings>(SETTINGS_KEY, DEFAULT_SETTINGS);
}

export function saveSettings(settings: SiteSettings) {
  writeValue(SETTINGS_KEY, settings);
}

export function resetSettings() {
  localStorage.removeItem(SETTINGS_KEY);
  notify();
}
