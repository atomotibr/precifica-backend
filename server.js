require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get("/", (req, res) => {
  res.send("Precifica API rodando 🚀");
});

app.get("/produtos", async (req, res) => {
  const result = await pool.query("SELECT * FROM produtos");
  res.json(result.rows);
});

app.post("/produtos", async (req, res) => {
  const { nome, categoria, preco_loja } = req.body;

  await pool.query(
    "INSERT INTO produtos(nome, categoria, preco_loja) VALUES($1,$2,$3)",
    [nome, categoria, preco_loja]
  );

  res.send("Produto criado");
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
