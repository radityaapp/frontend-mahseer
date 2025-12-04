import PropTypes from "prop-types";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ErrorState({
  title = "Terjadi Kesalahan",
  message = "Kami tidak dapat memuat data. Silakan periksa koneksi internet Anda.",
  onRetry,
}) {
  return (
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center font-plusjakartasans animate-in fade-in zoom-in duration-300">
      <div className="bg-red-50 p-4 rounded-full mb-4 border border-red-100 shadow-sm relative group">
        <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-20"></div>
        <AlertTriangle
          size={48}
          className="text-red-500 relative z-10 group-hover:scale-110 transition-transform duration-200"
          strokeWidth={1.5}
        />
      </div>

      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-500 max-w-md mb-8 leading-relaxed font-medium">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-full font-semibold transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0"
        >
          <RefreshCw size={18} />
          <span>Coba Lagi</span>
        </button>
      )}
    </div>
  );
}

ErrorState.propTypes = {
  title: PropTypes.string,
  message: PropTypes.string,
  onRetry: PropTypes.func,
};
