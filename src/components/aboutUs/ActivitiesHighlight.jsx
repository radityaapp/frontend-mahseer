import PropTypes from "prop-types";
import useLocale from "../../hooks/useLocale";

export default function ActivitiesHighlight({ activities = [] }) {
  const { locale } = useLocale();

  const t = {
    id: {
      discover: "Jelajahi",
      title: "Aktivitas Kami",
    },
    en: {
      discover: "Discover",
      title: "Our Activities",
    },
  }[locale];

  if (!activities || activities.length === 0) return null;

  const marqueeItems = [...activities, ...activities];

  return (
    <div className="w-full py-10 font-plusjakartasans">
      <div className="text-center mb-8 md:mb-14 px-4">
        <h3 className="text-white text-lg md:text-2xl font-medium tracking-wider opacity-80">
          {t.discover}
        </h3>
        <h2 className="text-hijau-lime text-3xl md:text-5xl font-bold mt-2">
          {t.title}
        </h2>
      </div>

      <div className="w-full relative overflow-hidden group">
        <div className="flex w-max animate-scroll gap-4 md:gap-6 hover:[animation-play-state:paused] py-4 pl-4">
          {marqueeItems.map((item, index) => {
            const imageUrl =
              item.image ||
              item.featured_image ||
              item.image_url ||
              "https://via.placeholder.com/400x300?text=No+Image";

            return (
              <div
                key={`${item.id}-${index}`}
                className="relative w-[280px] md:w-[380px] h-[180px] md:h-[240px] flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer bg-[#152744] group/card"
              >
                <img
                  src={imageUrl}
                  alt="Activity Documentation"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/10 transition-colors"></div>
              </div>
            );
          })}
        </div>

        <div className="absolute top-0 left-0 h-full w-8 md:w-24 bg-gradient-to-r from-biru-tua-2 to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-8 md:w-24 bg-gradient-to-l from-biru-tua-2 to-transparent z-10 pointer-events-none"></div>
      </div>
    </div>
  );
}

ActivitiesHighlight.propTypes = {
  activities: PropTypes.array,
};
