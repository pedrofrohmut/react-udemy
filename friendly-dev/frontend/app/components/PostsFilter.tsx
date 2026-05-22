type PostsFilterProps = {
  searchQuery: string
  handleSearchChange: (value: string) => void
}

const PostsFilter: React.FC<PostsFilterProps> = ({ searchQuery, handleSearchChange }) => {
  return (
    <div className="mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => handleSearchChange(e.target.value)}
        placeholder="Search Posts..."
        className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default PostsFilter
