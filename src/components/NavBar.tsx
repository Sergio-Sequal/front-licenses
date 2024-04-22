import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faIdCard,
  faGauge,
  faSignOutAlt,
  faUsers
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { Button } from "primereact/button";
import { ConfirmDialog } from "primereact/confirmdialog";

const NavBar = (): JSX.Element => {
  const { isAuthenticated, setAuthentication, setToken } = useAuth();
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const {} = useAuth();

  // Si no está autenticado, redirigir a la página de inicio de sesión
  if (!isAuthenticated) {
    return <Navigate to="/licenses/login" />;
  }

  const handleLogout = () => {
    setConfirmationVisible(true);
  };

  const confirmLogout = () => {
    // Realiza el logout y redirige
    setConfirmationVisible(false);
    setAuthentication(false);
    setToken(null);
    // Redirige a la página de inicio de sesión
    return <Navigate to="/licenses/login" />;
  };

  const rejectLogout = () => {
    setConfirmationVisible(false);
  };

  const confirmDialogFooter = (
    <>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={rejectLogout}
        className="p-button-text"
      />
      <Button
        label="Cerrar Sesion"
        icon="pi pi-check"
        onClick={confirmLogout}
        autoFocus
      />
    </>
  );

  return (
    <>
      <nav className="nav-bar row-span-5 bg-blue-600 flex flex-col items-left fixed h-full w-52 z-40 max-xl:hidden">
        <Link className="pt-24 py-4 pl-4 text-white hover:bg-blue-800" to={"/licenses/home"}>
          <FontAwesomeIcon icon={faGauge} className="text-xl mr-2" />      
          Dashboard        
        </Link>
        <Link className="py-4 pl-4 text-white hover:bg-blue-800" to={"/licenses/home"}>
          <FontAwesomeIcon icon={faIdCard} className="text-xl mr-2" />
          Licenses
        </Link>
        <Link className="py-4 pl-4 text-white hover:bg-blue-800" to={"/licenses/admins"}>
          <FontAwesomeIcon icon={faUsers} className="text-xl mr-2" />
          Admins
        </Link>
        <a href="#" className="py-4 pl-4 text-white hover:bg-blue-800" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl mr-2" />
          Cerrar Sesion
        </a>
      </nav>
      <ConfirmDialog
        visible={confirmationVisible}
        onHide={() => setConfirmationVisible(false)}
        message="¿Está seguro de que desea cerrar la sesión?"
        header="Confirmar Cierre de Sesión"
        footer={confirmDialogFooter}
      />
    </>
  );
};

export default NavBar;
