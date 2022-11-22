import { useEffect, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { MdClose, MdMyLocation } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
const Forms = (props) => {
  const autocomplete = window.google.maps;
  const autocompleteRef = useRef();
  const originRef = props.originRef;
  const destinationRef = props.destinationRef;
  const center = props.center;
  const calculateRoute = props.calculateRoute;
  const services = props.services;

  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  const settings = {
    componentRestrictions: { country: "fi" },
    fields: ["place_id", "geometry", "formatted_address", "name"],
    bounds: defaultBounds,
    strictBounds: false,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return false;
  };

  const clearDestination = () => {
    destinationRef.current.value = "";
  };

  /**Click handler for changing coordinates to address*/
  const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
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
      <h6 className="text-center text-info">Laske e-scoot matka</h6>
      <div className="hstack gap-1 row ">
        <form onSubmit={handleSubmit} className="form-floating was-validated">
          <input
            className="form-control input-height bg-dark text-light"
            type="text"
            ref={originRef}
            required
          />
          <label htmlFor="form-floating" className="text-light">
            Lähtö
          </label>
          <MdMyLocation
            className="icon text-info bg-dark"
            onClick={(e) => {
              props.map.panTo(center);
              props.map.setZoom(18);
              handleOriginClick(e);
            }}
          />
        </form>
        <form onSubmit={handleSubmit} className="was-validated form-floating">
          <input
            className="form-control input-height bg-dark text-light"
            type="text"
            ref={destinationRef}
            required
          />
          <label htmlFor="form-floating" className="text-light">
            Määränpää
          </label>
          <MdClose
            className="icon text-info bg-dark"
            onClick={(e) => {
              clearDestination(e);
            }}
          />
        </form>
        <div className="d-flex justify-content-center was-validated">
          <IoIosArrowDown
            className="iconn text-info bg-dark"
            onChange={(e) => props.setSelected(e.target.value)}
          />
          <Form.Select
            className="form-control text-light bg-dark"
            ref={props.selectInputRef}
            onChange={(e) => props.setSelected(e.target.value)}
            required
          >
            <option disabled={false} value="">
              Valitse palvelu
            </option>

            {services.map((service) => (
              <option
                key={`${service.pricePerMin},${service.name}`}
                value={service.pricePerMin}
                className="dd"
              >
                {service.name} {service.pricePerMin}€/min + 1€ aloitusmaksu
              </option>
            ))}
          </Form.Select>
          <Button
            className="mx-1 text-dark"
            variant="danger"
            onClick={props.clearRoute}
          >
            <FaTimes />
          </Button>
        </div>
        <Button
          variant="info"
          type="submit"
          className="custombtn container p-1 fw-bold"
          onClick={calculateRoute}
        >
          Laske
        </Button>
      </div>
    </>
  );
};
export default Forms;
