export type ColumnType =
  | "text"
  | "number"
  | "boolean"
  | "date"
  | "link"
  | "image"
  | "custom";

export type Column<T> = {
  key: keyof T;
  header: string;
  type?: ColumnType;
  sortable?: boolean;
  filterable?: boolean;
  searchable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

export type DataGridProps<T> = {
  columns: Column<T>[];
  data: T[];
  loading?: boolean;
  searchable?: boolean;
  pagination?: DataGridPaginationOptions;
  columnFilters?: boolean;
};

export type SortDirection = "asc" | "desc";

export type SortState<T> = {
  key: keyof T | null;
  direction: SortDirection;
};

export type DataGridPaginationOptions = {
  pageSize?: number;
  maxVisiblePages?: number;
};

export type DataGridPaginationProps = {
  page: number;
  totalPages: number;
  onNext: () => void;
  onPrevious: () => void;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
};

export type DataGridFilters<T> = Partial<Record<keyof T, string>>;

export type DataGridHeaderProps<T> = {
  columns: Column<T>[];

  sortColumn: keyof T | null;
  direction: SortDirection;

  toggleSort: (column: keyof T) => void;

  filters: DataGridFilters<T>;
  setFilter: (column: keyof T, value: string) => void;
  showFilters?: boolean;
};

export type UseFilteringResult<T> = {
  search: string;
  setSearch: (value: string) => void;

  filters: DataGridFilters<T>;

  setFilter: (column: keyof T, value: string) => void;

  filteredData: T[];
};
