const BASE_URL = 'http://localhost:3000/spotify'

async function search(search: string, token: string) {
  try {
    const res = await fetch(`${BASE_URL}/${search}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    return res.json()
  } catch (error) {
    console.error(error)
  }
}

export { search }