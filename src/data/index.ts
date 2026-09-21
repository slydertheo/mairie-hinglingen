import type {
  NewsItem, EventItem, CouncilMember, Document, Association, Commerce, PointCarte,
  GalleryImage, PatrimoineItem, TimelineEvent, EtangInfo, Commission, Deliberation, AffichageItem,
  DecouvrirVignette, IntercoDelegue, IntercoCompetence, IntercoLien, DemarcheCategory, LienUtile,
} from '../types';

export const COMMUNE_NAME = 'Mairie de Hindlingen';
export const COMMUNE_SHORT = 'Hindlingen';
export const COMMUNE_POSTAL = '68510';
export const COMMUNE_DEPARTMENT = 'Haut-Rhin';
export const COMMUNE_REGION = 'Grand Est';
export const COMMUNE_POPULATION = '300 habitants';
export const COMMUNE_SUPERFICIE = '7,8 km²';
export const COMMUNE_ALTITUDE = '320 m';
export const COMMUNE_CODE_INSEE = '68143';

export const MAIRIE_ADDRESS = '1 Rue de la Mairie';
export const MAIRIE_CITY = '68510 Hindlingen';
export const MAIRIE_PHONE = '03 89 25 81 46';
export const MAIRIE_EMAIL = 'mairie@hindlingen.fr';
export const MAIRIE_HORAIRES = [
  { jour: 'Lundi', horaires: '9h00 – 12h00 / 14h00 – 17h00' },
  { jour: 'Mardi', horaires: '9h00 – 12h00 / 14h00 – 17h00' },
  { jour: 'Mercredi', horaires: '9h00 – 12h00' },
  { jour: 'Jeudi', horaires: '9h00 – 12h00 / 14h00 – 17h00' },
  { jour: 'Vendredi', horaires: '9h00 – 12h00 / 14h00 – 16h30' },
  { jour: 'Samedi', horaires: 'Fermé' },
  { jour: 'Dimanche', horaires: 'Fermé' },
];

export const MAYOR_NAME = 'Jean-Pierre Muller';
export const MAYOR_MESSAGE = `Bienvenue sur le site officiel de la commune de Hindlingen. 
C'est avec fierté et engagement que nous vous présentons notre village, niché au cœur des paysages alsaciens du Sundgau.

Notre commune se distingue par la qualité de vie qu'elle offre à ses habitants, la richesse de son patrimoine historique et la beauté naturelle de ses étangs et forêts. Nous travaillons chaque jour pour maintenir et améliorer les services proposés à l'ensemble de nos concitoyens.

Ce site a pour vocation de vous informer sur la vie municipale, les actualités, les événements et les démarches administratives. N'hésitez pas à nous contacter pour toute question.

Au nom de tout le Conseil Municipal, je vous souhaite la bienvenue à Hindlingen.`;

export const NEWS_DATA: NewsItem[] = [
  {
    id: '1',
    title: 'Travaux de réfection de la rue principale',
    summary: 'Des travaux de réfection de la chaussée sont prévus du 15 au 30 janvier. Une déviation sera mise en place.',
    date: '2026-01-08',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
    category: 'Travaux',
    slug: 'travaux-rue-principale',
  },
  {
    id: '2',
    title: 'Vœux du Maire 2026',
    summary: 'La cérémonie des vœux de la commune se tiendra le samedi 11 janvier à 17h à la salle des fêtes.',
    date: '2026-01-05',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80',
    category: 'Événement',
    slug: 'voeux-maire-2026',
  },
  {
    id: '3',
    title: 'Bulletin municipal – Hiver 2025',
    summary: 'Le nouveau bulletin municipal est disponible. Retrouvez toutes les informations sur la vie de la commune.',
    date: '2025-12-20',
    image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80',
    category: 'Publication',
    slug: 'bulletin-hiver-2025',
  },
  {
    id: '4',
    title: 'Collecte des sapins de Noël',
    summary: 'La collecte des sapins de Noël aura lieu du 8 au 15 janvier. Déposez votre sapin devant chez vous.',
    date: '2025-12-28',
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=600&q=80',
    category: 'Services',
    slug: 'collecte-sapins',
  },
  {
    id: '5',
    title: 'Inauguration du nouveau terrain de jeux',
    summary: 'Le nouveau terrain de jeux pour enfants a été inauguré ce dimanche en présence du Conseil Municipal.',
    date: '2025-12-10',
    image: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=600&q=80',
    category: 'Équipements',
    slug: 'inauguration-terrain-jeux',
  },
  {
    id: '6',
    title: 'Nouvelle ligne de bus intercommunale',
    summary: 'À partir du 1er février, une nouvelle ligne de bus desservira Hindlingen vers le chef-lieu de canton.',
    date: '2025-11-30',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=600&q=80',
    category: 'Transport',
    slug: 'nouvelle-ligne-bus',
  },
];

