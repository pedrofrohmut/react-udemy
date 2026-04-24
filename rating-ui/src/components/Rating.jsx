import { useState } from "react"

const Rating = () => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="rating-container">
      <h2>Rate Your Expirence</h2>
      <div className="stars">
        {stars.map(star => (
          <span
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            key={star}
            className="star"
          >
            {'\u2605'}
          </span>
        ))}
      </div>
    </div>
  )
}

export default Rating
