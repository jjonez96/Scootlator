import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

const Forms = (props) => {
  const center = props.center;
  return (
    <div className=" hstack gap-2 row rounded pt-1 pb-1   ">
      <form onSubmit={props.handleSubmit} className="was-validated">
        <InputGroup>
          <input
            className=" form-control me-auto w-25"
            type="text"
            placeholder="Lähtö"
            ref={props.originRef}
            id="validationDefaultUsername"
            required
          />
          <Button
            variant="info"
            className="mx-1"
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
      <form onSubmit={props.handleSubmit} className="was-validated">
        <input
          className="form-control"
          type="text"
          placeholder="Määränpää"
          ref={props.destinationRef}
          required
        />
      </form>
      <div className=" d-flex justify-content-center ">
        <Form.Select
          aria-label="Default select example"
          className=" border border-info w-75 bg-light "
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
      </div>
      <div className="d-flex justify-content-center">
        <Button
          size="l"
          variant="info"
          type="submit"
          className="w-50 fw-bold"
          onClick={props.calculateRoute}
        >
          Laske
        </Button>
        <Button
          className="mx-1 text-dark"
          variant="danger"
          onClick={props.clearRoute}
        >
          <FaTimes size={17} />
        </Button>
      </div>
    </div>
  );
};

export default Forms;
