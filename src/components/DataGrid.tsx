import type { DataGridProps } from "@/types/datagrid.types";
import DataGridHeader from "./DataGridHeader";
import DataGridBody from "./DataGridBody";
import { useSorting } from "@/hooks/useSorting";
import { usePagination } from "@/hooks/usePagination";
import DataGridPagination from "./DataGridPagination";
import { useFiltering } from "@/hooks/useFiltering";

const DataGrid = <T,>({
  data,
  columns,
  loading = false,
  pagination = {},
  searchable = false,
  columnFilters = true,
}: DataGridProps<T>) => {
  const { search, setSearch, filters, setFilter, filteredData } =
    useFiltering(data);
  const { sortedData, sortColumn, direction, toggleSort } =
    useSorting(filteredData);

  const pageSize = pagination?.pageSize ?? sortedData.length;

  const {
    currentPage,
    totalPages,
    pagedData,
    nextPage,
    previousPage,
    setCurrentPage,
  } = usePagination(sortedData, pageSize);

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
      {searchable && (
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="
            w-full
            rounded-md
            border
            border-gray-300
            dark:border-gray-600
            bg-white
            dark:bg-gray-900
            px-3
            py-2
            text-sm
          "
          />
        </div>
      )}

      {/* Only table scrolls */}
      <div
        className="
        overflow-x-auto 
        scrollbar 
        scrollbar-h-1 
        scrollbar-track-transparent 
        scrollbar-thumb-gray-300 
        dark:scrollbar-thumb-gray-700 
        hover:scrollbar-thumb-gray-400 
        dark:hover:scrollbar-thumb-gray-600"
      >
        <table className="w-full border-collapse text-sm text-gray-700 dark:text-gray-200">
          <DataGridHeader
            columns={columns}
            sortColumn={sortColumn}
            direction={direction}
            toggleSort={toggleSort}
            filters={filters}
            setFilter={setFilter}
            showFilters={columnFilters}
          />
          <DataGridBody data={pagedData} columns={columns} loading={loading} />
        </table>
      </div>

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
