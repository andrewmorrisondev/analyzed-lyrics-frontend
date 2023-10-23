import React, { useState, useEffect } from "react"
import useAuth from "./useAuth"
import TrackSearchResult from "./components/TrackSearchResult"
import * as spotifyService from "./../services/spotifyService"

interface DashboardProps {
  code: string
}

export default function Dashboard(props: DashboardProps) {
  const { code } = props
  const accessToken = useAuth(code)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState<{ artist: string; title: string; uri: string; albumUrl: string }[]>([])

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(evt.target.value)
  }
  
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
  }

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
        console.log(spotifyData)
      }, 750)
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
      <form
        onSubmit={handleSubmit}
      >
        <input
          onChange={handleChange}
          value={search}
          required
          type="search"
          placeholder="Search Songs/Artists"
        />
      </form>
      <div
        className="flex-grow-1 my-2"
        style={{ overflowY: "auto" }}
      >
        {searchResults.map(track => (
          <TrackSearchResult track={track} key={track.uri} />
        ))}
      </div>
      <div>bottom</div>
    </div>
  )
}