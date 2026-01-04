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

            try{
                const result = await fetchArticles({ lang: locale });
                const articleData = Array.isArray(result) 
                ? result 
                : result.data || [];

                setArticles(articleData);
            } catch (err) {
                console.error("Error fetching articles:", err);
                setError("Gagal memuat artikel");
            } finally {
                setLoading(false);
            }
        };

        loadArticles();
    }, []);
    
      if (error) {
        return (
          <div className="min-h-screen bg-[#0B1A2E] flex items-center justify-center">
            <ErrorState message={error} onRetry={() => window.location.reload()} />
          </div>
        );
      }

    return (
        <div className="min-h-screen bg-biru-muda-2 text-biru-tua pb-10 relative font-plusjakartasans overflow-x-hidden">           
            <div
                className=" lg:block absolute top-0 -right-[150px] md:-right-[550px] w-[300px] h-[250px] md:w-[1200px] md:h-[1200px] pointer-events-none z-0 opacity-30"
                style={{
                backgroundImage: "url('/images/ornamen-article.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top right",
                backgroundSize: "contain",
                }}
            ></div>

            <div
                className=" lg:block absolute top-[45%] -left-[200px] md:-left-[350px] w-[300px] h-[250px] md:w-[1000px] md:h-[1000px] pointer-events-none z-0 opacity-30"
                style={{
                backgroundImage: "url('/images/ornamen-article.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center left",
                backgroundSize: "contain",
                }}
            ></div>


            <div
            className="absolute inset-0 bg-cover bg-center opacity-40 z-0 -top-[100px] h-[600px] w-full"
            style={{
                backgroundImage: "url('/images/background-articles.png')",
                opacity: 1,
            }}
            ></div>
            
            <div className= "relative z-20">
                <section className="relative w-full h-[50vh] md:h-[65vh] flex items-center justify-center mb-16 md:mb-24 overflow-hidden">
                    <div className="relative z-20 text-center px-4 pt-16 md:pt-0">
                    <h1 className="text-2xl md:text-4xl font-bold drop-shadow-md tracking-wide">
                    {text.title}
                    </h1>
                    <p className="text-3xl md:text-5xl font-bold mt-2 drop-shadow-lg">
                    {text.subtitle}
                    </p>
                </div>
                </section>
            </div>

            <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-16">
            {loading ? (
              <div className="min-h-[400px] flex items-center justify-center">
                <Loader text={t.loading} />
              </div>
            ) : error ? (
              <ErrorState onRetry={() => window.location.reload()} />
            ) : articles.length === 0 ? (
              <div className="text-center py-20 bg-biru-muda-2 rounded-xl border border-sky-800 border-dashed">
                <p className="text-biru-tua">{t.noArticle}</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {articles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            )}            
            </div>
            
        </div>
    )

}    