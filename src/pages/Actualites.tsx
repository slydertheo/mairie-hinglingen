import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import NewsCard from '../components/NewsCard';
import { NEWS_DATA } from '../data';

const CATEGORIES = ['Toutes', ...Array.from(new Set(NEWS_DATA.map(n => n.category)))];

export default function Actualites() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Toutes');

  const filtered = NEWS_DATA.filter((n) => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.summary.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'Toutes' || n.category === category;
    return matchSearch && matchCat;
  });

  return (
    <>
      <PageHeader
        title="Actualités"
        subtitle="Restez informés de toutes les actualités de la commune"
        breadcrumbs={[{ label: 'Actualités' }]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <input
              type="search"
              placeholder="Rechercher une actualité…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              aria-label="Rechercher parmi les actualités"
            />
          </div>
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" aria-hidden="true" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="pl-9 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white appearance-none"
              aria-label="Filtrer par catégorie"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Featured news */}
        {filtered.length > 0 && category === 'Toutes' && search === '' && (
          <div className="mb-8">
            <NewsCard news={filtered[0]} featured />
          </div>
        )}

        {/* News grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(category === 'Toutes' && search === '' ? filtered.slice(1) : filtered).map((n) => (
              <NewsCard key={n.id} news={n} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Search size={40} className="text-gray-200 mx-auto mb-3" aria-hidden="true" />
            <p className="text-gray-500 font-medium">Aucune actualité trouvée</p>
            <p className="text-gray-400 text-sm mt-1">Essayez d'autres mots-clés ou sélectionnez une autre catégorie.</p>
          </div>
        )}
      </div>
    </>
  );
}
