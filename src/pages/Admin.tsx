import Footer from "../components/Footer";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { Button } from "primereact/button";
import { useState } from "react";
import TableAdmin from "../components/TableAdmin";
import ModalFormAdmin from "../components/ModalFormAdmin";

const Admin = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="grid grid-cols-6 grid-rows-none">
      <Header />
      <NavBar />
      <section className="col-start-2 col-end-7 px-6 mt-5 max-xl:col-start-1 max-xl:col-end-7 max-sm:px-2">
        <div className="flex justify-end max-sm:justify-center">
          <Button
            label="Create Admin"
            onClick={handleOpenModal}
            className="mb-5"
            icon="pi pi-plus-circle"
          />
        </div>
        <ModalFormAdmin
          visible={modalVisible}
          onHide={handleCloseModal}
          selectedAdmin={null}
        />
        <TableAdmin />
        <Footer />
      </section>
    </div>
  );
};

export default Admin;
