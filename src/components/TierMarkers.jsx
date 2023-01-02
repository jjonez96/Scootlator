import { Marker, InfoWindow } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { MdMyLocation } from "react-icons/md";
import { IoBatteryCharging } from "react-icons/io5";

const TierMarkers = ({ originRef }) => {
  const [selectedMarker, setSelectedMarker] = useState("");
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /*Tier scooter locations from node server*/
  useEffect(() => {
    setIsLoading(true);
    fetch("https://scootdata.cyclic.app/api/tier")
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

  /*Tier scooter marker icons*/
  const icon = { url: "../tier.png", scaledSize: { width: 23, height: 23 } };

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

  return (
    <>
      {isLoading && <p className="loadingText">Ladataan scootteja..</p>}
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
                  handleOriginClick(e);
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
