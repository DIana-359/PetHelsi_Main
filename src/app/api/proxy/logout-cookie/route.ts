import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // 1. Делаем запрос к бекенду для логаута
    const backendResponse = await fetch(
      "https://om6auk3tiqy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws/api/v1/auth/logout-cookie",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      }
    )

    // 2. Обрабатываем ответ бекенда
    if (!backendResponse.ok) {
      throw new Error('Backend logout failed')
    }

    const data = await backendResponse.json()
    
    // 3. Создаем ответ для фронтенда
    const response = NextResponse.json(data)
    
    // 4. Копируем куки из бекенда, модифицируя их для удаления
    const backendCookies = backendResponse.headers.getSetCookie()
    backendCookies.forEach(cookie => {
      const cleanedCookie = cookie
        .replace(/; Domain=[^;]+/i, '') // Удаляем domain
        .replace(/; Secure/gi, '')      // Удаляем Secure
        // Гарантируем удаление куки
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
