import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { useRef, useState } from "react";
import mapstyle from "../mapstyle";
import TierMarkers from "./TierMarkers";
import { Form, Dropdown } from "react-bootstrap";
import { GoSettings } from "react-icons/go";
import { MdElectricScooter } from "react-icons/md";

const Map = (props) => {
  const center = props.center;
  const directionResponse = props.directionResponse;
  const destinationRef = props.destinationRef;

  const mapRef = useRef();

  /**Click handler for changing coordinates to address on map*/
  const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
  const handleDestinationMapClick = (ev) => {
    const url = `${geocodeJson}?key=${
      process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    }&latlng=${ev.latLng.lat()}, ${ev.latLng.lng()}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        destinationRef.current.value = `${place.formatted_address}`;
      });
  };
  const icon = {
    url: "../location.png",
    scaledSize: { width: 28, height: 28 },
  };

  const [onOffMarkers, setOnOffMarkers] = useState(false);

  const handleChange = (event) => {
    setOnOffMarkers((current) => !current);
  };

  return (
    <>
      <GoogleMap
        center={center}
        zoom={12}
        ref={mapRef}
        onClick={(ev) => {
          handleDestinationMapClick(ev);
        }}
        mapContainerClassName="map-container"
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          rotateControlOptions: true,
          rotateControl: true,
          styles: mapstyle,
          clickableIcons: false,
          fullscreenControl: false,
          disableDefaultUI: true,
        }}
        onLoad={(map) => props.setMap(map)}
      >
        <div className="fixed-top container hstack gap-0 col checkscoot">
          <Dropdown>
            <Dropdown.Toggle size="sm">
              <GoSettings size={16} className="text-info" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-dark text-center text-light">
              Scootit karttaan <MdElectricScooter color="#1ef778" />
              <Form.Check
                type="switch"
                onChange={handleChange}
                value={onOffMarkers}
                id=""
                defaultChecked={true}
              />
            </Dropdown.Menu>
          </Dropdown>
          {onOffMarkers === true ? <div></div> : <TierMarkers />}
        </div>
        <Marker position={center} icon={icon} />
        {directionResponse && (
          <DirectionsRenderer directions={directionResponse} />
        )}
      </GoogleMap>
    </>
  );
};

export default Map;
