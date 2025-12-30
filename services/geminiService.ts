
import { GoogleGenAI, Type } from "@google/genai";
import type { Prediction } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const predictionSchema = {
    type: Type.OBJECT,
    properties: {
        predictions: {
            type: Type.ARRAY,
            description: "A list of three strategic moves or predictions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    title: {
                        type: Type.STRING,
                        description: "A short, catchy title for the strategic move."
                    },
                    description: {
                        type: Type.STRING,
                        description: "A detailed explanation of the move, its rationale, and how to implement it."
                    }
                },
                required: ["title", "description"]
            }
        }
    },
    required: ["predictions"]
};

export async function getFuturePredictions(industry: string): Promise<Prediction[]> {
  const prompt = `
    Act as a world-class Future Trend Forecaster. Your expertise is in identifying nascent trends and predicting market shifts.
    
    Analyze the trajectory of the following industry, platform, or niche: "${industry}".
    
    Based on current data, technological advancements, consumer behavior shifts, and socio-economic factors, identify the 3 most critical and actionable moves someone can make *now* to be significantly ahead of the curve when the mainstream catches on.
    
    For each move, provide a clear title and a detailed description. The description should explain the 'why' behind the prediction and the 'how' for taking action.
    
    Generate exactly 3 predictions.
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-pro",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: predictionSchema,
        temperature: 0.8,
        topP: 0.9,
      },
    });

    const jsonString = response.text.trim();
    const parsedResponse = JSON.parse(jsonString);
    
    if (parsedResponse && Array.isArray(parsedResponse.predictions) && parsedResponse.predictions.length > 0) {
        return parsedResponse.predictions as Prediction[];
    } else {
        throw new Error("Invalid response format from API");
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to fetch predictions from Gemini API.");
  }
}
