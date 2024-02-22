import Layout from "./layout/Layout";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Loader from "./components/Loader";
import { useEffect, useState } from "react";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./components/Login";
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
      <Router>
       {loading && <Loader />}

            <Routes>
                <Route path="/front-licenses/home" element={<Layout />} />
                <Route path="/front-licenses" element={<LoginPage />} />
            </Routes>
        </Router>
    </div>
  );
};

export default App;
