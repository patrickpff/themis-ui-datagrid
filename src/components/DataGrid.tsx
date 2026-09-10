import { useRef, useState } from "react";

import type { DataGridProps } from "@/types/datagrid.types";

import DataGridHeader from "./DataGridHeader";
import DataGridBody from "./DataGridBody";
import DataGridPagination from "./DataGridPagination";
import DataGridColumnMenu from "./DataGridColumnMenu";

import { useSorting } from "@/hooks/useSorting";
import { usePagination } from "@/hooks/usePagination";
import { useFiltering } from "@/hooks/useFiltering";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";
import DataGridToolbar from "./toolbar/DataGridToolbar";

const DataGrid = <T,>({
  data,
  columns,
  loading = false,
  pagination = {},
  searchable = false,
  columnFilters = true,
  columnVisibility = {},
}: DataGridProps<T>) => {
  /*
   * Filtering
   */
  const { search, setSearch, filters, setFilter, filteredData } = useFiltering(
    data,
    columns,
  );

  /*
   * Sorting
   */
  const { sortedData, sortColumn, direction, toggleSort } =
    useSorting(filteredData);

  /*
   * Column visibility
   */
  const { visibleColumns, toggleColumn, resetColumns } = useColumnVisibility(
    columns,
    columnVisibility.persistenceKey ?? "datagrid-columns",
  );

  const displayedColumns = columns.filter((column) =>
    visibleColumns.includes(column.key),
  );

  /*
   * Column menu
   */
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(menuRef, () => {
    setShowColumnMenu(false);
  });

  /*
   * Pagination
   */
  const pageSize = pagination?.pageSize ?? sortedData.length;

  const {
    currentPage,
    totalPages,
    pagedData,
    nextPage,
    previousPage,
    setCurrentPage,
  } = usePagination(sortedData, pageSize);

  /*
   * UI configuration
   */
  const columnVisibilityEnabled = columnVisibility.enabled !== false;

  const showToolbar = searchable || columnVisibilityEnabled;

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
      {/* ==================== Toolbar ==================== */}

      {showToolbar && (
        <DataGridToolbar
          searchable={searchable}
          search={search}
          onSearchChange={setSearch}
        >
          <div ref={menuRef} className="relative">
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
              <div className="absolute top-full right-0 mt-2 z-50">
                <DataGridColumnMenu
                  columns={columns}
                  visibleColumns={visibleColumns}
                  onToggleColumn={toggleColumn}
                />
              </div>
            )}
          </div>
        </DataGridToolbar>
      )}

      {/* ==================== Table ==================== */}

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
        <table
          className="
            w-full
            border-collapse
            text-sm
            text-gray-700
            dark:text-gray-200
          "
        >
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

      {/* ==================== Pagination ==================== */}

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
