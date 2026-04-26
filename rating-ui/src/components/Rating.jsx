import { useState } from "react"
import Star from "./Star"

const stars = [1, 2, 3, 4, 5]
const feedbackMessages = ["Terrible", "Poor", "Fair", "Good", "Excellent"]

const Rating = () => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

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
    </div>
  )
}

export default Rating
