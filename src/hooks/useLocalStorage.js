import React, { useState, useEffect } from "react";

export const useLocalStorage = (key, initVal, clearVal) => {
  const [data, setData] = useState(initVal);

  useEffect(() => {
    const savedData = localStorage.getItem(key);
    if (savedData && savedData !== "undefined") {
      const parsedData = JSON.parse(savedData);
      setData(parsedData);
    }
  }, [key]);

  const updateData = (newVal, change) => {
    const updateFunction = () => {
      switch (change) {
        case "add":
          return [...data, newVal];
        case "remove":
          return data.filter(el => el !== newVal);
        default:
          return data;
      }
    };
    const updatedData = updateFunction();
    localStorage.setItem("stocks", JSON.stringify(updatedData));
    setData(updatedData);
  };

  const clearData = () => {
    localStorage.clear();
    setData(clearVal);
  };

  return { data, updateData, clearData };
};
