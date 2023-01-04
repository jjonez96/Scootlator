import { useEffect, useRef } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { MdClose, MdMyLocation, MdElectricScooter } from "react-icons/md";
import TierMarkers from "./TierMarkers";
import { FaTimes } from "react-icons/fa";
import VoiMarkers from "./VoiMarkers";

const Forms = ({
  originRef,
  destinationRef,
  center,
  calculateRoute,
  operator,
  onOffMarkersVoi,
  onOffMarkersTier,
  handleScootMarkersTier,
  handleScootMarkersVoi,
  map,
  selectInputRef,
  setSelected,
  clearRoute,
}) => {
  const autocomplete = window.google.maps;
  const autocompleteRef = useRef();

  /**Bounds for Googlemaps AutoComplete*/
  const defaultBounds = {
    north: center.lat + 0.1,
    south: center.lat - 0.1,
    east: center.lng + 0.1,
    west: center.lng - 0.1,
  };

  /**Settings for Googlemaps AutoComplete*/
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

  const handleFormSubmit = (e) => {
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
    <div className="customBg fixed-top shadow p-1 container-fluid ">
      <h6 className="ss text-info">Laske e-scoot matka</h6>
      <Form className="hstack gap-1 row" onSubmit={handleFormSubmit}>
        <Form.Group className="form-floating was-validated col-auto formWidth">
          <Form.Control
            className="input-height bg-dark text-light"
            type="text"
            ref={originRef}
            required
          />
          <Form.Label className="text-light">
            Valitse lähtöpaikka tai scootti
          </Form.Label>
          <MdMyLocation
            className="icon text-info bg-dark"
            onClick={(e) => {
              map.panTo(center);
              map.setZoom(18);
              handleOriginClick(e);
            }}
          />
        </Form.Group>
        <Form.Group className="was-validated form-floating col-auto container formWidth">
          <Form.Control
            className="input-height bg-dark text-light"
            type="text"
            ref={destinationRef}
            required
          />
          <Form.Label className="text-light ">
            Valitse määränpää tai klikkaa karttaa
          </Form.Label>
          <MdClose
            className="icon text-info bg-dark icon"
            onClick={(e) => {
              clearDestination(e);
            }}
          />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center was-validated">
          <Dropdown>
            <Dropdown.Toggle className="mx-2 btn btn-info ">
              <MdElectricScooter className="text-dark" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark text-center text-light">
              Scootit voi
              <MdElectricScooter color="#0dcaf0" />
              <Form.Check
                type="switch"
                onChange={handleScootMarkersVoi}
                value={onOffMarkersVoi}
                id=""
              />
              Scootit tier
              <MdElectricScooter color="#0dcaf0" />
              <Form.Check
                type="switch"
                onChange={handleScootMarkersTier}
                value={onOffMarkersTier}
                id=""
              />
            </Dropdown.Menu>
            {onOffMarkersTier === false ? null : <TierMarkers />}
            {onOffMarkersVoi === false ? null : <VoiMarkers />}
          </Dropdown>
          <Form.Select
            className="form-control text-light bg-dark w-75"
            ref={selectInputRef}
            onChange={(e) => setSelected(e.target.value)}
            required
          >
            <option disabled={false} value="">
              Valitse operaattori
            </option>
            {operator.map((service) => (
              <option
                key={`${service.pricePerMin},${service.name},${service.startPrice}`}
                value={service.pricePerMin}
              >
                {service.name} {service.pricePerMin}€/min + {service.startPrice}
                € aloitusmaksu
              </option>
            ))}
          </Form.Select>
          <Button
            className="mx-2 fw-bold text-dark"
            variant="danger"
            onClick={clearRoute}
          >
            <FaTimes />
          </Button>
        </Form.Group>
        <Button
          variant="info"
          type="submit"
          className="custombtn container p-1 fw-bold"
          onClick={calculateRoute}
        >
          Laske
        </Button>
      </Form>
    </div>
  );
};
export default Forms;
