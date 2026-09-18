import { Link } from 'react-router-dom';

const SECTIONS: { title: string; emoji: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Accueil',
    emoji: '🏠',
    links: [{ label: 'Page d\'accueil', href: '/' }],
  },
  {
    title: 'Découvrir Hindlingen',
    emoji: '🌿',
    links: [
      { label: 'Présentation générale', href: '/decouvrir' },
      { label: 'Historique', href: '/decouvrir#historique' },
      { label: 'Patrimoine', href: '/decouvrir#pat-title' },
      { label: 'Étangs & forêts', href: '/decouvrir#etangs-forets' },
      { label: 'Galerie photos', href: '/decouvrir#galerie' },
    ],
  },
  {
    title: 'Vie municipale',
    emoji: '🏛️',
    links: [
      { label: 'Conseil municipal, commissions', href: '/vie-municipale' },
      { label: 'Bulletins communaux', href: '/vie-municipale' },
      { label: 'Délibérations du conseil', href: '/vie-municipale' },
      { label: 'Comptes rendus', href: '/vie-municipale' },
      { label: "Tableau d'affichage", href: '/vie-municipale' },
    ],
  },
  {
    title: 'Démarches administratives',
    emoji: '📋',
    links: [
      { label: 'État civil & mariage', href: '/demarches' },
      { label: 'PACS', href: '/demarches' },
      { label: 'Élections & inscription sur les listes', href: '/demarches' },
      { label: 'Urbanisme & PLU/PLUi', href: '/demarches' },
      { label: 'Démarches en ligne', href: '/demarches' },
      { label: 'Services préfectoraux', href: '/demarches' },
      { label: 'Formulaires & documents', href: '/demarches' },
    ],
  },
  {
    title: 'Vie locale',
    emoji: '🌻',
    links: [
      { label: 'École', href: '/vie-locale#ecole' },
      { label: 'Marché & camion à pizzas', href: '/vie-locale#marche' },
      { label: 'Associations', href: '/vie-locale#associations' },
      { label: 'Commerces & services', href: '/vie-locale#commerces' },
    ],
  },
  {
    title: 'Intercommunalité',
    emoji: '🤝',
    links: [{ label: 'Communauté de communes', href: '/intercommunalite' }],
  },
  {
    title: 'Actualités & agenda',
    emoji: '🗞️',
    links: [
      { label: 'Toutes les actualités', href: '/actualites' },
      { label: "Agenda et calendrier des événements", href: '/agenda' },
    ],
  },
  {
    title: 'Plan & carte',
    emoji: '🗺️',
    links: [{ label: 'Carte interactive, lieux et radar météo', href: '/plan-commune' }],
  },
  {
    title: 'Contact',
    emoji: '📬',
    links: [{ label: 'Coordonnées et formulaire de contact', href: '/contact' }],
  },
];

export default function PlanDuSiteV2() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">🧭 Plan du site</h1>
        <p className="text-blue-100">Retrouvez rapidement toutes les pages et informations du site</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SECTIONS.map(section => (
          <section key={section.title} className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-blue-700 mb-3 flex items-center gap-2">
              <span aria-hidden="true">{section.emoji}</span>
              {section.title}
            </h2>
            <ul className="space-y-1.5">
              {section.links.map(l => (
                <li key={l.label}>
                  <Link to={l.href} className="text-sm text-gray-600 hover:text-blue-700 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
