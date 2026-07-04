import type { DataGridHeaderProps } from "@/types/datagrid.types";

const DataGridHeader = <T,>({
  columns,
  sortColumn,
  direction,
  toggleSort,
  filters,
  setFilter,
  showFilters = false,
}: DataGridHeaderProps<T>) => {
  return (
    <thead className="bg-gray-50 dark:bg-gray-800">
      <tr>
        {columns.map((col) => {
          const isSortable = col.sortable !== false;
          const isActiveSort = isSortable && sortColumn === col.key;

          return (
            <th
              key={String(col.key)}
              onClick={isSortable ? () => toggleSort(col.key) : undefined}
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
                    {!isActiveSort && "↕"}
                    {isActiveSort && direction === "asc" && "▲"}
                    {isActiveSort && direction === "desc" && "▼"}
                  </span>
                )}
              </div>
            </th>
          );
        })}
      </tr>
      {showFilters && (
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              className="px-3 py-2 text-left font-medium text-gray-600 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700"
            >
              {col.filterable && (
                <input
                  type="text"
                  value={filters[col.key] ?? ""}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setFilter(col.key, e.target.value)}
                  placeholder={`Filter ${col.header}...`}
                  className="bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}
            </th>
          ))}
        </tr>
      )}
    </thead>
  );
};

export default DataGridHeader;
