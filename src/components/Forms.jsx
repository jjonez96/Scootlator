import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";
import { FaLocationArrow, FaTimes } from "react-icons/fa";

const Forms = (props) => {
  const center = props.center;
  return (
    <div className=" hstack gap-2  row rounded p-2 pt-1    ">
      <form onSubmit={props.handleSubmit}>
        <InputGroup>
          <input
            className=" form-control me-auto border border-warning "
            type="text"
            placeholder="Lähtö"
            ref={props.originRef}
          />
          <Button
            id="button-addon2"
            variant="warning"
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
      <form onSubmit={props.handleSubmit}>
        <InputGroup>
          <input
            className="form-control me-auto border border-warning bg-light  "
            type="text"
            placeholder="Määränpää"
            ref={props.destinationRef}
          />
          <Button variant="warning" onClick={props.clearRoute}>
            <FaTimes />
          </Button>
        </InputGroup>
      </form>
      <div className=" pb-1 d-flex justify-content-center ">
        <Form.Select
          aria-label="Default select example"
          className=" border border-warning w-75 bg-light "
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
      <div className="pb-1 pt-1  d-flex justify-content-center">
        <Button
          size="l"
          variant="warning"
          type="submit"
          className="w-50"
          onClick={props.calculateRoute}
        >
          Laske
        </Button>
      </div>
    </div>
  );
};

export default Forms;
