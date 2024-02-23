import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import axiosInstance from "../services/axiosInstance";
import { Button } from "primereact/button";
import ModalFormulario from "./ModalFormulario";
import ModalDetails from "./ModalDetails";
//import RenewModal from "./RenewModal";
import { ToggleButton } from "primereact/togglebutton";
//importar ruta servidor
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

// Definir el tipo de datos para los objetos recibidos de la API
interface Licenses {
  customerMail: "";
  customerName: "";
  initialDate: "";
  expirationDate: "";
  purchaseDate: "";
  usersNumber: "";
  licenseType: "";
  _id: "";
  id: "";
  organizationCustomer: "";
}

interface LicensesDetails {
  customerMail: "";
  customerName: "";
  initialDate: "";
  expirationDate: "";
  purchaseDate: "";
  usersNumber: "";
  licenseType: "";
  usersWithLicense: [];
  organizationCustomer: "";
  status: boolean;
}
// interface LicensesRenueDate {
//   _id: '',
//   id: '',
//   initialDate: '',
//   expirationDate: '',
//   purchaseDate: '',

// }

interface LicenseStatusChange {
  id: "";
  _id: "";
  status: boolean;
}

const Table = (): JSX.Element => {
  const { token } = useAuth();
  const [data, setData] = useState<Licenses[]>([]);
  const [dataStatus, setDataStatus] = useState<LicenseStatusChange[]>([]);

  const [globalFilter, setGlobalFilter] = useState("");

  const [selectedLicense, setSelectedLicense] = useState<Licenses | null>(null);
  // const [selectedLicenseRenuew, setSelectedLicenseRenuew] = useState<LicensesRenueDate | null>(null);

  const [selectedLicenseDetails, setSelectedLicenseDetails] =
    useState<LicensesDetails | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalDetailVisible, setModalDetailVisible] = useState(false);

  // const [renewModalVisible, setRenewModalVisible] = useState(false);

  // const showRenewModal = (rowData: Licenses) => {
  //   setSelectedLicenseRenuew(rowData);

  //   setRenewModalVisible(true);
  // };

  // const hideRenewModal = () => {
  //   setRenewModalVisible(false);
  // };

  // Nueva función y plantilla para el botón de renovar

  //editar
  const editTemplate = (rowData: Licenses) => (
    <Button
      icon="pi pi-pencil"
      className="p-button-warning"
      onClick={() => editLicense(rowData)}
    />
  );

  const toggleStatusTemplate = (rowData: LicenseStatusChange) => (
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

  const toggleStatus = async (rowData: LicenseStatusChange) => {
    try {
      // Actualizar el estado localmente
      const updatedData = dataStatus.map((license) =>
        license.id === rowData.id
          ? { ...license, status: !license.status }
          : license
      );
      setDataStatus(updatedData);

      // Realizar la llamada a la API para actualizar el estado en el servidor
      try {
        await axiosInstance.get(
          `/licenses/status?id=${rowData._id}`,
          {
            headers: {
              'Authorization': `${token}`
            }
          }
        );
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

  const editLicense = (rowData: Licenses) => {
    setSelectedLicense(rowData);
    setModalVisible(true);
  };

  const viewTemplate = (rowData: LicensesDetails) => (
    <Button
      icon="pi pi-eye"
      className="p-button-info"
      onClick={() => viewLicense(rowData)}
    />
  );

  const viewLicense = (rowData: LicensesDetails) => {
    setSelectedLicenseDetails(rowData);
    setModalDetailVisible(true);
  };

  useEffect(() => {
    // Realizar la solicitud GET al cargar el componente
    axiosInstance
      .get("/licenses", {
        headers: {
          Authorization: `${token}`, // Reemplaza con el nombre correcto de tu token
          'Content-Type': 'application/json',
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
      <h5 className="p-m-0">Manage Licenses</h5>
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
        paginator
        rows={6}
        //rowsPerPageOptions={[5, 10]}
        tableStyle={{
          minWidth: "40rem",
          maxHeight: "400px",
          overflowY: "auto",
        }}
        globalFilter={globalFilter}
        header={header}
        editMode="row"
        dataKey="id"
      >
        <Column field="customerName" header="Name" sortable filter />
        <Column field="initialDate" header="Initial Date" sortable filter />
        <Column
          field="expirationDate"
          header="Expiration Date"
          sortable
          filter
        />
        <Column field="status" header="Status" sortable filter />

        <Column exportable={false} style={{ minWidth: "12rem" }}></Column>
        <Column
          field="status"
          header="Status"
          body={toggleStatusTemplate}
          style={{ textAlign: "center", width: "8em" }}
        />
        <Column
          body={viewTemplate}
          style={{ textAlign: "center", width: "8em" }}
          header="Detail"
        />
        <Column
          body={editTemplate}
          style={{ textAlign: "center", width: "8em" }}
          header="Update"
        />
        {/* <Column header="Renovar" body={(rowData: Licenses) => (
          <Button
            icon="pi pi-refresh"
            className="p-button-success"
            onClick={() => showRenewModal(rowData)}
          />
        )}
          style={{ textAlign: 'center', width: '8em' }}
        /> */}
      </DataTable>
      <ModalFormulario
        visible={modalVisible}
        onHide={() => {
          setModalVisible(false);
          setSelectedLicense(null);
        }}
        selectedLicense={selectedLicense}
      />
      <ModalDetails
        visible={modalDetailVisible}
        onHide={() => {
          setModalDetailVisible(false);
          setSelectedLicenseDetails(null);
        }}
        selectedLicenseDetails={selectedLicenseDetails}
      />
      {/* <RenewModal visible={renewModalVisible} onHide={hideRenewModal}  selectedLicenseRenuew={selectedLicenseRenuew} /> */}
    </div>
  );
};

export default Table;
