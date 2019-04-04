import React from "react";

const DataNotFound = ({ title, subtitle }) => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="container">
        <h1 className="display-4">{title}</h1>
        <p className="lead">{subtitle}</p>
      </div>
    </div>
  );
};

export default DataNotFound;
