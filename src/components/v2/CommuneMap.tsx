import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/leaflet.css';
import { usePoints, useSettings } from '../../lib/contentStore';

// Vite ne résout pas les chemins d'images par défaut de Leaflet : on les redéfinit explicitement.
const defaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const CATEGORY_COLORS: Record<string, string> = {
  Mairie: '#1d4ed8',
  École: '#f59e0b',
  Nature: '#16a34a',
  Équipement: '#7c3aed',
  Culte: '#6b7280',
  Commerce: '#dc2626',
};

const CATEGORY_EMOJI: Record<string, string> = {
  Mairie: '🏛️',
  École: '🏫',
  Nature: '🌳',
  Équipement: '🎪',
  Culte: '⛪',
  Commerce: '🏪',
};

interface CommuneMapProps {
  height?: string;
}

export default function CommuneMap({ height = '420px' }: CommuneMapProps) {
  const points = usePoints();
  const { communeLat, communeLng } = useSettings();
  return (
    <div>
      <div className="rounded-2xl overflow-hidden border border-gray-200" style={{ height }}>
        <MapContainer
          center={[communeLat, communeLng]}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
          aria-label="Carte de la commune de Hindlingen"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {points.map(p => (
            <Marker key={p.id} position={[p.lat, p.lng]} icon={defaultIcon}>
              <Popup>
                <strong>{CATEGORY_EMOJI[p.category] ?? '📍'} {p.name}</strong>
                {p.description && <div className="text-xs text-gray-600 mt-1">{p.description}</div>}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="flex flex-wrap gap-3 mt-4">
        {Object.entries(CATEGORY_EMOJI).map(([cat, emoji]) => (
          <span key={cat} className="inline-flex items-center gap-1.5 text-xs text-gray-600 bg-gray-50 border border-gray-200 rounded-full px-3 py-1">
            <span aria-hidden="true" style={{ color: CATEGORY_COLORS[cat] }}>{emoji}</span>
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
