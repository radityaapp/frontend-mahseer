import { useState, useEffect } from "react";
import useLocale from "../../hooks/useLocale";
import { fetchActivities } from "../../api/aboutUs";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import ActivitiesHighlight from "../../components/aboutUs/ActivitiesHighlight";

const t = {
  id: {
    loading: "Memuat Data...",
    title: "Tentang",
    subtitle: "Exotic Mahseer",
    hobbyTitle1: "Berawal dari",
    hobbyTitle2: "Sebuah Hobi",
    valuesTitle1: "Nilai-Nilai",
    valuesTitle2: "Exotic Mahseer",
    achievementsTitle1: "Pencapaian",
    achievementsTitle2: "Exotic Mahseer",
    globalizeTitle1: "Globalisasi",
    globalizeTitle2: "Exotic Mahseer",
    activitiesTitle: "Aktivitas Kami",
    clients: "Klien Puas",
    shipping: "Pengiriman Internasional",
    experience: "Tahun Pengalaman",
  },
  en: {
    loading: "Loading Data...",
    title: "About",
    subtitle: "Exotic Mahseer",
    hobbyTitle1: "Started As",
    hobbyTitle2: "A Hobby",
    valuesTitle1: "Exotic Mahseer's",
    valuesTitle2: "Values",
    achievementsTitle1: "Exotic Mahseer's",
    achievementsTitle2: "Achievements",
    globalizeTitle1: "Globalize",
    globalizeTitle2: "Exotic Mahseer",
    activitiesTitle: "Our Activities",
    clients: "Satisfied Clients",
    shipping: "International Shippings",
    experience: "Years of experiences",
  },
};

