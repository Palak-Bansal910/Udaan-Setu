export interface UserProfile {
  email: string;
  skills: string;
  experience: string;
  interests: string;
  industry: string;
  location: string;
  budget: string;
}

export interface StartupIdea {
  id?: number;
  name: string;
  problem: string;
  target_users: string;
  solution: string;
  revenue_model: string;
  market_opportunity: string;
  competitors: string;
  score: number;
}

export interface BusinessPlan {
  executiveSummary: string;
  problem: string;
  solution: string;
  productDescription: string;
  businessModel: string;
  marketSize: string;
  goToMarket: string;
  revenueForecast: string;
  costEstimate: string;
  growthStrategy: string;
}

export interface MVPRoadmap {
  features: string[];
  roadmap: { phase: string; tasks: string[] }[];
  techStack: string[];
  timeline: string;
  costEstimate: string;
}

export interface PitchDeckSlide {
  title: string;
  content: string[];
  visualPrompt?: string;
}
