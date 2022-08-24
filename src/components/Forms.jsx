import { Form, InputGroup, Button } from "react-bootstrap";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import { useRef, useEffect } from "react";
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

  const settings = {
    componentRestrictions: { country: "fi" },
    fields: ["place_id", "geometry", "formatted_address", "name"],
    bounds: defaultBounds,
    strictBounds: false,
  };

  useEffect(() => {
    if (autocomplete) {
      autocompleteRef.current = new autocomplete.places.Autocomplete(
        originRef.current,
        settings
      );
      autocompleteRef.current = new autocomplete.places.Autocomplete(
        destinationRef.current,
        settings
      );
    }
  }, [autocomplete, originRef, destinationRef, settings]);

  const handleSubmit = (e) => {
    e.preventDefault();
    return false;
  };

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
    <div className=" hstack gap-2 row rounded pt-1 pb-1    ">
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <input
            className="form-control rounded border-info"
            type="text"
            placeholder="Lähtö"
            ref={originRef}
          />
          <FaLocationArrow
            className="icon "
            onClick={(e) => {
              props.map.panTo(center);
              props.map.setZoom(15);
              handleOriginClick(e);
            }}
          />
        </InputGroup>
      </form>
      <form onSubmit={handleSubmit} className="was-validated">
        <input
          className="form-control "
          type="text"
          placeholder="Määränpää"
          ref={destinationRef}
          required
        />
      </form>
      <div className=" d-flex justify-content-center was-validated ">
        <Form.Select
          aria-label="Default select example"
          className=" form-control "
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
          className="mx-1 text-dark"
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
  );
};

export default Forms;
