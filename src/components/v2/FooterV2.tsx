import { Link } from 'react-router-dom';
import { useSettings } from '../../lib/contentStore';
import SocialLinks from './SocialLinks';

export default function FooterV2() {
  const year = new Date().getFullYear();
  const { mairieAddress, mairieCity, mairiePhone, mairieEmail, communeName } = useSettings();
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
              <span className="font-bold text-lg">{communeName}</span>
            </div>
            <p className="text-blue-100 text-sm mb-4">Site officiel de la commune de Hindlingen – Haut-Rhin, Grand Est.</p>
            <SocialLinks variant="dark" />
          </div>
          <div>
            <h3 className="font-bold mb-3 text-blue-100 uppercase text-xs tracking-wider">Coordonnées</h3>
            <ul className="space-y-1.5 text-sm text-blue-100">
              <li>📍 {mairieAddress}, {mairieCity}</li>
              <li>📞 <a href={`tel:${mairiePhone}`} className="hover:text-white">{mairiePhone}</a></li>
              <li>✉️ <a href={`mailto:${mairieEmail}`} className="hover:text-white">{mairieEmail}</a></li>
              <li>🕐 Lun–Ven 9h–12h / 14h–17h</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-3 text-blue-100 uppercase text-xs tracking-wider">Liens utiles</h3>
            <ul className="space-y-1.5 text-sm text-blue-100">
              {[
                { label: 'Démarches', href: '/demarches' },
                { label: 'Vie Municipale', href: '/vie-municipale' },
                { label: 'Actualités', href: '/actualites' },
                { label: 'Plan & Carte', href: '/plan-commune' },
                { label: 'Contact', href: '/contact' },
                { label: 'Plan du site', href: '/plan-du-site' },
              ].map(l => (
                <li key={l.href}><Link to={l.href} className="hover:text-white">→ {l.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-blue-600 py-3 text-center text-xs text-blue-200">
        © {year} {communeName} – <a href="#" className="underline hover:text-white">Mentions légales</a> – <a href="#" className="underline hover:text-white">Politique de confidentialité</a> – <Link to="/admin" className="underline hover:text-white">Espace mairie</Link>
      </div>
    </footer>
  );
}
