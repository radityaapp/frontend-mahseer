import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useLocale from "../../hooks/useLocale";

export default function ArticleHighlightSection({ articles = [] }) {
  const navigate = useNavigate();
  const { locale } = useLocale();
  const featuredArticle = articles[0];

  const t = {
    id: {
      readMore: "Baca Selengkapnya",
    },
    en: {
      readMore: "Read Full Story",
    },
  }[locale];

  if (!featuredArticle) return null;

  // 1. LOGIC TANGGAL: Prioritaskan data backend 'published_at_human'
  const dateString =
    featuredArticle.published_at_human ||
    (featuredArticle.published_at
      ? new Date(featuredArticle.published_at).toLocaleDateString(
          locale === "id" ? "id-ID" : "en-US",
          { day: "numeric", month: "long", year: "numeric" }
        )
      : "");

  // 2. LOGIC GAMBAR
  const imageUrl =
    featuredArticle.hero_image ||
    featuredArticle.featured_image ||
    "https://via.placeholder.com/600x400?text=No+Image";

  // 3. LOGIC TEXT: Strip HTML tags agar layout aman dan line-clamp berfungsi
  const rawContent = featuredArticle.excerpt || featuredArticle.content || "";
  const safeExcerpt = rawContent.replace(/<[^>]+>/g, "");

  return (
    <section className="relative py-12 md:py-24 bg-[#0B1A2E] font-plusjakartasans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Card Container */}
        {/* Responsif: rounded-3xl di mobile, rounded-[3rem] di desktop */}
        <div className="bg-gradient-to-br from-[#e0f2fe] via-white to-[#bae6fd] rounded-3xl md:rounded-[3rem] p-6 md:p-12 shadow-2xl overflow-hidden relative border border-white/20">
          {/* Background Blur Decoration */}
          <div className="absolute top-0 right-0 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-blue-400/20 rounded-full blur-[60px] md:blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          {/* Flex Container: Column di Mobile, Row di Large Desktop */}
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 relative z-10">
            {/* --- LEFT: IMAGE --- */}
            <div className="w-full lg:w-1/2">
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg group border-4 border-white/50">
                <div className="aspect-[4/3] w-full bg-slate-200 relative">
                  <img
                    src={imageUrl}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/600x400?text=Error+Loading";
                    }}
                  />
                  {/* Overlay Gradient halus saat hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                </div>

                {/* Date Badge */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-[#0B1A2E]/90 backdrop-blur-md px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold text-hijau-lime shadow-md tracking-wide border border-hijau-lime/30">
                  {dateString}
                </div>
              </div>
            </div>

            {/* --- RIGHT: CONTENT --- */}
            <div className="w-full lg:w-1/2 text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-[#0B1A2E] mb-4 md:mb-6 leading-tight break-words">
                {featuredArticle.title}
              </h2>

              {/* Excerpt: Menggunakan teks polos (safeExcerpt) bukan HTML */}
              <p className="text-slate-600 text-sm md:text-lg leading-relaxed mb-6 md:mb-8 line-clamp-4 md:line-clamp-5">
                {safeExcerpt}
              </p>

              <button
                onClick={() => navigate(`/articles/${featuredArticle.slug}`)}
                className="group inline-flex items-center gap-2 md:gap-3 text-[#0B1A2E] font-bold text-base md:text-lg border-b-2 border-hijau-lime pb-1 hover:text-hijau-lime hover:border-transparent transition-all"
              >
                {t.readMore}
                <ArrowRight className="group-hover:translate-x-1 transition-transform w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

ArticleHighlightSection.propTypes = {
  articles: PropTypes.array,
};
