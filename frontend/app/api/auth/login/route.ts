import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Call backend login endpoint
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    });

    const { token, user } = response.data;

    // Create response with user data
    const nextResponse = NextResponse.json(
      { user },
      { status: 200 }
    );

    // Set httpOnly cookie with JWT token
    nextResponse.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });

    return nextResponse;
  } catch (error: any) {
    return NextResponse.json(
      { error: error.response?.data?.message || 'Login failed' },
      { status: error.response?.status || 500 }
    );
  }
}

