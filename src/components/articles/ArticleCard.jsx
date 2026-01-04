import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Calendar, User } from "lucide-react";
import useLocale from "../../hooks/useLocale";

export default function ArticleCard({ article }) {
  const { locale } = useLocale();

  const dateString = article.published_at_human || "";

  const imageUrl =
    article.featured_image ||
    article.hero_image ||
    (article.images && article.images[0]) ||
    "https://via.placeholder.com/600x400?text=No+Image";

  const safeExcerpt = article.excerpt
    ? article.excerpt.replace(/<[^>]+>/g, "")
    : "";

  const t = {
    id: { seeMore: "Baca Selengkapnya" },
    en: { seeMore: "Read Article" },
  }[locale] || { seeMore: "Read Article" };

  return (
    <Link
      to={`/articles/${article.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg border border-sky-100/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-full"
    >
      <div className="relative h-56 overflow-hidden bg-slate-100">
        <img
          src={imageUrl}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

        <div className="absolute top-4 left-4 bg-[#0B1A2E]/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
          <span className="text-[10px] font-bold text-hijau-lime uppercase tracking-wider">
            Article
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5 md:p-6">
        <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 font-medium border-b border-slate-100 pb-3">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} className="text-hijau-lime" />
            <span>{dateString}</span>
          </div>
          {article.author && (
            <div className="flex items-center gap-1.5">
              <User size={14} className="text-hijau-lime" />
              <span className="line-clamp-1">{article.author}</span>
            </div>
          )}
        </div>

        <h3 className="text-lg md:text-xl font-bold text-[#0B1A2E] mb-3 line-clamp-2 leading-tight group-hover:text-sky-700 transition-colors">
          {article.title}
        </h3>

        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
          {safeExcerpt}
        </p>

        <div className="mt-auto flex justify-end">
          <span className="px-5 py-2 bg-hijau-lime hover:bg-[#c9c03a] text-[#0B1A2E] text-sm font-bold rounded-full transition-all shadow-sm active:scale-95 flex items-center gap-2 group-hover:gap-3">
            {t.seeMore}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

ArticleCard.propTypes = {
  article: PropTypes.shape({
    id: PropTypes.number,
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    published_at_human: PropTypes.string,
    hero_image: PropTypes.string,
    featured_image: PropTypes.string,
    images: PropTypes.array,
    author: PropTypes.string,
    excerpt: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};
