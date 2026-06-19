import { useState } from 'react';
import { Users, FileText, Download, ChevronDown, ChevronUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import { COUNCIL_MEMBERS, DOCUMENTS_DATA } from '../data';

const SECTIONS = [
  { id: 'conseil', label: 'Conseil municipal' },
  { id: 'commissions', label: 'Commissions' },
  { id: 'bulletins', label: 'Bulletins municipaux' },
  { id: 'deliberations', label: 'Délibérations' },
  { id: 'comptes-rendus', label: 'Comptes rendus' },
  { id: 'affichage', label: 'Tableau d\'affichage' },
];

const COMMISSIONS = [
  {
    name: 'Commission Travaux & Voirie',
    president: 'Bernard Kieffer',
    members: ['Robert Bauer', 'François Weber', 'Alain Meyer'],
    desc: 'Gestion des travaux d\'infrastructure, de la voirie communale et des bâtiments publics.',
  },
  {
    name: 'Commission Finances',
    president: 'Jean-Pierre Muller',
    members: ['Isabelle Jung', 'Nathalie Klein'],
    desc: 'Suivi du budget communal, des finances et de la fiscalité locale.',
  },
  {
    name: 'Commission Éducation & Culture',
    president: 'Marie Schmitt',
    members: ['Sophie Roth', 'Claire Hoffmann'],
    desc: 'Accompagnement de la vie scolaire et des activités culturelles de la commune.',
  },
  {
    name: 'Commission Environnement',
    president: 'Bernard Kieffer',
    members: ['Patrick Vogel', 'Alain Meyer'],
    desc: 'Protection de l\'environnement, gestion des espaces verts et de la forêt communale.',
  },
  {
    name: 'Commission Urbanisme',
    president: 'François Weber',
    members: ['Jean-Pierre Muller', 'Robert Bauer'],
    desc: 'Instruction des demandes d\'urbanisme et suivi de l\'évolution du PLU.',
  },
];

const DELIBERATIONS = [
  { ref: 'D-2025-12-01', date: '16/12/2025', objet: 'Approbation du budget primitif 2026', vote: 'Adopté (9 pour, 1 contre, 1 abstention)' },
  { ref: 'D-2025-12-02', date: '16/12/2025', objet: 'Autorisation de la signature d\'une convention avec la CC', vote: 'Adopté à l\'unanimité' },
  { ref: 'D-2025-11-01', date: '18/11/2025', objet: 'Tarifs des services communaux 2026', vote: 'Adopté (10 pour, 1 abstention)' },
  { ref: 'D-2025-11-02', date: '18/11/2025', objet: 'Devis travaux réfection de la rue principale', vote: 'Adopté à l\'unanimité' },
  { ref: 'D-2025-10-01', date: '21/10/2025', objet: 'Cession de terrain communal', vote: 'Adopté (8 pour, 2 contre, 1 abstention)' },
];

export default function VieMunicipale() {
  const [activeSection, setActiveSection] = useState('conseil');
  const [expandedComm, setExpandedComm] = useState<string | null>(null);

  const bulletins = DOCUMENTS_DATA.filter(d => d.category === 'Bulletin');
  const comptes = DOCUMENTS_DATA.filter(d => d.category === 'Compte rendu');

  return (
    <>
      <PageHeader
        title="Vie Municipale"
        subtitle="Transparence, démocratie locale et service aux habitants"
        breadcrumbs={[{ label: 'Vie Municipale' }]}
      />

      <div className="bg-white border-b border-gray-200 sticky top-[105px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-x-auto">
          <nav className="flex gap-0 min-w-max" aria-label="Sections vie municipale" role="tablist">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                role="tab"
                aria-selected={activeSection === s.id}
                className={`px-5 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeSection === s.id
                    ? 'border-blue-700 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {s.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Conseil municipal */}
        {activeSection === 'conseil' && (
          <div>
            <SectionTitle title="Conseil Municipal" subtitle="Composition de l'équipe municipale 2020–2026" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {COUNCIL_MEMBERS.map((m) => (
                <article key={m.id} className={`card p-4 flex items-center gap-4 ${m.role === 'Maire' ? 'border-blue-200 bg-blue-50' : ''}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${m.role === 'Maire' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700'}`}>
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{m.name}</div>
                    <div className={`text-sm font-medium ${m.role === 'Maire' ? 'text-blue-700' : 'text-gray-500'}`}>{m.role}</div>
                    {m.commission && <div className="text-xs text-gray-400 mt-0.5">{m.commission}</div>}
                  </div>
                </article>
              ))}
            </div>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                <Users size={16} aria-hidden="true" />
                Prochaine séance publique
              </h3>
              <p className="text-gray-600 text-sm">
                Le prochain conseil municipal se réunira le <strong>mardi 3 février 2026 à 20h00</strong>, 
                en séance publique à la Mairie (salle du Conseil). Tous les habitants sont les bienvenus.
              </p>
            </div>
          </div>
        )}

        {/* Commissions */}
        {activeSection === 'commissions' && (
          <div>
            <SectionTitle title="Commissions municipales" subtitle="Groupes de travail thématiques" />
            <div className="space-y-4">
              {COMMISSIONS.map((c) => (
                <div key={c.name} className="card overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => setExpandedComm(expandedComm === c.name ? null : c.name)}
                    aria-expanded={expandedComm === c.name}
                  >
                    <div>
                      <h3 className="font-bold text-gray-900">{c.name}</h3>
                      <p className="text-sm text-gray-500 mt-0.5">Présidée par {c.president}</p>
                    </div>
                    {expandedComm === c.name
                      ? <ChevronUp size={18} className="text-blue-700 flex-shrink-0" />
                      : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />}
                  </button>
                  {expandedComm === c.name && (
                    <div className="border-t border-gray-100 p-5 bg-gray-50">
                      <p className="text-gray-600 text-sm mb-3">{c.desc}</p>
                      <div>
                        <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Membres</span>
                        <ul className="flex flex-wrap gap-2 mt-2">
                          <li className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{c.president} (Président·e)</li>
                          {c.members.map((m) => (
                            <li key={m} className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{m}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bulletins */}
        {activeSection === 'bulletins' && (
          <div>
            <SectionTitle title="Bulletins municipaux" subtitle="Téléchargez nos publications" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bulletins.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.fileUrl}
                  className="card p-4 flex gap-3 hover:border-blue-200 hover:shadow-md transition-all group"
                  aria-label={`Télécharger : ${doc.title} (${doc.size})`}
                >
                  <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-red-100 transition-colors">
                    <FileText size={20} className="text-red-600" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{doc.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{doc.date} · {doc.size}</div>
                    <div className="flex items-center gap-1 text-xs text-blue-600 mt-1.5">
                      <Download size={11} aria-hidden="true" />
                      Télécharger le PDF
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Délibérations */}
        {activeSection === 'deliberations' && (
          <div>
            <SectionTitle title="Délibérations du Conseil" subtitle="Décisions prises en séance" />
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th scope="col" className="px-5 py-3 text-left font-semibold text-gray-700">Référence</th>
                    <th scope="col" className="px-5 py-3 text-left font-semibold text-gray-700">Date</th>
                    <th scope="col" className="px-5 py-3 text-left font-semibold text-gray-700">Objet</th>
                    <th scope="col" className="px-5 py-3 text-left font-semibold text-gray-700">Vote</th>
                    <th scope="col" className="px-5 py-3 text-left font-semibold text-gray-700">PDF</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {DELIBERATIONS.map((d) => (
                    <tr key={d.ref} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3 font-mono text-xs text-gray-500">{d.ref}</td>
                      <td className="px-5 py-3 text-gray-600 whitespace-nowrap">{d.date}</td>
                      <td className="px-5 py-3 text-gray-900">{d.objet}</td>
                      <td className="px-5 py-3 text-gray-500 text-xs">{d.vote}</td>
                      <td className="px-5 py-3">
                        <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs">
                          <Download size={12} aria-hidden="true" />
                          PDF
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Comptes rendus */}
        {activeSection === 'comptes-rendus' && (
          <div>
            <SectionTitle title="Comptes rendus des séances" subtitle="Procès-verbaux du Conseil Municipal" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comptes.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.fileUrl}
                  className="card p-4 flex gap-3 hover:border-blue-200 hover:shadow-md transition-all group"
                  aria-label={`Télécharger : ${doc.title} (${doc.size})`}
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText size={20} className="text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">{doc.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{doc.date} · {doc.size}</div>
                    <div className="flex items-center gap-1 text-xs text-blue-600 mt-1.5">
                      <Download size={11} aria-hidden="true" />
                      Télécharger le PDF
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tableau d'affichage */}
        {activeSection === 'affichage' && (
          <div>
            <SectionTitle title="Tableau d'affichage communal" subtitle="Avis officiels et informations légales" />
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 mb-6">
              <p className="text-amber-800 text-sm">
                ℹ️ Ce tableau d'affichage numérique reprend les avis officiels publiés en mairie. 
                Pour consulter l'affichage physique, rendez-vous directement à la mairie aux heures d'ouverture.
              </p>
            </div>
            <div className="space-y-3">
              {[
                { date: '08/01/2026', titre: 'Arrêté n°001/2026 – Circulation rue du Moulin', type: 'Arrêté municipal' },
                { date: '02/01/2026', titre: 'Avis de recrutement – Agent technique communal', type: 'Recrutement' },
                { date: '20/12/2025', titre: 'Enquête publique PLU – Modification n°2', type: 'Enquête publique' },
                { date: '15/12/2025', titre: 'Arrêté n°097/2025 – Réglementation des bruits', type: 'Arrêté municipal' },
              ].map((a, i) => (
                <div key={i} className="card p-4 flex items-center gap-4">
                  <div className="text-xs text-gray-400 whitespace-nowrap">{a.date}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{a.titre}</div>
                    <div className="text-xs text-blue-600 mt-0.5">{a.type}</div>
                  </div>
                  <a href="#" className="btn-secondary text-xs py-1.5 px-3">
                    <FileText size={12} aria-hidden="true" />
                    Voir
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
