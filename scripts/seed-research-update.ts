import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ytvwmsdhnfujmlqatvqv.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'sb_secret_x0s_XFmkwjpjD5_nCzTZmA_BXKTw-Bh'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Additional confirmed AI artists from research
const newConfirmedAi = [
  {
    name: 'TaTa Tekumi',
    slug: 'tata-tekumi',
    status: 'confirmed_ai',
    monthly_listeners: 50000,
    genres: ['R&B', 'Pop', 'A-Pop'],
    evidence_summary: 'AI artist created by Timbaland via Stage Zero entertainment company. Uses Suno AI with Persona feature. Part of "A-Pop" (Artificial Pop) genre initiative. Asian-presenting AI avatar.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Sofia Pitcher',
    slug: 'sofia-pitcher',
    status: 'confirmed_ai',
    monthly_listeners: 0,
    genres: ['Pop'],
    evidence_summary: 'Confirmed AI artist. One of the few AI artists Spotify has explicitly taken action against and removed from the platform.',
    verified_at: new Date().toISOString(),
  },
  // Hallwood Media additions
  {
    name: 'Defbeatsai',
    slug: 'defbeatsai',
    status: 'confirmed_ai',
    monthly_listeners: 30000,
    genres: ['Hip-Hop', 'Electronic'],
    evidence_summary: 'AI music project by Aubierre Rivaldo Taylor, same creator behind Breaking Rust. Multiple AI-generated releases.',
    verified_at: new Date().toISOString(),
  },
]

// PFC (Perfect Fit Content) artists from Liz Pelly investigation
const pfcArtists = [
  {
    name: 'Ana Olgica',
    slug: 'ana-olgica',
    status: 'suspected_ai',
    monthly_listeners: 400000,
    genres: ['Ambient', 'Lo-fi'],
    evidence_summary: 'Identified in Liz Pelly\'s Harper\'s Magazine investigation as PFC "ghost artist." Only one of 500+ ghost artists with any external evidence of existence. Part of Spotify\'s Perfect Fit Content program.',
  },
  {
    name: 'Johan Röhr',
    slug: 'johan-rohr',
    status: 'suspected_ai',
    monthly_listeners: 100000,
    genres: ['Ambient', 'Electronic', 'Lo-fi'],
    evidence_summary: 'Swedish producer identified as creator of 2,700+ songs under hundreds of fake artist profiles with 15 billion total streams. Central figure in PFC controversy exposed by Harper\'s Magazine.',
  },
  {
    name: 'Catfish Music Roster',
    slug: 'catfish-music-roster',
    status: 'suspected_ai',
    monthly_listeners: 500000,
    genres: ['Lo-fi', 'Chill', 'Ambient'],
    evidence_summary: 'Multiple artists traced to single producer Boström. Part of Swedish production network creating ghost artists for playlist placement.',
  },
]

// Artists whose profiles were hijacked with AI content
const impersonationCases = [
  {
    name: 'Blaze Foley (Impersonated)',
    slug: 'blaze-foley-impersonation',
    status: 'confirmed_ai',
    monthly_listeners: 0,
    genres: ['Country', 'Folk'],
    evidence_summary: 'IMPERSONATION CASE: AI-generated song "Together" was uploaded to deceased artist Blaze Foley\'s (d. 1989) official Spotify page. Track has since been removed by Spotify.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Guy Clark (Impersonated)',
    slug: 'guy-clark-impersonation',
    status: 'confirmed_ai',
    monthly_listeners: 0,
    genres: ['Country', 'Folk'],
    evidence_summary: 'IMPERSONATION CASE: AI-generated song "Happened to You" uploaded to deceased artist Guy Clark\'s (d. 2016) Spotify page. Removed after discovery.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'SOPHIE (Impersonated)',
    slug: 'sophie-impersonation',
    status: 'confirmed_ai',
    monthly_listeners: 0,
    genres: ['Electronic', 'Hyperpop'],
    evidence_summary: 'IMPERSONATION CASE: AI-generated songs appeared on deceased artist SOPHIE\'s (d. 2021) Spotify page. Reported and removed.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Toto (Impersonated)',
    slug: 'toto-impersonation',
    status: 'confirmed_ai',
    monthly_listeners: 0,
    genres: ['Rock'],
    evidence_summary: 'IMPERSONATION CASE: Fake AI-generated track "Name This Night" uploaded to Toto\'s Spotify page. Confirmed fake by band.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Uncle Tupelo (Impersonated)',
    slug: 'uncle-tupelo-impersonation',
    status: 'confirmed_ai',
    monthly_listeners: 0,
    genres: ['Alternative Country', 'Rock'],
    evidence_summary: 'IMPERSONATION CASE: AI-generated song uploaded to inactive band Uncle Tupelo\'s page (inactive since 1994). Reported by fans.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Desmond Dekker (Impersonated)',
    slug: 'desmond-dekker-impersonation',
    status: 'confirmed_ai',
    monthly_listeners: 0,
    genres: ['Reggae', 'Ska'],
    evidence_summary: 'IMPERSONATION CASE: Fake "new album" appeared on deceased artist Desmond Dekker\'s (d. 2006) Spotify page. User-reported.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Here We Go Magic (Impersonated)',
    slug: 'here-we-go-magic-impersonation',
    status: 'confirmed_ai',
    monthly_listeners: 0,
    genres: ['Indie Rock'],
    evidence_summary: 'IMPERSONATION CASE: AI-generated track "Water Spring Mountain" appeared on band\'s page. Reported directly by frontman.',
    verified_at: new Date().toISOString(),
  },
]

