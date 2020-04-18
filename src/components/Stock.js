import React, { useState, useContext } from "react";
import { StockContext } from "../App";
import styled from "styled-components";

const StockContainer = styled.div`
  border: 2px solid #333;
  border-radius: 5px;
  padding: 1em;
`;

const StockSymbol = styled.h2`
  font-size: 32px;
  letter-spacing: 2px;
  margin: 0.25em 0;
`;

const Price = styled.h1`
  font-size: 48px;
  margin-bottom: 15px;
`;

const Change = styled.div`
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: bold;
`;

const DataContainer = styled.div`
  color: ${props => (props.isUp ? "#42b342" : "#e02e2e")};
`;

const StockHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DeleteButton = styled.button`
  background-color: transparent;
  color: #ddd;
  height: 50%;
  font-size: 20px;
  font-weight: bold;
  border: none;
  outline: none;
`;

export const Stock = ({ stockData }) => {
  const [showDelete, setShowDelete] = useState(false);
  const { symbol, data } = stockData;
  const { stockList, setStockList } = useContext(StockContext);

  const handleDelete = symbol => () => {
    const newStockList = stockList.filter(el => el !== symbol);
    setStockList(newStockList);
  };

  const isUp = data.c - data.pc >= 0;

  return (
    <StockContainer
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <StockHeader>
        <StockSymbol>{symbol}</StockSymbol>
        <DeleteButton
          style={{ visibility: `${showDelete ? "visible" : "hidden"}` }}
          onClick={handleDelete(symbol)}
        >
          X
        </DeleteButton>
      </StockHeader>
      {data && (
        <DataContainer isUp={isUp}>
          <Price>{data.c.toFixed(2)}</Price>
          <Change>{Math.round(data.c - data.pc).toFixed(2)}</Change>
          <Change>{(((data.c - data.pc) * 100) / data.pc).toFixed(2)}%</Change>
        </DataContainer>
      )}
    </StockContainer>
  );
};
