import { Form, InputGroup, Button } from "react-bootstrap";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import { useRef, useEffect } from "react";

const Forms = (props) => {
  const autocompleteRef = useRef();
  const originRef = props.originRef;
  const destinationRef = props.destinationRef;
  const autocomplete = window.google.maps;
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

  return (
    <div className=" hstack gap-1 row rounded pt-1 pb-1   ">
      <form onSubmit={handleSubmit} className="was-validated">
        <InputGroup>
          <input
            className=" form-control rounded"
            type="text"
            placeholder="Lähtö"
            ref={originRef}
            required
          />
          <Button
            variant="info"
            className="mx-1 rounded "
            onClick={(e) => {
              props.map.panTo(center);
              props.map.setZoom(15);
              props.handleOriginClick(e);
            }}
          >
            <FaLocationArrow />
          </Button>
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
      <div className=" d-flex justify-content-center ">
        <Form.Select
          aria-label="Default select example"
          className=" border border-info "
          onChange={(e) => props.setSelected(e.target.value)}
        >
          {props.services.map((service) => (
            <option
              key={`${service.pricePerMin},${service.name}`}
              value={service.pricePerMin}
            >
              {service.name} ({service.pricePerMin}€/min)
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
        <b className="text-danger m-2">{props.status}</b>
      </div>
    </div>
  );
};

export default Forms;
