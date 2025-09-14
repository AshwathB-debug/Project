declare module "*.js" {
  export function appendMessage(
    messages: { sender: string; text: string }[],
    sender: "user" | "bot",
    message: string
  ): { sender: string; text: string }[];

  export function getBotResponse(userMessage: string): Promise<string>;
}