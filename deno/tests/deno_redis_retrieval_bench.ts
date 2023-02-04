import { connect } from "redis";
import { generateInterations } from "../utils.ts";

const iterations = generateInterations();
let n = 0;

Deno.bench("Deno -> Redis", async () => {
  if (n < iterations.length) {
    // console.log("Connecting", n, "to redis...");

    const redis = await connect({
      hostname: Deno.env.get("REDIS_URL") as string,
      port: Deno.env.get("REDIS_PORT") as string,
      password: Deno.env.get("REDIS_PASSWORD") as string,
    });

    // console.log("Connected", n, "to redis! Fetching value...");

    await redis.get(iterations[n]);

    // console.log("Retrieved", n, "value from redis:", cachedResult);
  }

  n += 1;
});
