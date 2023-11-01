import React, { useState, useEffect } from "react"
import useAuth from "../hooks/useAuth"
import TrackSearchResult from "./components/TrackSearchResult"
import SearchBar from "./components/SearchBar"
import Player from "./components/Player"
import Lyrics from "./components/Lyrics"
import * as spotifyService from "./../services/spotifyService"
import * as lyricsService from "./../services/lyricsService"

interface DashboardProps {
  code: string
}
interface Track {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}

interface Lyrics {
  error: boolean;
  syncType: string;
  lines: Line[];
}

export interface Line {
  startTimeMs: string;
  words: string;
}

export default function Dashboard(props: DashboardProps) {
  const { code } = props
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState<{ artist: string; title: string; uri: string; albumUrl: string }[]>([])
  const [playingTrack, setPlayingTrack] = useState<Track | null>(null)
  const [lyrics, setLyrics] = useState<Lyrics | null>(null)
  const [lyricError, setLyricError] = useState("")
  const [startTime, setStartTime] = useState(0)
  const [lyricsStartTimes, setLyricsStartTimes] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [pausedTime, setPausedTime] = useState(0)
  const [totalElapsedTime, setTotalElapsedTime] = useState(0)
  console.log(totalElapsedTime)
  async function chooseTrack(track: Track) {
    setPlayingTrack(track)
    setSearch('')
  }

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value)
  }
  
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
  }

  useEffect(()=>{
    if (!playingTrack) return
    const uri = playingTrack.uri.split(':')[2]
    const fetchLyrics = async () => {
      const lyricData = await lyricsService.show(uri)
      if (lyricData.error === true) {
        setLyrics(null)
        setLyricError(lyricData.message)
      } else {
        setLyrics(lyricData)
      }
    }
    fetchLyrics()
  }, [playingTrack])

  useEffect(() => {
    if (!search) {
      setSearchResults([])
      return
    }
    if (!accessToken) {
      return
    }
    let timer: number
    const fetchDataWithDelay = async () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(async () => {
        const spotifyData = await spotifyService.search(search, accessToken)
        setSearchResults(spotifyData)
      }, 150)
    }
    fetchDataWithDelay()
    return () => {
      if (timer) {
        clearTimeout(timer)
      }
    }
  }, [search, accessToken])

  return (
    <div
      className="d-flex flex-column py-2"
      style={{ height: "100vh" }}
    >
      <SearchBar 
        search={search} 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <div
        className="flex-grow-1 flex-col"
        style={{ overflowY: "auto" }}
      >
        {searchResults.map((track) => (
          <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
        ))}
      <Lyrics 
        lyrics={lyrics}
        lyricError={lyricError}
        lyricsStartTimes={lyricsStartTimes}
        setLyricsStartTimes={setLyricsStartTimes}
        isPlaying={isPlaying}
        totalElapsedTime={totalElapsedTime}
        trackUri={playingTrack?.uri || ''}
      />
    </div>
      <div className="fixed bottom-0">
        {accessToken?
          <Player 
            accessToken={accessToken}
            trackUri={playingTrack?.uri || ''}
            setStartTime={setStartTime}
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            setPausedTime={setPausedTime}
            startTime={startTime}
            pausedTime={pausedTime}
            totalElapsedTime={totalElapsedTime}
            setTotalElapsedTime={setTotalElapsedTime}

            />
          :
          null
        }
      </div>
    </div>
  )
}