import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs";
import path from "path";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const endpoint = "AZURE_OPENAI_ENDPOINT";
const apiKey = "AZURE_OPENAI_API_KEY";
const deployment = "AZURE_OPENAI_DEPLOYMENT";
const apiVersion = "AZURE_OPENAI_API_VERSION";

const __dirname = path.resolve();

// Keep simple conversation memory
let chatHistory = [
  {
    role: "system",
    content:
      "You are a helpful web design bot that creates simple static websites (HTML & CSS).",
  },
];

// 🟢 POST /chat — handle user message
app.post("/chat", async (req, res) => {
  const { userMessage } = req.body;
  chatHistory.push({ role: "user", content: userMessage });

  try {
    const response = await axios.post(
      `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`,
      {
        messages: chatHistory,
        max_tokens: 1500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      }
    );

    const botReply = response.data.choices[0].message.content;
    chatHistory.push({ role: "assistant", content: botReply });

    // 🔧 Ensure output folder exists
    const outputDir = path.join(__dirname, "output");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // 💾 Save HTML file if AI generated HTML
    if (botReply.includes("<html")) {
      const filePath = path.join(outputDir, "generated.html");
      fs.writeFileSync(filePath, botReply, "utf-8");
      console.log(`✅ HTML file saved at: ${filePath}`);
    }

    res.json({ botReply });
  } catch (error) {
    console.error("Error in /chat:", error.message);
    res.status(500).json({ error: "Error generating response." });
  }
});

// 🟢 GET /download — serve generated file
app.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "output", "generated.html");
  if (fs.existsSync(filePath)) {
    res.download(filePath, "website.html");
  } else {
    res.status(404).json({ error: "No file found." });
  }
});

app.listen(5000, () =>
  console.log("🤖 Server running at http://localhost:5000")
);
