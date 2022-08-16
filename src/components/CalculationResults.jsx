import React from "react";

const CalculationResults = (props) => {
  return (
    <div>
      {props.price.length === 0 ? (
        <></>
      ) : (
        <div className=" d-flex justify-content-around fw-bold bg-warning fixed-bottom shadow container rounded  rounded pt-1  ">
          <div className="d-flex align-items-center mb-1">
            Pituus:
            <br />
            {props.distance}
          </div>
          <div className="d-flex align-items-center mb-1">
            Kesto:
            <br />~{props.duration}
          </div>
          <div className="d-flex align-items-center mb-1">
            Hinta:
            <br />~{props.price}
          </div>
        </div>
      )}
    </div>
  );
};

export default CalculationResults;
