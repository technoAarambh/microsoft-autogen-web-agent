import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { ChatVertexAI } from "langchain/chat_models/vertexai";
import { HumanMessage } from "langchain/schema/messages";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const model = new ChatVertexAI({
  model: "gemini-pro", // You can change to "chat-bison" too
  temperature: 0.7,
  maxOutputTokens: 2048,
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await model.call([new HumanMessage(prompt)]);

    res.json({ output: response.text });
  } catch (err) {
    console.error("Error generating response:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});
