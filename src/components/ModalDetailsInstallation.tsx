// ModalDetalle.tsx
import React from 'react';
import { Dialog } from 'primereact/dialog';
import InstallationInformation from './InstallationInformation';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
interface DetailsInstallation {
  id: "";
  _id: "";
  user_name: ""
  session_state: boolean;
  local_ip: "";
  public_ip: "";
  mac_address: "";
  entry_date: "";
  created_at: "";
}
interface ModalDetailsInstallationProps {
  visible: boolean;
  onHide: () => void;
  selectedInstallationDetails: DetailsInstallation | null;
}

const ModalDetailsInstallation: React.FC<ModalDetailsInstallationProps> = ({ visible, onHide, selectedInstallationDetails }) => {
  return (
    
    <Dialog header="Installation Details" visible={visible} style={{ width: '40vw'}} onHide={onHide}>
      <hr />
      <InstallationInformation onHide={onHide} selectedInstallationDetails={selectedInstallationDetails}  />
    </Dialog>
  );
};

export default ModalDetailsInstallation;