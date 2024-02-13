import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState, useEffect } from "react";
import axios from "axios";
import { defaultData } from "../utils/defaultData";

// Definir el tipo de datos para los objetos recibidos de la API
interface Licenses {
  customerName: string;
  initialDate: string;
  expirationDate: string;
  status: boolean;
}

const Table = (): JSX.Element => {
  const [data, setData] = useState<Licenses[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/licenses');
        setData(Object.values(response.data.data));        
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);  

  return (
    <DataTable
      value={data}
      removableSort
      paginator
      rows={5}
      rowsPerPageOptions={[5, 10, 25, 50]}
      tableStyle={{ minWidth: "40rem" }}
    >
      <Column field="customerName" header="Name"></Column>
      <Column field="initialDate" header="Initial Date"></Column>
      <Column field="age" header="Age"></Column>
      <Column field="status" header="Status"></Column>
    </DataTable>
  );
};

export default Table;
