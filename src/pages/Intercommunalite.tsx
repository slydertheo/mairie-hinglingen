import { Building2, ExternalLink, MapPin, Users, Briefcase } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import { COMMUNE_SHORT } from '../data';

const COMPETENCES = [
  { icon: '🏗️', title: 'Développement économique', desc: 'Création et gestion des zones d\'activités, soutien aux entreprises locales.' },
  { icon: '🌿', title: 'Environnement', desc: 'Collecte et traitement des déchets, protection des espaces naturels.' },
  { icon: '🏠', title: 'Habitat', desc: 'Programme local de l\'habitat, soutien à la rénovation énergétique.' },
  { icon: '🚌', title: 'Mobilité', desc: 'Organisation des transports en commun intercommunaux.' },
  { icon: '💧', title: 'Eau & Assainissement', desc: 'Gestion du réseau d\'eau potable et du traitement des eaux usées.' },
  { icon: '📡', title: 'Numérique', desc: 'Déploiement du très haut débit et services numériques.' },
];

const USEFUL_LINKS = [
  { name: 'Communauté de Communes', url: '#', desc: 'Site officiel de l\'intercommunalité' },
  { name: 'Conseil Régional Grand Est', url: 'https://www.grandest.fr', desc: 'Région Grand Est' },
  { name: 'Conseil Départemental 68', url: '#', desc: 'Haut-Rhin' },
  { name: 'Préfecture du Haut-Rhin', url: 'https://www.haut-rhin.gouv.fr', desc: 'Services de l\'\u00c9tat' },
  { name: 'Service-Public.fr', url: 'https://www.service-public.fr', desc: 'Portail national des démarches' },
  { name: 'ANCT', url: 'https://www.anct.gouv.fr', desc: 'Agence Nationale de la Cohésion des Territoires' },
];

export default function Intercommunalite() {
  return (
    <>
      <PageHeader
        title="Intercommunalité"
        subtitle={`${COMMUNE_SHORT} et ses partenaires territoraux au service des habitants`}
        breadcrumbs={[{ label: 'Intercommunalité' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Présentation */}
        <section className="mb-14" aria-labelledby="cc-title">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <SectionTitle id="cc-title" title="Communauté de Communes" subtitle="Notre groupement intercommunal" />
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  {COMMUNE_SHORT} est membre de la Communauté de Communes du Pays de l'Alsace Verte, 
                  un établissement public de coopération intercommunale (EPCI) regroupant 18 communes 
                  et plus de 15 000 habitants.
                </p>
                <p className="leading-relaxed">
                  La communauté de communes exerce des compétences obligatoires transférées par les 
                  communes membres, dans les domaines du développement économique, de l'aménagement 
                  du territoire, de la collecte des déchets et de l'environnement.
                </p>
                <p className="leading-relaxed">
                  Les délégués communautaires de {COMMUNE_SHORT} siègent au Conseil communautaire et 
                  participent aux décisions prises pour l'ensemble du territoire intercommunal.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 text-center">
                  <div className="text-2xl font-bold text-blue-800">18</div>
                  <div className="text-sm text-gray-500">Communes membres</div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 text-center">
                  <div className="text-2xl font-bold text-blue-800">15 000</div>
                  <div className="text-sm text-gray-500">Habitants</div>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-3 text-center">
                  <div className="text-2xl font-bold text-blue-800">120 km²</div>
                  <div className="text-sm text-gray-500">Superficie</div>
                </div>
              </div>
            </div>
            <div className="bg-blue-900 text-white rounded-2xl p-6">
              <h3 className="font-bold text-blue-100 mb-4 flex items-center gap-2">
                <Users size={18} aria-hidden="true" />
                Délégués communautaires
              </h3>
              <ul className="space-y-3 text-sm">
                {[
                  { name: 'Jean-Pierre Muller', role: 'Délégué titulaire – Maire' },
                  { name: 'Marie Schmitt', role: 'Délégué titulaire – 1ère Adjointe' },
                  { name: 'Bernard Kieffer', role: 'Délégué suppléant' },
                ].map((d) => (
                  <li key={d.name} className="flex flex-col">
                    <span className="font-semibold text-white">{d.name}</span>
                    <span className="text-blue-300 text-xs">{d.role}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Compétences */}
        <section className="mb-14" aria-labelledby="competences-title">
          <SectionTitle id="competences-title" title="Compétences exercées" subtitle="Les services gérés à l'échelle intercommunale" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPETENCES.map((c) => (
              <div key={c.title} className="card p-5 flex gap-4">
                <div className="text-3xl flex-shrink-0" aria-hidden="true">{c.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                  <p className="text-gray-500 text-sm">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Liens utiles */}
        <section aria-labelledby="links-title">
          <SectionTitle id="links-title" title="Liens utiles" subtitle="Institutions et partenaires territoriaux" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {USEFUL_LINKS.map((l) => (
              <a
                key={l.name}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-4 flex items-center justify-between group hover:border-blue-200"
              >
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">{l.name}</div>
                  <div className="text-sm text-gray-400">{l.desc}</div>
                </div>
                <ExternalLink size={16} className="text-gray-300 group-hover:text-blue-500 flex-shrink-0 ml-3 transition-colors" aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
