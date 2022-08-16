import { useEffect, useState } from "react";
let googleMapsApi;
var loading = false;

const useAutoComplete = () => {
  const [, setGoogleMapsApi] = useState();
  useEffect(() => {
    if (loading) {
    } else {
      if (!googleMapsApi) {
        loading = true;
        loading = false;
        googleMapsApi = window.google.maps;
        setGoogleMapsApi(window.google.maps);
      }
    }
  }, []);

  return googleMapsApi;
};

export default useAutoComplete;
