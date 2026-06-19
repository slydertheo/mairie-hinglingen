import { Link } from 'react-router-dom';
import {
  FileText, Calendar, Users, MapPin, Phone, Mail, ExternalLink,
  ArrowRight, Building2, Trees, History, ChevronRight, Heart,
} from 'lucide-react';
import NewsCard from '../components/NewsCard';
import EventCard from '../components/EventCard';
import SectionTitle from '../components/SectionTitle';
import {
  COMMUNE_SHORT, COMMUNE_POPULATION, COMMUNE_SUPERFICIE,
  COMMUNE_ALTITUDE, COMMUNE_DEPARTMENT,
  MAYOR_NAME, MAYOR_MESSAGE,
  NEWS_DATA, EVENTS_DATA,
  MAIRIE_ADDRESS, MAIRIE_CITY, MAIRIE_PHONE, MAIRIE_EMAIL, MAIRIE_HORAIRES,
} from '../data';

const QUICK_LINKS = [
  { icon: FileText, label: 'État civil', description: 'Naissance, mariage, décès', href: '/demarches#etat-civil', color: 'blue' },
  { icon: Building2, label: 'Urbanisme', description: 'Permis de construire, PLU', href: '/demarches#urbanisme', color: 'green' },
  { icon: Users, label: 'Élections', description: 'Inscriptions sur les listes', href: '/demarches#elections', color: 'purple' },
  { icon: Calendar, label: 'Calendrier', description: 'Événements de la commune', href: '/evenements', color: 'orange' },
  { icon: FileText, label: 'Documents', description: 'Télécharger des formulaires', href: '/demarches#documents', color: 'red' },
  { icon: MapPin, label: 'Nous trouver', description: 'Accès et horaires', href: '/contact', color: 'teal' },
];

const colorClasses: Record<string, string> = {
  blue: 'bg-blue-50 text-blue-700 border-blue-100',
  green: 'bg-green-50 text-green-700 border-green-100',
  purple: 'bg-purple-50 text-purple-700 border-purple-100',
  orange: 'bg-orange-50 text-orange-700 border-orange-100',
  red: 'bg-red-50 text-red-700 border-red-100',
  teal: 'bg-teal-50 text-teal-700 border-teal-100',
};

const PARTNERS = [
  { name: 'Préfecture du Haut-Rhin', url: 'https://www.haut-rhin.gouv.fr' },
  { name: 'Conseil Départemental 68', url: '#' },
  { name: 'Région Grand Est', url: 'https://www.grandest.fr' },
  { name: 'Communauté de Communes', url: '#' },
];

