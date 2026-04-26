const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("API FUNCIONANDO SEM BANCO 🚀");
});

app.get("/teste", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Rodando na porta", PORT));