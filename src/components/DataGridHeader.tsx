import type { Column } from "@/types/datagrid.types";

type Props<T> = {
  columns: Column<T>[];
};

const DataGridHeader = <T,>({ columns }: Props<T>) => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        {columns.map((col) => {
          const isSortable = !!col.sortable;

          return (
            <th
              key={String(col.key)}
              className={`
                px-3 
                py-2 
                text-left 
                font-medium 
                text-gray-600 
                dark:text-gray-200 
                border-b 
                border-gray-200 
                dark:border-gray-700 
                select-none 
                transition-colors 
                ${
                  isSortable
                    ? "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                    : ""
                }
              `}
            >
              <div className="flex items-center gap-1">
                <span>{col.header}</span>

                {isSortable && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    &#x25B2;&#x25BC;
                  </span>
                )}
              </div>
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default DataGridHeader;
