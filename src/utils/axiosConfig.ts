export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
if (!OPENAI_API_KEY) {
  throw new Error("Missing OPENAI_API_KEY in environment variables");
}
export const OPENAI_API_URL = process.env.API_URL;
export const AUTH_HEADER = { Authorization: `Bearer ${OPENAI_API_KEY}` };
export const ASSISTANT_ID =  process.env.ASSISTANT_ID; 