export const EVENTS_DATA: EventItem[] = [
  {
    id: '1',
    title: 'Cérémonie des Vœux du Maire',
    description: 'La mairie vous invite à la cérémonie des vœux du Maire pour l\'année 2026. Vin chaud et petits fours offerts.',
    date: '2026-01-11',
    time: '17h00',
    location: 'Salle des fêtes – Hindlingen',
    category: 'Officiel',
  },
  {
    id: '2',
    title: 'Marché de producteurs locaux',
    description: 'Retrouvez nos producteurs locaux pour un marché convivial avec fruits, légumes, fromages et spécialités alsaciennes.',
    date: '2026-01-18',
    time: '9h00 – 13h00',
    location: 'Place de la Mairie',
    category: 'Marché',
  },
  {
    id: '3',
    title: 'Tournoi de belote de l\'Amicale',
    description: 'L\'Amicale de Hindlingen organise son tournoi annuel de belote. Inscription auprès du secrétariat.',
    date: '2026-01-25',
    time: '14h00',
    location: 'Foyer rural',
    category: 'Association',
  },
  {
    id: '4',
    title: 'Conseil Municipal',
    description: 'Séance ordinaire du Conseil Municipal. Séance publique ouverte à tous les habitants.',
    date: '2026-02-03',
    time: '20h00',
    location: 'Mairie – Salle du Conseil',
    category: 'Officiel',
  },
  {
    id: '5',
    title: 'Carnaval des enfants',
    description: 'L\'école organise son carnaval annuel. Déguisements encouragés ! Goûter partagé.',
    date: '2026-02-14',
    time: '14h30',
    location: 'École primaire',
    category: 'École',
  },
  {
    id: '6',
    title: 'Randonnée pédestre – Les étangs',
    description: 'Le club de randonnée vous invite pour une balade guidée autour des étangs communaux.',
    date: '2026-02-22',
    time: '9h30',
    location: 'Parking de l\'étang principal',
    category: 'Sport',
  },
];

export const COUNCIL_MEMBERS: CouncilMember[] = [
  { id: '1', name: 'Jean-Pierre Muller', role: 'Maire', commission: 'Travaux, Finances' },
  { id: '2', name: 'Marie Schmitt', role: '1ère Adjointe', commission: 'Éducation, Culture' },
  { id: '3', name: 'Bernard Kieffer', role: '2ème Adjoint', commission: 'Voirie, Environnement' },
  { id: '4', name: 'Sophie Roth', role: 'Conseillère municipale', commission: 'Social, Seniors' },
  { id: '5', name: 'Patrick Vogel', role: 'Conseiller municipal', commission: 'Économie locale' },
  { id: '6', name: 'Claire Hoffmann', role: 'Conseillère municipale', commission: 'Tourisme, Patrimoine' },
  { id: '7', name: 'Alain Meyer', role: 'Conseiller municipal', commission: 'Sports, Associations' },
  { id: '8', name: 'Nathalie Klein', role: 'Conseillère municipale', commission: 'Communication' },
  { id: '9', name: 'François Weber', role: 'Conseiller municipal', commission: 'Urbanisme, PLU' },
  { id: '10', name: 'Isabelle Jung', role: 'Conseillère municipale', commission: 'Finances' },
  { id: '11', name: 'Robert Bauer', role: 'Conseiller municipal', commission: 'Travaux' },
];

