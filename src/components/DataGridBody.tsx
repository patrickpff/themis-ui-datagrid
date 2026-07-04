import type { Column } from "@/types/datagrid.types";

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
};

const DataGridBody = <T,>({ columns, data, loading = false }: Props<T>) => {
  if (loading) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={columns.length}
            className="
            px-4
            py-8
            text-center
            text-gray-500
            dark:text-gray-400
          "
          >
            Loading...
          </td>
        </tr>
      </tbody>
    );
  }
  return (
    <tbody>
      {data.length === 0 ? (
        <tr>
          <td
            colSpan={columns.length}
            className="px-3 py-2 text-center text-gray-500 dark:text-gray-400"
          >
            No data available
          </td>
        </tr>
      ) : (
        data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {columns.map((col) => {
              const value = row[col.key];
              if (col.type === "link") {
                return (
                  <td key={String(col.key)} className="px-3 py-2">
                    <a
                      href={String(value ?? "")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      🔗
                    </a>
                  </td>
                );
              }
              if (col.type === "boolean") {
                return (
                  <td key={String(col.key)} className="px-3 py-2">
                    <a
                      href={String(value ?? "")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      ✓
                    </a>
                  </td>
                );
              }

              return (
                <td key={String(col.key)} className="px-3 py-2">
                  {col.render ? col.render(value, row) : String(value ?? "")}
                </td>
              );
            })}
          </tr>
        ))
      )}
    </tbody>
  );
};

export default DataGridBody;
