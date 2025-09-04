export const getOwnerInfo = async () => {
  const response = await fetch('/api/login', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })

  if (!response.ok) {
    console.error('Login failed')
    return
  }

  const data = await response.json()
  console.log(data.message)
}


