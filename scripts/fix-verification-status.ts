/**
 * Fix verification status based on era
 * Pre-2020 artists = confirmed_human (AI music didn't exist)
 * 2020+ artists = unverified (need self-verification)
 */

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ytvwmsdhnfujmlqatvqv.supabase.co'
const supabaseServiceKey = 'sb_secret_x0s_XFmkwjpjD5_nCzTZmA_BXKTw-Bh'
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function fix() {
  // Get all artists imported from MusicBrainz
  const { data: artists } = await supabase
    .from('artists')
    .select('id, name, evidence_summary, status')
    .ilike('evidence_summary', '%MusicBrainz%')

  console.log(`Found ${artists?.length || 0} MusicBrainz imports to review\n`)

  let keptHuman = 0
  let markedUnverified = 0

  for (const artist of artists || []) {
    const evidence = artist.evidence_summary || ''

    // Extract years from evidence
    const yearMatches = evidence.match(/\b(19\d{2}|20\d{2})\b/g) || []
    const years = yearMatches.map(y => parseInt(y))

    // Check for "present" which means still active
    const stillActive = evidence.includes('present')

    // Determine if this is a legacy artist (started before 2020)
    const earliestYear = years.length > 0 ? Math.min(...years) : null
    const isLegacy = earliestYear !== null && earliestYear < 2020

    if (isLegacy) {
      // Pre-2020 artist - keep as confirmed_human
      if (artist.status !== 'confirmed_human') {
        await supabase
          .from('artists')
          .update({ status: 'confirmed_human', verified_at: new Date().toISOString() })
          .eq('id', artist.id)
      }
      keptHuman++
    } else {
      // 2020+ or unknown era - mark as unverified
      if (artist.status === 'confirmed_human') {
        await supabase
          .from('artists')
          .update({ status: 'unverified', verified_at: null })
          .eq('id', artist.id)
        console.log(`  Unverified: ${artist.name} (era unknown or 2020+)`)
        markedUnverified++
      }
    }
  }

  console.log(`\nResults:`)
  console.log(`  Kept as confirmed_human (pre-2020): ${keptHuman}`)
  console.log(`  Marked unverified (2020+ or unknown): ${markedUnverified}`)

  // Show final counts
  const { data: all } = await supabase.from('artists').select('status')
  const counts: Record<string, number> = {}
  all?.forEach(a => counts[a.status] = (counts[a.status] || 0) + 1)

  console.log(`\nDatabase totals:`)
  console.log(`  Total: ${all?.length}`)
  console.log(`  Confirmed Human: ${counts.confirmed_human || 0}`)
  console.log(`  Suspected AI: ${counts.suspected_ai || 0}`)
  console.log(`  Confirmed AI: ${counts.confirmed_ai || 0}`)
  console.log(`  Unverified: ${counts.unverified || 0}`)
}

fix()
