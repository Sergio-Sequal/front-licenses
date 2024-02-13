// ModalFormulario.tsx

import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Formulario from './Formulario';

interface ModalFormularioProps {
  visible: boolean;
  onHide: () => void;
}

const ModalFormulario: React.FC<ModalFormularioProps> = ({ visible, onHide }) => {
  return (
    <Dialog header="Formulario" visible={visible} style={{ width: '50vw' }} onHide={onHide}>
      <Formulario onHide={onHide} />
    </Dialog>
  );
};

export default ModalFormulario;
