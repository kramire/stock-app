import React, { useState, useContext } from "react";
import { StockContext } from "../App";
import styled from "styled-components";

const StockContainer = styled.div`
  border: 2px solid #333;
  border-radius: 5px;
  padding: 1em;

  @media (max-width: 767px) {
    :active {
      background-color: rgba(255, 255, 255, 0.15);
    }
  }
`;

const StockSymbol = styled.h2`
  font-size: 32px;
  letter-spacing: 2px;
  margin: 0.25em 0;

  @media (max-width: 767px) {
    font-size: 24px;
  }
`;

const Price = styled.h1`
  font-size: 48px;
  margin-bottom: 15px;

  @media (max-width: 767px) {
    font-size: 26px;
  }
`;

const Change = styled.div`
  font-size: 28px;
  margin-bottom: 10px;
  font-weight: bold;

  @media (max-width: 767px) {
    font-size: 18px;
  }
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
  padding: 0;
  margin: -0.25em;
`;

export const Stock = ({ stockData }) => {
  const [showDelete, setShowDelete] = useState(false);
  const { symbol, data } = stockData;
  const { updateStocks } = useContext(StockContext);

  const handleDelete = symbol => () => updateStocks(symbol, "remove");

  const isUp = data.c - data.pc >= 0;
  const price = data.c.toFixed(2);
  const BREAKPOINT = 767;

  return (
    <StockContainer
      showDelete
      onMouseEnter={() =>
        window.innerWidth >= BREAKPOINT && setShowDelete(true)
      }
      onMouseLeave={() =>
        window.innerWidth >= BREAKPOINT && setShowDelete(false)
      }
      onClick={() =>
        window.innerWidth < BREAKPOINT && setShowDelete(!showDelete)
      }
    >
      <StockHeader>
        <StockSymbol>{symbol}</StockSymbol>
        <DeleteButton
          style={{
            visibility: `${showDelete ? "visible" : "hidden"}`,
          }}
          onClick={handleDelete(symbol)}
        >
          X
        </DeleteButton>
      </StockHeader>
      {data && (
        <DataContainer isUp={isUp}>
          <Price>{price}</Price>
          <Change>{Math.round(data.c - data.pc).toFixed(2)}</Change>
          <Change>{(((data.c - data.pc) * 100) / data.pc).toFixed(2)}%</Change>
        </DataContainer>
      )}
    </StockContainer>
  );
};
