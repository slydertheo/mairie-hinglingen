import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useSettings } from '../../lib/contentStore';

const MAP_DELTA = 0.01;

const SUBJECTS = ['Renseignement général', 'État civil', 'Urbanisme', 'Voirie & travaux', 'Environnement', 'Associations', 'Autre demande'];

export default function ContactV2() {
  const settings = useSettings();
  const { mairieAddress: MAIRIE_ADDRESS, mairieCity: MAIRIE_CITY, mairiePhone: MAIRIE_PHONE, mairieEmail: MAIRIE_EMAIL, mairieHoraires: MAIRIE_HORAIRES, communeShort: COMMUNE_SHORT, communeLat, communeLng } = settings;
  const MAP_BBOX = [communeLng - MAP_DELTA, communeLat - MAP_DELTA, communeLng + MAP_DELTA, communeLat + MAP_DELTA].join(',');
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Nom requis';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Email invalide';
    if (form.message.trim().length < 10) e.message = 'Message trop court';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    // Pas de back-end disponible : on ouvre le client mail de l'usager, pré-rempli, vers l'adresse de la mairie.
    const body = `Nom : ${form.name}\nEmail : ${form.email}\nTéléphone : ${form.phone || 'non renseigné'}\n\n${form.message}`;
    const mailto = `mailto:${MAIRIE_EMAIL}?subject=${encodeURIComponent(`[Site mairie] ${form.subject}`)}&body=${encodeURIComponent(body)}`;
    window.setTimeout(() => {
      window.location.href = mailto;
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
    }, 600);
  };

  const change = (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = ev.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errors[name]) setErrors(e => ({ ...e, [name]: '' }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">📬 Contact</h1>
        <p className="text-blue-100">La Mairie de {COMMUNE_SHORT} est à votre écoute</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Infos */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-blue-700 mb-4">📍 Coordonnées</h2>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex gap-2"><span aria-hidden="true">📍</span> <span>{MAIRIE_ADDRESS}<br />{MAIRIE_CITY}</span></li>
              <li className="flex gap-2"><span aria-hidden="true">📞</span> <a href={`tel:${MAIRIE_PHONE}`} className="text-blue-600 hover:underline">{MAIRIE_PHONE}</a></li>
              <li className="flex gap-2"><span aria-hidden="true">✉️</span> <a href={`mailto:${MAIRIE_EMAIL}`} className="text-blue-600 hover:underline break-all">{MAIRIE_EMAIL}</a></li>
            </ul>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <h2 className="font-bold text-blue-700 mb-3">🕐 Horaires</h2>
            <ul className="space-y-1.5 text-sm">
              {MAIRIE_HORAIRES.map(h => (
                <li key={h.jour} className={`flex justify-between ${h.horaires === 'Fermé' ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span className="font-medium">{h.jour}</span>
                  <span>{h.horaires}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 text-xs text-orange-600 bg-orange-50 rounded-lg p-2">⚠️ Fermé les jours fériés</div>
          </div>
        </div>

        {/* Formulaire + carte */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <h2 className="font-bold text-blue-700 mb-5">✏️ Nous écrire</h2>

            {status === 'success' ? (
              <div className="text-center py-8">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-3" aria-hidden="true" />
                <h3 className="text-lg font-bold text-green-800 mb-2">Votre client mail va s'ouvrir</h3>
                <p className="text-green-700 text-sm">Un message pré-rempli à destination de {MAIRIE_EMAIL} a été préparé : il ne reste qu'à l'envoyer depuis votre messagerie.</p>
                <button onClick={() => setStatus('idle')} className="mt-4 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-full text-sm transition-colors">Envoyer un autre message</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { id: 'name', label: 'Nom complet *', type: 'text', placeholder: 'Jean Dupont', autoComplete: 'name' },
                    { id: 'email', label: 'Email *', type: 'email', placeholder: 'jean@exemple.fr', autoComplete: 'email' },
                    { id: 'phone', label: 'Téléphone', type: 'tel', placeholder: '06 00 00 00 00', autoComplete: 'tel' },
                  ].map(f => (
                    <div key={f.id}>
                      <label htmlFor={f.id} className="block text-sm font-medium text-gray-700 mb-1">{f.label}</label>
                      <input
                        id={f.id} name={f.id} type={f.type}
                        value={form[f.id as keyof typeof form]}
                        onChange={change}
                        placeholder={f.placeholder}
                        autoComplete={f.autoComplete}
                        aria-invalid={!!errors[f.id]}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors[f.id] ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}
                      />
                      {errors[f.id] && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors[f.id]}</p>}
                    </div>
                  ))}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
                    <select id="subject" name="subject" value={form.subject} onChange={change}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                      {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea id="message" name="message" rows={5} value={form.message} onChange={change}
                    placeholder="Votre message…" aria-invalid={!!errors.message}
                    className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y ${errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200'}`} />
                  {errors.message && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.message}</p>}
                </div>
                <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500">🔒 Vos données sont traitées conformément au RGPD et ne seront pas transmises à des tiers.</div>
                <button type="submit" disabled={status === 'sending'}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-full transition-colors disabled:opacity-60 text-sm">
                  {status === 'sending' ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Envoi…</> : <><Send size={15} />Envoyer</>}
                </button>
              </form>
            )}
          </div>

          {/* Carte */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-bold text-blue-700">🗺️ Plan d'accès</h2>
            </div>
            <iframe
              title={`Plan d'accès – Mairie de ${COMMUNE_SHORT}`}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${MAP_BBOX}&layer=mapnik&marker=${communeLat},${communeLng}`}
              className="w-full h-64"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
