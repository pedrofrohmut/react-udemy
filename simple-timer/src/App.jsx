import { useRef, useState } from "react"

const App = () => {
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
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg text-center">
      <h2 className="text-4xl font-semibold mt-4">{`Timer: ${time}`}</h2>

      {/* Buttons */}
      <div className="flex gap-3 align-center justify-center">
        <button onClick={handlePlayPause} className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-600">
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset} className="mt-3 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Reset
        </button>
      </div>
    </div>
  )
}

export default App
