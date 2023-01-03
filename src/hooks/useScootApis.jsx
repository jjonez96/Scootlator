import { useEffect, useState } from "react";
const useScootApis = () => {
  const [tierMarkers, setTierMarkers] = useState([]);
  const [voiMarkers, setVoiMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  /*Scooter data from node server*/
  useEffect(() => {
    setIsLoading(true);
    fetch("https://scootdata.cyclic.app/api/tier")
      .then((response) => {
        if (response.status !== 200) {
          console.log("error", response.status);
          return;
        }
        response.json().then((tierMarkers) => {
          setTierMarkers(tierMarkers);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://scootdata.cyclic.app/api/voi")
      .then((response) => {
        if (response.status !== 200) {
          console.log("error", response.status);
          return;
        }
        response.json().then((voiMarkers) => {
          setVoiMarkers(voiMarkers);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const totalMarkers = voiMarkers.length + tierMarkers.length;
  const markerObject = {
    totalMarkers: totalMarkers,
    tierMarkers: tierMarkers,
    voiMarkers: voiMarkers,
    isLoading: isLoading,
  };

  return markerObject;
};

export default useScootApis;
