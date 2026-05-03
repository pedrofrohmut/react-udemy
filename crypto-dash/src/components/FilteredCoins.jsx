import CoinCard from "./CoinCard"

const FilteredCoins = ({ coins, filter }) => {
  const filtered = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(filter.toLowerCase()) || coin.symbol.toLowerCase().includes(filter.toLowerCase())
  )

  if (filtered.length == 0) {
    return <p>No matching coins</p>
  }

  return (
    <>
      {filtered.map((coin) => (
        <CoinCard coin={coin} key={coin.id} />
      ))}
    </>
  )
}

export default FilteredCoins
