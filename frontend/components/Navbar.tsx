'use client'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const { user, logout, loading } = useAuth()

  if (loading) {
    return <div className="bg-gray-800 text-white p-4">Loading...</div>
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Blog Platform
        </Link>
        
        <div className="flex items-center space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          
          {user ? (
            <>
              <Link href="/create-post" className="hover:text-gray-300">
                Create Post
              </Link>
              <span className="text-gray-300">
                Hello, {user.name}
              </span>
              <button
                onClick={logout}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}