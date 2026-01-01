import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ytvwmsdhnfujmlqatvqv.supabase.co'
const supabaseServiceKey = 'sb_secret_x0s_XFmkwjpjD5_nCzTZmA_BXKTw-Bh'

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const createTablesSql = `
-- Create artists table
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

-- Create submissions table
create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  artist_name text not null,
  submitted_by_email text,
  claim text check (claim in ('is_human', 'is_ai')) not null,
  evidence_provided text,
  status text check (status in ('pending', 'reviewed', 'rejected')) default 'pending',
  created_at timestamptz default now()
);

-- Create api_keys table
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
`

async function setup() {
  console.log('Creating tables...')

  // Use the rpc function to execute raw SQL
  const { error } = await supabase.rpc('exec_sql', { sql: createTablesSql })

  if (error) {
    // Try using the REST API directly
    console.log('RPC not available, tables need to be created via Supabase dashboard')
    console.log('')
    console.log('Please run this SQL in your Supabase SQL Editor:')
    console.log('https://supabase.com/dashboard/project/ytvwmsdhnfujmlqatvqv/sql')
    console.log('')
    console.log('='.repeat(60))
    console.log(createTablesSql)
    console.log('='.repeat(60))
    return false
  }

  console.log('Tables created successfully!')
  return true
}

setup()
