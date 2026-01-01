import type { SupabaseClient } from '@supabase/supabase-js'

let _supabase: SupabaseClient | null = null

async function getClient() {
  if (!_supabase) {
    const { createClient } = await import('@supabase/supabase-js')
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    _supabase = createClient(url, key)
  }
  return _supabase
}

export const supabase = {
  from: (table: string) => {
    // Sync wrapper that works because Next.js server components handle this
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !key) {
      // Return a dummy during build that won't be called
      return {
        select: () => ({ data: null, error: null, count: null }),
        insert: () => ({ data: null, error: null }),
        update: () => ({ data: null, error: null }),
        upsert: () => ({ data: null, error: null }),
        delete: () => ({ data: null, error: null }),
        eq: () => ({ data: null, error: null }),
        single: () => ({ data: null, error: null }),
      } as ReturnType<SupabaseClient['from']>
    }
    // Dynamic require at runtime
    const { createClient } = require('@supabase/supabase-js')
    if (!_supabase) {
      _supabase = createClient(url, key)
    }
    return _supabase.from(table)
  }
}

// Server-side client with service role key for admin operations
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const { createClient } = require('@supabase/supabase-js')
  return createClient(url, key)
}
