import { useEffect, useMemo, useState } from "react";

import type { Column } from "@/types/datagrid.types";

export const useColumnVisibility = <T,>(
  columns: Column<T>[],
  persistenceKey: string,
) => {
  /*
   * Columns visible by default.
   *
   * hidden: true means the column starts hidden.
   */
  const defaultVisibleColumns = useMemo<Array<keyof T>>(
    () =>
      columns.filter((column) => !column.hidden).map((column) => column.key),
    [columns],
  );

  /*
   * Load persisted visibility.
   */
  const [visibleColumns, setVisibleColumns] = useState<Array<keyof T>>(() => {
    if (typeof window === "undefined") {
      return defaultVisibleColumns;
    }

    try {
      const stored = localStorage.getItem(persistenceKey);

      if (!stored) {
        return defaultVisibleColumns;
      }

      const storedColumns = JSON.parse(stored);

      if (!Array.isArray(storedColumns)) {
        return defaultVisibleColumns;
      }

      const currentColumnKeys = new Set(
        columns.map((column) => String(column.key)),
      );

      /*
       * Only restore columns that still exist.
       */
      return storedColumns.filter((key) =>
        currentColumnKeys.has(String(key)),
      ) as Array<keyof T>;
    } catch {
      return defaultVisibleColumns;
    }
  });

  /*
   * Synchronize when the column definition changes.
   *
   * IMPORTANT:
   *
   * We only remove columns that no longer exist.
   *
   * We do NOT automatically add missing columns here,
   * because a missing column may simply mean that the
   * user intentionally hid it.
   */
  useEffect(() => {
    setVisibleColumns((current) => {
      const currentColumnKeys = new Set(
        columns.map((column) => String(column.key)),
      );

      return current.filter((key) => currentColumnKeys.has(String(key)));
    });
  }, [columns]);

  /*
   * Persist visibility changes.
   */
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      localStorage.setItem(persistenceKey, JSON.stringify(visibleColumns));
    } catch {
      // Ignore localStorage errors.
    }
  }, [visibleColumns, persistenceKey]);

  /*
   * Toggle column visibility.
   */
  const toggleColumn = (columnKey: keyof T) => {
    setVisibleColumns((current) => {
      if (current.includes(columnKey)) {
        return current.filter((key) => key !== columnKey);
      }

      return [...current, columnKey];
    });
  };

  /*
   * Restore the default column configuration.
   */
  const resetColumns = () => {
    setVisibleColumns(defaultVisibleColumns);
  };

  return {
    visibleColumns,
    toggleColumn,
    resetColumns,
  };
};
