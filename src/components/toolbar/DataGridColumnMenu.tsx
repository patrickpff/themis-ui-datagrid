import type { Column } from "@/types/datagrid.types";

type DataGridColumnMenuProps<T> = {
  columns: Column<T>[];
  visibleColumns: (keyof T)[];
  onToggleColumn: (columnKey: keyof T) => void;
  open: boolean;
  onToggle: () => void;
};

const DataGridColumnMenu = <T,>({
  columns,
  visibleColumns,
  onToggleColumn,
  open,
  onToggle,
}: DataGridColumnMenuProps<T>) => {
  return (
    <div className="relative">
      <button
        type="button"
        onClick={onToggle}
        title="Show / Hide Columns"
        aria-label="Show / Hide Columns"
        aria-expanded={open}
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

      {open && (
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
                  onChange={() => onToggleColumn(column.key)}
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
  );
};

export default DataGridColumnMenu;
