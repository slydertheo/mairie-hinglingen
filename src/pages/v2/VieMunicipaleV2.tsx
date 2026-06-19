import { useState } from 'react';
import { Download, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { COUNCIL_MEMBERS, DOCUMENTS_DATA } from '../../data';

const SECTIONS = ['Conseil municipal', 'Commissions', 'Bulletins', 'Délibérations', 'Comptes rendus', 'Tableau d\'affichage'];

const COMMISSIONS = [
  { name: 'Travaux & Voirie', pres: 'Bernard Kieffer', members: ['Robert Bauer', 'François Weber'] },
  { name: 'Finances', pres: 'Jean-Pierre Muller', members: ['Isabelle Jung', 'Nathalie Klein'] },
  { name: 'Éducation & Culture', pres: 'Marie Schmitt', members: ['Sophie Roth', 'Claire Hoffmann'] },
  { name: 'Environnement', pres: 'Bernard Kieffer', members: ['Patrick Vogel', 'Alain Meyer'] },
  { name: 'Urbanisme & PLU', pres: 'François Weber', members: ['Jean-Pierre Muller'] },
];

const DELIBSV2 = [
  { ref: 'D-2025-12-01', date: '16/12/2025', objet: 'Approbation du budget primitif 2026', vote: 'Adopté (9/1/1)' },
  { ref: 'D-2025-12-02', date: '16/12/2025', objet: 'Convention avec la Communauté de Communes', vote: 'Unanimité' },
  { ref: 'D-2025-11-01', date: '18/11/2025', objet: 'Tarifs des services communaux 2026', vote: 'Adopté (10/1)' },
  { ref: 'D-2025-11-02', date: '18/11/2025', objet: 'Devis travaux réfection rue principale', vote: 'Unanimité' },
];

const AFFICHAGE = [
  { date: '08/01/2026', titre: 'Arrêté n°001/2026 – Circulation rue du Moulin', type: 'Arrêté' },
  { date: '02/01/2026', titre: 'Avis de recrutement – Agent technique', type: 'Recrutement' },
  { date: '20/12/2025', titre: 'Enquête publique PLU – Modification n°2', type: 'Enquête publique' },
];

export default function VieMunicipaleV2() {
  const [active, setActive] = useState(0);
  const [openComm, setOpenComm] = useState<number | null>(null);
  const bulletins = DOCUMENTS_DATA.filter(d => d.category === 'Bulletin');
  const comptes = DOCUMENTS_DATA.filter(d => d.category === 'Compte rendu');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">🏛️ Vie Municipale</h1>
        <p className="text-blue-100">Transparence, démocratie locale et service aux habitants</p>
      </div>

      {/* Tab nav */}
      <div className="flex flex-wrap gap-2 mb-6" role="tablist">
        {SECTIONS.map((s, i) => (
          <button
            key={s}
            onClick={() => setActive(i)}
            role="tab"
            aria-selected={active === i}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${active === i ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        {/* Conseil */}
        {active === 0 && (
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-4">👥 Composition du Conseil Municipal 2020–2026</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {COUNCIL_MEMBERS.map(m => (
                <div key={m.id} className={`flex items-center gap-3 p-3 rounded-xl border ${m.role === 'Maire' ? 'bg-blue-50 border-blue-200' : 'border-gray-100'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${m.role === 'Maire' ? 'bg-blue-700 text-white' : 'bg-blue-100 text-blue-700'}`}>
                    {m.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{m.name}</div>
                    <div className={`text-xs ${m.role === 'Maire' ? 'text-blue-700 font-medium' : 'text-gray-400'}`}>{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
              📅 Prochaine séance publique : <strong>mardi 3 février 2026 à 20h</strong> – Salle du Conseil, Mairie
            </div>
          </div>
        )}

        {/* Commissions */}
        {active === 1 && (
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-4">🔧 Commissions municipales</h2>
            <div className="space-y-3">
              {COMMISSIONS.map((c, i) => (
                <div key={c.name} className="border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50"
                    onClick={() => setOpenComm(openComm === i ? null : i)}
                    aria-expanded={openComm === i}
                  >
                    <div>
                      <span className="font-bold text-gray-900 text-sm">Commission {c.name}</span>
                      <span className="text-gray-400 text-xs ml-2">— Présidée par {c.pres}</span>
                    </div>
                    {openComm === i ? <ChevronUp size={16} className="text-blue-600" /> : <ChevronDown size={16} className="text-gray-400" />}
                  </button>
                  {openComm === i && (
                    <div className="border-t border-gray-100 px-4 py-3 bg-gray-50">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">{c.pres} (Président·e)</span>
                        {c.members.map(m => <span key={m} className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">{m}</span>)}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bulletins */}
        {active === 2 && (
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-4">📰 Bulletins municipaux</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bulletins.map(doc => (
                <a key={doc.id} href={doc.fileUrl} className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all group">
                  <span className="text-3xl" aria-hidden="true">📄</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 truncate">{doc.title}</div>
                    <div className="text-xs text-gray-400">{doc.date} · {doc.size}</div>
                    <div className="text-xs text-blue-500 flex items-center gap-1 mt-0.5"><Download size={10} />Télécharger PDF</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Délibérations */}
        {active === 3 && (
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-4">📋 Délibérations</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    {['Référence', 'Date', 'Objet', 'Vote', 'PDF'].map(h => (
                      <th key={h} scope="col" className="px-4 py-3 text-left font-semibold text-gray-700 text-xs uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {DELIBSV2.map(d => (
                    <tr key={d.ref} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-mono text-xs text-gray-400">{d.ref}</td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{d.date}</td>
                      <td className="px-4 py-3 text-gray-900">{d.objet}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{d.vote}</td>
                      <td className="px-4 py-3"><a href="#" className="text-blue-600 hover:underline text-xs flex items-center gap-1"><FileText size={11} />PDF</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Comptes rendus */}
        {active === 4 && (
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-4">📝 Comptes rendus des séances</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {comptes.map(doc => (
                <a key={doc.id} href={doc.fileUrl} className="flex items-center gap-3 border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all group">
                  <span className="text-3xl" aria-hidden="true">📋</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 truncate">{doc.title}</div>
                    <div className="text-xs text-gray-400">{doc.date} · {doc.size}</div>
                    <div className="text-xs text-blue-500 flex items-center gap-1 mt-0.5"><Download size={10} />Télécharger</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Tableau d'affichage */}
        {active === 5 && (
          <div>
            <h2 className="text-lg font-bold text-blue-700 mb-4">📌 Tableau d'affichage communal</h2>
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-4 text-sm text-amber-800">
              ℹ️ Retrouvez ici les avis officiels publiés à la mairie. Consultez l'affichage physique en mairie aux heures d'ouverture.
            </div>
            <div className="space-y-3">
              {AFFICHAGE.map((a, i) => (
                <div key={i} className="flex items-center gap-4 border border-gray-200 rounded-xl p-4">
                  <div className="text-xs text-gray-400 whitespace-nowrap">{a.date}</div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 text-sm">{a.titre}</div>
                    <div className="text-xs text-blue-600">{a.type}</div>
                  </div>
                  <a href="#" className="text-xs text-blue-600 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 flex items-center gap-1">
                    <FileText size={11} />Voir
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
