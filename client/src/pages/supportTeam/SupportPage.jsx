// src/components/ChatPage.js
import { useEffect, useState } from "react";

const SupportPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const mockMessages = [
    {
      username: "John Doe",
      content: "I need help with my account",
      timestamp: "2024-08-18T12:34:56Z",
    },
    {
      username: "Jane Smith",
      content: "I have a problem with the payment",
      timestamp: "2024-08-19T14:22:10Z",
    },
    {
      username: "Support",
      content: "How can I assist you?",
      timestamp: "2024-08-19T15:00:00Z",
    },
  ];

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    // Send new message to the backend (replace with your API endpoint)
    const message = {
      username: "Support", // Replace with actual user or support name
      content: newMessage,
      timestamp: new Date().toISOString(),
    };

    fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    })
      .then((response) => response.json())
      .then((data) => {
        setMessages([...messages, data]);
        setNewMessage("");
      })
      .catch((error) => console.error("Error sending message:", error));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Support Chat</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {messages.map((message, index) => (
              <li key={index} className="p-4">
                <div className="font-bold text-lg">{message.username}</div>
                <div className="text-gray-600">{message.content}</div>
                <div className="text-sm text-gray-400">
                  {new Date(message.timestamp).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-4 bg-white shadow-lg">
        <div className="flex">
          <input
            type="text"
            className="flex-grow p-2 border border-gray-300 rounded-lg mr-2"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-lg"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
