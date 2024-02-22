import Layout from "./layout/Layout";
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = (): JSX.Element => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga, por ejemplo, 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading && <Loader />}
      <Layout />
      <ToastContainer />
    </div>
  );
};

export default App;
