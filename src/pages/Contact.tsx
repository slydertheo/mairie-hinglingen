import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import SectionTitle from '../components/SectionTitle';
import { MAIRIE_ADDRESS, MAIRIE_CITY, MAIRIE_PHONE, MAIRIE_EMAIL, MAIRIE_HORAIRES, COMMUNE_SHORT } from '../data';

interface FormState {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const SUBJECTS = [
  'Renseignement général',
  'État civil',
  'Urbanisme',
  'Voirie & travaux',
  'Environnement',
  'Associations',
  'Autre demande',
];

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', subject: SUBJECTS[0], message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<FormState>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {};
    if (!form.name.trim()) newErrors.name = 'Votre nom est requis';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Adresse email invalide';
    if (!form.message.trim() || form.message.length < 10)
      newErrors.message = 'Votre message doit contenir au moins 10 caractères';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');
    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', phone: '', subject: SUBJECTS[0], message: '' });
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <>
      <PageHeader
        title="Contact"
        subtitle={`Contactez la Mairie de ${COMMUNE_SHORT} – Nous sommes à votre écoute`}
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Infos sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <SectionTitle title="Coordonnées" />
              <div className="space-y-4">
                <div className="card p-4 flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-0.5">Adresse</div>
                    <div className="text-gray-900">{MAIRIE_ADDRESS}</div>
                    <div className="text-gray-600">{MAIRIE_CITY}</div>
                  </div>
                </div>
                <div className="card p-4 flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone size={18} className="text-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-0.5">Téléphone</div>
                    <a href={`tel:${MAIRIE_PHONE}`} className="text-blue-700 hover:underline font-medium">{MAIRIE_PHONE}</a>
                  </div>
                </div>
                <div className="card p-4 flex gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail size={18} className="text-blue-700" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-500 mb-0.5">Email</div>
                    <a href={`mailto:${MAIRIE_EMAIL}`} className="text-blue-700 hover:underline font-medium break-all">{MAIRIE_EMAIL}</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="card p-5">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Clock size={16} className="text-blue-700" aria-hidden="true" />
                Horaires d'ouverture
              </h3>
              <ul className="space-y-2">
                {MAIRIE_HORAIRES.map((h) => (
                  <li
                    key={h.jour}
                    className={`flex justify-between text-sm py-1 border-b border-gray-50 last:border-0 ${
                      h.horaires === 'Fermé' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    <span className={`font-medium ${h.horaires === 'Fermé' ? 'text-gray-300' : 'text-gray-700'}`}>{h.jour}</span>
                    <span>{h.horaires}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 text-xs text-orange-600 bg-orange-50 rounded-lg px-3 py-2 border border-orange-100">
                ⚠️ Fermé les jours fériés
              </div>
            </div>
          </div>

          {/* Form & map */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact form */}
            <div>
              <SectionTitle title="Nous écrire" subtitle="Votre message sera traité dans les meilleurs délais" />

              {status === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-3" aria-hidden="true" />
                  <h3 className="text-xl font-bold text-green-800 mb-2">Message envoyé !</h3>
                  <p className="text-green-700">
                    Merci pour votre message. Nous vous répondrons dans les meilleurs délais.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 btn-primary bg-green-600 hover:bg-green-700"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5" aria-label="Formulaire de contact">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Nom complet <span className="text-red-500" aria-label="champ obligatoire">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        placeholder="Jean Dupont"
                        required
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={!!errors.name}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.name ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={11} aria-hidden="true" /> {errors.name}
                        </p>
                      )}
                    </div>
                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email <span className="text-red-500" aria-label="champ obligatoire">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        placeholder="jean.dupont@exemple.fr"
                        required
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        aria-invalid={!!errors.email}
                        className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                          errors.email ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle size={11} aria-hidden="true" /> {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Téléphone <span className="text-gray-400">(optionnel)</span>
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        placeholder="06 00 00 00 00"
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:border-gray-300 transition-colors"
                      />
                    </div>
                    {/* Subject */}
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Sujet
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:border-gray-300 transition-colors"
                      >
                        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
                      Message <span className="text-red-500" aria-label="champ obligatoire">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Écrivez votre message ici…"
                      aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                      aria-invalid={!!errors.message}
                      className={`w-full px-4 py-2.5 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y transition-colors ${
                        errors.message ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    />
                    {errors.message ? (
                      <p id="message-error" className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <AlertCircle size={11} aria-hidden="true" /> {errors.message}
                      </p>
                    ) : (
                      <p id="message-hint" className="text-gray-400 text-xs mt-1">
                        {form.message.length} caractères saisis
                      </p>
                    )}
                  </div>

                  {/* RGPD notice */}
                  <div className="bg-gray-50 rounded-xl p-3 text-xs text-gray-500 border border-gray-100">
                    🔒 Vos données personnelles sont collectées uniquement pour répondre à votre demande, 
                    conformément au RGPD. Elles ne seront pas transmises à des tiers.
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-primary w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                    aria-busy={status === 'sending'}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" aria-hidden="true" />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        <Send size={16} aria-hidden="true" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map */}
            <div>
              <SectionTitle title="Plan d'accès" />
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  title={`Plan d'accès à la Mairie de ${COMMUNE_SHORT}`}
                  src="https://www.openstreetmap.org/export/embed.html?bbox=7.2,47.8,7.4,47.9&layer=mapnik"
                  className="w-full h-72"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Carte fournie par <a href="https://www.openstreetmap.org" target="_blank" rel="noopener noreferrer" className="underline">OpenStreetMap</a> – Données © contributeurs OSM
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
