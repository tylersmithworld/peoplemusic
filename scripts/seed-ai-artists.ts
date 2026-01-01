import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ytvwmsdhnfujmlqatvqv.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_x0s_XFmkwjpjD5_nCzTZmA_BXKTw-Bh'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const confirmedAiArtists = [
  // Openly AI-Generated Artists
  {
    name: 'The Velvet Sundown',
    slug: 'the-velvet-sundown',
    status: 'confirmed_ai',
    monthly_listeners: 268000,
    genres: ['Pop', 'Rock'],
    evidence_summary: 'Publicly revealed as AI "art hoax" on July 5, 2025. Created using Suno AI. Part of experiment to demonstrate AI music can fool listeners and gain significant streaming numbers.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Aventhis',
    slug: 'aventhis',
    status: 'confirmed_ai',
    monthly_listeners: 1072000,
    genres: ['Outlaw Country', 'Country'],
    evidence_summary: 'Uhmbrella analysis confirmed 57 tracks are AI-generated. Breakdown: Suno (26.5%), Riffusion (65.9%). Verified Spotify artist with over 1M monthly listeners. Fake personas and AI-generated faces.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'The Devil Inside',
    slug: 'the-devil-inside',
    status: 'confirmed_ai',
    monthly_listeners: 700000,
    genres: ['Rock', 'Metal'],
    evidence_summary: 'Uhmbrella analysis shows 99.654% Suno AI probability. Uses fake personas and AI-generated faces for band members.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Breaking Rust',
    slug: 'breaking-rust',
    status: 'confirmed_ai',
    monthly_listeners: 100000,
    genres: ['Outlaw Country', 'Blues', 'Country'],
    evidence_summary: 'AI-generated artist that hit #1 on Billboard Country Digital Sales chart. Created by Aubierre Rivaldo Taylor. Song "Walk My Walk" charted in 2025.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Xania Monet',
    slug: 'xania-monet',
    status: 'confirmed_ai',
    monthly_listeners: 50000,
    genres: ['Gospel', 'R&B'],
    evidence_summary: 'AI vocals confirmed. Signed to Hallwood Media. First known AI artist on Billboard radio chart (Adult R&B Airplay). Songs "How Was I Supposed to Know" and "Let Go, Let God" charted on Hot Gospel Songs.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Anna Indiana',
    slug: 'anna-indiana',
    status: 'confirmed_ai',
    monthly_listeners: 30000,
    genres: ['Pop'],
    evidence_summary: 'Publicly revealed AI artist powered by Musicfy. Debut single "Betrayed by this Town" released November 2023. Openly marketed as AI-generated.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Nick Hustles',
    slug: 'nick-hustles',
    status: 'confirmed_ai',
    monthly_listeners: 25000,
    genres: ['Soul', 'Hip-Hop'],
    evidence_summary: 'AI-generated artist with AI-looking artist imagery. Combines 70s soul aesthetic with modern lyrics. Part of the wave of AI artists infiltrating streaming platforms.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Cain Walker',
    slug: 'cain-walker',
    status: 'confirmed_ai',
    monthly_listeners: 40000,
    genres: ['R&B', 'Country'],
    evidence_summary: 'AI R&B singer. Song "Don\'t Tread On Me" reached #3 on Billboard Country Digital Sales chart.',
    verified_at: new Date().toISOString(),
  },
  // Hallwood Media AI Roster
  {
    name: 'China Styles',
    slug: 'china-styles',
    status: 'confirmed_ai',
    monthly_listeners: 20000,
    genres: ['Pop'],
    evidence_summary: 'Part of Hallwood Media roster of AI-generated artists.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Bleeding Verse',
    slug: 'bleeding-verse',
    status: 'confirmed_ai',
    monthly_listeners: 80000,
    genres: ['Rock'],
    evidence_summary: 'Hallwood Media AI artist. Notably gained more Spotify listeners than real Cardiff band Holding Absence, causing controversy.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Drew Meadows',
    slug: 'drew-meadows',
    status: 'confirmed_ai',
    monthly_listeners: 15000,
    genres: ['Country', 'Folk'],
    evidence_summary: 'Part of Hallwood Media roster of AI-generated artists.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Lone Star Lyric House',
    slug: 'lone-star-lyric-house',
    status: 'confirmed_ai',
    monthly_listeners: 25000,
    genres: ['Country'],
    evidence_summary: 'Hallwood Media AI artist focused on country music.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'David Sven',
    slug: 'david-sven',
    status: 'confirmed_ai',
    monthly_listeners: 18000,
    genres: ['Pop'],
    evidence_summary: 'Part of Hallwood Media roster of AI-generated artists.',
    verified_at: new Date().toISOString(),
  },
  // Blow Records AI Artists
  {
    name: 'Beats by AI',
    slug: 'beats-by-ai',
    status: 'confirmed_ai',
    monthly_listeners: 200000,
    genres: ['Lo-fi', 'Electronic'],
    evidence_summary: 'Part of Blow Records roster. Label reportedly earning 4x average UK wage in Spotify royalties from AI-generated music.',
    verified_at: new Date().toISOString(),
  },
  // AI Music Pioneers
  {
    name: 'Taryn Southern',
    slug: 'taryn-southern',
    status: 'confirmed_ai',
    monthly_listeners: 5000,
    genres: ['Pop', 'Electronic'],
    evidence_summary: 'Released "I AM AI" in 2018 - the first solo artist album composed with AI (Amper Music). Openly documented AI collaboration.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Dadabots',
    slug: 'dadabots',
    status: 'confirmed_ai',
    monthly_listeners: 10000,
    genres: ['Death Metal', 'Experimental'],
    evidence_summary: 'AI music project running 24/7 YouTube livestream of AI-generated death metal since 2019. Album "Coditany of Timeness" (2017). Uses custom neural networks.',
    verified_at: new Date().toISOString(),
  },
  // Virtual/Synthetic Artists
  {
    name: 'Hatsune Miku',
    slug: 'hatsune-miku',
    status: 'confirmed_ai',
    monthly_listeners: 3300000,
    genres: ['J-Pop', 'Electronic', 'Vocaloid'],
    evidence_summary: 'Virtual idol using VOCALOID voice synthesis since 2007. Not generative AI but synthetic voice. Massive cultural phenomenon with live hologram concerts.',
    verified_at: new Date().toISOString(),
  },
  // FN Meka Controversy
  {
    name: 'FN Meka',
    slug: 'fn-meka',
    status: 'confirmed_ai',
    monthly_listeners: 0,
    genres: ['Hip-Hop', 'Rap'],
    evidence_summary: 'Virtual AI rapper signed to Capitol Records August 2022, dropped 9 days later. Accused of "digital blackface" and cultural appropriation. Had 10M TikTok followers. Real voice was rapper Kyle the Hooligan (not disclosed). Created by Factory New (Anthony Martini, Brandon Le).',
    verified_at: new Date().toISOString(),
  },
  // Viral AI Songs
  {
    name: 'Ghostwriter',
    slug: 'ghostwriter-ai',
    status: 'confirmed_ai',
    monthly_listeners: 0,
    genres: ['Hip-Hop', 'R&B'],
    evidence_summary: 'Anonymous producer who created "Heart on My Sleeve" - fake Drake/Weeknd AI collaboration in April 2023. Got 625K Spotify plays, 15M+ TikTok views before takedown by UMG. Drake called it "the final straw AI."',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Vinih Pray',
    slug: 'vinih-pray',
    status: 'confirmed_ai',
    monthly_listeners: 50000,
    genres: ['Pop'],
    evidence_summary: 'Created with Suno AI. Song "A Million Colors" went viral on TikTok Viral 50.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Splaxema',
    slug: 'splaxema',
    status: 'confirmed_ai',
    monthly_listeners: 30000,
    genres: ['Meme', 'Electronic'],
    evidence_summary: 'AI-generated artist. Song "We Are Charlie Kirk" hit #1 on Spotify Viral 50 U.S. as popular TikTok meme.',
    verified_at: new Date().toISOString(),
  },
]

