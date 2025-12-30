import { useRoutes } from "react-router-dom";
import routes from "./routes";
import ScrollToTop from "./components/common/ScrollTop";

export default function App() {
  const element = useRoutes(routes);

  return (
    <>
      <ScrollToTop />
      {element}
    </>
  );
}
