const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col">
      <img alt={product.name} src={product.image} className="h-40 object-cover rounded mb-4" />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-gray-500 text-sm mb-2">{product.description}</p>
      <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
    </div>
  )
}

export default ProductCard
