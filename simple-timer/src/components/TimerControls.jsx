const TimerControls = ({ isRunning, handlePlayPause, handleReset }) => {
  return (
    <div className="flex gap-4 align-center justify-center mx-auto">
      <button onClick={handlePlayPause} className="mt-3 bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600">
        {isRunning ? "Pause" : "Start"}
      </button>
      <button onClick={handleReset} className="mt-3 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-600">
        Reset
      </button>
    </div>
  )
}

export default TimerControls
