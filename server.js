require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get("/", (req, res) => {
  res.send("Precifica API rodando 🚀");
});

app.get("/teste", async (req, res) => {
  try {
    const result = await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: err.message });
  }
});

app.post("/produtos", async (req, res) => {
  try {
    const { nome, categoria, preco_loja } = req.body;

    await pool.query(
      "INSERT INTO produtos (nome, categoria, preco_loja) VALUES ($1, $2, $3)",
      [nome, categoria, preco_loja]
    );

    res.send("Produto criado");
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));