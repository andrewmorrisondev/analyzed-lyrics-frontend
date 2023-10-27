import { Line } from '../Dashboard'
import { useEffect, useState } from 'react';

interface LyricsProps {
  lyrics: Lyrics | null;
  lyricError: string;
  lyricsStartTimes: number[];
  setLyricsStartTimes: (array: number[]) => void;
  isPlaying: boolean;
  currentTime: number;
}

interface Lyrics {
  error: boolean;
  syncType: string;
  lines: Line[];
}

export default function Lyrics(props: LyricsProps) {
  const { lyrics, lyricError, isPlaying, currentTime } = props
  const startTimes = lyrics?.lines.map((line: Line) => {
    return { time: parseInt(line.startTimeMs), lyric: line.words }
  }) || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined)
  // const [currentTimeState, setCurrent] = useState(0)

  // console.log("important one", isPlaying)
  function highlightLyrics(currentIndex: number, currentTime: number) {
    setCurrentIndex(currentIndex)
    // console.log("CUUURURURURUENTN INDDDEX", currentIndex)


    if (currentIndex < startTimes.length) {
      const currentLyric = startTimes[currentIndex];
      const nextIndex = currentIndex + 1;
      const nextLyricTime = nextIndex < startTimes.length ? startTimes[nextIndex].time : null;
      
      if (!isPlaying) {
        // Pause the highlighting when the song is paused
        if (timeoutId) {
          clearTimeout(timeoutId)
          setTimeoutId(undefined)
        }
      } else {
        // Calculate the duration for this lyric
        console.log(nextLyricTime, currentLyric.time, currentTime)
        const duration = nextLyricTime !== null ? (nextLyricTime - currentLyric.time) : undefined
        
        const remainingDuration = nextLyricTime !== null ? (nextLyricTime - currentTime) : undefined
        // when paused, remaining value of currentIndex
        // currentIndex duration

        // Highlight the current lyric
        console.log("duration of current index", duration, "what the remaining duration should be", remainingDuration)
        console.log(`Highlighting: "${currentLyric.lyric}"`)

        if (duration !== undefined) {
          // big daddy timer
          // timer duration
          const id = window.setTimeout(() => {
            // andys idea:
            // anotherTimer, 1ms
            // ifPaused, kill timer and store anotherTimer counter
            // when played, start anotherTimer with (duration - counter)

            // nicks idea:
            // currentTime variable that we have everytime we press pause is telling us exactly where we are in song. If we take exactly where we are in song (ms) and take how lon
            // next lyric time is 2700ms, we pause 2500ms into song, amount of time left in interval should be 200 ms. nextlyrictime(2700ms) - pausetime (2500ms) set duration for 200(ms)
            // flag(false) - if paused(flag), calculate duration like above
            // and trigger flag on next loop that calucates duration like normal            
          setCurrentIndex(nextIndex)
          }, duration)

          // Store the timeout ID
          setTimeoutId(id)
        }
      }
    }
  }

  useEffect(() => {
    if (isPlaying) {
      // Start or continue highlighting when the song is playing
      // console.log(currentIndex)

      const initDuration = startTimes[0].time
      if (currentIndex === 0) {
        // delay first lyric to sync with song
        window.setTimeout(() => {
          console.log(initDuration)
          console.log(currentTime)
          highlightLyrics(currentIndex, currentTime)
          
        }, initDuration)
        // 
      } else {
        console.log(currentTime)
        highlightLyrics(currentIndex, currentTime)
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
    setCurrentIndex(currentIndex)
  }, [lyrics, isPlaying])
  

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
        <div style={{color: "#FFFFFF"}} key={index}>{line.words}</div>
      ))}
    </div>
  )
}