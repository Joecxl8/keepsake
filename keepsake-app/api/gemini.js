export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY missing in Vercel environment variables' });
  }

  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string' || prompt.length > 2000) {
    return res.status(400).json({ error: 'Prompt is required and must be under 2000 characters' });
  }

  // FIX: Use correct Gemini model name
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

  async function callGemini(attempt = 1) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 512
        }
      })
    });

    // Retry on 503 or 429, up to 2 attempts
    if ((response.status === 503 || response.status === 429) && attempt < 2) {
      await new Promise(resolve => setTimeout(resolve, 1500 * attempt));
      return callGemini(attempt + 1);
    }

    return response;
  }

  try {
    const response = await callGemini();
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'Google service temporarily unavailable',
        code: response.status
      });
    }

    const outputText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!outputText) {
      return res.status(500).json({ error: 'Empty output from model' });
    }

    return res.status(200).json({ text: outputText });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
