export const NUM_ITERATIONS = 30;
const generateRandomHexColor = () =>
  Array.from(
    { length: 6 },
    () => "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16)),
  ).join("");
export const generateInterations = () =>
  new Array(NUM_ITERATIONS).fill(null).map(generateRandomHexColor);
