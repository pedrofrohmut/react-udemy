import { useState } from "react"

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

  const handleMouseEnter = star => {
    setHover(star)
  }

  const handleMouseLeave = () => {
    setHover(0)
  }

  const isActive = index => {
    if (index < hover || index < rating) {
      return "active"
    }
    return ""
  }

  return (
    <div className="rating-container">
      <h2>Rate Your Expirence</h2>

      <div className="stars">
        {stars.map((star, index) => (
          <span
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={() => handleMouseLeave()}
            key={star}
            className={`star ${isActive(index)}`}
          >
            {'\u2605'}
          </span>
        ))}
      </div>

      {rating > 0 && (
        <p className="feedback">{feedbackMessages[rating - 1]}</p>
      )}
    </div>
  )
}

export default Rating
