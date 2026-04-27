import Button from "./Button"

const Modal = ({ isOpen, rating, handleClose }) => {
  if (!isOpen) return null

  const text = `You rated us ${rating} star${rating > 1 ? "s" : ""}`

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Thank You</h2>
        <p>{text}</p>
        <Button className="close-btn" onClick={handleClose}>Close</Button>
      </div>
    </div>
  )
}

export default Modal
