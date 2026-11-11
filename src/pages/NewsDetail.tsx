import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, User, Clock, Share2 } from 'lucide-react';
import { getNewsBySlug, getAllNews } from '../services/newsService';
import { Loader } from '../components/common/Loader';
import { NewsArticle } from '../types';

export const NewsDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    getNewsBySlug(slug)
      .then((data) => {
        if (!data) {
          navigate('/news', { replace: true });
          return;
        }
        setArticle(data);

        // Fetch other articles
        getAllNews().then((all) => {
          setRelatedArticles(all.filter((a) => a.slug !== slug).slice(0, 3));
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching news detail:', err);
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div className="py-32">
        <Loader message="Loading press release..." />
      </div>
    );
  }

  if (!article) return null;

  return (
    <div className="flex flex-col">
      {/* ARTICLE HEADER HERO */}
      <section className="relative py-28 bg-navy text-white overflow-hidden">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-corporate/80" />

        <div className="section-container relative z-10">
          <div className="max-w-4xl">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-white uppercase tracking-wider mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to News & Media
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider bg-accent text-white rounded">
                {article.category}
              </span>
              <span className="text-xs text-gray-300 flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5" /> {article.publishedAt}
              </span>
              <span className="text-xs text-gray-300 flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5" /> {article.readTime || '3 min read'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {article.title}
            </h1>

            {article.author && (
              <div className="text-xs text-gray-300 font-medium">
                Published by: <span className="text-white font-bold">{article.author}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ARTICLE BODY */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-8">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-[400px] object-cover"
                />
              </div>

              {/* Lead Paragraph */}
              <p className="text-lg font-medium text-navy leading-relaxed border-l-4 border-accent pl-4 italic">
                {article.description}
              </p>

              {/* Body Content */}
              <div className="prose max-w-none text-secondary-text leading-relaxed space-y-6 text-base font-normal">
                {article.content.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share & Meta */}
              <div className="pt-8 border-t border-gray-100 flex items-center justify-between text-xs text-secondary-text">
                <span>BAYAN PROJECTS Official Press Release</span>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }}
                  className="inline-flex items-center gap-1.5 font-bold text-corporate hover:text-navy"
                >
                  <Share2 className="w-4 h-4" /> Share Release
                </button>
              </div>
            </div>

            {/* Sidebar with related articles */}
            <div className="lg:col-span-4 space-y-8">
              <div className="bg-light-bg rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-navy mb-4 border-b border-gray-200 pb-3">
                  Recent Announcements
                </h3>

                <div className="space-y-4">
                  {relatedArticles.map((rel) => (
                    <Link
                      key={rel.id}
                      to={`/news/${rel.slug}`}
                      className="block group p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      <span className="text-[11px] font-bold text-accent uppercase tracking-wider block mb-1">
                        {rel.category} &bull; {rel.publishedAt}
                      </span>
                      <h4 className="text-sm font-bold text-navy group-hover:text-corporate line-clamp-2 transition-colors">
                        {rel.title}
                      </h4>
                    </Link>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200 mt-4">
                  <Link
                    to="/news"
                    className="text-xs font-bold text-corporate hover:underline flex items-center gap-1"
                  >
                    View All Releases <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsDetail;

