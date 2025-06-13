'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

export default function SearchSort() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const searchQuery = formData.get('search') as string
    router.push(`/products?${createQueryString('search', searchQuery)}`)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.push(`/products?${createQueryString('sort', e.target.value)}`)
  }

  return (
    <div className="flex items-center space-x-4">
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={searchParams.get('search') || ''}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            {/* Search icon */}
          </div>
        </div>
      </form>
      
      <select 
        onChange={handleSortChange}
        defaultValue={searchParams.get('sort') || ''}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Sort by</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating-asc">Rating: Low to High</option>
        <option value="rating-desc">Rating: High to Low</option>
      </select>
    </div>
  )
}