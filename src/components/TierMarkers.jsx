import { Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { MdMyLocation } from "react-icons/md";
import { IoBatteryCharging } from "react-icons/io5";
import Spinner from "react-bootstrap/Spinner";
import useScootApis from "../hooks/useScootApis";
import markerIcons from "../markerIcons.json";

const TierMarkers = ({ originRef, geocodeJson }) => {
  const [selectedMarker, setSelectedMarker] = useState("");
  let apis = useScootApis();

  const markers = apis.tierMarkers;

  /**Click handler for changing coordinates to address(passing address to origin input)*/
  const handleScootLocationClick = () => {
    const url = `${geocodeJson}?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&latlng=${selectedMarker.lat},${selectedMarker.lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        originRef.current.value = `${place.formatted_address}`;
      });
  };

  return (
    <>
      {apis.isLoading && (
        <Spinner
          animation="border"
          variant="info"
          size="sm"
          className="loading"
        />
      )}

      {markers.map((marker, id) => (
        <Marker
          icon={markerIcons[2]}
          key={id}
          title={"Tier"}
          position={marker}
          onClick={() => setSelectedMarker(marker)}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker}
          onCloseClick={() => setSelectedMarker("")}
        >
          <div className="text-center">
            <b className="tierheading">Tier</b>
            <div>
              <b> {selectedMarker.vehicleType}</b>{" "}
              {selectedMarker.batteryLevel > 50 ? (
                <b style={{ color: "#00ff00" }}>
                  <IoBatteryCharging size={20} />
                  <b className="battery"> {selectedMarker.batteryLevel}% </b>
                </b>
              ) : selectedMarker.batteryLevel > 25 ? (
                <b style={{ color: "#ffee00" }}>
                  <IoBatteryCharging size={20} className="" />
                  <b className="battery"> {selectedMarker.batteryLevel}% </b>
                </b>
              ) : (
                <b style={{ color: "#ff0000" }}>
                  <IoBatteryCharging size={20} />
                  <b className="battery"> {selectedMarker.batteryLevel}% </b>
                </b>
              )}
            </div>
            <div className="markBtns mt-1 ">
              <Button
                onClick={(e) => {
                  handleScootLocationClick(e);
                }}
                className="btn btn-outline-info bg-transparent text-info border-info"
                size="sm"
              >
                <MdMyLocation />
              </Button>
              <Button
                className="btn btn-outline-info bg-transparent text-info m-1 border-info"
                size="sm"
              >
                <a
                  className="vuokraa text-info"
                  href="https://qr.tier-services.io/AB123456"
                >
                  Vuokraa
                </a>
              </Button>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default TierMarkers;
