import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import MainLayoutV2 from './layouts/MainLayoutV2';
import Home from './pages/Home';
import HomeV2 from './pages/HomeV2';
import Commune from './pages/Commune';
import VieMunicipale from './pages/VieMunicipale';
import DemarchesAdmin from './pages/DemarchesAdmin';
import VieLocale from './pages/VieLocale';
import Intercommunalite from './pages/Intercommunalite';
import Actualites from './pages/Actualites';
import Evenements from './pages/Evenements';
import Contact from './pages/Contact';
import CommuneV2 from './pages/v2/CommuneV2';
import VieMunicipaleV2 from './pages/v2/VieMunicipaleV2';
import DemarchesV2 from './pages/v2/DemarchesV2';
import VieLocaleV2 from './pages/v2/VieLocaleV2';
import IntercommunaliteV2 from './pages/v2/IntercommunaliteV2';
import ActualitesV2 from './pages/v2/ActualitesV2';
import AgendaV2 from './pages/v2/AgendaV2';
import ContactV2 from './pages/v2/ContactV2';
import PlanDuSiteV2 from './pages/v2/PlanDuSiteV2';
import BrochureEditor from './pages/BrochureEditor';

// La carte interactive (Leaflet) et l'espace d'administration sont chargés à la demande
// pour ne pas alourdir le chargement initial du site pour les visiteurs.
const PlanCommuneV2 = lazy(() => import('./pages/v2/PlanCommuneV2'));
const AdminV2 = lazy(() => import('./pages/v2/AdminV2'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Maquette 2 – Style Friesen (maquette par défaut) */}
        <Route element={<MainLayoutV2 />}>
          <Route index element={<HomeV2 />} />
          <Route path="decouvrir" element={<CommuneV2 />} />
          <Route path="vie-municipale" element={<VieMunicipaleV2 />} />
          <Route path="demarches" element={<DemarchesV2 />} />
          <Route path="vie-locale" element={<VieLocaleV2 />} />
          <Route path="intercommunalite" element={<IntercommunaliteV2 />} />
          <Route path="actualites" element={<ActualitesV2 />} />
          <Route path="agenda" element={<AgendaV2 />} />
          <Route
            path="plan-commune"
            element={(
              <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">Chargement de la carte…</div>}>
                <PlanCommuneV2 />
              </Suspense>
            )}
          />
          <Route path="plan-du-site" element={<PlanDuSiteV2 />} />
          <Route path="contact" element={<ContactV2 />} />
          <Route
            path="admin"
            element={(
              <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">Chargement de l'espace mairie…</div>}>
                <AdminV2 />
              </Suspense>
            )}
          />
        </Route>
        {/* Maquette 1 – Moderne */}
        <Route path="/moderne" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="brochure" element={<BrochureEditor />} />
          <Route path="la-commune" element={<Commune />} />
          <Route path="vie-municipale" element={<VieMunicipale />} />
          <Route path="demarches" element={<DemarchesAdmin />} />
          <Route path="vie-locale" element={<VieLocale />} />
          <Route path="intercommunalite" element={<Intercommunalite />} />
          <Route path="actualites" element={<Actualites />} />
          <Route path="evenements" element={<Evenements />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
