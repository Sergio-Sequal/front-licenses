import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import ModalFormulario from "./ModalFormulario";
import axios from "axios";

// Definir el tipo de datos para los objetos recibidos de la API
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

const Table = (): JSX.Element => {
  const [data, setData] = useState<Licenses[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedLicense, setSelectedLicense] = useState<Licenses | null>(null);
  const [modalVisible, setModalVisible] = useState(false)

  const editTemplate = (rowData: Licenses) => (
    <Button
      icon="pi pi-pencil"
      className="p-button-warning"
      onClick={() => editLicense(rowData)}
    />
  );

  const editLicense = (rowData: Licenses) => {
    setSelectedLicense(rowData);
    setModalVisible(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api-licences-java.onrender.com/licenses"
        );
        setData(Object.values(response.data.data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // const statusFilter = (
  //   <Dropdown
  //     value={null}
  //     onChange={(e) => {
  //       setGlobalFilter("");
  //       setData(
  //         data.filter((item) => (e.value ? item.status === e.value : true))
  //       );
  //     }}
  //     placeholder="Select a Status"
  //   />
  // );

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
        rows={5}
        rowsPerPageOptions={[5, 10]}
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
        <Column exportable={false} style={{ minWidth: '12rem' }}></Column>
        <Column body={editTemplate} style={{ textAlign: 'center', width: '8em' }} />
      </DataTable>
      <ModalFormulario
        visible={modalVisible}
        onHide={() => {
          setModalVisible(false);
          setSelectedLicense(null);
        }}
        selectedLicense={selectedLicense}
      />
    </div>
  );
};

export default Table;
