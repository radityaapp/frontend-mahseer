import { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react"; // Gunakan Lucide icons agar konsisten
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
    }, 5000); // Diperlambat jadi 5 detik agar user sempat baca
    return () => clearInterval(interval);
  }, [handleNext, isPaused, testimonials.length]);

  if (!testimonials || testimonials.length === 0) return null;

  const activeTestimonial = testimonials[currentIndex];
  const title = locale === "id" ? "Apa Kata Mereka" : "What People Say";

  return (
    <section className="py-16 md:py-24 bg-[#0f1f38] border-t border-white/5 font-plusjakartasans relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-[#D9D046] rounded-full blur-[100px] md:blur-[150px]"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-center text-2xl md:text-4xl font-bold text-white mb-8 md:mb-16 tracking-wide drop-shadow-lg">
          {title}
        </h2>

        <div
          className="relative px-0 md:px-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Main Card */}
          <div className="bg-[#1a2c47]/80 backdrop-blur-md p-6 md:p-12 rounded-3xl border border-white/10 shadow-2xl min-h-[300px] md:min-h-[350px] flex items-center justify-center transition-all duration-500 mx-0 relative overflow-hidden">
            {/* Prev Button (Hidden on Mobile) */}
            <button
              onClick={handlePrev}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 text-[#D9D046] hover:text-white p-3 rounded-full transition-all active:scale-90 bg-black/20 hover:bg-white/10 backdrop-blur-sm border border-white/5"
              aria-label="Previous"
            >
              <ChevronLeft size={28} />
            </button>

            {/* Next Button (Hidden on Mobile) */}
            <button
              onClick={handleNext}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 text-[#D9D046] hover:text-white p-3 rounded-full transition-all active:scale-90 bg-black/20 hover:bg-white/10 backdrop-blur-sm border border-white/5"
              aria-label="Next"
            >
              <ChevronRight size={28} />
            </button>

            {/* Content Wrapper */}
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 w-full max-w-4xl">
              {/* Avatar Section */}
              <div className="flex-shrink-0 flex flex-col items-center text-center">
                <div className="w-24 h-24 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#D9D046] shadow-xl mb-4 relative bg-slate-700 ring-4 ring-white/10">
                  {activeTestimonial.avatar ? (
                    <img
                      src={activeTestimonial.avatar}
                      alt={activeTestimonial.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl md:text-5xl text-white font-bold bg-gradient-to-br from-slate-600 to-slate-800">
                      {activeTestimonial.name?.[0]}
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="text-white text-lg md:text-2xl font-bold leading-tight">
                    {activeTestimonial.name}
                  </h3>
                  <p className="text-[#D9D046] font-medium text-xs md:text-sm uppercase tracking-wider">
                    {activeTestimonial.institution || "Customer"}
                  </p>
                </div>
              </div>

              {/* Quote Text Section */}
              <div className="flex-1 text-center md:text-left relative flex flex-col justify-center">
                <Quote
                  size={64}
                  className="text-[#D9D046] opacity-10 absolute -top-8 -left-8 hidden md:block transform -scale-x-100"
                />

                <p className="text-sky-100/90 text-sm md:text-lg italic leading-relaxed md:leading-loose font-medium relative z-10 px-2 md:px-0">
                  &ldquo;{activeTestimonial.description}&rdquo;
                </p>

                {/* Dots Navigation */}
                <div className="flex justify-center md:justify-start gap-2.5 mt-6 md:mt-8">
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
