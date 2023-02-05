const express = require("express");
const redis = require("redis");

const { REDIS_URL, REDIS_PORT, REDIS_PASSWORD, REDIS_USER } = process.env;

const client = redis.createClient({
  url: `redis://${REDIS_USER}:${REDIS_PASSWORD}@${REDIS_URL}:${REDIS_PORT}/`,
});

const app = express();
const port = process.env.PORT || 3000;

async function search(req, res) {
  const { hex } = req.params;

  try {
    const cachedResult = await client.get(hex);
    let result = null;

    if (cachedResult) {
      result = JSON.parse(cachedResult);
    }

    res.send({ data: result });
  } catch (error) {
    console.log(error);
  }
}

app.get("/search/:hex", search);

app.listen(port, async () => {
  await client.connect();

  console.log(`App listening on port ${port}`);
});
