import SpotifyPlayer from "react-spotify-web-playback"
import { useState, useEffect} from 'react'

interface PlayerProps {
  accessToken: string;
  trackUri: string;
  currentTime: number;
  setCurrentTime: (newTime: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function Player(props: PlayerProps) {
  const {trackUri, accessToken, setCurrentTime, isPlaying, setIsPlaying } = props

  const [play, setPlay] = useState(false)
  

  const controlsElement = document.querySelector('div[data-component-name="Controls"]')
  let dataPlaying = controlsElement?.getAttribute('data-playing')

  useEffect(() => {
    // Update dataPlaying when isPlaying prop changes
    dataPlaying = isPlaying ? 'true' : 'false';
  }, [play])

  // useEffect(() => setIsPlaying(!dataPlaying), [isPlaying])
  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null

  return <SpotifyPlayer 
            token={accessToken}
            showSaveIcon
            callback={state => {
              if (!state.isPlaying) setPlay(false)
              setCurrentTime(state.position * 1000)
              // console.log(state)
              setIsPlaying(state.isPlaying)
            }}
            play={play}
            uris={trackUri ? [trackUri] : []}
          />
}