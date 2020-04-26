import React, { useState, useContext } from "react";
import { StockContext } from "../App";
import { Button, GridContainer } from "./Reusable";
import { formatTime } from "../utils";
import styled from "styled-components";

const FormWrapper = styled.form`
  > div {
    height: 3em;

    @media (max-width: 767) {
      height: 5em;
    }
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

const AddButton = styled(Button)`
  width: 65%;
`;

const ClearButton = styled(Button)`
  width: 30%;
  background-color: #333;
  font-size: 13px;
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
  const {
    stockList,
    updateStocks,
    checkValidStock,
    addMsg,
    clearAllData,
  } = useContext(StockContext);

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
    <FormWrapper
      onSubmit={e => {
        e.preventDefault();
        setInput("");
        handleStockSubmit(input);
      }}
    >
      <GridContainer>
        <Input type="text" onChange={handleChange} value={input} />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <AddButton type="submit" disabled={input === ""}>
            Add Stock
          </AddButton>
          <ClearButton type="button" onClick={clearAllData}>
            Clear List
          </ClearButton>
        </div>
        <RefreshTime>Refreshed At: {formatTime(refreshedAt)}</RefreshTime>
      </GridContainer>
    </FormWrapper>
  );
};
