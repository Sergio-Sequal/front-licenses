import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  RowModel,
  Table,
} from "@tanstack/react-table";

import { defaultData } from "../utils/defaultData";
import { useState } from "react";

interface Column {
  accessorKey: string;
}
const DataTable = (): JSX.Element => {
  const [data, setData] = useState(defaultData);

  const columns: Column[] = [
    {
      accessorKey: "name",
    },
    {
      accessorKey: "lastName",
    },
    {
      accessorKey: "age",
    },
    {
      accessorKey: "status",
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="px-6 py-4">
      <table className="table-auto w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b border-gray-300 text-gray-600 bg-gray-100"
            >
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="py-2 px-4 text-left uppercase">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="text-gray-600 hover:bg-slate-100">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-2 px-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
