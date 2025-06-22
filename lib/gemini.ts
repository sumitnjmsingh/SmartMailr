import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateEmail(prompt: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const result = await model.generateContent(
    `Write a professional email based on the following request:\n${prompt}`
  );

  const response = await result.response;
  return response.text();
}
