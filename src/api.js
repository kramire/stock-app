const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "/.netlify/functions";

export const getQuotes = stockListArr =>
  Promise.all(
    stockListArr.map(async stock => {
      try {
        return await fetch(`${baseUrl}/getQuote/${stock}`)
          .then(res => res.json())
          .then(data => {
            if (data.error) return null;
            return {
              symbol: stock,
              data
            };
          });
      } catch (e) {
        console.log(e);
      }
    })
  );
