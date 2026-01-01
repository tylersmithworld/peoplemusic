-- PeopleMusic Seed Data
-- Run this in your Supabase SQL editor to create the tables and seed data

-- Create tables
create table if not exists artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  status text check (status in ('confirmed_human', 'suspected_ai', 'confirmed_ai', 'unverified')) default 'unverified',
  spotify_id text,
  apple_music_id text,
  image_url text,
  evidence_summary text,
  evidence_internal text,
  monthly_listeners int,
  genres text[],
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  verified_at timestamptz
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  artist_name text not null,
  submitted_by_email text,
  claim text check (claim in ('is_human', 'is_ai')) not null,
  evidence_provided text,
  status text check (status in ('pending', 'reviewed', 'rejected')) default 'pending',
  created_at timestamptz default now()
);

create table if not exists api_keys (
  id uuid primary key default gen_random_uuid(),
  user_email text not null,
  key_hash text not null,
  requests_this_month int default 0,
  created_at timestamptz default now()
);

-- Create indexes
create index if not exists artists_slug_idx on artists(slug);
create index if not exists artists_status_idx on artists(status);
create index if not exists artists_name_idx on artists using gin(to_tsvector('english', name));

-- Seed data: Confirmed Human Artists
insert into artists (name, slug, status, spotify_id, monthly_listeners, genres, evidence_summary, verified_at) values
('Taylor Swift', 'taylor-swift', 'confirmed_human', '06HL4z0CvFAxyc27GXpf02', 82000000, ARRAY['Pop', 'Country', 'Folk'], 'Extensively documented career spanning 18+ years. Thousands of live performances, interviews, and behind-the-scenes content. Personal social media presence with consistent activity since 2008.', now()),
('Kendrick Lamar', 'kendrick-lamar', 'confirmed_human', '2YZyLoL8N0Wb9xBt1NhZWg', 45000000, ARRAY['Hip-Hop', 'Rap'], 'Grammy-winning artist with documented history from Compton. Extensive live performances including Super Bowl halftime show. Verified collaborations with numerous documented human artists.', now()),
('Billie Eilish', 'billie-eilish', 'confirmed_human', '6qqNVTkY8uBg9cP3Jd7DAH', 55000000, ARRAY['Pop', 'Alternative'], 'Rise documented from SoundCloud uploads in 2015. Multiple documentary films showing creative process. Live performances and award show appearances worldwide.', now()),
('The Weeknd', 'the-weeknd', 'confirmed_human', '1Xyo4u8uXC1ZmMpatF05PJ', 75000000, ARRAY['R&B', 'Pop'], 'Canadian artist with documented career since 2010. Super Bowl halftime performer. Extensive interview history and public appearances.', now()),
('Beyoncé', 'beyonce', 'confirmed_human', '6vWDO969PvNqNYHIOW5v0m', 65000000, ARRAY['R&B', 'Pop', 'Hip-Hop'], 'One of the most documented artists in history. Career spanning 25+ years from Destiny''s Child to solo work. Countless live performances, documentaries, and interviews.', now()),
('Ed Sheeran', 'ed-sheeran', 'confirmed_human', '6eUKZXaKkcviH0Ku9w2n3V', 78000000, ARRAY['Pop', 'Folk', 'Acoustic'], 'British singer-songwriter with extensively documented busking origins. Multiple documentaries and live album recordings. Stadium tours worldwide.', now()),
('Doja Cat', 'doja-cat', 'confirmed_human', '5cj0lLjcoR7YOSnhnX0Po5', 48000000, ARRAY['Pop', 'Hip-Hop', 'R&B'], 'Rise documented through social media and SoundCloud since 2012. Extensive live performances and award show appearances. Active social media presence with fan interactions.', now()),
('Post Malone', 'post-malone', 'confirmed_human', '246dkjvS1zLTtiykXe5h60', 52000000, ARRAY['Hip-Hop', 'Pop', 'Rock'], 'Career documented from 2015 viral hit "White Iverson". Numerous live performances and festival headlining slots. Extensive interview history.', now()),
('Ariana Grande', 'ariana-grande', 'confirmed_human', '66CXWjxzNUsdJxJ2JdwvnR', 70000000, ARRAY['Pop', 'R&B'], 'Career beginning on Broadway and Nickelodeon documented extensively. Manchester Arena benefit concert organizer. Consistent public presence since childhood.', now()),
('Drake', 'drake', 'confirmed_human', '3TVXtAsR1Inumwj472S9r4', 80000000, ARRAY['Hip-Hop', 'R&B', 'Pop'], 'Career documented from Degrassi to global rap icon. Extensive live performances and festival headlines. Toronto roots well-documented.', now()),
('Bad Bunny', 'bad-bunny', 'confirmed_human', '4q3ewBCX7sLwd24euuV69X', 60000000, ARRAY['Reggaeton', 'Latin', 'Hip-Hop'], 'Puerto Rican artist with documented rise from SoundCloud. WWE appearances and acting roles. Extensive live performances and award show appearances.', now()),
('SZA', 'sza', 'confirmed_human', '7tYKF4w9nC0nq9CsPZTHyP', 42000000, ARRAY['R&B', 'Neo Soul'], 'Career documented from TDE signing in 2012. Extensive interview history and live performances. Grammy-winning artist with public creative process.', now()),
('Harry Styles', 'harry-styles', 'confirmed_human', '6KImCVD70vtIoJWnq6nGn3', 55000000, ARRAY['Pop', 'Rock'], 'Career documented from One Direction through solo success. Acting roles and fashion industry presence. Extensive touring history.', now()),
('Dua Lipa', 'dua-lipa', 'confirmed_human', '6M2wZ9GZgrQXHCFfjv46we', 58000000, ARRAY['Pop', 'Dance'], 'British-Albanian singer with documented rise from YouTube covers. Extensive live performances and award show appearances. Active social media presence.', now()),
('Travis Scott', 'travis-scott', 'confirmed_human', '0Y5tJX1MQlPlqiwlOH1tJY', 50000000, ARRAY['Hip-Hop', 'Rap'], 'Houston artist with documented career from mixtapes to stadium tours. Astroworld festival creator. Extensive collaborations and public appearances.', now())
on conflict (slug) do nothing;

