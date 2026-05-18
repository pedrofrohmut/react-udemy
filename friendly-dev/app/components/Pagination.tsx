type PaginationProps = {
  numberOfPages: number
  currentPage: number
  handlePageChange: (n: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ numberOfPages, currentPage, handlePageChange }) => {
  if (numberOfPages < 2) {
    return null
  }

  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1)

  return (
    <div className="flex justify-center gap-2 mt-8">
      {pageNumbers.map((n) => (
        <button
          key={n}
          className={`px-3 py-1 cursor-pointer rounded ${
            currentPage === n ? "bg-blue-700 text-white" : "bg-gray-700 text-gray-200"
          }`}
          onClick={() => handlePageChange(n)}
        >
          {n}
        </button>
      ))}
    </div>
  )
}

export default Pagination
