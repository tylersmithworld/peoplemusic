import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ytvwmsdhnfujmlqatvqv.supabase.co'
const supabaseServiceKey = 'sb_secret_x0s_XFmkwjpjD5_nCzTZmA_BXKTw-Bh'
const supabase = createClient(supabaseUrl, supabaseServiceKey)

const newAiArtists = [
  // Confirmed AI
  {
    name: 'Aventhis',
    slug: 'aventhis',
    status: 'confirmed_ai',
    monthly_listeners: 1000000,
    genres: ['Outlaw Country', 'Country Rock'],
    evidence_summary: 'Uhmbrella analysis confirmed 57 tracks created with Suno (26.5%) and Riffusion (65.9%). Creator David Vieira acknowledged AI use. "Mercy On My Grave" (2.4M streams) was 65.9% Riffusion.',
  },
  {
    name: 'Cain Walker',
    slug: 'cain-walker',
    status: 'confirmed_ai',
    monthly_listeners: 1300000,
    genres: ['Country'],
    evidence_summary: '"Don\'t Tread On Me" hit #3 on Billboard Country Digital Song Sales. 100% AI-generated songs at #3, #9, #11 simultaneously. No live performances, no microphone - just machine learning voice.',
  },
  {
    name: 'Spalexma',
    slug: 'spalexma',
    status: 'confirmed_ai',
    monthly_listeners: 100000,
    genres: ['Christian', 'Faith-based'],
    evidence_summary: '"We Are Charlie Kirk" debuted #26 on Billboard Hot Christian Songs, peaked #21. 58,000+ TikTok videos. Deezer confirmed AI. Anonymous, ~280 songs since Dec 2024, 15+ albums in 2025.',
  },
  {
    name: 'Blow Records',
    slug: 'blow-records',
    status: 'confirmed_ai',
    monthly_listeners: 500000,
    genres: ['Various'],
    evidence_summary: 'Highest-earning AI artist on Spotify. ~$150,000+ earned since June 2025 (4x average UK wage). 45M+ streams in 2025.',
  },
  {
    name: 'Biscuit Beats',
    slug: 'biscuit-beats',
    status: 'confirmed_ai',
    monthly_listeners: 196500,
    genres: ['Country', 'Parody', 'Novelty'],
    evidence_summary: 'Second-highest-earning AI artist ($85,000+ in 2025). Explicit parody country songs. Most popular song has 4M+ listens. ~25M Spotify streams in 2025.',
  },
  {
    name: 'Imoliver',
    slug: 'imoliver',
    status: 'confirmed_ai',
    monthly_listeners: 50000,
    genres: ['Ambient', 'Electronic', 'Soundscapes'],
    evidence_summary: 'First "AI music designer" to sign traditional record deal (Hallwood Media, July 2025). Uses Suno platform. Creates "lush sonic landscapes."',
  },
  {
    name: 'King Lizard Wizard',
    slug: 'king-lizard-wizard',
    status: 'confirmed_ai',
    monthly_listeners: 0,
    genres: ['Psychedelic Rock', 'Experimental'],
    evidence_summary: 'AI clone of King Gizzard & the Lizard Wizard. Used same song titles/lyrics. Low-effort AI cover art. Listed Stu Mackenzie as "composer." Removed by Spotify after weeks undetected.',
  },
  {
    name: 'HAVEN.',
    slug: 'haven-ai',
    status: 'confirmed_ai',
    monthly_listeners: 0,
    genres: ['House', 'Dance', 'Electronic'],
    evidence_summary: '"I Run" had 13M+ streams before removal. Audio engineer Matt Cahill confirmed vocals fed through Suno. Removed for artist impersonation (resembled Jorja Smith). Re-released with human vocalist.',
  },
  // Suspected AI - Cover bands / stream farming
  {
    name: 'Terry and the Dustriders',
    slug: 'terry-and-the-dustriders',
    status: 'suspected_ai',
    monthly_listeners: 0,
    genres: ['Country Covers'],
    evidence_summary: 'Millions of streams with covers. Fake bio claiming "coal mining town in West Virginia" (debunked by locals). Different singers per song. No social media. No ASCAP/BMI. Removed from Spotify.',
  },
  {
    name: 'Highway Outlaws',
    slug: 'highway-outlaws',
    status: 'suspected_ai',
    monthly_listeners: 100000,
    genres: ['Country Covers'],
    evidence_summary: 'Fits fake AI cover band pattern. Zero social media. ChatGPT-sounding bio. No originals, only covers across decades/genres.',
  },
  {
    name: 'Waterfront Wranglers',
    slug: 'waterfront-wranglers',
    status: 'suspected_ai',
    monthly_listeners: 100000,
    genres: ['Country Covers'],
    evidence_summary: 'Same pattern as fake cover bands. No online presence. Generic cover albums.',
  },
  {
    name: 'Saltwater Saddles',
    slug: 'saltwater-saddles',
    status: 'suspected_ai',
    monthly_listeners: 100000,
    genres: ['Country Covers'],
    evidence_summary: 'Same pattern. Zero social media. ChatGPT-style bio. Only covers.',
  },
  {
    name: 'Aria Sai',
    slug: 'aria-sai',
    status: 'suspected_ai',
    monthly_listeners: 71300,
    genres: ['Pop'],
    evidence_summary: 'Social media depicts "entirely AI-generated existence." Bot-like characteristics. No verifiable human identity.',
  },
  // PFC Ghost Artists
  {
    name: 'They Dream By Day',
    slug: 'they-dream-by-day',
    status: 'suspected_ai',
    monthly_listeners: 200000,
    genres: ['Ambient', 'Chill'],
    evidence_summary: 'Connected to Epidemic Sound PFC program. Replaced Brian Eno, Bibio, Jon Hopkins on Spotify\'s Ambient Chill playlist in 2017.',
  },
  {
    name: 'LUCHS',
    slug: 'luchs',
    status: 'suspected_ai',
    monthly_listeners: 150000,
    genres: ['Ambient', 'Chill'],
    evidence_summary: 'Epidemic Sound production. Part of Perfect Fit Content playlist stuffing scheme.',
  },
  {
    name: 'Silver Maple',
    slug: 'silver-maple',
    status: 'suspected_ai',
    monthly_listeners: 100000,
    genres: ['Ambient'],
    evidence_summary: 'Replaced Brian Eno on ambient playlists. Described as "a non-existent who of music." Part of PFC scheme.',
  },
]

async function seed() {
  console.log('Adding new AI artists from research...')

  let added = 0
  for (const artist of newAiArtists) {
    const { error } = await supabase
      .from('artists')
      .upsert(artist, { onConflict: 'slug' })

    if (error) {
      console.log(`  Skip: ${artist.name} (${error.message})`)
    } else {
      console.log(`  Added: ${artist.name}`)
      added++
    }
  }

  console.log(`\nAdded ${added} AI artists`)

  // Final count
  const { data } = await supabase.from('artists').select('status')
  const counts: Record<string, number> = {}
  data?.forEach(a => counts[a.status] = (counts[a.status] || 0) + 1)

  console.log('\nDatabase totals:')
  console.log(`  Total: ${data?.length}`)
  console.log(`  Confirmed Human: ${counts.confirmed_human || 0}`)
  console.log(`  Suspected AI: ${counts.suspected_ai || 0}`)
  console.log(`  Confirmed AI: ${counts.confirmed_ai || 0}`)
  console.log(`  Unverified: ${counts.unverified || 0}`)
}

seed()
