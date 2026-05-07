export const formatMoney = (money) =>
    money.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

export const getValidDelay = (start, loadingTime) => {
    if (!start || !loadingTime || start === 0 || loadingTime === 0) return 0
    const end = Date.now()
    const delay = loadingTime - (end - start)
    const validDelay = delay > 0 ? delay : 0
    console.log("ValidDelay:", validDelay)
    return validDelay
}

export const setupDelay = (start, loadingTime, setIsLoading) => {
    // Calc the delay so the UI dont wait the API time + minDelayTime.
    // Only the minDelay or API Time if bigger than the minDelay
    const validDelay = getValidDelay(start, loadingTime)
    setTimeout(() => {
        setIsLoading(false)
    }, validDelay)
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
