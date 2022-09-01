import { useEffect, useMemo, useRef, useState } from "react";
import { Animated } from "react-animated-css";
import { Button, Form } from "react-bootstrap";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

const Forms = (props) => {
  const autocomplete = window.google.maps;
  const autocompleteRef = useRef();
  const originRef = props.originRef;
  const destinationRef = props.destinationRef;
  const center = props.center;

  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  const sets = {
    componentRestrictions: { country: "fi" },
    fields: ["place_id", "geometry", "formatted_address", "name"],
    bounds: defaultBounds,
    strictBounds: false,
  };

  const [settings, setSettings] = useState(sets);

  /**Click handler for closing and opening the form*/
  const [click, setClick] = useState(false);
  const logSettings = useMemo(() => {
    setSettings(settings);
  }, [settings]);

  const handleClick = () => {
    setClick(!click);
    setSettings(sets);
  };

  useEffect(() => {
    if (autocomplete) {
      autocompleteRef.current = new autocomplete.places.Autocomplete(
        destinationRef.current,
        settings,
        (autocompleteRef.current = new autocomplete.places.Autocomplete(
          originRef.current,
          settings
        ))
      );
    }
  }, [destinationRef, originRef, autocomplete, settings, logSettings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return false;
  };

  /**Click handler for changing coordinates to address*/
  const handleOriginClick = () => {
    const url = `${geocodeJson}?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&latlng=${center.lat},${center.lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        originRef.current.value = `${place.formatted_address}`;
      });
  };

  return (
    <>
      {click ? (
        <div className="d-flex justify-content-between mt-1">
          <h6>Laske scoot matkasi!</h6>
          <MdKeyboardArrowDown onClick={handleClick} size={25} />
        </div>
      ) : (
        <Animated animationIn="fadeIn" isVisible={true}>
          <div className="d-flex justify-content-between mt-1">
            <h6>Laske scoot matkasi!</h6>
            <MdKeyboardArrowUp onClick={handleClick} size={25} />
          </div>
          <div className="hstack gap-2 row">
            <form onSubmit={handleSubmit} className="form-floating">
              <input
                className="form-control rounded bg-light border-info input-height"
                type="text"
                ref={originRef}
              />
              <label htmlFor="form-floating">Lähtö</label>
              <FaLocationArrow
                className="icon"
                onClick={(e) => {
                  props.map.panTo(center);
                  props.map.setZoom(15);
                  handleOriginClick(e);
                }}
              />
            </form>
            <form
              onSubmit={handleSubmit}
              className="was-validated form-floating"
            >
              <input
                className="form-control input-height"
                type="text"
                ref={destinationRef}
                required
              />
              <label htmlFor="form-floating">Määränpää</label>
            </form>
            <div className="d-flex justify-content-center was-validated inputs">
              <Form.Select
                aria-label="Default select example"
                className="form-control bg-light"
                ref={props.selectInputRef}
                onChange={(e) => props.setSelected(e.target.value)}
                required
              >
                <option disabled={false} value="">
                  -- Valitse palvelu --
                </option>
                {props.services.map((service) => (
                  <option
                    key={`${service.pricePerMin},${service.name}`}
                    value={service.pricePerMin}
                  >
                    {service.name} {service.pricePerMin}€/min
                  </option>
                ))}
              </Form.Select>
              <Button
                className="mx-2 text-dark"
                variant="danger"
                onClick={props.clearRoute}
              >
                <FaTimes />
              </Button>
            </div>
            <div className="d-flex justify-content-center rounded">
              <Button
                variant="info"
                type="submit"
                className="w-75 fw-bold rounded"
                onClick={props.calculateRoute}
              >
                Laske
              </Button>
            </div>
          </div>
        </Animated>
      )}
    </>
  );
};

export default Forms;
