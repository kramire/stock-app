import fetch from "node-fetch";
const { API_URL, API_TOKEN } = process.env;

exports.handler = async (event, context) => {
  const symbol = event.path.match(/([^\/]*)\/*$/)[0];
  return fetch(`${API_URL}/quote?symbol=${symbol}&token=${API_TOKEN}`)
    .then(async res => {
      const contentType = res.headers.get("content-type");
      if (contentType.includes("application/json")) {
        return res.json();
      } else {
        const text = await res.text();
        throw new Error(text);
      }
    })
    .then(data => ({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify(data)
    }))
    .catch(e => ({
      statusCode: 404,
      body: JSON.stringify({ error: e.message })
    }));
};
