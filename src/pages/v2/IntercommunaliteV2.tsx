import { ExternalLink } from 'lucide-react';
import { COMMUNE_SHORT } from '../../data';

const LINKS = [
  { name: 'Communauté de Communes', url: '#', desc: 'Site officiel de l\'intercommunalité' },
  { name: 'Conseil Régional Grand Est', url: 'https://www.grandest.fr', desc: 'Région Grand Est' },
  { name: 'Conseil Départemental 68', url: '#', desc: 'Haut-Rhin' },
  { name: 'Préfecture du Haut-Rhin', url: 'https://www.haut-rhin.gouv.fr', desc: 'Services de l\'État' },
  { name: 'Service-Public.fr', url: 'https://www.service-public.fr', desc: 'Portail national' },
  { name: 'ANCT', url: 'https://www.anct.gouv.fr', desc: 'Agence Nationale de la Cohésion des Territoires' },
];

const COMPETENCES = [
  { emoji: '🏗️', title: 'Développement économique', desc: 'Zones d\'activités, soutien aux entreprises.' },
  { emoji: '🌿', title: 'Environnement', desc: 'Collecte déchets, espaces naturels.' },
  { emoji: '🏠', title: 'Habitat', desc: 'Programme local de l\'habitat, rénovation.' },
  { emoji: '🚌', title: 'Mobilité', desc: 'Transports en commun intercommunaux.' },
  { emoji: '💧', title: 'Eau & Assainissement', desc: 'Réseau eau potable et eaux usées.' },
  { emoji: '📡', title: 'Numérique', desc: 'Déploiement très haut débit.' },
];

export default function IntercommunaliteV2() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">🤝 Intercommunalité</h1>
        <p className="text-blue-100">{COMMUNE_SHORT} et ses partenaires territoriaux</p>
      </div>

      {/* Présentation */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-6" aria-labelledby="cc-title">
        <h2 id="cc-title" className="text-xl font-bold text-blue-700 mb-4">📍 Communauté de Communes</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3 text-gray-600 text-sm leading-relaxed">
            <p>{COMMUNE_SHORT} est membre de la Communauté de Communes du Pays de l'Alsace Verte, regroupant 18 communes et plus de 15 000 habitants.</p>
            <p>La communauté exerce des compétences obligatoires transférées par les communes membres. Les délégués communautaires de {COMMUNE_SHORT} siègent au Conseil communautaire.</p>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <h3 className="font-bold text-blue-900 mb-3 text-sm">Chiffres clés</h3>
            {[['18', 'Communes membres'], ['15 000', 'Habitants'], ['120 km²', 'Superficie']].map(([n, l]) => (
              <div key={l} className="flex justify-between border-b border-blue-100 py-2 last:border-0 text-sm">
                <span className="font-bold text-blue-800">{n}</span>
                <span className="text-gray-500">{l}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 bg-blue-900 text-white rounded-xl p-4">
          <h3 className="font-bold text-blue-200 mb-3 text-sm">👥 Délégués communautaires</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { name: 'Jean-Pierre Muller', role: 'Délégué titulaire – Maire' },
              { name: 'Marie Schmitt', role: 'Délégué titulaire – 1ère Adjointe' },
              { name: 'Bernard Kieffer', role: 'Délégué suppléant' },
            ].map(d => (
              <div key={d.name} className="bg-blue-800 rounded-lg p-3 text-sm">
                <div className="font-semibold">{d.name}</div>
                <div className="text-blue-300 text-xs">{d.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compétences */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-6" aria-labelledby="comp-title">
        <h2 id="comp-title" className="text-xl font-bold text-blue-700 mb-4">⚙️ Compétences exercées</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {COMPETENCES.map(c => (
            <div key={c.title} className="flex gap-3 border border-gray-100 rounded-xl p-4">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">{c.emoji}</span>
              <div>
                <h3 className="font-bold text-gray-900 text-sm mb-0.5">{c.title}</h3>
                <p className="text-gray-500 text-xs">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Liens utiles */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6" aria-labelledby="links-title">
        <h2 id="links-title" className="text-xl font-bold text-blue-700 mb-4">🔗 Liens utiles</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {LINKS.map(l => (
            <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group">
              <div>
                <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{l.name}</div>
                <div className="text-xs text-gray-400">{l.desc}</div>
              </div>
              <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-500 flex-shrink-0 ml-2 transition-colors" aria-hidden="true" />
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
