import PropTypes from "prop-types";

export default function ActivitiesHighlight({ activities = [] }) {
  if (!activities || activities.length === 0) return null;

  const marqueeItems = [...activities, ...activities];

  return (
    <div className="w-full relative overflow-hidden group">
      <div className="flex w-max animate-scroll gap-6 hover:[animation-play-state:paused] py-4">
        {marqueeItems.map((item, index) => {
          const imageUrl =
            item.image ||
            item.featured_image ||
            item.image_url ||
            "https://via.placeholder.com/400x300?text=No+Image";

          return (
            <div
              key={`${item.id}-${index}`}
              className="relative w-[280px] md:w-[380px] h-[180px] md:h-[240px] flex-shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-lg cursor-pointer bg-[#152744]"
            >
              <img
                src={imageUrl}
                alt="Activity Documentation"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-[#0B1A2E] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#0B1A2E] to-transparent z-10 pointer-events-none"></div>
    </div>
  );
}

ActivitiesHighlight.propTypes = {
  activities: PropTypes.array,
};
