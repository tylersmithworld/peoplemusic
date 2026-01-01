export type ArtistStatus = 'confirmed_human' | 'suspected_ai' | 'confirmed_ai' | 'unverified'

export type SubmissionClaim = 'is_human' | 'is_ai'

export type SubmissionStatus = 'pending' | 'reviewed' | 'rejected'

export interface Artist {
  id: string
  name: string
  slug: string
  status: ArtistStatus
  spotify_id: string | null
  apple_music_id: string | null
  image_url: string | null
  evidence_summary: string | null
  evidence_internal: string | null
  monthly_listeners: number | null
  genres: string[] | null
  created_at: string
  updated_at: string
  verified_at: string | null
}

export interface Submission {
  id: string
  artist_name: string
  submitted_by_email: string | null
  claim: SubmissionClaim
  evidence_provided: string | null
  status: SubmissionStatus
  created_at: string
}

export interface ApiKey {
  id: string
  user_email: string
  key_hash: string
  requests_this_month: number
  created_at: string
}

// Database types for Supabase
export interface Database {
  public: {
    Tables: {
      artists: {
        Row: Artist
        Insert: {
          name: string
          slug: string
          status?: ArtistStatus
          spotify_id?: string | null
          apple_music_id?: string | null
          image_url?: string | null
          evidence_summary?: string | null
          evidence_internal?: string | null
          monthly_listeners?: number | null
          genres?: string[] | null
          verified_at?: string | null
        }
        Update: Partial<Omit<Artist, 'id'>>
      }
      submissions: {
        Row: Submission
        Insert: {
          artist_name: string
          claim: SubmissionClaim
          submitted_by_email?: string | null
          evidence_provided?: string | null
        }
        Update: Partial<Omit<Submission, 'id'>>
      }
      api_keys: {
        Row: ApiKey
        Insert: {
          user_email: string
          key_hash: string
        }
        Update: Partial<Omit<ApiKey, 'id'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Status display helpers
export const statusLabels: Record<ArtistStatus, string> = {
  confirmed_human: 'Confirmed Human',
  suspected_ai: 'Suspected AI',
  confirmed_ai: 'Confirmed AI',
  unverified: 'Unverified',
}

export const statusColors: Record<ArtistStatus, { bg: string; text: string; border: string }> = {
  confirmed_human: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  suspected_ai: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300' },
  confirmed_ai: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  unverified: { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-300' },
}
