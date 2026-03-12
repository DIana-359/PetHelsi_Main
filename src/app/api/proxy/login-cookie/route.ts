import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const backendResponse = await fetch(`${process.env.API_URL}/v1/auth/login-cookie`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (!backendResponse.ok) {
      throw new Error('Backend login failed')
    }

    const data = await backendResponse.json()
    const backendCookies = backendResponse.headers.getSetCookie()

    const authTokenCookie = backendCookies.find(c => c.startsWith('auth-token='))
    const accessToken = authTokenCookie?.split(';')[0].replace('auth-token=', '') ?? null

    const response = NextResponse.json({ ...data, accessToken })

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