import { useMemo } from "react";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
export default function Home() {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (!isLoaded) return <div>Loading...</div>;
  return <Map />;
}

function Map() {
  const center = useMemo(() => ({ lat: 62.24, lng: 25.75 }), []);

  return (
    <div>
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
      >
        <Marker position={center} />
      </GoogleMap>
      <Form className=" fixed-top container-fluid bg-light rounded shadow-sm pt-3 mt-3 w-50  ">
        <Form.Group className="mb-3  ">
          <Form.Control
            className="d-inline-flex p-2"
            type="text"
            placeholder="Origin"
          />
          <br />
          <Form.Control
            className="d-inline-flex p-2 "
            type="text"
            placeholder="Destination"
          />
          <Button
            variant="outline-warning"
            className="mt-3 float-end  rounded-circle shadow-sm "
          >
            <FaTimes />
          </Button>
          <Button
            variant="outline-warning"
            className="mt-3 m-2 float-end rounded-circle shadow-sm"
          >
            <FaLocationArrow />
          </Button>
        </Form.Group>
        <Button className="mb-3 bg-success " variant="primary" type="submit">
          Calculate
        </Button>
      </Form>
    </div>
  );
}
