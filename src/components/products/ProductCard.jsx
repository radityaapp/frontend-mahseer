import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const formatPrice = (amount, currency = "IDR") => {
  const price = Number(amount);
  if (isNaN(price)) return "0";

  let locale = "id-ID";
  let options = {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  };

  if (currency === "USD") {
    locale = "en-US";
    options.minimumFractionDigits = 2;
    options.maximumFractionDigits = 2;
  }

  return new Intl.NumberFormat(locale, options).format(price);
};

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const currentLang = Cookies.get("lang") || "id";

  const handleClick = () => {
    navigate(`/products/${product.slug}`);
  };

  const mainImage = product.image_cover;
  const hoverImage =
    product.images && product.images.length > 0
      ? product.images.find((img) => img !== mainImage) || product.images[0]
      : mainImage;

  const emptyDescriptionText =
    currentLang === "en"
      ? "No description available."
      : "Tidak ada deskripsi yang tersedia.";

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-xl overflow-hidden cursor-pointer group flex flex-col h-full hover:shadow-lg transition-shadow duration-300 border border-transparent hover:border-sky-100"
    >
      <div className="h-36 md:h-48 overflow-hidden relative">
        <img
          src={mainImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 z-10 group-hover:opacity-0"
          loading="lazy"
        />

        <img
          src={hoverImage}
          alt={`${product.name} hover`}
          className="absolute inset-0 w-full h-full object-cover z-0 scale-110"
          loading="lazy"
        />
      </div>

      <div className="p-3 md:p-5 flex flex-col flex-grow bg-white">
        <h3 className="text-sm md:text-base font-bold text-[#0B1A2E] mb-1 md:mb-2 font-plusjakartasans leading-tight line-clamp-2">
          {product.name}
        </h3>

        <p className="text-slate-500 text-[10px] md:text-[11px] font-semibold leading-relaxed mb-3 md:mb-4 flex-grow line-clamp-2 md:line-clamp-3 font-plusjakartasans">
          {product.general_information ||
            product.description ||
            emptyDescriptionText}
        </p>

        <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <p className="text-sm md:text-base font-bold text-[#0B1A2E] font-plusjakartasans">
            {formatPrice(product.display_price, product.display_currency)}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            className="w-full sm:w-auto px-4 py-1.5 bg-[#D9D046] hover:bg-[#c9c03a] text-[#0B1A2E] text-[14px] font-bold rounded-full transition-colors text-center"
          >
            See more
          </button>
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,

    general_information: PropTypes.string,
    description: PropTypes.string,

    display_price: PropTypes.number.isRequired,
    display_currency: PropTypes.string,

    image_cover: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};
