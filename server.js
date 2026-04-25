const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// HOME
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// AI ROUTE
app.post("/check", async (req, res) => {
  const user = req.body.text;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content: "You are an English teacher. Be concise."
          },
          {
            role: "user",
            content: `Correct this sentence: "${user}". Explain briefly and give correct version.`
          }
        ]
      })
    });

    const data = await response.json();

    res.json({
      result: data.choices[0].message.content
    });

  } catch (err) {
    res.json({
      result: "Errore AI 😅"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
