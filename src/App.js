import { useRef, useState } from "react";
import "./App.css";
import CalculationResults from "./components/CalculationResults";
import Forms from "./components/Forms";
import LoadingScreen from "./components/LoadingScreen";
import TierMarkers from "./components/TierMarkers";
import VoiMarkers from "./components/VoiMarkers";
import useGeoLocation from "./hooks/useGeoLocation";
import useOperators from "./hooks/useOperators";
import mapstyle from "./mapstyle.json";
import markerIcons from "./markerIcons.json";
import clusterStyles from "./clusterIcons.json";
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  MarkerClusterer,
  useJsApiLoader,
} from "@react-google-maps/api";
const App = () => {
  /** States */
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [directionResponse, setDirectionResponse] = useState();
  const [distance, setDistance] = useState("");
  const [onOffMarkers, setOnOffMarkers] = useState(true);
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [libraries] = useState(["places"]);
  const [selected, setSelected] = useState();

  /** Refs */
  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef(null);
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destinationRef = useRef();
  const selectInputRef = useRef();
  const mapRef = useRef();

  /** User gps coordinates */
  const location = useGeoLocation();
  const center = location.coordinates;

  /** Removes unecessary elements from body */
  document
    .querySelectorAll(".pac-container")
    .forEach((element) => element.remove());

  /** Operator selector */
  const operator = useOperators();
  const rentalStartPrice = operator.map((e) => e.startPrice);
  const startPrice = parseInt(rentalStartPrice);

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

    /** If its night then pricing will be increased */
    const hours = new Date().getHours();
    const isDayTime = hours >= 6 && hours < 22;
    if (isDayTime === true) {
      setPrice(
        startPrice +
          parseInt(results.routes[0].legs[0].duration.text) * selected +
          " €"
      );
    } else {
      setPrice(
        startPrice +
          0.44 +
          parseInt(results.routes[0].legs[0].duration.text) * selected +
          " €",
        setDuration(
          2 + parseInt(results.routes[0].legs[0].duration.text) + " min"
        )
      );
    }
  };

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

  const clearRoute = () => {
    setDirectionResponse(null);
    setDistance("");
    setDuration("");
    setPrice("");
    map.setZoom(0);
    setSelected(0);
    selectInputRef.current.value = "";
    destinationRef.current.value = "";
    originRef.current.value = "";
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  /** Scoot markers on/off switch */
  const handleScootMarkers = (event) => {
    setOnOffMarkers((current) => !current);
  };

  if (!isLoaded) {
    return <LoadingScreen />;
  }
  return (
    <div>
      <Forms
        setSelected={setSelected}
        operator={operator}
        originRef={originRef}
        destinationRef={destinationRef}
        map={map}
        clearRoute={clearRoute}
        center={center}
        selectInputRef={selectInputRef}
        calculateRoute={calculateRoute}
        handleScootMarkers={handleScootMarkers}
        onOffMarkers={onOffMarkers}
      />
      <CalculationResults
        duration={duration}
        price={price}
        distance={distance}
      />
      <GoogleMap
        center={center}
        zoom={6 - 6}
        ref={mapRef}
        onClick={(ev) => {
          handleDestinationMapClick(ev);
        }}
        mapContainerClassName="map-container"
        options={{
          minZoom: 6 - 1,
          maxZoom: 6 + 14,
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
        {onOffMarkers === false ? null : (
          <MarkerClusterer
            options={{
              styles: clusterStyles,
              gridSize: 60,
              maxZoom: 17,
            }}
          >
            {(clusterer) => (
              <div className="hideload">
                <TierMarkers
                  originRef={originRef}
                  geocodeJson={geocodeJson}
                  clusterer={clusterer}
                />
                <VoiMarkers
                  originRef={originRef}
                  geocodeJson={geocodeJson}
                  clusterer={clusterer}
                />
              </div>
            )}
          </MarkerClusterer>
        )}
        <Marker position={center} icon={markerIcons[0]} />
        {directionResponse && (
          <DirectionsRenderer directions={directionResponse} />
        )}
      </GoogleMap>
    </div>
  );
};

export default App;
