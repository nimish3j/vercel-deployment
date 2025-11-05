import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!API_URL || API_URL === 'http://localhost:3001') {
      console.error('NEXT_PUBLIC_API_URL is not set or is localhost');
      return NextResponse.json(
        { error: 'Backend API URL is not configured. Please set NEXT_PUBLIC_API_URL environment variable.' },
        { status: 500 }
      );
    }

    // Call backend login endpoint
    const response = await axios.post(`${API_URL}/auth/login`, {
      username,
      password,
    }, {
      timeout: 10000, // 10 second timeout
    });

    const { token, user } = response.data;

    if (!token) {
      return NextResponse.json(
        { error: 'No token received from backend' },
        { status: 500 }
      );
    }

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
    console.error('Login error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      apiUrl: API_URL,
    });

    // More detailed error messages
    if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
      return NextResponse.json(
        { error: `Cannot connect to backend API at ${API_URL}. Please check if the backend is running and NEXT_PUBLIC_API_URL is set correctly.` },
        { status: 503 }
      );
    }

    if (error.response?.status === 401) {
      return NextResponse.json(
        { error: error.response?.data?.message || 'Invalid username or password' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { 
        error: error.response?.data?.message || error.message || 'Login failed. Please try again.',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: error.response?.status || 500 }
    );
  }
}

