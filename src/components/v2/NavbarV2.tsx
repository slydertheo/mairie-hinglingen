import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const NAV_ROW1 = [
  { label: '🏠 Accueil', href: '/v2' },
  { label: 'Démarches', href: '/v2/demarches' },
  { label: 'École', href: '/v2/ecole' },
  { label: 'Commerces', href: '/v2/commerces' },
  { label: 'Intercommunalité', href: '/v2/intercommunalite' },
  { label: 'Associations', href: '/v2/associations' },
];

const NAV_ROW2 = [
  { label: 'Découvrir Hindlingen', href: '/v2/decouvrir' },
  { label: 'Vie Municipale', href: '/v2/vie-municipale' },
  { label: 'Actualités', href: '/v2/actualites' },
  { label: 'Agenda', href: '/v2/agenda' },
  { label: 'Infos Pratiques', href: '/v2/infos' },
  { label: 'Contact', href: '/v2/contact' },
];

export default function NavbarV2() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100" role="banner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo + Nav row 1 */}
        <div className="flex items-center justify-between h-16">
          <Link
            to="/v2"
            className="flex items-center gap-3 flex-shrink-0"
            aria-label="Accueil – Mairie de Hindlingen"
          >
            <svg viewBox="0 0 44 52" className="w-9 h-11 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M2,2 H42 V36 Q36,48 22,52 Q8,48 2,36 Z" fill="#1d4ed8"/>
              <path d="M2,2 H42 V36 Q36,48 22,52 Q8,48 2,36 Z" fill="none" stroke="#1e3a8a" strokeWidth="1"/>
              <path d="M13,4 H31 V9 H27 V17 H35 V13 H40 V31 H35 V27 H27 V35 H31 V40 H13 V35 H17 V27 H9 V31 H4 V13 H9 V17 H17 V9 H13 Z" fill="white"/>
            </svg>
            <span className="text-blue-700 font-bold text-xl tracking-tight">Mairie de Hindlingen</span>
          </Link>

          {/* Desktop nav row 1 */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_ROW1.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive(item.href)
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop nav row 2 */}
        <nav className="hidden lg:flex items-center justify-end gap-1 pb-2" aria-label="Navigation secondaire">
          {NAV_ROW2.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                isActive(item.href)
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="lg:hidden border-t border-gray-100 px-4 py-3 space-y-1 bg-white" aria-label="Menu mobile">
          {[...NAV_ROW1, ...NAV_ROW2].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 rounded-lg text-sm font-medium ${
                isActive(item.href) ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