export default function AboutUsPage() {
  const { locale } = useLocale();
  const text = t[locale];

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);

    async function loadData() {
      try {
        setLoading(true);
        const res = await fetchActivities({ lang: locale });
        const activitiesData = Array.isArray(res) ? res : res.data || [];
        setData({ activities: activitiesData });
      } catch (err) {
        console.error("About Data Error:", err);
        setError("Gagal memuat data halaman.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [locale]);

  if (loading) return <Loader fullScreen text={text.loading} />;

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B1A2E] flex items-center justify-center">
        <ErrorState message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  const { activities = [] } = data || {};

  return (
    <div className="min-h-screen bg-biru-tua-2 text-white pb-10 relative font-plusjakartasans overflow-x-hidden">
      <div
        className="hidden lg:block absolute top-0 -right-[150px] md:-right-[550px] w-[600px] h-[350px] md:w-[1200px] md:h-[1200px] pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: "url('/images/ornamen-bawah-product.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          backgroundSize: "contain",
        }}
      ></div>

      <div
        className="hidden lg:block absolute top-[35%] -left-[200px] md:-left-[350px] w-[500px] h-[500px] md:w-[1000px] md:h-[1000px] pointer-events-none z-0 opacity-30"
        style={{
          backgroundImage: "url('/images/ornamen-bawah-product.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center left",
          backgroundSize: "contain",
        }}
      ></div>

      <div
        className="hidden lg:block absolute bottom-0 -right-[150px] md:-right-[550px] w-[600px] h-[350px] md:w-[1200px] md:h-[1200px] pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: "url('/images/ornamen-bawah-product.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
          backgroundSize: "contain",
        }}
      ></div>

      <div className="relative z-10">
        <section className="relative w-full h-[50vh] md:h-[65vh] flex items-center justify-center mb-16 md:mb-24 overflow-hidden">
          <img
            src="/images/aboutus-img-1.png"
            alt="About Us Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-biru-tua-2/70 mix-blend-multiply z-10"></div>

          <div className="relative z-20 text-center px-4 pt-16 md:pt-0">
            <h1 className="text-4xl md:text-6xl font-bold drop-shadow-lg tracking-wide">
              {text.title}
            </h1>
            <p className="text-3xl md:text-5xl font-semibold text-hijau-lime mt-2 drop-shadow-lg">
              {text.subtitle}
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-16 mb-20 md:mb-32 items-center">
          <img
            src="/images/aboutus-img-2.png"
            className="w-full rounded-xl shadow-lg"
            alt="Hobby"
          />
          <div>
            <h2 className="font-semibold leading-tight mb-4 text-center md:text-left">
              <span className="text-2xl md:text-4xl block text-white">
                {text.hobbyTitle1}
              </span>
              <span className="text-3xl md:text-5xl block text-hijau-lime mt-1">
                {text.hobbyTitle2}
              </span>
            </h2>
            <p className="text-justify text-slate-300 leading-relaxed text-sm md:text-base">
              Berawal dari sekadar hobi mengoleksi ikan-ikan langka, kini
              berkembang menjadi sebuah perusahaan yang berfokus pada salah satu
              spesies ikan air tawar paling istimewa: Mahseer. Dengan kecintaan
              yang mendalam terhadap Mahseer, Exotic Mahseer hadir sebagai
              platform yang memfasilitasi eksplorasi sekaligus jual beli ikan
              Mahseer secara aman dan terpercaya.
            </p>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-16 mb-20 md:mb-32 items-center">
          <div className="order-2 md:order-1">
            <h2 className="font-semibold leading-tight mb-4 text-center md:text-right">
              <span className="text-2xl md:text-4xl block text-white">
                {text.valuesTitle1}
              </span>
              <span className="text-3xl md:text-5xl block text-hijau-lime mt-1">
                {text.valuesTitle2}
              </span>
            </h2>
            <p className="text-justify text-slate-300 leading-relaxed text-sm md:text-base">
              Exotic Mahseer berdiri di atas nilai-nilai keaslian, kualitas, dan
              tanggung jawab terhadap lingkungan. Kami percaya bahwa pelestarian
              ikan Mahseer harus berjalan seiring dengan pengembangan bisnis.
              Karena itu, setiap proses budidaya dilakukan secara berkelanjutan
              dan ramah lingkungan. Kami juga bekerja sama dengan komunitas
              lokal dan pihak konservasi untuk menjaga kelestarian Mahseer, agar
              ikan langka ini tetap bisa dinikmati oleh generasi mendatang.
            </p>
          </div>
          <img
            src="/images/aboutus-img-3.png"
            className="w-full rounded-xl shadow-lg order-1 md:order-2"
            alt="Values"
          />
        </section>

        <section className="py-4 relative overflow-hidden mb-20 md:mb-32">
          <div className="w-[85%] mx-auto mb-12 md:mb-16">
            <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="font-semibold leading-tight mb-8 md:mb-12">
              <span className="text-2xl md:text-4xl block text-white">
                {text.achievementsTitle1}
              </span>
              <span className="text-3xl md:text-5xl block text-hijau-lime mt-1">
                {text.achievementsTitle2}
              </span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center max-w-5xl mx-auto">
              <div className="bg-sky-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <span className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-[#738DDA] to-biru-tua bg-clip-text text-transparent mb-1 md:mb-2">
                  100+
                </span>
                <span className="text-[#1e3a8a] font-medium text-sm md:text-lg">
                  {text.clients}
                </span>
              </div>

              <div className="bg-sky-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-xl hover:-translate-y-1 transition-transform duration-300">
                <span className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-[#738DDA] to-biru-tua bg-clip-text text-transparent mb-1 md:mb-2">
                  30+
                </span>
                <span className="text-[#1e3a8a] font-medium text-sm md:text-lg">
                  {text.shipping}
                </span>
              </div>

              <div className="bg-sky-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-xl hover:-translate-y-1 transition-transform duration-300 sm:col-span-2 md:col-span-1 sm:w-1/2 md:w-auto sm:mx-auto md:mx-0">
                <span className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-[#738DDA] to-biru-tua bg-clip-text text-transparent mb-1 md:mb-2">
                  3
                </span>
                <span className="text-[#1e3a8a] font-medium text-sm md:text-lg">
                  {text.experience}
                </span>
              </div>
            </div>
          </div>

          <div className="w-[85%] mx-auto mt-12 md:mt-16">
            <div className="h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 md:gap-16 mb-16 md:mb-32 items-center">
          <img
            src="/images/aboutus-img-4.png"
            className="w-full rounded-xl shadow-lg"
            alt="Global"
          />
          <div>
            <h2 className="font-semibold leading-tight mb-4 text-center md:text-left">
              <span className="text-2xl md:text-4xl block text-white">
                {text.globalizeTitle1}
              </span>
              <span className="text-3xl md:text-5xl block text-hijau-lime mt-1">
                {text.globalizeTitle2}
              </span>
            </h2>
            <p className="text-justify text-slate-300 leading-relaxed text-sm md:text-base">
              Didorong oleh kecintaan yang mendalam terhadap ikan Mahseer,
              Exotic Mahseer berkomitmen untuk memperluas jangkauannya ke pasar
              internasional. Langkah ini bukan hanya bertujuan untuk menjangkau
              konsumen baru di berbagai belahan dunia, tetapi juga untuk
              memperkenalkan keindahan dan keunikan Mahseer kepada lebih banyak
              orang. Melalui ekspansi ini, Exotic Mahseer berharap dapat
              menumbuhkan apresiasi global terhadap Mahseer, sekaligus
              menginspirasi semakin banyak pecinta ikan untuk mengenal dan
              mencintai spesies luar biasa ini.
            </p>
          </div>
        </section>

        <div className="relative z-10 mb-6 md:mb-16">
          <ActivitiesHighlight activities={activities} />
        </div>
      </div>
    </div>
  );
}
