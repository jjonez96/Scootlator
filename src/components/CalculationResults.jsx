import React from "react";
import { Animated } from "react-animated-css";
import { RiPinDistanceFill, RiPriceTag3Fill, RiTimeFill } from "react-icons/ri";
import { GiTurtle } from "react-icons/gi";
import { Form } from "react-bootstrap";

const CalculationResults = (props) => {
  const price = props.price;
  const setSlowMode = props.setSlowMode;
  const slow = props.slow;

  const float = parseFloat(price);
  const toFixedPrice = float.toFixed(2);

  return (
    <>
      {toFixedPrice === "NaN" ? (
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
            {toFixedPrice === "NaN €" || toFixedPrice === "1 €" ? (
              <p className="mt-3">Palvelua ei valittu</p>
            ) : (
              <div className="m-1">
                Hinta <RiPriceTag3Fill />
                <br />~{toFixedPrice}
              </div>
            )}
            <div className="m-1">
              Hidasajo <GiTurtle />
              <Form.Check
                type="switch"
                onChange={setSlowMode}
                checked={slow}
                className="mx-4"
              />
            </div>
          </div>
        </Animated>
      )}
    </>
  );
};

export default CalculationResults;
