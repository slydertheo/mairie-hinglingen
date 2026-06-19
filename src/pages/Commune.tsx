import { useState } from 'react';
import { Trees, History, Landmark, Camera, Users, MapPin, Calendar } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import { COMMUNE_SHORT, COMMUNE_POPULATION, COMMUNE_SUPERFICIE, COMMUNE_ALTITUDE, COMMUNE_DEPARTMENT } from '../data';

const GALLERY_IMAGES = [
  { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', alt: 'Maisons alsaciennes à colombages' },
  { src: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80', alt: 'Étang communal' },
  { src: 'https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=600&q=80', alt: 'Rivière et nature' },
  { src: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80', alt: 'Forêt de la commune' },
  { src: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&q=80', alt: 'Panorama de la commune' },
  { src: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80', alt: 'Bâtiment municipal' },
  { src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', alt: 'Paysage alsacien' },
  { src: 'https://images.unsplash.com/photo-1519750157634-b6d493a0f77c?w=600&q=80', alt: 'Espace de jeux' },
];

const TABS = [
  { id: 'presentation', label: 'Présentation', icon: MapPin },
  { id: 'historique', label: 'Historique', icon: History },
  { id: 'patrimoine', label: 'Patrimoine', icon: Landmark },
  { id: 'etangs-forets', label: 'Étangs & Forêts', icon: Trees },
  { id: 'galerie', label: 'Galerie photos', icon: Camera },
];

export default function Commune() {
  const [activeTab, setActiveTab] = useState('presentation');
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        title="La Commune"
        subtitle={`Découvrez ${COMMUNE_SHORT}, son histoire, son patrimoine et ses espaces naturels`}
        breadcrumbs={[{ label: 'La Commune' }]}
        image="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80"
      />

      {/* Tab navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-[105px] z-30" aria-label="Sections de la page La Commune">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <div className="flex gap-0 min-w-max">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-blue-700 text-blue-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  aria-selected={activeTab === tab.id}
                  aria-controls={`tab-${tab.id}`}
                  role="tab"
                >
                  <Icon size={15} aria-hidden="true" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Présentation */}
        {activeTab === 'presentation' && (
          <div id="tab-presentation" role="tabpanel" aria-labelledby="tab-btn-presentation">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <SectionTitle title={`Présentation de ${COMMUNE_SHORT}`} />
                <div className="prose prose-blue max-w-none text-gray-600 space-y-4">
                  <p className="text-lg leading-relaxed">
                    {COMMUNE_SHORT} est une commune française située dans le département du {COMMUNE_DEPARTMENT}, 
                    en région Grand Est. Village alsacien au charme authentique, elle offre à ses habitants un 
                    cadre de vie exceptionnel, alliant tradition et modernité.
                  </p>
                  <p className="leading-relaxed">
                    Avec ses {COMMUNE_POPULATION}, {COMMUNE_SHORT} est une petite commune qui sait préserver 
                    son identité tout en se tournant vers l'avenir. La vie associative y est particulièrement 
                    dynamique, offrant de nombreuses activités pour tous les âges.
                  </p>
                  <p className="leading-relaxed">
                    La commune est dotée d'équipements de qualité : une école primaire, une salle des fêtes, 
                    des terrains de sport, des aires de jeux pour enfants et un réseau de chemins de randonnée. 
                    Le marché local, qui se tient chaque semaine, est un moment de convivialité très apprécié des habitants.
                  </p>
                </div>
              </div>
              <div>
                <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                  <h3 className="font-bold text-blue-900 mb-5">Données générales</h3>
                  <dl className="space-y-3">
                    {[
                      { label: 'Population', value: COMMUNE_POPULATION, icon: Users },
                      { label: 'Superficie', value: COMMUNE_SUPERFICIE, icon: MapPin },
                      { label: 'Altitude', value: COMMUNE_ALTITUDE, icon: MapPin },
                      { label: 'Département', value: COMMUNE_DEPARTMENT, icon: MapPin },
                      { label: 'Région', value: 'Grand Est', icon: MapPin },
                      { label: 'Code INSEE', value: '68143', icon: MapPin },
                    ].map((item) => {
                      const Icon = item.icon;
                      return (
                        <div key={item.label} className="flex items-center gap-3">
                          <div className="w-7 h-7 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                            <Icon size={12} className="text-blue-600" aria-hidden="true" />
                          </div>
                          <div className="flex-1 flex justify-between">
                            <dt className="text-sm text-gray-500">{item.label}</dt>
                            <dd className="text-sm font-semibold text-blue-900">{item.value}</dd>
                          </div>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Historique */}
        {activeTab === 'historique' && (
          <div id="tab-historique" role="tabpanel">
            <SectionTitle title="Histoire de la commune" subtitle="Des origines à aujourd'hui" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  Les premières traces d'occupation remontent au Néolithique. Des vestiges gallo-romains 
                  témoignent d'une présence continue dans la région. Le village est mentionné pour la 
                  première fois dans des archives médiévales du XIIe siècle.
                </p>
                <p className="leading-relaxed">
                  Au Moyen Âge, {COMMUNE_SHORT} dépendait de la seigneurie locale. L'église paroissiale, 
                  dédiée à saint Martin de Tours, fut construite au XVe siècle et demeure aujourd'hui 
                  le principal monument historique de la commune.
                </p>
                <p className="leading-relaxed">
                  Le rattachement définitif à la France en 1648 (Traité de Westphalie) marque un tournant 
                  dans l'histoire de la région. La commune a conservé tout au long des siècles ses traditions 
                  et son dialecte alsacien.
                </p>
                <p className="leading-relaxed">
                  Comme toute l'Alsace, {COMMUNE_SHORT} a connu les épreuves des deux guerres mondiales. 
                  Après la Seconde Guerre mondiale, la commune s'est reconstruite et modernisée, tout en 
                  préservant son identité culturelle et architecturale.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                  <Calendar size={18} aria-hidden="true" />
                  Chronologie
                </h3>
                <ol className="relative border-l-2 border-blue-200 ml-4 space-y-6">
                  {[
                    { year: 'Ve siècle', text: 'Premières traces d\'occupation germaniques dans la région' },
                    { year: 'XIIe s.', text: `Première mention écrite de ${COMMUNE_SHORT} dans des chartes ecclésiastiques` },
                    { year: 'XVe s.', text: 'Construction de l\'\u00e9glise paroissiale, joyau du patrimoine local' },
                    { year: '1648', text: 'Rattachement à la France par le Traité de Westphalie' },
                    { year: '1790', text: 'Création de la commune sous la Révolution française' },
                    { year: '1870', text: 'Annexion par l\'Empire allemand suite à la guerre franco-prussienne' },
                    { year: '1918', text: 'Retour à la France après l\'Armistice' },
                    { year: '1944', text: 'Libération de la commune par les forces alliées' },
                    { year: '2024', text: 'Modernisation des équipements et inauguration de la nouvelle salle des fêtes' },
                  ].map((item) => (
                    <li key={item.year} className="ml-6">
                      <span className="absolute -left-2.5 w-5 h-5 bg-blue-600 border-2 border-white rounded-full" aria-hidden="true" />
                      <time className="text-sm font-bold text-blue-700">{item.year}</time>
                      <p className="text-gray-600 text-sm mt-0.5">{item.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Patrimoine */}
        {activeTab === 'patrimoine' && (
          <div id="tab-patrimoine" role="tabpanel">
            <SectionTitle title="Patrimoine" subtitle="Trésors architecturaux et culturels" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Église paroissiale de Hindlingen',
                  desc: 'Église gothique du XVe siècle, classée Monument Historique. Son clocher à bulbe est visible à des kilomètres à la ronde.',
                  tag: 'Monument classé',
                  img: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80',
                },
                {
                  title: 'Maisons alsaciennes',
                  desc: 'Nombreuses maisons à colombages des XVIe et XVIIe siècles, typiques de l\'architecture alsacienne traditionnelle.',
                  tag: 'Patrimoine vernaculaire',
                  img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
                },
                {
                  title: 'La Mairie',
                  desc: 'Bâtiment du XIXe siècle qui abrite les services administratifs. Façade classique avec perron et horloge.',
                  tag: 'Bâtiment public',
                  img: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&q=80',
                },
                {
                  title: 'Lavoir communal',
                  desc: 'Lavoir du XVIIIe siècle restauré en 2010, témoignage de la vie quotidienne d\'antan, en plein cœur du village.',
                  tag: 'Petit patrimoine',
                  img: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80',
                },
                {
                  title: 'Croix de chemin',
                  desc: 'Plusieurs croix de chemin jalonnent les routes de la commune, témoignages de la piété populaire alsacienne.',
                  tag: 'Petit patrimoine',
                  img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
                },
                {
                  title: 'Cimetière militaire',
                  desc: 'Carré militaire en hommage aux soldats tombés lors des deux guerres mondiales, entretenu par la commune.',
                  tag: 'Mémoire',
                  img: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80',
                },
              ].map((p) => (
                <article key={p.title} className="card group">
                  <div className="h-44 overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">{p.tag}</span>
                    <h3 className="font-bold text-gray-900 mt-2 mb-1">{p.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Étangs & Forêts */}
        {activeTab === 'etangs-forets' && (
          <div id="tab-etangs-forets" role="tabpanel">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <SectionTitle title="Étangs communaux" />
                <p className="text-gray-600 leading-relaxed mb-4">
                  La commune possède trois étangs alimentés par la nappe phréatique et le ruisseau du Mühlenbach.
                  Ces plans d'eau sont classés en première catégorie piscicole.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  La pêche est autorisée avec une carte de l'Association agréée de pêche et de protection 
                  du milieu aquatique (AAPPMA) locale. Les espèces présentes incluent carpes, brochets, 
                  perches, tanches et brèmes.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {[
                    { label: 'Étang des Aulnes', surface: '3,5 ha' },
                    { label: 'Étang du Moulin', surface: '2,8 ha' },
                    { label: 'Grand Étang', surface: '1,7 ha' },
                  ].map((e) => (
                    <div key={e.label} className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                      <div className="font-bold text-blue-800 text-sm">{e.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{e.surface}</div>
                    </div>
                  ))}
                </div>
                <img
                  src="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=600&q=80"
                  alt="Les étangs de la commune"
                  className="rounded-xl w-full h-48 object-cover shadow"
                  loading="lazy"
                />
              </div>
              <div>
                <SectionTitle title="Forêt communale" />
                <p className="text-gray-600 leading-relaxed mb-4">
                  La forêt communale s'étend sur 230 hectares et est gérée par l'Office National des Forêts 
                  (ONF) en partenariat avec la commune. Elle constitue un patrimoine naturel exceptionnel 
                  pour les habitants.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Des sentiers de randonnée balisés permettent de parcourir la forêt en toute sécurité.
                  La cueillette de champignons est autorisée dans la limite de 5 kg par personne.
                </p>
                <div className="bg-green-50 rounded-xl p-4 border border-green-100 mb-4">
                  <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                    <Trees size={16} aria-hidden="true" />
                    Sentiers balisés
                  </h3>
                  <ul className="space-y-1.5 text-sm text-green-700">
                    <li>🟡 Sentier du Moulin – 3,5 km – Facile</li>
                    <li>🔵 Sentier des Étangs – 6,2 km – Moyen</li>
                    <li>🔴 Grande boucle forestière – 12 km – Difficile</li>
                  </ul>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&q=80"
                  alt="La forêt communale"
                  className="rounded-xl w-full h-48 object-cover shadow"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        )}

        {/* Galerie */}
        {activeTab === 'galerie' && (
          <div id="tab-galerie" role="tabpanel">
            <SectionTitle title="Galerie photos" subtitle="Images de notre belle commune" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {GALLERY_IMAGES.map((img, i) => (
                <button
                  key={i}
                  className="relative overflow-hidden rounded-xl aspect-square group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  onClick={() => setLightboxImg(img.src)}
                  aria-label={`Agrandir : ${img.alt}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/30 transition-colors flex items-center justify-center">
                    <Camera size={24} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Visionneuse photo"
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 text-3xl font-bold"
            onClick={() => setLightboxImg(null)}
            aria-label="Fermer la visionneuse"
          >
            ×
          </button>
          <img
            src={lightboxImg}
            alt="Photo agrandie"
            className="max-w-full max-h-[90vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
