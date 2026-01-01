import SearchBar from '@/components/SearchBar'
import ArtistCard from '@/components/ArtistCard'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

async function getStats() {
  const { count: total } = await supabase
    .from('artists')
    .select('*', { count: 'exact', head: true })

  const { count: confirmed } = await supabase
    .from('artists')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'confirmed_human')

  const { count: flagged } = await supabase
    .from('artists')
    .select('*', { count: 'exact', head: true })
    .in('status', ['suspected_ai', 'confirmed_ai'])

  return {
    total: total || 0,
    confirmed: confirmed || 0,
    flagged: flagged || 0,
  }
}

async function getRecentArtists() {
  const { data } = await supabase
    .from('artists')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6)

  return data || []
}

export default async function Home() {
  const [stats, recentArtists] = await Promise.all([getStats(), getRecentArtists()])

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Is This Artist Human or AI?
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            The authoritative database tracking authenticity in music. Search for any artist to see their verification status.
          </p>
          <div className="flex justify-center mb-12">
            <SearchBar size="lg" />
          </div>

          {/* Stats - Clickable */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <a
              href="/artists?filter=all"
              className="group cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="text-3xl font-bold text-gray-900 group-hover:text-gray-700">{stats.total}</div>
              <div className="text-sm text-gray-500">Artists Tracked</div>
            </a>
            <a
              href="/artists?filter=confirmed_human"
              className="group cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="text-3xl font-bold text-green-600 group-hover:text-green-500">{stats.confirmed}</div>
              <div className="text-sm text-gray-500">Confirmed Human</div>
            </a>
            <a
              href="/artists?filter=suspected_ai"
              className="group cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="text-3xl font-bold text-yellow-600 group-hover:text-yellow-500">{stats.flagged}</div>
              <div className="text-sm text-gray-500">Flagged as AI</div>
            </a>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            As AI-generated music becomes increasingly sophisticated, listeners deserve transparency.
            PeopleMusic maintains a verified database of artists, distinguishing human creators from
            AI-generated content. We believe in supporting authentic human artistry while acknowledging
            the evolving landscape of music creation.
          </p>
        </div>
      </section>

      {/* Submit CTA - Moved above Recently Added */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a
            href="/submit"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 mb-6"
          >
            Submit an Artist
          </a>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Know an artist we should add?</h2>
          <p className="text-gray-600">
            Help us build the most comprehensive database of verified artists. Submit information
            about artists you believe should be included.
          </p>
        </div>
      </section>

      {/* Recent Additions */}
      {recentArtists.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recently Added</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentArtists.map((artist) => (
                <ArtistCard key={artist.id} artist={artist} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Support CTA - Full button below Recently Added */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Support This Project</h2>
          <p className="text-gray-600 mb-8">
            PeopleMusic is an independent project. Your support helps us maintain the database,
            improve verification methods, and keep the service free for everyone.
          </p>
          <a
            href="/support"
            className="inline-block w-full max-w-md bg-black text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-gray-800"
          >
            Support PeopleMusic
          </a>
        </div>
      </section>
    </div>
  )
}
