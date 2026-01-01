import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { artist_name, submitted_by_email, claim, evidence_provided } = body

    if (!artist_name || !claim) {
      return NextResponse.json(
        { error: 'artist_name and claim are required' },
        { status: 400 }
      )
    }

    if (!['is_human', 'is_ai'].includes(claim)) {
      return NextResponse.json(
        { error: 'claim must be "is_human" or "is_ai"' },
        { status: 400 }
      )
    }

    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('submissions')
      .insert({
        artist_name,
        submitted_by_email: submitted_by_email || null,
        claim,
        evidence_provided: evidence_provided || null,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
}
