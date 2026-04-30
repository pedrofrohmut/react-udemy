import { useEffect, useRef, useState } from "react"
import TimerControls from "./TimerControls"
import TimerDisplay from "./TimerDisplay"

const initTime = () => {
  const time = localStorage.getItem("time")
  if (!time) return 0
  if (isNaN(time)) return 0
  return parseInt(time)
}

const Timer = () => {
  // You need to use useRef to store the interval so the value is not lost when change state
  const timerRef = useRef(null)

  const startRef = useRef(null)

  useEffect(() => {
    startRef.current?.focus()
  }, [startRef])

  const [time, setTime] = useState(initTime)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    localStorage.setItem("time", JSON.stringify(time))
  }, [time])

  const handlePlayPause = () => {
    if (isRunning) {
      setIsRunning(false)
      clearInterval(timerRef.current)
      timerRef.current = null
    } else {
      setIsRunning(true)
      timerRef.current = setInterval(() => {
        setTime(prev => prev + 1)
      }, 1000)
    }
  }

  const handleReset = () => {
    if (time === 0) return
    clearInterval(timerRef.current)
    timerRef.current = null
    setTime(0)
    setIsRunning(false)
    startRef.current?.focus()
    localStorage.setItem("time", JSON.stringify(0))
  }

  return (
    <div className="bg-gray-300 rounded-lg pt-5 pb-6 max-w-sm mx-auto w-2xs">
      <TimerDisplay time={time} />
      <TimerControls
        startRef={startRef}
        handlePlayPause={handlePlayPause}
        isRunning={isRunning}
        handleReset={handleReset}
      />
    </div>
  )
}

export default Timer