export const DOCUMENTS_DATA: Document[] = [
  { id: '1', title: 'Bulletin municipal Hiver 2025', fileUrl: '#', fileType: 'pdf', date: '2025-12-20', category: 'Bulletin', size: '2,4 Mo' },
  { id: '2', title: 'Bulletin municipal Automne 2025', fileUrl: '#', fileType: 'pdf', date: '2025-09-15', category: 'Bulletin', size: '2,1 Mo' },
  { id: '3', title: 'Compte rendu CM – Décembre 2025', fileUrl: '#', fileType: 'pdf', date: '2025-12-16', category: 'Compte rendu', size: '320 Ko' },
  { id: '4', title: 'Compte rendu CM – Novembre 2025', fileUrl: '#', fileType: 'pdf', date: '2025-11-18', category: 'Compte rendu', size: '280 Ko' },
  { id: '5', title: 'PLU – Règlement', fileUrl: '#', fileType: 'pdf', date: '2023-06-01', category: 'Urbanisme', size: '8,5 Mo' },
  { id: '6', title: 'PLU – Rapport de présentation', fileUrl: '#', fileType: 'pdf', date: '2023-06-01', category: 'Urbanisme', size: '12 Mo' },
  { id: '7', title: 'Formulaire demande de logement', fileUrl: '#', fileType: 'pdf', date: '2025-01-01', category: 'Formulaire', size: '180 Ko' },
  { id: '8', title: 'Formulaire état civil – Naissance', fileUrl: '#', fileType: 'pdf', date: '2025-01-01', category: 'Formulaire', size: '120 Ko' },
];

export const COMMERCES_DATA: Commerce[] = [
  { id: '1', name: 'Boulangerie-Pâtisserie Muller', type: 'Alimentation', horaires: 'Mar–Sam 6h30–13h / 15h30–19h', phone: '03 89 25 01 01' },
  { id: '2', name: 'Épicerie de la Place', type: 'Alimentation', horaires: 'Lun–Sam 8h–19h, Dim 9h–12h', phone: '03 89 25 01 02' },
  { id: '3', name: 'Bar-Restaurant Le Tilleul', type: 'Restauration', horaires: 'Mer–Dim 11h30–14h / 18h30–21h30', phone: '03 89 25 01 03' },
  { id: '4', name: 'Salon de coiffure Isabelle', type: 'Services', horaires: 'Mar–Sam 9h–18h', phone: '03 89 25 01 04' },
  { id: '5', name: 'Cabinet médical Dr. Schmidt', type: 'Santé', horaires: 'Lun–Ven 8h–12h / 14h–18h', phone: '03 89 25 01 05' },
  { id: '6', name: 'Pharmacie de Hindlingen', type: 'Santé', horaires: 'Lun–Ven 8h30–19h / Sam 9h–13h', phone: '03 89 25 81 00' },
  { id: '7', name: 'Menuiserie Sundgauvienne', type: 'Entreprise', horaires: 'Lun–Ven 8h–12h / 13h30–17h30', phone: '03 89 25 01 06' },
  { id: '8', name: 'Ferme Klein – Vente directe', type: 'Entreprise', horaires: 'Ven 16h–19h, Sam 9h–12h', phone: '03 89 25 01 07' },
];

// Coordonnées approximatives centrées sur Hindlingen (Haut-Rhin, Sundgau)
export const COMMUNE_COORDS = { lat: 47.6206, lng: 7.1119 };

export const POINTS_CARTE: PointCarte[] = [
  { id: '1', name: 'Mairie', category: 'Mairie', lat: 47.6206, lng: 7.1119, description: `${MAIRIE_ADDRESS}, ${MAIRIE_CITY}` },
  { id: '2', name: 'École Primaire Publique', category: 'École', lat: 47.6214, lng: 7.1132, description: "15 rue de l'École" },
  { id: '3', name: 'Étang communal', category: 'Nature', lat: 47.6183, lng: 7.1078, description: 'Sentier balisé, pêche autorisée' },
  { id: '4', name: 'Forêt communale', category: 'Nature', lat: 47.6165, lng: 7.1155, description: 'Sentiers de randonnée' },
  { id: '5', name: 'Salle des fêtes', category: 'Équipement', lat: 47.6199, lng: 7.1105, description: 'Location, événements communaux' },
  { id: '6', name: 'Église', category: 'Culte', lat: 47.6209, lng: 7.1126, description: 'Église paroissiale' },
  { id: '7', name: 'Boulangerie-Pâtisserie Muller', category: 'Commerce', lat: 47.6202, lng: 7.1112, description: 'Alimentation' },
  { id: '8', name: 'Bar-Restaurant Le Tilleul', category: 'Commerce', lat: 47.6210, lng: 7.1098, description: 'Restauration' },
  { id: '9', name: 'Pharmacie de Hindlingen', category: 'Commerce', lat: 47.6195, lng: 7.1121, description: 'Santé' },
];

