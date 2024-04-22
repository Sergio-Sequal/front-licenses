// ModalFormulario.tsx

import React from "react";
import { Dialog } from "primereact/dialog";
import FormAdmin from "./FormAdmin";


interface Admin {
  _id: "";
  id: "";
  adminMail: "";
  adminName: "";
  password: "";
}
interface ModalFormAdminProps {
  visible: boolean;
  onHide: () => void;
  selectedAdmin: Admin | null;
}

const ModalFormAdmin: React.FC<ModalFormAdminProps> = ({
  visible,
  onHide,
  selectedAdmin,
}) => {
  return (
    <Dialog
      header={selectedAdmin ? "Update Admin" : "Create Admin"}
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
    >
      <FormAdmin onHide={onHide} selectedAdmin={selectedAdmin} />
    </Dialog>
  );
};

export default ModalFormAdmin;
