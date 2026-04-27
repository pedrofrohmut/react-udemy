import { useMemo, useState } from "react"
import Star from "./Star"
import Modal from "./Modal"
import Button from "./Button"

const initStars = number => {
  const arr = []
  for (let i = 0; i < number; i++)
    arr.push(i + 1)
  return arr
}

const feedbackMessages = ["Terrible", "Poor", "Fair", "Good", "Excellent"]

const Rating = ({ number }) => {
  const [rating, setRating] = useState()
  const [hover, setHover] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // You need useMemo here so react does not call it everytime
  const stars = useMemo(() => initStars(number), [number])

  const handleClick = star => {
    if (star == rating) {
      // Removes the rating when clicking the same star
      setRating(0)
    } else {
      setRating(star)
    }
  }

  const handleMouseEnter = star => setHover(star)

  const handleMouseLeave = () => setHover(0)

  const isActive = index => (index < hover || index < rating) ? "active" : ""

  const handleSubmit = () => {
    if (rating > 0) {
      setIsSubmitted(true)
    }
  }

  const handleCloseModal = () => {
    setIsSubmitted(false)
    setRating(0)
    setHover(0)
  }

  return (
    <div className="rating-container">
      <h2>Rate Your Expirence</h2>

      <div className="stars">
        {stars.map((star, index) => (
          <Star
            key={star}
            star={star}
            index={index}
            handleClick={handleClick}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
            isActive={isActive}
          />
        ))}
      </div>

      <p className="feedback">{rating > 0 && feedbackMessages[rating - 1]}</p>

      <Button className="submit-btn" disabled={rating == 0} onClick={handleSubmit}>
        Submit
      </Button>

      <Modal isOpen={isSubmitted} rating={rating} handleClose={handleCloseModal} />
    </div>
  )
}

export default Rating
