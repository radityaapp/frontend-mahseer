import PropTypes from "prop-types";
import { Loader2 } from "lucide-react";
import useLocale from "../../hooks/useLocale";

export default function Loader({ text, fullScreen = false }) {
  const { locale } = useLocale();

  const defaultTitle = locale === "en" ? "Loading data..." : "Memuat data...";
  const subText =
    locale === "en" ? "Please wait a moment..." : "Mohon tunggu sebentar...";

  const displayText = text || defaultTitle;

  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm h-screen w-screen"
    : "w-full py-12";

  return (
    <div
      className={`${containerClasses} flex flex-col items-center justify-center font-plusjakartasans transition-all duration-300`}
    >
      <div className="bg-white p-6 rounded-2xl shadow-2xl flex flex-col items-center min-w-[200px] border border-slate-100 transform transition-transform scale-100">
        <div className="relative mb-4">
          <div className="absolute inset-0 bg-sky-200 rounded-full animate-ping opacity-75"></div>

          <div className="relative bg-[#0B1A2E] p-3 rounded-full shadow-md border-2 border-slate-50">
            <Loader2
              size={32}
              className="text-[#D9D046] animate-spin"
              strokeWidth={2.5}
            />
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="text-[#0B1A2E] font-bold text-sm tracking-wide animate-pulse">
            {displayText}
          </p>
          <p className="text-slate-500 text-[10px] font-semibold mt-1">
            {subText}
          </p>
        </div>
      </div>
    </div>
  );
}

Loader.propTypes = {
  text: PropTypes.string,
  fullScreen: PropTypes.bool,
};
