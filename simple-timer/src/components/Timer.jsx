import { useRef, useState } from "react"
import TimerControls from "./TimerControls"
import TimerDisplay from "./TimerDisplay"

const Timer = () => {
  // You need to use useRef to store the interval so the value is not lost when change state
  const timerRef = useRef(null)

  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

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
    clearInterval(timerRef.current)
    timerRef.current = null
    setTime(0)
    setIsRunning(false)
  }

  return (
    <div className="bg-gray-300 rounded-lg pt-5 pb-6 max-w-sm mx-auto w-2xs">
      <TimerDisplay time={time} />
      <TimerControls handlePlayPause={handlePlayPause} isRunning={isRunning} handleReset={handleReset} />
    </div>
  )
}

export default Timer
