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

    const otherArticles = allArticles.filter(
      (item) => item.slug !== slug
    );

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
      <ErrorState
        message={error || "Artikel tidak ditemukan"}
        onRetry={() => navigate("/articles")}
      />
    );
  }

  const heroImage =
    getImageUrl(article.featured_image) ||
    getImageUrl(article.hero_image);

const images = article.images || [];
const inlineImage = images.length > 1 ? images[1] : null;

const content = article.content || "";
const paragraphs = content.split("</p>");


  return (
    <div className="relative ovrflow-hidden min-h-screen bg-biru-muda-2 pt-24 pb-20">
            <div
                className=" lg:block absolute top-[300px] -right-[150px] md:-right-[550px] w-[300px] h-[250px] md:w-[1200px] md:h-[1200px] pointer-events-none z-0 opacity-45"
                style={{
                backgroundImage: "url('/images/ornamen-article.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top right",
                backgroundSize: "contain",
                }}
            ></div>

            <div
                className=" lg:block absolute top-[600px] -left-[200px] md:-left-[350px] w-[300px] h-[250px] md:w-[1000px] md:h-[1000px] pointer-events-none z-0 opacity-45"
                style={{
                backgroundImage: "url('/images/ornamen-article.png')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center left",
                backgroundSize: "contain",
                }}
            ></div>

      <div className="max-w-7xl mx-auto px-4">

        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 px-5 py-2 bg-biru-tua hover:bg-biru-tua-2 text-white rounded-full"
        >
          <ArrowLeft size={16} />
          {t.back}
        </button>

        {heroImage && (
          <img
            src={heroImage}
            alt={article.title}
            className="w-full h-[450px] object-cover rounded-2xl mb-8"
          />
        )}

        <div className="z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 overflow-hidden">
            <div className="lg:col-span-9">
                <h1 className="text-3xl text-biru-tua md:text-4xl font-bold mb-4">
                {article.title}
                </h1>

                <div className="flex gap-4 text-sm text-biru-tua-2 font-semibold text-slate-500 mb-6">
                <Calendar size={16} />
                {article.published_at_human}
                {article.author && (
                    <>
                    <User size={16} />
                    {article.author}
                    </>
                )}
                </div>

            <div className="prose prose-slate max-w-none text-justify text-biru-tua-2">
            <div
                dangerouslySetInnerHTML={{
                __html: paragraphs.slice(0, 2).join("</p>") + "</p>",
                }}
            />

            {inlineImage && (
                <figure className="my-10">
                <img
                    src={getImageUrl(inlineImage)}
                    alt={article.title}
                    className="w-full rounded-2xl shadow-lg"
                />
                </figure>
            )}

            <div
                dangerouslySetInnerHTML={{
                __html: paragraphs.slice(2).join("</p>"),
                }}
            />
            </div>

            </div>

            <aside className="z-20 lg:col-span-3 space-y-4">
            <h3 className="text-lg font-bold text-biru-tua mb-4">
                {t.relatedTitle}
            </h3>

            {related.length > 0 ? (
                <div className="space-y-3">
                {related.slice(0, 3).map((item) => (
                    <ArticleCard key={item.id} article={item} />
                ))}
                </div>
            ) : (
                <p className="text-sm text-slate-500">
                {t.noRelated}
                </p>
            )}
            </aside>

        
        </div>

        

      </div>
    </div>
  );
}
