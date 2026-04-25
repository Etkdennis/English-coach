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
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `You are an English teacher.
Correct this sentence:

"${user}"

Explain:
1. If it's correct
2. If wrong, why
3. Give correct sentence

Keep it simple.`
      })
    });

    const data = await response.json();

    const result = data.output[0].content[0].text;

    res.json({ result });

  } catch (err) {
    console.log(err);
    res.json({
      result: "Errore AI 😅"
    });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
