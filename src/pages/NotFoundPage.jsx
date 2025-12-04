import { Link } from "react-router-dom";
import { Fish, Home, ArrowLeft } from "lucide-react";
import Cookies from "js-cookie";

export default function NotFoundPage() {
  const currentLang = Cookies.get("lang") || "id";

  const t = {
    id: {
      title: "Oops! Spot ini kosong.",
      desc: "Sepertinya kail Anda tidak menangkap apa-apa di sini. Halaman yang Anda cari mungkin sudah berenang menjauh atau belum pernah ada.",
      back: "Kembali",
      home: "Ke Beranda",
    },
    en: {
      title: "Oops! This spot is empty.",
      desc: "It looks like your hook didn't catch anything here. The page you are looking for might have swam away or never existed.",
      back: "Go Back",
      home: "Home",
    },
  }[currentLang];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0f1f38] relative overflow-hidden font-plusjakartasans px-4 text-slate-100">
      <div className="absolute top-20 left-20 w-8 h-8 bg-sky-500/20 rounded-full animate-bounce delay-700 blur-[2px]"></div>
      <div className="absolute bottom-32 right-20 w-12 h-12 bg-sky-400/20 rounded-full animate-bounce delay-1000 blur-[4px]"></div>
      <div className="absolute top-1/2 left-10 w-4 h-4 bg-sky-300/30 rounded-full animate-pulse blur-[1px]"></div>
      <div className="absolute bottom-10 left-1/3 w-6 h-6 bg-sky-500/30 rounded-full animate-bounce delay-300"></div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B1A2E]/80 pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        <div className="relative inline-block mb-8">
          <div className="text-[150px] font-extrabold text-[#1e3a5f] leading-none select-none opacity-50">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-[#0B1A2E] p-5 rounded-full shadow-2xl border-2 border-[#D9D046] animate-pulse">
              <Fish
                size={64}
                className="text-[#D9D046] rotate-180"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-wide">
          {t.title}
        </h1>
        <p className="text-sky-200/80 text-sm md:text-base leading-relaxed mb-10 px-6">
          {t.desc}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 rounded-full border border-sky-700 text-sky-300 font-bold hover:bg-sky-900/50 hover:text-white transition-all flex items-center justify-center gap-2 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>{t.back}</span>
          </button>

          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#D9D046] hover:bg-[#c9c03a] text-[#0B1A2E] font-bold shadow-lg shadow-[#D9D046]/10 transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Home size={18} />
            <span>{t.home}</span>
          </Link>
        </div>
      </div>

      <div className="absolute bottom-8 text-[10px] text-sky-800 font-bold tracking-[0.2em] uppercase">
        Exotic Mahseer • 404 Error
      </div>
    </div>
  );
}
