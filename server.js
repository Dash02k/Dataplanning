const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

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

app.post("/api/demo-pin", (req, res) => {
  const { number, pin } = req.body;

  if (number !== "0770000000" || pin !== "1234") {
    return res.status(401).json({
      success: false,
      message: "Use os dados de teste mostrados na página."
    });
  }

  res.json({ success: true });
});

app.post("/api/demo-otp", (req, res) => {
  if (req.body.otp !== "123456") {
    return res.status(401).json({
      success: false,
      message: "OTP de teste incorreto."
    });
  }

  res.json({
    success: true,
    message: "Demonstração concluída com sucesso!"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
