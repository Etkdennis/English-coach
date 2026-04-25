const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// ROUTE AI
app.post("/check", async (req, res) => {
  const sentence = req.body.text;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.OPENAI_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are an English teacher. Correct the sentence and explain briefly."
          },
          {
            role: "user",
            content: sentence
          }
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    res.json({ result: reply });

  } catch (error) {
    res.status(500).json({ error: "Error processing request" });
  }
});

// HOME
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
