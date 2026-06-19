import { COMMUNE_SHORT, COMMUNE_POPULATION, COMMUNE_SUPERFICIE, COMMUNE_ALTITUDE, COMMUNE_DEPARTMENT } from '../../data';

export default function CommuneV2() {
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
          <div className="lg:col-span-2 space-y-3 text-gray-600 text-sm leading-relaxed">
            <p>{COMMUNE_SHORT} est une commune française située dans le département du {COMMUNE_DEPARTMENT}, en région Grand Est. Village alsacien au charme authentique du Sundgau, elle offre à ses habitants un cadre de vie exceptionnel alliant tradition et modernité.</p>
            <p>La commune bénéficie d'une nature préservée avec ses forêts et ses étangs, paradis pour les amoureux de la nature, les randonneurs et les pêcheurs.</p>
            <p>Sa vie associative dynamique et son marché hebdomadaire rythment agréablement la vie locale.</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
            <h3 className="font-bold text-blue-900 mb-3 text-sm">📊 Données clés</h3>
            <dl className="space-y-2 text-sm">
              {[
                ['Population', COMMUNE_POPULATION],
                ['Superficie', COMMUNE_SUPERFICIE],
                ['Altitude', COMMUNE_ALTITUDE],
                ['Département', COMMUNE_DEPARTMENT],
                ['Code postal', '68510'],
                ['Code INSEE', '68143'],
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
      <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-6" aria-labelledby="hist-title">
        <h2 id="hist-title" className="text-xl font-bold text-blue-700 mb-4">📜 Historique</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
            <p>Les premières traces d'occupation de {COMMUNE_SHORT} remontent au Moyen Âge. Le village est mentionné pour la première fois dans des archives médiévales du XIIe siècle.</p>
            <p>Au fil des siècles, la commune a développé une activité agricole importante, avec la pisciculture autour des étangs et l'exploitation forestière.</p>
            <p>Comme toute l'Alsace, {COMMUNE_SHORT} a connu les épreuves des deux guerres mondiales avant de se reconstruire et de s'épanouir dans le respect de ses traditions alsaciennes.</p>
          </div>
          <ol className="relative border-l-2 border-blue-200 ml-4 space-y-4">
            {[
              { year: 'XIIe s.', text: 'Première mention dans les archives médiévales' },
              { year: 'XVe s.', text: 'Construction de l\'église paroissiale' },
              { year: '1648', text: 'Rattachement à la France (Traité de Westphalie)' },
              { year: '1790', text: 'Création de la commune sous la Révolution' },
              { year: '1918', text: 'Retour définitif à la France' },
              { year: '2024', text: 'Modernisation des équipements communaux' },
            ].map(r => (
              <li key={r.year} className="ml-5 text-sm">
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
          {[
            { emoji: '⛪', title: 'Église paroissiale', desc: 'Édifice du XVe siècle, joyau du patrimoine local.', tag: 'Monument' },
            { emoji: '🏡', title: 'Maisons à colombages', desc: 'Architecture alsacienne typique des XVIe–XVIIe siècles.', tag: 'Patrimoine' },
            { emoji: '🏛️', title: 'Mairie historique', desc: 'Bâtiment du XIXe siècle abritant les services communaux.', tag: 'Institutionnel' },
            { emoji: '🧱', title: 'Lavoir communal', desc: 'Lavoir du XVIIIe siècle restauré, témoin de la vie d\'autrefois.', tag: 'Patrimoine' },
            { emoji: '✝️', title: 'Croix de chemin', desc: 'Plusieurs croix jalonnent les routes, témoins de la piété populaire.', tag: 'Patrimoine' },
            { emoji: '🎖️', title: 'Carré militaire', desc: 'Hommage aux soldats tombés lors des deux guerres mondiales.', tag: 'Mémoire' },
          ].map(p => (
            <div key={p.title} className="border border-gray-100 rounded-xl p-4 hover:border-blue-200 transition-colors">
              <span className="text-3xl" aria-hidden="true">{p.emoji}</span>
              <h3 className="font-bold text-gray-900 mt-2 mb-1 text-sm">{p.title}</h3>
              <p className="text-gray-500 text-xs mb-2">{p.desc}</p>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{p.tag}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Étangs & Forêts */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6 mb-6" aria-labelledby="nat-title">
        <h2 id="nat-title" className="text-xl font-bold text-blue-700 mb-4">🌊 Étangs &amp; Forêts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Les étangs communaux</h3>
            <p className="text-gray-600 text-sm mb-3">La commune possède 3 étangs couvrant 8 ha au total. La pêche y est autorisée avec une carte de l'AAPPMA locale.</p>
            <div className="flex gap-2 flex-wrap mb-4">
              {[['Étang des Aulnes', '3,5 ha'], ['Étang du Moulin', '2,8 ha'], ['Grand Étang', '1,7 ha']].map(([n, s]) => (
                <div key={n} className="bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-center text-xs">
                  <div className="font-bold text-blue-800">{n}</div>
                  <div className="text-gray-500">{s}</div>
                </div>
              ))}
            </div>
            <img src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=500&q=80" alt="Étang communal" className="rounded-xl w-full h-40 object-cover" loading="lazy" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">La forêt communale</h3>
            <p className="text-gray-600 text-sm mb-3">230 ha de forêt de chênes et hêtres gérés par l'ONF. Des sentiers balisés permettent des promenades familiales.</p>
            <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-sm text-green-800 mb-4">
              <strong>Sentiers balisés :</strong><br />
              🟡 Sentier du Moulin – 3,5 km – Facile<br />
              🔵 Sentier des Étangs – 6,2 km – Moyen<br />
              🔴 Grande boucle – 12 km – Difficile
            </div>
            <img src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=500&q=80" alt="Forêt communale" className="rounded-xl w-full h-40 object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="bg-white border border-gray-200 rounded-2xl p-6" aria-labelledby="gal-title">
        <h2 id="gal-title" className="text-xl font-bold text-blue-700 mb-4">📸 Galerie photos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&q=70',
            'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=300&q=70',
            'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=300&q=70',
            'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&q=70',
            'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=300&q=70',
            'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&q=70',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=70',
            'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=300&q=70',
          ].map((src, i) => (
            <div key={i} className="aspect-square rounded-xl overflow-hidden">
              <img src={src} alt={`Photo ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
