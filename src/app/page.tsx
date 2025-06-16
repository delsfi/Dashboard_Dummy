import DataCard from '@/components/DataCard'
import Charts from '@/components/Charts'
import { fetchProducts, fetchCarts, fetchRecipes, fetchPosts } from '@/utils/api'
import { Package, Utensils, ShoppingCart, FileText } from 'lucide-react'

export default async function Dashboard() {
  const [products, carts, recipes, posts] = await Promise.all([
    fetchProducts(),
    fetchCarts(),
    fetchRecipes(),
    fetchPosts()
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DataCard 
          title="Total Products" 
          value={products.total} 
          change="+12%"
          icon={<Package className="w-5 h-5 text-blue-600" />}
        />
        <DataCard 
          title="Total Recipes" 
          value={recipes.total} 
          change="+5%"
          icon={<Utensils className="w-5 h-5 text-green-600" />}
        />
        <DataCard 
          title="Total Carts" 
          value={carts.total} 
          change="+8%"
          icon={<ShoppingCart className="w-5 h-5 text-orange-600" />}
        />
        <DataCard 
          title="Total Posts" 
          value={posts.total} 
          change="+15%"
          icon={<FileText className="w-5 h-5 text-purple-600" />}
        />
      </div>

      {/* Charts */}
      <Charts products={products.products} carts={carts.carts} />
      
      {/* Recent Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Products</h2>
          <div className="space-y-4">
            {products.products.slice(0, 5).map((product: any) => (
              <div key={product.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <div>
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-sm text-gray-500">${product.price}</p>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${product.rating >= 4 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                  {product.rating} ★
                </span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Recipes</h2>
          <div className="space-y-4">
            {recipes.recipes.slice(0, 5).map((recipe: any) => (
              <div key={recipe.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded">
                <div>
                  <h3 className="font-medium">{recipe.name}</h3>
                  <p className="text-sm text-gray-500">{recipe.mealType.join(', ')}</p>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                  {recipe.cookTimeMinutes} min
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}