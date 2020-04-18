import React, { useState, useContext } from "react";
import { StockContext } from "../App";
import styled from "styled-components";

const InputForm = styled.form`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  column-gap: 1em;
  row-gap: 1em;
  margin: 2em;
  height: 3em;
`;

const Input = styled.input`
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
  color: black;
  border: non;

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

  : hover {
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
`;

export const StockInput = ({ refreshedAt }) => {
  const [input, setInput] = useState("");
  const { stockList, setStockList } = useContext(StockContext);

  const handleStockInput = stock => {
    if (!stockList.find(el => el === stock)) {
      setStockList([...stockList, stock]);
    }
  };

  const handleChange = e => setInput(e.target.value);

  const formatTime = time => {
    if (!time) return "N/A";
    return `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
  };

  return (
    <InputForm
      onSubmit={e => {
        e.preventDefault();
        setInput("");
        handleStockInput(input);
      }}
    >
      <Input type="text" onChange={handleChange} value={input} />
      <Button type="submit">Add Stock</Button>
      <RefreshTime>Refreshed At: {formatTime(refreshedAt)}</RefreshTime>
    </InputForm>
  );
};
