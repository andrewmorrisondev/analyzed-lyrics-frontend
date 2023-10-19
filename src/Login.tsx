// import React from "react"

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=8ee7bc8b13d24a6e9f849c04218de9cd&response_type=code&redirect_uri=http://localhost:5173/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'

export default function Login() {
  return (
    <div>
      <a href={AUTH_URL}>Login With Spotify</a>
    </div>
  )
}