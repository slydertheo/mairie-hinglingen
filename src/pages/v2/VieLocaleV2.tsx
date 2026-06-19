import { ASSOCIATIONS_DATA } from '../../data';

const COMMERCES = [
  { name: 'Boulangerie-Pâtisserie Muller', type: 'Alimentation', horaires: 'Mar–Sam 6h30–13h / 15h30–19h', phone: '03 89 25 01 01' },
  { name: 'Épicerie de la Place', type: 'Alimentation', horaires: 'Lun–Sam 8h–19h, Dim 9h–12h', phone: '03 89 25 01 02' },
  { name: 'Bar-Restaurant Le Tilleul', type: 'Restauration', horaires: 'Mer–Dim 11h30–14h / 18h30–21h30', phone: '03 89 25 01 03' },
  { name: 'Salon de coiffure Isabelle', type: 'Services', horaires: 'Mar–Sam 9h–18h', phone: '03 89 25 01 04' },
  { name: 'Cabinet médical Dr. Schmidt', type: 'Santé', horaires: 'Lun–Ven 8h–12h / 14h–18h', phone: '03 89 25 01 05' },
  { name: 'Pharmacie de Hindlingen', type: 'Santé', horaires: 'Lun–Ven 8h30–19h / Sam 9h–13h', phone: '03 89 25 81 00' },
];

const CAT_COLORS: Record<string, string> = {
  Loisirs: 'bg-yellow-100 text-yellow-700',
  Sport: 'bg-green-100 text-green-700',
  École: 'bg-blue-100 text-blue-700',
  Culture: 'bg-purple-100 text-purple-700',
  Seniors: 'bg-orange-100 text-orange-700',
  Sécurité: 'bg-red-100 text-red-700',
};

export default function VieLocaleV2() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">🌻 Vie Locale</h1>
        <p className="text-blue-100">Écoles, associations, commerces et services de proximité</p>
      </div>

      {/* École */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-6" aria-labelledby="ecole-title">
        <h2 id="ecole-title" className="text-xl font-bold text-blue-700 mb-5">🏫 École</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            <h3 className="font-bold text-blue-900 text-base mb-3">École Primaire Publique</h3>
            <dl className="space-y-2 text-sm text-gray-700">
              {[
                ['Adresse', '15 rue de l\'École, 68510 Hindlingen'],
                ['Téléphone', '03 89 25 02 00'],
                ['Email', 'ecole@hindlingen.fr'],
                ['Effectif', '~120 élèves – 5 classes'],
                ['Horaires', 'Lun, Mar, Jeu, Ven : 8h30–11h30 / 13h30–16h30\nMercredi : 8h30–11h30'],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col sm:flex-row sm:gap-2">
                  <dt className="font-semibold text-blue-800 sm:w-24 flex-shrink-0">{k}</dt>
                  <dd className="text-gray-600 whitespace-pre-line">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="space-y-3">
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">🌅 Périscolaire & garderie</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Garderie matin</strong> : 7h30–8h30, sur inscription</li>
                <li>• <strong>Accueil soir</strong> : 16h30–18h30, lundi–vendredi</li>
                <li>• <strong>Centre de loisirs</strong> : pendant les vacances scolaires</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">🎒 Collège & Lycée</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>Collège</strong> : Marcel-Pagnol – 5 km (car scolaire)</li>
                <li><strong>Lycée</strong> : Établissement de la ville voisine – 15 km</li>
              </ul>
            </div>
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">📋 Inscriptions scolaires</h3>
              <p className="text-sm text-gray-600">En mairie : livret de famille + justificatif de domicile + carnet de santé.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marché & Camion pizzas */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" aria-label="Marché et services">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4">
          <span className="text-4xl flex-shrink-0" aria-hidden="true">🛒</span>
          <div>
            <h3 className="font-bold text-amber-900 text-base mb-1">Marché communal</h3>
            <p className="text-amber-800 text-sm"><strong>Chaque samedi 9h–13h</strong> – Place de la Mairie<br />Producteurs locaux, circuit court, spécialités alsaciennes.</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex gap-4">
          <span className="text-4xl flex-shrink-0" aria-hidden="true">🍕</span>
          <div>
            <h3 className="font-bold text-red-900 text-base mb-1">Camion à pizzas – Chez Mario</h3>
            <p className="text-red-800 text-sm"><strong>Chaque vendredi 18h–21h</strong> – Parking salle des fêtes<br />📞 06 00 00 00 00 – Commandes à l'avance bienvenues.</p>
          </div>
        </div>
      </section>

      {/* Associations */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-6" aria-labelledby="asso-title">
        <h2 id="asso-title" className="text-xl font-bold text-blue-700 mb-4">❤️ Associations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ASSOCIATIONS_DATA.map(a => (
            <div key={a.id} className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-900 text-sm">{a.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-1 ${CAT_COLORS[a.category] ?? 'bg-gray-100 text-gray-600'}`}>{a.category}</span>
              </div>
              <p className="text-gray-500 text-xs mb-2">{a.description}</p>
              {a.email && <a href={`mailto:${a.email}`} className="text-xs text-blue-600 hover:underline">✉️ {a.email}</a>}
            </div>
          ))}
        </div>
      </section>

      {/* Commerces */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6" aria-labelledby="comm-title">
        <h2 id="comm-title" className="text-xl font-bold text-blue-700 mb-4">🏪 Commerces &amp; Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COMMERCES.map(c => (
            <div key={c.name} className="border border-gray-100 rounded-xl p-4">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-bold text-gray-900 text-sm">{c.name}</h3>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex-shrink-0 ml-1">{c.type}</span>
              </div>
              <p className="text-gray-400 text-xs mb-1">🕐 {c.horaires}</p>
              <a href={`tel:${c.phone}`} className="text-xs text-blue-600 hover:underline">📞 {c.phone}</a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
