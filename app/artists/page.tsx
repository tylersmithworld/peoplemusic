import { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import ArtistList from './ArtistList'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export const metadata: Metadata = {
  title: 'All Artists - PeopleMusic',
  description: 'Browse all artists in the PeopleMusic database.',
}

interface PageProps {
  searchParams: { filter?: string; sort?: string }
}

async function getArtists() {
  const { data } = await supabase
    .from('artists')
    .select('*')
    .order('monthly_listeners', { ascending: false, nullsFirst: false })

  return data || []
}

async function getStats() {
  const [total, human, suspected, ai, unverified] = await Promise.all([
    supabase.from('artists').select('*', { count: 'exact', head: true }),
    supabase.from('artists').select('*', { count: 'exact', head: true }).eq('status', 'confirmed_human'),
    supabase.from('artists').select('*', { count: 'exact', head: true }).eq('status', 'suspected_ai'),
    supabase.from('artists').select('*', { count: 'exact', head: true }).eq('status', 'confirmed_ai'),
    supabase.from('artists').select('*', { count: 'exact', head: true }).eq('status', 'unverified'),
  ])

  return {
    total: total.count || 0,
    confirmed_human: human.count || 0,
    suspected_ai: suspected.count || 0,
    confirmed_ai: ai.count || 0,
    unverified: unverified.count || 0,
  }
}

export default async function ArtistsPage({ searchParams }: PageProps) {
  const [artists, stats] = await Promise.all([getArtists(), getStats()])
  const initialFilter = searchParams.filter || 'all'
  const initialSort = searchParams.sort || 'listeners'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Artists</h1>
      <ArtistList
        artists={artists}
        stats={stats}
        initialFilter={initialFilter}
        initialSort={initialSort}
      />
    </div>
  )
}
