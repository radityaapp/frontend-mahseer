import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useLocale from "../../hooks/useLocale";

export default function BannerHero() {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const t = {
    id: {
      title1: "Rasakan",
      title2: "Cita Rasa Otentik",
      title3: "Mahseer Bersama Kami",
      desc: "Exotic Mahseer adalah perusahaan perikanan yang mengkhususkan diri dalam penjualan berbagai jenis Mahseer, ikan air tawar bernilai tinggi. Kami menawarkan peluang eksplorasi dan perdagangan.",
      btn: "Lihat Selengkapnya",
    },
    en: {
      title1: "Experience the",
      title2: "Authentic Taste",
      title3: "of Mahseer with Us",
      desc: "Exotic Mahseer is a fisheries company specializing in the sale of various types of Mahseer, a high-value freshwater fish. We offer exploration and trading opportunities.",
      btn: "See more",
    },
  }[locale];

  return (
    <section className="relative h-[500px] md:h-[600px] w-full bg-slate-900 overflow-hidden font-plusjakartasans">
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=1920')",
        }}
      ></div>

      <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f38]/95 via-[#0f1f38]/70 to-transparent z-10"></div>

      <div className="relative z-20 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 drop-shadow-lg">
            {t.title1} <br />
            <span className="text-hijau-lime">{t.title2}</span> <br />
            {t.title3}
          </h1>

          <p className="text-sky-100 text-sm md:text-lg leading-relaxed mb-8 max-w-lg drop-shadow-md">
            {t.desc}
          </p>

          <button
            onClick={() => navigate("/about")}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 bg-hijau-lime hover:bg-[#B8CA06] text-[#0B1A2E] font-bold rounded-full transition-all shadow-lg hover:-translate-y-1 active:scale-95"
          >
            {t.btn}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
