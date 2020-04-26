import React, { useState, useEffect, createContext } from "react";
import { StockInput } from "./components/StockInput";
import { StockList } from "./components/StockList";
import { Spinner } from "./components/Loading";
import { Toast } from "./components/Toast";
import { getQuotes, getOneQuote } from "./api";
import { useNotifications } from "./hooks/useNotifications";
import { useLocalStorage } from "./hooks/useLocalStorage";

export const StockContext = createContext();

const App = () => {
  const { stockList, updateStocks } = useLocalStorage(["AAPL"]);
  const [quotes, setQuotes] = useState([]);
  const [refreshedAt, setRefreshedAt] = useState(new Date());
  const { messages, addMsg, removeMsg } = useNotifications();

  const checkValidStock = async symbol => {
    const result = await getOneQuote(symbol);
    if (!result) {
      console.log("No Result");
      return false;
    } else {
      return true;
    }
  };

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
        updateStocks: updateStocks,
        checkValidStock: checkValidStock,
        messages: messages,
        addMsg: addMsg,
      }}
    >
      <Toast messages={messages} removeMsg={removeMsg} />
      <StockInput refreshedAt={refreshedAt} />
      {!quotes.length ? <Spinner /> : <StockList quotes={quotes} />}
    </StockContext.Provider>
  );
};

export default App;
