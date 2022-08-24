import { useState, useEffect } from "react";
const usePrices = () => {
  const [tier, setTier] = useState(0);

  /*Tier pricePerMin api*/
  useEffect(() => {
    fetch("http://localhost:7000")
      .then((res) => res.text())
      .then((res) => setTier(res));
  }, []);

  const services = [
    {
      name: "Aloitus 1€",
      pricePerMin: 0.25,
    },
    {
      name: "Tier",
      pricePerMin: tier,
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
