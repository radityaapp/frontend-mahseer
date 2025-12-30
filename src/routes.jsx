import MainLayout from "./layouts/MainLayout";
import ProductListPage from "./pages/Products/ProductListPage";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/Home/HomePage";

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductListPage />,
      },
      {
        path: "products/:slug",
        element: <ProductDetailPage />,
      },
      {
        path: "about",
        element: <div className="p-20 text-center">Halaman About Us</div>,
      },
      {
        path: "articles",
        element: <div className="p-20 text-center">Halaman Artikel</div>,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
