import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()
    
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/login-cookie`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })

    if (!backendResponse.ok) {
      throw new Error('Backend login failed')
    }

    const data = await backendResponse.json()
    
    const response = NextResponse.json(data)
    
    const backendCookies = backendResponse.headers.getSetCookie()
    backendCookies.forEach(cookie => {
      const cleanedCookie = cookie
        .replace(/; Domain=[^;]+/i, '')
        .replace(/; Secure/gi, '')
      response.headers.append('Set-Cookie', cleanedCookie)
    })

    return response

  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 401 })
  }
}