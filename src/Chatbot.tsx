// import React, { useState, useEffect } from "react";
// import "./style.css";
// import { getBotResponse, appendMessage } from "./chatbotUI.js";

// const Chatbot: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
//     []
//   );
//   const [input, setInput] = useState("");

//   // Fetch first bot message on mount
//   useEffect(() => {
//     (async () => {
//       const firstMessage = await getBotResponse("start");
//       setMessages([{ sender: "bot", text: firstMessage }]);
//     })();
//   }, []);

//   const toggleChat = () => setIsOpen(!isOpen);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     // Add user message
//     setMessages((prev) => appendMessage(prev, "user", input));
//     const userMessage = input;
//     setInput("");

//     // Fetch bot response
//     const reply = await getBotResponse(userMessage);
//     setMessages((prev) => appendMessage(prev, "bot", reply));
//   };

//   return (
//     <>
//       <div id="chatbot-icon" onClick={toggleChat}>
//         💬
//       </div>

//       {isOpen && (
//         <div id="chatbot-container">
//           <div id="chatbot-header">
//             <span>Kolabot</span>
//             <button id="close-btn" onClick={toggleChat}>
//               &times;
//             </button>
//           </div>

//           <div id="chatbot-body">
//             <div id="chatbot-messages">
//               {messages.map((msg, i) => (
//                 <div key={i} className={`message ${msg.sender}`}>
//                   <div className="message-text">{msg.text}</div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div id="chatbot-input-container">
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Ask me a question"
//             />
//             <button id="send-btn" onClick={handleSend}>
//               ⬆
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Chatbot;
