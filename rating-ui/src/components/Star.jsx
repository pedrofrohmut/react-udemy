const Star = ({ star, index, handleClick, handleMouseEnter, handleMouseLeave, isActive }) => {
  return (
    <span
      onClick={() => handleClick(star)}
      onMouseEnter={() => handleMouseEnter(star)}
      onMouseLeave={() => handleMouseLeave()}
      className={`star ${isActive(index)}`}
    >
      {'\u2605'}
    </span>
  )
}

export default Star
