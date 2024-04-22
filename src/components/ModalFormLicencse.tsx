// ModalFormulario.tsx

import React from "react";
import { Dialog } from "primereact/dialog";
import FormLicense from "./FormLicense";

interface Licenses {
  customerMail: "";
  customerName: "";
  initialDate: "";
  expirationDate: "";
  purchaseDate: "";
  usersNumber: "";
  licenseType: "";
  _id: "";
  id: "";
  organizationCustomer: "";
}
interface ModalFormLicenseProps {
  visible: boolean;
  onHide: () => void;
  selectedLicense: Licenses | null;
}

const ModalFormLicense: React.FC<ModalFormLicenseProps> = ({
  visible,
  onHide,
  selectedLicense,
}) => {
  return (
    <Dialog
      header={selectedLicense ? "Update License" : "Create License"}
      visible={visible}
      style={{ width: "30vw" }}
      onHide={onHide}
    >
      <FormLicense onHide={onHide} selectedLicense={selectedLicense} />
    </Dialog>
  );
};

export default ModalFormLicense;
