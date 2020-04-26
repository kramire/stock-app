import React, { useState, useContext } from "react";
import { StockContext } from "../App";
import { formatTime } from "../utils";
import styled from "styled-components";

const InputForm = styled.form`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 1em;
  row-gap: 1em;
  margin: 2em;
  height: 3em;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Input = styled.input`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: black;
  border: none;
  width: 100%;
  grid-column: span 2;

  @media (max-width: 1000px) {
    grid-column: span 1;
  }

  :focus {
    outline: none;
  }
`;

const Button = styled.button`
  border-radius: 5px;
  font-size: 16px;
  border: none;
  background-color: grey;
  color: white;

  :hover {
    background-color: #adadad;
  }

  :focus {
    outline: none;
  }
`;

const RefreshTime = styled.span`
  font-size: 18px;
  font-style: italic;
  text-align: right;

  @media (max-width: 767px) {
    grid-column-end: span 2;
    text-align: center;
    font-size: 16px;
  }
`;

export const StockInput = ({ refreshedAt }) => {
  const [input, setInput] = useState("");
  const { stockList, updateStocks, checkValidStock, addMsg } = useContext(
    StockContext
  );

  const handleStockSubmit = async input => {
    if (stockList.length === 12) {
      addMsg("Limit 12 symbols", "bad");
      return;
    }

    const symbol = input.toUpperCase();
    if (stockList.find(el => el === symbol)) {
      addMsg("Symbol already in list", "bad");
      return;
    }

    const result = await checkValidStock(symbol);
    if (!result) {
      addMsg("No symbol found", "bad");
      return;
    }

    updateStocks(symbol, "add");
  };

  const handleChange = e => setInput(e.target.value);

  return (
    <InputForm
      onSubmit={e => {
        e.preventDefault();
        setInput("");
        handleStockSubmit(input);
      }}
    >
      <Input type="text" onChange={handleChange} value={input} />
      <Button type="submit" disabled={input === ""}>
        Add Stock
      </Button>
      <RefreshTime>Refreshed At: {formatTime(refreshedAt)}</RefreshTime>
    </InputForm>
  );
};
