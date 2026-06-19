import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Clock } from 'lucide-react';
import { COMMUNE_SHORT, MAIRIE_PHONE } from '../data';

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Accueil', href: '/' },
  {
    label: 'La Commune',
    href: '/la-commune',
    children: [
      { label: 'Présentation', href: '/la-commune#presentation' },
      { label: 'Historique', href: '/la-commune#historique' },
      { label: 'Patrimoine', href: '/la-commune#patrimoine' },
      { label: 'Étangs & Forêts', href: '/la-commune#etangs-forets' },
      { label: 'Galerie photos', href: '/la-commune#galerie' },
    ],
  },
  {
    label: 'Vie Municipale',
    href: '/vie-municipale',
    children: [
      { label: 'Conseil municipal', href: '/vie-municipale#conseil' },
      { label: 'Commissions', href: '/vie-municipale#commissions' },
      { label: 'Bulletins municipaux', href: '/vie-municipale#bulletins' },
      { label: 'Délibérations', href: '/vie-municipale#deliberations' },
      { label: 'Comptes rendus', href: '/vie-municipale#comptes-rendus' },
    ],
  },
  {
    label: 'Démarches',
    href: '/demarches',
    children: [
      { label: 'État civil & Mariage', href: '/demarches#etat-civil' },
      { label: 'PACS', href: '/demarches#pacs' },
      { label: 'Élections', href: '/demarches#elections' },
      { label: 'Urbanisme & PLU', href: '/demarches#urbanisme' },
      { label: 'Démarches en ligne', href: '/demarches#en-ligne' },
      { label: 'Documents PDF', href: '/demarches#documents' },
    ],
  },
  {
    label: 'Vie Locale',
    href: '/vie-locale',
    children: [
      { label: 'Écoles', href: '/vie-locale#ecoles' },
      { label: 'Associations', href: '/vie-locale#associations' },
      { label: 'Commerces & Services', href: '/vie-locale#commerces' },
    ],
  },
  { label: 'Intercommunalité', href: '/intercommunalite' },
  { label: 'Actualités', href: '/actualites' },
  { label: 'Événements', href: '/evenements' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md" role="banner">
      {/* Top bar */}
      <div className="bg-blue-900 text-white text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-1.5">
          <span className="font-semibold tracking-wide hidden sm:block">Commune de {COMMUNE_SHORT}</span>
          <div className="flex items-center gap-4 ml-auto">
            <a
              href={`tel:${MAIRIE_PHONE}`}
              className="flex items-center gap-1.5 hover:text-blue-200 transition-colors"
              aria-label={`Téléphone : ${MAIRIE_PHONE}`}
            >
              <Phone size={13} />
              <span>{MAIRIE_PHONE}</span>
            </a>
            <span className="flex items-center gap-1.5 text-blue-200">
              <Clock size={13} />
              <span>Lun–Ven 9h–12h</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`bg-white transition-shadow duration-200 ${scrolled ? 'shadow-md' : ''}`}
        aria-label="Navigation principale"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              aria-label={`Accueil – Mairie de ${COMMUNE_SHORT}`}
            >
              <div className="flex-shrink-0">
                <svg viewBox="0 0 44 52" className="w-9 h-11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2,2 H42 V36 Q36,48 22,52 Q8,48 2,36 Z" fill="#1d4ed8"/>
                  <path d="M2,2 H42 V36 Q36,48 22,52 Q8,48 2,36 Z" fill="none" stroke="#1e3a8a" strokeWidth="1"/>
                  <path d="M13,4 H31 V9 H27 V17 H35 V13 H40 V31 H35 V27 H27 V35 H31 V40 H13 V35 H17 V27 H9 V31 H4 V13 H9 V17 H17 V9 H13 Z" fill="white"/>
                </svg>
              </div>
              <div className="leading-tight">
                <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">Commune de</div>
                <div className="text-blue-900 font-bold text-lg leading-none">{COMMUNE_SHORT}</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_ITEMS.map((item) => (
                <div key={item.href} className="relative group">
                  <Link
                    to={item.href}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActive(item.href)
                        ? 'text-blue-700 bg-blue-50'
                        : 'text-gray-700 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    aria-haspopup={item.children ? 'true' : undefined}
                  >
                    {item.label}
                    {item.children && <ChevronDown size={14} aria-hidden="true" />}
                  </Link>

                  {item.children && (
                    <div
                      className="absolute top-full left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50"
                      role="menu"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                          role="menuitem"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div id="mobile-menu" className="lg:hidden border-t border-gray-100 bg-white">
            <nav className="px-4 py-3 space-y-1" aria-label="Menu mobile">
              {NAV_ITEMS.map((item) => (
                <div key={item.href}>
                  <div className="flex items-center justify-between">
                    <Link
                      to={item.href}
                      className={`flex-1 flex items-center py-2 text-sm font-medium rounded-md px-3 ${
                        isActive(item.href)
                          ? 'text-blue-700 bg-blue-50'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === item.href ? null : item.href)
                        }
                        className="p-2 text-gray-500 hover:text-blue-700"
                        aria-expanded={openDropdown === item.href}
                        aria-label={`Sous-menu ${item.label}`}
                      >
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${openDropdown === item.href ? 'rotate-180' : ''}`}
                        />
                      </button>
                    )}
                  </div>
                  {item.children && openDropdown === item.href && (
                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-100 pl-3">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className="block py-1.5 px-2 text-sm text-gray-600 hover:text-blue-700"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
}
