import { getGeminiClient } from '../config/gemini.js';

// Allowed Gemini models to prevent parameter tampering
const ALLOWED_MODELS = ['gemini-3.6-flash', 'gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-3.1-pro-preview'];

/**
 * Controller to generate content using Gemini API
 */
export async function generateContent(req, res) {
  const { prompt, model } = req.body || {};

  // 1. Validate Prompt
  if (!prompt || typeof prompt !== 'string') {
    return res.status(400).json({ error: 'Validation Error: Prompt must be a non-empty text string.' });
  }

  const cleanPrompt = prompt.trim();

  if (cleanPrompt.length === 0) {
    return res.status(400).json({ error: 'Validation Error: Prompt cannot be blank.' });
  }

  if (cleanPrompt.length > 5000) {
    return res.status(400).json({ error: 'Validation Error: Prompt is too long (maximum 5,000 characters).' });
  }

  // 2. Validate & Whitelist Gemini Model Choice
  const modelName = model && ALLOWED_MODELS.includes(model) ? model : 'gemini-3.6-flash';

  try {
    const ai = getGeminiClient();

    console.log(`✨ Generating AI content using model: ${modelName}`);

    const response = await ai.models.generateContent({
      model: modelName,
      contents: cleanPrompt,
    });

    return res.json({
      success: true,
      text: response.text,
    });
  } catch (error) {
    console.error('❌ Gemini API Error:', error);
    // Safe error response without exposing raw API key errors
    return res.status(500).json({
      error: 'Unable to process AI generation request at this time. Please try again later.',
    });
  }
}

export default { generateContent };

