import { Link } from 'react-router-dom';
import { MAIRIE_ADDRESS, MAIRIE_CITY, MAIRIE_PHONE, MAIRIE_EMAIL } from '../../data';

export default function FooterV2() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-blue-700 text-white mt-10" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <svg viewBox="0 0 44 52" className="w-8 h-10 flex-shrink-0" fill="none" aria-hidden="true">
                <path d="M2,2 H42 V36 Q36,48 22,52 Q8,48 2,36 Z" fill="white" fillOpacity="0.2"/>
                <path d="M2,2 H42 V36 Q36,48 22,52 Q8,48 2,36 Z" fill="none" stroke="white" strokeWidth="1.5"/>
                <path d="M13,4 H31 V9 H27 V17 H35 V13 H40 V31 H35 V27 H27 V35 H31 V40 H13 V35 H17 V27 H9 V31 H4 V13 H9 V17 H17 V9 H13 Z" fill="white"/>
              </svg>
              <span className="font-bold text-lg">Mairie de Hindlingen</span>
            </div>
            <p className="text-blue-100 text-sm">Site officiel de la commune de Hindlingen – Haut-Rhin, Grand Est.</p>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-blue-100 uppercase text-xs tracking-wider">Coordonnées</h3>
            <ul className="space-y-1.5 text-sm text-blue-100">
              <li>📍 {MAIRIE_ADDRESS}, {MAIRIE_CITY}</li>
              <li>📞 <a href={`tel:${MAIRIE_PHONE}`} className="hover:text-white">{MAIRIE_PHONE}</a></li>
              <li>✉️ <a href={`mailto:${MAIRIE_EMAIL}`} className="hover:text-white">{MAIRIE_EMAIL}</a></li>
              <li>🕐 Lun–Ven 9h–12h / 14h–17h</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-blue-100 uppercase text-xs tracking-wider">Liens utiles</h3>
            <ul className="space-y-1.5 text-sm text-blue-100">
              {[
                { label: 'Démarches', href: '/v2/demarches' },
                { label: 'Vie Municipale', href: '/v2/vie-municipale' },
                { label: 'Actualités', href: '/v2/actualites' },
                { label: 'Contact', href: '/v2/contact' },
              ].map(l => (
                <li key={l.href}><Link to={l.href} className="hover:text-white">→ {l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-blue-600 py-3 text-center text-xs text-blue-200">
        © {year} Mairie de Hindlingen – <a href="#" className="underline hover:text-white">Mentions légales</a> – <a href="#" className="underline hover:text-white">Politique de confidentialité</a>
      </div>
    </footer>
  );
}
