import Layout from "../pages/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "../components/Loader";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "../components/Login";
import Admin from "../pages/Admin";
import SbotInstallation from "../pages/SbotInstallation";

const AppRouter = (): JSX.Element => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga, por ejemplo, 2 segundos
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <Router>
      {loading && <Loader />}

      <Routes>
        <Route path="/licenses/login" element={<LoginPage />} />
        <Route path="/licenses/home" element={<Layout />} />
        <Route path="/licenses/admins" element={<Admin />} />
        <Route path="/licenses/sbot-installation" element={<SbotInstallation />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
