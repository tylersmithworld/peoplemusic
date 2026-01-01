import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ytvwmsdhnfujmlqatvqv.supabase.co'
const supabaseServiceKey = 'sb_secret_x0s_XFmkwjpjD5_nCzTZmA_BXKTw-Bh'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const artists = [
  // Confirmed Human Artists
  {
    name: 'Taylor Swift',
    slug: 'taylor-swift',
    status: 'confirmed_human',
    spotify_id: '06HL4z0CvFAxyc27GXpf02',
    monthly_listeners: 82000000,
    genres: ['Pop', 'Country', 'Folk'],
    evidence_summary: 'Extensively documented career spanning 18+ years. Thousands of live performances, interviews, and behind-the-scenes content. Personal social media presence with consistent activity since 2008.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Kendrick Lamar',
    slug: 'kendrick-lamar',
    status: 'confirmed_human',
    spotify_id: '2YZyLoL8N0Wb9xBt1NhZWg',
    monthly_listeners: 45000000,
    genres: ['Hip-Hop', 'Rap'],
    evidence_summary: 'Grammy-winning artist with documented history from Compton. Extensive live performances including Super Bowl halftime show. Verified collaborations with numerous documented human artists.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Billie Eilish',
    slug: 'billie-eilish',
    status: 'confirmed_human',
    spotify_id: '6qqNVTkY8uBg9cP3Jd7DAH',
    monthly_listeners: 55000000,
    genres: ['Pop', 'Alternative'],
    evidence_summary: 'Rise documented from SoundCloud uploads in 2015. Multiple documentary films showing creative process. Live performances and award show appearances worldwide.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'The Weeknd',
    slug: 'the-weeknd',
    status: 'confirmed_human',
    spotify_id: '1Xyo4u8uXC1ZmMpatF05PJ',
    monthly_listeners: 75000000,
    genres: ['R&B', 'Pop'],
    evidence_summary: 'Canadian artist with documented career since 2010. Super Bowl halftime performer. Extensive interview history and public appearances.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Beyoncé',
    slug: 'beyonce',
    status: 'confirmed_human',
    spotify_id: '6vWDO969PvNqNYHIOW5v0m',
    monthly_listeners: 65000000,
    genres: ['R&B', 'Pop', 'Hip-Hop'],
    evidence_summary: "One of the most documented artists in history. Career spanning 25+ years from Destiny's Child to solo work. Countless live performances, documentaries, and interviews.",
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Ed Sheeran',
    slug: 'ed-sheeran',
    status: 'confirmed_human',
    spotify_id: '6eUKZXaKkcviH0Ku9w2n3V',
    monthly_listeners: 78000000,
    genres: ['Pop', 'Folk', 'Acoustic'],
    evidence_summary: 'British singer-songwriter with extensively documented busking origins. Multiple documentaries and live album recordings. Stadium tours worldwide.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Doja Cat',
    slug: 'doja-cat',
    status: 'confirmed_human',
    spotify_id: '5cj0lLjcoR7YOSnhnX0Po5',
    monthly_listeners: 48000000,
    genres: ['Pop', 'Hip-Hop', 'R&B'],
    evidence_summary: 'Rise documented through social media and SoundCloud since 2012. Extensive live performances and award show appearances. Active social media presence with fan interactions.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Post Malone',
    slug: 'post-malone',
    status: 'confirmed_human',
    spotify_id: '246dkjvS1zLTtiykXe5h60',
    monthly_listeners: 52000000,
    genres: ['Hip-Hop', 'Pop', 'Rock'],
    evidence_summary: 'Career documented from 2015 viral hit "White Iverson". Numerous live performances and festival headlining slots. Extensive interview history.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Ariana Grande',
    slug: 'ariana-grande',
    status: 'confirmed_human',
    spotify_id: '66CXWjxzNUsdJxJ2JdwvnR',
    monthly_listeners: 70000000,
    genres: ['Pop', 'R&B'],
    evidence_summary: 'Career beginning on Broadway and Nickelodeon documented extensively. Manchester Arena benefit concert organizer. Consistent public presence since childhood.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Drake',
    slug: 'drake',
    status: 'confirmed_human',
    spotify_id: '3TVXtAsR1Inumwj472S9r4',
    monthly_listeners: 80000000,
    genres: ['Hip-Hop', 'R&B', 'Pop'],
    evidence_summary: 'Career documented from Degrassi to global rap icon. Extensive live performances and festival headlines. Toronto roots well-documented.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Bad Bunny',
    slug: 'bad-bunny',
    status: 'confirmed_human',
    spotify_id: '4q3ewBCX7sLwd24euuV69X',
    monthly_listeners: 60000000,
    genres: ['Reggaeton', 'Latin', 'Hip-Hop'],
    evidence_summary: 'Puerto Rican artist with documented rise from SoundCloud. WWE appearances and acting roles. Extensive live performances and award show appearances.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'SZA',
    slug: 'sza',
    status: 'confirmed_human',
    spotify_id: '7tYKF4w9nC0nq9CsPZTHyP',
    monthly_listeners: 42000000,
    genres: ['R&B', 'Neo Soul'],
    evidence_summary: 'Career documented from TDE signing in 2012. Extensive interview history and live performances. Grammy-winning artist with public creative process.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Harry Styles',
    slug: 'harry-styles',
    status: 'confirmed_human',
    spotify_id: '6KImCVD70vtIoJWnq6nGn3',
    monthly_listeners: 55000000,
    genres: ['Pop', 'Rock'],
    evidence_summary: 'Career documented from One Direction through solo success. Acting roles and fashion industry presence. Extensive touring history.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Dua Lipa',
    slug: 'dua-lipa',
    status: 'confirmed_human',
    spotify_id: '6M2wZ9GZgrQXHCFfjv46we',
    monthly_listeners: 58000000,
    genres: ['Pop', 'Dance'],
    evidence_summary: 'British-Albanian singer with documented rise from YouTube covers. Extensive live performances and award show appearances. Active social media presence.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Travis Scott',
    slug: 'travis-scott',
    status: 'confirmed_human',
    spotify_id: '0Y5tJX1MQlPlqiwlOH1tJY',
    monthly_listeners: 50000000,
    genres: ['Hip-Hop', 'Rap'],
    evidence_summary: 'Houston artist with documented career from mixtapes to stadium tours. Astroworld festival creator. Extensive collaborations and public appearances.',
    verified_at: new Date().toISOString(),
  },
  // Suspected AI Artists
  {
    name: 'Synthia Rivers',
    slug: 'synthia-rivers',
    status: 'suspected_ai',
    monthly_listeners: 2500000,
    genres: ['Lo-fi', 'Ambient'],
    evidence_summary: 'No live performances found. Artist image appears AI-generated based on artifact analysis. Prolific release schedule (50+ tracks in 6 months) with no interviews or social media presence. Audio analysis shows patterns consistent with AI generation.',
  },
  {
    name: 'The Algorithm',
    slug: 'the-algorithm',
    status: 'suspected_ai',
    monthly_listeners: 1800000,
    genres: ['Electronic', 'EDM'],
    evidence_summary: 'Anonymous artist with no public presence. Track titles and metadata suggest automated generation. Similar melodic patterns across all releases. No label representation or management contact available.',
  },
  {
    name: 'Melody Machine',
    slug: 'melody-machine',
    status: 'suspected_ai',
    monthly_listeners: 950000,
    genres: ['Pop', 'Electronic'],
    evidence_summary: 'Rapid release schedule with consistent production quality but no variation in style. Reverse image search on artist photo returns AI generation signatures. No social media engagement despite playlist placements.',
  },
  {
    name: 'Chill Bot Collective',
    slug: 'chill-bot-collective',
    status: 'suspected_ai',
    monthly_listeners: 3200000,
    genres: ['Lo-fi', 'Study Music'],
    evidence_summary: 'Produces dozens of "study beats" monthly. No artist interviews or live sessions found. Metadata indicates automated upload patterns. Audio fingerprinting shows high similarity across tracks.',
  },
  {
    name: 'Neural Beats',
    slug: 'neural-beats',
    status: 'suspected_ai',
    monthly_listeners: 1200000,
    genres: ['Hip-Hop', 'Instrumental'],
    evidence_summary: 'Instrumental hip-hop with no credited producers. Release timing suggests automated scheduling. No responses to label or press inquiries. Artist imagery has AI generation artifacts.',
  },
  // Confirmed AI Artists
  {
    name: 'AI DJ Project',
    slug: 'ai-dj-project',
    status: 'confirmed_ai',
    monthly_listeners: 500000,
    genres: ['Electronic', 'Experimental'],
    evidence_summary: 'Openly marketed as an AI music generation project. All tracks credited as "generated by machine learning algorithms." Project website documents the AI technology used.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'Endel',
    slug: 'endel',
    status: 'confirmed_ai',
    monthly_listeners: 800000,
    genres: ['Ambient', 'Wellness'],
    evidence_summary: 'AI-powered soundscape company that openly uses generative AI. No human artist behind the music. Company documentation explains the AI generation process.',
    verified_at: new Date().toISOString(),
  },
  {
    name: 'AIVA',
    slug: 'aiva',
    status: 'confirmed_ai',
    monthly_listeners: 300000,
    genres: ['Classical', 'Orchestral'],
    evidence_summary: 'AI composer recognized by SACEM. Openly marketed as artificial intelligence. Company website details the AI composition technology.',
    verified_at: new Date().toISOString(),
  },
  // Unverified Artists
  {
    name: 'Moonlight Sonata Project',
    slug: 'moonlight-sonata-project',
    status: 'unverified',
    monthly_listeners: 150000,
    genres: ['Classical', 'Piano'],
    evidence_summary: 'Recently added artist pending verification. Limited public information available.',
  },
  {
    name: 'Bedroom Producer 404',
    slug: 'bedroom-producer-404',
    status: 'unverified',
    monthly_listeners: 75000,
    genres: ['Electronic', 'House'],
    evidence_summary: 'Independent artist with limited online presence. Verification in progress.',
  },
  {
    name: 'The Basement Tapes',
    slug: 'the-basement-tapes',
    status: 'unverified',
    monthly_listeners: 200000,
    genres: ['Rock', 'Indie'],
    evidence_summary: 'New addition to database. Awaiting evidence review.',
  },
  {
    name: 'Lo-Fi Dreams',
    slug: 'lo-fi-dreams',
    status: 'unverified',
    monthly_listeners: 450000,
    genres: ['Lo-fi', 'Hip-Hop'],
    evidence_summary: 'Anonymous lo-fi producer. Status pending investigation.',
  },
  {
    name: 'Coastal Waves',
    slug: 'coastal-waves',
    status: 'unverified',
    monthly_listeners: 320000,
    genres: ['Ambient', 'Electronic'],
    evidence_summary: 'Ambient project with unclear origin. Under review.',
  },
]

async function seed() {
  console.log('Seeding database...')

  // Insert artists
  const { data, error } = await supabase
    .from('artists')
    .upsert(artists, { onConflict: 'slug' })
    .select()

  if (error) {
    console.error('Error seeding artists:', error.message)
    return
  }

  console.log(`Successfully seeded ${data?.length || 0} artists`)
}

seed()
