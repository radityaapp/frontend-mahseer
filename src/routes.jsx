import ProductListPage from "./pages/Products/ProductListPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ProductDetailPage from "./pages/Products/ProductDetailPage.jsx";

const Routess = [
  {
    path: "/products",
    element: <ProductListPage />,
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },

  {
    path: "/products/:slug",
    element: <ProductDetailPage />,
  },
];

export default Routess;
