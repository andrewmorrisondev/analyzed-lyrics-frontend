import { Line } from '../Dashboard'
import { useEffect, useState } from 'react';

interface LyricsProps {
  lyrics: Lyrics | null;
  lyricError: string;
  lyricsStartTimes: number[];
  setLyricsStartTimes: (array: number[]) => void;
  isPlaying: boolean;
  totalElapsedTime: number;
  trackUri: string
}

interface Lyrics {
  error: boolean;
  syncType: string;
  lines: Line[];
}

export default function Lyrics(props: LyricsProps) {
  const { lyrics, lyricError, isPlaying, totalElapsedTime, trackUri } = props

  console.log(totalElapsedTime)
  const startTimes = lyrics?.lines.map((line: Line) => {
    return { time: parseInt(line.startTimeMs), lyric: line.words }
  }) || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined)
  const [wasPaused, setWasPaused] = useState(false)

  function highlightLyrics(currentIndex: number, totalElapsedTime: number) {
    setCurrentIndex(currentIndex)
    if (currentIndex < startTimes.length) {
      const currentLyric = startTimes[currentIndex]
      const nextIndex = currentIndex + 1
      const nextLyricTime = nextIndex < startTimes.length ? startTimes[nextIndex].time : null;
      
      if (!isPlaying) {
        // Pause the highlighting when the song is paused
        
        if (timeoutId) {
          clearTimeout(timeoutId)
          setTimeoutId(undefined)
        }
      } else {
        // Calculate the duration for this lyric
        console.log(nextLyricTime, currentLyric.time, totalElapsedTime)
        const duration = nextLyricTime !== null ? (nextLyricTime - currentLyric.time) : undefined
        
        const remainingDuration = nextLyricTime !== null ? (nextLyricTime - totalElapsedTime) : undefined

        // Highlight the current lyric
        // console.log("duration of current index", duration, "what the remaining duration should be", remainingDuration)
        // console.log(`Highlighting: "${currentLyric.lyric}"`)
        // console.log("Current Index: ",currentIndex)
        if(wasPaused){
          if (duration !== undefined) {
  
            const id = window.setTimeout(() => {        
              
              setCurrentIndex(nextIndex)
              console.log("remaining duration timeout")
            }, remainingDuration)
            
            // Store the timeout ID
            setWasPaused(false)
            setTimeoutId(id)
          }
          console.log("line 76")
        }else{
          if (duration !== undefined) {
  
            const id = window.setTimeout(() => {   
            setCurrentIndex(nextIndex)
            // setWasPaused(false)
            console.log("regular duration timeout")
          }, duration)
            // Store the timeout ID
            setTimeoutId(id)
          }
          console.log("line 90")

        }
      }
    }
  }

  useEffect(() => {
    if (isPlaying) {
      // Start or continue highlighting when the song is playing
      console.log("CURRENT INDEX UE")

      const initDuration = startTimes[0].time
      if (currentIndex === 0) {
        // delay first lyric to sync with song
        window.setTimeout(() => {
          console.log(initDuration)
          console.log(totalElapsedTime)
          highlightLyrics(currentIndex, totalElapsedTime)
          
        }, initDuration)
      } else {
        console.log(totalElapsedTime)
        highlightLyrics(currentIndex, totalElapsedTime)
      }

    }

    return () => {
      // Cleanup: Clear the timeout when the component unmounts or when isPlaying changes.
      if (timeoutId) {
        clearTimeout(timeoutId)
        setTimeoutId(undefined)
      }
    };
  }, [isPlaying, currentIndex])

  useEffect(() => {
    // Reset the current index when the lyrics or isPlaying change
    if(timeoutId !== undefined) {
      if(!isPlaying){
        setWasPaused(true)
      }

    }
    setCurrentIndex(currentIndex)
  }, [isPlaying])

  useEffect(()=>{
    clearTimeout(timeoutId)
    setTimeoutId(undefined)
    setWasPaused(false)
    setTimeout(()=>setCurrentIndex(0),500)
  }, [trackUri])
  

  if (lyricError !== '') {
    return (
      <div style={{color: "#FFFFFF"}}>
        {lyricError}
      </div>
    )
  }
  return (
    <div className="whitespace-pre">
      {lyrics && lyrics.lines.map((line: Line, index) => (
        <div
          style={{
            color: index === currentIndex ? "#00FF00" : "#FFFFFF",
          }}
          key={index}
        >
          {line.words}
        </div>
      ))}
    </div>
  );
}