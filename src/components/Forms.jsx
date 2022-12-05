import { useEffect, useRef } from "react";
import { Button, Form, Dropdown } from "react-bootstrap";
import { MdClose, MdMyLocation } from "react-icons/md";
import TierMarkersSjoki from "./TierMarkersSjoki";
import TierMarkers from "./TierMarkersVaasa";
import { FaTimes } from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";

const Forms = ({
  originRef,
  destinationRef,
  center,
  calculateRoute,
  operator,
  onOffMarkers,
  handleMarkers,
  map,
  selectInputRef,
  setSelected,
  clearRoute,
}) => {
  const autocomplete = window.google.maps;
  const autocompleteRef = useRef();

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
    <div className="customBg fixed-top shadow p-1 container ">
      <h6 className="text-center text-info">Laske e-scoot matka</h6>
      <div className="hstack gap-1 row">
        <form className="form-floating was-validated col-auto formWidth">
          <input
            className="form-control input-height bg-dark text-light "
            type="text"
            ref={originRef}
            required
          />
          <label htmlFor="form-floating" className="text-light">
            Valitse aloituspaikka
          </label>
          <MdMyLocation
            className="icon text-info bg-dark"
            onClick={(e) => {
              map.panTo(center);
              map.setZoom(18);
              handleOriginClick(e);
            }}
          />
        </form>
        <form className="was-validated form-floating col-auto container formWidth">
          <input
            className="form-control input-height bg-dark text-light"
            type="text"
            ref={destinationRef}
            required
          />
          <label htmlFor="form-floating" className="text-light">
            Valitse määränpää
          </label>
          <MdClose
            className="icon text-info bg-dark"
            onClick={(e) => {
              clearDestination(e);
            }}
          />
        </form>
        <div className="d-flex justify-content-center was-validated ">
          <Dropdown>
            <Dropdown.Toggle className="mx-2 btn btn-info ">
              <MdElectricScooter className="text-dark" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark text-center text-light">
              Scootit karttaan <MdElectricScooter color="#0dcaf0" />
              <Form.Check
                type="switch"
                onChange={handleMarkers}
                value={onOffMarkers}
                id=""
                defaultChecked={true}
              />
            </Dropdown.Menu>
            {onOffMarkers === true ? null : (
              <div>
                <TierMarkers />
                <TierMarkersSjoki />
              </div>
            )}
          </Dropdown>
          <Form.Select
            className="form-control text-light bg-dark w-75  "
            ref={selectInputRef}
            onChange={(e) => setSelected(e.target.value)}
            required
          >
            <option disabled={false} value="">
              Valitse palvelu
            </option>
            {operator.map((service) => (
              <option
                key={`${service.pricePerMin},${service.name}`}
                value={service.pricePerMin}
              >
                {service.name} {service.pricePerMin}€/min + 1€ aloitusmaksu
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
    </div>
  );
};
export default Forms;
