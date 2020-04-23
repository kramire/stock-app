const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "/.netlify/functions";

export const getOneQuote = async (symbol) => {
  try {
    return await fetch(`${baseUrl}/getQuote/${symbol}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return null;
        return {
          symbol,
          data,
        };
      });
  } catch (e) {
    console.log(e);
  }
};

export const getQuotes = (stockListArr) =>
  Promise.all(stockListArr.map(async (stock) => getOneQuote(stock)));
