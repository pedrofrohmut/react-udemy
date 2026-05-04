import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import Money from "../components/Money"
import Loading from "../components/Loading"

const COIN_DETAIL = "coinDetail"
const LOADING_TIME = 1500

const getLSCoin = () => {
  const lsCoin = localStorage.getItem(COIN_DETAIL)
  if (!lsCoin) return null
  return JSON.parse(lsCoin)
}

const setLSCoin = (coin) => {
  if (!coin) {
    localStorage.removeItem(COIN_DETAIL)
  } else {
    localStorage.setItem(COIN_DETAIL, JSON.stringify(coin))
  }
}

const CoinDetailsPage = () => {
  const { id } = useParams()

  const [coin, setCoin] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchCoin = async () => {
    const url = `${import.meta.env.VITE_COIN_API_URL}/${id}`
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }
      const data = await response.json()

      console.log("Fetched from API")
      setCoin(data)
      setLSCoin(data)
    } catch (err) {
      setCoin(null)
      setError(err)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, LOADING_TIME)
    }
  }

  useEffect(() => {
    setIsLoading(true)

    const lsCoin = getLSCoin()
    if (!lsCoin) {
      fetchCoin()
    } else {
      console.log("From local storage")
      setCoin(lsCoin)
      setTimeout(() => {
        setIsLoading(false)
      }, LOADING_TIME)
    }
  }, [id])

  // TODO: Make Readmore Element to use in the coin.description
  return (
    <div className="coin-details-container">
      <Link to="/">Back to Home</Link>

      <h1 className="coin-details-title">{coin ? `${coin.name} (${coin.symbol.toUpperCase()})` : "Coin Details"}</h1>

      {isLoading && <Loading color="black" text="Loading Coin Details..." />}

      {error && <div className="error">Error: {error.message}</div>}

      {!isLoading && !error && !coin && <p>No Data Found.</p>}

      {!isLoading && !error && coin && (
        <>
          <img src={coin.image.large} alt={coin.name} className="coin-details-image" />
          <p>{coin.description.en.slice(0, 500)}</p>
          <div className="coin-details-info">
            <h3>Rank: #{coin.market_cap_rank}</h3>
            <h3>
              Current Price: <Money amount={coin.market_data.current_price.usd} />
            </h3>
            <h4>
              Market Cap: <Money amount={coin.market_data.market_cap.usd} />
            </h4>
            <h4>
              24h High: <Money amount={coin.market_data.high_24h.usd} />
            </h4>
            <h4>
              24h Low: <Money amount={coin.market_data.low_24h.usd} />
            </h4>
            <h4>
              24h Price Change: <Money amount={coin.market_data.price_change_24h} />{" "}
              <span>({coin.market_data.price_change_percentage_24h.toFixed(2)})</span>
            </h4>
            <h4>Circulating Supply: {coin.market_data.circulating_supply.toLocaleString("en-US")}</h4>
            <h4>Total Supply: {coin.market_data.total_supply?.toLocaleString() || "N/A"}</h4>
            <h4>
              All-Time High: <Money amount={coin.market_data.ath.usd} /> on{" "}
              {new Date(coin.market_data.ath_date.usd).toLocaleDateString()}
            </h4>
            <h4>
              All-Time Low: <Money amount={coin.market_data.atl.usd} /> on{" "}
              {new Date(coin.market_data.atl_date.usd).toLocaleDateString()}
            </h4>
            <h4>Last Updated: {new Date(coin.last_updated).toLocaleDateString()}</h4>
          </div>

          <div className="coin-details-links">
            {coin.links.homepage[0] && (
              <p>
                🌐{" "}
                <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                  Website
                </a>
              </p>
            )}
            {coin.links.blockchain_site[0] && (
              <p>
                🧩{" "}
                <a href={coin.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer">
                  Blockchain Explorer
                </a>
              </p>
            )}
            {coin.categories.length > 0 && <p>Categories: {coin.categories.join(", ")}</p>}
          </div>
        </>
      )}
    </div>
  )
}

export default CoinDetailsPage
