
import { Dialog } from 'primereact/dialog';
interface ModalFormProps {
  visible: boolean;
  onHide: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ visible, onHide }) => {
  return (
    <Dialog
      header="Formulario"
      visible={visible}
      style={{ width: '50vw' }}
      onHide={onHide}
    >
    </Dialog>
  );
};

export default ModalForm;