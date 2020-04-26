import React, { useState, useContext } from "react";
import { StockContext } from "../App";
import { Button, GridContainer, FlexContainer } from "./Reusable";
import { formatTime } from "../utils";
import styled from "styled-components";

const FormWrapper = styled.form`
  > div {
    height: 3em;

    @media (max-width: 767px) {
      height: 8em;
    }
  }
`;

const InnerContainer = styled(FlexContainer)`
  @media (max-width: 767px) {
    grid-column: span 2;

    button,
    span {
      font-size: 12px;
    }
  }

  @media (max-width: 1200px) {
    button,
    span {
      font-size: 14px;
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

const RefreshButton = styled(Button)`
  width: 40%;
  background-color: #4b633f;
`;

const RefreshTime = styled.span`
  font-size: 18px;
  font-style: italic;
  text-align: right;
  margin-left: 5px;
  align-self: center;
`;

export const StockInput = ({ refreshedAt }) => {
  const [input, setInput] = useState("");
  const {
    stockList,
    updateStocks,
    checkValidStock,
    addMsg,
    clearAllData,
    refreshData,
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
        <InnerContainer>
          <AddButton type="submit" disabled={input === ""}>
            Add Stock
          </AddButton>
          <ClearButton type="button" onClick={clearAllData}>
            Clear List
          </ClearButton>
        </InnerContainer>
        <InnerContainer>
          <RefreshButton type="button" onClick={() => refreshData()}>
            Refresh
          </RefreshButton>
          <RefreshTime>Refreshed At: {formatTime(refreshedAt)}</RefreshTime>
        </InnerContainer>
      </GridContainer>
    </FormWrapper>
  );
};
