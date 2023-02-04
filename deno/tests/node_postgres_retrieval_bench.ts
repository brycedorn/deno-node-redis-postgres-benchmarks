import { generateInterations } from "../utils.ts";

const iterations = generateInterations();
let n = 0;

Deno.bench("Deno -> Node -> Postgres", async () => {
  if (n < iterations.length) {
    // console.log('Fetching', n, 'from postgres via node...');

    const response = await fetch(
      `http://localhost:3000/search/${iterations[n]}`,
    );
    const cachedResult = await response.json();

    console.log("Retrieved", n, "value from postgres:", cachedResult);
  }

  n += 1;
});
