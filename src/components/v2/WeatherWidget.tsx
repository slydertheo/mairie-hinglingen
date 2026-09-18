import { useEffect, useState } from 'react';
import { useSettings } from '../../lib/contentStore';

interface DailyForecast {
  date: string;
  max: number;
  min: number;
  code: number;
}

interface WeatherState {
  temperature: number;
  code: number;
  wind: number;
  daily: DailyForecast[];
}

// Codes météo (norme WMO) utilisés par l'API Open-Meteo, simplifiés en emoji + libellé.
const WEATHER_CODES: Record<number, { emoji: string; label: string }> = {
  0: { emoji: '☀️', label: 'Ciel dégagé' },
  1: { emoji: '🌤️', label: 'Plutôt dégagé' },
  2: { emoji: '⛅', label: 'Partiellement nuageux' },
  3: { emoji: '☁️', label: 'Couvert' },
  45: { emoji: '🌫️', label: 'Brouillard' },
  48: { emoji: '🌫️', label: 'Brouillard givrant' },
  51: { emoji: '🌦️', label: 'Bruine légère' },
  53: { emoji: '🌦️', label: 'Bruine' },
  55: { emoji: '🌧️', label: 'Bruine dense' },
  61: { emoji: '🌧️', label: 'Pluie légère' },
  63: { emoji: '🌧️', label: 'Pluie' },
  65: { emoji: '🌧️', label: 'Pluie forte' },
  71: { emoji: '🌨️', label: 'Neige légère' },
  73: { emoji: '🌨️', label: 'Neige' },
  75: { emoji: '❄️', label: 'Neige forte' },
  80: { emoji: '🌦️', label: 'Averses' },
  81: { emoji: '🌧️', label: 'Averses fortes' },
  95: { emoji: '⛈️', label: 'Orage' },
  96: { emoji: '⛈️', label: 'Orage avec grêle' },
};

function describe(code: number) {
  return WEATHER_CODES[code] ?? { emoji: '🌡️', label: 'Météo indisponible' };
}

export default function WeatherWidget() {
  const { communeLat, communeLng, communeShort } = useSettings();
  const [weather, setWeather] = useState<WeatherState | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${communeLat}&longitude=${communeLng}&current=temperature_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=Europe%2FParis&forecast_days=4`;

    fetch(url, { signal: controller.signal })
      .then(res => {
        if (!res.ok) throw new Error('weather fetch failed');
        return res.json();
      })
      .then(data => {
        setWeather({
          temperature: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
          wind: Math.round(data.current.wind_speed_10m),
          daily: (data.daily.time as string[]).slice(1, 4).map((date: string, i: number) => ({
            date,
            max: Math.round(data.daily.temperature_2m_max[i + 1]),
            min: Math.round(data.daily.temperature_2m_min[i + 1]),
            code: data.daily.weather_code[i + 1],
          })),
        });
      })
      .catch(() => setError(true));

    return () => controller.abort();
  }, [communeLat, communeLng]);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5" aria-label={`Météo locale à ${communeShort}`}>
      <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2">🌦️ Météo à {communeShort}</h3>

      {error && (
        <p className="text-xs text-gray-400">
          Météo momentanément indisponible.{' '}
          <a
            href={`https://www.windy.com/?${communeLat},${communeLng},10`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Voir le radar en ligne
          </a>
        </p>
      )}

      {!error && !weather && (
        <p className="text-xs text-gray-400" role="status">Chargement de la météo…</p>
      )}

      {weather && (
        <>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl" aria-hidden="true">{describe(weather.code).emoji}</span>
            <div>
              <div className="text-2xl font-bold text-blue-700 leading-none">{weather.temperature}°C</div>
              <div className="text-xs text-gray-500">{describe(weather.code).label} · vent {weather.wind} km/h</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {weather.daily.map(d => (
              <div key={d.date} className="text-center bg-gray-50 rounded-lg py-2">
                <div className="text-xs text-gray-500 font-medium mb-1">
                  {new Date(d.date).toLocaleDateString('fr-FR', { weekday: 'short' })}
                </div>
                <div className="text-lg" aria-hidden="true">{describe(d.code).emoji}</div>
                <div className="text-xs text-gray-600">{d.max}° <span className="text-gray-400">{d.min}°</span></div>
              </div>
            ))}
          </div>
          <a
            href={`https://www.windy.com/?${communeLat},${communeLng},10`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline"
          >
            Voir le radar météo en direct →
          </a>
        </>
      )}
    </div>
  );
}
