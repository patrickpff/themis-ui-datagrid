export type Column<T> = {
  key: keyof T;
  header: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

export type DataGridProps<T> = {
  columns: Column<T>[];
  data: T[];
};
