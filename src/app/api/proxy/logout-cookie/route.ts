import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/v1/auth/logout-cookie`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }
    )

    if (!backendResponse.ok) {
      throw new Error('Backend logout failed')
    }

    const data = await backendResponse.json()
    
    const response = NextResponse.json(data)
    
    const backendCookies = backendResponse.headers.getSetCookie()
    backendCookies.forEach(cookie => {
      const cleanedCookie = cookie
        .replace(/; Domain=[^;]+/i, '')
        .replace(/; Secure/gi, '')
        .replace(/^([^=]+)=[^;]+/, '$1=; Expires=Thu, 01 Jan 1970 00:00:00 GMT')
      response.headers.append('Set-Cookie', cleanedCookie)
    })

    return response

  } catch (error) {
    console.error('Proxy logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}