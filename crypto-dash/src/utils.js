export const formatMoney = (money) =>
    money.toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })

export const getValidDelay = (start, loadingTime) => {
    if (!start || !loadingTime || start === 0 || loadingTime === 0) return 0
    const end = new Date()
    const delay = loadingTime - (end - start)
    const validDelay = delay > 0 ? delay : 0
    console.log("ValidDelay:", validDelay)
    return validDelay
}
