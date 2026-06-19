import { useState } from 'react';
import {
  Heart, Users, Vote, Building2, Globe, Download,
  ExternalLink, ChevronDown, ChevronUp, FileText, CheckCircle,
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import { DOCUMENTS_DATA } from '../data';

interface DemarcheItem {
  id: string;
  icon: React.ElementType;
  title: string;
  color: string;
  content: React.ReactNode;
}

const DEMARCHES: DemarcheItem[] = [
  {
    id: 'etat-civil',
    icon: Heart,
    title: 'État civil & Mariage',
    color: 'text-pink-600 bg-pink-50',
    content: (
      <div className="space-y-4 text-gray-600">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Déclaration de naissance</h4>
          <p className="text-sm leading-relaxed">La déclaration de naissance doit être faite dans les 5 jours suivant la naissance, à la mairie du lieu de naissance. Pièces à fournir : certificat d'accouchement, pièce d'identité des parents, livret de famille si existant.</p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Mariage civil</h4>
          <p className="text-sm leading-relaxed mb-3">Le mariage civil est célébré à la mairie de la commune où l'un des futurs époux a sa résidence. Constituer le dossier au moins 2 mois avant la date souhaitée.</p>
          <ul className="text-sm space-y-1 list-disc list-inside text-gray-500">
            <li>Pièce d'identité valide des deux époux</li>
            <li>Justificatif de domicile de moins de 3 mois</li>
            <li>Acte de naissance de moins de 3 mois</li>
            <li>Informations sur les témoins (2 minimum, 4 maximum)</li>
            <li>Contrat de mariage si établi (certificat notarial)</li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Copies d'actes</h4>
          <p className="text-sm leading-relaxed">Vous pouvez demander une copie intégrale ou un extrait d'acte de naissance, mariage ou décès par courrier, sur place ou via service-public.fr.</p>
        </div>
        <a
          href="https://www.service-public.fr/particuliers/vosdroits/N355"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex text-sm"
        >
          Plus d'informations sur Service-Public.fr <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    ),
  },
  {
    id: 'pacs',
    icon: Users,
    title: 'PACS',
    color: 'text-purple-600 bg-purple-50',
    content: (
      <div className="space-y-4 text-gray-600">
        <p className="text-sm leading-relaxed">Le PACS (Pacte Civil de Solidarité) peut être enregistré en mairie depuis novembre 2017. Prenez rendez-vous à la mairie pour déposer votre dossier.</p>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Pièces à fournir</h4>
          <ul className="text-sm space-y-1 list-disc list-inside text-gray-500">
            <li>Convention de PACS (cerfa n°15726*02) complétée et signée</li>
            <li>Déclaration conjointe de PACS (cerfa n°15725*02)</li>
            <li>Acte de naissance de moins de 3 mois</li>
            <li>Pièce d'identité valide</li>
          </ul>
        </div>
        <a
          href="https://www.service-public.fr/particuliers/vosdroits/N144"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex text-sm"
        >
          Formulaires PACS sur Service-Public.fr <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    ),
  },
  {
    id: 'elections',
    icon: Vote,
    title: 'Élections',
    color: 'text-blue-600 bg-blue-50',
    content: (
      <div className="space-y-4 text-gray-600">
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Inscription sur les listes électorales</h4>
          <p className="text-sm leading-relaxed mb-3">Pour voter, vous devez être inscrit(e) sur les listes électorales de votre commune de résidence. L'inscription peut se faire en ligne, par courrier ou en mairie.</p>
          <div className="bg-blue-50 rounded-lg p-3 text-sm text-blue-800 border border-blue-100">
            📅 <strong>Date limite :</strong> 5 semaines avant le scrutin pour une inscription en ligne ou par courrier. Jusqu'au 6ème vendredi avant le scrutin en mairie.
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Procuration de vote</h4>
          <p className="text-sm leading-relaxed">Si vous ne pouvez pas voter le jour du scrutin, vous pouvez donner procuration à un électeur inscrit dans la même commune.</p>
        </div>
        <a
          href="https://www.service-public.fr/particuliers/vosdroits/N47"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex text-sm"
        >
          Élections sur Service-Public.fr <ExternalLink size={14} aria-hidden="true" />
        </a>
      </div>
    ),
  },
  {
    id: 'urbanisme',
    icon: Building2,
    title: 'Urbanisme & PLU',
    color: 'text-green-600 bg-green-50',
    content: (
      <div className="space-y-4 text-gray-600">
        <p className="text-sm leading-relaxed">Tout projet de construction, extension ou modification de l'aspect extérieur d'un bâtiment nécessite une autorisation préalable. Consultez notre service urbanisme en mairie.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'Permis de construire', desc: 'Pour toute construction de plus de 20m²' },
            { title: 'Déclaration préalable', desc: 'Pour les petits travaux (< 20m²)' },
            { title: 'Permis de démolir', desc: 'Pour la démolition d\'une construction' },
            { title: 'Certificat d\'urbanisme', desc: 'Pour connaître les règles applicables' },
          ].map((item) => (
            <div key={item.title} className="bg-green-50 rounded-lg p-3 border border-green-100">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle size={13} className="text-green-600" aria-hidden="true" />
                <span className="font-medium text-green-900 text-sm">{item.title}</span>
              </div>
              <p className="text-xs text-green-700">{item.desc}</p>
            </div>
          ))}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-2">Plan Local d'Urbanisme (PLU)</h4>
          <p className="text-sm leading-relaxed mb-3">Le PLU définit les règles d'urbanisme applicables sur le territoire communal. Vous pouvez le consulter en mairie ou télécharger les documents ci-dessous.</p>
          <div className="flex flex-wrap gap-2">
            {DOCUMENTS_DATA.filter(d => d.category === 'Urbanisme').map(doc => (
              <a key={doc.id} href={doc.fileUrl} className="flex items-center gap-1.5 text-sm bg-white border border-green-200 text-green-700 hover:bg-green-50 px-3 py-1.5 rounded-lg transition-colors">
                <Download size={12} aria-hidden="true" />
                {doc.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'en-ligne',
    icon: Globe,
    title: 'Démarches en ligne',
    color: 'text-teal-600 bg-teal-50',
    content: (
      <div className="space-y-4 text-gray-600">
        <p className="text-sm leading-relaxed">De nombreuses démarches administratives peuvent être effectuées en ligne. Voici les principaux portails officiels.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: 'Service-Public.fr', desc: 'Toutes les démarches administratives', url: 'https://www.service-public.fr', color: 'blue' },
            { name: 'impots.gouv.fr', desc: 'Impôts et déclarations fiscales', url: 'https://www.impots.gouv.fr', color: 'green' },
            { name: 'ameli.fr', desc: 'Assurance maladie et remboursements', url: 'https://www.ameli.fr', color: 'teal' },
            { name: 'caf.fr', desc: 'Allocations familiales (CAF)', url: 'https://www.caf.fr', color: 'orange' },
            { name: 'Préfecture 68', desc: 'Titres d\'identité, cartes grises', url: 'https://www.haut-rhin.gouv.fr', color: 'purple' },
            { name: 'Mairie en ligne', desc: 'Demandes de documents en mairie', url: '#', color: 'pink' },
          ].map((l) => (
            <a
              key={l.name}
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-200 hover:shadow-sm transition-all group"
            >
              <div>
                <div className="font-medium text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{l.name}</div>
                <div className="text-xs text-gray-400">{l.desc}</div>
              </div>
              <ExternalLink size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'documents',
    icon: FileText,
    title: 'Documents PDF',
    color: 'text-red-600 bg-red-50',
    content: (
      <div>
        <p className="text-sm text-gray-600 mb-5">Téléchargez gratuitement les formulaires et documents administratifs de la commune.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DOCUMENTS_DATA.filter(d => d.category === 'Formulaire').map((doc) => (
            <a
              key={doc.id}
              href={doc.fileUrl}
              className="card p-4 flex gap-3 hover:border-red-200 hover:shadow-md transition-all group"
              aria-label={`Télécharger : ${doc.title}`}
            >
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <FileText size={20} className="text-red-600" aria-hidden="true" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{doc.title}</div>
                <div className="text-xs text-gray-400 mt-0.5">{doc.size}</div>
                <div className="flex items-center gap-1 text-xs text-blue-600 mt-1.5">
                  <Download size={11} aria-hidden="true" />
                  Télécharger
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    ),
  },
];

export default function DemarchesAdmin() {
  const [expanded, setExpanded] = useState<string | null>('etat-civil');

  return (
    <>
      <PageHeader
        title="Démarches Administratives"
        subtitle="Retrouvez toutes les informations pour vos démarches auprès de la mairie"
        breadcrumbs={[{ label: 'Démarches Administratives' }]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-8">
          <h2 className="font-bold text-blue-900 mb-1">Besoin d'aide ?</h2>
          <p className="text-blue-700 text-sm">
            Nos agents municipaux sont à votre disposition aux heures d'ouverture pour vous accompagner dans vos démarches.
            N'hésitez pas à nous appeler au <a href="tel:0388000000" className="font-bold underline">03 88 00 00 00</a>.
          </p>
        </div>

        <div className="space-y-3">
          {DEMARCHES.map((d) => {
            const Icon = d.icon;
            const isOpen = expanded === d.id;
            return (
              <div key={d.id} id={d.id} className="card overflow-hidden scroll-mt-32">
                <button
                  className="w-full flex items-center gap-4 p-5 text-left hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(isOpen ? null : d.id)}
                  aria-expanded={isOpen}
                  aria-controls={`content-${d.id}`}
                >
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${d.color}`}>
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <span className="flex-1 font-bold text-gray-900 text-left">{d.title}</span>
                  {isOpen
                    ? <ChevronUp size={18} className="text-blue-700 flex-shrink-0" />
                    : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />}
                </button>
                {isOpen && (
                  <div id={`content-${d.id}`} className="border-t border-gray-100 p-5 bg-white">
                    {d.content}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-3">Services préfectoraux</h3>
          <p className="text-gray-600 text-sm mb-4">
            Certaines démarches relèvent directement de la Préfecture ou des services de l'État.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Carte d\'identité & Passeport', url: 'https://www.service-public.fr/particuliers/vosdroits/N360' },
              { label: 'Carte grise (immatriculation)', url: 'https://immatriculation.ants.gouv.fr' },
              { label: 'Permis de conduire', url: 'https://permisdeconduire.ants.gouv.fr' },
              { label: 'Préfecture du Haut-Rhin', url: 'https://www.haut-rhin.gouv.fr' },
            ].map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm bg-white border border-gray-200 text-gray-700 hover:text-blue-700 hover:border-blue-200 px-3 py-2 rounded-lg transition-colors"
              >
                <ExternalLink size={12} aria-hidden="true" />
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
