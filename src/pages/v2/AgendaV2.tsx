import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { EVENTS_DATA } from '../../data';

const CATS = ['Tous', ...Array.from(new Set(EVENTS_DATA.map(e => e.category)))];
const MONTH_NAMES = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const DAY_NAMES = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const CAT_COLORS: Record<string, string> = {
  Officiel: 'bg-blue-100 text-blue-700',
  Marché: 'bg-green-100 text-green-700',
  Association: 'bg-purple-100 text-purple-700',
  École: 'bg-yellow-100 text-yellow-700',
  Sport: 'bg-orange-100 text-orange-700',
  Culture: 'bg-pink-100 text-pink-700',
};

export default function AgendaV2() {
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth());
  const [year, setYear] = useState(now.getFullYear());
  const [cat, setCat] = useState('Tous');

  const firstDay = new Date(year, month, 1).getDay();
  const offset = (firstDay + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const eventDays = new Set(
    EVENTS_DATA.filter(e => { const d = new Date(e.date); return d.getFullYear() === year && d.getMonth() === month; }).map(e => new Date(e.date).getDate())
  );

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); };

  const filtered = EVENTS_DATA.filter(e => cat === 'Tous' || e.category === cat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">📅 Agenda</h1>
        <p className="text-blue-100">Tous les événements de la commune</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendrier */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 h-fit">
          <div className="flex items-center justify-between mb-4">
            <button onClick={prev} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Mois précédent"><ChevronLeft size={16} /></button>
            <h2 className="font-bold text-blue-800 text-sm">{MONTH_NAMES[month]} {year}</h2>
            <button onClick={next} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" aria-label="Mois suivant"><ChevronRight size={16} /></button>
          </div>
          <div className="grid grid-cols-7 mb-2">
            {DAY_NAMES.map(d => <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-0.5">
            {Array.from({ length: offset }).map((_, i) => <div key={i} className="h-9" aria-hidden="true" />)}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
              const isToday = now.getDate() === day && now.getMonth() === month && now.getFullYear() === year;
              const hasEvent = eventDays.has(day);
              return (
                <div key={day} className={`h-9 flex flex-col items-center justify-center rounded-lg text-sm relative ${isToday ? 'bg-blue-600 text-white font-bold' : hasEvent ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}>
                  {day}
                  {hasEvent && !isToday && <span className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full" aria-label="Événement" />}
                </div>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">Jours en bleu = événements</p>
        </div>

        {/* Liste */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${cat === c ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="space-y-3">
            {filtered.map(e => {
              const d = new Date(e.date);
              return (
                <article key={e.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex gap-4 hover:border-blue-300 hover:shadow-sm transition-all">
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-xl font-bold leading-none">{d.toLocaleDateString('fr-FR', { day: '2-digit' })}</span>
                    <span className="text-xs uppercase">{d.toLocaleDateString('fr-FR', { month: 'short' })}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CAT_COLORS[e.category] ?? 'bg-gray-100 text-gray-600'}`}>{e.category}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-sm">{e.title}</h3>
                    <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{e.description}</p>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-gray-400">
                      {e.time && <span>🕐 {e.time}</span>}
                      <span>📍 {e.location}</span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
