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
  const { formatPrice } = useCurrency();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCurrency, setSelectedCurrency] = useState("IDR");

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
        const res = await getProductDetail(slug);

        const productData = res?.data ?? null;
        const relatedData = res?.related?.data ?? res?.related ?? [];

        setProduct(productData);
        setRelated(Array.isArray(relatedData) ? relatedData : []);

        if (productData) {
          setSelectedCurrency(productData.display_currency || "IDR");
        }
      } catch (err) {
        console.error("Error load product detail:", err);
        setError("Gagal memuat detail produk. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
    window.scrollTo(0, 0);
  }, [slug]);

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
    product.prices?.[selectedCurrency] ?? product.display_price ?? 0;

  const displayPriceFormatted = formatPrice(
    currentPriceValue,
    selectedCurrency
  );

  const whatsappUrl =
    product.whatsapp_url || product.buy_links?.whatsapp || null;
  const tokopediaUrl =
    product.tokopedia_url || product.buy_links?.tokopedia || null;

  return (
    <div className="min-h-screen bg-sky-50 font-plusjakartasans pb-20 relative overflow-hidden">
      <div
        className="absolute top-0 right-0 w-[1200px] h-[600px] pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: "url('/images/ornamen-atas-detail-product.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          backgroundSize: "contain",
          opacity: 0.7,
        }}
      ></div>

      <div
        className="absolute top-1/3 -left-10 w-[1200px] h-[600px] pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: "url('/images/ornamen-tengah-detail-product.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center left",
          backgroundSize: "contain",
          opacity: 0.7,
        }}
      ></div>

      <div
        className="absolute bottom-0 -right-10 w-[1200px] h-[600px] pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: "url('/images/ornamen-bawah-detail-product.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          backgroundSize: "contain",
          opacity: 0.7,
        }}
      ></div>

      <div
        className="absolute top-0 right-0 w-full h-[800px] opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 100% 0%, #0369a1 0%, transparent 25%), radial-gradient(circle at 100% 15%, #0369a1 0%, transparent 20%), radial-gradient(circle at 100% 30%, #0369a1 0%, transparent 15%)",
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-2 bg-[#0B1A2E] text-white rounded-full hover:bg-[#152744] transition-colors mb-8 text-sm font-bold shadow-lg"
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-16">
          <div className="space-y-4">
            <div className="aspect-square w-full bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 relative group">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-slate-100 text-slate-400">
                  No Image Available
                </div>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
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
                        alt={`thumbnail-${index}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="flex flex-col pt-2 h-full">
            <h1 className="text-4xl font-bold text-[#0B1A2E] mb-2 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-[#0B1A2E]">
                {displayPriceFormatted}
              </span>

              <CurrencySwitcher
                prices={product.prices}
                currentCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
            </div>

            <div className="mb-8">
              <span className="inline-block bg-[#0B1A2E] text-white text-lg font-bold px-3 py-1.5 rounded">
                {t.stock}: {product.stock ?? "-"}
              </span>
            </div>

            <div className="mt-auto pt-10">
              <div className="mb-8 bg-sky-50/50 p-0 rounded-xl relative z-10">
                <h3 className="text-2xl font-bold text-[#0B1A2E] mb-2">
                  {t.generalInfo}
                </h3>
                <p className="text-slate-600 text-base font-semibold leading-relaxed">
                  {product.general_information || t.noInfo}
                </p>
              </div>

              <div className="space-y-4">
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-4 bg-[#D9D046] hover:bg-[#c9c03a] text-[#0B1A2E] text-base font-bold py-5 rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="w-9 h-9 flex items-center justify-center border-[2.5px] border-[#0B1A2E] rounded-full">
                      <MessageCircle
                        size={20}
                        className="text-[#0B1A2E]"
                        fill="transparent"
                        strokeWidth={2.8}
                      />
                    </div>
                    <span className="tracking-wide">{t.buyWa}</span>
                  </a>
                )}

                {tokopediaUrl && (
                  <a
                    href={tokopediaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-4 bg-[#D9D046] hover:bg-[#c9c03a] text-[#0B1A2E] text-base font-bold py-5 rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-1"
                  >
                    <div className="w-9 h-9 flex items-center justify-center border-[2.5px] border-[#0B1A2E] rounded-full">
                      <Store
                        size={20}
                        className="text-[#0B1A2E]"
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className="tracking-wide">{t.buyTokped}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#0B1A2E] mb-4">
            {t.descTitle}
          </h2>
          <div className="bg-sky-50/80 rounded-2xl">
            <p className="text-slate-600 text-base font-semibold leading-loose text-justify whitespace-pre-line">
              {product.description || t.noDesc}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#0B1A2E] mb-6">
            {t.relatedTitle}
          </h2>

          {related.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-500 bg-sky-100/50 rounded-xl">
              Tidak ada produk serupa saat ini.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
