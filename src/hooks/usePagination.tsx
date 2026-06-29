import { useMemo, useState, useEffect } from "react";

export const usePagination = <T,>(data: T[], pageSize: number) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize));

  const pagedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;

    return data.slice(start, start + pageSize);
  }, [data, currentPage, pageSize]);

  const nextPage = () => {
    setCurrentPage((current) => Math.min(current + 1, totalPages));
  };

  const previousPage = () => {
    setCurrentPage((current) => Math.max(current - 1, 1));
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    pagedData,
    setCurrentPage,
    nextPage,
    previousPage,
  };
};
