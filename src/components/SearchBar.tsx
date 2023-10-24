import { FormEvent } from "react"

interface SearchBarProps {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  search: string
}

export default function SearchBar(props: SearchBarProps) {

  return (
    <form
      onSubmit={props.handleSubmit}
      className="flex justify-center"
      >
    <input
      className="border-2 border-gray-300 h-10 px-5 rounded-lg text-lg focus:outline-none"
      onChange={props.handleChange}
      value={props.search}
      required
      type="search"
      placeholder="Search Songs/Artists"
    />
    </form>
  )
}