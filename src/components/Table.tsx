import { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import axiosInstance from "../services/axiosInstance";

// Definir el tipo de datos para los objetos recibidos de la API
interface Licenses {
  customerName: string;
  initialDate: string;
  expirationDate: string;
  status: boolean;
}

const Table = (): JSX.Element => {
  const [data, setData] = useState<Licenses[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  useEffect(() => {
    // Realizar la solicitud GET al cargar el componente
    axiosInstance
      .get("/licenses")
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
        <Column exportable={false} style={{ minWidth: "12rem" }}></Column>
      </DataTable>
    </div>
  );
};

export default Table;
