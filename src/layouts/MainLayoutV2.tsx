import { Outlet } from 'react-router-dom';
import NavbarV2 from '../components/v2/NavbarV2';
import FooterV2 from '../components/v2/FooterV2';

export default function MainLayoutV2() {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <a href="#main-content" className="skip-link">Aller au contenu principal</a>
      <NavbarV2 />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        <Outlet />
      </main>
      <FooterV2 />
    </div>
  );
}
