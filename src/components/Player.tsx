import SpotifyPlayer from "react-spotify-web-playback";
import { useState, useEffect } from 'react';

interface PlayerProps {
  accessToken: string;
  trackUri: string;
  setStartTime: (newTime: number) => void;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  setPausedTime: (pauseTime: number) => void;
  pausedTime: number;
  startTime: number;
  totalElapsedTime: number;
  setTotalElapsedTime: (time:number) => void;
}

export default function Player(props: PlayerProps) {
  const { trackUri, accessToken, setStartTime, isPlaying, setIsPlaying, setPausedTime, startTime, totalElapsedTime, setTotalElapsedTime } = props
  const [play, setPlay] = useState(false)

  const [currentSong, setCurrentSong] = useState('')

  useEffect(() => {
    if (play && trackUri !== currentSong) {
      // A new song is starting
      setTotalElapsedTime(0)
      setStartTime(Date.now())
      setCurrentSong(trackUri)
    } else if (!play && trackUri === currentSong) {
      // The song is paused
      setPausedTime(Date.now() - startTime)
      // Accumulate elapsed time when the song is paused
      setTotalElapsedTime(totalElapsedTime + (Date.now() - startTime))
    } else if (play && trackUri === currentSong) {
      // The song is resumed
      setStartTime(Date.now())
    }
  }, [isPlaying, trackUri, currentSong, play])

  useEffect(() => setPlay(true), [trackUri])

  if (!accessToken) return null

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      callback={state => {
        if (!state.isPlaying) {
          setPlay(false)
        }
        if (state.isPlaying) {
          setPlay(true)
        }
        setIsPlaying(state.isPlaying)
      }}
      play={play}
      uris={trackUri ? [trackUri] : []}
      initialVolume={0.1}
    />
  )
}