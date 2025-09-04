// app/api/proxy/login-cookie/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // 1. Получаем данные из запроса фронтенда
    const { email, password } = await request.json()
    
    // 2. Делаем запрос к реальному бекенду
    const backendResponse = await fetch("https://om6auk3tiqy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws/api/v1/auth/login-cookie", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    })

    // 3. Обрабатываем ответ бекенда
    if (!backendResponse.ok) {
      throw new Error('Backend login failed')
    }

    const data = await backendResponse.json()
    
    // 4. Создаем ответ для фронтенда
    const response = NextResponse.json(data)
    
    // 5. Копируем куки из бекенда, убирая domain
    const backendCookies = backendResponse.headers.getSetCookie()
    backendCookies.forEach(cookie => {
      const cleanedCookie = cookie
        .replace(/; Domain=[^;]+/i, '') // Удаляем domain
        .replace(/; Secure/gi, '')      // Удаляем Secure для localhost
      response.headers.append('Set-Cookie', cleanedCookie)
    })

    return response

  } catch (error) {
    console.error('Proxy error:', error)
    return NextResponse.json({ error: 'Login failed' }, { status: 401 })
  }
}
