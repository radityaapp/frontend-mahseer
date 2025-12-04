import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MessageCircle, Store, ArrowLeft } from "lucide-react";
import Cookies from "js-cookie";
import { getProductDetail } from "../../api/products";
import ProductCard from "../../components/products/ProductCard";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import { DEFAULT_LOCALE, DEFAULT_CURRENCY } from "../../config/appConfig";
import CurrencySwitcher from "../../components/common/CurrencySwitcher";

function formatPrice(value, currency = "IDR") {
  if (value == null) return "-";

  if (typeof value === "string" && isNaN(Number(value))) {
    return value;
  }

  const number = typeof value === "number" ? value : Number(value);

  try {
    return new Intl.NumberFormat(currency === "USD" ? "en-US" : "id-ID", {
      style: "currency",
      currency,
      minimumFractionDigits: currency === "USD" ? 2 : 0,
      maximumFractionDigits: currency === "USD" ? 2 : 0,
    })
      .format(number)
      .replace("Rp", "Rp");
  } catch {
    return `${number}`;
  }
}

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

  const currentLang = Cookies.get("lang") || "id";

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          lang: DEFAULT_LOCALE,
          currency: DEFAULT_CURRENCY,
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
  }, [slug]);

  const loadingText =
    currentLang === "en"
      ? "Preparing fish details..."
      : "Menyiapkan detail ikan...";

  if (loading) return <Loader fullScreen text={loadingText} />;

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

  const displayCurrency = product.display_currency || DEFAULT_CURRENCY;

  const displayPrice =
    product.display_price_label ??
    product.display_price ??
    product.price_base ??
    product.price ??
    0;

  const formattedPrice = formatPrice(displayPrice, displayCurrency);

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

          <div className="flex flex-col pt-2">
            <h1 className="text-4xl font-bold text-[#0B1A2E] mb-2 leading-tight">
              {product.name}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-[#0B1A2E]">
                {formattedPrice}
              </span>
              <CurrencySwitcher prices={product.prices} />
            </div>

            <div className="mb-8">
              <span className="inline-block bg-[#0B1A2E] text-white text-base font-bold px-3 py-1.5 rounded">
                Stock: {product.stock ?? "-"}
              </span>
            </div>

            <div className="mb-8 bg-sky-50/50 p-0 rounded-xl">
              <h3 className="text-2xl font-bold text-[#0B1A2E] mb-2">
                General Information
              </h3>
              <p className="text-slate-600 text-base font-semibold leading-relaxed">
                {product.general_information || "Tidak ada informasi umum."}
              </p>
            </div>

            <div className="space-y-4 mt-auto">
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#D9D046] hover:bg-[#c9c03a] text-[#0B1A2E] text-sm font-bold py-4 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="p-1 border-2 border-[#0B1A2E] rounded-full">
                    <MessageCircle
                      size={16}
                      className="text-[#0B1A2E]"
                      fill="transparent"
                      strokeWidth={2.5}
                    />
                  </div>
                  Buy Now via WhatsApp
                </a>
              )}

              {tokopediaUrl && (
                <a
                  href={tokopediaUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-[#D9D046] hover:bg-[#c9c03a] text-[#0B1A2E] text-sm font-bold py-4 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  <div className="p-1 border-2 border-[#0B1A2E] rounded-full">
                    <Store
                      size={16}
                      className="text-[#0B1A2E]"
                      strokeWidth={2.5}
                    />
                  </div>
                  Buy Now via Tokopedia
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#0B1A2E] mb-4">
            Product Description
          </h2>
          <div className="bg-sky-50/80 rounded-2xl">
            <p className="text-slate-600 text-base font-semibold leading-loose text-justify whitespace-pre-line">
              {product.description || "Belum ada deskripsi."}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#0B1A2E] mb-6">
            Other products you might like
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
