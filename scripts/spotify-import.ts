/**
 * Spotify Import Script for PeopleMusic
 *
 * This script imports artists from Spotify playlists, charts, and search.
 * All imported artists start as "unverified" status.
 *
 * Setup:
 * 1. Go to https://developer.spotify.com/dashboard
 * 2. Create an app (name: PeopleMusic, redirect: http://localhost:3000)
 * 3. Copy Client ID and Client Secret
 * 4. Add to .env.local:
 *    SPOTIFY_CLIENT_ID=your_client_id
 *    SPOTIFY_CLIENT_SECRET=your_client_secret
 */

import SpotifyWebApi from 'spotify-web-api-node'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ytvwmsdhnfujmlqatvqv.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_x0s_XFmkwjpjD5_nCzTZmA_BXKTw-Bh'
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
})

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

async function authenticate() {
  const data = await spotifyApi.clientCredentialsGrant()
  spotifyApi.setAccessToken(data.body.access_token)
  console.log('Authenticated with Spotify')
}

interface SpotifyArtist {
  id: string
  name: string
  genres: string[]
  images: { url: string }[]
  followers: { total: number }
  popularity: number
}

async function importArtist(artist: SpotifyArtist, status: 'unverified' | 'confirmed_human' | 'suspected_ai' = 'unverified') {
  const slug = slugify(artist.name)

  // Check if artist already exists
  const { data: existing } = await supabase
    .from('artists')
    .select('id')
    .eq('slug', slug)
    .single()

  if (existing) {
    console.log(`  Skipping ${artist.name} (already exists)`)
    return null
  }

  const { data, error } = await supabase
    .from('artists')
    .insert({
      name: artist.name,
      slug,
      status,
      spotify_id: artist.id,
      image_url: artist.images[0]?.url || null,
      genres: artist.genres.length > 0 ? artist.genres : null,
      monthly_listeners: null, // Spotify API doesn't expose this directly
      evidence_summary: status === 'unverified'
        ? 'Imported from Spotify. Pending verification.'
        : null,
    })
    .select()
    .single()

  if (error) {
    console.error(`  Error importing ${artist.name}:`, error.message)
    return null
  }

  console.log(`  Imported: ${artist.name}`)
  return data
}

async function importFromPlaylist(playlistId: string, status: 'unverified' | 'confirmed_human' | 'suspected_ai' = 'unverified') {
  console.log(`\nImporting from playlist: ${playlistId}`)

  let offset = 0
  const limit = 100
  let total = 0
  const artists = new Map<string, SpotifyArtist>()

  while (true) {
    const response = await spotifyApi.getPlaylistTracks(playlistId, { offset, limit })
    const tracks = response.body.items

    for (const item of tracks) {
      if (item.track && 'artists' in item.track) {
        for (const artist of item.track.artists) {
          if (!artists.has(artist.id)) {
            // Get full artist details
            try {
              const artistDetails = await spotifyApi.getArtist(artist.id)
              artists.set(artist.id, artistDetails.body as SpotifyArtist)
            } catch (e) {
              console.error(`  Could not fetch artist ${artist.name}`)
            }
          }
        }
      }
    }

    offset += limit
    if (offset >= response.body.total) break
  }

  console.log(`Found ${artists.size} unique artists`)

  for (const artist of artists.values()) {
    await importArtist(artist, status)
    total++
    // Rate limiting
    await new Promise(r => setTimeout(r, 100))
  }

  return total
}

async function importTopArtists(genre: string, limit: number = 50, status: 'unverified' | 'confirmed_human' = 'unverified') {
  console.log(`\nSearching for top ${genre} artists...`)

  const response = await spotifyApi.searchArtists(`genre:${genre}`, { limit })
  const artists = response.body.artists?.items || []

  console.log(`Found ${artists.length} artists`)

  for (const artist of artists) {
    await importArtist(artist as SpotifyArtist, status)
    await new Promise(r => setTimeout(r, 100))
  }

  return artists.length
}

async function importFromSearch(query: string, limit: number = 50) {
  console.log(`\nSearching for: ${query}`)

  const response = await spotifyApi.searchArtists(query, { limit })
  const artists = response.body.artists?.items || []

  console.log(`Found ${artists.length} artists`)

  for (const artist of artists) {
    await importArtist(artist as SpotifyArtist, 'unverified')
    await new Promise(r => setTimeout(r, 100))
  }

  return artists.length
}

