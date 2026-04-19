import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || (import.meta as any).env.VITE_GEMINI_API_KEY || ''
});

export async function searchWebsite(query: string, context: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a sophisticated digital concierge for Dubai Mall. 
      Use the following website content context to answer the user's question about the mall or the sales platform.
      If the information isn't in the context, use your general knowledge about Dubai Mall but stay within the theme of a luxury sales presentation.
      
      Website Context:
      ${context}
      
      User Question: "${query}"
      
      Response (keep it cinematic, helpful, and luxury-focused):`,
    });

    return response.text || "I am currently unable to process your request. Please try again shortly.";
  } catch (error) {
    console.error("AI Search Error:", error);
    return "Our digital concierge is currently recalibrating. Please try again.";
  }
}
