import type { Column } from "@/types/datagrid.types";

type Props<T> = {
  columns: Column<T>[];
  data: T[];
};

const DataGridBody = <T,>({ columns, data }: Props<T>) => {
  return (
    <tbody>
      {data.map((row, rowIndex) => (
        <tr
          key={rowIndex}
          className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
        >
          {columns.map((col) => {
            const value = row[col.key];

            return (
              <td key={String(col.key)} className="px-3 py-2">
                {col.render ? col.render(value, row) : String(value ?? "")}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default DataGridBody;
