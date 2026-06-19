import { useMemo, useState } from 'react';
import { CheckCircle2, Building2, ShieldCheck, Sparkles, MonitorSmartphone, Wrench, Clock3, Euro, Printer } from 'lucide-react';

type PackKey = 'essentiel' | 'pro' | 'premium';

type Pack = {
  name: string;
  price: string;
  accent: 'green' | 'blue' | 'red';
  badge?: string;
  intro: string;
  features: string[];
  target: string;
};

type State = {
  studioName: string;
  subtitle: string;
  heroTitle: string;
  heroText: string;
  supportText: string;
  rulesTitle: string;
  billingTitle: string;
};

const INITIAL_STATE: State = {
  studioName: 'DevStudio TF',
  subtitle: 'Théo Freyburger',
  heroTitle: 'BROCHURE DE MAINTENANCE & HÉBERGEMENT WEB',
  heroText: 'Des solutions simples, sécurisées et évolutives pour garantir la performance et la sérénité de votre site internet.',
  supportText: 'Idéal pour les mairies, associations, TPE/PME et structures qui souhaitent déléguer la gestion de leur site.',
  rulesTitle: 'RÈGLES DES HEURES INCLUSES',
  billingTitle: 'TARIFICATION HORS FORFAIT',
};

const INITIAL_PACKS: Record<PackKey, Pack> = {
  essentiel: {
    name: 'PACK ESSENTIEL',
    price: '19€',
    accent: 'green',
    intro: 'HÉBERGEMENT & INFRASTRUCTURE',
    features: ['Hébergement VPS', 'Certificat SSL sécurisé', 'Sauvegardes automatiques', 'Monitoring de disponibilité (uptime)', 'Surveillance technique de base', 'Intervention en cas de panne serveur'],
    target: 'Idéal pour les associations, artisans et petites structures qui souhaitent un site fiable et sécurisé.',
  },
  pro: {
    name: 'PACK PRO',
    price: '49€',
    accent: 'blue',
    badge: 'RECOMMANDÉ',
    intro: 'TOUT LE PACK ESSENTIEL +',
    features: ['Mises à jour du site (CMS, extensions, sécurité)', 'Support prioritaire', 'Assistance par email', '1h de modifications de contenu / mois', 'Modification de textes', 'Ajout d’actualités', 'Mise à jour de documents PDF', 'Petites corrections'],
    target: 'Idéal pour les mairies, TPE/PME et professionnels qui veulent un site à jour et un accompagnement régulier.',
  },
  premium: {
    name: 'PACK PREMIUM',
    price: '69€',
    accent: 'red',
    intro: 'TOUT LE PACK PRO +',
    features: ['2 à 3h de modifications incluses / mois', 'Création de nouvelles pages simples', 'Accompagnement personnalisé', 'Support prioritaire renforcé', 'Optimisation des performances du site', 'Suivi global du site'],
    target: 'Idéal pour les structures qui souhaitent déléguer la gestion et l’évolution de leur site.',
  },
};

const ICONS = {
  green: { bg: 'bg-green-100 text-green-700', border: 'border-green-300', title: 'text-green-700', price: 'text-green-700', badge: 'bg-green-50 text-green-700', footer: 'border-green-200 bg-green-50' },
  blue: { bg: 'bg-blue-100 text-blue-700', border: 'border-blue-300', title: 'text-blue-700', price: 'text-blue-700', badge: 'bg-blue-50 text-blue-700', footer: 'border-blue-200 bg-blue-50' },
  red: { bg: 'bg-red-100 text-red-700', border: 'border-red-300', title: 'text-red-700', price: 'text-red-700', badge: 'bg-red-50 text-red-700', footer: 'border-red-200 bg-red-50' },
} as const;

function EditField({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean; }) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">{label}</span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        />
      )}
    </label>
  );
}

