const Button = ({ children, className, disabled, onClick }) => {
  return (
    <button onClick={onClick} disabled={disabled} className={className}>
      {children}
    </button>
  )
}

export default Button
