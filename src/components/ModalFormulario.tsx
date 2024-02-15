// ModalFormulario.tsx

import React from 'react';
import { Dialog } from 'primereact/dialog';
import Formulario from './Formulario';

interface Licenses {
    customerMail: '',
    customerName: '',
    initialDate: '',
    expirationDate: '',
    purchaseDate: '',
    usersNumber: '',
    licenseType: '',
    _id: '',
    id: '',
}
interface ModalFormularioProps {
  visible: boolean;
  onHide: () => void;
  selectedLicense: Licenses | null;
}

const ModalFormulario: React.FC<ModalFormularioProps> = ({ visible, onHide,selectedLicense }) => {
  return (
    <Dialog header={selectedLicense ? "Editar Licencia" : "Crear Licencia"} visible={visible} style={{ width: '50vw' }} onHide={onHide}>
      <Formulario onHide={onHide} selectedLicense={selectedLicense}  />
    </Dialog>
  );
};

export default ModalFormulario;
