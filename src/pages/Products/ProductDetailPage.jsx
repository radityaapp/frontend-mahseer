import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageCircle, Store, ArrowLeft } from "lucide-react";
import { getProductDetail } from "../../api/products";
import ProductCard from "../../components/products/ProductCard";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import CurrencySwitcher from "../../components/common/CurrencySwitcher";

import useLocale from "../../hooks/useLocale";
import useCurrency from "../../hooks/useCurrency";

const getImageUrl = (img) => {
  if (!img) return null;
  if (typeof img === "string") return img;
  return (
    img.url || img.full_url || img.original_url || img.thumbnail_url || null
  );
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { locale } = useLocale();
  const { currency, setCurrency, formatPrice } = useCurrency();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const t = {
    id: {
      loading: "Menyiapkan detail ikan...",
      stock: "Stok",
      generalInfo: "Informasi Umum",
      noInfo: "Tidak ada informasi umum.",
      buyWa: "Beli via WhatsApp",
      buyTokped: "Beli via Tokopedia",
      descTitle: "Deskripsi Produk",
      noDesc: "Belum ada deskripsi.",
      relatedTitle: "Produk lain yang mungkin Anda suka",
      noRelated: "Tidak ada produk serupa saat ini.",
      back: "Kembali",
    },
    en: {
      loading: "Preparing fish details...",
      stock: "Stock",
      generalInfo: "General Information",
      noInfo: "No general information available.",
      buyWa: "Buy Now via WhatsApp",
      buyTokped: "Buy Now via Tokopedia",
      descTitle: "Product Description",
      noDesc: "No description available.",
      relatedTitle: "Other products you might like",
      noRelated: "No similar products at the moment.",
      back: "Back",
    },
  }[locale];

  useEffect(() => {
    if (!slug) return;

    async function fetchDetail() {
      setLoading(true);
      setError("");
      setProduct(null);
      setRelated([]);
      setMainImageIndex(0);

      try {
        const res = await getProductDetail(slug, {
          lang: locale,
          currency: currency,
        });

        const productData = res?.data ?? null;
        const relatedData = res?.related?.data ?? res?.related ?? [];

        setProduct(productData);
        setRelated(Array.isArray(relatedData) ? relatedData : []);
      } catch (err) {
        console.error("Error load product detail:", err);
        setError("Gagal memuat detail produk. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
    window.scrollTo(0, 0);
  }, [slug, currency, locale]);

  if (loading) return <Loader fullScreen text={t.loading} />;

  if (error || !product) {
    return (
      <ErrorState
        message={error || "Produk tidak ditemukan"}
        onRetry={() => navigate("/products")}
      />
    );
  }

  const images = product.images ?? product.media ?? product.photos ?? [];
  const currentImageRaw = images[mainImageIndex];
  const mainImage = getImageUrl(currentImageRaw) || product.image_cover || null;

  const currentPriceValue =
    product.prices?.[currency] ?? product.display_price ?? 0;

  const formattedPrice = formatPrice(currentPriceValue, currency);

  const whatsappUrl =
    product.whatsapp_url || product.buy_links?.whatsapp || null;
  const tokopediaUrl =
    product.tokopedia_url || product.buy_links?.tokopedia || null;

  return (
    <div className="min-h-screen bg-sky-50 font-plusjakartasans pb-20 pt-20 md:pt-24 relative overflow-hidden">
      <div className="hidden md:block absolute top-0 right-0 w-[800px] h-[600px] pointer-events-none z-0 opacity-40 bg-[url('/images/ornamen-atas-detail-product.png')] bg-no-repeat bg-right-top bg-contain mix-blend-multiply"></div>
      <div className="hidden md:block absolute top-1/3 -left-10 w-[800px] h-[600px] pointer-events-none z-0 opacity-40 bg-[url('/images/ornamen-tengah-detail-product.png')] bg-no-repeat bg-left-center bg-contain mix-blend-multiply"></div>
      <div className="hidden md:block absolute bottom-0 -right-10 w-[800px] h-[600px] pointer-events-none z-0 opacity-40 bg-[url('/images/ornamen-bawah-detail-product.png')] bg-no-repeat bg-right-bottom bg-contain mix-blend-multiply"></div>

      <div
        className="absolute top-0 right-0 w-full h-[800px] opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 100% 0%, #0369a1 0%, transparent 25%), radial-gradient(circle at 100% 15%, #0369a1 0%, transparent 20%)",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-2 px-5 py-2 bg-biru-tua hover:bg-biru-tua-2 text-white text-sm font-bold rounded-full transition-all shadow-md active:scale-95"
        >
          <ArrowLeft size={16} />
          {t.back}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
          <div className="space-y-4">
            <div className="aspect-square w-full bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100 relative group">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-slate-100 text-slate-400 text-sm">
                  No Image Available
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
                {images.map((img, index) => {
                  const thumb = getImageUrl(img);
                  return (
                    <button
                      key={index}
                      onClick={() => setMainImageIndex(index)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        index === mainImageIndex
                          ? "border-[#0B1A2E] opacity-100 ring-2 ring-[#0B1A2E]/20"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={thumb}
                        alt={`thumb-${index}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col h-full">
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1A2E] mb-3 leading-tight">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-3 mb-6 pb-6 border-b border-sky-200/50">
                <span className="text-2xl md:text-3xl font-bold text-[#0369a1]">
                  {formattedPrice}
                </span>
                <div className="scale-90 origin-left">
                  <CurrencySwitcher
                    prices={product.prices}
                    currentCurrency={currency}
                    onCurrencyChange={setCurrency}
                  />
                </div>
              </div>

              <div className="mb-6">
                <span className="inline-block bg-[#0B1A2E] text-white text-sm font-bold px-3 py-1.5 rounded-md tracking-wide uppercase">
                  {t.stock}: {product.stock ?? "-"}
                </span>
              </div>
            </div>

            <div className="mt-auto pt-6">
              <div className="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-sky-100 mb-6">
                <h3 className="text-base font-bold text-[#0B1A2E] mb-2 uppercase tracking-wider">
                  {t.generalInfo}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {product.general_information || t.noInfo}
                </p>
              </div>

              <div className="space-y-3">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group w-full flex items-center justify-center gap-3 bg-hijau-lime hover:bg-[#c9c03a] text-[#0B1A2E] text-base font-bold py-4 rounded-xl transition-all shadow-md active:scale-[0.98]"
                  >
                    <div className="w-8 h-8 flex items-center justify-center border-2 border-[#0B1A2E] rounded-full group-hover:bg-[#0B1A2E] group-hover:text-hijau-lime transition-colors">
                      <MessageCircle size={18} strokeWidth={2.5} />
                    </div>
                    <span>{t.buyWa}</span>
                  </a>
                )}

                {tokopediaUrl && (
                  <a
                    href={tokopediaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group w-full flex items-center justify-center gap-3 bg-white border border-gray-200 hover:border-hijau-lime text-[#0B1A2E] text-base font-bold py-4 rounded-xl transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                  >
                    <div className="w-8 h-8 flex items-center justify-center border-2 border-[#0B1A2E] rounded-full group-hover:bg-[#0B1A2E] group-hover:text-white transition-colors">
                      <Store size={18} strokeWidth={2.5} />
                    </div>
                    <span>{t.buyTokped}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-xl md:text-2xl font-bold text-[#0B1A2E] mb-4 border-l-4 border-hijau-lime pl-4">
            {t.descTitle}
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 text-base md:text-base leading-relaxed text-justify whitespace-pre-line bg-white/50 p-6 rounded-2xl border border-sky-50">
            {product.description || t.noDesc}
          </div>
        </div>

        <div className="mb-20">
          <h2 className="text-xl md:text-2xl font-bold text-[#0B1A2E] mb-8 text-center md:text-left">
            {t.relatedTitle}
          </h2>

          {related.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <div className="text-center text-sm font-semibold py-12 text-slate-500 bg-sky-50 rounded-2xl border border-dashed border-sky-200">
              {t.noRelated}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
