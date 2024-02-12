import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { defaultData } from "../utils/defaultData";
import { useState } from "react";



const Table = (): JSX.Element => {
    const [data, setData] = useState(defaultData);

  return (
    <DataTable value={data} removableSort paginator rows={5} rowsPerPageOptions={[5, 10, 25, 50]} tableStyle={{ minWidth: "40rem" }}>
      <Column field="name" header="Name"></Column>
      <Column field="lastName" header="Last Name"></Column>
      <Column field="age" header="Age"></Column>
      <Column field="status" header="Status"></Column>
    </DataTable>
  );
};

export default Table;
