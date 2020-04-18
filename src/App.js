import React, { useState, useEffect, createContext } from "react";
import { StockInput } from "./components/StockInput";
import { StockList } from "./components/StockList";
import { Spinner } from "./components/Loading";
import { getQuotes } from "./api";

export const StockContext = createContext();

const App = () => {
  const [stockList, setStockList] = useState(["AAPL"]);
  const [quotes, setQuotes] = useState([]);
  const [refreshedAt, setRefreshedAt] = useState(new Date());

  useEffect(() => {
    const fetchStockData = async () => {
      const data = await getQuotes(stockList);
      setQuotes(data);
    };
    fetchStockData();
  }, [stockList]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const fetchStockData = async () => {
  //       const data = await getQuotes(stockList);
  //       setQuotes(data);
  //     };
  //     fetchStockData();
  //     setRefreshedAt(new Date());
  //   }, 30000);
  //   return () => clearInterval(interval);
  // }, [stockList]);

  return (
    <StockContext.Provider
      value={{
        quotes: quotes,
        setQuotes: setQuotes,
        stockList: stockList,
        setStockList: setStockList
      }}
    >
      <StockInput refreshedAt={refreshedAt} />
      {!quotes.length ? <Spinner /> : <StockList quotes={quotes} />}
    </StockContext.Provider>
  );
};

export default App;
