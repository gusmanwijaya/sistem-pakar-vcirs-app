import React from "react";

const Pagination = ({
  page,
  handlePrevious,
  handleNext,
  disabledPrevious,
  disabledNext,
}) => {
  return (
    <div className="btn-group">
      <button
        className="btn btn-sm"
        onClick={handlePrevious}
        disabled={disabledPrevious}
      >
        «
      </button>
      <button className="btn btn-sm">Page {page}</button>
      <button
        className="btn btn-sm"
        onClick={handleNext}
        disabled={disabledNext}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;
