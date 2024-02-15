import { useState } from "react";
import { Button } from "primereact/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faGauge } from "@fortawesome/free-solid-svg-icons";
import Table from "../components/Table";
import ModalFormulario from "../components/ModalFormulario";

const Layout = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="grid min-h-screen min-w-full grid-cols-6 grid-rows-none">
      <header className="col-span-6 text-3xl font-bold bg-white h-16 sticky top-0"></header>
      <nav className="row-span-5 bg-blue-600 flex flex-col items-left fixed h-full w-52 z-40">
        <img src="./src/assets/images/logo.png" alt="" className="h-20 m-4" />
        <a href="#" className="py-4 pl-6 text-white hover:bg-blue-800">
          <FontAwesomeIcon icon={faGauge} className="text-xl mr-2" />
          Dashboard
        </a>
        <a href="#" className="py-4 pl-6 text-white hover:bg-blue-800">
          <FontAwesomeIcon icon={faIdCard} className="text-xl mr-2" />
          Licenses
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
        <ModalFormulario visible={modalVisible} onHide={handleCloseModal} />
        <Table />
      </section>
      <footer className="col-span-6 h-8">
        <div className="flex justify-center items-center h-full text-black text-xs">
          Copyright &copy; 2024 SEQUAL S.A.S
        </div>
      </footer>
    </div>
  );
};

export default Layout;
