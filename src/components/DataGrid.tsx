import type { DataGridProps } from "@/types/datagrid.types";
import DataGridHeader from "./DataGridHeader";
import DataGridBody from "./DataGridBody";

const DataGrid = <T,>({ data, columns }: DataGridProps<T>) => {
  return (
    <div
      className="
        w-full 
        rounded-lg 
        border 
        border-gray-200 
        dark:border-gray-800 
        bg-white 
        dark:bg-gray-900 
        shadow-sm 
        overflow-x-auto
    "
    >
      <table className="w-full border-collapse text-sm text-gray-700 dark:text-gray-200">
        <DataGridHeader columns={columns} />
        <DataGridBody data={data} columns={columns} />
      </table>
    </div>
  );
};

export default DataGrid;
