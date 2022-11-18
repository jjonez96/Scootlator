import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";

const TierMarkers = () => {
  const [selectedMarker, setSelectedMarker] = useState("");
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  /*Tier scooter locations from node server*/
  useEffect(() => {
    setIsLoading(true);
    fetch("https://tierlocations.cyclic.app/api")
      .then((response) => {
        if (response.status !== 200) {
          console.log("error", response.status);
          return;
        }
        response.json().then((markers) => {
          setIsLoading(false);
          setMarkers(markers);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const newTime = new Date(selectedMarker.lastLocationUpdate);
  const minutes = String(newTime.getMinutes()).padStart(2, "0");
  const hours = String(newTime.getHours()).padStart(2, "0");
  const time = hours + ":" + minutes;

  const icon = { url: "../scooter.png", scaledSize: { width: 28, height: 28 } };

  return (
    <>
      {isLoading && (
        <Spinner animation="border" variant="info" size="sm" className="p-1" />
      )}
      {markers.map(({ id, attributes }) => (
        <Marker
          icon={icon}
          key={id}
          title={"Tier"}
          position={attributes}
          onClick={() => setSelectedMarker(attributes)}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker}
          onCloseClick={() => setSelectedMarker("")}
        >
          <div>
            <h6>Tier e-scoot</h6>
            <div>
              Päivitetty: <b>{time}</b>
              {selectedMarker.batteryLevel > 50 ? (
                <div>
                  Akkua jäljellä:&nbsp;
                  <b style={{ color: "#00ff00" }}>
                    {selectedMarker.batteryLevel}%
                  </b>
                </div>
              ) : selectedMarker.batteryLevel > 25 ? (
                <div>
                  Akkua jäljellä:&nbsp;
                  <b style={{ color: "#ffee00" }}>
                    {selectedMarker.batteryLevel}%
                  </b>
                </div>
              ) : (
                <div>
                  Akkua jäljellä:&nbsp;
                  <b style={{ color: "#ff0000" }}>
                    {selectedMarker.batteryLevel}%
                  </b>
                </div>
              )}
            </div>
            Maksiminopeus: <b>{selectedMarker.maxSpeed}km/h</b>
            <br />
            <a
              className="vuokraa"
              href="https://play.google.com/store/search?q=tier+scooter+app&c=apps&hl=fi"
            >
              Vuokraa
            </a>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default TierMarkers;
