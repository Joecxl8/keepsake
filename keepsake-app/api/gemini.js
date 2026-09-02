export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY missing in Vercel environment variables' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`;

  // Helper to attempt API call
  async function callGemini() {
    return await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });
  }

  try {
    let response = await callGemini();

    // If Google returns 503 (High Demand) or 429, wait 1.2s and retry once
    if (response.status === 503 || response.status === 429) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      response = await callGemini();
    }

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data.error?.message || 'Google service temporarily unavailable',
        details: data
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
