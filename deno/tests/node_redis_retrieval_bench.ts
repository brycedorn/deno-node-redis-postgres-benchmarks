import { generateInterations } from "../utils.ts";

const iterations = generateInterations();
let n = 0;

Deno.bench("Deno -> Node -> Redis", async () => {
  if (n < iterations.length) {
    console.log("Fetching", n, "from redis via node...");

    const response = await fetch(
      `http://localhost:3000/search/${iterations[n]}`,
    );
    const cachedResult = await response.json();

    console.log("Retrieved", n, "value from redis:", cachedResult);
  }

  n += 1;
});
