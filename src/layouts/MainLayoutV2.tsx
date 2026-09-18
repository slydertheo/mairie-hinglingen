import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavbarV2 from '../components/v2/NavbarV2';
import FooterV2 from '../components/v2/FooterV2';

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = hash.slice(1);
    // Le contenu de la page cible n'est monté qu'après la navigation : on attend un tick.
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

export default function MainLayoutV2() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <a href="#main-content" className="skip-link">Aller au contenu principal</a>
      <ScrollToHash />
      <NavbarV2 />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <FooterV2 />
    </div>
  );
}
