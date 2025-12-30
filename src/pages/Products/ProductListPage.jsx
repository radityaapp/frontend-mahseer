import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { fetchProducts, fetchCategories } from "../../api/products";
import ProductCard from "../../components/products/ProductCard";
import Loader from "../../components/common/Loader";
import ErrorState from "../../components/common/ErrorState";
import useLocale from "../../hooks/useLocale";
import { Filter, ChevronDown, X } from "lucide-react";

const FilterSidebar = ({
  categories,
  activeCategory,
  setActiveCategory,
  activeSort,
  setActiveSort,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { locale } = useLocale();

  const translations = {
    id: {
      filterBtn: "Filter & Urutkan",
      closeBtn: "Tutup Filter",
      titleCategory: "Kategori",
      titlePrice: "Harga",
      labelAll: "Semua",
      labelLowest: "Termurah",
      labelHighest: "Termahal",
    },
    en: {
      filterBtn: "Filter & Sort",
      closeBtn: "Close Filter",
      titleCategory: "Category",
      titlePrice: "Price",
      labelAll: "All",
      labelLowest: "Lowest Price",
      labelHighest: "Highest Price",
    },
  };

  const t = translations[locale] || translations.id;
  const categoryList = [{ slug: "semua", name: t.labelAll }, ...categories];

  return (
    <aside className="w-full md:w-64 flex-shrink-0 mb-8 md:mb-0 font-plusjakartasans z-20 relative">
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-5 py-3 bg-[#152744] border border-sky-800/50 rounded-xl text-sky-100 font-bold transition-all active:scale-98"
        >
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-[#D9D046]" />
            <span>{isOpen ? t.closeBtn : t.filterBtn}</span>
          </div>
          {isOpen ? (
            <X size={18} className="text-sky-400" />
          ) : (
            <ChevronDown size={18} className="text-sky-400" />
          )}
        </button>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block bg-[#152744] md:bg-transparent p-5 md:p-0 rounded-2xl md:rounded-none border border-sky-800/50 md:border-none shadow-xl md:shadow-none transition-all`}
      >
        <div className="mb-8">
          <h3 className="text-[#D9D046] font-bold text-lg mb-4 md:mb-6 tracking-wide border-b border-[#D9D046]/20 pb-2 md:border-none md:pb-0">
            {t.titleCategory}
          </h3>

          {categories.length === 0 ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-4 bg-sky-800/30 rounded w-3/4"></div>
              ))}
            </div>
          ) : (
            <ul className="space-y-2 md:space-y-4">
              {categoryList.map((cat) => (
                <li key={cat.slug || cat.id}>
                  <button
                    onClick={() => {
                      setActiveCategory(cat.slug);
                      setIsOpen(false);
                    }}
                    className={`text-[15px] text-left transition-all duration-200 w-full block py-1 md:py-0 ${
                      activeCategory === cat.slug
                        ? "text-white font-bold pl-3 border-l-[3px] border-[#D9D046]"
                        : "text-sky-200/60 hover:text-[#D9D046] pl-0 hover:pl-2"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h3 className="text-[#D9D046] font-bold text-lg mb-4 md:mb-6 tracking-wide border-b border-[#D9D046]/20 pb-2 md:border-none md:pb-0">
            {t.titlePrice}
          </h3>
          <ul className="space-y-2 md:space-y-4">
            <li>
              <button
                onClick={() => {
                  setActiveSort("termurah");
                  setIsOpen(false);
                }}
                className={`text-[15px] text-left transition-all duration-200 w-full block py-1 md:py-0 ${
                  activeSort === "termurah"
                    ? "text-white font-bold pl-3 border-l-[3px] border-[#D9D046]"
                    : "text-sky-200/60 hover:text-[#D9D046] pl-0 hover:pl-2"
                }`}
              >
                {t.labelLowest}
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveSort("termahal");
                  setIsOpen(false);
                }}
                className={`text-[15px] text-left transition-all duration-200 w-full block py-1 md:py-0 ${
                  activeSort === "termahal"
                    ? "text-white font-bold pl-3 border-l-[3px] border-[#D9D046]"
                    : "text-sky-200/60 hover:text-[#D9D046] pl-0 hover:pl-2"
                }`}
              >
                {t.labelHighest}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

FilterSidebar.propTypes = {
  categories: PropTypes.array.isRequired,
  activeCategory: PropTypes.string.isRequired,
  setActiveCategory: PropTypes.func.isRequired,
  activeSort: PropTypes.string.isRequired,
  setActiveSort: PropTypes.func.isRequired,
};

export default function ProductListPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(true);
  const [error, setError] = useState(null);

  const [activeCategory, setActiveCategory] = useState("semua");
  const [activeSort, setActiveSort] = useState("");

  const { locale } = useLocale();
  const loadingText =
    locale === "en" ? "Preparing Rods..." : "Menyiapkan Joran...";

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoadingProducts(true);
      setError(null);
      try {
        const result = await fetchProducts({
          category: activeCategory,
          sort: activeSort,
        });

        const productData = Array.isArray(result) ? result : result.data || [];
        setProducts(productData);
      } catch (err) {
        setError(err.message || "Gagal memuat produk");
      } finally {
        setLoadingProducts(false);
      }
    };

    loadData();
  }, [activeCategory, activeSort]);

  return (
    <div className="relative min-h-screen bg-[#0f1f38] font-plusjakartasans overflow-x-hidden">
      <div className="relative z-10 h-[300px] w-full bg-slate-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 z-10"
          style={{
            backgroundImage: "url('/images/background-product.png')",
            opacity: 0.7,
          }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1f38] via-[#0f1f38]/50 to-transparent z-20"></div>

        <div
          className="absolute top-0 right-0 w-full h-full pointer-events-none z-25 opacity-20"
          style={{
            backgroundImage: "url('/images/background-product.png')",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center right",
            backgroundSize: "cover",
          }}
        ></div>

        <div className="relative z-30 h-full flex flex-col items-center justify-center text-center px-4 pt-10">
          <h1 className="text-[#D9D046] text-4xl md:text-5xl font-bold mb-3 tracking-wide drop-shadow-md">
            Our Products
          </h1>
          <p className="text-sky-100 text-sm md:text-base max-w-xl drop-shadow-sm">
            Would you like to buy per fish or as a package? <br />
            Feel free to choose whichever you like.
          </p>
        </div>
      </div>

      <div
        className="absolute bottom-0 -left-[150px] md:-left-[350px] w-[600px] h-[350px] md:w-[1200px] md:h-[700px] pointer-events-none z-0 opacity-50"
        style={{
          backgroundImage: "url('/images/ornamen-bawah-product.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center left",
          backgroundSize: "contain",
        }}
      ></div>

      <div
        className="absolute top-0 -right-[150px] md:-right-[300px] w-[600px] h-[350px] md:w-[1200px] md:h-[700px] pointer-events-none z-0 opacity-50"
        style={{
          backgroundImage: "url('/images/ornamen-bawah-product.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center right",
          backgroundSize: "contain",
        }}
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:sticky md:top-24 h-fit">
            <FilterSidebar
              categories={categories}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              activeSort={activeSort}
              setActiveSort={setActiveSort}
            />
          </div>
          <div className="flex-1">
            {loadingProducts ? (
              <div className="min-h-[400px] flex items-center justify-center">
                <Loader text={loadingText} />
              </div>
            ) : error ? (
              <ErrorState onRetry={() => window.location.reload()} />
            ) : products.length === 0 ? (
              <div className="text-center py-20 bg-[#152744] rounded-xl border border-sky-800 border-dashed">
                <p className="text-sky-200">
                  Tidak ada produk di kategori ini.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}