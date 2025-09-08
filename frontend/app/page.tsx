'use client'
import { useEffect, useState } from 'react'
import { postsAPI } from '@/lib/api'
import Link from 'next/link'

interface Post {
  id: string
  title: string
  content: any
  author: {
    name: string
    email: string
  }
  createdAt: string
  status: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAll()
      setPosts(response.docs.filter((post: Post) => post.status === 'published'))
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-center">Loading posts...</div>
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Latest Blog Posts</h1>
      
      {posts.length === 0 ? (
        <p className="text-gray-600">No posts published yet.</p>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article key={post.id} className="border-b pb-6">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/posts/${post.id}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h2>
              
              <div className="text-gray-600 mb-4">
                By {post.author.name} • {new Date(post.createdAt).toLocaleDateString()}
              </div>
              
              <div className="prose max-w-none">
                {/* Basic content preview - you can enhance this with proper rich text rendering */}
                <p>{typeof post.content === 'string' ? post.content : 'Rich content...'}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}