const express = require("express");
const app = express();

app.use(express.json());

// Dados simulados
let messages = [];

app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/qr", (req, res) => {
  res.json({ 
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=whatsapp://send?phone=5592993262142",
    status: "QR Code disponível"
  } );
});

app.get("/messages", (req, res) => {
  res.json({ messages, count: messages.length });
});

app.post("/webhook", (req, res) => {
  const { message, from } = req.body;
  if (message) {
    messages.push({
      text: message,
      from: from || "webhook",
      timestamp: new Date().toISOString()
    });
  }
  res.json({ received: true, messageCount: messages.length });
});

app.get("/", (req, res) => {
  res.json({ 
    message: "WhatsApp Assistant API",
    endpoints: {
      health: "/health",
      qr: "/qr",
      messages: "/messages",
      webhook: "POST /webhook"
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
