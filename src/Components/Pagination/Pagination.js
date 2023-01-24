import React from "react";
import { useState } from "react";
import { usePagination } from "@material-ui/lab/Pagination";
import "./Pagination.scss";
import { useEffect } from "react";

const Pagination = ({ data, dataPerPage, getPageNumber, getEmptyRows }) => {
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    getPageNumber(pageNumber);
    getEmptyRows(
      dataPerPage -
        Math.min(dataPerPage, data.length - pageNumber * dataPerPage)
    );
  });

  const { items } = usePagination({
    count: Math.ceil(data.length / dataPerPage),
  });

  //   console.log(items);
  //   console.log(Math.ceil(data.length / dataPerPage));
  //   console.log(dataPerPage);
  const handleChangePage = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  return (
    <>
      <div className="pagination-container">
        <div className="pagination-wrapper">
          <ul className="pagination-ui">
            {items.map(({ page, type, selected, onClick, ...item }, index) => {
              let children = null;

              if (type === "start-ellipsis" || type === "end-ellipsis") {
                children = "…";
              } else if (type === "page") {
                children = (
                  <button
                    type="button"
                    style={{ fontWeight: selected ? "bold" : undefined }}
                    {...item}
                    onClick={() => {
                      onClick();
                      handleChangePage(page - 1);
                    }}
                    className="page-number-btn"
                  >
                    {page}
                  </button>
                );
              } else if (type === "previous") {
                children = (
                  <button
                    type="button"
                    {...item}
                    className="page-next-prev-btn"
                    onClick={() => {
                      onClick();
                      handleChangePage(pageNumber - 1);
                    }}
                  >
                    Previous
                  </button>
                );
              } else if (type === "next") {
                children = (
                  <button
                    type="button"
                    {...item}
                    className="page-next-prev-btn"
                    onClick={() => {
                      onClick();
                      handleChangePage(pageNumber + 1);
                    }}
                  >
                    Next
                  </button>
                );
              }

              return <li key={index}>{children}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Pagination;
