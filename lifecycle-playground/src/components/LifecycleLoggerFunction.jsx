import { useEffect, useState } from "react"

const LifecycleLoggerFunction = () => {
  const [count, setCount] = useState(0)

  // useEffect without any dependecies will run on component mount and umount lifecycles
  useEffect(() => {
    console.log("Component did mount")
    return () => {
      console.log("Component will unmount")
    }
  }, [])

  // useEffect with dependencies will run everytime its dependencies change
  // (count - state change in this example)
  useEffect(() => {
    console.log("Component updated")
  }, [count])

  const handleIncrement = () => {
    if (count < 1000) setCount(prevCount => prevCount + 1)
  }

  const handleDecrement = () => {
    if (count > 0) setCount(prevCount => prevCount - 1)
  }

  return (
    <div className="logger-container">
      <h2>Lifecycle Logger (Function Component)</h2>
      <p>Count: {count}</p>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
        <button className="secondary-btn" onClick={handleDecrement} style={{ width: "40px" }}>
          -
        </button>
        <button className="secondary-btn" onClick={handleIncrement} style={{ width: "40px" }}>
          +
        </button>
      </div>
    </div>
  )
}

export default LifecycleLoggerFunction
