import { useRef } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";

const Map = (props) => {
  const center = props.center;
  const directionResponse = props.directionResponse;
  const destinationRef = props.destinationRef;
  const mapRef = useRef();

  /**Click handler for changing coordinates to address on map*/
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

  return (
    <>
      <GoogleMap
        center={center}
        zoom={7}
        ref={mapRef}
        onClick={(ev) => {
          handleDestinationMapClick(ev);
        }}
        mapContainerClassName="map-container"
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          disableDefaultUI: true,
        }}
        onLoad={(map) => props.setMap(map)}
      >
        <Marker position={center} />
        {directionResponse && (
          <DirectionsRenderer directions={directionResponse} />
        )}
      </GoogleMap>
    </>
  );
};

export default Map;
