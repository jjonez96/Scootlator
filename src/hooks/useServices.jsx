import { useEffect, useState } from "react";
const usePrices = () => {
  const [tier, setTier] = useState(0.24);

  /*Tier pricePerMin api from backend*/
  useEffect(() => {
    fetch("http://localhost:7000")
      .then((res) => res.text())
      .then((res) => setTier(res));
  }, []);

  let tierPrice = {
    name: "Tier",
    pricePerMin: tier,
  };

  let services = [
    {
      name: "Aloitus 1€",
      pricePerMin: 0.25,
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

  services.unshift(tierPrice);

  return services;
};

export default usePrices;
