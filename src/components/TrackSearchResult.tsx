interface TrackSearchResultProps {
  track: {
    artist: string;
    title: string;
    uri: string;
    albumUrl: string;
  }
}

const TrackSearchResult = (props: TrackSearchResultProps) => {

  const { track } = props

  return (
    <div className="justify-items-center">
      <img src={track.albumUrl} style={{ height: '64px', width: '64px' }} />
      <div className="ml-3">
        <div>{track.title}</div>
        <div className="font-light">{track.artist}</div>
      </div>
    </div>
  )
}

export default TrackSearchResult