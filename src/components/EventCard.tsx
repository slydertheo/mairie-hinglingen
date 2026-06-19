import { Calendar, Clock, MapPin, Tag } from 'lucide-react';
import type { EventItem } from '../types';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  Officiel: 'bg-blue-100 text-blue-700',
  Marché: 'bg-green-100 text-green-700',
  Association: 'bg-purple-100 text-purple-700',
  École: 'bg-yellow-100 text-yellow-700',
  Sport: 'bg-orange-100 text-orange-700',
  Culture: 'bg-pink-100 text-pink-700',
};

function getCategoryColor(cat: string) {
  return CATEGORY_COLORS[cat] ?? 'bg-gray-100 text-gray-700';
}

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  const d = new Date(event.date);
  const day = d.toLocaleDateString('fr-FR', { day: '2-digit' });
  const month = d.toLocaleDateString('fr-FR', { month: 'short' });

  return (
    <article className="card flex gap-4 p-4">
      {/* Date badge */}
      <div className="flex-shrink-0 flex flex-col items-center justify-center bg-blue-700 text-white rounded-xl w-14 h-14 text-center">
        <span className="text-xl font-bold leading-none">{day}</span>
        <span className="text-xs font-medium uppercase">{month}</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap mb-1">
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full flex items-center gap-1 ${getCategoryColor(event.category)}`}
          >
            <Tag size={9} aria-hidden="true" />
            {event.category}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 leading-snug mb-1">{event.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-2">{event.description}</p>
        <div className="flex flex-wrap gap-3 text-xs text-gray-400">
          {event.time && (
            <span className="flex items-center gap-1">
              <Clock size={11} aria-hidden="true" />
              {event.time}
            </span>
          )}
          <span className="flex items-center gap-1">
            <MapPin size={11} aria-hidden="true" />
            {event.location}
          </span>
        </div>
      </div>
    </article>
  );
}
