import type { GithubUser } from "../types"

type SuggestionsDropdownProps = {
  suggestions: Array<GithubUser>
  onSelectSuggestion: (username: string) => void
}

const SuggestionsDropdown: React.FC<SuggestionsDropdownProps> = ({ suggestions, onSelectSuggestion }) => {
  if (!suggestions || suggestions.length == 0 || !onSelectSuggestion) {
    return null
  }

  return (
    <ul className="suggestions">
      {suggestions.map((user: GithubUser) => (
        <li key={user.login} onClick={() => onSelectSuggestion(user.login)}>
          <img src={user.avatar_url} alt={user.login} className="avatar-xs" />
          {user.login}
        </li>
      ))}
    </ul>
  )
}

export default SuggestionsDropdown
