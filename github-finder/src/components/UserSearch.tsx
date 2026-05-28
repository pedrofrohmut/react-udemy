import { useState, useRef, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"

import { fetchGithubUser, searchGithubUser } from "../api/github"
import UserCard from "./UserCard"
import RecentUsers from "./RecentUsers"
import SuggestionsDropdown from "./SuggestionsDropdown"

import type { GithubUser } from "../types"

const initRecentUsers = () => {
  const lsRecentUsers = localStorage.getItem("recentUsers")
  if (!lsRecentUsers) {
    return []
  }
  return JSON.parse(lsRecentUsers)
}

type UserSearchProps = {}

const UserSearch: React.FC<UserSearchProps> = () => {
  const [text, setText] = useState<string>("")
  const [query, setQuery] = useState<string>("")
  const [recentUsers, setRecentUsers] = useState<Array<string>>(initRecentUsers)
  const [suggestions, setSuggestions] = useState<Array<GithubUser>>([])

  const debounceInterval = useRef<any>(null)

  const { isLoading, isError, isFetched, error, data } = useQuery({
    queryKey: ['users', query],
    queryFn: () => fetchGithubUser(query),
      enabled: query !== "" // Prevents fetching for empty queries and on component mount
  })

  const trySearchUser = (username: string) => {
    const trimmedQuery = username.trim()
    if (!trimmedQuery || trimmedQuery === "") {
      return
    }

    setQuery(trimmedQuery)

    setRecentUsers(prev => {
      const isPresent = prev.find(x => x === trimmedQuery)
      if (isPresent) return prev
        return prev.concat(trimmedQuery)
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setSuggestions([])
    trySearchUser(text)
  }

  const handleSelectRecent = (username: string) => {
    setQuery(username)
    setText(username)
  }

  useEffect(() => {
    localStorage.setItem("recentUsers", JSON.stringify(recentUsers))
  }, [recentUsers])

  const handleChangeInput = (e: React.FormEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value

    setText(val)

    clearTimeout(debounceInterval.current)

    debounceInterval.current = setTimeout(() => {
      if (!val || val.trim() === "") {
        return
      }

      searchGithubUser(val).then((data: { items: Array<GithubUser> }) => {
        setSuggestions(data.items)
      })
    }, 1000)
  }

  const handleSelectSuggestion = (userLogin: string) => {
    setText(userLogin)
    setSuggestions([])
    trySearchUser(userLogin)
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <div className="dropdown-wrapper">
          <input
            type="text"
            placeholder="Enter github Username..."
            value={text}
            onChange={handleChangeInput}
          />

          {suggestions.length > 0 && (
            <SuggestionsDropdown suggestions={suggestions} onSelectSuggestion={handleSelectSuggestion} />
          )}
        </div>

        <button type="submit">Search</button>
      </form>

      {isLoading && <div className="status">Loading...</div>}

      {isError && <div className="status error">{error.message}</div>}

      {isFetched && !data && <p>User not found.</p>}

      {isFetched && data && <UserCard user={data} />}

      {recentUsers && recentUsers.length > 0 && (
        <RecentUsers recentUsers={recentUsers} handleSelectRecent={handleSelectRecent} />
      )}
    </>
  )
}

export default UserSearch
