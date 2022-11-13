import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const TierMarkers = () => {
  const [tier, setTier] = useState();
  const [selectedMarker, setSelectedMarker] = useState("");
  const [markers, setMarkers] = useState([]);

  /*Tier scooter locations from node server*/
  useEffect(() => {
    fetch("https://tierlocations.herokuapp.com/")
      .then((response) => {
        if (response.status !== 200) {
          console.log("error", response.status);
          return;
        }
        response.json().then((markers) => {
          setMarkers(markers);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /*Tier pricePerMin api from node server*/
  useEffect(() => {
    fetch("https://tierprice.herokuapp.com/")
      .then((res) => res.text())
      .then((res) => setTier(res));
  }, []);
  const icon = { url: "../scooter.png", scaledSize: { width: 32, height: 32 } };

  return (
    <>
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
            <h6>Tier Scoot</h6>
            Akkua jäljellä: <b>{selectedMarker.batteryLevel}%</b>
            <br />
            Maksiminopeus: <b>{selectedMarker.maxSpeed}km/h</b>
            <br />
            Hinta: <b>1€ + {tier}€/min</b>
            <br />
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export default TierMarkers;
