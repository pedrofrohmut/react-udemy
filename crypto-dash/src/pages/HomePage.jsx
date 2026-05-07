import { useState } from "react"
import CoinCard from "../components/CoinCard"
import FilterInput from "../components/FilterInput"
import LimitSelector from "../components/LimitSelector"
import Loading from "../components/Loading"
import SortSelector from "../components/SortSelector"
import useFetchCoins from "../hooks/useFetchCoins"

const getFilteredAndSorted = (coins, filter, sortBy) => {
  if (!coins) return []

  return coins
    .filter(
      (coin) =>
        coin.name.toLowerCase().includes(filter.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap
        case "market_cap_asc":
          return a.market_cap - b.market_cap

        case "price_desc":
          return b.current_price - a.current_price
        case "price_asc":
          return a.current_price - b.current_price

        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h
      }
    })
}

const initLimit = () => {
  const lsLimit = localStorage.getItem("coinsLimit")
  if (!lsLimit) {
    localStorage.setItem("coinsLimit", 10)
    return 10
  }
  return parseInt(lsLimit)
}

const HomePage = () => {
  const [limit, setLimit] = useState(initLimit)
  const [filter, setFilter] = useState("")
  const [sortBy, setSortBy] = useState("market_cap_desc")

  const { coins, isLoading, error } = useFetchCoins(limit, sortBy)

  const filteredAndSorted = getFilteredAndSorted(coins, filter, sortBy)

  const handleSetLimit = (e) => {
    setLimit(e.target.value)
  }

  return (
    <div>
      <h1>Crypto Dash!</h1>

      <div className="top-controls">
        <FilterInput filter={filter} setFilter={setFilter} />
        <LimitSelector limit={limit} handleSetLimit={handleSetLimit} />
        <SortSelector sortBy={sortBy} setSortBy={setSortBy} />
      </div>

      {error && <pre>{JSON.stringify(error, null, 2)}</pre>}

      {isLoading && <Loading color="white" text="Loading Coins..." />}

      {!isLoading && !error && (
        <main className="grid">
          {filteredAndSorted.length === 0 && <p>No matching coins</p>}

          {filteredAndSorted.length > 0 && (
            <>
              {filteredAndSorted.map((coin) => (
                <CoinCard coin={coin} key={coin.id} />
              ))}
            </>
          )}
        </main>
      )}
    </div>
  )
}

export default HomePage
