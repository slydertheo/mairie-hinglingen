import { Link } from 'react-router-dom';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import type { NewsItem } from '../types';

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

interface NewsCardProps {
  news: NewsItem;
  featured?: boolean;
}

export default function NewsCard({ news, featured = false }: NewsCardProps) {
  if (featured) {
    return (
      <article className="card group flex flex-col sm:flex-row overflow-hidden">
        {news.image && (
          <div className="sm:w-64 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
            <img
              src={news.image}
              alt=""
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex flex-col justify-between p-5 flex-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Tag size={10} aria-hidden="true" />
                {news.category}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-700 transition-colors">
              {news.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{news.summary}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-gray-400 flex items-center gap-1.5">
              <Calendar size={12} aria-hidden="true" />
              {formatDate(news.date)}
            </span>
            <Link
              to={`/actualites#${news.slug}`}
              className="text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors"
            >
              Lire la suite <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card group flex flex-col">
      {news.image && (
        <div className="h-44 overflow-hidden">
          <img
            src={news.image}
            alt=""
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Tag size={10} aria-hidden="true" />
            {news.category}
          </span>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <Calendar size={10} aria-hidden="true" />
            {formatDate(news.date)}
          </span>
        </div>
        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
          {news.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">{news.summary}</p>
        <Link
          to={`/actualites#${news.slug}`}
          className="mt-3 text-sm font-medium text-blue-700 hover:text-blue-800 flex items-center gap-1 transition-colors"
        >
          Lire la suite <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
