import { formatMoney } from "../utils"

const Money = ({ symbol = "$", amount = 0 }) => {
  return <span className="money-span">{`${symbol} ${formatMoney(amount)}`}</span>
}

export default Money
