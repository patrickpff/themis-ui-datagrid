import { useMemo, useState } from "react";
import type { Column, DataGridFilters } from "..";
import { matchesNumericFilter } from "@/utils/matchesNumericFilter";

export const useFiltering = <T,>(data: T[], columns: Column<T>[]) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<DataGridFilters<T>>({});

  const setFilter = (column: keyof T, value: string) => {
    setFilters((previous) => ({
      ...previous,
      [column]: value,
    }));
  };

  const filteredData = useMemo(() => {
    let result = [...data];

    // Global Search
    if (search.trim()) {
      const searchValue = search.toLowerCase();

      result = result.filter((row) =>
        Object.values(row as Record<string, unknown>).some((value) =>
          String(value).toLowerCase().includes(searchValue),
        ),
      );
    }

    // Column Filters
    result = result.filter((row) =>
      (Object.entries(filters) as [keyof T, string][]).every(
        ([columnKey, filter]) => {
          const filterValue = filter?.trim();

          if (!filterValue) {
            return true;
          }

          const column = columns.find((c) => c.key === columnKey);

          const cellValue = row[columnKey];

          switch (column?.type) {
            case "number": {
              const numericValue = Number(cellValue);

              if (Number.isNaN(numericValue)) {
                return false;
              }

              const isNumericExpression =
                /^[<>]=?\d+$/.test(filterValue) ||
                /^\d+\s*-\s*\d+$/.test(filterValue);

              if (isNumericExpression) {
                return matchesNumericFilter(numericValue, filterValue);
              }

              // fallback to partial search
              return String(cellValue).includes(filterValue);
            }

            default:
              return String(cellValue)
                .toLowerCase()
                .includes(filterValue.toLowerCase());
          }
        },
      ),
    );

    return result;
  }, [data, columns, search, filters]);

  return {
    search,
    setSearch,

    filters,
    setFilter,

    filteredData,
  };
};
