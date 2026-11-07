"use client";

import { useCallback, useMemo, useState } from "react";

export type MarketOption = {
  value: string;
  label: string;
};

type UseHomeSearchProps = {
  selectedMarket: string;
  marketOptions: Record<string, MarketOption[]>;
};

export function useHomeSearch({
  selectedMarket,
  marketOptions,
}: UseHomeSearchProps) {
  const [activePanel, setActivePanel] = useState("");
  const [operation, setOperation] = useState(
    selectedMarket === "إعادة البيع" ? "resale" : "sale"
  );

  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [minArea, setMinArea] = useState("");
  const [maxArea, setMaxArea] = useState("");

  const [bedrooms, setBedrooms] = useState("الكل");
  const [bathrooms, setBathrooms] = useState("الكل");

  const [paymentMethod, setPaymentMethod] = useState("الكل");
  const [downPayment, setDownPayment] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState("");
  const [installmentYears, setInstallmentYears] = useState("الكل");

  const [finishing, setFinishing] = useState("الكل");
  const [delivery, setDelivery] = useState("الكل");
  const [amenities, setAmenities] = useState<string[]>([]);

  const currentTypes = useMemo(
    () => marketOptions[selectedMarket] || [],
    [marketOptions, selectedMarket]
  );

  const marketValue = useMemo(() => {
    const markets: Record<string, string> = {
      "سكني": "residential",
      "تجاري": "commercial",
      "فندقي": "hotel",
      "إعادة البيع": "resale",
      "مصايف": "summer",
      "استثماري": "investment",
    };

    return markets[selectedMarket] || "investment";
  }, [selectedMarket]);

  const installmentEnabled =
    paymentMethod === "تقسيط فقط" ||
    paymentMethod === "نقدي أو تقسيط";

  const toggleAmenity = useCallback((item: string) => {
    setAmenities((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item]
    );
  }, []);

  const resetFilters = useCallback(() => {
    setOperation(selectedMarket === "إعادة البيع" ? "resale" : "sale");
    setPropertyType("");
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setMinArea("");
    setMaxArea("");
    setBedrooms("الكل");
    setBathrooms("الكل");
    setPaymentMethod("الكل");
    setDownPayment("");
    setMonthlyPayment("");
    setInstallmentYears("الكل");
    setFinishing("الكل");
    setDelivery("الكل");
    setAmenities([]);
  }, [selectedMarket]);

  const closePanel = useCallback(() => {
    setActivePanel("");
  }, []);

  const openPanel = useCallback((name: string) => {
    setActivePanel(name);
  }, []);

  const isOpen = useCallback(
    (name: string) => activePanel === name,
    [activePanel]
  );

  const searchParams = useMemo(() => {
    const params = new URLSearchParams();

    const values: Record<string, string> = {
      market: marketValue,
      operation,
      type: propertyType,
      location,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      bedrooms,
      bathrooms,
      paymentMethod,
      downPayment,
      monthlyPayment,
      installmentYears,
      finishing,
      delivery,
    };

    Object.entries(values).forEach(([key, value]) => {
      if (value && value !== "الكل") {
        params.set(key, value);
      }
    });

    amenities.forEach((item) => {
      params.append("amenities", item);
    });

    return params.toString();
  }, [
    marketValue,
    operation,
    propertyType,
    location,
    minPrice,
    maxPrice,
    minArea,
    maxArea,
    bedrooms,
    bathrooms,
    paymentMethod,
    downPayment,
    monthlyPayment,
    installmentYears,
    finishing,
    delivery,
    amenities,
  ]);

  return {
    activePanel,
    setActivePanel,
    openPanel,
    closePanel,
    isOpen,

    operation,
    setOperation,
    propertyType,
    setPropertyType,
    location,
    setLocation,

    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    minArea,
    setMinArea,
    maxArea,
    setMaxArea,

    bedrooms,
    setBedrooms,
    bathrooms,
    setBathrooms,

    paymentMethod,
    setPaymentMethod,
    downPayment,
    setDownPayment,
    monthlyPayment,
    setMonthlyPayment,
    installmentYears,
    setInstallmentYears,

    finishing,
    setFinishing,
    delivery,
    setDelivery,
    amenities,
    toggleAmenity,

    currentTypes,
    marketValue,
    installmentEnabled,
    resetFilters,
    searchParams,
  };
}