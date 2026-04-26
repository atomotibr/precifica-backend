require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

/* ================= TESTE ================= */
app.get("/", (req, res) => {
  res.send("API PRECIFICA OK 🚀");
});

/* ================= PRODUTOS ================= */
app.get("/produtos", async (req, res) => {
  const r = await pool.query("SELECT * FROM produtos");
  res.json(r.rows);
});

app.post("/produtos", async (req, res) => {
  const { nome, preco_venda } = req.body;
  await pool.query(
    "INSERT INTO produtos (nome, preco_venda) VALUES ($1,$2)",
    [nome, preco_venda]
  );
  res.send("ok");
});

/* ================= FICHA ================= */
app.post("/ficha", async (req, res) => {
  const { produto_id, custo_unitario, quantidade } = req.body;

  await pool.query(
    "INSERT INTO ficha_tecnica (produto_id, custo_unitario, quantidade) VALUES ($1,$2,$3)",
    [produto_id, custo_unitario, quantidade]
  );

  res.send("ok");
});

/* ================= BI ================= */
app.get("/bi", async (req, res) => {
  const result = await pool.query(`
    SELECT 
      p.nome,
      p.preco_venda,
      COALESCE(SUM(f.custo_unitario * f.quantidade),0) AS custo,
      (p.preco_venda - COALESCE(SUM(f.custo_unitario * f.quantidade),0)) AS lucro
    FROM produtos p
    LEFT JOIN ficha_tecnica f ON f.produto_id = p.id
    GROUP BY p.id
  `);

  res.json(result.rows);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () =>
  console.log("Servidor rodando na porta", PORT)
);
