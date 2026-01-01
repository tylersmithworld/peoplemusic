'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Artist, ArtistStatus, statusLabels, statusColors } from '@/lib/types'

type FilterType = 'all' | ArtistStatus
type SortType = 'listeners' | 'name' | 'recent'

interface Props {
  artists: Artist[]
  stats: {
    total: number
    confirmed_human: number
    suspected_ai: number
    confirmed_ai: number
    unverified: number
  }
  initialFilter: string
  initialSort: string
}

const filterButtons: { key: FilterType; label: string; color: string }[] = [
  { key: 'all', label: 'All', color: 'bg-gray-900 text-white' },
  { key: 'confirmed_human', label: 'Human', color: 'bg-green-600 text-white' },
  { key: 'suspected_ai', label: 'Suspected AI', color: 'bg-yellow-500 text-white' },
  { key: 'confirmed_ai', label: 'Confirmed AI', color: 'bg-red-600 text-white' },
  { key: 'unverified', label: 'Unverified', color: 'bg-gray-400 text-white' },
]

const sortButtons: { key: SortType; label: string }[] = [
  { key: 'listeners', label: 'Listeners' },
  { key: 'name', label: 'Name' },
  { key: 'recent', label: 'Recent' },
]

export default function ArtistList({ artists, stats, initialFilter, initialSort }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filter, setFilter] = useState<FilterType>(initialFilter as FilterType)
  const [sort, setSort] = useState<SortType>(initialSort as SortType)

  const updateUrl = (newFilter: FilterType, newSort: SortType) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('filter', newFilter)
    params.set('sort', newSort)
    router.push(`/artists?${params.toString()}`, { scroll: false })
  }

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter)
    updateUrl(newFilter, sort)
  }

  const handleSortChange = (newSort: SortType) => {
    setSort(newSort)
    updateUrl(filter, newSort)
  }

  const filteredAndSorted = useMemo(() => {
    let result = [...artists]

    if (filter !== 'all') {
      result = result.filter((a) => a.status === filter)
    }

    switch (sort) {
      case 'listeners':
        result.sort((a, b) => (b.monthly_listeners || 0) - (a.monthly_listeners || 0))
        break
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'recent':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        break
    }

    return result
  }, [artists, filter, sort])

  const getCount = (key: FilterType) => {
    if (key === 'all') return stats.total
    return stats[key]
  }

  const formatListeners = (n: number | null) => {
    if (!n) return '—'
    if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`
    if (n >= 1000) return `${(n / 1000).toFixed(0)}K`
    return n.toString()
  }

  return (
    <div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        {filterButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => handleFilterChange(btn.key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              filter === btn.key
                ? btn.color
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {btn.label}
            <span className="ml-2 opacity-75">({getCount(btn.key)})</span>
          </button>
        ))}
      </div>

      {/* Sort Buttons */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-500">Sort by:</span>
        {sortButtons.map((btn) => (
          <button
            key={btn.key}
            onClick={() => handleSortChange(btn.key)}
            className={`px-3 py-1 rounded text-sm transition-all ${
              sort === btn.key
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        Showing {filteredAndSorted.length} artist{filteredAndSorted.length !== 1 ? 's' : ''}
      </p>

      {/* Table */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="h-[600px] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">Artist</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3 hidden sm:table-cell">Genre</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-4 py-3 hidden sm:table-cell">Listeners</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {filteredAndSorted.length > 0 ? (
                filteredAndSorted.map((artist) => {
                  const colors = statusColors[artist.status]
                  return (
                    <tr key={artist.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <Link href={`/artist/${artist.slug}`} className="font-medium text-gray-900 hover:underline">
                          {artist.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 hidden sm:table-cell">
                        {artist.genres?.slice(0, 2).join(', ') || '—'}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500 text-right hidden sm:table-cell">
                        {formatListeners(artist.monthly_listeners)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${colors.bg} ${colors.text}`}>
                          {statusLabels[artist.status]}
                        </span>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-12 text-center text-gray-400">
                    No artists found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
