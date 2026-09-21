import { useState } from 'react';
import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { Plus, Pencil, Trash2, X, AlertTriangle, RotateCcw } from 'lucide-react';
import type {
  NewsItem, EventItem, Document, Association, Commerce, CouncilMember, PointCarte, SiteSettings,
  GalleryImage, PatrimoineItem, TimelineEvent, EtangInfo, Commission, Deliberation, AffichageItem,
  DecouvrirVignette, IntercoDelegue, IntercoCompetence, IntercoLien, DemarcheCategory, DemarcheFaqEntry, LienUtile,
} from '../../types';
import {
  useNews, useEvents, useDocuments, useAssociations, useCommerces, useCouncil, usePoints, useSettings,
  saveNews, saveEvents, saveDocuments, saveAssociations, saveCommerces, saveCouncil, savePoints, saveSettings,
  resetNews, resetEvents, resetDocuments, resetAssociations, resetCommerces, resetCouncil, resetPoints,
  useGallery, usePatrimoine, useTimeline, useEtangs, useCommissions, useDeliberations, useAffichage,
  useDecouvrirVignettes, useIntercoDelegues, useIntercoCompetences, useIntercoLiens, useDemarches,
  useHomeLiens, usePrefectureLiens, useContactSubjects,
  saveGallery, savePatrimoine, saveTimeline, saveEtangs, saveCommissions, saveDeliberations, saveAffichage,
  saveDecouvrirVignettes, saveIntercoDelegues, saveIntercoCompetences, saveIntercoLiens, saveDemarches,
  saveHomeLiens, savePrefectureLiens, saveContactSubjects,
  resetGallery, resetPatrimoine, resetTimeline, resetEtangs, resetCommissions, resetDeliberations, resetAffichage,
  resetDecouvrirVignettes, resetIntercoDelegues, resetIntercoCompetences, resetIntercoLiens, resetDemarches,
  resetHomeLiens, resetPrefectureLiens,
  login, getToken, clearToken,
} from '../../lib/contentStore';
import ImageField from '../../components/v2/ImageField';

function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

