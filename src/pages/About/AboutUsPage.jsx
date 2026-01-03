import { useEffect } from "react";
import useLocale from "../../hooks/useLocale";

const t = {
  id: {
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-biru-tua-2 text-white pb-10 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/images/ornamen-bawah-product.png" className="absolute -top-[2%] md:-top-[15%] lg:-top-[25%] w-full opacity-80" />
          <img src="/images/ornamen-bawah-product.png" className="absolute left-[60%] md:left-[60%] lg:left-[60%] top-[25%] w-[90%] opacity-80" />       
          <img src="/images/ornamen-bawah-product.png" className="absolute right-[60%] md:right-[60%] lg:right-[60%] top-[50%] w-[90%] opacity-80" />       
          <img src="/images/ornamen-bawah-product.png" className="absolute left-[60%] md:left-[60%] lg:left-[60%] top-[70%] w-[90%] opacity-80" />       
      </div>

      <div className="relative z-10">
        <section className="pt-28 pb-20 text-center relative">
            <h1 className="text-3xl md:text-5xl lg:text-5xl font-bold">{text.title}</h1>
            <p className="text-3xl md:text-4xl lg:text-4xl font-semibold text-hijau-lime mt-2">{text.subtitle}</p>
        </section>
        
        <section className="relative flex justify-center mb-32">
          <img src="/images/aboutus-img-1.png" alt="" className="w-[160%] md:w-full lg:w-full max-w-6xl"/>
        </section>

        <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 mb-24">
          <img src="/images/aboutus-img-2.png" className="w-full rounded-l" />
          <div>
            <h2 className="font-semibold leading-tight mb-4">
              <span className="text-3xl md:text-3xl lg:text-4xl block text-white text-center md:text-left lg:text-left"> 
                {text.hobbyTitle1}
              </span>
              <span className="text-4xl md:text-4xl lg:text-5xl block text-hijau-lime text-center md:text-left lg:text-left">
                {text.hobbyTitle2}
              </span>
            </h2>
            <p className="text-justify text-slate-300 leading-relaxed">
              Berawal dari sekadar hobi mengoleksi ikan-ikan langka, kini berkembang menjadi sebuah perusahaan yang berfokus pada salah satu spesies ikan air tawar paling istimewa: Mahseer. Dengan kecintaan yang mendalam terhadap Mahseer, Exotic Mahseer hadir sebagai platform yang memfasilitasi eksplorasi sekaligus jual beli ikan Mahseer secara aman dan terpercaya.
            </p>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 mb-24">
          <div>
            <h2 className="font-semibold leading-tight mb-4">
              <span className="text-3xl md:text-3xl lg:text-4xl block text-white text-center md:text-right lg:text-right"> 
                {text.valuesTitle1}
              </span>
              <span className="text-4xl md:text-4xl lg:text-5xl block text-hijau-lime text-center md:text-right lg:text-right">
                {text.valuesTitle2}
              </span>
            </h2>
            <p className="text-justify text-slate-300 leading-relaxed">
                Exotic Mahseer berdiri di atas nilai-nilai keaslian, kualitas, dan tanggung jawab terhadap lingkungan. Kami percaya bahwa pelestarian ikan Mahseer harus berjalan seiring dengan pengembangan bisnis. Karena itu, setiap proses budidaya dilakukan secara berkelanjutan dan ramah lingkungan. Kami juga bekerja sama dengan komunitas lokal dan pihak konservasi untuk menjaga kelestarian Mahseer, agar ikan langka ini tetap bisa dinikmati oleh generasi mendatang.            </p>
          </div>
          
          <img src="/images/aboutus-img-3.png" className="w-full rounded-l" />
        </section>

        <section className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-10 mb-24">
          <img src="/images/aboutus-img-4.png" className="w-full rounded-l" />
          <div>
            <h2 className="font-semibold leading-tight mb-4">
              <span className="text-3xl md:text-3xl lg:text-4xl block text-white text-center md:text-left lg:text-left"> 
                {text.globalizeTitle1}
              </span>
              <span className="text-4xl md:text-4xl lg:text-5xl block text-hijau-lime text-center md:text-left lg:text-left">
                {text.globalizeTitle2}
              </span>
            </h2>
            <p className="text-justify text-slate-300 leading-relaxed">
                Didorong oleh kecintaan yang mendalam terhadap ikan Mahseer, Exotic Mahseer berkomitmen untuk memperluas jangkauannya ke pasar internasional. Langkah ini bukan hanya bertujuan untuk menjangkau konsumen baru di berbagai belahan dunia, tetapi juga untuk memperkenalkan keindahan dan keunikan Mahseer kepada lebih banyak orang. Melalui ekspansi ini, Exotic Mahseer berharap dapat menumbuhkan apresiasi global terhadap Mahseer, sekaligus menginspirasi semakin banyak pecinta ikan untuk mengenal dan mencintai spesies luar biasa ini            </p>
          </div>
        </section>

        <section className="py-4 relative overflow-hidden">
          <div className="w-[90%] mx-auto my-16">
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          <h2 className="font-semibold leading-tight mb-12">
              <span className="text-2xl md:text-2xl lg:text4xl block text-white text-center"> 
                {text.achievementsTitle1}
              </span>
              <span className="text-3xl md:text-3xl lg:text-5xl block text-hijau-lime text-center">
                {text.achievementsTitle2}
              </span>
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            <div className="bg-sky-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
              <span className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-[#738DDA] to-biru-tua bg-clip-text text-transparent mb-1 md:mb-2">
                100+
              </span>
              <span className="text-[#1e3a8a] font-medium text-sm md:text-lg">
                {text.clients}
              </span>
            </div>

            <div className="bg-sky-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
              <span className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-[#738DDA] to-biru-tua bg-clip-text text-transparent mb-1 md:mb-2">
                30+
              </span>
              <span className="text-[#1e3a8a] font-medium text-sm md:text-lg">
                {text.shipping}
              </span>
            </div>

            <div className="bg-sky-50 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[140px] md:min-h-[180px] shadow-lg transform hover:-translate-y-1 transition-transform duration-300 sm:col-span-2 md:col-span-1 sm:w-1/2 md:w-auto sm:mx-auto md:mx-0">
              <span className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-[#738DDA] to-biru-tua bg-clip-text text-transparent mb-1 md:mb-2">
                3
              </span>
              <span className="text-[#1e3a8a] font-medium text-sm md:text-lg">
                {text.experience}
              </span>
            </div>
          </div>
        </div>

        <div className="w-[90%] mx-auto my-16">
          <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
        </section>        
      </div>
    </div>
  );
}
