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
      {price === "" ? (
        <div></div>
      ) : (
        <div className="resultsBg bg-dark text-light container fixed-bottom d-flex justify-content-around shadow ">
          <div className="m-1">
            Pituus <RiPinDistanceFill color="#1ef778" />
            <br />
            {props.distance}
          </div>
          <div className="m-1">
            Kesto <RiTimeFill color="#1ef778" />
            <br />~{props.duration}
          </div>
          {price === "NaN €" || price === "1 €" ? (
            <p className="text-danger mt-3">Palvelua ei valittu</p>
          ) : (
            <div className="m-1 d-flex justify-content-around  ">
              <div>
                Hinta <RiPriceTag3Fill color="#1ef778" />
                <br />~{toFixedPrice} €
              </div>
              <div className="vr m-2 text-info" />
              <div>
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
        </div>
      )}
    </>
  );
};

export default CalculationResults;
