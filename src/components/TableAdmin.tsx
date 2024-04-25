import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import axiosInstance from "../services/axiosInstance";
import { Button } from "primereact/button";
import { ToggleButton } from "primereact/togglebutton";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import ModalFormAdmin from "./ModalFormAdmin";
import ModalDetailsAdmin from "./ModalDetailsAdmin";

// Definir el tipo de datos para los objetos recibidos de la API
interface Admin {
  id: "";
  _id: "";
  adminMail: "";
  adminName: "";
  createdAt: "";
  updatedAt: "";
  password: "";
}

interface AdminDetails {
  _id: "";
  id: "";
  adminMail: "";
  adminName: "";
  status: boolean;
  createdAt: "";
  updatedAt: "";
}

interface adminStatusChange {
  id: "";
  _id: "";
  status: boolean;
}

const TableAdmin = (): JSX.Element => {
  const { token } = useAuth();
  const [data, setData] = useState<Admin[]>([]);
  const [dataStatus, setDataStatus] = useState<adminStatusChange[]>([]);

  const [globalFilter, setGlobalFilter] = useState("");

  const [selectedAdmin, setSelectedAdmin] = useState<Admin | null>(null);

  const [selectedAdminDetails, setSelectedAdminDetails] =
    useState<AdminDetails | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetailVisible, setModalDetailVisible] = useState(false);

  //editar
  const editTemplate = (rowData: Admin) => (
    <Button
      icon="pi pi-pencil"
      className="p-button-warning"
      onClick={() => editAdmin(rowData)}
    />
  );

  const toggleStatusTemplate = (rowData: adminStatusChange) => (
    <ToggleButton
      checked={rowData.status}
      onChange={() => toggleStatus(rowData)}
      onLabel="Active"
      offLabel="Inactive"
      onIcon={
        <i className="pi pi-check" style={{ color: "white", padding: "5px" }} />
      }
      offIcon={
        <i className="pi pi-times" style={{ color: "white", padding: "5px" }} />
      }
      style={{
        backgroundColor: rowData.status ? "green" : "red",
        border: "none",
        color: "white",
      }}
    />
  );

  const toggleStatus = async (rowData: adminStatusChange) => {
    try {
      // Actualizar el estado localmente
      const updatedData = dataStatus.map((admin) =>
        admin.id === rowData.id ? { ...admin, status: !admin.status } : admin
      );
      setDataStatus(updatedData);

      // Realizar la llamada a la API para actualizar el estado en el servidor
      try {
        await axiosInstance.get(`/admins/status?id=${rowData._id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        toast("Status updated successfully", {
          type: "success",
          autoClose: 2000,
          position: "top-center",
          theme: "colored",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error en el servidor");
      }
    } catch (error) {
      console.error("Error al actualizar el estado:", error);
    }
  };

  const editAdmin = (rowData: Admin) => {
    setSelectedAdmin(rowData);
    setModalVisible(true);
  };

  const viewTemplate = (rowData: AdminDetails) => (
    <Button
      icon="pi pi-eye"
      className="p-button-info"
      onClick={() => viewAdmin(rowData)}
    />
  );

  const viewAdmin = (rowData: AdminDetails) => {
    setSelectedAdminDetails(rowData);
    setModalDetailVisible(true);
  };

  useEffect(() => {
    // Realizar la solicitud GET al cargar el componente
    axiosInstance
      .get("/admins", {
        headers: {
          Authorization: `${token}`, // Reemplaza con el nombre correcto de tu token
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Manejar la respuesta exitosa

        setData(response.data.data);
      })
      .catch((error) => {
        // Manejar el error
        console.error("Error fetching data:", error);
      });
  }, []);

  const header = (
    <div className="table-header">
      <h5 className="p-m-0">Manage Admin</h5>
      <span className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          type="search"
          onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)}
          placeholder="Search..."
        />
      </span>
    </div>
  );

  return (
    <div className="datatable">
      <DataTable
        value={data}
        removableSort
        scrollable
        scrollHeight="550px"
        paginator
        rows={6}
        tableStyle={{ borderRadius: "1rem" }}
        globalFilter={globalFilter}
        header={header}
        editMode="row"
        dataKey="id"
      >
        <Column field="adminName" header="Admin Name" sortable filter />
        <Column field="adminMail" header="Admin Name" sortable filter />
        <Column field="createdAt" header="Creation Date" sortable filter />

        <Column exportable={false} style={{}}></Column>
        <Column
          field="status"
          header="Status"
          body={toggleStatusTemplate}
          style={{ textAlign: "center" }}
        />
        <Column
          body={viewTemplate}
          style={{ textAlign: "center" }}
          header="Detail"
        />
        <Column
          body={editTemplate}
          style={{ textAlign: "center" }}
          header="Update"
        />
      </DataTable>
      <ModalFormAdmin
        visible={modalVisible}
        onHide={() => {
          setModalVisible(false);
          setSelectedAdmin(null);
        }}
        selectedAdmin={selectedAdmin}
      />
      <ModalDetailsAdmin
        visible={modalDetailVisible}
        onHide={() => {
          setModalDetailVisible(false);
          setSelectedAdminDetails(null);
        }}
        selectedAdminDetails={selectedAdminDetails}
      />
    </div>
  );
};

export default TableAdmin;
