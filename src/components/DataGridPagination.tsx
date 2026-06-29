import type { DataGridPaginationProps } from "@/types/datagrid.types";

const DataGridPagination = ({
  page,
  totalPages,
  onNext,
  onPrevious,
  onPageChange,
  maxVisiblePages = 5,
}: DataGridPaginationProps) => {
  const halfVisiblePages = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(1, page - halfVisiblePages);
  let endPage = Math.min(totalPages, page + halfVisiblePages);

  if (endPage - startPage + 1 < maxVisiblePages) {
    if (startPage === 1) {
      endPage = Math.min(totalPages, maxVisiblePages);
    } else if (endPage === totalPages) {
      startPage = Math.max(1, totalPages - maxVisiblePages + 1);
    }
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );

  return (
    <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-3">
      <button
        onClick={onPrevious}
        disabled={page === 1}
        className="
          px-3
          py-1
          rounded-md
          border
          border-gray-300
          dark:border-gray-600
          bg-white
          dark:bg-gray-900
          text-gray-700
          dark:text-gray-200
          hover:bg-gray-50
          dark:hover:bg-gray-800
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        Previous
      </button>

      <div className="flex items-center gap-1">
        {startPage > 1 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="
                min-w-9
                px-3
                py-1
                rounded-md
                border
                border-gray-300
                dark:border-gray-600
                bg-white
                dark:bg-gray-900
                text-gray-700
                dark:text-gray-200
                hover:bg-gray-50
                dark:hover:bg-gray-800
              "
            >
              1
            </button>

            {startPage > 2 && (
              <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
            )}
          </>
        )}

        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`
              min-w-9
              px-3
              py-1
              rounded-md
              border
              transition-colors
              ${
                page === pageNumber
                  ? "bg-blue-600 text-white border-blue-600"
                  : `
                    bg-white
                    dark:bg-gray-900
                    text-gray-700
                    dark:text-gray-200
                    border-gray-300
                    dark:border-gray-600
                    hover:bg-gray-50
                    dark:hover:bg-gray-800
                  `
              }
            `}
          >
            {pageNumber}
          </button>
        ))}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && (
              <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
            )}

            <button
              onClick={() => onPageChange(totalPages)}
              className="
                min-w-9
                px-3
                py-1
                rounded-md
                border
                border-gray-300
                dark:border-gray-600
                bg-white
                dark:bg-gray-900
                text-gray-700
                dark:text-gray-200
                hover:bg-gray-50
                dark:hover:bg-gray-800
              "
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={onNext}
        disabled={page === totalPages}
        className="
          px-3
          py-1
          rounded-md
          border
          border-gray-300
          dark:border-gray-600
          bg-white
          dark:bg-gray-900
          text-gray-700
          dark:text-gray-200
          hover:bg-gray-50
          dark:hover:bg-gray-800
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        Next
      </button>
    </div>
  );
};

export default DataGridPagination;
