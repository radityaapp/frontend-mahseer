import { useRoutes } from "react-router-dom";
import routes from "./routes";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ScrollToTop from "./components/common/ScrollTop";

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-sky-50">
      <Navbar />

      <main className="flex-1">
        <AppRoutes />
      </main>

      <ScrollToTop />

      <Footer />
    </div>
  );
}
