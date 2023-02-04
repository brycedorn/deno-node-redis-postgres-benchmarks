import { createClient } from "supabase";
import { generateInterations } from "../utils.ts";

const iterations = generateInterations();
let n = 0;

Deno.bench("Deno -> Postgres", async () => {
  if (n < iterations.length) {
    // console.log("Connecting", n, "to postgres...");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") as string,
      Deno.env.get("SUPABASE_PUBLIC_API_KEY") as string,
    );

    await supabase
      .from("colors")
      .select()
      .eq("hex", iterations[n]);

    // console.log("Retrieved", n, "value from postgres:", colors);
  }

  n += 1;
});
