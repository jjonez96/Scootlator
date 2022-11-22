import React from "react";
import { RiPinDistanceFill, RiPriceTag3Fill, RiTimeFill } from "react-icons/ri";
import { GiSnail } from "react-icons/gi";
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
        <div className="resultsBg fw-bold bg-dark text-info container fixed-bottom d-flex justify-content-around shadow mt-1">
          <div className="m-1 ">
            Pituus <RiPinDistanceFill color="#1ef778" />
            <br />
            {props.distance}
          </div>
          <div className="m-1">
            Kesto <RiTimeFill color="#1ef778" />
            <br />~{props.duration}
          </div>
          {toFixedPrice === "NaN €" || toFixedPrice === "1 €" ? (
            <p className="mt-3">Palvelua ei valittu</p>
          ) : (
            <div className="m-1">
              Hinta <RiPriceTag3Fill color="#1ef778" />
              <br />~{toFixedPrice} €
            </div>
          )}
          <div className="m-1">
            Hidasajo <GiSnail color="#1ef778" />
            <Form.Check
              type="switch"
              onChange={setSlowMode}
              checked={slow}
              className="mx-4"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CalculationResults;
