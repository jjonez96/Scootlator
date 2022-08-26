import React from "react";

const CalculationResults = (props) => {
  const price = props.price;
  return (
    <>
      {price === "" ? (
        <></>
      ) : (
        <div className="Bg fw-bold bg-info container fixed-bottom  d-flex justify-content-around shadow mt-1 ">
          <div className="m-1  ">
            Pituus:
            <br />
            {props.distance}
          </div>
          <div className="m-1">
            Kesto:
            <br />~{props.duration}
          </div>
          {price === "NaN€" ? (
            <p className="m-1">Palvelua ei valittu</p>
          ) : (
            <div className="m-1">
              Hinta:
              <br />~{price}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CalculationResults;
