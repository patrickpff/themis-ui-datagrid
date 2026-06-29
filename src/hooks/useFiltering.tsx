import { useMemo, useState } from "react";
import type { DataGridFilters } from "..";

export const useFiltering = <T,>(data: T[]) => {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<DataGridFilters<T>>({});

  const setFilter = (column: keyof T, value: string) => {
    setFilters((previous) => ({
      ...previous,
      [column]: value,
    }));
  };

  const filteredData = useMemo(() => {
    let result = data;

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
        ([column, value]) => {
          const filterValue = value?.trim();
          if (!filterValue) {
            return true;
          }

          return String(row[column])
            .toLowerCase()
            .includes(filterValue.toLowerCase());
        },
      ),
    );

    return result;
  }, [data, search, filters]);

  return {
    search,
    setSearch,

    filters,
    setFilter,

    filteredData,
  };
};
