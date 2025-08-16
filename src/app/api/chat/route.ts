import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextResponse } from 'next/server';

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      throw new Error('Invalid or missing "messages" array in request body');
    }

    const result = await streamText({
      model: openai('gpt-4o-mini'), // Use a smaller model for testing/cost if desired
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error: any) {
    console.error('API Route Error:', {
      status: error.status || 500,
      message: error.message,
      body: error.body ? await error.body?.text() : 'No body',
    });
    return NextResponse.json(
      { error: 'Failed to process chat request', details: error.message },
      { status: 500 }
    );
  }
}