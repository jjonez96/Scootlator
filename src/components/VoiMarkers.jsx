import { Marker, InfoWindow } from "@react-google-maps/api";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { MdMyLocation } from "react-icons/md";
import { IoBatteryCharging } from "react-icons/io5";
import useScootApis from "../hooks/useScootApis";
import markerIcons from "../markerIcons.json";

const VoiMarkers = ({ originRef, geocodeJson, clusterer }) => {
  const [selectedMarker, setSelectedMarker] = useState("");
  let apis = useScootApis();
  const markers = apis.voiMarkers;

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
      {!apis.isLoading && (
        <p className="loadingText">Scootteja löytyi: {apis.totalMarkers}</p>
      )}
      {markers.map((marker, id) => (
        <Marker
          icon={markerIcons[1]}
          key={id}
          title={"Voi"}
          clusterer={clusterer}
          position={marker}
          onClick={() => {
            setSelectedMarker(marker);
          }}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker}
          onCloseClick={() => setSelectedMarker("")}
        >
          <div className="text-center">
            <b className="voiheading">Voi</b>
            <div>
              <b>{selectedMarker.category}</b> {""}
              {selectedMarker.battery > 50 ? (
                <b style={{ color: "#00ff00" }}>
                  {""}
                  <IoBatteryCharging size={20} />
                  <b className="battery"> {selectedMarker.battery}% </b>
                </b>
              ) : selectedMarker.battery > 25 ? (
                <b style={{ color: "#ffee00" }}>
                  <IoBatteryCharging size={20} className="" /> {""}
                  <b className="battery"> {selectedMarker.battery}% </b>
                </b>
              ) : (
                <b style={{ color: "#ff0000" }}>
                  <IoBatteryCharging size={20} /> {""}
                  <b className="battery"> {selectedMarker.battery}% </b>
                </b>
              )}
            </div>

            <div className="markBtns">
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
                className="btn btn-outline-info bg-transparent text-info m-1  border-info"
                size="sm"
              >
                <a
                  className="vuokraa text-info"
                  href="https://lqfa.adj.st/voiapp/open?adj_t=3swpnku&adj_campaign=campaign2&adj_adgroup=adgroup2&adj_creative=creative2&adj_deeplink=voiapp%3A%2F%2Fhome"
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

export default VoiMarkers;
