export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY missing' });
  }

  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();

    // Log the raw Google response in Vercel logs for troubleshooting
    if (!response.ok) {
      console.error('Gemini API Error:', JSON.stringify(data));
      return res.status(response.status).json({ error: data.error?.message || 'Gemini error' });
    }

    // Correct nested path extraction for Google Gemini REST API
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!generatedText) {
      console.error('No text in candidates:', JSON.stringify(data));
      return res.status(500).json({ error: 'Model returned no text', raw: data });
    }

    return res.status(200).json({ text: generatedText });
  } catch (err) {
    console.error('Server Handler Crash:', err);
    return res.status(500).json({ error: err.message });
  }
}
