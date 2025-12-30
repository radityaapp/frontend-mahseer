import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Quote } from "lucide-react";
import useLocale from "../../hooks/useLocale";

export default function TestimonialSection({ testimonials = [] }) {
  const { locale } = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  }, [testimonials.length]);

  const handleNext = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused || testimonials.length === 0) return;
    const interval = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [handleNext, isPaused, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const activeTestimonial = testimonials[currentIndex];
  const title = locale === "id" ? "Apa Kata Mereka" : "What People Say";

  return (
    <section className="py-16 md:py-24 bg-[#0f1f38] border-t border-white/5 font-plusjakartasans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D9D046] rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-center text-2xl md:text-4xl font-bold text-white mb-12 tracking-wide">
          {title}
        </h2>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="bg-[#1a2c47]/90 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl min-h-[350px] flex items-center justify-center transition-all duration-500 mx-0 relative">
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 text-[#D9D046] hover:text-white p-2 rounded-full transition-all active:scale-90 bg-black/10 hover:bg-white/10 backdrop-blur-sm"
              aria-label="Previous"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="drop-shadow-sm w-6 h-6 md:w-8 md:h-8"
              >
                <path d="M14 7l-5 5 5 5V7z" />
              </svg>
            </button>

            <button
              onClick={handleNext}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 text-[#D9D046] hover:text-white p-2 rounded-full transition-all active:scale-90 bg-black/10 hover:bg-white/10 backdrop-blur-sm"
              aria-label="Next"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="drop-shadow-sm w-6 h-6 md:w-8 md:h-8"
              >
                <path d="M10 17l5-5-5-5v10z" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full px-6 md:px-10">
              <div className="flex-shrink-0 flex flex-col items-center text-center">
                <div className="w-28 h-28 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#D9D046] shadow-lg mb-4 relative bg-slate-700">
                  {activeTestimonial.avatar ? (
                    <img
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl text-white font-bold">
                      {activeTestimonial.name?.[0]}
                    </div>
                  )}
                </div>

                <h3 className="text-white text-lg md:text-xl font-bold mb-1">
                  {activeTestimonial.name}
                </h3>
                <p className="text-[#D9D046] font-semibold text-xs md:text-sm uppercase tracking-wider">
                  {activeTestimonial.institution || "Customer"}
                </p>
              </div>

              <div className="flex-1 text-center md:text-left relative">
                <Quote
                  size={48}
                  className="text-[#D9D046] opacity-20 absolute -top-6 -left-6 hidden md:block"
                />

                <p className="text-sky-100 text-base md:text-xl italic leading-relaxed font-semibold relative z-10">
                  {activeTestimonial.description}
                </p>

                <div className="flex justify-center md:justify-start gap-2 mt-8">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex
                          ? "w-8 bg-[#D9D046]"
                          : "w-2 bg-white/20 hover:bg-white/40"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

TestimonialSection.propTypes = {
  testimonials: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
      institution: PropTypes.string,
      description: PropTypes.string,
      avatar: PropTypes.string,
    })
  ),
};
