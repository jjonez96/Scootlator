import React from "react";
import { Animated } from "react-animated-css";
import { RiPinDistanceFill, RiPriceTag3Fill, RiTimeFill } from "react-icons/ri";

const CalculationResults = (props) => {
  const price = props.price;
  return (
    <>
      {price === "" ? (
        <></>
      ) : (
        <Animated animationIn="fadeIn" isVisible={true}>
          <div className="Bg fw-bold bg-info container fixed-bottom d-flex justify-content-around shadow mt-1">
            <div className="m-1">
              Pituus <RiPinDistanceFill />
              <br />
              {props.distance}
            </div>
            <div className="m-1">
              Kesto <RiTimeFill />
              <br />~{props.duration}
            </div>
            {price === "NaN €" || price === "1 €" ? (
              <p className="mt-3">Palvelua ei valittu</p>
            ) : (
              <div className="m-1">
                Hinta <RiPriceTag3Fill />
                <br />~{price}
              </div>
            )}
          </div>
        </Animated>
      )}
    </>
  );
};

export default CalculationResults;
