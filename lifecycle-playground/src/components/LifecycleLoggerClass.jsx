import { Component } from "react"

class LifecycleLoggerClass extends Component {
  constructor(props) {
    super(props)
    console.log("Component Constructor called")
    // Initialize component state
    this.state = {
      count: 0
    }
  }

  // componentDidMount is called once the component rendering completes.
  // This is the first method of the lifecycle to be fired after the first render.
  componentDidMount() {
    console.log("Component mounted")
  }

  // componentDidUpdate is called right after updating occurs. This is where you
  // will do the post update stuff.
  componentDidUpdate(_prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      console.log("Count updated to: " + this.state.count)
    }
  }

  componentWillUnmount() {
    console.log("Component will unmount")
  }

  // In class components you need to use arrow functions or you have to bind this
  // in the constructor
  handleIncrement = () => {
    this.setState(prev => ({
      count: prev.count + 1
    }))
  }

  handleDecrement = () => {
    if (this.state.count > 0) {
      this.setState(prev => ({
        count: prev.count - 1
      }))
    }
  }

  render() {
    return (
      <div className="logger-container">
        <h2>Lifecycle Logger (Class component)</h2>
        <p>Count: {this.state.count}</p>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "center" }}>
          <button className="secondary-btn" onClick={this.handleDecrement} style={{ width: "40px" }}>-</button>
          <button className="secondary-btn" onClick={this.handleIncrement} style={{ width: "40px" }}>
            +
          </button>
        </div>
      </div>
    )
  }
}

export default LifecycleLoggerClass
