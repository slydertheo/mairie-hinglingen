import { useAssociations, useCommerces, useSettings } from '../../lib/contentStore';

const CAT_COLORS: Record<string, string> = {
  Loisirs: 'bg-yellow-100 text-yellow-700',
  Sport: 'bg-green-100 text-green-700',
  École: 'bg-blue-100 text-blue-700',
  Culture: 'bg-purple-100 text-purple-700',
  Seniors: 'bg-orange-100 text-orange-700',
  Sécurité: 'bg-red-100 text-red-700',
};

export default function VieLocaleV2() {
  const associations = useAssociations();
  const commerces = useCommerces();
  const settings = useSettings();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">🌻 Vie Locale</h1>
        <p className="text-blue-100">Écoles, associations, commerces et services de proximité</p>
      </div>

      {/* École */}
      <section id="ecole" className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 scroll-mt-24" aria-labelledby="ecole-title">
        <h2 id="ecole-title" className="text-xl font-bold text-blue-700 mb-5">🏫 École</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
            {settings.ecoleImage && (
              <img src={settings.ecoleImage} alt={settings.ecoleName} className="w-full h-36 object-cover rounded-lg mb-4" loading="lazy" />
            )}
            <h3 className="font-bold text-blue-900 text-base mb-3">{settings.ecoleName}</h3>
            <dl className="space-y-2 text-sm text-gray-700">
              {[
                ['Adresse', settings.ecoleAddress],
                ['Téléphone', settings.ecolePhone],
                ['Email', settings.ecoleEmail],
                ['Effectif', settings.ecoleEffectif],
                ['Horaires', settings.ecoleHoraires],
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
                {settings.ecolePeriscolaire.split('\n').map(l => l.trim()).filter(Boolean).map(l => (
                  <li key={l}>• {l}</li>
                ))}
              </ul>
            </div>
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">🎒 Collège & Lycée</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {settings.ecoleCollegeLycee.split('\n').map(l => l.trim()).filter(Boolean).map(l => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
            <div className="border border-gray-200 rounded-xl p-4">
              <h3 className="font-bold text-gray-900 mb-2 text-sm">📋 Inscriptions scolaires</h3>
              <p className="text-sm text-gray-600">{settings.ecoleInscriptions}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Marché & Camion pizzas */}
      <section id="marche" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 scroll-mt-24" aria-label="Marché et services">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-4">
          <span className="text-4xl flex-shrink-0" aria-hidden="true">🛒</span>
          <div>
            <h3 className="font-bold text-amber-900 text-base mb-1">{settings.marketTitle}</h3>
            <p className="text-amber-800 text-sm"><strong>{settings.marketSchedule}</strong> – {settings.marketLocation}<br />{settings.marketDescription}</p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-100 rounded-2xl p-5 flex gap-4">
          <span className="text-4xl flex-shrink-0" aria-hidden="true">🍕</span>
          <div>
            <h3 className="font-bold text-red-900 text-base mb-1">{settings.foodtruckTitle}</h3>
            <p className="text-red-800 text-sm"><strong>{settings.foodtruckSchedule}</strong> – {settings.foodtruckLocation}<br />📞 {settings.foodtruckPhone} – {settings.foodtruckDescription}</p>
          </div>
        </div>
      </section>

      {/* Associations */}
      <section id="associations" className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 scroll-mt-24" aria-labelledby="asso-title">
        <h2 id="asso-title" className="text-xl font-bold text-blue-700 mb-4">❤️ Associations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {associations.map(a => (
            <div key={a.id} className="border border-gray-100 rounded-xl overflow-hidden hover:border-blue-200 transition-colors">
              {a.image && <img src={a.image} alt="" className="w-full h-28 object-cover" loading="lazy" />}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-sm">{a.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ml-1 ${CAT_COLORS[a.category] ?? 'bg-gray-100 text-gray-600'}`}>{a.category}</span>
                </div>
                <p className="text-gray-500 text-xs mb-2">{a.description}</p>
                {a.email && <a href={`mailto:${a.email}`} className="text-xs text-blue-600 hover:underline">✉️ {a.email}</a>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Commerces */}
      <section id="commerces" className="bg-white border border-gray-200 rounded-2xl p-6 scroll-mt-24" aria-labelledby="comm-title">
        <h2 id="comm-title" className="text-xl font-bold text-blue-700 mb-4">🏪 Commerces &amp; Entreprises locales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {commerces.map(c => (
            <div key={c.id} className="border border-gray-100 rounded-xl overflow-hidden flex gap-3">
              {c.image && <img src={c.image} alt="" className="w-24 h-24 object-cover flex-shrink-0" loading="lazy" />}
              <div className="p-4 pl-0 first:pl-4 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-900 text-sm">{c.name}</h3>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex-shrink-0 ml-1">{c.type}</span>
                </div>
                <p className="text-gray-400 text-xs mb-1">🕐 {c.horaires}</p>
                <a href={`tel:${c.phone}`} className="text-xs text-blue-600 hover:underline">📞 {c.phone}</a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
