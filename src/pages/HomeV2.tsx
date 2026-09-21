import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Phone, Mail, Clock, FileText, ExternalLink } from 'lucide-react';
import { useNews, useEvents, useDocuments, useSettings, useDecouvrirVignettes, useHomeLiens } from '../lib/contentStore';
import WeatherWidget from '../components/v2/WeatherWidget';
import SocialLinks from '../components/v2/SocialLinks';

// --- News carousel ---
function NewsCarousel() {
  const [idx, setIdx] = useState(0);
  const items = [...useNews()].sort((a, b) => b.date.localeCompare(a.date));
  const visible = 3;
  const max = items.length - visible;

  const prev = () => setIdx(i => Math.max(0, i - 1));
  const next = () => setIdx(i => Math.min(max, i + 1));

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-300 gap-4"
          style={{ transform: `translateX(calc(-${idx} * (100% / ${visible} + 16px / ${visible})))` }}
        >
          {items.map((n) => (
            <article
              key={n.id}
              className="flex-shrink-0 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              style={{ width: `calc(${100 / visible}% - ${(16 * (visible - 1)) / visible}px)` }}
            >
              {n.image && (
                <div className="h-40 overflow-hidden">
                  <img src={n.image} alt="" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
              )}
              <div className="p-4">
                <p className="text-blue-600 text-xs font-medium flex items-center gap-1 mb-2">
                  📅 {new Date(n.date).toLocaleDateString('fr-FR')}
                </p>
                <h3 className="font-bold text-gray-900 text-sm leading-snug uppercase mb-2 line-clamp-2">
                  {n.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{n.summary}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        disabled={idx === 0}
        className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center shadow hover:bg-blue-700 transition-colors z-10"
        aria-label="Actualité précédente"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={next}
        disabled={idx >= max}
        className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-blue-600 disabled:bg-gray-300 text-white rounded-full flex items-center justify-center shadow hover:bg-blue-700 transition-colors z-10"
        aria-label="Actualité suivante"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}

// --- Events carousel ---
function EventsList() {
  const events = [...useEvents()].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 4);
  return (
    <div className="space-y-3">
      {events.map((e) => {
        const d = new Date(e.date);
        return (
          <div key={e.id} className="flex gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all">
            <div className="flex-shrink-0 w-14 h-14 bg-blue-600 text-white rounded-xl flex flex-col items-center justify-center text-center">
              <span className="text-xl font-bold leading-none">{d.toLocaleDateString('fr-FR', { day: '2-digit' })}</span>
              <span className="text-xs font-medium uppercase">{d.toLocaleDateString('fr-FR', { month: 'short' })}</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-sm leading-snug">{e.title}</h3>
              <p className="text-gray-400 text-xs mt-0.5">📍 {e.location}{e.time ? ` · 🕐 ${e.time}` : ''}</p>
              <span className="inline-block mt-1 text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{e.category}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Quick links section exactly like Friesen style
const QUICK = [
  { emoji: '📋', label: 'Démarches', sub: 'État civil, urbanisme…', href: '/demarches' },
  { emoji: '🏛️', label: 'Vie Municipale', sub: 'Conseil, bulletins…', href: '/vie-municipale' },
  { emoji: '🌿', label: 'Découvrir', sub: 'Histoire, patrimoine…', href: '/decouvrir' },
  { emoji: '📅', label: 'Agenda', sub: 'Événements à venir', href: '/agenda' },
  { emoji: '📞', label: 'Contact', sub: 'Nous joindre', href: '/contact' },
  { emoji: '📥', label: 'Documents', sub: 'Téléchargements PDF', href: '/demarches#documents' },
];

export default function HomeV2() {
  const settings = useSettings();
  const COMMUNE_SHORT = settings.communeShort;
  const MAYOR_NAME = settings.mayorName;
  const MAYOR_MESSAGE = settings.mayorMessage;
  const MAIRIE_ADDRESS = settings.mairieAddress;
  const MAIRIE_CITY = settings.mairieCity;
  const MAIRIE_PHONE = settings.mairiePhone;
  const MAIRIE_EMAIL = settings.mairieEmail;
  const MAIRIE_HORAIRES = settings.mairieHoraires;
  const vignettes = useDecouvrirVignettes();
  const homeLiens = useHomeLiens();
  return (
    <>
      {/* Hero – pleine largeur, style Friesen */}
      <section className="relative" aria-label="Bandeau principal">
        <div className="relative h-[360px] md:h-[440px] overflow-hidden">
          <img
            src={settings.homeHeroImage}
            alt={`Vue de la commune de ${COMMUNE_SHORT}`}
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Subtle overlay for text readability */}
          <div className="absolute inset-0 bg-black/30" aria-hidden="true" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg mb-3">
              {settings.homeHeroTitle}
            </h1>
            <p className="text-white/90 text-base md:text-lg drop-shadow">
              {settings.homeHeroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Accès rapides – style Friesen : icônes emoji + cartes simples */}
      <section className="bg-gray-50 border-b border-gray-200 py-6" aria-labelledby="quick-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {QUICK.map((q) => (
              <Link
                key={q.href}
                to={q.href}
                className="flex flex-col items-center text-center bg-white border border-gray-200 rounded-xl py-4 px-2 hover:border-blue-400 hover:shadow-sm transition-all group"
              >
                <span className="text-3xl mb-1.5" aria-hidden="true">{q.emoji}</span>
                <span className="font-semibold text-gray-800 text-xs group-hover:text-blue-700 transition-colors leading-tight">{q.label}</span>
                <span className="text-gray-400 text-xs mt-0.5 hidden sm:block">{q.sub}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Actualités – style Friesen */}
      <section className="py-10" aria-labelledby="news-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="news-title" className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            🗞️ Actualités de {COMMUNE_SHORT}
          </h2>
          <div className="px-6">
            <NewsCarousel />
          </div>
          <div className="text-center mt-6">
            <Link to="/actualites" className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium px-6 py-2 rounded-full transition-colors text-sm">
              Voir toutes les actualités →
            </Link>
          </div>
        </div>
      </section>

      {/* Agenda + Mot du Maire */}
      <section className="bg-gray-50 py-10" aria-label="Agenda et mot du maire">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Agenda */}
            <div>
              <h2 className="text-2xl font-bold text-blue-700 mb-5 flex items-center gap-2">
                📅 Agenda de {COMMUNE_SHORT}
              </h2>
              <EventsList />
              <div className="mt-4">
                <Link to="/agenda" className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium px-6 py-2 rounded-full transition-colors text-sm">
                  Voir tout l'agenda →
                </Link>
              </div>
            </div>

            {/* Mot du Maire */}
            <div>
              <h2 className="text-2xl font-bold text-blue-700 mb-5 flex items-center gap-2">
                🏛️ Mot du Maire
              </h2>
              <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 font-bold text-xl flex items-center justify-center flex-shrink-0">
                    {MAYOR_NAME.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{MAYOR_NAME}</div>
                    <div className="text-blue-600 text-sm">Maire de {COMMUNE_SHORT}</div>
                  </div>
                </div>
                <blockquote className="text-gray-600 text-sm leading-relaxed italic border-l-4 border-blue-200 pl-4">
                  {MAYOR_MESSAGE.split('\n\n')[0]}
                </blockquote>
                <Link to="/decouvrir" className="inline-block mt-4 text-blue-600 text-sm font-medium hover:underline">
                  Lire le message complet →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Découvrir la commune – bandeau illustré */}
      <section className="py-10" aria-labelledby="decouvrir-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="decouvrir-title" className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            🌿 Découvrir {COMMUNE_SHORT}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {vignettes.map((c) => (
              <Link
                key={c.id}
                to={c.href}
                className="group relative h-40 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img src={c.img} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
                <span className="absolute bottom-3 left-3 text-white font-bold text-sm">{c.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Infos pratiques / Contact – encart simple */}
      <section className="bg-blue-50 border-t border-blue-100 py-10" aria-labelledby="infos-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <h2 id="infos-title" className="text-2xl font-bold text-blue-700 flex items-center gap-2">
              ℹ️ Infos pratiques
            </h2>
            <SocialLinks />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Météo */}
            <WeatherWidget />
            {/* Coordonnées */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">📍 Coordonnées</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2"><MapPin size={14} className="text-blue-500 flex-shrink-0 mt-0.5" />{MAIRIE_ADDRESS}, {MAIRIE_CITY}</li>
                <li className="flex items-center gap-2"><Phone size={14} className="text-blue-500 flex-shrink-0" /><a href={`tel:${MAIRIE_PHONE}`} className="text-blue-600 hover:underline">{MAIRIE_PHONE}</a></li>
                <li className="flex items-center gap-2"><Mail size={14} className="text-blue-500 flex-shrink-0" /><a href={`mailto:${MAIRIE_EMAIL}`} className="text-blue-600 hover:underline break-all">{MAIRIE_EMAIL}</a></li>
              </ul>
            </div>
            {/* Horaires */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-1"><Clock size={14} className="text-blue-500" /> Horaires d'ouverture</h3>
              <ul className="space-y-1 text-sm">
                {MAIRIE_HORAIRES.map(h => (
                  <li key={h.jour} className={`flex justify-between ${h.horaires === 'Fermé' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <span className="font-medium">{h.jour}</span>
                    <span>{h.horaires}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Liens utiles */}
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-3">🔗 Liens utiles</h3>
              <ul className="space-y-2 text-sm">
                {homeLiens.map(l => (
                  <li key={l.id}>
                    <a href={l.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline">
                      <ExternalLink size={11} aria-hidden="true" />
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-center mt-8">
            <Link to="/contact" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-full transition-colors shadow">
              📬 Nous contacter
            </Link>
          </div>
        </div>
      </section>

      {/* Documents téléchargeables */}
      <section className="py-10" aria-labelledby="docs-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="docs-title" className="text-2xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            📥 Téléchargements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...useDocuments()].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6).map((doc) => (
              <a
                key={doc.id}
                href={doc.fileUrl}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
                aria-label={`Télécharger : ${doc.title}`}
              >
                <span className="text-2xl flex-shrink-0" aria-hidden="true">📄</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 group-hover:text-blue-700 transition-colors truncate">{doc.title}</div>
                  <div className="text-xs text-blue-500 flex items-center gap-1 mt-0.5">
                    <FileText size={10} aria-hidden="true" />
                    Télécharger PDF{doc.size ? ` · ${doc.size}` : ''}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
