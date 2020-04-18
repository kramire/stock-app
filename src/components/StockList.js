import React from "react";
import { Stock } from "./Stock";
import styled from "styled-components";

const StockListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  column-gap: 1em;
  row-gap: 1em;
  margin: 2em;
`;

export const StockList = ({ quotes }) => (
  <StockListContainer>
    {quotes.map(quote => (
      <Stock key={quote.symbol} stockData={quote} />
    ))}
  </StockListContainer>
);
