import { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';

interface NavChild {
  label: string;
  href: string;
}

interface NavEntry {
  label: string;
  href: string;
  children?: NavChild[];
}

const NAV_ITEMS: NavEntry[] = [
  { label: 'Accueil', href: '/' },
  { label: 'Découvrir', href: '/decouvrir' },
  { label: 'Vie Municipale', href: '/vie-municipale' },
  { label: 'Démarches', href: '/demarches' },
  {
    label: 'Vie Locale',
    href: '/vie-locale',
    children: [
      { label: 'École', href: '/vie-locale#ecole' },
      { label: 'Marché & food truck', href: '/vie-locale#marche' },
      { label: 'Associations', href: '/vie-locale#associations' },
      { label: 'Commerces & entreprises', href: '/vie-locale#commerces' },
    ],
  },
  { label: 'Intercommunalité', href: '/intercommunalite' },
  {
    label: 'Actualités',
    href: '/actualites',
    children: [
      { label: 'Toutes les actualités', href: '/actualites' },
      { label: 'Agenda des événements', href: '/agenda' },
    ],
  },
  { label: 'Plan & Carte', href: '/plan-commune' },
  { label: 'Contact', href: '/contact' },
];

function NavLink({ item, isActive }: { item: NavEntry; isActive: (href: string) => boolean }) {
  const [hover, setHover] = useState(false);
  const closeTimer = useRef<number | null>(null);

  if (!item.children) {
    return (
      <Link
        to={item.href}
        className={`px-3.5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
          isActive(item.href) ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-current={isActive(item.href) ? 'page' : undefined}
      >
        {item.label}
      </Link>
    );
  }

  const open = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setHover(true);
  };
  const close = () => {
    closeTimer.current = window.setTimeout(() => setHover(false), 120);
  };

  return (
    <div
      className="relative"
      onMouseEnter={open}
      onMouseLeave={close}
      onFocus={open}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setHover(false); }}
    >
      <Link
        to={item.href}
        className={`flex items-center gap-1 px-3.5 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
          isActive(item.href) ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-current={isActive(item.href) ? 'page' : undefined}
        aria-haspopup="true"
        aria-expanded={hover}
      >
        {item.label}
        <ChevronDown size={13} aria-hidden="true" className={`transition-transform ${hover ? 'rotate-180' : ''}`} />
      </Link>
      {hover && (
        <div className="absolute left-0 top-full pt-1 w-56 z-20">
          <ul className="bg-white border border-gray-100 rounded-xl shadow-lg py-2" role="menu">
            {item.children.map((c) => (
              <li key={c.href} role="none">
                <Link
                  to={c.href}
                  role="menuitem"
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function NavbarV2() {
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="bg-white shadow-sm border-b border-gray-100" role="banner">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-4">
          <Link
            to="/"
            className="flex items-center gap-3 flex-shrink-0 justify-self-start"
            aria-label="Accueil – Mairie de Hindlingen"
          >
            <svg viewBox="0 0 44 52" className="w-9 h-11 flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M2,2 H42 V36 Q36,48 22,52 Q8,48 2,36 Z" fill="#1d4ed8"/>
              <path d="M2,2 H42 V36 Q36,48 22,52 Q8,48 2,36 Z" fill="none" stroke="#1e3a8a" strokeWidth="1"/>
              <path d="M13,4 H31 V9 H27 V17 H35 V13 H40 V31 H35 V27 H27 V35 H31 V40 H13 V35 H17 V27 H9 V31 H4 V13 H9 V17 H17 V9 H13 Z" fill="white"/>
            </svg>
            <span className="text-blue-700 font-bold text-xl tracking-tight whitespace-nowrap">Mairie de Hindlingen</span>
          </Link>

          {/* Desktop nav – centrée indépendamment de la largeur du logo */}
          <nav className="hidden lg:flex items-center gap-0.5 justify-self-center" aria-label="Navigation principale">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.href} item={item} isActive={isActive} />
            ))}
          </nav>

          {/* Espace réservé à droite pour équilibrer la grille (miroir du logo) */}
          <div className="hidden lg:block" aria-hidden="true" />

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md flex-shrink-0"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="lg:hidden border-t border-gray-100 px-4 py-3 space-y-1 bg-white" aria-label="Menu mobile">
          {NAV_ITEMS.map((item) => (
            <div key={item.href}>
              <div className="flex items-center">
                <Link
                  to={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex-1 block px-4 py-2 rounded-lg text-sm font-medium ${
                    isActive(item.href) ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <button
                    onClick={() => setMobileGroup(g => (g === item.href ? null : item.href))}
                    aria-expanded={mobileGroup === item.href}
                    aria-label={`Afficher les sous-rubriques de ${item.label}`}
                    className="p-2 text-gray-400"
                  >
                    <ChevronDown size={16} className={`transition-transform ${mobileGroup === item.href ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </div>
              {item.children && mobileGroup === item.href && (
                <div className="pl-4 space-y-1 py-1">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      to={c.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-1.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
