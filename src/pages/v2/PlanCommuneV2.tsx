import CommuneMap from '../../components/v2/CommuneMap';
import WeatherWidget from '../../components/v2/WeatherWidget';
import { usePoints, useSettings } from '../../lib/contentStore';

const CATEGORY_EMOJI: Record<string, string> = {
  Mairie: '🏛️',
  École: '🏫',
  Nature: '🌳',
  Équipement: '🎪',
  Culte: '⛪',
  Commerce: '🏪',
};

export default function PlanCommuneV2() {
  const points = usePoints();
  const { communeLat, communeLng } = useSettings();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">🗺️ Plan &amp; Carte de la commune</h1>
        <p className="text-blue-100">Localisez la mairie, l'école, les commerces et les lieux remarquables de Hindlingen</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <section aria-labelledby="carte-title">
            <h2 id="carte-title" className="text-xl font-bold text-blue-700 mb-4">Carte interactive</h2>
            <CommuneMap height="480px" />
          </section>
        </div>

        <div className="space-y-6">
          <WeatherWidget />

          <section className="bg-white border border-gray-200 rounded-2xl p-5" aria-labelledby="lieux-title">
            <h2 id="lieux-title" className="font-bold text-gray-900 text-sm mb-3">📍 Lieux &amp; services</h2>
            <ul className="space-y-2">
              {points.map(p => (
                <li key={p.id} className="flex items-start gap-2 text-sm">
                  <span className="flex-shrink-0" aria-hidden="true">{CATEGORY_EMOJI[p.category] ?? '📍'}</span>
                  <div>
                    <div className="font-medium text-gray-800">{p.name}</div>
                    {p.description && <div className="text-xs text-gray-500">{p.description}</div>}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="mt-8 bg-white border border-gray-200 rounded-2xl p-6" aria-labelledby="radar-title">
        <h2 id="radar-title" className="text-xl font-bold text-blue-700 mb-4">🌧️ Radar météo en direct</h2>
        <p className="text-gray-500 text-sm mb-4">
          Visualisez les précipitations et la couverture nuageuse en temps réel au-dessus de la commune.
        </p>
        <div className="rounded-2xl overflow-hidden border border-gray-200" style={{ height: '420px' }}>
          <iframe
            title="Radar météo en direct sur Hindlingen"
            src={`https://embed.windy.com/embed2.html?lat=${communeLat}&lon=${communeLng}&detailLat=${communeLat}&detailLon=${communeLng}&width=650&height=450&zoom=10&level=surface&overlay=radar&menu=&message=true&marker=true&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1`}
            className="w-full h-full border-0"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}
