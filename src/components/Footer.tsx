import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Facebook, ExternalLink } from 'lucide-react';
import {
  COMMUNE_SHORT,
  MAIRIE_ADDRESS,
  MAIRIE_CITY,
  MAIRIE_PHONE,
  MAIRIE_EMAIL,
  MAIRIE_HORAIRES,
} from '../data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Identité */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-shrink-0">
                <svg viewBox="0 0 44 52" className="w-9 h-11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2,2 H42 V36 Q36,48 22,52 Q8,48 2,36 Z" fill="#1e40af"/>
                  <path d="M2,2 H42 V36 Q36,48 22,52 Q8,48 2,36 Z" fill="none" stroke="#93c5fd" strokeWidth="1"/>
                  <path d="M13,4 H31 V9 H27 V17 H35 V13 H40 V31 H35 V27 H27 V35 H31 V40 H13 V35 H17 V27 H9 V31 H4 V13 H9 V17 H17 V9 H13 Z" fill="white"/>
                </svg>
              </div>
              <div>
                <div className="text-xs text-blue-300 font-medium uppercase tracking-wider">Commune de</div>
                <div className="font-bold text-lg leading-none">{COMMUNE_SHORT}</div>
              </div>
            </div>
            <p className="text-blue-200 text-sm leading-relaxed">
              Site officiel de la Mairie de {COMMUNE_SHORT}. Votre commune à votre service.
            </p>
            <div className="flex gap-3 mt-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-blue-800 hover:bg-blue-700 rounded-lg transition-colors"
                aria-label="Page Facebook de la commune"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Coordonnées */}
          <div>
            <h3 className="font-semibold text-blue-100 mb-4 text-sm uppercase tracking-wider">Nous contacter</h3>
            <ul className="space-y-3 text-sm text-blue-200">
              <li className="flex gap-2.5">
                <MapPin size={15} className="text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>{MAIRIE_ADDRESS}<br />{MAIRIE_CITY}</span>
              </li>
              <li className="flex gap-2.5">
                <Phone size={15} className="text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <a href={`tel:${MAIRIE_PHONE}`} className="hover:text-white transition-colors">{MAIRIE_PHONE}</a>
              </li>
              <li className="flex gap-2.5">
                <Mail size={15} className="text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <a href={`mailto:${MAIRIE_EMAIL}`} className="hover:text-white transition-colors break-all">{MAIRIE_EMAIL}</a>
              </li>
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <h3 className="font-semibold text-blue-100 mb-4 text-sm uppercase tracking-wider">Horaires d'ouverture</h3>
            <div className="flex items-start gap-2 mb-3">
              <Clock size={15} className="text-blue-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <ul className="text-sm text-blue-200 space-y-1">
                {MAIRIE_HORAIRES.filter(h => h.horaires !== 'Fermé').map((h) => (
                  <li key={h.jour} className="flex gap-2">
                    <span className="font-medium text-blue-100 w-14">{h.jour}</span>
                    <span>{h.horaires}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Liens utiles */}
          <div>
            <h3 className="font-semibold text-blue-100 mb-4 text-sm uppercase tracking-wider">Liens utiles</h3>
            <ul className="space-y-2 text-sm text-blue-200">
              {[
                { label: 'La Commune', href: '/la-commune' },
                { label: 'Vie Municipale', href: '/vie-municipale' },
                { label: 'Démarches', href: '/demarches' },
                { label: 'Actualités', href: '/actualites' },
                { label: 'Contact', href: '/contact' },
              ].map((l) => (
                <li key={l.href}>
                  <Link to={l.href} className="hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://www.service-public.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  Service-Public.fr <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.haut-rhin.gouv.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-white transition-colors"
                >
                  Préfecture du Haut-Rhin <ExternalLink size={12} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-blue-300">
          <span>© {currentYear} Mairie de {COMMUNE_SHORT} – Tous droits réservés</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de confidentialité</a>
            <a href="#" className="hover:text-white transition-colors">Accessibilité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
