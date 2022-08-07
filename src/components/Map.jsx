import { FaLocationArrow, FaTimes } from "react-icons/fa";
import { MdElectricScooter } from "react-icons/md";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useRef } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
import useGeoLocation from "../hooks/useGeoLocation";
import "../App.css";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

const libraries = ["places", "geometry"];
const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  const location = useGeoLocation();

  const mapRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef(null);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  const center = location.coordinates;

  const handleDestinationClick = (ev) => {
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

  const handleOriginClick = () => {
    const url = `${geocodeJson}?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&latlng=${center.lat},${center.lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        originRef.current.value = `${place.formatted_address}`;
      });
  };

  const services = [
    {
      name: "Tier",
      pricePerMin: 0.22,
    },

    {
      name: "Voi",
      pricePerMin: 0.22,
    },
    {
      name: "Lime",
      pricePerMin: 0.22,
    },
    {
      name: "Joe",
      pricePerMin: 0.2,
    },
    {
      name: "Dott",
      pricePerMin: 0.19,
    },
    {
      name: "Bird",
      pricePerMin: 0.19,
    },
  ];

  let servicePrices = [];
  services.map((e) => {
    return servicePrices.push(e.pricePerMin.toFixed(2));
  });
  const [selected, setSelected] = useState(...servicePrices);

  if (!isLoaded) {
    return (
      <div className="overlay">
        <div className="d-flex justify-content-center">
          <div className="spinner-grow spinner-grow-sm text-light opacity-25">
            <p className="text-warning">
              <MdElectricScooter size={60} />
            </p>
          </div>
        </div>
      </div>
    );
  }

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionService = new google.maps.DirectionsService();
    const results = await directionService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.BICYCLING,
    });
    setDirectionResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
    setPrice(
      1 + parseInt(results.routes[0].legs[0].duration.text) * selected + "€"
    );
  };

  const clearRoute = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    setPrice("");
    destinationRef.current.value = "";
    originRef.current.value = "";
  };

  return (
    <div>
      <div className=" customBg fixed-top container shadow mt-1  ">
        <div className=" hstack gap-2  row rounded p-2 pt-1    ">
          <Autocomplete>
            <InputGroup>
              <input
                className=" form-control me-auto border border-warning "
                type="text"
                placeholder="Lähtö"
                ref={originRef}
              />
              <Button
                id="button-addon2"
                variant="warning"
                onClick={(e) => {
                  map.panTo(center);
                  map.setZoom(15);
                  handleOriginClick(e);
                }}
              >
                <FaLocationArrow />
              </Button>
            </InputGroup>
          </Autocomplete>

          <Autocomplete>
            <InputGroup>
              <input
                className="form-control me-auto border border-warning bg-light  "
                type="text"
                placeholder="Määränpää"
                ref={destinationRef}
              />
              <Button variant="warning" onClick={clearRoute}>
                <FaTimes />
              </Button>
            </InputGroup>
          </Autocomplete>
        </div>
        <div className=" pb-1 d-flex justify-content-center ">
          <Form.Select
            aria-label="Default select example"
            className=" border border-warning w-75 bg-light "
            onChange={(e) => setSelected(e.target.value)}
          >
            {services.map((service) => (
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
            onClick={calculateRoute}
          >
            Laske
          </Button>
        </div>
      </div>
      <GoogleMap
        center={center}
        zoom={13}
        ref={mapRef}
        onClick={(ev) => {
          handleDestinationClick(ev);
        }}
        mapContainerClassName="map-container"
        options={{
          zoomControl: false,

          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          disableDefaultUI: true,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      {price.length === 0 ? (
        <></>
      ) : (
        <div className=" d-flex justify-content-around fw-bold bg-warning fixed-bottom shadow container rounded  rounded pt-1  ">
          <div className="d-flex align-items-center mb-1">
            Pituus:
            <br />
            {distance}
          </div>
          <div className="d-flex align-items-center mb-1">
            Kesto:
            <br />~{duration}
          </div>
          <div className="d-flex align-items-center mb-1">
            Hinta:
            <br />~{price}
          </div>
        </div>
      )}
    </div>
  );
};
export default Map;
