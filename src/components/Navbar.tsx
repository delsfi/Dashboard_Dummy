'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Hamburger Button - Left Side (Hanya muncul ketika menu tertutup) */}
      {!isOpen && (
        <div className="md:hidden fixed top-4 left-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="text-blue-900 focus:outline-none bg-white p-2 rounded-md shadow"
            aria-label="Open menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 h-full w-64 bg-blue-900 text-white p-4 transform transition-all duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 md:relative`}
      >
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Menu Dashboard</h1>
        </div>
        <ul className="space-y-2">
          <li>
            <Link 
              href="/" 
              className="block py-2 px-4 rounded hover:bg-blue-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              href="/products" 
              className="block py-2 px-4 rounded hover:bg-blue-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
          </li>
          <li>
            <Link 
              href="/recipes" 
              className="block py-2 px-4 rounded hover:bg-blue-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Recipes
            </Link>
          </li>
          <li>
            <Link 
              href="/carts" 
              className="block py-2 px-4 rounded hover:bg-blue-800 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Carts
            </Link>
          </li>
        </ul>
      </nav>

      {/* Overlay for mobile (Juga berfungsi sebagai tombol close) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}