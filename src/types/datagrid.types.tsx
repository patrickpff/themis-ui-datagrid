import type { ReactNode } from "react";

/**
 * Defines how a column's value should be interpreted and displayed.
 *
 * - text: Default text column.
 * - number: Numeric column with numeric sorting and filtering.
 * - boolean: Boolean value.
 * - date: Date value.
 * - link: Renders the value as a link.
 * - image: Image value.
 * - custom: Application-defined/custom rendering.
 */
export type ColumnType =
  | "text"
  | "number"
  | "boolean"
  | "date"
  | "link"
  | "image"
  | "custom";

/**
 * Defines the configuration of a DataGrid column.
 */
export type Column<T> = {
  /**
   * Property from the row object used by this column.
   */
  key: keyof T;

  /**
   * Text displayed in the column header.
   */
  header: string;

  /**
   * Defines how the column value is interpreted/rendered.
   *
   * Defaults to "text" when omitted.
   */
  type?: ColumnType;

  /**
   * Controls whether the column can be sorted by clicking its header.
   *
   * Defaults to true.
   */
  sortable?: boolean;

  /**
   * Controls whether the column has a column-level filter.
   *
   * Defaults to false unless column filters are enabled on the DataGrid.
   */
  filterable?: boolean;

  /**
   * Controls whether the column participates in global search.
   *
   * Defaults to true when global search is enabled.
   */
  searchable?: boolean;

  /**
   * Controls whether the column is initially hidden.
   *
   * A hidden column can still be made visible through the column
   * visibility controls when column visibility is enabled.
   */
  hidden?: boolean;

  /**
   * Custom rendering function for the cell.
   *
   * When provided, the returned React node is used instead of
   * the default rendering for the column.
   *
   * @param value The value from the configured column key.
   * @param row The complete row object.
   */
  render?: (value: T[keyof T], row: T) => ReactNode;
};

/**
 * Main DataGrid configuration.
 */
export type DataGridProps<T> = {
  /**
   * Column definitions.
   */
  columns: Column<T>[];

  /**
   * Data displayed by the grid.
   */
  data: T[];

  /**
   * Displays a loading state instead of the table data.
   *
   * Defaults to false.
   */
  loading?: boolean;

  /**
   * Enables global search.
   *
   * When enabled, a search input is displayed in the toolbar.
   *
   * Defaults to false.
   */
  searchable?: boolean;

  /**
   * Enables the column filter row.
   *
   * Individual columns must also have filterable: true.
   *
   * Defaults to true.
   */
  columnFilters?: boolean;

  /**
   * Controls column visibility and persistence.
   */
  columnVisibility?: ColumnVisibilityConfig;

  /**
   * Controls pagination.
   *
   * Pagination is rendered when pageSize is provided.
   */
  pagination?: DataGridPaginationOptions;
};

/**
 * Available sorting directions.
 */
export type SortDirection = "asc" | "desc";

/**
 * Current sorting state.
 */
export type SortState<T> = {
  /**
   * Currently sorted column.
   *
   * null means that no column is currently sorted.
   */
  key: keyof T | null;

  /**
   * Current sorting direction.
   */
  direction: SortDirection;
};

/**
 * Pagination configuration.
 */
export type DataGridPaginationOptions = {
  /**
   * Number of rows displayed per page.
   *
   * When omitted, pagination is not displayed.
   */
  pageSize?: number;

  /**
   * Maximum number of page buttons displayed at once.
   */
  maxVisiblePages?: number;
};

/**
 * Props used by the DataGrid pagination component.
 */
export type DataGridPaginationProps = {
  /**
   * Current page number.
   */
  page: number;

  /**
   * Total number of available pages.
   */
  totalPages: number;

  /**
   * Moves to the next page.
   */
  onNext: () => void;

  /**
   * Moves to the previous page.
   */
  onPrevious: () => void;

  /**
   * Changes directly to a specific page.
   */
  onPageChange: (page: number) => void;

  /**
   * Maximum number of page buttons displayed at once.
   */
  maxVisiblePages?: number;
};

/**
 * Column filter values.
 *
 * Each column can have its own filter string.
 */
export type DataGridFilters<T> = Partial<Record<keyof T, string>>;

/**
 * Props used by the DataGrid header.
 */
export type DataGridHeaderProps<T> = {
  /**
   * Columns currently visible in the grid.
   */
  columns: Column<T>[];

  /**
   * Currently sorted column.
   */
  sortColumn: keyof T | null;

  /**
   * Current sorting direction.
   */
  direction: SortDirection;

  /**
   * Toggles sorting for a column.
   */
  toggleSort: (column: keyof T) => void;

  /**
   * Current column filter values.
   */
  filters: DataGridFilters<T>;

  /**
   * Updates a column filter.
   */
  setFilter: (column: keyof T, value: string) => void;

  /**
   * Controls whether the filter row is displayed.
   */
  showFilters?: boolean;
};

/**
 * Result returned by the useFiltering hook.
 */
export type UseFilteringResult<T> = {
  /**
   * Current global search value.
   */
  search: string;

  /**
   * Updates the global search value.
   */
  setSearch: (value: string) => void;

  /**
   * Current column filter values.
   */
  filters: DataGridFilters<T>;

  /**
   * Updates a column filter.
   */
  setFilter: (column: keyof T, value: string) => void;

  /**
   * Data after global and column filtering have been applied.
   */
  filteredData: T[];
};

/**
 * Controls column visibility behavior.
 */
export type ColumnVisibilityConfig = {
  /**
   * Enables or disables the column visibility controls.
   *
   * Defaults to true when the configuration is provided.
   */
  enabled?: boolean;

  /**
   * Key used to persist the user's column visibility preferences.
   *
   * When provided, visibility can be restored across sessions.
   */
  persistenceKey?: string;
};