function slugify(text: string) {
  return text.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-gray-700">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}

const inputCls = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';

// --- Actualités ---
function NewsAdmin() {
  const items = useNews();
  const [editing, setEditing] = useState<NewsItem | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const exists = items.some(i => i.id === editing.id);
    const next = exists ? items.map(i => (i.id === editing.id ? editing : i)) : [editing, ...items];
    saveNews(next);
    setEditing(null);
  };

  const remove = (id: string) => {
    if (confirm('Supprimer cette actualité ?')) saveNews(items.filter(i => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900">Actualités ({items.length})</h2>
        <div className="flex gap-2">
          <button onClick={() => resetNews()} className="text-xs text-gray-400 hover:text-red-600">Réinitialiser</button>
          <button
            onClick={() => setEditing({ id: newId(), title: '', summary: '', date: new Date().toISOString().slice(0, 10), category: 'Actualité', slug: '' })}
            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg"
          >
            <Plus size={14} /> Ajouter
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {items.map(n => (
          <div key={n.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5">
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">{n.title}</div>
              <div className="text-xs text-gray-400">{n.date} · {n.category}</div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => setEditing(n)} className="p-1.5 text-gray-400 hover:text-blue-600" aria-label={`Modifier ${n.title}`}><Pencil size={15} /></button>
              <button onClick={() => remove(n.id)} className="p-1.5 text-gray-400 hover:text-red-600" aria-label={`Supprimer ${n.title}`}><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="bg-blue-50 border border-blue-100 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-blue-800 text-sm">{items.some(i => i.id === editing.id) ? 'Modifier' : 'Nouvelle'} actualité</h3>
            <button type="button" onClick={() => setEditing(null)} aria-label="Fermer"><X size={16} /></button>
          </div>
          <Field label="Titre">
            <input required className={inputCls} value={editing.title}
              onChange={e => setEditing({ ...editing, title: e.target.value, slug: slugify(e.target.value) })} />
          </Field>
          <Field label="Résumé">
            <textarea required rows={3} className={inputCls} value={editing.summary}
              onChange={e => setEditing({ ...editing, summary: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input required type="date" className={inputCls} value={editing.date}
                onChange={e => setEditing({ ...editing, date: e.target.value })} />
            </Field>
            <Field label="Catégorie">
              <input required className={inputCls} value={editing.category}
                onChange={e => setEditing({ ...editing, category: e.target.value })} />
            </Field>
          </div>
          <ImageField label="Image (optionnel)" value={editing.image ?? ''}
            onChange={url => setEditing({ ...editing, image: url })} />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer</button>
        </form>
      )}
    </div>
  );
}

// --- Événements ---
function EventsAdmin() {
  const items = useEvents();
  const [editing, setEditing] = useState<EventItem | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const exists = items.some(i => i.id === editing.id);
    const next = exists ? items.map(i => (i.id === editing.id ? editing : i)) : [editing, ...items];
    saveEvents(next);
    setEditing(null);
  };

  const remove = (id: string) => {
    if (confirm('Supprimer cet événement ?')) saveEvents(items.filter(i => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900">Événements ({items.length})</h2>
        <div className="flex gap-2">
          <button onClick={() => resetEvents()} className="text-xs text-gray-400 hover:text-red-600">Réinitialiser</button>
          <button
            onClick={() => setEditing({ id: newId(), title: '', description: '', date: new Date().toISOString().slice(0, 10), location: '', category: 'Officiel' })}
            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg"
          >
            <Plus size={14} /> Ajouter
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {items.map(ev => (
          <div key={ev.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5">
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">{ev.title}</div>
              <div className="text-xs text-gray-400">{ev.date} · {ev.location}</div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => setEditing(ev)} className="p-1.5 text-gray-400 hover:text-blue-600" aria-label={`Modifier ${ev.title}`}><Pencil size={15} /></button>
              <button onClick={() => remove(ev.id)} className="p-1.5 text-gray-400 hover:text-red-600" aria-label={`Supprimer ${ev.title}`}><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="bg-blue-50 border border-blue-100 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-blue-800 text-sm">{items.some(i => i.id === editing.id) ? 'Modifier' : 'Nouvel'} événement</h3>
            <button type="button" onClick={() => setEditing(null)} aria-label="Fermer"><X size={16} /></button>
          </div>
          <Field label="Titre">
            <input required className={inputCls} value={editing.title}
              onChange={e => setEditing({ ...editing, title: e.target.value })} />
          </Field>
          <Field label="Description">
            <textarea required rows={3} className={inputCls} value={editing.description}
              onChange={e => setEditing({ ...editing, description: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input required type="date" className={inputCls} value={editing.date}
                onChange={e => setEditing({ ...editing, date: e.target.value })} />
            </Field>
            <Field label="Heure (optionnel)">
              <input className={inputCls} value={editing.time ?? ''} placeholder="18h00"
                onChange={e => setEditing({ ...editing, time: e.target.value })} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Lieu">
              <input required className={inputCls} value={editing.location}
                onChange={e => setEditing({ ...editing, location: e.target.value })} />
            </Field>
            <Field label="Catégorie">
              <input required className={inputCls} value={editing.category}
                onChange={e => setEditing({ ...editing, category: e.target.value })} />
            </Field>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer</button>
        </form>
      )}
    </div>
  );
}

// --- Documents ---
function DocumentsAdmin() {
  const items = useDocuments();
  const [editing, setEditing] = useState<Document | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const exists = items.some(i => i.id === editing.id);
    const next = exists ? items.map(i => (i.id === editing.id ? editing : i)) : [editing, ...items];
    saveDocuments(next);
    setEditing(null);
  };

  const remove = (id: string) => {
    if (confirm('Supprimer ce document ?')) saveDocuments(items.filter(i => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900">Documents ({items.length})</h2>
        <div className="flex gap-2">
          <button onClick={() => resetDocuments()} className="text-xs text-gray-400 hover:text-red-600">Réinitialiser</button>
          <button
            onClick={() => setEditing({ id: newId(), title: '', fileUrl: '#', fileType: 'pdf', date: new Date().toISOString().slice(0, 10), category: 'Bulletin' })}
            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg"
          >
            <Plus size={14} /> Ajouter
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {items.map(d => (
          <div key={d.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5">
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">{d.title}</div>
              <div className="text-xs text-gray-400">{d.date} · {d.category}</div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => setEditing(d)} className="p-1.5 text-gray-400 hover:text-blue-600" aria-label={`Modifier ${d.title}`}><Pencil size={15} /></button>
              <button onClick={() => remove(d.id)} className="p-1.5 text-gray-400 hover:text-red-600" aria-label={`Supprimer ${d.title}`}><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="bg-blue-50 border border-blue-100 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-blue-800 text-sm">{items.some(i => i.id === editing.id) ? 'Modifier' : 'Nouveau'} document</h3>
            <button type="button" onClick={() => setEditing(null)} aria-label="Fermer"><X size={16} /></button>
          </div>
          <Field label="Titre">
            <input required className={inputCls} value={editing.title}
              onChange={e => setEditing({ ...editing, title: e.target.value })} />
          </Field>
          <Field label="Lien du fichier (URL)">
            <input required className={inputCls} value={editing.fileUrl}
              onChange={e => setEditing({ ...editing, fileUrl: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input required type="date" className={inputCls} value={editing.date}
                onChange={e => setEditing({ ...editing, date: e.target.value })} />
            </Field>
            <Field label="Catégorie">
              <input required className={inputCls} value={editing.category}
                onChange={e => setEditing({ ...editing, category: e.target.value })} />
            </Field>
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer</button>
        </form>
      )}
    </div>
  );
}

// --- Éditeur de liste générique (Associations, Commerces, Conseil, Points de carte) ---
interface ListEditorProps<T extends { id: string }> {
  title: string;
  items: T[];
  onSave: (items: T[]) => void;
  onReset: () => void;
  makeNew: () => T;
  rowLabel: (item: T) => string;
  rowSub: (item: T) => string;
  formTitle: (isNew: boolean) => string;
  renderForm: (editing: T, setEditing: (v: T) => void) => ReactNode;
  confirmLabel: string;
}

function ListEditor<T extends { id: string }>({
  title, items, onSave, onReset, makeNew, rowLabel, rowSub, formTitle, renderForm, confirmLabel,
}: ListEditorProps<T>) {
  const [editing, setEditing] = useState<T | null>(null);
  const isNew = !!editing && !items.some(i => i.id === editing.id);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const exists = items.some(i => i.id === editing.id);
    const next = exists ? items.map(i => (i.id === editing.id ? editing : i)) : [editing, ...items];
    onSave(next);
    setEditing(null);
  };

  const remove = (id: string) => {
    if (confirm(`Supprimer ${confirmLabel} ?`)) onSave(items.filter(i => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-gray-900">{title} ({items.length})</h2>
        <div className="flex gap-2">
          <button onClick={onReset} className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-red-600">
            <RotateCcw size={12} /> Réinitialiser
          </button>
          <button
            onClick={() => setEditing(makeNew())}
            className="inline-flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg"
          >
            <Plus size={14} /> Ajouter
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2.5">
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-800 truncate">{rowLabel(item)}</div>
              <div className="text-xs text-gray-400">{rowSub(item)}</div>
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <button onClick={() => setEditing(item)} className="p-1.5 text-gray-400 hover:text-blue-600" aria-label={`Modifier ${rowLabel(item)}`}><Pencil size={15} /></button>
              <button onClick={() => remove(item.id)} className="p-1.5 text-gray-400 hover:text-red-600" aria-label={`Supprimer ${rowLabel(item)}`}><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-gray-400 italic">Aucun élément pour le moment.</p>}
      </div>

      {editing && (
        <form onSubmit={handleSubmit} className="bg-blue-50 border border-blue-100 rounded-xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-blue-800 text-sm">{formTitle(isNew)}</h3>
            <button type="button" onClick={() => setEditing(null)} aria-label="Fermer"><X size={16} /></button>
          </div>
          {renderForm(editing, setEditing)}
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer</button>
        </form>
      )}
    </div>
  );
}

function AssociationsAdmin() {
  const items = useAssociations();
  return (
    <ListEditor<Association>
      title="Associations"
      items={items}
      onSave={saveAssociations}
      onReset={resetAssociations}
      confirmLabel="cette association"
      makeNew={() => ({ id: newId(), name: '', description: '', category: 'Loisirs', email: '' })}
      rowLabel={a => a.name}
      rowSub={a => a.category}
      formTitle={isNew => isNew ? 'Nouvelle association' : 'Modifier l\'association'}
      renderForm={(editing, setEditing) => (
        <>
          <Field label="Nom">
            <input required className={inputCls} value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
          </Field>
          <Field label="Description">
            <textarea required rows={2} className={inputCls} value={editing.description} onChange={e => setEditing({ ...editing, description: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Catégorie">
              <input required className={inputCls} value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value })} />
            </Field>
            <Field label="Email (optionnel)">
              <input className={inputCls} value={editing.email ?? ''} onChange={e => setEditing({ ...editing, email: e.target.value })} />
            </Field>
          </div>
        </>
      )}
    />
  );
}

function CommercesAdmin() {
  const items = useCommerces();
  return (
    <ListEditor<Commerce>
      title="Commerces & entreprises"
      items={items}
      onSave={saveCommerces}
      onReset={resetCommerces}
      confirmLabel="ce commerce"
      makeNew={() => ({ id: newId(), name: '', type: 'Alimentation', horaires: '', phone: '' })}
      rowLabel={c => c.name}
      rowSub={c => c.type}
      formTitle={isNew => isNew ? 'Nouveau commerce' : 'Modifier le commerce'}
      renderForm={(editing, setEditing) => (
        <>
          <Field label="Nom">
            <input required className={inputCls} value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Type">
              <input required className={inputCls} value={editing.type} onChange={e => setEditing({ ...editing, type: e.target.value })} />
            </Field>
            <Field label="Téléphone">
              <input className={inputCls} value={editing.phone ?? ''} onChange={e => setEditing({ ...editing, phone: e.target.value })} />
            </Field>
          </div>
          <Field label="Horaires">
            <input required className={inputCls} value={editing.horaires} onChange={e => setEditing({ ...editing, horaires: e.target.value })} />
          </Field>
        </>
      )}
    />
  );
}

const POINT_CATEGORIES: PointCarte['category'][] = ['Mairie', 'École', 'Commerce', 'Nature', 'Équipement', 'Culte'];

function PointsAdmin() {
  const items = usePoints();
  return (
    <>
      <p className="text-xs text-gray-400 mb-4">
        Ces lieux apparaissent comme repères sur la carte interactive (page « Plan &amp; Carte »).
      </p>
      <ListEditor<PointCarte>
        title="Lieux de la carte"
        items={items}
        onSave={savePoints}
        onReset={resetPoints}
        confirmLabel="ce lieu"
        makeNew={() => ({ id: newId(), name: '', category: 'Équipement', lat: 47.6206, lng: 7.1119, description: '' })}
        rowLabel={p => p.name}
        rowSub={p => `${p.category} · ${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}`}
        formTitle={isNew => isNew ? 'Nouveau lieu' : 'Modifier le lieu'}
        renderForm={(editing, setEditing) => (
          <>
            <Field label="Nom">
              <input required className={inputCls} value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            <Field label="Catégorie">
              <select className={inputCls} value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value as PointCarte['category'] })}>
                {POINT_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Latitude">
                <input required type="number" step="0.0001" className={inputCls} value={editing.lat}
                  onChange={e => setEditing({ ...editing, lat: parseFloat(e.target.value) })} />
              </Field>
              <Field label="Longitude">
                <input required type="number" step="0.0001" className={inputCls} value={editing.lng}
                  onChange={e => setEditing({ ...editing, lng: parseFloat(e.target.value) })} />
              </Field>
            </div>
            <Field label="Description (optionnel)">
              <input className={inputCls} value={editing.description ?? ''} onChange={e => setEditing({ ...editing, description: e.target.value })} />
            </Field>
          </>
        )}
      />
    </>
  );
}

// --- Accueil : Bandeau (hero) ---
function AccueilBandeauAdmin() {
  const stored = useSettings();
  const [form, setForm] = useState<Pick<SiteSettings, 'homeHeroImage' | 'homeHeroTitle' | 'homeHeroSubtitle'>>(stored);
  const [saved, setSaved] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveSettings({ ...stored, ...form });
    setSaved(true);
  };

  return (
    <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
      <h2 className="font-bold text-gray-900">Bandeau d'accueil (hero)</h2>
      <ImageField label="Photo de fond" value={form.homeHeroImage} onChange={url => { setForm({ ...form, homeHeroImage: url }); setSaved(false); }} />
      <Field label="Titre">
        <input className={inputCls} value={form.homeHeroTitle} onChange={e => { setForm({ ...form, homeHeroTitle: e.target.value }); setSaved(false); }} />
      </Field>
      <Field label="Sous-titre">
        <input className={inputCls} value={form.homeHeroSubtitle} onChange={e => { setForm({ ...form, homeHeroSubtitle: e.target.value }); setSaved(false); }} />
      </Field>
      <div className="flex items-center gap-3">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer</button>
        {saved && <span className="text-xs text-green-600 font-medium">Enregistré ✓</span>}
      </div>
    </form>
  );
}

// --- Accueil : vignettes « Découvrir Hindlingen » (section après le Mot du Maire) ---
function AccueilDecouvrirAdmin() {
  const vignettes = useDecouvrirVignettes();

  return (
    <ListEditor<DecouvrirVignette>
      title="🌿 Vignettes « Découvrir Hindlingen »"
      items={vignettes}
      onSave={saveDecouvrirVignettes}
      onReset={resetDecouvrirVignettes}
      confirmLabel="cette vignette"
      makeNew={() => ({ id: newId(), title: '', img: '', href: '/decouvrir' })}
      rowLabel={v => v.title}
      rowSub={v => v.href}
      formTitle={isNew => isNew ? 'Nouvelle vignette' : 'Modifier la vignette'}
      renderForm={(editing, setEditing) => (
        <>
          <Field label="Titre">
            <input required className={inputCls} value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
          </Field>
          <ImageField label="Image" value={editing.img} onChange={url => setEditing({ ...editing, img: url })} />
          <Field label="Lien (page + ancre)">
            <input required className={inputCls} value={editing.href} onChange={e => setEditing({ ...editing, href: e.target.value })} />
          </Field>
        </>
      )}
    />
  );
}

// --- Accueil : Mot du Maire ---
function MotDuMaireAdmin() {
  const stored = useSettings();
  const [form, setForm] = useState<Pick<SiteSettings, 'mayorName' | 'mayorMessage'>>(stored);
  const [saved, setSaved] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveSettings({ ...stored, ...form });
    setSaved(true);
  };

  return (
    <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
      <h2 className="font-bold text-gray-900">🏛️ Mot du Maire</h2>
      <Field label="Nom du maire">
        <input className={inputCls} value={form.mayorName} onChange={e => { setForm({ ...form, mayorName: e.target.value }); setSaved(false); }} />
      </Field>
      <Field label="Message">
        <textarea rows={6} className={inputCls} value={form.mayorMessage} onChange={e => { setForm({ ...form, mayorMessage: e.target.value }); setSaved(false); }} />
      </Field>
      <div className="flex items-center gap-3">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer</button>
        {saved && <span className="text-xs text-green-600 font-medium">Enregistré ✓</span>}
      </div>
    </form>
  );
}

// --- Accueil : Infos pratiques (coordonnées, horaires, réseaux sociaux) ---
function InfosPratiquesAdmin() {
  const stored = useSettings();
  type Fields = Pick<SiteSettings, 'mairieAddress' | 'mairieCity' | 'mairiePhone' | 'mairieEmail' | 'mairieHoraires' | 'facebookUrl' | 'intramurosUrl'>;
  const [form, setForm] = useState<Fields>(stored);
  const [saved, setSaved] = useState(false);

  const field = (key: keyof Fields) => ({
    value: form[key] as string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [key]: e.target.value });
      setSaved(false);
    },
  });

  const setHoraire = (idx: number, value: string) => {
    const next = form.mairieHoraires.map((h, i) => (i === idx ? { ...h, horaires: value } : h));
    setForm({ ...form, mairieHoraires: next });
    setSaved(false);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveSettings({ ...stored, ...form });
    setSaved(true);
  };

  const homeLiens = useHomeLiens();

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
        <h2 className="font-bold text-gray-900">ℹ️ Infos pratiques</h2>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Adresse"><input className={inputCls} {...field('mairieAddress')} /></Field>
          <Field label="Ville"><input className={inputCls} {...field('mairieCity')} /></Field>
          <Field label="Téléphone"><input className={inputCls} {...field('mairiePhone')} /></Field>
          <Field label="Email"><input className={inputCls} {...field('mairieEmail')} /></Field>
        </div>
        <Field label="Horaires d'ouverture">
          <div className="space-y-1.5">
            {form.mairieHoraires.map((h, i) => (
              <div key={h.jour} className="flex items-center gap-2">
                <span className="w-24 text-xs text-gray-500 flex-shrink-0">{h.jour}</span>
                <input className={inputCls} value={h.horaires} onChange={e => setHoraire(i, e.target.value)} />
              </div>
            ))}
          </div>
        </Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Facebook (URL)"><input className={inputCls} {...field('facebookUrl')} /></Field>
          <Field label="IntraMuros (URL)"><input className={inputCls} {...field('intramurosUrl')} /></Field>
        </div>
        <div className="flex items-center gap-3">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer</button>
          {saved && <span className="text-xs text-green-600 font-medium">Enregistré ✓</span>}
        </div>
      </form>

      <ListEditor<LienUtile>
        title="🔗 Liens utiles"
        items={homeLiens}
        onSave={saveHomeLiens}
        onReset={resetHomeLiens}
        confirmLabel="ce lien"
        makeNew={() => ({ id: newId(), label: '', url: '' })}
        rowLabel={l => l.label}
        rowSub={l => l.url}
        formTitle={isNew => isNew ? 'Nouveau lien' : 'Modifier le lien'}
        renderForm={(editing, setEditing) => (
          <>
            <Field label="Libellé">
              <input required className={inputCls} value={editing.label} onChange={e => setEditing({ ...editing, label: e.target.value })} />
            </Field>
            <Field label="URL">
              <input required className={inputCls} value={editing.url} onChange={e => setEditing({ ...editing, url: e.target.value })} />
            </Field>
          </>
        )}
      />
    </div>
  );
}

// --- Découvrir (historique, patrimoine, étangs/forêts, galerie) ---
function DecouvrirAdmin() {
  const stored = useSettings();
  type Fields = Pick<SiteSettings, 'communePresentation' | 'historiqueIntro' | 'etangsIntro' | 'etangsImage' | 'forestIntro' | 'forestImage' | 'forestSentiers'>;
  const [form, setForm] = useState<Fields>(stored);
  const [saved, setSaved] = useState(false);
  const timeline = useTimeline();
  const patrimoine = usePatrimoine();
  const etangs = useEtangs();
  const gallery = useGallery();

  const field = (key: keyof Fields) => ({
    value: form[key],
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => {
      setForm({ ...form, [key]: e.target.value });
      setSaved(false);
    },
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveSettings({ ...stored, ...form });
    setSaved(true);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="space-y-6">
        {/* 1. Présentation générale */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
          <h2 className="font-bold text-gray-900">📍 Présentation générale</h2>
          <Field label="Texte de présentation">
            <textarea rows={5} className={inputCls} {...field('communePresentation')} />
          </Field>
        </div>

        {/* 2. Historique (texte, la frise est juste en dessous) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
          <h2 className="font-bold text-gray-900">📜 Historique</h2>
          <Field label="Introduction historique">
            <textarea rows={5} className={inputCls} {...field('historiqueIntro')} />
          </Field>
        </div>

        <div className="flex items-center gap-3">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer les textes</button>
          {saved && <span className="text-xs text-green-600 font-medium">Enregistré ✓</span>}
        </div>
      </form>

      <ListEditor<TimelineEvent>
        title="Frise historique"
        items={timeline}
        onSave={saveTimeline}
        onReset={resetTimeline}
        confirmLabel="cette date"
        makeNew={() => ({ id: newId(), year: '', text: '' })}
        rowLabel={t => t.year}
        rowSub={t => t.text}
        formTitle={isNew => isNew ? 'Nouvelle date' : 'Modifier la date'}
        renderForm={(editing, setEditing) => (
          <>
            <Field label="Année / période">
              <input required className={inputCls} value={editing.year} onChange={e => setEditing({ ...editing, year: e.target.value })} />
            </Field>
            <Field label="Évènement">
              <input required className={inputCls} value={editing.text} onChange={e => setEditing({ ...editing, text: e.target.value })} />
            </Field>
          </>
        )}
      />

      <ListEditor<PatrimoineItem>
        title="Patrimoine"
        items={patrimoine}
        onSave={savePatrimoine}
        onReset={resetPatrimoine}
        confirmLabel="cet élément de patrimoine"
        makeNew={() => ({ id: newId(), emoji: '🏛️', title: '', desc: '', tag: 'Patrimoine' })}
        rowLabel={p => p.title}
        rowSub={p => p.tag}
        formTitle={isNew => isNew ? 'Nouvel élément' : 'Modifier l\'élément'}
        renderForm={(editing, setEditing) => (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Emoji">
                <input className={inputCls} value={editing.emoji} onChange={e => setEditing({ ...editing, emoji: e.target.value })} />
              </Field>
              <Field label="Étiquette">
                <input className={inputCls} value={editing.tag} onChange={e => setEditing({ ...editing, tag: e.target.value })} />
              </Field>
            </div>
            <Field label="Titre">
              <input required className={inputCls} value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
            </Field>
            <Field label="Description">
              <textarea rows={2} className={inputCls} value={editing.desc} onChange={e => setEditing({ ...editing, desc: e.target.value })} />
            </Field>
          </>
        )}
      />

      {/* 4. Étangs & Forêts (texte + photos), suivi de la liste des étangs juste en dessous */}
      <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
        <h2 className="font-bold text-gray-900">🌊 Étangs &amp; Forêts</h2>
        <Field label="Introduction étangs">
          <textarea rows={2} className={inputCls} {...field('etangsIntro')} />
        </Field>
        <ImageField label="Photo des étangs" value={form.etangsImage} onChange={url => { setForm({ ...form, etangsImage: url }); setSaved(false); }} />
        <Field label="Introduction forêt">
          <textarea rows={2} className={inputCls} {...field('forestIntro')} />
        </Field>
        <ImageField label="Photo de la forêt" value={form.forestImage} onChange={url => { setForm({ ...form, forestImage: url }); setSaved(false); }} />
        <Field label="Sentiers balisés (une ligne par sentier)">
          <textarea rows={3} className={inputCls} {...field('forestSentiers')} />
        </Field>
        <div className="flex items-center gap-3">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer</button>
          {saved && <span className="text-xs text-green-600 font-medium">Enregistré ✓</span>}
        </div>
      </form>

      <ListEditor<EtangInfo>
        title="Étangs"
        items={etangs}
        onSave={saveEtangs}
        onReset={resetEtangs}
        confirmLabel="cet étang"
        makeNew={() => ({ id: newId(), name: '', superficie: '' })}
        rowLabel={e => e.name}
        rowSub={e => e.superficie}
        formTitle={isNew => isNew ? 'Nouvel étang' : 'Modifier l\'étang'}
        renderForm={(editing, setEditing) => (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nom">
              <input required className={inputCls} value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            <Field label="Superficie">
              <input required className={inputCls} value={editing.superficie} onChange={e => setEditing({ ...editing, superficie: e.target.value })} />
            </Field>
          </div>
        )}
      />

      <ListEditor<GalleryImage>
        title="Galerie photos"
        items={gallery}
        onSave={saveGallery}
        onReset={resetGallery}
        confirmLabel="cette photo"
        makeNew={() => ({ id: newId(), url: '', caption: '' })}
        rowLabel={g => g.caption || 'Photo'}
        rowSub={() => ''}
        formTitle={isNew => isNew ? 'Nouvelle photo' : 'Modifier la photo'}
        renderForm={(editing, setEditing) => (
          <>
            <ImageField label="Photo" value={editing.url} onChange={url => setEditing({ ...editing, url })} />
            <Field label="Légende (optionnel)">
              <input className={inputCls} value={editing.caption ?? ''} onChange={e => setEditing({ ...editing, caption: e.target.value })} />
            </Field>
          </>
        )}
      />
    </div>
  );
}

// --- Vie locale : Marché & camion à pizzas ---
function MarcheAdmin() {
  const stored = useSettings();
  type Fields = Pick<SiteSettings, 'marketTitle' | 'marketSchedule' | 'marketLocation' | 'marketDescription' | 'foodtruckTitle' | 'foodtruckSchedule' | 'foodtruckLocation' | 'foodtruckPhone' | 'foodtruckDescription'>;
  const [form, setForm] = useState<Fields>(stored);
  const [saved, setSaved] = useState(false);

  const field = (key: keyof Fields) => ({
    value: form[key],
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [key]: e.target.value });
      setSaved(false);
    },
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveSettings({ ...stored, ...form });
    setSaved(true);
  };

  return (
    <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
      <h2 className="font-bold text-gray-900">🛒 Marché &amp; 🍕 camion à pizzas</h2>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Titre du marché"><input className={inputCls} {...field('marketTitle')} /></Field>
        <Field label="Horaires du marché"><input className={inputCls} {...field('marketSchedule')} /></Field>
        <Field label="Lieu du marché"><input className={inputCls} {...field('marketLocation')} /></Field>
        <Field label="Description du marché"><input className={inputCls} {...field('marketDescription')} /></Field>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Titre food truck"><input className={inputCls} {...field('foodtruckTitle')} /></Field>
        <Field label="Horaires food truck"><input className={inputCls} {...field('foodtruckSchedule')} /></Field>
        <Field label="Lieu food truck"><input className={inputCls} {...field('foodtruckLocation')} /></Field>
        <Field label="Téléphone food truck"><input className={inputCls} {...field('foodtruckPhone')} /></Field>
      </div>
      <Field label="Description food truck"><input className={inputCls} {...field('foodtruckDescription')} /></Field>
      <div className="flex items-center gap-3">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer</button>
        {saved && <span className="text-xs text-green-600 font-medium">Enregistré ✓</span>}
      </div>
    </form>
  );
}

// --- École ---
function EcoleAdmin() {
  const stored = useSettings();
  type EcoleFields = Pick<SiteSettings, 'ecoleName' | 'ecoleAddress' | 'ecolePhone' | 'ecoleEmail' | 'ecoleEffectif' | 'ecoleHoraires' | 'ecolePeriscolaire' | 'ecoleCollegeLycee' | 'ecoleInscriptions'>;
  const [form, setForm] = useState<EcoleFields>(stored);
  const [saved, setSaved] = useState(false);

  const field = (key: keyof EcoleFields) => ({
    value: form[key],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [key]: e.target.value });
      setSaved(false);
    },
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveSettings({ ...stored, ...form });
    setSaved(true);
  };

  return (
    <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
      <h2 className="font-bold text-gray-900 mb-1">École</h2>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Nom de l'école"><input className={inputCls} {...field('ecoleName')} /></Field>
        <Field label="Adresse"><input className={inputCls} {...field('ecoleAddress')} /></Field>
        <Field label="Téléphone"><input className={inputCls} {...field('ecolePhone')} /></Field>
        <Field label="Email"><input className={inputCls} {...field('ecoleEmail')} /></Field>
        <Field label="Effectif"><input className={inputCls} {...field('ecoleEffectif')} /></Field>
        <Field label="Horaires"><input className={inputCls} {...field('ecoleHoraires')} /></Field>
      </div>
      <Field label="Périscolaire & garderie (une ligne par info)">
        <textarea rows={3} className={inputCls} {...field('ecolePeriscolaire')} />
      </Field>
      <Field label="Collège & lycée (une ligne par info)">
        <textarea rows={2} className={inputCls} {...field('ecoleCollegeLycee')} />
      </Field>
      <Field label="Inscriptions scolaires">
        <input className={inputCls} {...field('ecoleInscriptions')} />
      </Field>
      <div className="flex items-center gap-3">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer</button>
        {saved && <span className="text-xs text-green-600 font-medium">Enregistré ✓</span>}
      </div>
    </form>
  );
}

// --- Vie municipale (conseil, commissions, délibérations, tableau d'affichage) ---
function VieMunicipaleAdmin() {
  const council = useCouncil();
  const commissions = useCommissions();
  const deliberations = useDeliberations();
  const affichage = useAffichage();

  return (
    <div className="space-y-10">
      <ListEditor<CouncilMember>
        title="Conseil municipal"
        items={council}
        onSave={saveCouncil}
        onReset={resetCouncil}
        confirmLabel="ce membre du conseil"
        makeNew={() => ({ id: newId(), name: '', role: 'Conseiller municipal', commission: '' })}
        rowLabel={m => m.name}
        rowSub={m => m.role}
        formTitle={isNew => isNew ? 'Nouveau membre' : 'Modifier le membre'}
        renderForm={(editing, setEditing) => (
          <>
            <Field label="Nom">
              <input required className={inputCls} value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Fonction">
                <input required className={inputCls} value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })} />
              </Field>
              <Field label="Commission (optionnel)">
                <input className={inputCls} value={editing.commission ?? ''} onChange={e => setEditing({ ...editing, commission: e.target.value })} />
              </Field>
            </div>
          </>
        )}
      />

      <ListEditor<Commission>
        title="Commissions"
        items={commissions}
        onSave={saveCommissions}
        onReset={resetCommissions}
        confirmLabel="cette commission"
        makeNew={() => ({ id: newId(), name: '', president: '', members: '' })}
        rowLabel={c => c.name}
        rowSub={c => `Présidée par ${c.president}`}
        formTitle={isNew => isNew ? 'Nouvelle commission' : 'Modifier la commission'}
        renderForm={(editing, setEditing) => (
          <>
            <Field label="Nom">
              <input required className={inputCls} value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            <Field label="Président(e)">
              <input required className={inputCls} value={editing.president} onChange={e => setEditing({ ...editing, president: e.target.value })} />
            </Field>
            <Field label="Membres (séparés par des virgules)">
              <input className={inputCls} value={editing.members} onChange={e => setEditing({ ...editing, members: e.target.value })} />
            </Field>
          </>
        )}
      />

      <ListEditor<Deliberation>
        title="Délibérations"
        items={deliberations}
        onSave={saveDeliberations}
        onReset={resetDeliberations}
        confirmLabel="cette délibération"
        makeNew={() => ({ id: newId(), ref: '', date: new Date().toLocaleDateString('fr-FR'), objet: '', vote: 'Unanimité' })}
        rowLabel={d => d.objet}
        rowSub={d => `${d.ref} · ${d.date}`}
        formTitle={isNew => isNew ? 'Nouvelle délibération' : 'Modifier la délibération'}
        renderForm={(editing, setEditing) => (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Référence">
                <input required className={inputCls} value={editing.ref} onChange={e => setEditing({ ...editing, ref: e.target.value })} />
              </Field>
              <Field label="Date (jj/mm/aaaa)">
                <input required className={inputCls} value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} />
              </Field>
            </div>
            <Field label="Objet">
              <input required className={inputCls} value={editing.objet} onChange={e => setEditing({ ...editing, objet: e.target.value })} />
            </Field>
            <Field label="Résultat du vote">
              <input required className={inputCls} value={editing.vote} onChange={e => setEditing({ ...editing, vote: e.target.value })} />
            </Field>
          </>
        )}
      />

      <ListEditor<AffichageItem>
        title="Tableau d'affichage"
        items={affichage}
        onSave={saveAffichage}
        onReset={resetAffichage}
        confirmLabel="cet avis"
        makeNew={() => ({ id: newId(), date: new Date().toLocaleDateString('fr-FR'), titre: '', type: 'Arrêté' })}
        rowLabel={a => a.titre}
        rowSub={a => `${a.type} · ${a.date}`}
        formTitle={isNew => isNew ? 'Nouvel avis' : 'Modifier l\'avis'}
        renderForm={(editing, setEditing) => (
          <>
            <Field label="Titre">
              <input required className={inputCls} value={editing.titre} onChange={e => setEditing({ ...editing, titre: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Type">
                <input required className={inputCls} value={editing.type} onChange={e => setEditing({ ...editing, type: e.target.value })} />
              </Field>
              <Field label="Date (jj/mm/aaaa)">
                <input required className={inputCls} value={editing.date} onChange={e => setEditing({ ...editing, date: e.target.value })} />
              </Field>
            </div>
          </>
        )}
      />
    </div>
  );
}

// --- Intercommunalité ---
function IntercommunaliteAdmin() {
  const stored = useSettings();
  type IntercoFields = Pick<SiteSettings, 'intercoName' | 'intercoIntro' | 'intercoChiffres'>;
  const [form, setForm] = useState<IntercoFields>(stored);
  const [saved, setSaved] = useState(false);
  const delegues = useIntercoDelegues();
  const competences = useIntercoCompetences();
  const liens = useIntercoLiens();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveSettings({ ...stored, ...form });
    setSaved(true);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
        <h2 className="font-bold text-gray-900">Présentation</h2>
        <Field label="Nom de l'intercommunalité">
          <input className={inputCls} value={form.intercoName} onChange={e => { setForm({ ...form, intercoName: e.target.value }); setSaved(false); }} />
        </Field>
        <Field label="Texte de présentation">
          <textarea rows={3} className={inputCls} value={form.intercoIntro} onChange={e => { setForm({ ...form, intercoIntro: e.target.value }); setSaved(false); }} />
        </Field>
        <Field label="Chiffres clés">
          <input className={inputCls} value={form.intercoChiffres} onChange={e => { setForm({ ...form, intercoChiffres: e.target.value }); setSaved(false); }} />
        </Field>
        <div className="flex items-center gap-3">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer</button>
          {saved && <span className="text-xs text-green-600 font-medium">Enregistré ✓</span>}
        </div>
      </form>

      <ListEditor<IntercoDelegue>
        title="Délégués communautaires"
        items={delegues}
        onSave={saveIntercoDelegues}
        onReset={resetIntercoDelegues}
        confirmLabel="ce délégué"
        makeNew={() => ({ id: newId(), name: '', role: 'Délégué titulaire' })}
        rowLabel={d => d.name}
        rowSub={d => d.role}
        formTitle={isNew => isNew ? 'Nouveau délégué' : 'Modifier le délégué'}
        renderForm={(editing, setEditing) => (
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nom">
              <input required className={inputCls} value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            <Field label="Rôle">
              <input required className={inputCls} value={editing.role} onChange={e => setEditing({ ...editing, role: e.target.value })} />
            </Field>
          </div>
        )}
      />

      <ListEditor<IntercoCompetence>
        title="Compétences exercées"
        items={competences}
        onSave={saveIntercoCompetences}
        onReset={resetIntercoCompetences}
        confirmLabel="cette compétence"
        makeNew={() => ({ id: newId(), emoji: '🏗️', title: '', desc: '' })}
        rowLabel={c => c.title}
        rowSub={c => c.desc}
        formTitle={isNew => isNew ? 'Nouvelle compétence' : 'Modifier la compétence'}
        renderForm={(editing, setEditing) => (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Emoji">
                <input className={inputCls} value={editing.emoji} onChange={e => setEditing({ ...editing, emoji: e.target.value })} />
              </Field>
              <Field label="Titre">
                <input required className={inputCls} value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
              </Field>
            </div>
            <Field label="Description">
              <input className={inputCls} value={editing.desc} onChange={e => setEditing({ ...editing, desc: e.target.value })} />
            </Field>
          </>
        )}
      />

      <ListEditor<IntercoLien>
        title="Liens utiles"
        items={liens}
        onSave={saveIntercoLiens}
        onReset={resetIntercoLiens}
        confirmLabel="ce lien"
        makeNew={() => ({ id: newId(), name: '', url: '', desc: '' })}
        rowLabel={l => l.name}
        rowSub={l => l.url || 'Lien à renseigner'}
        formTitle={isNew => isNew ? 'Nouveau lien' : 'Modifier le lien'}
        renderForm={(editing, setEditing) => (
          <>
            <Field label="Nom">
              <input required className={inputCls} value={editing.name} onChange={e => setEditing({ ...editing, name: e.target.value })} />
            </Field>
            <Field label="URL (laisser vide si inconnue)">
              <input className={inputCls} value={editing.url} onChange={e => setEditing({ ...editing, url: e.target.value })} />
            </Field>
            <Field label="Description">
              <input className={inputCls} value={editing.desc} onChange={e => setEditing({ ...editing, desc: e.target.value })} />
            </Field>
          </>
        )}
      />
    </div>
  );
}

// --- Démarches (catégories + questions/réponses) ---
function DemarchesAdminV2() {
  const items = useDemarches();

  const itemsToText = (entries: DemarcheFaqEntry[]) => entries.map(e => `${e.q} :: ${e.a}`).join('\n');
  const textToItems = (text: string): DemarcheFaqEntry[] =>
    text.split('\n').map(l => l.trim()).filter(Boolean).map(line => {
      const [q, ...rest] = line.split('::');
      return { id: newId(), q: (q ?? '').trim(), a: rest.join('::').trim() };
    });

  return (
    <div>
      <p className="text-xs text-gray-400 mb-4">
        Une question par ligne, au format <code>Question :: Réponse</code>.
      </p>
      <ListEditor<DemarcheCategory>
        title="Catégories de démarches"
        items={items}
        onSave={saveDemarches}
        onReset={resetDemarches}
        confirmLabel="cette catégorie"
        makeNew={() => ({ id: newId(), emoji: '📋', title: '', items: [] })}
        rowLabel={c => c.title}
        rowSub={c => `${c.items.length} question(s)`}
        formTitle={isNew => isNew ? 'Nouvelle catégorie' : 'Modifier la catégorie'}
        renderForm={(editing, setEditing) => (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Emoji">
                <input className={inputCls} value={editing.emoji} onChange={e => setEditing({ ...editing, emoji: e.target.value })} />
              </Field>
              <Field label="Titre">
                <input required className={inputCls} value={editing.title} onChange={e => setEditing({ ...editing, title: e.target.value })} />
              </Field>
            </div>
            <Field label="Questions / réponses">
              <textarea
                rows={6}
                className={inputCls}
                value={itemsToText(editing.items)}
                onChange={e => setEditing({ ...editing, items: textToItems(e.target.value) })}
              />
            </Field>
          </>
        )}
      />
    </div>
  );
}

function PrefectureAdmin() {
  const prefectureLiens = usePrefectureLiens();

  return (
    <ListEditor<LienUtile>
      title="🏛️ Services préfectoraux"
      items={prefectureLiens}
      onSave={savePrefectureLiens}
      onReset={resetPrefectureLiens}
      confirmLabel="ce lien"
      makeNew={() => ({ id: newId(), label: '', url: '' })}
      rowLabel={l => l.label}
      rowSub={l => l.url}
      formTitle={isNew => isNew ? 'Nouveau lien' : 'Modifier le lien'}
      renderForm={(editing, setEditing) => (
        <>
          <Field label="Libellé">
            <input required className={inputCls} value={editing.label} onChange={e => setEditing({ ...editing, label: e.target.value })} />
          </Field>
          <Field label="URL">
            <input required className={inputCls} value={editing.url} onChange={e => setEditing({ ...editing, url: e.target.value })} />
          </Field>
        </>
      )}
    />
  );
}

// --- Contact : sujets du formulaire ---
function ContactSubjectsAdmin() {
  const subjects = useContactSubjects();
  const [text, setText] = useState(() => subjects.join('\n'));
  const [saved, setSaved] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveContactSubjects(text.split('\n').map(l => l.trim()).filter(Boolean));
    setSaved(true);
  };

  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-400">
        Les coordonnées, horaires et le plan d'accès de la page Contact se modifient dans le groupe
        « Accueil » → onglet « Infos pratiques » (mêmes informations, affichées aux deux endroits).
      </p>
      <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
        <h2 className="font-bold text-gray-900">✏️ Sujets du formulaire de contact</h2>
        <Field label="Un sujet par ligne">
          <textarea rows={8} className={inputCls} value={text} onChange={e => { setText(e.target.value); setSaved(false); }} />
        </Field>
        <div className="flex items-center gap-3">
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg">Enregistrer</button>
          {saved && <span className="text-xs text-green-600 font-medium">Enregistré ✓</span>}
        </div>
      </form>
    </div>
  );
}

// --- Identité de la commune (données utilisées sur plusieurs pages : Découvrir, carte, météo) ---
function SettingsAdmin() {
  const stored = useSettings();
  type Fields = Pick<SiteSettings, 'communeName' | 'communeShort' | 'communePostal' | 'communeCodeInsee' | 'communeDepartment' | 'communeRegion' | 'communePopulation' | 'communeSuperficie' | 'communeAltitude' | 'communeLat' | 'communeLng'>;
  const [form, setForm] = useState<Fields>(stored);
  const [saved, setSaved] = useState(false);

  const field = (key: keyof Fields) => ({
    value: form[key] as string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [key]: e.target.value });
      setSaved(false);
    },
  });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    saveSettings({ ...stored, ...form });
    setSaved(true);
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <p className="text-xs text-gray-400">
        Ces informations ne sont pas propres à une seule page : elles alimentent la page « Découvrir »,
        la carte interactive et la météo locale.
      </p>
      <fieldset className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
        <legend className="font-bold text-gray-900 px-1">Commune</legend>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Nom complet"><input className={inputCls} {...field('communeName')} /></Field>
          <Field label="Nom court"><input className={inputCls} {...field('communeShort')} /></Field>
          <Field label="Code postal"><input className={inputCls} {...field('communePostal')} /></Field>
          <Field label="Code INSEE"><input className={inputCls} {...field('communeCodeInsee')} /></Field>
          <Field label="Département"><input className={inputCls} {...field('communeDepartment')} /></Field>
          <Field label="Région"><input className={inputCls} {...field('communeRegion')} /></Field>
          <Field label="Population"><input className={inputCls} {...field('communePopulation')} /></Field>
          <Field label="Superficie"><input className={inputCls} {...field('communeSuperficie')} /></Field>
          <Field label="Altitude"><input className={inputCls} {...field('communeAltitude')} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Latitude (centre carte &amp; météo)">
            <input type="number" step="0.0001" className={inputCls} value={form.communeLat}
              onChange={e => { setForm({ ...form, communeLat: parseFloat(e.target.value) }); setSaved(false); }} />
          </Field>
          <Field label="Longitude (centre carte &amp; météo)">
            <input type="number" step="0.0001" className={inputCls} value={form.communeLng}
              onChange={e => { setForm({ ...form, communeLng: parseFloat(e.target.value) }); setSaved(false); }} />
          </Field>
        </div>
      </fieldset>

      <div className="flex items-center gap-3">
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg">Enregistrer</button>
        {saved && <span className="text-xs text-green-600 font-medium">Enregistré ✓</span>}
      </div>
    </form>
  );
}

