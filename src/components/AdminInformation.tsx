import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "../App.css";
interface AdminDetails {
  adminMail: "";
  adminName: "";
  status: boolean;
  createdAt: "";
  updatedAt: "";
}

interface InfoAdminProps {
  onHide: () => void;
  selectedAdminDetails: AdminDetails | null;
}

const AdminInformation: React.FC<InfoAdminProps> = ({
  selectedAdminDetails,
}) => {
  const renderAdmin = () => {
    return (
      <DataTable>
        <Column field="_id" header="User Name"></Column>
        <Column
          field="active"
          header="Active"
          body={(rowData) => (
            <span
              style={{
                color: rowData.active === "true" ? "green" : "red",
                border: `1px solid ${
                  rowData.active === "true" ? "green" : "red"
                }`,
                padding: "2px 4px",
                borderRadius: "4px",
                display: "inline-block",
              }}
            >
              {rowData.active === "true" ? "Activo" : "Inactivo"}
            </span>
          )}
        ></Column>
        <Column field="profile" header="Profile"></Column>
        {/* Agregar más columnas según sea necesario */}
      </DataTable>
    );
  };

  return (
    <div className="container_detail_principal">
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">
          Email:
        </h1>
        <h4 className="container_detail_principal_header_descripcion">
          {selectedAdminDetails?.adminMail}
        </h4>
      </div>
      <div className="container_detail_principal_header">
        <h1 className="container_detail_principal_header_title">
          Name
        </h1>
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
        <h1 className="container_detail_principal_header_title">
          Status
        </h1>
        <h4 className="container_detail_principal_header_descripcion">
            {selectedAdminDetails?.status === true ? 'Active' : 'Inactive'}
        </h4>
      </div>
    </div>
  );
};

export default AdminInformation;
