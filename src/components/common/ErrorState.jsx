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
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center font-plusjakartasans animate-in fade-in zoom-in duration-300">
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full flex flex-col items-center">
        <div className="bg-red-50 p-4 rounded-full mb-6 border border-red-100 shadow-sm relative group">
          <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
          <AlertTriangle
            size={40}
            className="text-red-500 relative z-10 group-hover:scale-110 transition-transform duration-200"
            strokeWidth={2}
          />
        </div>

        <h3 className="text-xl font-bold text-[#0B1A2E] mb-3">
          {displayTitle}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-8">
          {displayMessage}
        </p>

        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#D9D046] hover:bg-[#c9c03a] text-[#0B1A2E] rounded-full font-bold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
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
