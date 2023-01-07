import { useEffect, useState } from "react";
const useScootApis = () => {
  const [tierMarkers, setTierMarkers] = useState([]);
  const [voiMarkers, setVoiMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [tierPrice, setTierPrice] = useState([]);

  /*Scooter data from node server*/
  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch("https://scootdata.cyclic.app/api/tier"),
      fetch("https://scootdata.cyclic.app/api/tier/pricing"),
      fetch("https://scootdata.cyclic.app/api/voi"),
    ])
      .then(([resTier, resPricing, restVoi]) =>
        Promise.all([resTier.json(), resPricing.json(), restVoi.json()])
      )
      .then(
        ([dataTier, dataPricing, dataVoi]) => {
          setTierMarkers(dataTier);
          setTierPrice(dataPricing);
          setVoiMarkers(dataVoi);
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(true);
        }
      );
  }, []);

  const pricingTier = {
    pricePerMinute: tierPrice.rentalRunningPricePerMinute,
    startPrice: tierPrice.rentalStartPrice,
  };

  const markerObject = {
    totalMarkers: voiMarkers.length + tierMarkers.length,
    tierMarkers: tierMarkers,
    voiMarkers: voiMarkers,
    pricingTier: pricingTier,
    isLoading: isLoading,
  };

  return markerObject;
};

export default useScootApis;
