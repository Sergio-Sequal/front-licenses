// ModalDetalle.tsx

import React from 'react';
import { Dialog } from 'primereact/dialog';
import InfoUser from './InfoUser';
interface LicensesDetails {
    customerMail: '',
    customerName: '',
    initialDate: '',
    expirationDate: '',
    purchaseDate: '',
    usersNumber: '',
    licenseType: '',
    status: boolean,
    organizationCustomer: ''
    usersWithLicense: [],
}
interface ModalDetailsProps {
  visible: boolean;
  onHide: () => void;
  selectedLicenseDetails: LicensesDetails | null;
}

const ModalDetails: React.FC<ModalDetailsProps> = ({ visible, onHide, selectedLicenseDetails }) => {
  return (
    
    <Dialog header="License Details" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
        <InfoUser onHide={onHide} selectedLicenseDetails={selectedLicenseDetails}  />
  </Dialog>
  );
};

export default ModalDetails;