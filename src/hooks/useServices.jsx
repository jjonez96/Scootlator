import { useEffect, useState } from "react";
const usePrices = () => {
  const [tier, setTier] = useState(0.25);

  /*Tier pricePerMin api from node server*/
  useEffect(() => {
    fetch("https://tierdata.cyclic.app/price")
      .then((response) => {
        if (response.status !== 200) {
          console.log("error", response.status);
          return;
        }
        response.json().then((tier) => {
          setTier(tier.rentalRunningPricePerMinute);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let services = [
    {
      name: "Tier",
      pricePerMin: tier,
    },
    {
      name: "Voi",
      pricePerMin: 0.22,
    },
  ];

  return services;
};

export default usePrices;