-- Seed data: Suspected AI Artists (fictional examples for demonstration)
insert into artists (name, slug, status, monthly_listeners, genres, evidence_summary) values
('Synthia Rivers', 'synthia-rivers', 'suspected_ai', 2500000, ARRAY['Lo-fi', 'Ambient'], 'No live performances found. Artist image appears AI-generated based on artifact analysis. Prolific release schedule (50+ tracks in 6 months) with no interviews or social media presence. Audio analysis shows patterns consistent with AI generation.'),
('The Algorithm', 'the-algorithm', 'suspected_ai', 1800000, ARRAY['Electronic', 'EDM'], 'Anonymous artist with no public presence. Track titles and metadata suggest automated generation. Similar melodic patterns across all releases. No label representation or management contact available.'),
('Melody Machine', 'melody-machine', 'suspected_ai', 950000, ARRAY['Pop', 'Electronic'], 'Rapid release schedule with consistent production quality but no variation in style. Reverse image search on artist photo returns AI generation signatures. No social media engagement despite playlist placements.'),
('Chill Bot Collective', 'chill-bot-collective', 'suspected_ai', 3200000, ARRAY['Lo-fi', 'Study Music'], 'Produces dozens of "study beats" monthly. No artist interviews or live sessions found. Metadata indicates automated upload patterns. Audio fingerprinting shows high similarity across tracks.'),
('Neural Beats', 'neural-beats', 'suspected_ai', 1200000, ARRAY['Hip-Hop', 'Instrumental'], 'Instrumental hip-hop with no credited producers. Release timing suggests automated scheduling. No responses to label or press inquiries. Artist imagery has AI generation artifacts.')
on conflict (slug) do nothing;

-- Seed data: Confirmed AI Artists (known AI projects)
insert into artists (name, slug, status, monthly_listeners, genres, evidence_summary, verified_at) values
('AI DJ Project', 'ai-dj-project', 'confirmed_ai', 500000, ARRAY['Electronic', 'Experimental'], 'Openly marketed as an AI music generation project. All tracks credited as "generated by machine learning algorithms." Project website documents the AI technology used.', now()),
('Endel', 'endel', 'confirmed_ai', 800000, ARRAY['Ambient', 'Wellness'], 'AI-powered soundscape company that openly uses generative AI. No human artist behind the music. Company documentation explains the AI generation process.', now()),
('AIVA', 'aiva', 'confirmed_ai', 300000, ARRAY['Classical', 'Orchestral'], 'AI composer recognized by SACEM. Openly marketed as artificial intelligence. Company website details the AI composition technology.', now())
on conflict (slug) do nothing;

-- Seed data: Unverified Artists
insert into artists (name, slug, status, monthly_listeners, genres, evidence_summary) values
('Moonlight Sonata Project', 'moonlight-sonata-project', 'unverified', 150000, ARRAY['Classical', 'Piano'], 'Recently added artist pending verification. Limited public information available.'),
('Bedroom Producer 404', 'bedroom-producer-404', 'unverified', 75000, ARRAY['Electronic', 'House'], 'Independent artist with limited online presence. Verification in progress.'),
('The Basement Tapes', 'the-basement-tapes', 'unverified', 200000, ARRAY['Rock', 'Indie'], 'New addition to database. Awaiting evidence review.'),
('Lo-Fi Dreams', 'lo-fi-dreams', 'unverified', 450000, ARRAY['Lo-fi', 'Hip-Hop'], 'Anonymous lo-fi producer. Status pending investigation.'),
('Coastal Waves', 'coastal-waves', 'unverified', 320000, ARRAY['Ambient', 'Electronic'], 'Ambient project with unclear origin. Under review.')
on conflict (slug) do nothing;

-- Enable Row Level Security (optional, for production)
-- alter table artists enable row level security;
-- alter table submissions enable row level security;
-- alter table api_keys enable row level security;

-- Create policy for public read access to artists
-- create policy "Artists are viewable by everyone" on artists for select using (true);

-- Create policy for authenticated users to submit
-- create policy "Anyone can submit" on submissions for insert with check (true);
