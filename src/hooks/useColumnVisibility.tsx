import { useEffect, useMemo, useState } from "react";

import type { Column } from "@/types/datagrid.types";

type PersistedColumnVisibility = {
  visible: string[];
  known: string[];
};

export const useColumnVisibility = <T,>(
  columns: Column<T>[],
  persistenceKey: string,
) => {
  const defaultVisibleColumns = useMemo<Array<keyof T>>(
    () =>
      columns.filter((column) => !column.hidden).map((column) => column.key),
    [columns],
  );

  const currentColumnKeys = useMemo(
    () => columns.map((column) => String(column.key)),
    [columns],
  );

  const [knownColumns, setKnownColumns] = useState<string[]>(() => {
    if (typeof window === "undefined") {
      return currentColumnKeys;
    }

    try {
      const stored = localStorage.getItem(persistenceKey);

      if (!stored) {
        return currentColumnKeys;
      }

      const parsed = JSON.parse(stored);

      if (parsed && typeof parsed === "object" && Array.isArray(parsed.known)) {
        return parsed.known;
      }

      /*
       * Old format compatibility.
       */
      return currentColumnKeys;
    } catch {
      return currentColumnKeys;
    }
  });

  const [visibleColumns, setVisibleColumns] = useState<Array<keyof T>>(() => {
    if (typeof window === "undefined") {
      return defaultVisibleColumns;
    }

    try {
      const stored = localStorage.getItem(persistenceKey);

      if (!stored) {
        return defaultVisibleColumns;
      }

      const parsed = JSON.parse(stored);

      const currentKeys = new Set(currentColumnKeys);

      /*
       * New format.
       */
      if (
        parsed &&
        typeof parsed === "object" &&
        Array.isArray(parsed.visible)
      ) {
        return parsed.visible.filter((key: string) =>
          currentKeys.has(key),
        ) as Array<keyof T>;
      }

      /*
       * Old format.
       */
      if (Array.isArray(parsed)) {
        return parsed.filter((key) => currentKeys.has(String(key))) as Array<
          keyof T
        >;
      }

      return defaultVisibleColumns;
    } catch {
      return defaultVisibleColumns;
    }
  });

  /*
   * Synchronize with the current column definitions.
   */
  useEffect(() => {
    setVisibleColumns((current) => {
      const knownSet = new Set(knownColumns);

      /*
       * Remove columns that no longer exist.
       */
      const existingColumns = current.filter((key) =>
        currentColumnKeys.includes(String(key)),
      );

      /*
       * Respect hidden: true.
       */
      const hiddenColumnKeys = new Set(
        columns
          .filter((column) => column.hidden)
          .map((column) => String(column.key)),
      );

      const visibleExistingColumns = existingColumns.filter(
        (key) => !hiddenColumnKeys.has(String(key)),
      );

      /*
       * Add genuinely new columns using their default visibility.
       */
      const newColumns = columns
        .filter((column) => !knownSet.has(String(column.key)) && !column.hidden)
        .map((column) => column.key);

      return [...visibleExistingColumns, ...newColumns];
    });

    /*
     * Once synchronization has happened, all current
     * columns become known.
     */
    setKnownColumns(currentColumnKeys);
  }, [columns, currentColumnKeys]);

  /*
   * Persist configuration.
   */
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const configuration: PersistedColumnVisibility = {
      visible: visibleColumns.map((key) => String(key)),
      known: knownColumns,
    };

    try {
      localStorage.setItem(persistenceKey, JSON.stringify(configuration));
    } catch {
      // Ignore localStorage errors.
    }
  }, [visibleColumns, knownColumns, persistenceKey]);

  /*
   * Toggle column visibility.
   */
  const toggleColumn = (columnKey: keyof T) => {
    setVisibleColumns((current) => {
      const isVisible = current.includes(columnKey);

      /*
       * At least one column must remain visible.
       */
      if (isVisible && current.length === 1) {
        return current;
      }

      if (isVisible) {
        return current.filter((key) => key !== columnKey);
      }

      return [...current, columnKey];
    });
  };

  /*
   * Restore developer defaults.
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
