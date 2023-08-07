import React, { useState } from "react";
import  "./Chatbot.css"
function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const fetchResponse = async (message) => {
    try {
      const response = await fetch("http://localhost:8000/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.log(error);
      return "Error";
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const userMessage = { text: userInput, sender: "user" };
    const botResponse = await fetchResponse(userInput);
    const botMessage = { text: botResponse, sender: "chatbot" };

    setMessages([...messages, userMessage, botMessage]);
    setUserInput("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Chatbot</h1>
      </header>
      <main>
        <div className="chat-container">
          {messages.map((message, index) => (
            <div key={index} className={message.sender}>
              <p>{message.sender === "user" ? "You:" : "Bot:"} {message.text}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Type your message here..."
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
            required
          />
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
}

export default Chatbot;
