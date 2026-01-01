/**
 * MusicBrainz Import Script
 * Imports artists from MusicBrainz open database
 * No API key required - just rate limited to 1 req/sec
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ytvwmsdhnfujmlqatvqv.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_x0s_XFmkwjpjD5_nCzTZmA_BXKTw-Bh'
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const BASE_URL = 'https://musicbrainz.org/ws/2'
const USER_AGENT = 'PeopleMusic/1.0 (https://peoplemusic.org)'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchMusicBrainz(endpoint: string) {
  const response = await fetch(`${BASE_URL}${endpoint}&fmt=json`, {
    headers: { 'User-Agent': USER_AGENT }
  })
  if (!response.ok) throw new Error(`MusicBrainz API error: ${response.status}`)
  return response.json()
}

async function searchArtists(query: string, limit = 100): Promise<any[]> {
  const data = await fetchMusicBrainz(`/artist?query=${encodeURIComponent(query)}&limit=${limit}`)
  return data.artists || []
}

async function importArtist(artist: any) {
  const slug = slugify(artist.name)

  // Check if exists
  const { data: existing } = await supabase
    .from('artists')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existing) {
    return null
  }

  // Extract genres from tags
  const genres = artist.tags?.slice(0, 5).map((t: any) => t.name) || []

  const { data, error } = await supabase
    .from('artists')
    .insert({
      name: artist.name,
      slug,
      status: 'unverified',
      genres: genres.length > 0 ? genres : null,
      evidence_summary: `Imported from MusicBrainz. Country: ${artist.country || 'Unknown'}. Type: ${artist.type || 'Unknown'}. Active: ${artist['life-span']?.begin || '?'} - ${artist['life-span']?.ended ? artist['life-span'].end : 'present'}.`,
    })
    .select()
    .single()

  if (error) {
    console.log(`  Skip: ${artist.name} (${error.message})`)
    return null
  }

  console.log(`  Added: ${artist.name}`)
  return data
}

async function importByGenre(genre: string, limit = 50) {
  console.log(`\nSearching for ${genre} artists...`)
  const artists = await searchArtists(`tag:${genre}`, limit)
  console.log(`Found ${artists.length} artists`)

  let added = 0
  for (const artist of artists) {
    const result = await importArtist(artist)
    if (result) added++
    await sleep(1100) // Rate limit: 1 req/sec
  }
  return added
}

async function importPopularArtists() {
  // Search queries that return popular/well-known artists
  const searches = [
    'type:group AND tag:pop',
    'type:group AND tag:rock',
    'type:person AND tag:pop',
    'type:person AND tag:hip-hop',
    'type:person AND tag:r&b',
    'type:person AND tag:country',
    'type:group AND tag:hip-hop',
    'type:person AND tag:rock',
    'type:group AND tag:alternative',
    'type:person AND tag:electronic',
  ]

  let totalAdded = 0

  for (const query of searches) {
    console.log(`\nSearching: ${query}`)
    try {
      const artists = await searchArtists(query, 25)
      console.log(`Found ${artists.length} artists`)

      for (const artist of artists) {
        const result = await importArtist(artist)
        if (result) totalAdded++
        await sleep(1100)
      }
    } catch (e) {
      console.error(`Error with query "${query}":`, e)
    }
  }

  return totalAdded
}

async function main() {
  const command = process.argv[2]

  console.log('MusicBrainz Import')
  console.log('==================')
  console.log('Rate limited to 1 request/second\n')

  switch (command) {
    case 'popular':
      console.log('Importing popular artists across genres...')
      const added = await importPopularArtists()
      console.log(`\nAdded ${added} artists`)
      break

    case 'genre':
      const genre = process.argv[3]
      if (!genre) {
        console.log('Usage: npx tsx scripts/musicbrainz-import.ts genre <genre>')
        console.log('Examples: pop, rock, hip-hop, country, r&b, electronic, jazz')
        return
      }
      await importByGenre(genre, 50)
      break

    default:
      console.log('Commands:')
      console.log('  popular         Import popular artists across multiple genres')
      console.log('  genre <name>    Import artists from specific genre')
      console.log('')
      console.log('Examples:')
      console.log('  npx tsx scripts/musicbrainz-import.ts popular')
      console.log('  npx tsx scripts/musicbrainz-import.ts genre rock')
  }

  // Show final count
  const { count } = await supabase
    .from('artists')
    .select('*', { count: 'exact', head: true })
  console.log(`\nTotal artists in database: ${count}`)
}

main().catch(console.error)
