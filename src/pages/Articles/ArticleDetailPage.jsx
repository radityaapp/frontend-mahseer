import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import { getArticleDetail, fetchArticles } from "../../api/articles";
import ArticleCard from "../../components/articles/ArticleCard";
import useLocale from "../../hooks/useLocale";

const getImageUrl = (img) => {
  if (!img) return null;
  if (typeof img === "string") return img;
  return img.url || img.full_url || img.original_url || null;
};

export default function ArticleDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { locale } = useLocale();

  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const t = {
    id: {
      loading: "Memuat artikel...",
      back: "Kembali",
      relatedTitle: "Artikel lain yang mungkin Anda suka",
      noRelated: "Belum ada artikel terkait.",
    },
    en: {
      loading: "Loading article...",
      back: "Back",
      relatedTitle: "Other articles you might like",
      noRelated: "No related articles available.",
    },
  }[locale];

  useEffect(() => {
    if (!slug) return;

    async function fetchDetail() {
      setLoading(true);
      setError("");
      setArticle(null);
      setRelated([]);

      try {
        const detailRes = await getArticleDetail(slug, { lang: locale });
        const articleData = detailRes?.data ?? null;
        setArticle(articleData);

        const listRes = await fetchArticles({ lang: locale });
        const allArticles = Array.isArray(listRes)
          ? listRes
          : listRes.data ?? [];
        const otherArticles = allArticles.filter((item) => item.slug !== slug);
        setRelated(otherArticles.slice(0, 3));
      } catch (err) {
        console.error(err);
        setError("Gagal memuat artikel.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
    window.scrollTo(0, 0);
  }, [slug, locale]);

  if (loading) return <Loader fullScreen text={t.loading} />;

  if (error || !article) {
    return (
      <div className="min-h-screen bg-[#0B1A2E] flex items-center justify-center">
        <ErrorState
          message={error || "Artikel tidak ditemukan"}
          onRetry={() => navigate("/articles")}
        />
      </div>
    );
  }

  const heroImage =
    getImageUrl(article.featured_image) || getImageUrl(article.hero_image);

  const contentImages = article.content_images || article.images || [];

  const firstContentImage = contentImages.length > 0 ? contentImages[0] : null;
  const remainingImages =
    contentImages.length > 1 ? contentImages.slice(1) : [];

  const content = article.content || "";
  const paragraphs = content.split("</p>");

  return (
    <div className="relative min-h-screen bg-biru-muda-2 pt-24 pb-20 font-plusjakartasans overflow-x-hidden">
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div
          className="hidden lg:block absolute top-[100px] -right-[300px] lg:w-[750px] lg:h-[750px] z-0 opacity-60"
          style={{
            backgroundImage: "url('/images/ornamen-article.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top right",
            backgroundSize: "contain",
          }}
        ></div>

        <div
          className="hidden lg:block absolute bottom-0 -left-[300px] lg:w-[750px] lg:h-[750px] z-0 opacity-60"
          style={{
            backgroundImage: "url('/images/ornamen-article.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom left",
            backgroundSize: "contain",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 bg-biru-tua hover:bg-sky-900 text-white text-sm font-medium rounded-full transition-colors shadow-sm active:scale-95"
        >
          <ArrowLeft size={16} />
          {t.back}
        </button>

        {heroImage && (
          <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] mb-8 rounded-2xl overflow-hidden shadow-lg bg-slate-200">
            <img
              src={heroImage}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-8 xl:col-span-9">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-biru-tua mb-4 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 font-medium mb-8 border-b border-slate-200 pb-6">
              <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                <Calendar size={14} className="text-hijau-lime" />
                <span>{article.published_at_human}</span>
              </div>
              {article.author && (
                <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100">
                  <User size={14} className="text-hijau-lime" />
                  <span>{article.author}</span>
                </div>
              )}
            </div>

            <div className="prose prose-slate prose-lg max-w-none text-justify text-slate-700 leading-relaxed clearfix">
              <div
                dangerouslySetInnerHTML={{
                  __html:
                    paragraphs.slice(0, 2).join("</p>") +
                    (paragraphs.length > 0 ? "</p>" : ""),
                }}
              />

              <div className="my-6">
                {firstContentImage && (
                  <div className="float-none md:float-left md:mr-8 mb-6 w-full md:w-[45%]">
                    <img
                      src={getImageUrl(firstContentImage)}
                      alt="Content Highlight"
                      className="w-full h-auto object-cover rounded-xl shadow-lg border border-slate-200"
                    />
                  </div>
                )}

                {paragraphs.length > 2 && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: paragraphs.slice(2).join("</p>"),
                    }}
                  />
                )}

                <div className="clear-both"></div>
              </div>

              {remainingImages.length > 0 && (
                <div className="mt-10 border-t border-slate-200 pt-8">
                  <h4 className="text-lg font-bold text-biru-tua mb-4">
                    Galeri Dokumentasi
                  </h4>
                  <div
                    className={`grid gap-4 ${
                      remainingImages.length === 1
                        ? "grid-cols-1"
                        : "grid-cols-1 sm:grid-cols-2"
                    }`}
                  >
                    {remainingImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="group relative overflow-hidden rounded-xl shadow-md h-64"
                      >
                        <img
                          src={getImageUrl(img)}
                          alt={`Gallery ${idx + 2}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="lg:col-span-4 xl:col-span-3 mt-8 lg:mt-0">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm sticky top-24">
              <h3 className="text-lg font-bold text-biru-tua mb-6 border-l-4 border-hijau-lime pl-3">
                {t.relatedTitle}
              </h3>

              {related.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                  {related.map((item) => (
                    <ArticleCard key={item.id} article={item} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-500 italic text-center py-4">
                  {t.noRelated}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
