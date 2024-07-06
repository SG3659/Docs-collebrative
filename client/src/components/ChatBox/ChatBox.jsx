import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Message from "./Message";
import "./chatbox.css";
const socket = io("http://localhost:8000");
export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = () => {
    socket.emit("sendMessage", { text: messageText });
    setMessageText(" ");
  };
  return (
    <div className="App">
      <h1>Real-Time Chat App</h1>
      <div className="messages">
        {messages.map((message, index) => (
          <Message
            key={index}
            username={message.username}
            text={message.text}
          />
        ))}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
