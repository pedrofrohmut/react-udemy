const Modal = ({ rating, handleClose }) => {
  const text = `You rated us ${rating} star${rating > 1 ? "s" : ""}`

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Thank You</h2>
        <p>{text}</p>
        <button className="close-btn" onClick={handleClose}>Close</button>
      </div>
    </div>
  )
}

export default Modal
