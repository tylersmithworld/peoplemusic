import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  const [totalResult, confirmedResult, suspectedResult, aiResult, unverifiedResult] =
    await Promise.all([
      supabase.from('artists').select('*', { count: 'exact', head: true }),
      supabase
        .from('artists')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'confirmed_human'),
      supabase
        .from('artists')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'suspected_ai'),
      supabase
        .from('artists')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'confirmed_ai'),
      supabase
        .from('artists')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'unverified'),
    ])

  return NextResponse.json({
    total: totalResult.count || 0,
    confirmed_human: confirmedResult.count || 0,
    suspected_ai: suspectedResult.count || 0,
    confirmed_ai: aiResult.count || 0,
    unverified: unverifiedResult.count || 0,
  })
}