// Curated playlist IDs for different categories
const PLAYLISTS = {
  // Major playlists with mostly human artists
  todaysTopHits: '37i9dQZF1DXcBWIGoYBM5M',
  rapCaviar: '37i9dQZF1DX0XUsuxWHRQd',
  hotCountry: '37i9dQZF1DX1lVhptIYRda',
  popRising: '37i9dQZF1DWUa8ZRTfalHk',
  rockThis: '37i9dQZF1DXcF6B6QPhFDv',
  areAndB: '37i9dQZF1DX4SBhb3fqCJd',
  vivaLatino: '37i9dQZF1DX10zKzsJ2jva',
  mintAcoustic: '37i9dQZF1DWXmlLSKkfdAk',
  allOutHits: '37i9dQZF1DX5Ejj0EkURtP',

  // Playlists known for PFC/AI content (for flagging)
  lofiBeats: '37i9dQZF1DWWQRwui0ExPn',
  peacefulPiano: '37i9dQZF1DX4sWSpwq3LiO',
  deepFocus: '37i9dQZF1DWZeKCadgRdKQ',
  ambientRelaxation: '37i9dQZF1DWXe9gFZP0gtP',
  sleepSounds: '37i9dQZF1DWZd79rJ6a7lp',
}

async function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    console.log('Missing Spotify credentials!')
    console.log('')
    console.log('Setup instructions:')
    console.log('1. Go to https://developer.spotify.com/dashboard')
    console.log('2. Create an app')
    console.log('3. Add to .env.local:')
    console.log('   SPOTIFY_CLIENT_ID=your_client_id')
    console.log('   SPOTIFY_CLIENT_SECRET=your_client_secret')
    console.log('')
    console.log('Then run: npx tsx scripts/spotify-import.ts <command>')
    console.log('')
    console.log('Commands:')
    console.log('  top-hits     Import from Today\'s Top Hits (mainstream, likely human)')
    console.log('  hip-hop      Import from RapCaviar')
    console.log('  country      Import from Hot Country')
    console.log('  rnb          Import from R&B playlist')
    console.log('  lofi         Import from Lo-Fi Beats (flag for review)')
    console.log('  focus        Import from Deep Focus (flag for review)')
    console.log('  all-major    Import from all major genre playlists')
    console.log('  genre <name> Search for artists by genre')
    console.log('  search <q>   Search for artists by query')
    return
  }

  await authenticate()

  switch (command) {
    case 'top-hits':
      await importFromPlaylist(PLAYLISTS.todaysTopHits, 'unverified')
      break
    case 'hip-hop':
      await importFromPlaylist(PLAYLISTS.rapCaviar, 'unverified')
      break
    case 'country':
      await importFromPlaylist(PLAYLISTS.hotCountry, 'unverified')
      break
    case 'rnb':
      await importFromPlaylist(PLAYLISTS.areAndB, 'unverified')
      break
    case 'lofi':
      await importFromPlaylist(PLAYLISTS.lofiBeats, 'suspected_ai')
      break
    case 'focus':
      await importFromPlaylist(PLAYLISTS.deepFocus, 'suspected_ai')
      break
    case 'all-major':
      console.log('Importing from all major playlists...')
      await importFromPlaylist(PLAYLISTS.todaysTopHits, 'unverified')
      await importFromPlaylist(PLAYLISTS.rapCaviar, 'unverified')
      await importFromPlaylist(PLAYLISTS.hotCountry, 'unverified')
      await importFromPlaylist(PLAYLISTS.areAndB, 'unverified')
      await importFromPlaylist(PLAYLISTS.popRising, 'unverified')
      await importFromPlaylist(PLAYLISTS.rockThis, 'unverified')
      await importFromPlaylist(PLAYLISTS.vivaLatino, 'unverified')
      break
    case 'genre':
      if (args[1]) {
        await importTopArtists(args[1], 50)
      } else {
        console.log('Usage: npx tsx scripts/spotify-import.ts genre <genre-name>')
      }
      break
    case 'search':
      if (args[1]) {
        await importFromSearch(args.slice(1).join(' '), 50)
      } else {
        console.log('Usage: npx tsx scripts/spotify-import.ts search <query>')
      }
      break
    default:
      console.log('Unknown command. Run without arguments to see help.')
  }

  // Get final count
  const { count } = await supabase
    .from('artists')
    .select('*', { count: 'exact', head: true })

  console.log(`\nTotal artists in database: ${count}`)
}

main().catch(console.error)
