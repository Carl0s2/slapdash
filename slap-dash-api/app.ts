const express = require("express");
import { getCharacters } from "./services/question";

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT} `);
});

app.get("/status", (req, res) => {
  res.json({ status: "OK" });
});
app.get("/characters", (req, res) => {
  const characters = getCharacters();
  res.json({ characters });
});
