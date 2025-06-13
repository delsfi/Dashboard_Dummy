import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="w-64 bg-blue-900 text-white p-4 hidden md:block">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Modern Dashboard</h1>
      </div>
      <ul className="space-y-2">
        <li>
          <Link href="/" className="block py-2 px-4 rounded hover:bg-blue-800">
            Dashboard
          </Link>
        </li>
        <li>
          <Link href="/products" className="block py-2 px-4 rounded hover:bg-blue-800">
            Products
          </Link>
        </li>
        <li>
          <Link href="/recipes" className="block py-2 px-4 rounded hover:bg-blue-800">
            Recipes
          </Link>
        </li>
        <li>
          <Link href="/carts" className="block py-2 px-4 rounded hover:bg-blue-800">
            Carts
          </Link>
        </li>
      </ul>
    </nav>
  )
}