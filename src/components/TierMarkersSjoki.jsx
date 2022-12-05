import { Marker, InfoWindow } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdMyLocation } from "react-icons/md";

const TierMarkersSjoki = ({ originRef }) => {
  const [selectedMarker, setSelectedMarker] = useState("");
  const [markers, setMarkers] = useState([]);

  /*Tier scooter locations from node server*/
  useEffect(() => {
    fetch("https://tierdata.cyclic.app/locationssjoki")
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

  /**Click handler for changing coordinates to address*/
  const geocodeJson = "https://maps.googleapis.com/maps/api/geocode/json";
  const handleOriginClick = () => {
    const url = `${geocodeJson}?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&latlng=${selectedMarker.lat},${selectedMarker.lng}`;
    fetch(url)
      .then((response) => response.json())
      .then((location) => {
        const place = location.results[0];
        originRef.current.value = `${place.formatted_address}`;
      });
  };

  /*Tier scooter locations update date format*/
  const newTime = new Date(selectedMarker.lastLocationUpdate);
  const minutes = String(newTime.getMinutes()).padStart(2, "0");
  const hours = String(newTime.getHours()).padStart(2, "0");
  const time = hours + ":" + minutes;

  /*Tier scooter marker icons*/
  const icon = { url: "../scooter.png", scaledSize: { width: 28, height: 28 } };

  return (
    <>
      {markers.map((marker, id) => (
        <Marker
          icon={icon}
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
          <>
            <h6>Tier e-scoot</h6>
            <>
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
            </>
            Maksiminopeus: <b>{selectedMarker.maxSpeed}km/h</b>
            <br />
            <div className="markBtns">
              <Button
                onClick={(e) => {
                  handleOriginClick(e);
                }}
                className="btn btn-info"
                size="sm"
              >
                Sijainti <MdMyLocation />
              </Button>
              <Button className="btn btn-info m-2" size="sm">
                <a
                  className="vuokraa"
                  href="https://play.google.com/store/search?q=tier+scooter+app&c=apps&hl=fi"
                >
                  Vuokraa
                </a>
              </Button>
            </div>
          </>
        </InfoWindow>
      )}
    </>
  );
};

export default TierMarkersSjoki;
