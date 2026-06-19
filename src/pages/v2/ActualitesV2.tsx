import { useState } from 'react';
import { Search } from 'lucide-react';
import { NEWS_DATA } from '../../data';

const CATS = ['Toutes', ...Array.from(new Set(NEWS_DATA.map(n => n.category)))];

export default function ActualitesV2() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('Toutes');

  const filtered = NEWS_DATA.filter(n => {
    const matchS = n.title.toLowerCase().includes(search.toLowerCase()) || n.summary.toLowerCase().includes(search.toLowerCase());
    const matchC = cat === 'Toutes' || n.category === cat;
    return matchS && matchC;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-blue-600 text-white rounded-2xl p-8 mb-8">
        <h1 className="text-3xl font-bold mb-2">🗞️ Actualités</h1>
        <p className="text-blue-100">Les dernières nouvelles de la commune</p>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          <input
            type="search"
            placeholder="Rechercher…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            aria-label="Rechercher une actualité"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${cat === c ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {filtered.length > 0 && cat === 'Toutes' && !search && (
        <article className="bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col sm:flex-row mb-6 hover:shadow-md transition-shadow">
          {filtered[0].image && (
            <div className="sm:w-72 h-52 sm:h-auto flex-shrink-0">
              <img src={filtered[0].image} alt="" className="w-full h-full object-cover" loading="eager" />
            </div>
          )}
          <div className="p-6 flex flex-col justify-center">
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full w-fit mb-2">{filtered[0].category}</span>
            <h2 className="text-xl font-bold text-gray-900 mb-2 uppercase">{filtered[0].title}</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">{filtered[0].summary}</p>
            <p className="text-xs text-gray-400">📅 {new Date(filtered[0].date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </div>
        </article>
      )}

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(cat === 'Toutes' && !search ? filtered.slice(1) : filtered).map(n => (
            <article key={n.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow group">
              {n.image && (
                <div className="h-44">
                  <img src={n.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">{n.category}</span>
                  <span className="text-xs text-gray-400">📅 {new Date(n.date).toLocaleDateString('fr-FR')}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm uppercase mb-2 line-clamp-2 group-hover:text-blue-700 transition-colors">{n.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">{n.summary}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400">
          <Search size={36} className="mx-auto mb-3 opacity-30" aria-hidden="true" />
          <p className="font-medium">Aucune actualité trouvée</p>
        </div>
      )}
    </div>
  );
}
