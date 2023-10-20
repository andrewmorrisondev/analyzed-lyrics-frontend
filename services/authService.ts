const BASE_URL = 'http://localhost:3000/';

async function login(code: string) {
  try {
    const res = await fetch(`${BASE_URL}auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: code || '',
      })
    })
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    const json = await res.json()
    window.history.pushState({}, '', "/")
    // console.log(json)
    return json
  } catch (error) {
    console.error(error)
    // window.location.href = '/'
  }
}

async function refreshAuth(refreshToken: string) {
  try {
    const res = await fetch(`${BASE_URL}auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        refreshToken
      })
    })
    if (!res.ok) {
      throw new Error(res.statusText)
    }
    const json = await res.json()
    // window.history.pushState({}, '', "/")
    // console.log(json)
    return json
  } catch (error) {
    console.error(error)
    // window.location.href = '/'
  }
}

export { login, refreshAuth }