export const SOCIAL_LINKS = {
  facebook: 'https://www.facebook.com/mairiehindlingen',
  intramuros: 'https://www.intramuros.me',
};

export const MARKET_DATA = {
  title: 'Marché communal',
  schedule: 'Chaque samedi 9h–13h',
  location: 'Place de la Mairie',
  description: 'Producteurs locaux, circuit court, spécialités alsaciennes.',
};

export const FOODTRUCK_DATA = {
  title: 'Camion à pizzas – Chez Mario',
  schedule: 'Chaque vendredi 18h–21h',
  location: 'Parking salle des fêtes',
  phone: '06 00 00 00 00',
  description: 'Commandes à l\'avance bienvenues.',
};

export const ASSOCIATIONS_DATA: Association[] = [
  { id: '1', name: 'Amicale de Hindlingen', description: 'Organisation d\'événements conviviaux pour tous les habitants.', category: 'Loisirs', email: 'amicale@hindlingen.fr' },
  { id: '2', name: 'Club de randonnée', description: 'Sorties régulières dans la nature environnante. Tous niveaux bienvenus.', category: 'Sport', email: 'rando@hindlingen.fr' },
  { id: '3', name: 'Ass. parents d\'élèves', description: 'Association représentant les parents auprès de l\'équipe pédagogique.', category: 'École', email: 'ape@hindlingen.fr' },
  { id: '4', name: 'Chœur de Hindlingen', description: 'Chorale mixte, répétitions le jeudi soir. Venez chanter avec nous !', category: 'Culture', email: 'chorale@hindlingen.fr' },
  { id: '5', name: 'Club des aînés', description: 'Activités, sorties et repas partagés pour les seniors de la commune.', category: 'Seniors', email: 'aines@hindlingen.fr' },
  { id: '6', name: 'Sapeurs-pompiers volontaires', description: 'Centre de secours local. Recrutement ouvert aux volontaires.', category: 'Sécurité', email: 'pompiers@hindlingen.fr' },
];

