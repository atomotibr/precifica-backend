const express = require("express");

const app = express();

// 👇 ESSA LINHA É ESSENCIAL
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API FUNCIONANDO 🚀");
});

app.get("/teste", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Rodando na porta", PORT);
});
