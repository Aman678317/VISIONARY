import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || (import.meta as any).env.VITE_GEMINI_API_KEY || ''
});

export async function chatWithConcierge(messages: { role: 'user' | 'model', parts: { text: string }[] }[], context: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          role: 'user',
          parts: [{ text: `System Instruction: You are the Dubai Mall Platinum Concierge. Your tone is ultra-premium, professional, and helpful. You are assisting potential high-value business partners, luxury retailers, and global event organizers. 
          Use the following context about the Dubai Mall Sales Platform to answer:
          ${context}` }]
        },
        ...messages
      ],
      config: {
        temperature: 0.7,
        topP: 0.95,
      }
    });

    return response.text || "I am at your service. How may I assist you further with your vision for Dubai Mall?";
  } catch (error) {
    console.error("AI Chat Error:", error);
    return "I apologize, but our connection is momentarily interrupted. Please allow me a moment to reconnect.";
  }
}