// High-profile suspected AI from user reports
const suspectedFromReports = [
  {
    name: 'Gazela',
    slug: 'gazela',
    status: 'suspected_ai',
    monthly_listeners: 50000,
    genres: ['Pop'],
    evidence_summary: 'Reported by Spotify community for stealing Kesha music and imagery. Suspected AI-generated or fraudulent content.',
  },
  {
    name: 'Novi',
    slug: 'novi-composer',
    status: 'suspected_ai',
    monthly_listeners: 100000,
    genres: ['Classical', 'Ambient'],
    evidence_summary: 'Reported by Spotify community for using Suno AI while pretending to be human composer.',
  },
]

// Updates to existing artists with more detail
const artistUpdates = [
  {
    slug: 'the-velvet-sundown',
    monthly_listeners: 1000000,
    evidence_summary: 'Confirmed AI "art hoax" project. Used Suno AI with Persona feature for consistent vocals. Originally denied AI usage, later admitted. Peak 1M+ monthly Spotify listeners. 25 of top 30 playlists came from just 4 accounts. Distributed via DistroKid. Deezer flagged all albums with AI disclaimer. Track "Dust on the Wind" placed at regular intervals in Vietnam War playlists.',
  },
  {
    slug: 'xania-monet',
    monthly_listeners: 1200000,
    evidence_summary: 'First AI artist to chart on Billboard Adult R&B Airplay and Hot Gospel Songs. Uses Suno for vocals/music, lyrics by human poet Telisha "Nikki" Jones (Mississippi). Signed multi-million dollar deal with Hallwood Media. Publicly condemned by Kehlani and SZA. Key tracks: "How Was I Supposed to Know?", "Let Go, Let God".',
  },
  {
    slug: 'breaking-rust',
    monthly_listeners: 2000000,
    evidence_summary: '#1 on Billboard Country Digital Song Sales (first AI country song). #2 on Spotify Viral 50 USA. Debuted #9 on Billboard Emerging Artists. Created by "Aubierre Rivaldo Taylor" (also creates as Defbeatsai). AI-generated cowboy persona on Instagram (35K+ followers). No BMI/ASCAP registration. Key tracks: "Walk My Walk" (3M+ streams), "Livin\' on Borrowed Time" (4M+ streams). Chart position questioned - only ~$3,000 in sales needed for #1.',
  },
]

async function seed() {
  console.log('Adding new confirmed AI artists...')
  const { data: confirmed, error: confirmedError } = await supabase
    .from('artists')
    .upsert(newConfirmedAi, { onConflict: 'slug' })
    .select()

  if (confirmedError) {
    console.error('Error:', confirmedError.message)
  } else {
    console.log(`Added ${confirmed?.length || 0} confirmed AI artists`)
  }

  console.log('Adding PFC ghost artists...')
  const { data: pfc, error: pfcError } = await supabase
    .from('artists')
    .upsert(pfcArtists, { onConflict: 'slug' })
    .select()

  if (pfcError) {
    console.error('Error:', pfcError.message)
  } else {
    console.log(`Added ${pfc?.length || 0} PFC artists`)
  }

  console.log('Adding impersonation cases...')
  const { data: impersonation, error: impersonationError } = await supabase
    .from('artists')
    .upsert(impersonationCases, { onConflict: 'slug' })
    .select()

  if (impersonationError) {
    console.error('Error:', impersonationError.message)
  } else {
    console.log(`Added ${impersonation?.length || 0} impersonation cases`)
  }

  console.log('Adding user-reported suspected AI...')
  const { data: suspected, error: suspectedError } = await supabase
    .from('artists')
    .upsert(suspectedFromReports, { onConflict: 'slug' })
    .select()

  if (suspectedError) {
    console.error('Error:', suspectedError.message)
  } else {
    console.log(`Added ${suspected?.length || 0} suspected AI artists`)
  }

  console.log('Updating existing artists with more detail...')
  for (const update of artistUpdates) {
    const { error } = await supabase
      .from('artists')
      .update({
        monthly_listeners: update.monthly_listeners,
        evidence_summary: update.evidence_summary,
      })
      .eq('slug', update.slug)

    if (error) {
      console.error(`Error updating ${update.slug}:`, error.message)
    } else {
      console.log(`Updated: ${update.slug}`)
    }
  }

  // Get final count
  const { count } = await supabase
    .from('artists')
    .select('*', { count: 'exact', head: true })

  console.log(`\nTotal artists in database: ${count}`)
}

seed()
