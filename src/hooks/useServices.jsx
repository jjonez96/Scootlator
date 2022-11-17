import { useEffect, useState } from "react";
const usePrices = () => {
  const [tier, setTier] = useState(0);

  /*Tier pricePerMin api from node server*/
  useEffect(() => {
    fetch("https://tierprice.cyclic.app/api")
      .then((res) => res.json())
      .then((res) => setTier(res));
  }, []);

  let services = [
    {
      name: "Tier",
      pricePerMin: tier,
    },
    {
      name: "Aloitus 1€",
      pricePerMin: 0.24,
    },
    {
      name: "Aloitus 1€",
      pricePerMin: 0.23,
    },
    {
      name: "Aloitus 1€",
      pricePerMin: 0.22,
    },
    {
      name: "Aloitus 1€",
      pricePerMin: 0.21,
    },
    {
      name: "Aloitus 1€",
      pricePerMin: 0.2,
    },
    {
      name: "Aloitus 1€",
      pricePerMin: 0.19,
    },
  ];

  return services;
};

export default usePrices;
