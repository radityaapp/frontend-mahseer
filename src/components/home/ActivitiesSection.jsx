import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useLocale from "../../hooks/useLocale";

export default function ActivitiesSection({ activities = [] }) {
  const { locale } = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const title =
    locale === "id"
      ? "Apa yang Exotic Mahseer tawarkan?"
      : "What do Exotic Mahseer offer?";

  const handlePrev = useCallback(() => {
    if (activities.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? activities.length - 1 : prev - 1));
  }, [activities.length]);

  const handleNext = useCallback(() => {
    if (activities.length === 0) return;
    setCurrentIndex((prev) => (prev === activities.length - 1 ? 0 : prev + 1));
  }, [activities.length]);

  useEffect(() => {
    if (isPaused || activities.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused, activities.length]);

  if (!activities || activities.length === 0) return null;

  const activeItem = activities[currentIndex];

  const imageUrl =
    activeItem.image_url ||
    activeItem.featured_image ||
    activeItem.image ||
    (activeItem.images && activeItem.images[0]) ||
    "https://via.placeholder.com/1000x600?text=No+Image";

  return (
    <section className="py-12 md:py-24 bg-[#0B1A2E] relative overflow-hidden font-plusjakartasans">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[#D9D046] rounded-full blur-[100px] md:blur-[150px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-center text-2xl md:text-4xl font-bold text-hijau-lime mb-8 md:mb-12 tracking-wide px-2">
          {title}
        </h2>

        <div
          className="relative group md:px-16 lg:px-24"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-4 top-1/2 -translate-y-1/2 z-30 text-[#D9D046] hover:text-white p-2 md:p-3 rounded-full transition-all active:scale-90 bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border border-white/10 md:border-none shadow-lg md:shadow-none"
            aria-label="Previous"
          >
            <ChevronLeft
              size={24}
              strokeWidth={2.5}
              className="md:w-12 md:h-12"
            />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 md:right-4 top-1/2 -translate-y-1/2 z-30 text-[#D9D046] hover:text-white p-2 md:p-3 rounded-full transition-all active:scale-90 bg-black/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none border border-white/10 md:border-none shadow-lg md:shadow-none"
            aria-label="Next"
          >
            <ChevronRight
              size={24}
              strokeWidth={2.5}
              className="md:w-12 md:h-12"
            />
          </button>

          <div className="relative w-full bg-[#1a2c47] rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 h-[450px] md:h-[500px] flex flex-col justify-end mx-auto max-w-[1008px]">
            <img
              src={imageUrl}
              alt={activeItem.title}
              className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/1000x600?text=Error+Loading";
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1A2E] via-[#0B1A2E]/70 to-transparent z-10"></div>

            <div className="relative z-20 p-6 md:p-12 text-left w-full">
              <h3 className="text-white text-xl md:text-4xl font-bold mb-2 md:mb-4 drop-shadow-md leading-tight line-clamp-2">
                {activeItem.title}
              </h3>

              <div
                className="text-gray-200 text-sm md:text-lg font-medium leading-relaxed opacity-90 prose prose-invert max-w-none line-clamp-3 md:line-clamp-2 mb-2"
                dangerouslySetInnerHTML={{ __html: activeItem.description }}
              />
            </div>
          </div>

          <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
            {activities.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 md:h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-6 md:w-8 bg-[#D9D046]"
                    : "w-2 md:w-2.5 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

ActivitiesSection.propTypes = {
  activities: PropTypes.array,
};
