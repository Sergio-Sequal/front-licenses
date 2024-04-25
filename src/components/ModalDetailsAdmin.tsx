// ModalDetalle.tsx

import React from "react";
import { Dialog } from "primereact/dialog";
import AdminInformation from "./AdminInformation";
interface LicensesDetailsAdmin {
  adminMail: "";
  adminName: "";
  status: boolean;
  createdAt: "";
  updatedAt: "";
}
interface ModalDetailsAdminProps {
  visible: boolean;
  onHide: () => void;
  selectedAdminDetails: LicensesDetailsAdmin;
}

const ModalDetailsAdmin: React.FC<ModalDetailsAdminProps> = ({
  visible,
  onHide,
  selectedAdminDetails,
}) => {
  return (
    <Dialog
      header="License Details"
      visible={visible}
      style={{ width: "50vw" }}
      onHide={onHide}
    >
      <AdminInformation selectedAdminDetails={selectedAdminDetails} />
    </Dialog>
  );
};

export default ModalDetailsAdmin;
