import { Line } from '../Dashboard'

interface LyricsProps {
  lyrics: Lyrics | null;
  lyricError: string;
}

interface Lyrics {
  error: boolean;
  syncType: string;
  lines: Line[];
}

export default function Lyrics(props: LyricsProps) {
  const { lyrics, lyricError } = props

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