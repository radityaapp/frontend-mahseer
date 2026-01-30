import { useState, useEffect } from "react";
import useLocale from "../../hooks/useLocale";
import ErrorState from "../../components/common/ErrorState";
import { fetchArticles } from "../../api/articles";
import ArticleCard from "../../components/articles/ArticleCard";
import Loader from "../../components/common/Loader";

const t = {
  id: {
    loading: "Memuat Data...",
    title: "Jelajahi Lebih Dalam Dunia Mahseer",
    subtitle: "melalui Artikel Kami",
    noArticle: "Belum ada artikel yang tersedia saat ini.",
  },
  en: {
    loading: "Loading Data...",
    title: "Dive Deeper Into the World of Mahseer",
    subtitle: "through Our Articles",
    noArticle: "No articles available at the moment.",
  },
};

export default function ArticleListPage() {
  const { locale } = useLocale();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const text = t[locale];

  useEffect(() => {
    const loadArticles = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetchArticles({ lang: locale });
        const articleData = Array.isArray(result) ? result : result.data || [];
        setArticles(articleData);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Gagal memuat artikel");
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, [locale]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B1A2E] flex items-center justify-center">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-biru-muda-2 text-biru-tua relative font-plusjakartasans flex flex-col overflow-x-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="hidden lg:block absolute bottom-0 -right-[150px] md:-right-[300px] w-[500px] h-[500px] z-0 opacity-60"
          style={{
            backgroundImage: "url('/images/ornamen-article.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom right",
            backgroundSize: "contain",
          }}
        ></div>

        <div
          className="hidden lg:block absolute top-[40%] -left-[200px] md:-left-[300px] w-[500px] h-[500px] z-0 opacity-60"
          style={{
            backgroundImage: "url('/images/ornamen-article.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            backgroundSize: "contain",
          }}
        ></div>
      </div>

      <section className="relative w-full h-[280px] md:h-[400px] lg:h-[480px] flex items-center justify-center text-center">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-top z-0"
          style={{
            backgroundImage: "url('/images/background-articles.png')",
            opacity: 1,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-biru-muda-2/95"></div>
        </div>

        <div className="relative z-10 px-4 mt-4 md:mt-0">
          <h1 className="text-xl sm:text-2xl md:text-5xl font-bold drop-shadow-md tracking-wide text-white">
            {text.title}
          </h1>
          <p className="text-xl sm:text-2xl md:text-5xl font-bold mt-2 drop-shadow-lg text-hijau-lime">
            {text.subtitle}
          </p>
        </div>
      </section>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 md:-mt-24 pb-20 w-full flex-grow">
        {loading ? (
          <div className="min-h-[300px] md:min-h-[400px] flex items-center justify-center">
            <Loader text={t.loading} />
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-10 md:py-20 bg-white/50 backdrop-blur-sm rounded-xl border border-sky-800 border-dashed shadow-lg">
            <p className="text-biru-tua font-semibold">{t.noArticle}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
