import useScootData from "./useScootData";
const useOperators = () => {
  let apis = useScootData();
  const pricingTier = apis.pricingTier;
  const services = [
    {
      name: "Tier",
      pricePerMin: pricingTier.pricePerMinute,
      startPrice: pricingTier.startPrice,
    },
    {
      name: "Voi",
      pricePerMin: 0.22,
      startPrice: 1,
    },
  ];
  return services;
};

export default useOperators;
