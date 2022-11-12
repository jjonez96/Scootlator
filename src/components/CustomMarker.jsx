import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";
import { useEffect, useState } from "react";

const CustomMarker = () => {
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
  const [selectedMarker, setSelectedMarker] = useState("");
  console.log(marks);
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);
  return (
    <div>
      {marks.map(({ id, attributes }) => (
        <Marker
          key={id}
          title={"Tier"}
          position={attributes}
          onClick={() => setSelectedMarker(attributes)}
        />
      ))}
      {selectedMarker && (
        <InfoWindow position={selectedMarker} onClick={setInfoWindowVisible}>
          <div>
            <h6>Tier Scoot</h6>
            <b>Akkua jäljellä: {selectedMarker.batteryLevel}%</b>
            <br />
            <b>Maksiminopeus: {selectedMarker.maxSpeed}km/h</b>
          </div>
        </InfoWindow>
      )}
    </div>
  );
};

export default CustomMarker;
