import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ProductCard from "../products/ProductCard";
import useLocale from "../../hooks/useLocale";

export default function ProductHighlightSection({ products = [] }) {
  const navigate = useNavigate();
  const { locale } = useLocale();

  const t = {
    id: {
      title: "Produk Terbaru Kami",
      subtitle: "Segar dari sungai langsung untuk Anda",
      btn: "Lebih Banyak Produk",
    },
    en: {
      title: "Our newest products",
      subtitle: "Fresh from the river directly to you",
      btn: "More Products",
    },
  }[locale];

  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 bg-[#0B1A2E] relative font-plusjakartasans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-[#D9D046] text-3xl md:text-4xl font-bold mb-2">
            {t.title}
          </h2>
          <p className="text-sky-200/70">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/products")}
            className="px-8 py-3 bg-[#D9D046] hover:bg-[#c9c03a] text-[#0B1A2E] font-bold rounded-full transition-colors shadow-lg"
          >
            {t.btn}
          </button>
        </div>
      </div>

      <div
        className="absolute bottom-0 right-0 w-[600px] h-[400px] opacity-30 pointer-events-none"
        style={{
          backgroundImage: "url('/images/ornamen-kanan-product.png')",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom right",
        }}
      ></div>
    </section>
  );
}

ProductHighlightSection.propTypes = {
  products: PropTypes.array,
};