function PasswordGate({ onSuccess }: { onSuccess: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setChecking(true);
    const ok = await login(value);
    setChecking(false);
    if (ok) {
      onSuccess();
    } else {
      setError(true);
    }
  };

  return (
    <div className="max-w-sm mx-auto px-4 py-20">
      <form onSubmit={submit} className="bg-white border border-gray-200 rounded-2xl p-6 text-center">
        <div className="text-4xl mb-3" aria-hidden="true">🔒</div>
        <h1 className="font-bold text-gray-900 mb-1">Espace mairie</h1>
        <p className="text-xs text-gray-400 mb-4">Réservé aux agents municipaux</p>
        <input
          type="password"
          value={value}
          onChange={e => { setValue(e.target.value); setError(false); }}
          placeholder="Mot de passe"
          className={inputCls}
          autoFocus
        />
        {error && <p className="text-xs text-red-600 mt-2">Mot de passe incorrect.</p>}
        <button type="submit" disabled={checking} className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg disabled:opacity-60">
          {checking ? 'Vérification…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}

interface SubTab {
  key: string;
  label: string;
  render: () => ReactNode;
}

interface Group {
  key: string;
  label: string;
  hint: string;
  tabs: SubTab[];
}

// Même ordre que la navbar du site (NAV_ITEMS dans NavbarV2.tsx), avec les paramètres généraux en tête.
const GROUPS: Group[] = [
  {
    key: 'general',
    label: 'Identité de la commune',
    hint: 'Données générales utilisées sur plusieurs pages (Découvrir, carte, météo) — pas une page en particulier',
    tabs: [{ key: 'settings', label: 'Commune (nom, population, coordonnées GPS…)', render: () => <SettingsAdmin /> }],
  },
  {
    key: 'accueil',
    label: 'Accueil',
    hint: 'Page « / » — les mêmes sections que tu vois sur la page d\'accueil, dans le même ordre',
    tabs: [
      { key: 'accueil-bandeau', label: 'Bandeau', render: () => <AccueilBandeauAdmin /> },
      { key: 'accueil-news', label: 'Actualités', render: () => <NewsAdmin /> },
      { key: 'accueil-events', label: 'Agenda', render: () => <EventsAdmin /> },
      { key: 'accueil-maire', label: 'Mot du Maire', render: () => <MotDuMaireAdmin /> },
      { key: 'accueil-decouvrir', label: 'Découvrir Hindlingen', render: () => <AccueilDecouvrirAdmin /> },
      { key: 'accueil-infos', label: 'Infos pratiques', render: () => <InfosPratiquesAdmin /> },
      { key: 'accueil-docs', label: 'Téléchargements', render: () => <DocumentsAdmin /> },
    ],
  },
  {
    key: 'decouvrir',
    label: 'Découvrir',
    hint: 'Page « Découvrir »',
    tabs: [{ key: 'decouvrir', label: 'Historique, patrimoine, galerie', render: () => <DecouvrirAdmin /> }],
  },
  {
    key: 'viemunicipale',
    label: 'Vie municipale',
    hint: 'Page « Vie municipale »',
    tabs: [
      { key: 'viemunicipale', label: 'Conseil, commissions, délibérations', render: () => <VieMunicipaleAdmin /> },
      { key: 'documents', label: 'Documents (bulletins, comptes rendus…)', render: () => <DocumentsAdmin /> },
    ],
  },
  {
    key: 'demarches',
    label: 'Démarches',
    hint: 'Page « Démarches »',
    tabs: [
      { key: 'demarches', label: 'Catégories & questions', render: () => <DemarchesAdminV2 /> },
      { key: 'demarches-docs', label: 'Documents (formulaires, urbanisme)', render: () => <DocumentsAdmin /> },
      { key: 'demarches-prefecture', label: 'Services préfectoraux', render: () => <PrefectureAdmin /> },
    ],
  },
  {
    key: 'vielocale',
    label: 'Vie locale',
    hint: 'Page « Vie locale »',
    tabs: [
      { key: 'ecole', label: 'École', render: () => <EcoleAdmin /> },
      { key: 'marche', label: 'Marché & food truck', render: () => <MarcheAdmin /> },
      { key: 'associations', label: 'Associations', render: () => <AssociationsAdmin /> },
      { key: 'commerces', label: 'Commerces & entreprises', render: () => <CommercesAdmin /> },
    ],
  },
  {
    key: 'intercommunalite',
    label: 'Intercommunalité',
    hint: 'Page « Intercommunalité »',
    tabs: [{ key: 'intercommunalite', label: 'Présentation, délégués, liens', render: () => <IntercommunaliteAdmin /> }],
  },
  {
    key: 'actualites',
    label: 'Actualités & agenda',
    hint: 'Pages « Actualités » et « Agenda »',
    tabs: [
      { key: 'news', label: 'Actualités', render: () => <NewsAdmin /> },
      { key: 'events', label: 'Événements', render: () => <EventsAdmin /> },
    ],
  },
  {
    key: 'plan',
    label: 'Plan & carte',
    hint: 'Page « Plan & Carte »',
    tabs: [{ key: 'points', label: 'Lieux de la carte', render: () => <PointsAdmin /> }],
  },
  {
    key: 'contact',
    label: 'Contact',
    hint: 'Page « Contact »',
    tabs: [{ key: 'contact-subjects', label: 'Sujets du formulaire', render: () => <ContactSubjectsAdmin /> }],
  },
];

export default function AdminV2() {
  const [authed, setAuthed] = useState(() => getToken() !== null);
  const [groupKey, setGroupKey] = useState(GROUPS[0].key);
  const group = GROUPS.find(g => g.key === groupKey) ?? GROUPS[0];
  const [subKey, setSubKey] = useState(group.tabs[0].key);
  const activeTab = group.tabs.find(t => t.key === subKey) ?? group.tabs[0];

  if (!authed) return <PasswordGate onSuccess={() => setAuthed(true)} />;

  const selectGroup = (key: string) => {
    setGroupKey(key);
    const g = GROUPS.find(gr => gr.key === key);
    if (g) setSubKey(g.tabs[0].key);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-2">🔧 Espace mairie – Gestion du contenu</h1>
          <p className="text-blue-100 text-sm">Tout ce qui apparaît sur le site se modifie ici, rangé page par page : textes, photos (upload depuis cet ordinateur), actualités, événements, documents et toutes les listes.</p>
        </div>
        <button
          onClick={() => { clearToken(); window.location.reload(); }}
          className="flex-shrink-0 text-xs font-medium bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg whitespace-nowrap"
        >
          Se déconnecter
        </button>
      </div>

      <div className="flex items-start gap-2 bg-blue-50 border border-blue-100 text-blue-800 rounded-xl p-3 mb-6 text-xs">
        <AlertTriangle size={16} className="flex-shrink-0 mt-0.5" />
        <p>
          Les modifications (textes et photos) sont enregistrées sur le serveur et visibles par tous les
          visiteurs dès l'enregistrement.
        </p>
      </div>

      {/* Niveau 1 : pages du site */}
      <div className="flex gap-2 mb-2 overflow-x-auto pb-1">
        {GROUPS.map(g => (
          <button
            key={g.key}
            onClick={() => selectGroup(g.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${groupKey === g.key ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {g.label}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-400 mb-4">{group.hint}</p>

      {/* Niveau 2 : sous-sections de la page (si plusieurs) */}
      {group.tabs.length > 1 && (
        <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
          {group.tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setSubKey(t.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px whitespace-nowrap transition-colors ${subKey === t.key ? 'border-blue-600 text-blue-700' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}

      {group.tabs.length === 1 && <div className="mb-6" />}

      {activeTab.render()}
    </div>
  );
}
