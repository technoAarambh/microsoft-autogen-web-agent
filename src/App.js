import React, { useState } from "react";

function App() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 I'm your AI Web Designer. What kind of website do you want me to create?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);

    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: input }),
    });

    const data = await res.json();
    setMessages([...newMessages, { sender: "bot", text: data.botReply }]);
    setInput("");
  };

  const downloadWebsite = async () => {
    const link = document.createElement("a");
    link.href = "http://localhost:5000/download";
    link.setAttribute("download", "website.html");
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 600,
        margin: "2rem auto",
        padding: "1.5rem",
        borderRadius: "12px",
        background: "#0a0a0aff",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#fff" }}>
        💬 Website Builder AI Bot
      </h2>

      <div
        style={{
          height: "400px",
          overflowY: "auto",
          border: "1px solid #ddd",
          padding: "1rem",
          borderRadius: "8px",
          background: "#100f0fff",
        }}
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "0.5rem 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                background: msg.sender === "user" ? "#DCF8C6" : "#EAEAEA",
                padding: "8px 12px",
                borderRadius: "12px",
                maxWidth: "80%",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={sendMessage}
          style={{ padding: "10px 16px", borderRadius: "8px" }}
        >
          Send
        </button>
      </div>

      <button
        onClick={downloadWebsite}
        style={{
          marginTop: "1rem",
          width: "100%",
          background: "#0078d4",
          color: "#fff",
          padding: "10px",
          border: "none",
          borderRadius: "8px",
        }}
      >
        ⬇️ Download Generated Website
      </button>
    </div>
  );
}

export default App;
