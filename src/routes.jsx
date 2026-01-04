import MainLayout from "./layouts/MainLayout";
import ProductListPage from "./pages/Products/ProductListPage";
import ProductDetailPage from "./pages/Products/ProductDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/Home/HomePage";
import AboutUsPage from "./pages/About/AboutUsPage";
import ArticleListPage from "./pages/Articles/ArticleListPage";
import ArticleDetailPage from "./pages/Articles/ArticleDetailPage";

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
        element: <AboutUsPage />,
      },
      {
        path: "articles",
        element: <ArticleListPage />,
      },
      {
        path: "articles/:slug",
        element: <ArticleDetailPage />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
];

export default routes;
