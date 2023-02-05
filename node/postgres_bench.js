const createClient = require("@supabase/supabase-js").createClient;
const express = require("express");

const { SUPABASE_URL, SUPABASE_PUBLIC_API_KEY } = process.env;

const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_API_KEY);

const app = express();
const port = process.env.PORT || 3000;

async function search(req, res) {
  const { hex } = req.params;
  let result = null;

  // console.log(`Searching for #${hex}...`);

  const { data: colors } = await supabase
    .from("colors")
    .select()
    .eq("hex", hex);

  if (colors && colors.length > 0) {
    result = colors[0];
  }

  res.send({ data: result });
}

app.get("/search/:hex", search);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
