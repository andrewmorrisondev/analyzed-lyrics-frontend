interface Track {
  artist: string;
  title: string;
  uri: string;
  albumUrl: string;
}

interface TrackSearchResultProps {
  track: Track
  chooseTrack: (track: Track) => Promise<void>,
}


const TrackSearchResult = (props: TrackSearchResultProps) => {
  const { track, chooseTrack } = props

  function handlePlay() {
    chooseTrack(track)
  }
  

  return (
    <div 
      className="flex my-2 px-4 "
      style={{color: '#FFFFFF'}}
      onClick={handlePlay}
    >
      <img src={track.albumUrl} style={{ height: '64px', width: '64px', cursor: 'pointer' }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="font-light">{track.artist}</div>
      </div>
    </div>
  )
}

export default TrackSearchResult