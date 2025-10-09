import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { title, description } = await req.json();
    const prompt = description && description.trim().length > 0
      ? `Improve or expand the following activity description for a travel itinerary:\n\n${description}`
      : `Write a detailed, engaging description for a travel activity titled "${title}".`;

    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicApiKey) {
      return NextResponse.json({ error: 'Anthropic API key not set' }, { status: 500 });
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': anthropicApiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307', // least expensive model
        max_tokens: 256,
        messages: [
          { role: 'user', content: prompt }
        ]
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return NextResponse.json({ error }, { status: 500 });
    }

    const data = await response.json();
    const aiDescription = data?.content?.[0]?.text || 'No description generated.';

    return NextResponse.json({ description: aiDescription });
  } catch {
    return NextResponse.json({ error: 'Failed to generate description' }, { status: 500 });
  }
}