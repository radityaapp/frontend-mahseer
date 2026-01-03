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
    <div className="min-h-screen bg-[#0B1A2E] font-plusjakartasans overflow-x-hidden">
      <div className="relative z-10">
        <BannerHero />
      </div>

      <div className="relative z-10">
        <ActivitiesSection activities={activities} />
      </div>

      <section className="py-12 md:py-20 bg-[#0B1A2E] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-hijau-lime text-2xl md:text-3xl font-bold mb-8 md:mb-12">
            {t.reasonsTitle}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            <div className="bg-sky-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
              <span className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-[#738DDA] to-biru-tua bg-clip-text text-transparent mb-1 md:mb-2">
                100+
              </span>
              <span className="text-[#1e3a8a] font-medium text-sm md:text-lg">
                {t.clients}
              </span>
            </div>

            <div className="bg-sky-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
              <span className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-[#738DDA] to-biru-tua bg-clip-text text-transparent mb-1 md:mb-2">
                30+
              </span>
              <span className="text-[#1e3a8a] font-medium text-sm md:text-lg">
                {t.shipping}
              </span>
            </div>

            <div className="bg-sky-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-lg transform hover:-translate-y-1 transition-transform duration-300 sm:col-span-2 md:col-span-1 sm:w-1/2 md:w-auto sm:mx-auto md:mx-0">
              <span className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-[#738DDA] to-biru-tua bg-clip-text text-transparent mb-1 md:mb-2">
                3
              </span>
              <span className="text-[#1e3a8a] font-medium text-sm md:text-lg">
                {t.experience}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <ArticleHighlight articles={articles} />
      </div>

      <div className="relative z-10">
        <ProductHighlight products={products} />
      </div>

      <div className="relative z-10">
        <TestimonialSection testimonials={testimonials} />
      </div>
    </div>
  );
}
