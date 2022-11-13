import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const CustomMarker = (props) => {
  const [tier, setTier] = useState();
  const [selectedMarker, setSelectedMarker] = useState("");
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((response) => {
        if (response.status !== 200) {
          console.log("error", response.status);
          return;
        }
        response.json().then((marks) => {
          setMarks(marks);
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

  return (
    <>
      {marks.map(({ id, attributes }) => (
        <Marker
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

export default CustomMarker;
