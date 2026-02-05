
import { GoogleGenAI, Type } from "@google/genai";
import { AuditReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const getAuditAnalysis = async (commodityName: string, paperPrice: number, ratio: number): Promise<AuditReport> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Conduct a first-principles audit for the ${commodityName} paper market. 
    Context: Paper Price is $${paperPrice}, Paper-to-Physical Ratio is ${ratio}:1.
    Analyze rehypothecation, over-leveraging, and potential manipulation.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          timestamp: { type: Type.STRING },
          commodity: { type: Type.STRING },
          summary: { type: Type.STRING },
          metrics: {
            type: Type.OBJECT,
            properties: {
              paperToPhysicalRatio: { type: Type.NUMBER },
              rehypothecationIndex: { type: Type.NUMBER },
              anomalyDetected: { type: Type.BOOLEAN },
              manipulationRisk: { type: Type.STRING },
            },
            required: ["paperToPhysicalRatio", "rehypothecationIndex", "anomalyDetected", "manipulationRisk"]
          },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["timestamp", "commodity", "summary", "metrics", "recommendations"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

export const chatWithCOPACO = async (message: string, history: { role: string; text: string }[]) => {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: "You are COPACO, an elite AI Agent specialized in researching, calculating, and monitoring Commodity Paper contracts. You understand the profound divergence between paper derivatives (futures, options, swaps) and physical assets. You use first-principles logic to uncover market manipulation, rehypothecation, and extreme leverage. Always be professional, data-driven, and refer to major exchanges like CME, LME, and LBMA. Mention your monetization via voluntary donations to Foster Ming."
    }
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};

export const researchMarketTrends = async (commodity: string) => {
    const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `What are the current trending indicators for ${commodity} physical supply versus paper open interest? Focus on COMEX/LBMA recent reports.`,
        config: {
            tools: [{ googleSearch: {} }]
        }
    });
    return {
        text: response.text,
        sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
};
