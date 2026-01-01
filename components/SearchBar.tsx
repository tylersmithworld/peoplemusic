'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  size?: 'md' | 'lg'
  placeholder?: string
  initialValue?: string
}

export default function SearchBar({
  size = 'md',
  placeholder = 'Search for an artist...',
  initialValue = '',
}: SearchBarProps) {
  const [query, setQuery] = useState(initialValue)
  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const sizeClasses = {
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent ${sizeClasses[size]}`}
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-gray-800"
        >
          Search
        </button>
      </div>
    </form>
  )
}
