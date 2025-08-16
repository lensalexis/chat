import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET() {
  const payload = {
    user_id: '123', // Replace with your logged-in user ID
    email: 'user@example.com', // optional
  };

  const token = jwt.sign(payload, process.env.INTERCOM_UNIFIED_SECRET!, {
    algorithm: 'HS256',
    expiresIn: '1d', // match session_duration if needed
  });

  return NextResponse.json({ token });
}