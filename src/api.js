export const getQuotes = stockListArr =>
  Promise.all(
    stockListArr.map(async stock => {
      try {
        return await fetch(`/.netlify/functions/getQuote/${stock}`)
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
