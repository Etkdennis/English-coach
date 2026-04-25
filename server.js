const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// ROUTE HOME
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ROUTE AI (semplice logica intelligente)
app.post("/check", (req, res) => {
  const user = req.body.text.toLowerCase().trim();

  const correct = "i ate yesterday";

  if (user === correct) {
    return res.json({ result: "✅ Perfetto!" });
  }

  // piccoli errori accettati
  if (user.includes("i") && user.includes("yesterday")) {
    return res.json({
      result: "🟡 Quasi! Forma corretta: 'I ate yesterday'"
    });
  }

  return res.json({
    result: "❌ Sbagliato. Traduzione corretta: 'I ate yesterday'"
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
