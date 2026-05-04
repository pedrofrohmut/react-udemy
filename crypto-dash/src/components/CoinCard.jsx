import { Link } from "react-router"
import Money from "./Money"

const CoinCard = ({ coin }) => {
  if (!coin) return null

  const priceChange = coin.price_change_percentage_24h ? coin.price_change_percentage_24h.toFixed(2) : 0.0

  return (
    <Link to={`/coin/${coin.id}`}>
      <div className="coin-card">
        <div className="coin-header">
          <img alt={coin.name} src={coin.image} className="coin-image" />
          <div>
            <h2>{coin.name}</h2>
            <p className="symbol">{coin.symbol.toUpperCase()}</p>
          </div>
        </div>

        <p>
          <strong>Price:</strong> <Money amount={coin.current_price} />
        </p>

        {coin.price_change_percentage_24h && (
          <p className={`${coin.price_change_percentage_24h >= 0 ? "positive" : "negative"}`}>{`${priceChange}%`}</p>
        )}

        <p>{`Market Cap: ${coin.market_cap.toLocaleString()}`}</p>
      </div>
    </Link>
  )
}

export default CoinCard
