import React, { useState, useContext } from "react";
import { StockContext } from "../App";
import { formatTime } from "../utils";
import styled from "styled-components";

const InputForm = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  column-gap: 1em;
  row-gap: 1em;
  margin: 2em;
  height: 3em;

  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Input = styled.input`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  color: black;
  border: none;
  width: 100%;

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
  const { stockList, setStockList, checkValidStock } = useContext(StockContext);

  const handleStockInput = async (input) => {
    const symbol = input.toUpperCase();
    if (!stockList.find((el) => el === symbol)) {
      const result = await checkValidStock(symbol);
      if (result) {
        setStockList([...stockList, symbol]);
      }
    }
  };

  const handleChange = (e) => setInput(e.target.value);

  return (
    <InputForm
      onSubmit={(e) => {
        e.preventDefault();
        setInput("");
        handleStockInput(input);
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
