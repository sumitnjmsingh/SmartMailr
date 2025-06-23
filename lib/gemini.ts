import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function generateEmail(prompt: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  const result = await model.generateContent(
  `You are an expert communication assistant. Generate **only one** professional, well-structured email based on the following request.

    The email must:
    - Include a clear subject line (use the provided subject or infer one if not given),
    - Begin with a formal greeting,
    - Be concise yet complete (ideally 100-150 words),
    - Maintain a polite, professional tone,
    - End with a professional closing and sender name placeholder.

    Do not generate multiple emails or suggestions. Just return one complete email only.

    Email request: "${prompt}"`
    );

  const response = await result.response;
  return response.text();
}
