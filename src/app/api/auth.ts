const BASE_URL = "https://om6auk3tiqy3ih6ad5ad2my63q0xmqcs.lambda-url.eu-north-1.on.aws/api"

export const fetchSigninCookie = async (email: string, password: string) => {
  const response = await fetch(BASE_URL + "/v1/auth/login-cookie", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include',
  })

  if (!response.ok) {
    console.error('Login failed')
    return
  }

  const data = await response.json()
  console.log(data.message)
}
