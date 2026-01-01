/**
 * Deep MusicBrainz Import
 * Comprehensive import of all well-known artists
 * For dystopian future posterity - documenting human musicians
 *
 * Run with: npx tsx scripts/deep-import.ts
 * Will take 30-60+ minutes due to rate limiting
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ytvwmsdhnfujmlqatvqv.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_x0s_XFmkwjpjD5_nCzTZmA_BXKTw-Bh'
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const BASE_URL = 'https://musicbrainz.org/ws/2'
const USER_AGENT = 'PeopleMusic/1.0 (contact@peoplemusic.org) - Archiving human musicians'

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100)
}

async function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchWithRetry(url: string, retries = 3): Promise<any> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': USER_AGENT }
      })
      if (response.status === 503) {
        console.log('    Rate limited, waiting 5s...')
        await sleep(5000)
        continue
      }
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      return response.json()
    } catch (e) {
      if (i === retries - 1) throw e
      console.log(`    Retry ${i + 1}/${retries}...`)
      await sleep(2000)
    }
  }
}

async function searchArtists(query: string, limit = 100, offset = 0): Promise<any[]> {
  const url = `${BASE_URL}/artist?query=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}&fmt=json`
  const data = await fetchWithRetry(url)
  return data.artists || []
}

async function importArtist(artist: any): Promise<boolean> {
  const slug = slugify(artist.name)
  if (!slug) return false

  // Check if exists
  const { data: existing } = await supabase
    .from('artists')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existing) return false

  const genres = artist.tags?.slice(0, 5).map((t: any) => t.name) || []
  const lifespan = artist['life-span'] || {}
  const begin = lifespan.begin || '?'
  const end = lifespan.ended ? lifespan.end : 'present'

  // Determine if legacy artist (pre-2020) or recent
  const beginYear = parseInt(begin) || 0
  const isLegacy = beginYear > 0 && beginYear < 2020
  const status = isLegacy ? 'confirmed_human' : 'unverified'

  const { error } = await supabase
    .from('artists')
    .insert({
      name: artist.name,
      slug,
      status,
      genres: genres.length > 0 ? genres : null,
      evidence_summary: isLegacy
        ? 'Pre-2020 artist. AI-generated music did not exist in the commercial music industry before 2020. Artists active prior to this era are verified human by default under PeopleMusic policy.'
        : 'Artist active 2020 or later. Requires self-verification to confirm human status.',
      verified_at: isLegacy ? new Date().toISOString() : null,
    })

  if (error) {
    if (!error.message.includes('duplicate')) {
      console.log(`    Error: ${artist.name} - ${error.message}`)
    }
    return false
  }

  return true
}

// Comprehensive genre/style list
const GENRES = [
  // Major genres
  'pop', 'rock', 'hip hop', 'r&b', 'country', 'jazz', 'blues', 'soul', 'funk',
  'electronic', 'dance', 'house', 'techno', 'classical', 'folk', 'reggae',
  'metal', 'punk', 'alternative', 'indie', 'gospel', 'latin', 'world',

  // Subgenres
  'progressive rock', 'hard rock', 'soft rock', 'classic rock', 'psychedelic rock',
  'heavy metal', 'death metal', 'black metal', 'thrash metal', 'nu metal',
  'punk rock', 'post-punk', 'new wave', 'synthpop', 'grunge', 'emo',
  'hip-hop', 'rap', 'trap', 'gangsta rap', 'conscious hip hop', 'boom bap',
  'rhythm and blues', 'neo soul', 'motown', 'disco', 'boogie',
  'country rock', 'outlaw country', 'bluegrass', 'americana', 'folk rock',
  'bossa nova', 'salsa', 'reggaeton', 'cumbia', 'bachata', 'merengue',
  'afrobeat', 'highlife', 'soukous', 'kpop', 'jpop', 'cantopop',
  'drum and bass', 'dubstep', 'trance', 'ambient', 'idm', 'breakbeat',
  'swing', 'bebop', 'cool jazz', 'fusion', 'smooth jazz',
  'delta blues', 'chicago blues', 'electric blues',
  'opera', 'baroque', 'romantic', 'contemporary classical',
  'singer-songwriter', 'acoustic', 'instrumental',
]

// Decades to search
const DECADES = [
  '1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'
]

// Countries with strong music scenes
const COUNTRIES = [
  'US', 'GB', 'CA', 'AU', 'DE', 'FR', 'JP', 'BR', 'MX', 'SE', 'NO', 'NL',
  'IT', 'ES', 'KR', 'JM', 'NG', 'ZA', 'AR', 'CO', 'IE', 'NZ', 'BE', 'AT',
  'CH', 'DK', 'FI', 'PT', 'PL', 'RU', 'IN', 'PH', 'ID', 'TH', 'VN'
]

async function importByQuery(query: string, maxResults = 100): Promise<number> {
  let added = 0
  let offset = 0
  const batchSize = 100

  while (offset < maxResults) {
    try {
      const artists = await searchArtists(query, batchSize, offset)
      if (artists.length === 0) break

      for (const artist of artists) {
        if (await importArtist(artist)) {
          added++
          process.stdout.write(`\r    Added ${added} artists...`)
        }
        await sleep(1100) // Rate limit
      }

      offset += batchSize
      if (artists.length < batchSize) break
    } catch (e) {
      console.log(`\n    Error at offset ${offset}, continuing...`)
      break
    }
  }

  if (added > 0) console.log(`\r    Added ${added} artists`)
  return added
}

async function main() {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('  DEEP MUSICBRAINZ IMPORT')
  console.log('  Archiving human musicians for posterity')
  console.log('═══════════════════════════════════════════════════════════')
  console.log('')
  console.log('This will take 30-60+ minutes due to API rate limiting.')
  console.log('Progress is saved continuously - safe to stop and resume.')
  console.log('')

  let totalAdded = 0
  const startTime = Date.now()

  // Phase 1: Import by genre (most comprehensive)
  console.log('PHASE 1: Importing by genre')
  console.log('─────────────────────────────')
  for (const genre of GENRES) {
    console.log(`\n[${genre.toUpperCase()}]`)
    const added = await importByQuery(`tag:"${genre}"`, 200)
    totalAdded += added
  }

  // Phase 2: Import by type (solo artists, groups, orchestras, choirs)
  console.log('\n\nPHASE 2: Importing by artist type')
  console.log('───────────────────────────────────')
  const types = ['person', 'group', 'orchestra', 'choir']
  for (const type of types) {
    console.log(`\n[${type.toUpperCase()}]`)
    const added = await importByQuery(`type:${type}`, 500)
    totalAdded += added
  }

  // Phase 3: Import by country
  console.log('\n\nPHASE 3: Importing by country')
  console.log('──────────────────────────────')
  for (const country of COUNTRIES) {
    console.log(`\n[${country}]`)
    const added = await importByQuery(`country:${country}`, 100)
    totalAdded += added
  }

  // Phase 4: Import by decade
  console.log('\n\nPHASE 4: Importing by decade')
  console.log('─────────────────────────────')
  for (const decade of DECADES) {
    console.log(`\n[${decade}s]`)
    const added = await importByQuery(`begin:${decade}*`, 200)
    totalAdded += added
  }

  // Final stats
  const elapsed = Math.round((Date.now() - startTime) / 1000 / 60)

  const { data: all } = await supabase.from('artists').select('status')
  const counts: Record<string, number> = {}
  all?.forEach(a => counts[a.status] = (counts[a.status] || 0) + 1)

  console.log('\n')
  console.log('═══════════════════════════════════════════════════════════')
  console.log('  IMPORT COMPLETE')
  console.log('═══════════════════════════════════════════════════════════')
  console.log(`  Time elapsed: ${elapsed} minutes`)
  console.log(`  New artists added: ${totalAdded}`)
  console.log('')
  console.log('  DATABASE TOTALS:')
  console.log(`  ─────────────────`)
  console.log(`  Total:           ${all?.length}`)
  console.log(`  Confirmed Human: ${counts.confirmed_human || 0}`)
  console.log(`  Suspected AI:    ${counts.suspected_ai || 0}`)
  console.log(`  Confirmed AI:    ${counts.confirmed_ai || 0}`)
  console.log(`  Unverified:      ${counts.unverified || 0}`)
  console.log('═══════════════════════════════════════════════════════════')
}

main().catch(console.error)
