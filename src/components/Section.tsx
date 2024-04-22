import { Button } from "primereact/button";
import Table from "./Table";
import { useState } from "react";
import ModalFormLicense from "./ModalFormLicencse";

const NavBar = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <section className="col-start-2 col-end-7 px-6 mt-5 max-xl:col-start-1 max-xl:col-end-7 max-sm:px-2">
      <div className="flex justify-end max-sm:justify-center">
        <Button
          label="Create a license"
          onClick={handleOpenModal}
          className="mb-5"
          icon="pi pi-plus-circle"
        />
      </div>
      <ModalFormLicense
        visible={modalVisible}
        onHide={handleCloseModal}
        selectedLicense={null}
      />
      <Table />
    </section>
  );
};

export default NavBar;
