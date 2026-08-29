const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve everything inside /public
app.use(express.static(path.join(__dirname, "public")));

// Explicit homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Loan demo API
app.post("/api/loan", (req, res) => {
  const { name, phone, amount, method } = req.body;

  if (!name || !phone || !amount || !method) {
    return res.status(400).json({
      error: "Todos os campos são obrigatórios."
    });
  }

  res.json({
    success: true,
    message: "Pedido de demonstração recebido."
  });
});

// Health check
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "MZLoan backend is running"
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MZLoan running on port ${PORT}`);
});