const suspectedAiArtists = [
  // PFC (Perfect Fit Content) Fake Artists - Johan Rohr network
  {
    name: 'Maya Astrom',
    slug: 'maya-astrom',
    status: 'suspected_ai',
    monthly_listeners: 500000,
    genres: ['Lo-fi', 'Ambient'],
    evidence_summary: 'Pseudonym linked to Johan Rohr network of 656+ fake artists with 15 billion total streams. Part of "Perfect Fit Content" controversy exposed by Harper\'s Magazine.',
  },
  {
    name: 'Minik Knudsen',
    slug: 'minik-knudsen',
    status: 'suspected_ai',
    monthly_listeners: 300000,
    genres: ['Ambient', 'Electronic'],
    evidence_summary: 'Pseudonym linked to Johan Rohr network. Part of Swedish producer operation creating 500+ fake artists for playlist placement.',
  },
  {
    name: 'Mingmei Hsueh',
    slug: 'mingmei-hsueh',
    status: 'suspected_ai',
    monthly_listeners: 400000,
    genres: ['Piano', 'Classical'],
    evidence_summary: 'Pseudonym linked to Johan Rohr network. Ethnic-sounding names used to create appearance of diverse artist roster.',
  },
  {
    name: 'Csizmazia Etel',
    slug: 'csizmazia-etel',
    status: 'suspected_ai',
    monthly_listeners: 200000,
    genres: ['Ambient', 'Relaxation'],
    evidence_summary: 'Pseudonym linked to Johan Rohr network of fake artists.',
  },
  {
    name: 'Adelmar Borrego',
    slug: 'adelmar-borrego',
    status: 'suspected_ai',
    monthly_listeners: 350000,
    genres: ['Guitar', 'Acoustic'],
    evidence_summary: 'Pseudonym linked to Johan Rohr network of fake artists.',
  },
  // Firefly Entertainment
  {
    name: 'Ekfat',
    slug: 'ekfat',
    status: 'suspected_ai',
    monthly_listeners: 3000000,
    genres: ['Lo-fi', 'Chill'],
    evidence_summary: 'Part of Firefly Entertainment network of 830+ fake/AI artists. Major playlist presence despite no verifiable artist identity.',
  },
  // Chillmi Network
  {
    name: 'Chillmi',
    slug: 'chillmi',
    status: 'suspected_ai',
    monthly_listeners: 2000000,
    genres: ['Lo-fi', 'Chill', 'Study'],
    evidence_summary: 'Network created by Christer Sandelin since 2015. Over 2 billion streams across various "chill" pseudonyms. Part of PFC controversy.',
  },
  // HAVEN controversy
  {
    name: 'HAVEN.',
    slug: 'haven-artist',
    status: 'suspected_ai',
    monthly_listeners: 100000,
    genres: ['Pop', 'Electronic'],
    evidence_summary: 'Song "I Run" reached Spotify U.S. and Global 50. Creators claim only vocals were AI-processed, but full AI generation suspected.',
  },
  // More suspected lo-fi/ambient AI
  {
    name: 'Quiet Mind Music',
    slug: 'quiet-mind-music',
    status: 'suspected_ai',
    monthly_listeners: 800000,
    genres: ['Meditation', 'Ambient'],
    evidence_summary: 'Prolific release schedule typical of AI generation. No artist identity, interviews, or live performances. Found on Spotify-curated wellness playlists.',
  },
  {
    name: 'Study Vibes',
    slug: 'study-vibes',
    status: 'suspected_ai',
    monthly_listeners: 1500000,
    genres: ['Lo-fi', 'Study Music'],
    evidence_summary: 'Generic artist name, high volume of releases, no verifiable identity. Typical pattern of AI/PFC content on study playlists.',
  },
  {
    name: 'Chill Executive Officer',
    slug: 'chill-executive-officer',
    status: 'suspected_ai',
    monthly_listeners: 600000,
    genres: ['Lo-fi', 'Jazz'],
    evidence_summary: 'Part of the lo-fi playlist ecosystem flagged for PFC content. No verifiable artist identity or public presence.',
  },
  {
    name: 'Peaceful Pianos',
    slug: 'peaceful-pianos',
    status: 'suspected_ai',
    monthly_listeners: 900000,
    genres: ['Piano', 'Classical', 'Relaxation'],
    evidence_summary: 'Found on Spotify\'s "Peaceful Piano" playlist which was documented as containing mostly PFC/fake artist content.',
  },
]

async function seedAiArtists() {
  console.log('Seeding confirmed AI artists...')

  const { data: confirmed, error: confirmedError } = await supabase
    .from('artists')
    .upsert(confirmedAiArtists, { onConflict: 'slug' })
    .select()

  if (confirmedError) {
    console.error('Error seeding confirmed AI artists:', confirmedError.message)
  } else {
    console.log(`Added ${confirmed?.length || 0} confirmed AI artists`)
  }

  console.log('Seeding suspected AI artists...')

  const { data: suspected, error: suspectedError } = await supabase
    .from('artists')
    .upsert(suspectedAiArtists, { onConflict: 'slug' })
    .select()

  if (suspectedError) {
    console.error('Error seeding suspected AI artists:', suspectedError.message)
  } else {
    console.log(`Added ${suspected?.length || 0} suspected AI artists`)
  }

  console.log('Done!')
}

seedAiArtists()
