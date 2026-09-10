import type { ReactNode } from "react";

import DataGridSearch from "./DataGridSearch";

type DataGridToolbarProps = {
  searchable?: boolean;

  search: string;
  onSearchChange: (value: string) => void;

  children?: ReactNode;
};

const DataGridToolbar = ({
  searchable = false,
  search,
  onSearchChange,
  children,
}: DataGridToolbarProps) => {
  return (
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
        <DataGridSearch value={search} onChange={onSearchChange} />
      )}

      {children && (
        <div className="flex items-center gap-2 shrink-0">{children}</div>
      )}
    </div>
  );
};

export default DataGridToolbar;
