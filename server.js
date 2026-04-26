const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.json());

// 🔥 CONEXÃO COM BANCO (Railway usa variável DATABASE_URL)
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// ✅ TESTE API
app.get("/", (req, res) => {
  res.send("API COM BANCO 🚀");
});

// ✅ TESTE BANCO
app.get("/teste-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro no banco" });
  }
});

// ✅ LISTAR PRODUTOS
app.get("/produtos", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM produtos");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar produtos" });
  }
});

// ✅ CRIAR PRODUTO
app.post("/produtos", async (req, res) => {
  const { nome, categoria, preco_loja } = req.body;

  try {
    await pool.query(
      "INSERT INTO produtos (nome, categoria, preco_loja) VALUES ($1, $2, $3)",
      [nome, categoria, preco_loja]
    );

    res.send("Produto criado");
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar produto" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Rodando na porta", PORT);
});
