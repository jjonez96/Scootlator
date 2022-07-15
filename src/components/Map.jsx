import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState, useRef } from "react";
import { Button, InputGroup, Form } from "react-bootstrap";
const center = { lat: 62.24, lng: 25.75 };
const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

  if (!isLoaded) {
    return <p className="text-center">Loading...</p>;
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
      1 + parseInt(results.routes[0].legs[0].duration.text) * 0.22 + "€"
    );
  };

  const clearRoute = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    setPrice("");
    originRef.current.value = "";
    destinationRef.current.value = "";
  };

  return (
    <div className="bg-light ">
      <div className=" hstack gap-2  row rounded p-2 pt-3    ">
        <Autocomplete>
          <InputGroup>
            <input
              className=" form-control me-auto border border-primary"
              type="text"
              placeholder="Origin"
              ref={originRef}
            />
            <Button
              id="button-addon2"
              onClick={() => {
                map.panTo(center);
                map.setZoom(15);
              }}
            >
              <FaLocationArrow />
            </Button>
          </InputGroup>
        </Autocomplete>

        <Autocomplete>
          <InputGroup>
            <input
              className="form-control me-auto border border-primary "
              type="text"
              placeholder="Destination"
              ref={destinationRef}
            />
            <Button onClick={clearRoute}>
              <FaTimes />
            </Button>
          </InputGroup>
        </Autocomplete>
      </div>
      <div className=" pb-1 pt-0 d-flex justify-content-center ">
        <Form.Select
          placeholder="Select service"
          aria-label="Default select example"
          className=" border border-primary w-75 "
        >
          <option value="1">Tier</option>
          <option value="2">Joe</option>
          <option value="3">Voi</option>
        </Form.Select>
      </div>
      <div className="  pb-1 pt-0  d-flex justify-content-center">
        <Button
          size="l"
          variant="primary"
          type="submit"
          className="w-75"
          onClick={calculateRoute}
        >
          Calculate
        </Button>
      </div>

      <GoogleMap
        center={center}
        zoom={15}
        mapContainerClassName="map-container"
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
        {directionsResponse && (
          <DirectionsRenderer directions={directionsResponse} />
        )}
      </GoogleMap>
      <div class="pb-0  d-flex justify-content-around border border-primary fw-bold  ">
        <div class="d-flex align-items-center ">
          Distance:
          {distance}
        </div>
        <div class="d-flex align-items-center">
          Duration:
          {duration}
        </div>
        <div class="d-flex align-items-center">
          Price:
          {price}
        </div>
      </div>
    </div>
  );
};
export default Map;
