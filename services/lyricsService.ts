const BASE_URL = 'http://localhost:3000/lyrics'

async function show(uri: string) {
  try {
    const res = await fetch(`${BASE_URL}/${uri}`, {
      method: 'GET',
    })
    return await res.json()
  } catch (error) {
    console.error(error)
  }
}

export { show }