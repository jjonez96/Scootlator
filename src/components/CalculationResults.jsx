import { RiPinDistanceFill, RiPriceTag3Fill, RiTimeFill } from "react-icons/ri";
import { GiSnail } from "react-icons/gi";
import { Form } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

const CalculationResults = ({
  price,
  distance,
  duration,
  setSlowMode,
  slow,
}) => {
  const float = parseFloat(price);
  const int = parseInt(distance);
  const toFixedPrice = float.toFixed(2);

  if (int > 20) {
    return (
      <Alert
        className="resultsBg container fixed-bottom d-flex justify-content-center"
        variant="danger"
      >
        Matkasi on liian pitkä.
      </Alert>
    );
  }

  return (
    <>
      {price === "" ? null : (
        <div className="resultsBg bg-dark text-light container fixed-bottom d-flex justify-content-around shadow ">
          <div className="m-1">
            Pituus <RiPinDistanceFill color="#0dcaf0" />
            <br />
            {distance}
          </div>
          <div className="m-1">
            Kesto <RiTimeFill color="#0dcaf0" />
            <br />~{duration}
          </div>
          {price === "1 €" || price === "1.44 €" || price === "NaN €" ? (
            <Alert className="alertt p-1 mt-2" variant="danger">
              Palvelua ei valittu
            </Alert>
          ) : (
            <div className="m-1 d-flex justify-content-around ">
              <div>
                Hinta <RiPriceTag3Fill color="#0dcaf0" />
                <br />~{toFixedPrice} €
              </div>
              <div className="vr m-2 text-info" />
              <div>
                Hidasajo <GiSnail color="#0dcaf0" />
                <Form.Check
                  type="switch"
                  onChange={setSlowMode}
                  checked={slow}
                  style={{ cursor: "pointer" }}
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
