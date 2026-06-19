import { useState } from 'react';
import { GraduationCap, Heart, ShoppingBag, Pizza, Briefcase, Phone, Mail, Globe, ExternalLink } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import { ASSOCIATIONS_DATA } from '../data';

const SECTIONS = [
  { id: 'ecoles', label: 'Écoles', icon: GraduationCap },
  { id: 'associations', label: 'Associations', icon: Heart },
  { id: 'commerces', label: 'Commerces & Services', icon: ShoppingBag },
];

const COMMERCES = [
  { name: 'Boulangerie-Pâtisserie Muller', type: 'Alimentation', horaires: 'Mar-Sam 6h30–13h / 15h30–19h', phone: '03 88 00 01 01', address: '5 rue de la Mairie' },
  { name: 'Épicerie de la Place', type: 'Alimentation', horaires: 'Lun-Sam 8h–19h, Dim 9h–12h', phone: '03 88 00 01 02', address: '2 place de la Mairie' },
  { name: 'Bar-Restaurant Le Tilleul', type: 'Restauration', horaires: 'Mer-Dim 11h30–14h / 18h30–21h30', phone: '03 88 00 01 03', address: '8 rue principale' },
  { name: 'Salon de coiffure Isabelle', type: 'Services', horaires: 'Mar-Sam 9h–18h', phone: '03 88 00 01 04', address: '12 rue du Moulin' },
  { name: 'Cabinet médical Dr. Schmidt', type: 'Santé', horaires: 'Lun-Ven 8h–12h / 14h–18h', phone: '03 88 00 01 05', address: '3 allée des Tilleuls' },
  { name: 'Pharmacie de Hindlingen', type: 'Santé', horaires: 'Lun-Ven 8h30–19h / Sam 9h–13h', phone: '03 89 25 81 00', address: '7 rue de la Mairie' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Loisirs: 'bg-yellow-100 text-yellow-700',
  Sport: 'bg-green-100 text-green-700',
  École: 'bg-blue-100 text-blue-700',
  Culture: 'bg-purple-100 text-purple-700',
  Seniors: 'bg-orange-100 text-orange-700',
  Sécurité: 'bg-red-100 text-red-700',
};

export default function VieLocale() {
  const [activeSection, setActiveSection] = useState('ecoles');

  return (
    <>
      <PageHeader
        title="Vie Locale"
        subtitle="Tout ce qui fait la richesse et la convivialité de notre commune"
        breadcrumbs={[{ label: 'Vie Locale' }]}
      />

      <div className="bg-white border-b border-gray-200 sticky top-[105px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <nav className="flex gap-0 min-w-max" aria-label="Sections vie locale" role="tablist">
            {SECTIONS.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  role="tab"
                  aria-selected={activeSection === s.id}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeSection === s.id
                      ? 'border-blue-700 text-blue-700'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={15} aria-hidden="true" />
                  {s.label}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Écoles */}
        {activeSection === 'ecoles' && (
          <div id="ecoles">
            <SectionTitle title="Établissements scolaires" subtitle="L'éducation au cœur de notre commune" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              {/* École primaire */}
              <div className="card p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <GraduationCap size={24} className="text-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">École Primaire Publique</h3>
                    <p className="text-blue-700 text-sm font-medium">Maternelle & Élémentaire</p>
                  </div>
                </div>
                <dl className="space-y-2 text-sm text-gray-600">
                  <div className="flex gap-2">
                    <dt className="font-medium w-24 flex-shrink-0">Adresse</dt>
                    <dd>15 rue de l'École, 68510 Hindlingen</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium w-24 flex-shrink-0">Téléphone</dt>
                    <dd><a href="tel:0388000200" className="text-blue-600 hover:underline">03 88 00 02 00</a></dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium w-24 flex-shrink-0">Email</dt>
                    <dd><a href="mailto:ecole@hindlingen.fr" className="text-blue-600 hover:underline">ecole@hindlingen.fr</a></dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium w-24 flex-shrink-0">Effectif</dt>
                    <dd>~120 élèves répartis en 5 classes</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-medium w-24 flex-shrink-0">Horaires</dt>
                    <dd>Lun, Mar, Jeu, Ven : 8h30–11h30 / 13h30–16h30<br />Mercredi : 8h30–11h30</dd>
                  </div>
                </dl>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100">
                  🍽️ <strong>Restauration scolaire</strong> assurée du lundi au vendredi. Inscription en mairie.
                </div>
              </div>

              {/* Infos scolaires */}
              <div className="space-y-4">
                <div className="card p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Périscolaire &amp; garderie</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold mt-0.5">•</span>
                      <span><strong>Garderie du matin</strong> : 7h30–8h30, sur inscription</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold mt-0.5">•</span>
                      <span><strong>Accueil du soir</strong> : 16h30–18h30, du lundi au vendredi</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-500 font-bold mt-0.5">•</span>
                      <span><strong>Centre de loisirs</strong> : pendant les vacances scolaires</span>
                    </li>
                  </ul>
                </div>
                <div className="card p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Collège & Lycée</h3>
                  <p className="text-sm text-gray-600 mb-3">La commune est rattachée au secteur scolaire de la communauté de communes. Des transports scolaires sont organisés.</p>
                  <ul className="space-y-1.5 text-sm text-gray-600">
                    <li><strong>Collège :</strong> Collège Marcel-Pagnol – 5 km</li>
                    <li><strong>Lycée :</strong> Lycée général de la ville voisine – 15 km</li>
                    <li><strong>Transport :</strong> Car scolaire, contact mairie</li>
                  </ul>
                </div>
                <div className="card p-5">
                  <h3 className="font-bold text-gray-900 mb-3">Inscriptions scolaires</h3>
                  <p className="text-sm text-gray-600">
                    L'inscription à l'école se fait en mairie sur présentation du livret de famille, d'un justificatif de domicile et du carnet de santé.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Associations */}
        {activeSection === 'associations' && (
          <div id="associations">
            <SectionTitle title="Associations" subtitle="La vie associative de Hindlingen" />
            <p className="text-gray-600 mb-6">
              Notre commune compte de nombreuses associations actives qui animent la vie locale tout au long de l'année.
              Rejoignez-les !
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {ASSOCIATIONS_DATA.map((a) => (
                <article key={a.id} className="card p-5 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-gray-900">{a.name}</h3>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ml-2 ${CATEGORY_COLORS[a.category] ?? 'bg-gray-100 text-gray-600'}`}>
                      {a.category}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm flex-1 mb-3">{a.description}</p>
                  {a.email && (
                    <a href={`mailto:${a.email}`} className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
                      <Mail size={13} aria-hidden="true" />
                      {a.email}
                    </a>
                  )}
                  {a.contact && (
                    <p className="text-xs text-gray-400 mt-1">{a.contact}</p>
                  )}
                </article>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-center">
              <Heart size={24} className="text-blue-700 mx-auto mb-2" aria-hidden="true" />
              <h3 className="font-bold text-blue-900 mb-1">Créer une association ?</h3>
              <p className="text-blue-700 text-sm">
                La mairie peut vous accompagner dans la création de votre association.{' '}
                <a href="/contact" className="underline font-medium">Contactez-nous</a>.
              </p>
            </div>
          </div>
        )}

        {/* Commerces */}
        {activeSection === 'commerces' && (
          <div id="commerces">
            <SectionTitle title="Commerces &amp; Services" subtitle="Les acteurs de la vie économique locale" />

            {/* Marché */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-4 items-start">
              <div className="text-4xl" aria-hidden="true">🛒</div>
              <div>
                <h3 className="font-bold text-amber-900 text-lg mb-1">Marché communal</h3>
                <p className="text-amber-800 text-sm mb-2">
                  Le marché de producteurs locaux se tient <strong>chaque samedi matin de 9h à 13h</strong> sur 
                  la Place de la Mairie. Fruits, légumes, fromages, charcuteries et spécialités alsaciennes.
                </p>
                <p className="text-amber-700 text-sm">Producteurs locaux · Agriculture raisonnée · Circuit court</p>
              </div>
            </div>

            {/* Camion à pizzas */}
            <div className="bg-red-50 border border-red-100 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row gap-4 items-start">
              <div className="text-4xl" aria-hidden="true">🍕</div>
              <div>
                <h3 className="font-bold text-red-900 text-lg mb-1">Camion à pizzas – Chez Mario</h3>
                <p className="text-red-800 text-sm mb-1">
                  Le camion à pizzas de Mario s'installe <strong>chaque vendredi soir de 18h à 21h</strong> 
                  sur le parking de la salle des fêtes.
                </p>
                <p className="text-red-700 text-sm font-medium">📞 06 00 00 00 00 – Commandes acceptées à l'avance</p>
              </div>
            </div>

            {/* Commerces list */}
            <h3 className="font-bold text-gray-900 text-lg mb-4">Annuaire des commerces</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {COMMERCES.map((c) => (
                <article key={c.name} className="card p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-gray-900">{c.name}</h4>
                    <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex-shrink-0 ml-2">{c.type}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-1">{c.address}</p>
                  <p className="text-xs text-gray-500 mb-2">{c.horaires}</p>
                  {c.phone && (
                    <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-sm text-blue-600 hover:underline">
                      <Phone size={13} aria-hidden="true" />
                      {c.phone}
                    </a>
                  )}
                </article>
              ))}
            </div>

            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
              <Briefcase size={24} className="text-gray-400 mx-auto mb-2" aria-hidden="true" />
              <h3 className="font-semibold text-gray-700 mb-1">Vous êtes commerçant ou artisan ?</h3>
              <p className="text-gray-500 text-sm">
                Faites référencer votre activité sur ce site.{' '}
                <a href="/contact" className="text-blue-600 underline">Contactez la mairie</a>.
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
