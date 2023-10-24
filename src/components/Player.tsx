import SpotifyPlayer from "react-spotify-web-playback"
import { useState, useEffect} from 'react'

interface PlayerProps {
  accessToken: string,
  trackUri: string
}

export default function Player(props: PlayerProps) {
  const {trackUri, accessToken } = props

  const [play, setPlay] = useState(false)

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null

  return <SpotifyPlayer 
            token={accessToken}
            showSaveIcon
            callback={state => {
              if (!state.isPlaying) setPlay(false)
            }}
            play={play}
            uris={trackUri ? [trackUri] : []}
          />
}