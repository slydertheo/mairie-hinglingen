import { useState } from 'react';
import { ExternalLink, Download } from 'lucide-react';
import { useDocuments, useDemarches, useSettings } from '../../lib/contentStore';

export default function DemarchesV2() {
  const [open, setOpen] = useState<number | null>(0);
  const documents = useDocuments();
  const DEMARCHES = useDemarches();
  const { mairiePhone } = useSettings();
  const formulaires = documents.filter(d => d.category === 'Formulaire');
  const plu = documents.filter(d => d.category === 'Urbanisme');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">📋 Démarches Administratives</h1>
        <p className="text-blue-100">Toutes les informations pour vos démarches en mairie</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6 text-sm text-blue-800">
        💬 Besoin d'aide ? Nos agents vous accueillent du lundi au vendredi aux heures d'ouverture.
        Appelez-nous au <a href={`tel:${mairiePhone.replace(/\s/g, '')}`} className="font-bold underline">{mairiePhone}</a>.
      </div>

      {/* Accordéon */}
      <div className="space-y-3 mb-8">
        {DEMARCHES.map((d, i) => (
          <div key={d.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <button
              className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
            >
              <span className="text-2xl flex-shrink-0" aria-hidden="true">{d.emoji}</span>
              <span className="flex-1 font-bold text-gray-900">{d.title}</span>
              <span className="text-gray-400 text-lg">{open === i ? '▲' : '▼'}</span>
            </button>
            {open === i && (
              <div className="border-t border-gray-100 p-5 space-y-4">
                {d.items.map(item => (
                  <div key={item.id}>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">→ {item.q}</h3>
                    {item.a && <p className="text-gray-600 text-sm leading-relaxed">{item.a}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Téléchargements */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-bold text-blue-700 mb-4">📥 Documents à télécharger</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[...formulaires, ...plu].map(doc => (
            <a key={doc.id} href={doc.fileUrl} className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 hover:border-blue-300 hover:shadow-sm transition-all group">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">📄</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm group-hover:text-blue-700 truncate">{doc.title}</div>
                <div className="text-xs text-gray-400">{doc.category} · {doc.size}</div>
              </div>
              <Download size={14} className="text-blue-500 flex-shrink-0" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* Services préfectoraux */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-blue-700 mb-4">🏛️ Services préfectoraux</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { label: 'Carte d\'identité & Passeport', url: 'https://www.service-public.fr/particuliers/vosdroits/N360' },
            { label: 'Carte grise (immatriculation)', url: 'https://immatriculation.ants.gouv.fr' },
            { label: 'Permis de conduire', url: 'https://permisdeconduire.ants.gouv.fr' },
            { label: 'Préfecture du Haut-Rhin', url: 'https://www.haut-rhin.gouv.fr' },
          ].map(l => (
            <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 hover:text-blue-700 hover:border-blue-200 transition-colors">
              {l.label}
              <ExternalLink size={13} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
