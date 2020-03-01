import { useState, useEffect } from 'react';

interface Parameter {
  total: number;
  rowsPerPage: number;
  currentPage?: number;
}

function usePagination(parameter: Parameter) {
  const { total, rowsPerPage, currentPage = 1 } = parameter;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [countPage, setCountPage] = useState(1);

  useEffect(() => {
    const countPage = Math.ceil(total / rowsPerPage);
    setCountPage(countPage);

    if (currentPage * rowsPerPage > total) {
      setStartIndex((countPage - 1) * rowsPerPage + 1);
      setEndIndex(total);
    } else {
      setStartIndex((currentPage - 1) * rowsPerPage + 1);
      setEndIndex(currentPage * rowsPerPage);
    }
  }, [total, currentPage, rowsPerPage]);

  return { startIndex, endIndex, countPage };
}

export default usePagination;
