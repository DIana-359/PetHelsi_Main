import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const backendResponse = await fetch(
      `${process.env.API_URL}/v1/auth/logout-cookie`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }
    )

    if (!backendResponse.ok) {
      throw new Error('Backend logout failed')
    }

    const response = NextResponse.json({ success: true });

    response.cookies.delete("auth-token");
    response.cookies.delete("refresh-token");

    return response

  } catch (error) {
    console.error('Proxy logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}