import { BarLoader } from "react-spinners"

const Loading = ({ color, size, text }) => {
  return (
    <div style={styles.container}>
      <BarLoader color={color || "red"} size={size || 200} cssOverride={styles.loader} />
      {text && <p style={{ ...styles.text, color: color }}>{text}</p>}
    </div>
  )
}

const styles = {
  container: {
    margin: "3rem auto"
  },
  loader: {
    display: "block",
    margin: "0 auto"
  },
  text: {
    textAlign: "center",
    marginTop: "1rem"
  }
}

export default Loading
