import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/check", async (req, res) => {
  const { italian, user } = req.body;

  const prompt = `
You are an English coach.

Italian: "${italian}"
User: "${user}"

Correct the sentence and explain briefly.

Format:
Correct: ...
Explanation: ...
Better: ...
`;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt
      })
    });

    const data = await response.json();
    const text = data.output[0].content[0].text;

    res.json({ result: text });

  } catch (err) {
    res.json({ error: "Error" });
  }
});

app.listen(3000, () => console.log("Running"));
