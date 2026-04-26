require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());

/* ===============================
   🔌 CONEXÃO COM BANCO (SUPABASE)
================================= */
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/* ===============================
   🧪 TESTE API
================================= */
app.get("/", (req, res) => {
  res.send("API FUNCIONANDO 🚀");
});

/* ===============================
   🧪 TESTE BANCO
================================= */
app.get("/teste-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error("Erro no banco:", err);
    res.status(500).json({ erro: "Erro no banco" });
  }
});

/* ===============================
   📦 LISTAR PRODUTOS
================================= */
app.get("/produtos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM produtos");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

/* ===============================
   ➕ CRIAR PRODUTO
================================= */
app.post("/produtos", async (req, res) => {
  try {
    const { nome, categoria, preco_loja } = req.body;

    await pool.query(
      "INSERT INTO produtos (nome, categoria, preco_loja) VALUES ($1, $2, $3)",
      [nome, categoria, preco_loja]
    );

    res.json({ mensagem: "Produto criado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar produto" });
  }
});

/* ===============================
   🚀 START SERVIDOR
================================= */
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Rodando na porta", PORT);
});
