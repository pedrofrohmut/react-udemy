import constants from "./constants"

export const formatMoney = (money) =>
  money.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const delayIt = (start, setIsLoading) => {
  const elapsed = Date.now() - start
  const delay = elapsed < constants.minLoadingTime ? constants.minLoadingTime - elapsed : 0
  console.log("DelayIt:", delay)
  setTimeout(() => {
    setIsLoading(false)
  }, delay)
}
