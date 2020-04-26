import React, { useState, useEffect } from "react";

export const useLocalStorage = initVal => {
  const [stockList, setStockList] = useState(initVal);

  useEffect(() => {
    const savedStocks = localStorage.getItem("stocks");
    if (savedStocks && savedStocks !== "undefined") {
      const parsedList = JSON.parse(savedStocks);
      setStockList(parsedList);
    }
  }, []);

  const updateStocks = (symbol, change) => {
    const updateFunction = () => {
      switch (change) {
        case "add":
          return [...stockList, symbol];
        case "remove":
          return stockList.filter(el => el !== symbol);
        default:
          return stockList;
      }
    };
    const newStocks = updateFunction();
    localStorage.setItem("stocks", JSON.stringify(newStocks));
    setStockList(newStocks);
  };

  return { stockList, updateStocks };
};
