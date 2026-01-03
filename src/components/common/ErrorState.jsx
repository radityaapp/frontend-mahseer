import PropTypes from "prop-types";
import { AlertTriangle, RefreshCw } from "lucide-react";
import useLocale from "../../hooks/useLocale";

export default function ErrorState({ title, message, onRetry }) {
  const { locale } = useLocale();

  const defaultText = {
    id: {
      title: "Terjadi Kesalahan",
      message:
        "Kami tidak dapat memuat data. Silakan periksa koneksi internet Anda.",
      retry: "Coba Lagi",
    },
    en: {
      title: "Something Went Wrong",
      message:
        "We couldn't load the data. Please check your internet connection.",
      retry: "Try Again",
    },
  };

  const t = defaultText[locale] || defaultText.id;

  const displayTitle = title || t.title;
  const displayMessage = message || t.message;

  return (
    <div className="w-full py-12 md:py-20 px-4 flex flex-col items-center justify-center text-center font-plusjakartasans animate-in fade-in zoom-in duration-300">
      <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full flex flex-col items-center">
        <div className="bg-red-50 p-3 md:p-4 rounded-full mb-5 md:mb-6 border border-red-100 shadow-sm relative group">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
          <AlertTriangle
            className="text-red-500 relative z-10 group-hover:scale-110 transition-transform duration-200 w-8 h-8 md:w-10 md:h-10"
            strokeWidth={2}
          />
        </div>

        <h3 className="text-lg md:text-2xl font-bold text-[#0B1A2E] mb-2 md:mb-3">
          {displayTitle}
        </h3>

        <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-xs md:max-w-none">
          {displayMessage}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D9D046] hover:bg-[#c9c03a] text-[#0B1A2E] rounded-full font-bold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            <RefreshCw size={18} />
            <span>{t.retry}</span>
          </button>
        )}
      </div>
    </div>
  );
}

ErrorState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
};
