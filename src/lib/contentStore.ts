import { useEffect, useReducer } from 'react';
import type {
  NewsItem, EventItem, Document, Association, Commerce, CouncilMember, PointCarte, SiteSettings,
  GalleryImage, PatrimoineItem, TimelineEvent, EtangInfo, Commission, Deliberation, AffichageItem,
  DecouvrirVignette, IntercoDelegue, IntercoCompetence, IntercoLien, DemarcheCategory, LienUtile,
} from '../types';
import {
  NEWS_DATA, EVENTS_DATA, DOCUMENTS_DATA, ASSOCIATIONS_DATA, COMMERCES_DATA, COUNCIL_MEMBERS, POINTS_CARTE,
  GALLERY_DATA, PATRIMOINE_DATA, TIMELINE_DATA, ETANGS_DATA, COMMISSIONS_DATA, DELIBERATIONS_DATA, AFFICHAGE_DATA,
  DECOUVRIR_VIGNETTES_DATA, INTERCO_DELEGUES_DATA, INTERCO_COMPETENCES_DATA, INTERCO_LIENS_DATA, DEMARCHES_DATA,
  HOME_LIENS_UTILES, PREFECTURE_LIENS, COMMUNE_PRESENTATION, CONTACT_SUBJECTS,
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
 * Contenu éditable par la mairie, persisté côté serveur (API Express + Postgres, voir /server).
 * Chaque "collection" correspond à une ligne de la table `content` (clé -> JSON), exactement comme
 * avant avec localStorage — seule l'implémentation de stockage a changé, l'API de ce module
 * (useNews, saveNews, useSettings, saveSettings…) reste identique pour le reste de l'appli.
 * Un cache mémoire partagé + pub-sub évite de refaire une requête réseau par composant qui lit
 * la même clé, et permet une mise à jour optimiste immédiate après une sauvegarde admin.
 */

const cache = new Map<string, unknown>();
const inFlight = new Map<string, Promise<unknown>>();
const listeners = new Map<string, Set<() => void>>();

function subscribe(key: string, cb: () => void) {
  if (!listeners.has(key)) listeners.set(key, new Set());
  listeners.get(key)!.add(cb);
  return () => listeners.get(key)?.delete(cb);
}

function emit(key: string) {
  listeners.get(key)?.forEach((cb) => cb());
}

async function fetchContent<T>(key: string): Promise<T | null> {
  const res = await fetch(`/api/content/${key}`);
  if (!res.ok) throw new Error(`GET /api/content/${key} → ${res.status}`);
  const data = await res.json();
  return (data?.value ?? null) as T | null;
}

function loadOnce<T>(key: string, fallback: T): Promise<T> {
  if (inFlight.has(key)) return inFlight.get(key) as Promise<T>;
  const p = fetchContent<T>(key)
    .then((v) => v ?? fallback)
    .catch(() => fallback)
    .then((resolved) => {
      cache.set(key, resolved);
      inFlight.delete(key);
      emit(key);
      return resolved;
    });
  inFlight.set(key, p);
  return p;
}

async function putContent<T>(key: string, value: T) {
  // Mise à jour optimiste : l'UI admin réagit immédiatement, avant même la réponse réseau.
  cache.set(key, value);
  emit(key);
  try {
    const res = await fetch(`/api/content/${key}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
      },
      body: JSON.stringify({ value }),
    });
    if (!res.ok) throw new Error(`PUT /api/content/${key} → ${res.status}`);
  } catch (err) {
    console.error(`Échec de la sauvegarde de "${key}"`, err);
    alert("La sauvegarde n'a pas pu être enregistrée sur le serveur. Vérifie ta connexion (ou reconnecte-toi dans l'espace mairie) puis réessaie.");
  }
}

function useContent<T>(key: string, fallback: T): T {
  const [, forceRender] = useReducer((n: number) => n + 1, 0);

  useEffect(() => {
    if (!cache.has(key)) loadOnce(key, fallback);
    return subscribe(key, forceRender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (cache.has(key) ? cache.get(key) : fallback) as T;
}

function createStore<T>(key: string, fallback: T) {
  return {
    use: () => useContent<T>(key, fallback),
    get: () => (cache.has(key) ? (cache.get(key) as T) : fallback),
    save: (value: T) => putContent(key, value),
    reset: () => putContent(key, fallback),
  };
}

const newsStore = createStore<NewsItem[]>('news', NEWS_DATA);
const eventsStore = createStore<EventItem[]>('events', EVENTS_DATA);
const documentsStore = createStore<Document[]>('documents', DOCUMENTS_DATA);
const associationsStore = createStore<Association[]>('associations', ASSOCIATIONS_DATA);
const commercesStore = createStore<Commerce[]>('commerces', COMMERCES_DATA);
const councilStore = createStore<CouncilMember[]>('council', COUNCIL_MEMBERS);
const pointsStore = createStore<PointCarte[]>('points', POINTS_CARTE);
const galleryStore = createStore<GalleryImage[]>('gallery', GALLERY_DATA);
const patrimoineStore = createStore<PatrimoineItem[]>('patrimoine', PATRIMOINE_DATA);
const timelineStore = createStore<TimelineEvent[]>('timeline', TIMELINE_DATA);
const etangsStore = createStore<EtangInfo[]>('etangs', ETANGS_DATA);
const commissionsStore = createStore<Commission[]>('commissions', COMMISSIONS_DATA);
const deliberationsStore = createStore<Deliberation[]>('deliberations', DELIBERATIONS_DATA);
const affichageStore = createStore<AffichageItem[]>('affichage', AFFICHAGE_DATA);
const decouvrirVignettesStore = createStore<DecouvrirVignette[]>('vignettes', DECOUVRIR_VIGNETTES_DATA);
const intercoDeleguesStore = createStore<IntercoDelegue[]>('interco_delegues', INTERCO_DELEGUES_DATA);
const intercoCompetencesStore = createStore<IntercoCompetence[]>('interco_competences', INTERCO_COMPETENCES_DATA);
const intercoLiensStore = createStore<IntercoLien[]>('interco_liens', INTERCO_LIENS_DATA);
const demarchesStore = createStore<DemarcheCategory[]>('demarches', DEMARCHES_DATA);
const homeLiensStore = createStore<LienUtile[]>('home_liens', HOME_LIENS_UTILES);
const prefectureLiensStore = createStore<LienUtile[]>('prefecture_liens', PREFECTURE_LIENS);
const contactSubjectsStore = createStore<string[]>('contact_subjects', CONTACT_SUBJECTS);

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

export const useHomeLiens = homeLiensStore.use;
export const getHomeLiens = homeLiensStore.get;
export const saveHomeLiens = homeLiensStore.save;
export const resetHomeLiens = homeLiensStore.reset;

export const usePrefectureLiens = prefectureLiensStore.use;
export const getPrefectureLiens = prefectureLiensStore.get;
export const savePrefectureLiens = prefectureLiensStore.save;
export const resetPrefectureLiens = prefectureLiensStore.reset;

export const useContactSubjects = contactSubjectsStore.use;
export const getContactSubjects = contactSubjectsStore.get;
export const saveContactSubjects = contactSubjectsStore.save;
export const resetContactSubjects = contactSubjectsStore.reset;

// --- Paramètres du site (objet unique) ---

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
  communePresentation: COMMUNE_PRESENTATION,
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

const settingsStore = createStore<SiteSettings>('settings', DEFAULT_SETTINGS);

export const useSettings = settingsStore.use;
export const getSettings = settingsStore.get;
export const saveSettings = settingsStore.save;
export const resetSettings = settingsStore.reset;

// --- Authentification admin (token JWT renvoyé par l'API, gardé côté client) ---

const TOKEN_KEY = 'hindlingen_admin_token';

export function getToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token: string) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // Stockage indisponible (navigation privée…) : la session ne survivra pas au rechargement.
  }
}

export function clearToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

export async function login(password: string): Promise<boolean> {
  try {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    if (!data?.token) return false;
    setToken(data.token);
    return true;
  } catch {
    return false;
  }
}

// --- Upload d'images (retourne l'URL publique du fichier stocké côté serveur) ---

export async function uploadImage(blob: Blob, filename: string): Promise<string> {
  const form = new FormData();
  form.append('file', blob, filename);
  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : undefined,
    body: form,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || `Échec de l'upload (${res.status})`);
  }
  const data = await res.json();
  return data.url as string;
}
