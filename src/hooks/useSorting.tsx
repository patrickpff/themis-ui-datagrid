import { useMemo, useState } from "react";

export const useSorting = <T,>(data: T[]) => {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [direction, setDirection] = useState<"asc" | "desc">("asc");

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      // null/undefined handling
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return 1;
      if (bValue == null) return -1;

      // normalize values for safe comparison
      const aVal = typeof aValue === "string" ? aValue.toLowerCase() : aValue;

      const bVal = typeof bValue === "string" ? bValue.toLowerCase() : bValue;

      if (aVal < bVal) return direction === "asc" ? -1 : 1;
      if (aVal > bVal) return direction === "asc" ? 1 : -1;

      return 0;
    });
  }, [data, sortColumn, direction]);

  const toggleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }

    setSortColumn(column);
    setDirection("asc");
  };

  return { sortedData, sortColumn, direction, toggleSort };
};
