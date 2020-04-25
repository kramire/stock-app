import React from "react";
import { Stock } from "./Stock";
import styled from "styled-components";

const StockListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  column-gap: 1em;
  row-gap: 1em;
  margin: 2em;

  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 767px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

export const StockList = ({ quotes }) => (
  <StockListContainer>
    {quotes.map(
      quote => quote && <Stock key={quote.symbol} stockData={quote} />
    )}
  </StockListContainer>
);
