import { createOpenRouter } from '@openrouter/ai-sdk-provider';

export const openRouter = createOpenRouter({
  apiKey: process.env.OPEN_ROUTER_API_KEY || '',
  headers: {
    "HTTP-Referer": "may-ai",
    "X-Title": "may-ai",
  }
});

export const DEFAULT_MODEL = process.env.DEFAULT_LLM_MODEL || ""
