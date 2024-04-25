import React from "react";
import "../App.css";
interface AdminDetails {
  adminMail: "";
  adminName: "";
  status: boolean;
  createdAt: "";
  updatedAt: "";
}

interface InfoAdminProps {
  selectedAdminDetails: AdminDetails | null;
}

const AdminInformation: React.FC<InfoAdminProps> = ({
  selectedAdminDetails,
}) => {
  return (
    <div className="container_detail_principal">
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">Email:</h1>
        <h4 className="container_detail_principal_header_descripcion">
          {selectedAdminDetails?.adminMail}
        </h4>
      </div>
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">Name</h1>
        <h4 className="container_detail_principal_header_descripcion">
          {selectedAdminDetails?.adminName}
        </h4>
      </div>
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">
          Created Date
        </h1>
        <h4 className="container_detail_principal_header_descripcion">
          {selectedAdminDetails?.createdAt}
        </h4>
      </div>
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">
          Updated Date
        </h1>
        <h4 className="container_detail_principal_header_descripcion">
          {selectedAdminDetails?.updatedAt}
        </h4>
      </div>
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">Status</h1>
        <h4 className="container_detail_principal_header_descripcion">
          {selectedAdminDetails?.status === true ? "Active" : "Inactive"}
        </h4>
      </div>
    </div>
  );
};

export default AdminInformation;
