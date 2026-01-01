import { supabase } from '@/lib/supabase'
import SearchBar from '@/components/SearchBar'
import ArtistCard from '@/components/ArtistCard'
import { Metadata } from 'next'

interface PageProps {
  searchParams: { q?: string }
}

export function generateMetadata({ searchParams }: PageProps): Metadata {
  const query = searchParams.q || ''
  return {
    title: query ? `Search: ${query} - PeopleMusic` : 'Search - PeopleMusic',
  }
}

async function searchArtists(query: string) {
  if (!query.trim()) return []

  const { data } = await supabase
    .from('artists')
    .select('*')
    .ilike('name', `%${query}%`)
    .order('monthly_listeners', { ascending: false, nullsFirst: false })
    .limit(50)

  return data || []
}

export default async function SearchPage({ searchParams }: PageProps) {
  const query = searchParams.q || ''
  const artists = await searchArtists(query)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Search Artists</h1>

      <div className="mb-8">
        <SearchBar initialValue={query} />
      </div>

      {query && (
        <div className="mb-6">
          <p className="text-gray-600">
            {artists.length} result{artists.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
          </p>
        </div>
      )}

      {artists.length > 0 ? (
        <div className="space-y-4">
          {artists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No artists found matching &ldquo;{query}&rdquo;</p>
          <p className="text-sm text-gray-400">
            Know this artist?{' '}
            <a href="/submit" className="text-black underline hover:no-underline">
              Submit them
            </a>{' '}
            to our database.
          </p>
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">Enter an artist name to search</p>
        </div>
      )}
    </div>
  )
}
