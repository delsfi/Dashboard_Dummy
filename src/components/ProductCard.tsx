import { Product } from "@/types";

interface ProductCardProps {
  product: Product; // Gunakan tipe Product yang sudah didefinisikan
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {product.brand}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="font-bold text-lg">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-xs text-red-500 ml-1 line-through">
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500 mr-1">★</span>
            <span>{product.rating}</span>
          </div>
        </div>
      </div>
    </div>
  )
}