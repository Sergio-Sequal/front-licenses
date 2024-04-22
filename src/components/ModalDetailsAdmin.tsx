// ModalDetalle.tsx

import React from 'react';
import { Dialog } from 'primereact/dialog';
import AdminInformation from './AdminInformation';
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
  selectedAdminDetails: LicensesDetailsAdmin | null;
}

const ModalDetailsAdmin: React.FC<ModalDetailsAdminProps> = ({ visible, onHide, selectedAdminDetails }) => {
  return (
    
    <Dialog header="License Details" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
        <AdminInformation onHide={onHide} selectedAdminDetails={selectedAdminDetails}  />
  </Dialog>
  );
};

export default ModalDetailsAdmin;