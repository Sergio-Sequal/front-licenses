import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { defaultData } from '../utils/defaultData';
import { Dropdown } from 'primereact/dropdown';

const Table = (): JSX.Element => {
  const [data, setData] = useState(defaultData);
  const [globalFilter, setGlobalFilter] = useState('');



  const statusFilter = (
    <Dropdown
      value={null}
      onChange={(e) => {
        setGlobalFilter('');
        setData(defaultData.filter((item) => (e.value ? item.status === e.value : true)));
      }}
      placeholder="Select a Status"
    />
  );

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
        rowsPerPageOptions={[5, 10, 25, 50]}
        tableStyle={{ minWidth: '40rem', maxHeight: '400px', overflowY: 'auto' }}
        globalFilter={globalFilter}
        header={header}
      >
        <Column field="name" header="Name" sortable filter />
        <Column field="lastName" header="Last Name" sortable filter />
        <Column field="age" header="Age" sortable filter />
        <Column field="status" header="Status" sortable filter />
      </DataTable>
    </div>
  );
};

export default Table;
