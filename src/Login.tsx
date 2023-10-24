// import React from "react"

const AUTH_URL = 'https://accounts.spotify.com/authorize?client_id=8ee7bc8b13d24a6e9f849c04218de9cd&response_type=code&redirect_uri=http://localhost:5173/&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state'
export default function Login() {
  return (
    <a href={AUTH_URL}>
      <div 
        className="login flex justify-center items-center text-xl rounded-lg"
        style={{ 
          backgroundColor: '#400273', 
          color: '#FFFFFF',
          width: '300px',
          height: '50px',
        }}
      >Login With Spotify
      </div>
    </a>
  )
}