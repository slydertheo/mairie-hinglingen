import type { NewsItem, EventItem, CouncilMember, Document, Association } from '../types';

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

export const ASSOCIATIONS_DATA: Association[] = [
  { id: '1', name: 'Amicale de Hindlingen', description: 'Organisation d\'événements conviviaux pour tous les habitants.', category: 'Loisirs', email: 'amicale@hindlingen.fr' },
  { id: '2', name: 'Club de randonnée', description: 'Sorties régulières dans la nature environnante. Tous niveaux bienvenus.', category: 'Sport', email: 'rando@hindlingen.fr' },
  { id: '3', name: 'Ass. parents d\'élèves', description: 'Association représentant les parents auprès de l\'équipe pédagogique.', category: 'École', email: 'ape@hindlingen.fr' },
  { id: '4', name: 'Chœur de Hindlingen', description: 'Chorale mixte, répétitions le jeudi soir. Venez chanter avec nous !', category: 'Culture', email: 'chorale@hindlingen.fr' },
  { id: '5', name: 'Club des aînés', description: 'Activités, sorties et repas partagés pour les seniors de la commune.', category: 'Seniors', email: 'aines@hindlingen.fr' },
  { id: '6', name: 'Sapeurs-pompiers volontaires', description: 'Centre de secours local. Recrutement ouvert aux volontaires.', category: 'Sécurité', email: 'pompiers@hindlingen.fr' },
];
