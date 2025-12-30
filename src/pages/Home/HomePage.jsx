import { useEffect, useState } from "react";
import { fetchHomeData } from "../../api/home";
import useLocale from "../../hooks/useLocale";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";

import BannerHero from "../../components/home/BannerHero";
import ActivitiesSection from "../../components/home/ActivitiesSection";
import ProductHighlight from "../../components/home/ProductHighlight";
import ArticleHighlight from "../../components/home/ArticleHighlight";
import TestimonialSection from "../../components/home/TestimonialSection";

export default function HomePage() {
  const { locale } = useLocale();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const t = {
    id: {
      loading: "Memuat Beranda...",
      reasonsTitle: "Alasan memilih kami",
      clients: "Klien Puas",
      shipping: "Pengiriman Internasional",
      experience: "Tahun Pengalaman",
    },
    en: {
      loading: "Loading Homepage...",
      reasonsTitle: "Reasons to choose us",
      clients: "Satisfied Clients",
      shipping: "International Shippings",
      experience: "Years of experiences",
    },
  }[locale];

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const res = await fetchHomeData({ lang: locale });
        setData(res);
      } catch (err) {
        console.error("Home Data Error:", err);
        setError("Gagal memuat halaman utama.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [locale]);

  if (loading) return <Loader fullScreen text={t.loading} />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B1A2E] flex items-center justify-center">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  const {
    products = [],
    articles = [],
    activities = [],
    testimonials = [],
  } = data || {};

  return (
    <div className="min-h-screen bg-[#0B1A2E] font-plusjakartasans">
      <div className="relative">
        <BannerHero />
        <div
          className="absolute top-[550px] -left-[350px] w-[200px] h-[300px] md:w-[700px] md:h-[700px] pointer-events-none z-10 opacity-50"
          style={{
            backgroundImage: "url('/images/ornamen-bawah-product.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top left",
            backgroundSize: "contain",
          }}
        ></div>
      </div>

      <div className="relative">
        <ActivitiesSection activities={activities} />
      </div>

      <section className="py-16 bg-[#0B1A2E] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-[#D9D046] text-2xl md:text-3xl font-bold mb-10">
            {t.reasonsTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            <div className="bg-sky-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
              <span className="text-3xl md:text-5xl font-bold text-[#1e3a8a] mb-1 md:mb-2">
                100+
              </span>
              <span className="text-[#1e3a8a] font-medium text-sm md:text-lg">
                {t.clients}
              </span>
            </div>

            <div className="bg-sky-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
              <span className="text-3xl md:text-5xl font-bold text-[#1e3a8a] mb-1 md:mb-2">
                30+
              </span>
              <span className="text-[#1e3a8a] font-medium text-sm md:text-lg">
                {t.shipping}
              </span>
            </div>

            <div className="bg-sky-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-lg transform hover:-translate-y-1 transition-transform duration-300 sm:col-span-2 md:col-span-1 sm:w-1/2 md:w-auto sm:mx-auto md:mx-0">
              <span className="text-3xl md:text-5xl font-bold text-[#1e3a8a] mb-1 md:mb-2">
                3
              </span>
              <span className="text-[#1e3a8a] font-medium text-sm md:text-lg">
                {t.experience}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="relative">
        <ArticleHighlight articles={articles} />
        <div
          className="absolute top-1/2 -translate-y-1/2 right-0 w-[200px] h-[400px] md:w-[750px] md:h-[750px] pointer-events-none z-0 opacity-50"
          style={{
            backgroundImage: "url('/images/ornamen-bawah-product.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center right",
            backgroundSize: "contain",
          }}
        ></div>
      </div>

      <ProductHighlight products={products} />

      <div className="relative">
        <TestimonialSection testimonials={testimonials} />
        <div
          className="absolute bottom-[-75px] -left-[400px] w-[200px] h-[300px] md:w-[750px] md:h-[750px] pointer-events-none z-0 opacity-50"
          style={{
            backgroundImage: "url('/images/ornamen-bawah-product.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "bottom left",
            backgroundSize: "contain",
          }}
        ></div>
      </div>
    </div>
  );
}
