import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Calendar, User, ArrowRight, X } from 'lucide-react';
import { SectionHeading } from '../components/common/SectionHeading';
import { Loader } from '../components/common/Loader';
import { getAllNews } from '../services/newsService';
import { STATIC_NEWS } from '../data/staticData';
import { NewsArticle } from '../types';

const CATEGORIES = ['All', 'Projects', 'Corporate', 'Sustainability', 'Awards', 'Energy', 'Careers'];

export const News: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articles, setArticles] = useState<NewsArticle[]>(STATIC_NEWS);
  const [loading, setLoading] = useState(true);

  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(currentCategory);
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  useEffect(() => {
    setLoading(true);
    getAllNews({
      category: selectedCategory !== 'All' ? selectedCategory : undefined,
      search: searchTerm.trim() ? searchTerm.trim() : undefined,
    })
      .then((data) => {
        setArticles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load news:', err);
        setArticles(STATIC_NEWS);
        setLoading(false);
      });
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') newParams.delete('category');
    else newParams.set('category', cat);
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (searchTerm.trim()) newParams.set('search', searchTerm.trim());
    else newParams.delete('search');
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSelectedCategory('All');
    setSearchTerm('');
    setSearchParams({});
  };

  return (
    <div className="flex flex-col">
      {/* HERO BANNER */}
      <section className="relative py-28 bg-navy text-white overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=2000&q=80"
          alt="News & Media"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-corporate/80" />

        <div className="section-container relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              Press & Media Room
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              News & Media Centre
            </h1>
            <p className="text-lg text-gray-200 leading-relaxed font-light">
              Stay up-to-date with landmark contract signings, project energizations, corporate announcements, and industry recognitions.
            </p>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH */}
      <section className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm py-4">
        <div className="section-container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative w-full lg:w-96">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-light-bg rounded-lg border border-gray-200 focus:outline-none focus:border-corporate text-navy"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-navy"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all ${
                    selectedCategory === cat
                      ? 'bg-navy text-white shadow-sm'
                      : 'bg-light-bg text-secondary-text hover:text-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}

              {(selectedCategory !== 'All' || searchTerm !== '') && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-red-600 hover:underline font-semibold ml-2"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="py-16 bg-light-bg min-h-[500px]">
        <div className="section-container">
          {loading ? (
            <Loader message="Loading news releases..." />
          ) : articles.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center max-w-md mx-auto shadow-sm">
              <h3 className="text-base font-bold text-navy mb-2">No news articles found</h3>
              <p className="text-xs text-secondary-text mb-4">
                Try searching for different terms or clear your active category filter.
              </p>
              <button
                onClick={clearFilters}
                className="px-5 py-2 bg-navy text-white text-xs font-bold rounded shadow hover:bg-corporate transition-colors"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group border border-gray-100 transform hover:-translate-y-1.5"
                >
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-navy/90 text-white rounded backdrop-blur-sm">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-secondary-text font-medium mb-3">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        <span>{article.publishedAt}</span>
                        <span>&bull;</span>
                        <span>{article.readTime || '3 min read'}</span>
                      </div>

                      <h3 className="text-lg font-bold text-navy group-hover:text-corporate transition-colors line-clamp-2 mb-3">
                        {article.title}
                      </h3>

                      <p className="text-xs text-secondary-text leading-relaxed line-clamp-3">
                        {article.description}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-gray-50">
                    <Link
                      to={`/news/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-corporate group-hover:text-accent transition-colors mt-2"
                    >
                      <span>Read Full Press Release</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default News;

