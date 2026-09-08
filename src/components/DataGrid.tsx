import { useRef, useState } from "react";

import type { DataGridProps } from "@/types/datagrid.types";

import DataGridHeader from "./DataGridHeader";
import DataGridBody from "./DataGridBody";
import DataGridPagination from "./DataGridPagination";

import { useSorting } from "@/hooks/useSorting";
import { usePagination } from "@/hooks/usePagination";
import { useFiltering } from "@/hooks/useFiltering";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useColumnVisibility } from "@/hooks/useColumnVisibility";

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
  const persistenceKey = columnVisibility.persistenceKey ?? "datagrid-columns";

  const { visibleColumns, toggleColumn, resetColumns } = useColumnVisibility(
    columns,
    persistenceKey,
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
      {/* Toolbar */}
      {showToolbar && (
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
          {/* Search */}
          {searchable && (
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
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

          {/* Column visibility */}
          {columnVisibilityEnabled && (
            <div ref={menuRef} className="relative">
              <button
                type="button"
                onClick={() => setShowColumnMenu((current) => !current)}
                title="Show / Hide Columns"
                aria-label="Show / Hide Columns"
                aria-expanded={showColumnMenu}
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
                  {/* Header */}
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

                  {/* Columns */}
                  <div className="max-h-80 overflow-y-auto">
                    {columns.map((column) => {
                      const columnKey = column.key;
                      const isVisible = visibleColumns.includes(columnKey);
                      const isLastVisibleColumn =
                        isVisible && visibleColumns.length === 1;

                      return (
                        <label
                          key={String(columnKey)}
                          title={
                            isLastVisibleColumn
                              ? "At least one column must remain visible"
                              : undefined
                          }
                          className={`
                            flex
                            items-center
                            gap-3
                            px-3
                            py-2
                            text-gray-700
                            dark:text-gray-200
                            ${
                              isLastVisibleColumn
                                ? "cursor-not-allowed opacity-60"
                                : "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                            }
                          `}
                        >
                          <input
                            type="checkbox"
                            checked={isVisible}
                            disabled={isLastVisibleColumn}
                            onChange={() => toggleColumn(columnKey)}
                            title={
                              isLastVisibleColumn
                                ? "At least one column must remain visible"
                                : undefined
                            }
                            className="
                              rounded
                              border-gray-300
                              dark:border-gray-600
                              text-blue-600
                              focus:ring-blue-500
                              disabled:cursor-not-allowed
                              disabled:opacity-50
                            "
                          />

                          <span>{column.header}</span>
                          {isLastVisibleColumn && (
                            <span
                              className="
                                ml-auto
                                text-xs
                                text-gray-400
                                dark:text-gray-500
                              "
                            >
                              Required
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>

                  {/* Reset */}
                  <div
                    className="
                      border-t
                      border-gray-200
                      dark:border-gray-700
                      p-2
                    "
                  >
                    <button
                      type="button"
                      onClick={resetColumns}
                      className="
                        w-full
                        px-3
                        py-2
                        text-sm
                        text-left
                        rounded-md
                        text-gray-700
                        dark:text-gray-200
                        hover:bg-gray-100
                        dark:hover:bg-gray-700
                        transition-colors
                      "
                    >
                      ↺ Reset columns
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

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
