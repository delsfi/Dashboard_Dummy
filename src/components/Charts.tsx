'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

interface CategoryData {
  name: string
  count: number
}

interface PriceData {
  name: string
  price: number
}

interface CartData {
  name: string
  total: number
  discounted: number
}

interface Product {
  id: number
  title: string
  price: number
  category: string
  // Add other product properties as needed
}

interface Cart {
  id: number
  total: number
  discountedTotal: number
  // Add other cart properties as needed
}

interface ChartsProps {
  products: Product[]
  carts: Cart[]
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export default function Charts({ products, carts }: ChartsProps) {
  // Prepare data for charts with proper typing
  const categoryData = products.reduce<CategoryData[]>((acc, product) => {
    const existing = acc.find((item) => item.name === product.category)
    if (existing) {
      existing.count += 1
    } else {
      acc.push({ name: product.category, count: 1 })
    }
    return acc
  }, [])

  const priceData: PriceData[] = products
    .sort((a, b) => b.price - a.price)
    .slice(0, 5)
    .map(product => ({
      name: product.title,
      price: product.price
    }))

  const cartData: CartData[] = carts.slice(0, 5).map(cart => ({
    name: `Cart ${cart.id}`,
    total: cart.total,
    discounted: cart.discountedTotal
  }))

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Product Categories</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="name"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Top Products by Price</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="price" fill="#8884d8" name="Price ($)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}