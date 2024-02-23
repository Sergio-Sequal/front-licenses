import { useState } from "react";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faGauge, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Table from "../components/Table";
import ModalFormulario from "../components/ModalFormulario";
import logo from "/src/assets/images/logo.png";
import { useAuth } from "../components/AuthContext";
import { Navigate } from 'react-router-dom';
import { ConfirmDialog } from 'primereact/confirmdialog';

const Layout = (): JSX.Element => {
  const { isAuthenticated, setAuthentication, setToken } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const {  } = useAuth();

  
  // Si no está autenticado, redirigir a la página de inicio de sesión
  if (!isAuthenticated) {
    return <Navigate to="/front-licenses" />;
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
    return <Navigate to="/front-licenses" />;
  };

  const rejectLogout = () => {
    setConfirmationVisible(false);
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const confirmDialogFooter = (
    <>
      <Button label="No" icon="pi pi-times" onClick={rejectLogout} className="p-button-text" />
      <Button label="Cerrar Sesion" icon="pi pi-check" onClick={confirmLogout} autoFocus />
    </>
  );
  return (
    <div className="grid grid-cols-6 grid-rows-none z-50">
      <header className="col-span-6 text-3xl font-bold bg-white h-16 sticky top-0"></header>
      <nav className="row-span-5 bg-blue-600 flex flex-col items-left fixed h-full w-52 ">
        <img src={logo} alt="" className="h-20 m-4" />
        <a href="#" className="py-4 pl-6 text-white hover:bg-blue-800">
          <FontAwesomeIcon icon={faGauge} className="text-xl mr-2" />
          Dashboard
        </a>
        <a href="#" className="py-4 pl-6 text-white hover:bg-blue-800">
          <FontAwesomeIcon icon={faIdCard} className="text-xl mr-2" />
          Licenses
        </a>
        <a href="#" className="py-4 pl-6 text-white hover:bg-blue-800" onClick={handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} className="text-xl mr-2" />
          Cerrar Sesion
        </a>
      </nav>
      <section className="col-start-2 col-span-5 row-span-3 p-6">
        <div className="flex justify-end">
          <Button
            label="Create a license"
            onClick={handleOpenModal}
            className="mb-5"
            icon="pi pi-plus-circle"
          />
        </div>
        <ModalFormulario
          visible={modalVisible}
          onHide={handleCloseModal}
          selectedLicense={null}
        />
        <Table />
      </section>
      <footer className="col-span-6 h-8">
        <div className="flex justify-center items-center h-full text-black text-xs">
          Copyright &copy; 2024 SEQUAL S.A.S
        </div>
      </footer>
      <ConfirmDialog
        visible={confirmationVisible}
        onHide={() => setConfirmationVisible(false)}
        message="¿Está seguro de que desea cerrar la sesión?"
        header="Confirmar Cierre de Sesión"
        footer={confirmDialogFooter}
      />
    </div>
  );
};

export default Layout;
