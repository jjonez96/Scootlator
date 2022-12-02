import React, { useRef, useState } from "react";
import "./App.css";
import CalculationResults from "./components/CalculationResults";
import Forms from "./components/Forms";
import LoadingScreen from "./components/LoadingScreen";
import useGeoLocation from "./hooks/useGeoLocation";
import useServices from "./hooks/useServices";
import { DirectionsRenderer, GoogleMap, Marker } from "@react-google-maps/api";
import { useJsApiLoader } from "@react-google-maps/api";
import mapstyle from "./mapstyle";
import TierMarkersVaasa from "./components/TierMarkersVaasa";
import TierMarkersSjoki from "./components/TierMarkersSjoki";

const App = () => {
  /** States */
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionResponse, setDirectionResponse] = useState();
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [libraries] = useState(["places"]);
  const [slow, setSlow] = useState(false);

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

  const handleMarkers = (event) => {
    setOnOffMarkers((current) => !current);
  };

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
      1 + parseInt(results.routes[0].legs[0].duration.text) * selected + " €"
    );
  };

  const setSlowMode = async () => {
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
    slow
      ? setPrice(
          1 +
            parseInt(results.routes[0].legs[0].duration.text) * selected +
            " €",
          setSlow(false)
        )
      : setPrice(
          1.44 +
            parseInt(results.routes[0].legs[0].duration.text) * selected +
            " €",
          setDuration(
            2 + parseInt(results.routes[0].legs[0].duration.text) + " min"
          ),
          setSlow(true)
        );
  };

  const clearRoute = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    setPrice("");
    setSlow(false);
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
      <Forms
        setSelected={setSelected}
        services={services}
        originRef={originRef}
        destinationRef={destinationRef}
        map={map}
        clearRoute={clearRoute}
        center={center}
        setSlow={setSlow}
        selectInputRef={selectInputRef}
        calculateRoute={calculateRoute}
        handleMarkers={handleMarkers}
        onOffMarkers={onOffMarkers}
      />

      <CalculationResults
        duration={duration}
        price={price}
        distance={distance}
        setSlowMode={setSlowMode}
        slow={slow}
      />
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
        onLoad={(map) => setMap(map)}
      >
        {onOffMarkers === true ? null : (
          <div className="hideload">
            <TierMarkersVaasa />
            <TierMarkersSjoki />
          </div>
        )}
        <Marker position={center} icon={icon} />
        {directionResponse && (
          <DirectionsRenderer directions={directionResponse} />
        )}
      </GoogleMap>
    </>
  );
};

export default App;
