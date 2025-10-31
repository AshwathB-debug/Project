export function appendMessage(
  messages: Array<{ sender: string; text: string }>,
  sender: "user" | "bot",
  message: string
) {
  return [...messages, { sender, text: message }];
}

export async function getBotResponse(userMessage: string): Promise<string> {
  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: userMessage }),
    });

    if (!res.ok) throw new Error(`Server responded with ${res.status}`);

    const data = await res.json();
    return data.reply ?? "I couldn't understand that.";
  } catch (error: any) {
    return `Something went wrong: ${error.message}`;
  }
}
