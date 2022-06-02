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
        className="btn"
        onClick={handlePrevious}
        disabled={disabledPrevious}
      >
        «
      </button>
      <button className="btn">Page {page}</button>
      <button className="btn" onClick={handleNext} disabled={disabledNext}>
        »
      </button>
    </div>
  );
};

export default Pagination;
