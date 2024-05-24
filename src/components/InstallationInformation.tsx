

import React from "react";
import "../App.css";

interface DetailsInstallation {
  id: "";
  _id: "";
  user_name: "";
  session_state: boolean;
  local_ip: "";
  public_ip: "";
  mac_address: "";
  entry_date: "";
  created_at: "";
}

interface InfoInstallationProps {
  onHide: () => void;
  selectedInstallationDetails: DetailsInstallation | null;
}

const InstallationInformation: React.FC<InfoInstallationProps> = ({
  selectedInstallationDetails,
}) => {

  return (
    <div className="container_detail_principal">
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">User Name:</h1>
        <h4 className="container_detail_principal_header_descripcion">
          {selectedInstallationDetails?.user_name}
        </h4>
      </div>
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">Local IP</h1>
        <h4 className="container_detail_principal_header_descripcion">
          {selectedInstallationDetails?.local_ip}
        </h4>
      </div>
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">Mac Address</h1>
        <h4 className="container_detail_principal_header_descripcion">
          {selectedInstallationDetails?.mac_address}
        </h4>
      </div>
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">Entry Date</h1>
        <h4 className="container_detail_principal_header_descripcion">
          {selectedInstallationDetails?.entry_date}
        </h4>
      </div>
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">
          Created Date
        </h1>
        <h4 className="container_detail_principal_header_descripcion">
          {selectedInstallationDetails?.created_at}
        </h4>
      </div>
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">
          Session State
        </h1>
        <h4 className="container_detail_principal_header_descripcion">
          {selectedInstallationDetails?.session_state === true ? "Active" : "Inactive"}
        </h4>
      </div>
    </div>
  );
};

export default InstallationInformation;
