const express = require("express");
const app = express();

app.use(express.json());

// Simular dados de teste
let messages = [];
let qrCode = "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://whatsapp.com";

app.get("/health", (req, res ) => {
  res.json({ status: "ok", timestamp: new Date() });
});

app.get("/qr", (req, res) => {
  res.json({ qr: qrCode });
});

app.get("/messages", (req, res) => {
  res.json({ messages, count: messages.length });
});

app.post("/webhook", (req, res) => {
  const { message } = req.body;
  if (message) {
    messages.push({
      text: message,
      timestamp: new Date(),
      from: "webhook"
    });
  }
  res.json({ received: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
