import { useState } from "react";

import type { DataGridProps } from "@/types/datagrid.types";

import DataGridHeader from "./DataGridHeader";
import DataGridBody from "./DataGridBody";
import DataGridPagination from "./DataGridPagination";

import { useSorting } from "@/hooks/useSorting";
import { usePagination } from "@/hooks/usePagination";
import { useFiltering } from "@/hooks/useFiltering";

const DataGrid = <T,>({
  data,
  columns,
  loading = false,
  pagination = {},
  searchable = false,
  columnFilters = true,
}: DataGridProps<T>) => {
  const { search, setSearch, filters, setFilter, filteredData } = useFiltering(
    data,
    columns,
  );

  const { sortedData, sortColumn, direction, toggleSort } =
    useSorting(filteredData);

  const [visibleColumns, setVisibleColumns] = useState(
    columns.filter((column) => !column.hidden).map((column) => column.key),
  );

  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const displayedColumns = columns.filter((column) =>
    visibleColumns.includes(column.key),
  );

  const pageSize = pagination?.pageSize ?? sortedData.length;

  const {
    currentPage,
    totalPages,
    pagedData,
    nextPage,
    previousPage,
    setCurrentPage,
  } = usePagination(sortedData, pageSize);

  const toggleColumn = (columnKey: keyof T) => {
    setVisibleColumns((current) =>
      current.includes(columnKey)
        ? current.filter((c) => c !== columnKey)
        : [...current, columnKey],
    );
  };

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
      "
    >
      {/* Toolbar */}
      <div
        className="
          flex
          items-center
          gap-2
          p-4
          border-b
          border-gray-200
          dark:border-gray-700
        "
      >
        {searchable && (
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="
              flex-1
              rounded-md
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-900
              text-gray-900
              dark:text-gray-100
              px-3
              py-2
              text-sm
              focus:ring-2
              focus:ring-blue-500
              focus:outline-none
            "
          />
        )}

        <div className="relative">
          <button
            onClick={() => setShowColumnMenu((v) => !v)}
            title="Show / Hide Columns"
            className="
              flex
              items-center
              justify-center
              w-10
              h-10
              rounded-md
              border
              border-gray-300
              dark:border-gray-600
              bg-white
              dark:bg-gray-800
              text-gray-700
              dark:text-gray-200
              hover:bg-gray-100
              dark:hover:bg-gray-700
              transition-colors
            "
          >
            ⚙
          </button>

          {showColumnMenu && (
            <div
              className="
                absolute
                top-full
                right-0
                mt-2
                z-50
                min-w-64
                rounded-lg
                border
                border-gray-200
                dark:border-gray-700
                bg-white
                dark:bg-gray-800
                shadow-lg
                overflow-hidden
              "
            >
              <div
                className="
                  px-3
                  py-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-gray-500
                  dark:text-gray-400
                  border-b
                  border-gray-200
                  dark:border-gray-700
                "
              >
                Visible Columns
              </div>

              <div className="max-h-80 overflow-y-auto">
                {columns.map((column) => (
                  <label
                    key={String(column.key)}
                    className="
                      flex
                      items-center
                      gap-3
                      px-3
                      py-2
                      cursor-pointer
                      text-gray-700
                      dark:text-gray-200
                      hover:bg-gray-100
                      dark:hover:bg-gray-700
                    "
                  >
                    <input
                      type="checkbox"
                      checked={visibleColumns.includes(column.key)}
                      onChange={() => toggleColumn(column.key)}
                      className="
                        rounded
                        border-gray-300
                        text-blue-600
                        focus:ring-blue-500
                      "
                    />

                    <span>{column.header}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div
        className="
          overflow-x-auto
          scrollbar
          scrollbar-h-1
          scrollbar-track-transparent
          scrollbar-thumb-gray-300
          dark:scrollbar-thumb-gray-700
          hover:scrollbar-thumb-gray-400
          dark:hover:scrollbar-thumb-gray-600
        "
      >
        <table className="w-full border-collapse text-sm text-gray-700 dark:text-gray-200">
          <DataGridHeader
            columns={displayedColumns}
            sortColumn={sortColumn}
            direction={direction}
            toggleSort={toggleSort}
            filters={filters}
            setFilter={setFilter}
            showFilters={columnFilters}
          />

          <DataGridBody
            data={pagedData}
            columns={displayedColumns}
            loading={loading}
          />
        </table>
      </div>

      {/* Pagination */}
      {pagination?.pageSize && (
        <DataGridPagination
          page={currentPage}
          totalPages={totalPages}
          onNext={nextPage}
          onPrevious={previousPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default DataGrid;