export default function Home() {
  const latestNews = NEWS_DATA.slice(0, 3);
  const upcomingEvents = EVENTS_DATA.slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[400px] max-h-[700px] overflow-hidden" aria-label="Bandeau principal">
        <img
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80"
          alt="Vue aérienne de la commune de Hindlingen"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/60 via-blue-900/40 to-blue-950/70" aria-hidden="true" />
        <div className="relative h-full flex flex-col items-center justify-center text-white text-center px-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <MapPin size={14} aria-hidden="true" />
            {COMMUNE_DEPARTMENT} – Grand Est
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
            Bienvenue à <span className="text-blue-200">{COMMUNE_SHORT}</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-50 max-w-xl mb-8 drop-shadow">
            Un village alsacien du Sundgau, au cœur d'une nature préservée.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/la-commune" className="btn-primary bg-blue-600 hover:bg-blue-500 shadow-lg">
              Découvrir la commune
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/40 font-medium px-5 py-2.5 rounded-lg transition-colors">
              Nous contacter
            </Link>
          </div>
        </div>

        {/* Stats strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-blue-900/80 backdrop-blur-sm border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-center gap-8 md:gap-16 text-white text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <Users size={16} className="text-blue-300" aria-hidden="true" />
              <span><strong>{COMMUNE_POPULATION}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-blue-300" aria-hidden="true" />
              <span><strong>{COMMUNE_SUPERFICIE}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 size={16} className="text-blue-300" aria-hidden="true" />
              <span><strong>{COMMUNE_ALTITUDE}</strong> d'altitude</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick access */}
      <section className="bg-white border-b border-gray-100 py-8" aria-labelledby="quick-access-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="quick-access-title" className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5 text-center">
            Accès rapides – Démarches administratives
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {QUICK_LINKS.map((ql) => {
              const Icon = ql.icon;
              return (
                <Link
                  key={ql.href}
                  to={ql.href}
                  className={`flex flex-col items-center text-center p-4 rounded-xl border transition-all hover:shadow-md hover:-translate-y-0.5 duration-200 ${colorClasses[ql.color]}`}
                >
                  <Icon size={24} className="mb-2" aria-hidden="true" />
                  <span className="font-semibold text-sm leading-snug">{ql.label}</span>
                  <span className="text-xs mt-0.5 opacity-75 hidden sm:block">{ql.description}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mayor's message */}
      <section className="py-14 bg-gradient-to-br from-blue-900 to-blue-700 text-white" aria-labelledby="mayor-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle title="Mot du Maire" subtitle="Message de bienvenue" light />
              <blockquote className="text-blue-50 leading-relaxed text-base md:text-lg space-y-3">
                {MAYOR_MESSAGE.split('\n\n').map((p, i) => (
                  <p key={i}>{p.trim()}</p>
                ))}
              </blockquote>
              <div className="mt-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-blue-600 border-2 border-blue-300 flex items-center justify-center text-2xl font-bold text-white flex-shrink-0">
                  {MAYOR_NAME.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-bold text-white">{MAYOR_NAME}</div>
                  <div className="text-blue-200 text-sm">Maire de {COMMUNE_SHORT}</div>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80"
                alt="La mairie de Hindlingen"
                className="rounded-2xl shadow-2xl w-full object-cover h-80"
                loading="lazy"
              />
              <div className="absolute -bottom-4 -left-4 bg-white text-blue-900 rounded-xl p-4 shadow-xl border border-blue-100">
                <div className="font-bold text-2xl text-blue-800">2026</div>
                <div className="text-sm text-gray-500">Mandat municipal</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest news */}
      <section className="py-14 bg-gray-50" aria-labelledby="news-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <SectionTitle id="news-title" title="Actualités" subtitle="Les dernières nouvelles de la commune" />
            <Link to="/actualites" className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1">
              Toutes les actualités <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map((n) => (
              <NewsCard key={n.id} news={n} />
            ))}
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-14 bg-white" aria-labelledby="events-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <SectionTitle id="events-title" title="Agenda" subtitle="Les prochains événements de la commune" />
            <Link to="/evenements" className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1">
              Voir tout <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </div>
      </section>

      {/* Commune presentation */}
      <section className="py-14 bg-gray-50" aria-labelledby="presentation-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionTitle id="presentation-title" title={`Découvrir ${COMMUNE_SHORT}`} subtitle="Une commune attachante et dynamique" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Nichée au cœur du massif des Vosges, {COMMUNE_SHORT} est une commune au caractère alsacien affirmé.
                Ses ruelles fleuries, ses maisons à colombages et son église classée témoignent d'un riche patrimoine historique.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                La commune bénéficie d'une nature préservée avec ses forêts de chênes et ses étangs, paradis pour les amoureux de la nature et les pêcheurs.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { icon: Users, label: COMMUNE_POPULATION, desc: 'Population' },
                  { icon: MapPin, label: COMMUNE_SUPERFICIE, desc: 'Superficie' },
                ].map((s) => {
                  const Icon = s.icon;
                  return (
                    <div key={s.desc} className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon size={18} className="text-blue-700" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="font-bold text-blue-900">{s.label}</div>
                        <div className="text-xs text-gray-400">{s.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Link to="/la-commune" className="btn-primary">
                En savoir plus <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80"
                alt="Maisons alsaciennes"
                className="rounded-xl h-48 w-full object-cover shadow"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&q=80"
                alt="Nature et forêts"
                className="rounded-xl h-48 w-full object-cover shadow mt-6"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=400&q=80"
                alt="Étang communal"
                className="rounded-xl h-48 w-full object-cover shadow -mt-6"
                loading="lazy"
              />
              <img
                src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&q=80"
                alt="Forêt environnante"
                className="rounded-xl h-48 w-full object-cover shadow"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Historique */}
      <section className="py-14 bg-white" aria-labelledby="history-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                <History size={14} aria-hidden="true" />
                Histoire &amp; Patrimoine
              </div>
              <SectionTitle id="history-title" title="Histoire de la commune" />
              <p className="text-gray-600 leading-relaxed mb-4">
                Les premières traces d'occupation de {COMMUNE_SHORT} remontent au Moyen Âge. Le village est mentionné
                pour la première fois dans des chartes du XIIe siècle sous le nom de « Sanctus Martinus ».
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Au fil des siècles, la commune a connu une évolution agricole importante, avec le développement de
                l'élevage et de la pisciculture autour des étangs. L'église paroissiale, datant du XVe siècle,
                est classée monument historique depuis 1925.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Après les épreuves des deux guerres mondiales, le village s'est reconstruit et modernisé tout en
                préservant son caractère alsacien authentique.
              </p>
              <Link to="/la-commune#historique" className="btn-secondary">
                Découvrir l'histoire complète <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div>
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Calendar size={18} aria-hidden="true" />
                  Repères historiques
                </h3>
                <ol className="space-y-4">
                  {[
                    { year: 'XIIe s.', text: 'Première mention du village dans les archives médiévales' },
                    { year: 'XVe s.', text: 'Construction de l\'\u00e9glise paroissiale, aujourd\'hui classée' },
                    { year: '1648', text: 'Rattachement définitif à la France (Traité de Westphalie)' },
                    { year: '1790', text: 'Création de la municipalité sous la Révolution française' },
                    { year: '1918', text: 'Retour à la France après l\'Armistice' },
                    { year: '2024', text: 'Inauguration de la nouvelle salle des fêtes communale' },
                  ].map((r) => (
                    <li key={r.year} className="flex gap-4">
                      <span className="flex-shrink-0 w-16 text-sm font-bold text-blue-700">{r.year}</span>
                      <span className="text-gray-600 text-sm">{r.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Étangs & Forêts */}
      <section
        className="relative py-20 overflow-hidden"
        aria-labelledby="nature-title"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-blue-950/75" aria-hidden="true" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
              <Trees size={14} aria-hidden="true" />
              Patrimoine naturel
            </div>
            <SectionTitle id="nature-title" title="Étangs &amp; Forêts" subtitle="Un cadre naturel exceptionnel" light />
            <p className="text-blue-100 leading-relaxed mb-4 text-lg">
              La commune possède 3 étangs communaux couvrant une superficie totale de 8 hectares, nichés dans
              une forêt de chênes et de hêtres de 230 hectares. Ces espaces naturels sont un véritable trésor
              pour les habitants et les visiteurs.
            </p>
            <p className="text-blue-100 leading-relaxed mb-8">
              La pêche y est autorisée pour les membres de l'association de pêche locale. Des sentiers balisés
              permettent des promenades familiales autour des étangs.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-blue-200">Étangs communaux</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-center">
                <div className="text-2xl font-bold">230 ha</div>
                <div className="text-sm text-blue-200">De forêts</div>
              </div>
              <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-5 py-3 text-center">
                <div className="text-2xl font-bold">15 km</div>
                <div className="text-sm text-blue-200">De sentiers balisés</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vie municipale preview */}
      <section className="py-14 bg-gray-50" aria-labelledby="municipal-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-8">
            <SectionTitle id="municipal-title" title="Vie Municipale" subtitle="Transparence et démocratie locale" />
            <Link to="/vie-municipale" className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1">
              Voir plus <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: Users, title: 'Conseil Municipal', desc: 'Composition et rôle du conseil municipal de la commune.', href: '/vie-municipale#conseil' },
              { icon: FileText, title: 'Bulletins municipaux', desc: 'Tous les bulletins d\'information depuis 2020.', href: '/vie-municipale#bulletins' },
              { icon: Calendar, title: 'Comptes rendus', desc: 'Procès-verbaux des séances du conseil municipal.', href: '/vie-municipale#comptes-rendus' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className="card p-5 flex gap-4 group hover:border-blue-200"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
                    <Icon size={20} className="text-blue-700 group-hover:text-white transition-colors" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Map & Contact */}
      <section className="py-14 bg-white" aria-labelledby="contact-home-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact info */}
            <div>
              <SectionTitle id="contact-home-title" title="Nous trouver" subtitle="Coordonnées de la Mairie" />
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{MAIRIE_ADDRESS}</div>
                    <div className="text-gray-500">{MAIRIE_CITY}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone size={16} className="text-blue-700" aria-hidden="true" />
                  </div>
                  <a href={`tel:${MAIRIE_PHONE}`} className="font-medium text-blue-700 hover:underline">{MAIRIE_PHONE}</a>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail size={16} className="text-blue-700" aria-hidden="true" />
                  </div>
                  <a href={`mailto:${MAIRIE_EMAIL}`} className="font-medium text-blue-700 hover:underline break-all">{MAIRIE_EMAIL}</a>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">Horaires d'ouverture</h3>
                <ul className="space-y-1.5 text-sm">
                  {MAIRIE_HORAIRES.map((h) => (
                    <li
                      key={h.jour}
                      className={`flex justify-between ${h.horaires === 'Fermé' ? 'text-gray-300' : 'text-gray-600'}`}
                    >
                      <span className="font-medium">{h.jour}</span>
                      <span>{h.horaires}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link to="/contact" className="btn-primary mt-5">
                Nous contacter <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>

            {/* Map embed */}
            <div>
              <div className="rounded-2xl overflow-hidden shadow border border-gray-100 h-full min-h-[350px]">
                <iframe
                  title="Carte de localisation de la mairie de Hindlingen"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=7.2,47.8,7.4,47.9&layer=mapnik"
                  className="w-full h-full min-h-[350px]"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Carte fournie par <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-10 bg-gray-50 border-t border-gray-100" aria-labelledby="partners-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="partners-title" className="text-center text-xs font-semibold text-gray-400 uppercase tracking-widest mb-6">
            Partenaires institutionnels
          </h2>
          <div className="flex flex-wrap justify-center items-center gap-6">
            {PARTNERS.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:text-blue-700 hover:border-blue-200 transition-colors shadow-sm"
              >
                {p.name}
                <ExternalLink size={12} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
