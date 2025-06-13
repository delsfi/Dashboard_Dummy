import { fetchCarts } from '@/utils/api'

export default async function CartsPage() {
  const cartsData = await fetchCarts()
  const carts = cartsData.carts

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Carts</h1>
      
      <div className="grid grid-cols-1 gap-6">
        {carts.map((cart: any) => (
          <div key={cart.id} className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold">Cart #{cart.id}</h2>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                User: {cart.userId}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-500 text-sm">Total Products</p>
                <p className="text-xl font-semibold">{cart.totalProducts}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-500 text-sm">Total Quantity</p>
                <p className="text-xl font-semibold">{cart.totalQuantity}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-500 text-sm">Total</p>
                <p className="text-xl font-semibold">${cart.total}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded">
                <p className="text-gray-500 text-sm">Discounted Total</p>
                <p className="text-xl font-semibold">${cart.discountedTotal}</p>
              </div>
            </div>
            
            <h3 className="font-medium mb-2">Products:</h3>
            <div className="space-y-2">
              {cart.products.map((product: any) => (
                <div key={product.id} className="flex justify-between items-center p-3 border-b border-gray-100">
                  <div>
                    <p className="font-medium">{product.title}</p>
                    <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${product.price}</p>
                    <p className="text-sm text-gray-500">Total: ${product.total}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}