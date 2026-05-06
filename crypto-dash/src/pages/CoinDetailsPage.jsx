import { useEffect, useState } from "react"
import { useParams, Link } from "react-router"
import Money from "../components/Money"
import Loading from "../components/Loading"
import CoinChart from "../components/CoinChart"

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

  const isValidCache = () => {
    const lsCoin = getLSCoin()
    if (!lsCoin) return false

    // TODO: lastFetched

    return true
  }

  const fetchFromCache = () => {
    // TODO: impl
  }

  const fetchAPI = async () => {
    /*
      Ref Docs: https://docs.coingecko.com/v3.0.1/reference/coins-id
     */
    const url = `${import.meta.env.VITE_COIN_API_URL}/${id}?x_cg_demo_api_key=${import.meta.env.VITE_API_KEY}`
    const start = new Date()

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
      // Makes the delay equal to LOADING_TIME if the api takes less than the LOADING_TIME
      // or 0 delay if api fetching took longer
      const end = new Date()
      const delay = LOADING_TIME - (end - start)
      const validDelay = delay > 0 ? delay : 0
      console.log("Valid Delay: ", validDelay / 1000, " seconds")
      setTimeout(() => {
        setIsLoading(false)
      }, validDelay)
    }
  }

  useEffect(() => {
    setIsLoading(true)

    /*
      TODO:
      1. Make a 5 min cache for the coin. and the chart
    */
    const fetchInterval = 5 * 60 * 1000 // Five minutes
    if (isValidCache(fetchInterval)) {
      fetchFromCache()
    } else {
      fetchAPI()
    }
  }, [])

  // useEffect(() => {
  //   setIsLoading(true)

  //   const lsCoin = getLSCoin()
  //   if (!lsCoin) {
  //     fetchCoin()
  //   } else {
  //     console.log("From local storage")
  //     setCoin(lsCoin)
  //     setTimeout(() => {
  //       setIsLoading(false)
  //     }, LOADING_TIME)
  //   }
  // }, [id])

  /*
    * TODO: Make Readmore Element to use in the coin.description
    * TODO: Make it like HomePage. Updates on every 5 min
    * TODO: Make it update everytime the lsCoinId changes
    * TODO: Check out how to listen to pageGetFocus (dont know the exact name) and then update the page
    * if the time is long enough
    * TODO: Stop the interval to update the page when the page loses focus
    * TODO: Add an 'auto update' checkbox for the user to chose and only auto update when it is checked
    */
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

          {/* <CoinChart coinId={coin.id} /> */}

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