export const GALLERY_DATA: GalleryImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70', caption: 'Photo 1' },
  { id: '2', url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&q=70', caption: 'Photo 2' },
  { id: '3', url: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=300&q=70', caption: 'Photo 3' },
  { id: '4', url: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&q=70', caption: 'Photo 4' },
  { id: '5', url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&q=70', caption: 'Photo 5' },
  { id: '6', url: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&q=70', caption: 'Photo 6' },
  { id: '7', url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=70', caption: 'Photo 7' },
  { id: '8', url: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=300&q=70', caption: 'Photo 8' },
];

export const PATRIMOINE_DATA: PatrimoineItem[] = [
  { id: '1', emoji: '⛪', title: 'Église paroissiale', desc: 'Édifice du XVe siècle, joyau du patrimoine local.', tag: 'Monument' },
  { id: '2', emoji: '🏡', title: 'Maisons à colombages', desc: 'Architecture alsacienne typique des XVIe–XVIIe siècles.', tag: 'Patrimoine' },
  { id: '3', emoji: '🏛️', title: 'Mairie historique', desc: 'Bâtiment du XIXe siècle abritant les services communaux.', tag: 'Institutionnel' },
  { id: '4', emoji: '🧱', title: 'Lavoir communal', desc: 'Lavoir du XVIIIe siècle restauré, témoin de la vie d\'autrefois.', tag: 'Patrimoine' },
  { id: '5', emoji: '✝️', title: 'Croix de chemin', desc: 'Plusieurs croix jalonnent les routes, témoins de la piété populaire.', tag: 'Patrimoine' },
  { id: '6', emoji: '🎖️', title: 'Carré militaire', desc: 'Hommage aux soldats tombés lors des deux guerres mondiales.', tag: 'Mémoire' },
];

export const TIMELINE_DATA: TimelineEvent[] = [
  { id: '1', year: 'XIIe s.', text: 'Première mention dans les archives médiévales' },
  { id: '2', year: 'XVe s.', text: 'Construction de l\'église paroissiale' },
  { id: '3', year: '1648', text: 'Rattachement à la France (Traité de Westphalie)' },
  { id: '4', year: '1790', text: 'Création de la commune sous la Révolution' },
  { id: '5', year: '1918', text: 'Retour définitif à la France' },
  { id: '6', year: '2024', text: 'Modernisation des équipements communaux' },
];

export const ETANGS_DATA: EtangInfo[] = [
  { id: '1', name: 'Étang des Aulnes', superficie: '3,5 ha' },
  { id: '2', name: 'Étang du Moulin', superficie: '2,8 ha' },
  { id: '3', name: 'Grand Étang', superficie: '1,7 ha' },
];

export const COMMISSIONS_DATA: Commission[] = [
  { id: '1', name: 'Travaux & Voirie', president: 'Bernard Kieffer', members: 'Robert Bauer, François Weber' },
  { id: '2', name: 'Finances', president: 'Jean-Pierre Muller', members: 'Isabelle Jung, Nathalie Klein' },
  { id: '3', name: 'Éducation & Culture', president: 'Marie Schmitt', members: 'Sophie Roth, Claire Hoffmann' },
  { id: '4', name: 'Environnement', president: 'Bernard Kieffer', members: 'Patrick Vogel, Alain Meyer' },
  { id: '5', name: 'Urbanisme & PLU', president: 'François Weber', members: 'Jean-Pierre Muller' },
];

export const DELIBERATIONS_DATA: Deliberation[] = [
  { id: '1', ref: 'D-2025-12-01', date: '16/12/2025', objet: 'Approbation du budget primitif 2026', vote: 'Adopté (9/1/1)' },
  { id: '2', ref: 'D-2025-12-02', date: '16/12/2025', objet: 'Convention avec la Communauté de Communes', vote: 'Unanimité' },
  { id: '3', ref: 'D-2025-11-01', date: '18/11/2025', objet: 'Tarifs des services communaux 2026', vote: 'Adopté (10/1)' },
  { id: '4', ref: 'D-2025-11-02', date: '18/11/2025', objet: 'Devis travaux réfection rue principale', vote: 'Unanimité' },
];

export const AFFICHAGE_DATA: AffichageItem[] = [
  { id: '1', date: '08/01/2026', titre: 'Arrêté n°001/2026 – Circulation rue du Moulin', type: 'Arrêté' },
  { id: '2', date: '02/01/2026', titre: 'Avis de recrutement – Agent technique', type: 'Recrutement' },
  { id: '3', date: '20/12/2025', titre: 'Enquête publique PLU – Modification n°2', type: 'Enquête publique' },
];

export const DECOUVRIR_VIGNETTES_DATA: DecouvrirVignette[] = [
  { id: '1', title: 'Histoire & Patrimoine', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', href: '/decouvrir#historique' },
  { id: '2', title: 'Étangs & Forêts', img: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&q=80', href: '/decouvrir#etangs-forets' },
  { id: '3', title: 'Galerie photos', img: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&q=80', href: '/decouvrir#galerie' },
  { id: '4', title: 'Vie associative', img: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=400&q=80', href: '/vie-locale#associations' },
];

export const INTERCO_DELEGUES_DATA: IntercoDelegue[] = [
  { id: '1', name: 'Jean-Pierre Muller', role: 'Délégué titulaire' },
  { id: '2', name: 'Marie Schmitt', role: 'Déléguée titulaire' },
  { id: '3', name: 'Bernard Kieffer', role: 'Délégué suppléant' },
];

export const INTERCO_COMPETENCES_DATA: IntercoCompetence[] = [
  { id: '1', emoji: '🏗️', title: 'Développement économique', desc: 'Zones d\'activités, soutien aux entreprises.' },
  { id: '2', emoji: '🌿', title: 'Environnement', desc: 'Collecte déchets, espaces naturels.' },
  { id: '3', emoji: '🏠', title: 'Habitat', desc: 'Programme local de l\'habitat, rénovation.' },
  { id: '4', emoji: '🚌', title: 'Mobilité', desc: 'Transports en commun intercommunaux.' },
  { id: '5', emoji: '💧', title: 'Eau & Assainissement', desc: 'Réseau eau potable et eaux usées.' },
  { id: '6', emoji: '📡', title: 'Numérique', desc: 'Déploiement très haut débit.' },
];

export const INTERCO_LIENS_DATA: IntercoLien[] = [
  { id: '1', name: 'Communauté de Communes', url: '', desc: 'Site officiel de l\'intercommunalité — lien à renseigner par la mairie' },
  { id: '2', name: 'Conseil Régional Grand Est', url: 'https://www.grandest.fr', desc: 'Région Grand Est' },
  { id: '3', name: 'Collectivité européenne d\'Alsace', url: 'https://www.alsace.eu', desc: 'Ex-Conseil Départemental du Haut-Rhin' },
  { id: '4', name: 'Préfecture du Haut-Rhin', url: 'https://www.haut-rhin.gouv.fr', desc: 'Services de l\'État' },
  { id: '5', name: 'Service-Public.fr', url: 'https://www.service-public.fr', desc: 'Portail national' },
  { id: '6', name: 'ANCT', url: 'https://www.anct.gouv.fr', desc: 'Agence Nationale de la Cohésion des Territoires' },
];

export const DEMARCHES_DATA: DemarcheCategory[] = [
  {
    id: '1', emoji: '💑', title: 'État civil & Mariage',
    items: [
      { id: '1', q: 'Déclaration de naissance', a: 'Dans les 5 jours suivant la naissance à la mairie du lieu de naissance. Pièces : certificat d\'accouchement, pièces d\'identité, livret de famille.' },
      { id: '2', q: 'Mariage civil', a: 'Constituer le dossier au moins 2 mois avant. Pièces : CNI des 2 époux, justificatif domicile, acte de naissance < 3 mois, infos témoins.' },
      { id: '3', q: 'Copies et extraits d\'actes', a: 'Demande en mairie du lieu de l\'événement ou en ligne sur service-public.fr.' },
    ],
  },
  {
    id: '2', emoji: '🤝', title: 'PACS',
    items: [
      { id: '1', q: 'Enregistrement d\'un PACS', a: 'Depuis 2017, l\'enregistrement se fait en mairie. Convention de PACS + pièces d\'identité + justificatifs de domicile.' },
      { id: '2', q: 'Modification ou dissolution', a: 'Déclaration conjointe ou unilatérale en mairie ou chez un notaire.' },
    ],
  },
  {
    id: '3', emoji: '🗳️', title: 'Élections',
    items: [
      { id: '1', q: 'Inscription sur les listes électorales', a: 'En mairie, en ligne sur service-public.fr, jusqu\'au 6e vendredi précédant un scrutin.' },
      { id: '2', q: 'Procuration de vote', a: 'À faire en ligne sur maprocuration.gouv.fr puis validation en gendarmerie, commissariat ou tribunal.' },
    ],
  },
  {
    id: '4', emoji: '🏗️', title: 'Urbanisme & PLU/PLUi',
    items: [
      { id: '1', q: 'Permis de construire', a: 'Obligatoire pour toute construction de plus de 20m². Dossier à déposer en mairie.' },
      { id: '2', q: 'Déclaration préalable', a: 'Pour les petits travaux (extension < 20m², changement d\'aspect). Délai d\'instruction : 1 mois.' },
      { id: '3', q: 'Certificat d\'urbanisme', a: 'Pour connaître les règles applicables à votre terrain. Gratuit, valable 18 mois.' },
      { id: '4', q: 'PLU – Plan Local d\'Urbanisme', a: 'Consultez-le en mairie ou téléchargez les documents ci-dessous.' },
      { id: '5', q: 'PLUi – Plan Local d\'Urbanisme intercommunal', a: 'La commune est intégrée à la réflexion sur le PLUi porté par la Communauté de Communes. Informations et documents disponibles auprès de l\'intercommunalité.' },
    ],
  },
  {
    id: '5', emoji: '💻', title: 'Démarches en ligne',
    items: [
      { id: '1', q: 'service-public.fr', a: 'Portail officiel de l\'administration française pour la plupart des démarches.' },
      { id: '2', q: 'impots.gouv.fr', a: 'Déclaration et paiement des impôts en ligne.' },
      { id: '3', q: 'ameli.fr', a: 'Espace Assurance Maladie.' },
      { id: '4', q: 'caf.fr', a: 'Allocations familiales et aides au logement.' },
      { id: '5', q: 'Préfecture du Haut-Rhin', a: 'Démarches préfectorales en ligne (CNI, passeport, carte grise, permis de conduire...).' },
    ],
  },
];

export const HOME_HERO_IMAGE = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80';
export const HOME_HERO_TITLE = 'Bienvenue sur le site officiel de la Mairie de Hindlingen';
export const HOME_HERO_SUBTITLE = 'Commune du Haut-Rhin – Sundgau – Grand Est';

export const COMMUNE_PRESENTATION = `Hindlingen est une commune française située dans le département du Haut-Rhin, en région Grand Est. Village alsacien au charme authentique du Sundgau, elle offre à ses habitants un cadre de vie exceptionnel alliant tradition et modernité.

La commune bénéficie d'une nature préservée avec ses forêts et ses étangs, paradis pour les amoureux de la nature, les randonneurs et les pêcheurs.

Sa vie associative dynamique et son marché hebdomadaire rythment agréablement la vie locale.`;

export const CONTACT_SUBJECTS = [
  'Renseignement général',
  'État civil',
  'Urbanisme',
  'Voirie & travaux',
  'Environnement',
  'Associations',
  'Autre demande',
];

export const HISTORIQUE_INTRO = `Les premières traces d'occupation de Hindlingen remontent au Moyen Âge. Le village est mentionné pour la première fois dans des archives médiévales du XIIe siècle.

Au fil des siècles, la commune a développé une activité agricole importante, avec la pisciculture autour des étangs et l'exploitation forestière.

Comme toute l'Alsace, Hindlingen a connu les épreuves des deux guerres mondiales avant de se reconstruire et de s'épanouir dans le respect de ses traditions alsaciennes.`;

export const ETANGS_INTRO = 'La commune possède 3 étangs couvrant 8 ha au total. La pêche y est autorisée avec une carte de l\'AAPPMA locale.';
export const ETANGS_IMAGE = 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&q=80';

export const FOREST_INTRO = '230 ha de forêt de chênes et hêtres gérés par l\'ONF. Des sentiers balisés permettent des promenades familiales.';
export const FOREST_IMAGE = 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&q=80';

export const FOREST_SENTIERS = `🟡 Sentier du Moulin – 3,5 km – Facile
🔵 Sentier des Étangs – 6,2 km – Moyen
🔴 Grande boucle – 12 km – Difficile`;

export const ECOLE_NAME = 'École Primaire Publique';
export const ECOLE_ADDRESS = '15 rue de l\'École, 68510 Hindlingen';
export const ECOLE_PHONE = '03 89 25 02 00';
export const ECOLE_EMAIL = 'ecole@hindlingen.fr';
export const ECOLE_EFFECTIF = '~120 élèves – 5 classes';
export const ECOLE_HORAIRES = 'Lun, Mar, Jeu, Ven : 8h30–11h30 / 13h30–16h30\nMercredi : 8h30–11h30';
export const ECOLE_PERISCOLAIRE = `Garderie matin : 7h30–8h30, sur inscription
Accueil soir : 16h30–18h30, lundi–vendredi
Centre de loisirs : pendant les vacances scolaires`;
export const ECOLE_COLLEGE_LYCEE = `Collège : Marcel-Pagnol – 5 km (car scolaire)
Lycée : Établissement de la ville voisine – 15 km`;
export const ECOLE_INSCRIPTIONS = 'En mairie : livret de famille + justificatif de domicile + carnet de santé.';
export const ECOLE_IMAGE = 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80';

export const HOME_LIENS_UTILES: LienUtile[] = [
  { id: '1', label: 'Service-Public.fr', url: 'https://www.service-public.fr' },
  { id: '2', label: 'Préfecture du Haut-Rhin', url: 'https://www.haut-rhin.gouv.fr' },
  { id: '3', label: 'Région Grand Est', url: 'https://www.grandest.fr' },
  { id: '4', label: 'impots.gouv.fr', url: 'https://www.impots.gouv.fr' },
];

export const PREFECTURE_LIENS: LienUtile[] = [
  { id: '1', label: 'Carte d\'identité & Passeport', url: 'https://www.service-public.fr/particuliers/vosdroits/N360' },
  { id: '2', label: 'Carte grise (immatriculation)', url: 'https://immatriculation.ants.gouv.fr' },
  { id: '3', label: 'Permis de conduire', url: 'https://permisdeconduire.ants.gouv.fr' },
  { id: '4', label: 'Préfecture du Haut-Rhin', url: 'https://www.haut-rhin.gouv.fr' },
];

export const INTERCO_NAME = 'Communauté de Communes du Pays de l\'Alsace Verte';
export const INTERCO_INTRO = 'La commune exerce des compétences obligatoires transférées par les communes membres. Les délégués communautaires siègent au Conseil communautaire.';
export const INTERCO_CHIFFRES = '18 communes membres — plus de 15 000 habitants';
