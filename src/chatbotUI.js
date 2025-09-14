// src/chatbotUI.js

/**
 * Append a new message to the chat.
 * @param {Array} messages - Current array of messages.
 * @param {"user" | "bot"} sender - Who sent the message.
 * @param {string} message - The message text.
 * @returns {Array} Updated messages array.
 */
export function appendMessage(messages, sender, message) {
  return [...messages, { sender, text: message }];
}

/**
 * Fetch a response from your backend (Gemini / RAG / etc.)
 * @param {string} userMessage - Message to send to the backend.
 * @returns {Promise<string>} The bot's reply text.
 */
export async function getBotResponse(userMessage) {
  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }

    const data = await res.json();
    return data.reply ?? "I couldn't understand that.";
  } catch (error) {
    return `Something went wrong: ${error.message}`;
  }
}
