import { useState } from 'react';
import { Calendar, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import EventCard from '../components/EventCard';
import { EVENTS_DATA } from '../data';

const ALL_CATEGORIES = ['Tous', ...Array.from(new Set(EVENTS_DATA.map(e => e.category)))];

const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];

const DAY_NAMES = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const offset = (firstDay + 6) % 7; // Convert Sunday=0 to Monday=0
  return { offset, daysInMonth };
}

export default function Evenements() {
  const now = new Date();
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [view, setView] = useState<'list' | 'calendar'>('list');

  const { offset, daysInMonth } = getMonthDays(viewYear, viewMonth);

  const eventDays = new Set(
    EVENTS_DATA
      .filter(e => {
        const d = new Date(e.date);
        return d.getFullYear() === viewYear && d.getMonth() === viewMonth;
      })
      .map(e => new Date(e.date).getDate())
  );

  const filteredEvents = EVENTS_DATA.filter(e => 
    selectedCategory === 'Tous' || e.category === selectedCategory
  );

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  return (
    <>
      <PageHeader
        title="Agenda"
        subtitle="Tous les événements de la vie locale à Hindlingen"
        breadcrumbs={[{ label: 'Agenda' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* View toggle + filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between">
          <div className="flex rounded-xl border border-gray-200 overflow-hidden w-fit bg-white">
            <button
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                view === 'list' ? 'bg-blue-700 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
              aria-pressed={view === 'list'}
            >
              <Calendar size={15} aria-hidden="true" /> Liste
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                view === 'calendar' ? 'bg-blue-700 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
              aria-pressed={view === 'calendar'}
            >
              <Calendar size={15} aria-hidden="true" /> Calendrier
            </button>
          </div>
          <div className="relative">
            <Filter size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="pl-9 pr-8 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              aria-label="Filtrer par catégorie"
            >
              {ALL_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {view === 'calendar' && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8 shadow-sm">
            {/* Calendar header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Mois précédent"
              >
                <ChevronLeft size={18} />
              </button>
              <h2 className="font-bold text-blue-900 text-lg">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </h2>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Mois suivant"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_NAMES.map(d => (
                <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">{d}</div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: offset }).map((_, i) => (
                <div key={`empty-${i}`} className="h-10" aria-hidden="true" />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                const isToday = now.getDate() === day && now.getMonth() === viewMonth && now.getFullYear() === viewYear;
                const hasEvent = eventDays.has(day);
                return (
                  <div
                    key={day}
                    className={`h-10 flex flex-col items-center justify-center rounded-lg text-sm font-medium relative ${
                      isToday ? 'bg-blue-700 text-white' : hasEvent ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {day}
                    {hasEvent && !isToday && (
                      <span className="absolute bottom-1 w-1 h-1 bg-blue-500 rounded-full" aria-label="Événement ce jour" />
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-gray-400 mt-3 text-center">
              Les jours surlignés en bleu ont des événements programmés.
            </p>
          </div>
        )}

        {/* Events list */}
        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredEvents.map(e => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Calendar size={40} className="text-gray-200 mx-auto mb-3" aria-hidden="true" />
            <p className="text-gray-500 font-medium">Aucun événement dans cette catégorie</p>
          </div>
        )}
      </div>
    </>
  );
}
