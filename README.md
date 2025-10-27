# 🧠 Microsoft AutoGen AI Website Generator

### React + Node.js + Azure OpenAI | AI Agent That Builds Static Websites

---

## 📘 Overview

This project demonstrates how to use **Microsoft AutoGen** with **Azure OpenAI Service** to build an AI Agent that can generate **HTML and CSS code** based on user prompts.  
The app uses a **React frontend** and a **Node.js backend**, powered by **Azure OpenAI GPT models**.

You can also chat with the AI Bot — it interacts naturally and creates fully functional static webpages that you can download and view instantly.

---

## ⚡ Features

- 🤖 Build an AI Agent using **Microsoft AutoGen**
- 💬 Chatbot interface to generate HTML + CSS code
- 💻 Backend integration with **Azure OpenAI API**
- ⚙️ Node.js + Express setup for API and file generation
- 🌐 React frontend for chat interaction
- 🧱 Auto file generation (`generated.html`) for every response
- 🔒 Secure Azure API Key setup using `.env`
- 💰 Uses **Free Tier** of Azure OpenAI (Pay-As-You-Go friendly)

---

## 🏗️ Architecture Flow

```mermaid
graph TD
A[React Frontend] -->|Sends prompt| B[Node.js Backend]
B -->|API Request| C[Azure OpenAI / Microsoft AutoGen]
C -->|Response (HTML/CSS code)| B
B -->|Save file| D[Generated HTML File]
A -->|Displays bot reply + Download link| B
```
