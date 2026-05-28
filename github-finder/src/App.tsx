import UserSearch from "./components/UserSearch"

{/*
  TODO: in the recent searches track the search by time. When last searched.
  and only keep the N (prob 10) most recent searches. Add the new, Sort by time
  desc then take the top N
*/}


const App = () => {
  return (
    <div className="container">
      <h1>Github Finder</h1>
      <UserSearch />
    </div>
  )
}

export default App
