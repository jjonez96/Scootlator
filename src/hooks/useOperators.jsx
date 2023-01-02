import { useEffect, useState } from "react";
const useOperators = () => {
  const [tierPrice, setTierPrice] = useState([]);
  const pricePerMinute = tierPrice.map((e) => e.rentalRunningPricePerMinute);
  /*Tier pricePerMin api from node server*/
  useEffect(() => {
    fetch("https://scootdata.cyclic.app/api/tier/pricing")
      .then((response) => {
        if (response.status !== 200) {
          console.log("error", response.status);
          return;
        }
        response.json().then((tierPrice) => {
          setTierPrice(tierPrice);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const services = [
    {
      name: "Voi",
      pricePerMin: 0.22,
      startPrice: 1,
    },
  ];

  services.unshift({
    name: "Tier",
    pricePerMin: pricePerMinute,
    startPrice: 1,
  });
  return services;
};

export default useOperators;
