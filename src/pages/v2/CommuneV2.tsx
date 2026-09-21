import { useSettings, useTimeline, usePatrimoine, useEtangs, useGallery } from '../../lib/contentStore';

export default function CommuneV2() {
  const settings = useSettings();
  const {
    communeShort: COMMUNE_SHORT,
    communePopulation: COMMUNE_POPULATION,
    communeSuperficie: COMMUNE_SUPERFICIE,
    communeAltitude: COMMUNE_ALTITUDE,
    communeDepartment: COMMUNE_DEPARTMENT,
    communePostal: COMMUNE_POSTAL,
    communeCodeInsee: COMMUNE_CODE_INSEE,
  } = settings;
  const timeline = useTimeline();
  const patrimoine = usePatrimoine();
  const etangs = useEtangs();
  const gallery = useGallery();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Page header */}
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80)' }}
          aria-hidden="true"
        />
        <div className="relative">
          <h1 className="text-3xl font-bold mb-2">🌿 Découvrir {COMMUNE_SHORT}</h1>
          <p className="text-blue-100">Histoire, patrimoine, nature et galerie photos</p>
        </div>
      </div>

      {/* Présentation */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-6" aria-labelledby="pres-title">
        <h2 id="pres-title" className="text-xl font-bold text-blue-700 mb-4">📍 Présentation générale</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-3 text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {settings.communePresentation}
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-3 text-sm">📊 Données clés</h3>
            <dl className="space-y-2 text-sm">
              {[
                ['Population', COMMUNE_POPULATION],
                ['Superficie', COMMUNE_SUPERFICIE],
                ['Altitude', COMMUNE_ALTITUDE],
                ['Département', COMMUNE_DEPARTMENT],
                ['Code postal', COMMUNE_POSTAL],
                ['Code INSEE', COMMUNE_CODE_INSEE],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-blue-100 pb-1 last:border-0">
                  <dt className="text-gray-500">{k}</dt>
                  <dd className="font-semibold text-blue-900">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Historique */}
      <section id="historique" className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 scroll-mt-24" aria-labelledby="hist-title">
        <h2 id="hist-title" className="text-xl font-bold text-blue-700 mb-4">📜 Historique</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {settings.historiqueIntro}
          </div>
          <ol className="relative border-l-2 border-blue-200 ml-4 space-y-4">
            {timeline.map(r => (
              <li key={r.id} className="ml-5 text-sm">
                <span className="absolute -left-2 w-4 h-4 bg-blue-600 rounded-full border-2 border-white" aria-hidden="true" />
                <time className="font-bold text-blue-600">{r.year}</time>
                <p className="text-gray-600">{r.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Patrimoine */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-6" aria-labelledby="pat-title">
        <h2 id="pat-title" className="text-xl font-bold text-blue-700 mb-4">🏛️ Patrimoine</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {patrimoine.map(p => (
            <div key={p.id} className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-colors">
              <span className="text-3xl" aria-hidden="true">{p.emoji}</span>
              <h3 className="font-bold text-gray-900 mt-2 mb-1 text-sm">{p.title}</h3>
              <p className="text-gray-500 text-xs mb-2">{p.desc}</p>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{p.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Étangs & Forêts */}
      <section id="etangs-forets" className="bg-white border border-gray-200 rounded-2xl p-6 mb-6 scroll-mt-24" aria-labelledby="nat-title">
        <h2 id="nat-title" className="text-xl font-bold text-blue-700 mb-4">🌊 Étangs &amp; Forêts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Les étangs communaux</h3>
            <p className="text-gray-600 text-sm mb-3">{settings.etangsIntro}</p>
            <div className="flex gap-2 flex-wrap mb-4">
              {etangs.map(e => (
                <div key={e.id} className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-center text-xs">
                  <div className="font-bold text-blue-800">{e.name}</div>
                  <div className="text-gray-500">{e.superficie}</div>
                </div>
              ))}
            </div>
            <img src={settings.etangsImage} alt="Étang communal" className="rounded-xl w-full h-40 object-cover" loading="lazy" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">La forêt communale</h3>
            <p className="text-gray-600 text-sm mb-3">{settings.forestIntro}</p>
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-sm text-green-800 mb-4 whitespace-pre-line">
              <strong>Sentiers balisés :</strong><br />
              {settings.forestSentiers}
            </div>
            <img src={settings.forestImage} alt="Forêt communale" className="rounded-xl w-full h-40 object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section id="galerie" className="bg-white border border-gray-200 rounded-2xl p-6 scroll-mt-24" aria-labelledby="gal-title">
        <h2 id="gal-title" className="text-xl font-bold text-blue-700 mb-4">📸 Galerie photos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {gallery.map((g) => (
            <div key={g.id} className="aspect-square rounded-xl overflow-hidden">
              <img src={g.url} alt={g.caption || 'Photo de la commune'} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
