import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  image?: string;
}

export default function PageHeader({ title, subtitle, breadcrumbs, image }: PageHeaderProps) {
  return (
    <div
      className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 md:py-16 overflow-hidden"
      role="banner"
    >
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay"
          aria-hidden="true"
        />
      )}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Fil d'Ariane" className="mb-3">
            <ol className="flex items-center flex-wrap gap-1 text-sm text-blue-200">
              <li>
                <Link to="/" className="flex items-center gap-1 hover:text-white transition-colors">
                  <Home size={13} aria-hidden="true" />
                  Accueil
                </Link>
              </li>
              {breadcrumbs.map((b, i) => (
                <li key={i} className="flex items-center gap-1">
                  <ChevronRight size={13} aria-hidden="true" />
                  {b.href ? (
                    <Link to={b.href} className="hover:text-white transition-colors">
                      {b.label}
                    </Link>
                  ) : (
                    <span className="text-white font-medium" aria-current="page">
                      {b.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
        {subtitle && <p className="text-blue-100 text-lg max-w-2xl">{subtitle}</p>}
      </div>
    </div>
  );
}
