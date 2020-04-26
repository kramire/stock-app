import React from "react";
import { Stock } from "./Stock";
import { GridContainer } from "./Reusable";

export const StockList = ({ quotes }) => (
  <GridContainer>
    {quotes.map(
      quote => quote && <Stock key={quote.symbol} stockData={quote} />
    )}
  </GridContainer>
);
