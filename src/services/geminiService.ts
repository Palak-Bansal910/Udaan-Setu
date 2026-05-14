import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, StartupIdea, BusinessPlan, MVPRoadmap, PitchDeckSlide } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const generateStartupIdeas = async (profile: UserProfile): Promise<StartupIdea[]> => {
  const prompt = `Based on the following user profile, generate 3-5 innovative startup ideas.
  Skills: ${profile.skills}
  Experience: ${profile.experience}
  Interests: ${profile.interests}
  Industry Preference: ${profile.industry}
  Location: ${profile.location}
  Budget: ${profile.budget}
  
  Rank them by potential and provide a score from 1-100.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING },
            problem: { type: Type.STRING },
            target_users: { type: Type.STRING },
            solution: { type: Type.STRING },
            revenue_model: { type: Type.STRING },
            market_opportunity: { type: Type.STRING },
            competitors: { type: Type.STRING },
            score: { type: Type.NUMBER },
          },
          required: ["name", "problem", "target_users", "solution", "revenue_model", "market_opportunity", "competitors", "score"],
        },
      },
    },
  });

  return JSON.parse(response.text || "[]");
};

export const generateBusinessPlan = async (idea: StartupIdea): Promise<BusinessPlan> => {
  const prompt = `Generate a comprehensive business plan for the following startup idea:
  Name: ${idea.name}
  Problem: ${idea.problem}
  Solution: ${idea.solution}
  Target Users: ${idea.target_users}
  Revenue Model: ${idea.revenue_model}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          executiveSummary: { type: Type.STRING },
          problem: { type: Type.STRING },
          solution: { type: Type.STRING },
          productDescription: { type: Type.STRING },
          businessModel: { type: Type.STRING },
          marketSize: { type: Type.STRING },
          goToMarket: { type: Type.STRING },
          revenueForecast: { type: Type.STRING },
          costEstimate: { type: Type.STRING },
          growthStrategy: { type: Type.STRING },
        },
        required: ["executiveSummary", "problem", "solution", "productDescription", "businessModel", "marketSize", "goToMarket", "revenueForecast", "costEstimate", "growthStrategy"],
      },
    },
  });

  return JSON.parse(response.text || "{}");
};

export const generateMVPRoadmap = async (idea: StartupIdea): Promise<MVPRoadmap> => {
  const prompt = `Generate an MVP roadmap and tech stack for: ${idea.name}. 
  Description: ${idea.solution}`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          features: { type: Type.ARRAY, items: { type: Type.STRING } },
          roadmap: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT,
              properties: {
                phase: { type: Type.STRING },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
              }
            } 
          },
          techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
          timeline: { type: Type.STRING },
          costEstimate: { type: Type.STRING },
        },
      },
    },
  });

  return JSON.parse(response.text || "{}");
};

export const generatePitchDeck = async (idea: StartupIdea): Promise<PitchDeckSlide[]> => {
  const prompt = `Generate a 10-slide pitch deck content for: ${idea.name}.
  Include: Title, Problem, Solution, Market Size, Product, Business Model, Competition, Go-To-Market, Financials, Ask.`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            content: { type: Type.ARRAY, items: { type: Type.STRING } },
            visualPrompt: { type: Type.STRING }
          }
        },
      },
    },
  });

  return JSON.parse(response.text || "[]");
};
