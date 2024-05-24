import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import axiosInstance from "../services/axiosInstance";
import { Button } from "primereact/button";
import { useAuth } from "./AuthContext";
import ModalDetailsInstallation from "./ModalDetailsInstallation";

// Definir el tipo de datos para los objetos recibidos de la API
interface Installation {
  user_name: "";
  session_state: boolean;
  local_ip: "";
  public_ip: "";
  mac_address: "";
  entry_date: "";
  created_at: "";
}

interface InstallationDetails {
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

const InstallationTable = (): JSX.Element => {
  const { token } = useAuth();
  const [data, setData] = useState<Installation[]>([]);

  const [globalFilter, setGlobalFilter] = useState("");

  const [selectedInstallationDetails, setSelectedInstallationDetails] =
    useState<InstallationDetails | null>(null);

  const [modalDetailVisible, setModalDetailVisible] = useState(false);

  const viewTemplate = (rowData: InstallationDetails) => (
    <Button
      icon="pi pi-eye"
      className="p-button-info"
      onClick={() => viewInstallation(rowData)}
    />
  );

  const viewInstallation = (rowData: InstallationDetails) => {
    setSelectedInstallationDetails(rowData);
    setModalDetailVisible(true);
  };

  useEffect(() => {
    // Realizar la solicitud GET al cargar el componente
    axiosInstance
      .get("/instalation_log", {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Manejar la respuesta exitosa
        const sortedData = [...response.data.data].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        setData(sortedData);
      })
      .catch((error) => {
        // Manejar el error
        console.error("Error fetching data:", error);
      });
  }, []);

  const header = (
    <div className="table-header">
      <h5 className="p-m-2">Manage Installation</h5>
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
        tableStyle={{ borderRadius: "1rem", marginTop: ".5rem" }}
        globalFilter={globalFilter}
        header={header}
        editMode="row"
        dataKey="created_at"
      >
        <Column field="user_name" header="User Name" sortable/>
        <Column field="local_ip" header="Local IP" sortable/>
        <Column field="mac_address" header="Mac Address" sortable/>
        <Column field="created_at" header="Created Date" sortable/>
        <Column field="entry_date" header="Entry Date" sortable/>

        <Column
          field="session_state"
          header="Session State"
          body={(data) => {
            const sessionState = data.session_state;
            const status = sessionState ? "Active" : "Inactive";

            return <span>{status}</span>;
          }}
        />
        <Column
          body={viewTemplate}
          style={{ textAlign: "center" }}
          header="Detail"
        />
      </DataTable>

      <ModalDetailsInstallation
        visible={modalDetailVisible}
        onHide={() => {
          setModalDetailVisible(false);
          setSelectedInstallationDetails(null);
        }}
        selectedInstallationDetails={selectedInstallationDetails}
      />
    </div>
  );
};

export default InstallationTable;
