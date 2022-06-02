import React from "react";

const Pagination = ({ page, handlePrevious, handleNext }) => {
  return (
    <div className="btn-group">
      <button className="btn" onClick={handlePrevious}>
        «
      </button>
      <button className="btn">Page {page}</button>
      <button className="btn" onClick={handleNext}>
        »
      </button>
    </div>
  );
};

export default Pagination;
