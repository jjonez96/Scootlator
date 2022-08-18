import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useState, useRef } from "react";
import useGeoLocation from "../hooks/useGeoLocation";
import "../App.css";
import CalculationResults from "./CalculationResults";
import services from "../services.json";
import Forms from "./Forms";
import LoadingScreen from "./LoadingScreen";

const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

const Map = () => {
  /** States */

  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionsResponse, setDirectionResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [libraries] = useState(["places"]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  /** Custom hooks */
  const location = useGeoLocation();

  /** Refs */
  const mapRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef(null);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();

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
  const center = location.coordinates;

  const handleOriginClick = () => {
    const url = `${geocodeJson}?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&latlng=${center.lat},${center.lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        originRef.current.value = `${place.formatted_address}`;
      });
  };

  let servicePrices = [];
  services.map((e) => {
    return servicePrices.push(e.pricePerMin);
  });

  const [selected, setSelected] = useState(...servicePrices);

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

  if (!isLoaded) {
    return <LoadingScreen />;
  }

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
        <Forms
          setSelected={setSelected}
          services={services}
          originRef={originRef}
          destinationRef={destinationRef}
          map={map}
          handleDestinationClick={handleDestinationClick}
          handleOriginClick={handleOriginClick}
          clearRoute={clearRoute}
          center={center}
          calculateRoute={calculateRoute}
        />
      </div>

      <GoogleMap
        center={center}
        zoom={7}
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
      <CalculationResults
        duration={duration}
        price={price}
        distance={distance}
      />
    </div>
  );
};
export default Map;
