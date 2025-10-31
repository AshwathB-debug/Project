import React, { useState, useEffect } from "react";
import { getBotResponse, appendMessage } from "./chatbotUI";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    setMessages([{ sender: "bot", text: "Hi I'm Kolabot, a chatbot here to answer your questions! 😊" }]);
  }, []);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages((prev) => appendMessage(prev, "user", input));
    const userMessage = input;
    setInput("");
    const reply = await getBotResponse(userMessage);
    setMessages((prev) => appendMessage(prev, "bot", reply));
  };

  return (
    <div style={{ position: 'fixed', zIndex: 9999 }}>
      {/* Chatbot Icon */}
      <div
        onClick={toggleChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          backgroundColor: '#7a63d9',
          color: 'white',
          fontSize: '30px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
          cursor: 'pointer',
          transition: 'transform 0.2s, background-color 0.2s',
          zIndex: 9999,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        💬
      </div>

      {/* Chatbot Container */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '450px',
            maxWidth: 'calc(100vw - 40px)',
            height: '650px',
            maxHeight: 'calc(100vh - 150px)',
            backgroundColor: '#f7eded',
            borderRadius: '15px',
            boxShadow: '0 0 20px rgba(0, 0, 0, 0.6)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            zIndex: 9999,
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#7a63d9',
              color: 'white',
              padding: '15px',
              borderTopLeftRadius: '15px',
              borderTopRightRadius: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '18px',
            }}
          >
            <span>Kolabot</span>
            <button
              onClick={toggleChat}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '0',
                lineHeight: '1',
              }}
            >
              ×
            </button>
          </div>

          {/* Messages Body */}
          <div
            style={{
              flex: 1,
              padding: '15px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  maxWidth: '85%',
                  backgroundColor: 'rgb(243, 226, 226)',
                  color: 'black',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Container */}
          <div
            style={{
              display: 'flex',
              padding: '15px',
              gap: '8px',
              backgroundColor: '#f7eded',
              borderTop: '1px solid #ddd',
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask me a question"
              style={{
                flex: 1,
                padding: '12px',
                fontSize: '16px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                backgroundColor: 'white',
                color: 'black',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSend}
              style={{
                width: '50px',
                height: '50px',
                padding: '0',
                borderRadius: '50%',
                backgroundColor: '#7a63d9',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontSize: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ⬆
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;