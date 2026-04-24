const Rating = () => {
  const stars = [1, 2, 3, 4, 5]

  return (
    <div className="rating-container">
      <h2>Rate Your Expirence</h2>
      <div className="stars">
        {stars.map(star => (
          <span key={star} className="star">{'\u2605'}</span>
        ))}
      </div>
    </div>
  )
}

export default Rating
