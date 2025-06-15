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
    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 w-full">
      {/* Search Input - Full width on mobile, normal on desktop */}
      <form onSubmit={handleSearch} className="w-full md:w-auto">
        <div className="relative w-full">
          <input
            type="text"
            name="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={searchParams.get('search') || ''}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </form>
      
      {/* Sort Select - Full width on mobile, normal on desktop */}
      <div className="w-full md:w-auto">
        <select 
          onChange={handleSortChange}
          defaultValue={searchParams.get('sort') || ''}
          className="w-full px-4 py-2 border border-gray500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="rating-desc">Rating: High to Low</option>
        </select>
      </div>
    </div>
  )
}