import React, { useState, useEffect, useRef, createContext } from "react";
import { StockInput, StockList } from "./components";
import { Spinner, Toast } from "./components/Reusable";
import { getQuotes, getOneQuote } from "./api";
import { useNotifications, useLocalStorage } from "./hooks";

export const StockContext = createContext();

const App = () => {
  const stocks = useLocalStorage("stocks", ["AAPL"], []);
  const stockList = stocks.data;
  const [quotes, setQuotes] = useState([]);
  const [refreshedAt, setRefreshedAt] = useState(new Date());
  const { messages, addMsg, removeMsg } = useNotifications();
  const dataLoadingRef = useRef(false);

  const checkValidStock = async symbol => {
    const result = await getOneQuote(symbol);
    return !result ? false : true;
  };

  const clearAllData = () => {
    stocks.clearData();
    setQuotes([]);
  };

  useEffect(() => {
    const fetchStockData = async () => {
      dataLoadingRef.current = true;
      const data = await getQuotes(stockList);
      dataLoadingRef.current = false;
      setQuotes(data);
      setRefreshedAt(new Date());
    };
    stockList && fetchStockData();
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
        updateStocks: stocks.updateData,
        checkValidStock: checkValidStock,
        messages: messages,
        addMsg: addMsg,
        clearAllData: clearAllData,
      }}
    >
      <Toast messages={messages} removeMsg={removeMsg} />
      <StockInput refreshedAt={refreshedAt} />
      {dataLoadingRef.current ? (
        <Spinner />
      ) : (
        quotes && quotes.length > 0 && <StockList quotes={quotes} />
      )}
    </StockContext.Provider>
  );
};

export default App;