function PackCard({ pack, title, accentKey }: { pack: Pack; title: string; accentKey: Pack['accent'] }) {
  const accent = ICONS[accentKey];
  const Icon = accentKey === 'green' ? ShieldCheck : accentKey === 'blue' ? Sparkles : Wrench;

  return (
    <div className={`rounded-2xl border-2 ${accent.border} bg-white shadow-sm overflow-hidden flex flex-col`}>
      <div className={`${accent.bg} flex justify-center`}>
        <div className="-mt-5 w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center">
          <Icon size={26} className={accent.title} aria-hidden="true" />
        </div>
      </div>
      <div className="px-6 pb-6 pt-4 flex-1 flex flex-col">
        <h3 className={`text-center font-extrabold text-2xl leading-none ${accent.title}`}>{title}</h3>
        <div className={`text-center mt-3 ${accent.price}`}>
          <span className="text-5xl font-black">{pack.price}</span>
          <span className="text-xl"> /mois</span>
        </div>
        <div className={`mt-4 mx-auto px-4 py-2 rounded-full text-xs font-bold ${accent.badge}`}>{pack.intro}</div>
        <ul className="mt-5 space-y-2 text-sm text-gray-700 flex-1">
          {pack.features.map((feature) => (
            <li key={feature} className="flex gap-2">
              <CheckCircle2 size={16} className={accent.price + ' mt-0.5 flex-shrink-0'} aria-hidden="true" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <div className={`mt-5 rounded-xl border p-4 text-sm ${accent.footer}`}>
          {pack.target}
        </div>
      </div>
    </div>
  );
}

export default function BrochureEditor() {
  const [state, setState] = useState<State>(INITIAL_STATE);
  const [packs, setPacks] = useState(INITIAL_PACKS);

  const highlights = useMemo(() => ([
    { icon: MonitorSmartphone, label: 'Responsive', desc: 'Ordinateur, tablette et smartphone' },
    { icon: ShieldCheck, label: 'Sécurité', desc: 'SSL, sauvegardes, monitoring' },
    { icon: Euro, label: 'Tarifs clairs', desc: 'Forfaits simples et lisibles' },
    { icon: Clock3, label: 'Assistance', desc: 'Support et interventions régulières' },
  ]), []);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Brochure modifiable</h1>
            <p className="text-sm text-slate-500">Les champs ci-dessous modifient instantanément l’aperçu de la brochure.</p>
          </div>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Printer size={16} aria-hidden="true" />
            Imprimer / Exporter
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6 items-start">
          {/* Editor */}
          <aside className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 xl:sticky xl:top-6 space-y-5">
            <div>
              <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Building2 size={18} className="text-blue-600" aria-hidden="true" /> Paramètres de base</h2>
              <div className="space-y-3">
                <EditField label="Nom du studio" value={state.studioName} onChange={(v) => setState(s => ({ ...s, studioName: v }))} />
                <EditField label="Nom du dirigeant" value={state.subtitle} onChange={(v) => setState(s => ({ ...s, subtitle: v }))} />
                <EditField label="Titre principal" value={state.heroTitle} onChange={(v) => setState(s => ({ ...s, heroTitle: v }))} multiline />
                <EditField label="Texte d'introduction" value={state.heroText} onChange={(v) => setState(s => ({ ...s, heroText: v }))} multiline />
              </div>
            </div>

            <div>
              <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Wrench size={18} className="text-blue-600" aria-hidden="true" /> Packs</h2>
              <div className="space-y-3 text-sm">
                {(Object.keys(packs) as PackKey[]).map((key) => (
                  <div key={key} className="rounded-xl border border-slate-200 p-3 bg-slate-50/60">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-slate-900 uppercase text-xs tracking-wider">{packs[key].name}</span>
                      <select
                        value={packs[key].accent}
                        onChange={(e) => setPacks(p => ({ ...p, [key]: { ...p[key], accent: e.target.value as Pack['accent'] } }))}
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1 bg-white"
                        aria-label={`Couleur du ${packs[key].name}`}
                      >
                        <option value="green">Vert</option>
                        <option value="blue">Bleu</option>
                        <option value="red">Rouge</option>
                      </select>
                    </div>
                    <label className="block mb-2">
                      <span className="block text-xs text-slate-500 mb-1">Prix</span>
                      <input
                        value={packs[key].price}
                        onChange={(e) => setPacks(p => ({ ...p, [key]: { ...p[key], price: e.target.value } }))}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      />
                    </label>
                    <label className="block">
                      <span className="block text-xs text-slate-500 mb-1">Phrase d'accroche</span>
                      <input
                        value={packs[key].intro}
                        onChange={(e) => setPacks(p => ({ ...p, [key]: { ...p[key], intro: e.target.value } }))}
                        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      />
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Clock3 size={18} className="text-blue-600" aria-hidden="true" /> Encarts</h2>
              <div className="space-y-3">
                <EditField label="Règles des heures incluses" value={state.rulesTitle} onChange={(v) => setState(s => ({ ...s, rulesTitle: v }))} />
                <EditField label="Tarification hors forfait" value={state.billingTitle} onChange={(v) => setState(s => ({ ...s, billingTitle: v }))} />
                <EditField label="Texte de support" value={state.supportText} onChange={(v) => setState(s => ({ ...s, supportText: v }))} multiline />
              </div>
            </div>
          </aside>

          {/* Preview */}
          <main className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            <div className="p-6 md:p-8 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.10),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(16,185,129,0.12),_transparent_30%)]">
              <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 pb-8 border-b border-slate-200">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg">
                    <span className="text-4xl font-black leading-none">TF</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{state.studioName}</div>
                    <div className="text-sm text-slate-600">{state.subtitle}</div>
                    <div className="text-xs text-slate-500 mt-1">Développement & Maintenance de sites internet</div>
                  </div>
                </div>
                <div className="max-w-2xl text-left md:text-right">
                  <h2 className="text-2xl md:text-4xl font-black text-slate-900 leading-tight">{state.heroTitle}</h2>
                  <p className="text-slate-600 mt-3 text-sm md:text-base">{state.heroText}</p>
                </div>
              </header>

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-8">
                <PackCard pack={packs.essentiel} title="PACK ESSENTIEL" accentKey="green" />
                <PackCard pack={packs.pro} title="PACK PRO" accentKey="blue" />
                <PackCard pack={packs.premium} title="PACK PREMIUM" accentKey="red" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
                <section className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Clock3 size={18} className="text-slate-600" aria-hidden="true" /> {state.rulesTitle}</h3>
                  <div className="space-y-3 text-sm text-slate-600">
                    <div className="flex gap-3"><span className="text-blue-600 font-bold">1.</span><span>Les heures incluses ne sont pas cumulables d'un mois sur l'autre.</span></div>
                    <div className="flex gap-3"><span className="text-blue-600 font-bold">2.</span><span>Elles doivent être utilisées dans le mois en cours.</span></div>
                    <div className="flex gap-3"><span className="text-blue-600 font-bold">3.</span><span>En cas de besoin exceptionnel, un report peut être accordé sur 1 mois maximum.</span></div>
                  </div>
                </section>
                <section className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Euro size={18} className="text-slate-600" aria-hidden="true" /> {state.billingTitle}</h3>
                  <div className="overflow-hidden rounded-xl border border-slate-200">
                    {[
                      ['Intervention technique', '50 €/h'],
                      ['Modification de contenu', '50 €/h'],
                      ['Formation complémentaire', '50 €/h'],
                      ['Création de page simple', 'À partir de 80 €'],
                      ['Développement spécifique', 'Sur devis'],
                    ].map((row, i) => (
                      <div key={row[0]} className={`grid grid-cols-[1fr_auto] px-4 py-2 text-sm ${i % 2 === 0 ? 'bg-slate-50' : 'bg-white'}`}>
                        <span className="text-slate-600">{row[0]}</span>
                        <span className="font-medium text-slate-900">{row[1]}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
                <section className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><Sparkles size={18} className="text-blue-600" aria-hidden="true" /> Exemples concrets</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { title: 'Sans maintenance', color: 'slate', items: ['Modification d’un texte', 'Ajout d’une actualité', 'Intervention technique'] },
                      { title: 'Avec pack PRO', color: 'blue', items: ['1h de modifications / mois', 'Support et mises à jour inclus'] },
                      { title: 'Avec pack PREMIUM', color: 'red', items: ['2 à 3h de modifications / mois', 'Gestion avancée du site', 'Sérénité maximale'] },
                    ].map((box) => (
                      <div key={box.title} className={`rounded-xl border p-4 ${box.color === 'blue' ? 'bg-blue-50 border-blue-200' : box.color === 'red' ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="font-bold text-slate-900 text-sm mb-2 uppercase">{box.title}</div>
                        <ul className="space-y-1 text-xs text-slate-600 list-disc list-inside">
                          {box.items.map(item => <li key={item}>{item}</li>)}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="rounded-2xl border border-slate-200 p-5">
                  <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2"><MonitorSmartphone size={18} className="text-blue-600" aria-hidden="true" /> Les avantages de nos packs</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
                    {highlights.map((h) => {
                      const Icon = h.icon;
                      return (
                        <div key={h.label} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3">
                          <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                            <Icon size={16} aria-hidden="true" />
                          </div>
                          <div>
                            <div className="font-semibold text-slate-900 text-sm">{h.label}</div>
                            <div className="text-xs text-slate-500">{h.desc}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              <footer className="mt-6 rounded-2xl bg-slate-900 text-white p-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <div className="font-semibold mb-1">À propos</div>
                    <p className="text-slate-300 text-xs leading-relaxed">{state.studioName} accompagne les mairies et entreprises dans la création, la maintenance et l'hébergement de leurs sites internet.</p>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Contact</div>
                    <p className="text-slate-300 text-xs leading-relaxed">contact@devstudiotf.fr<br />www.devstudiotf.fr</p>
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Conditions</div>
                    <p className="text-slate-300 text-xs leading-relaxed">Hébergement inclus dans tous les packs. Résiliation selon conditions contractuelles.</p>
                  </div>
                </div>
              </footer>

              <p className="text-center text-xs text-slate-400 mt-3">Version modifiable en direct: changez les textes, les prix et les encarts dans le panneau de gauche.</p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}