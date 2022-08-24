import "./App.css";
import { useJsApiLoader } from "@react-google-maps/api";
import { useState, useRef } from "react";
import React from "react";
import Map from "./components/Map";
import Forms from "./components/Forms";
import CalculationResults from "./components/CalculationResults";
import LoadingScreen from "./components/LoadingScreen";
import useServices from "./hooks/useServices";
import useGeoLocation from "./hooks/useGeoLocation";

const App = () => {
  /** States */
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionResponse, setDirectionResponse] = useState();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [libraries] = useState(["places"]);

  /** Refs */
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef(null);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();
  const selectInputRef = useRef();

  /** User gps coordinates */
  const location = useGeoLocation();
  const center = location.coordinates;

  /** Service selector */
  const services = useServices();
  const servicePrices = [];
  services.map((e) => {
    return servicePrices.push(e.pricePerMin);
  });
  const [selected, setSelected] = useState(...services);

  const calculateRoute = async () => {
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
    setSelected(0);
    selectInputRef.current.value = "";
    destinationRef.current.value = "";
    originRef.current.value = "";
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <>
      <div className=" customBg fixed-top container shadow mt-1  ">
        <Forms
          setSelected={setSelected}
          services={services}
          originRef={originRef}
          destinationRef={destinationRef}
          map={map}
          clearRoute={clearRoute}
          center={center}
          selectInputRef={selectInputRef}
          calculateRoute={calculateRoute}
        />
      </div>
      <Map
        destinationRef={destinationRef}
        setMap={setMap}
        map={map}
        directionResponse={directionResponse}
        center={center}
      />
      <CalculationResults
        duration={duration}
        price={price}
        distance={distance}
      />
    </>
  );
};

export default App;
