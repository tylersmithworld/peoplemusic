import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import StatusBadge from '@/components/StatusBadge'
import { Metadata } from 'next'

interface PageProps {
  params: { slug: string }
}

async function getArtist(slug: string) {
  const { data } = await supabase
    .from('artists')
    .select('*')
    .eq('slug', slug)
    .single()

  return data
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const artist = await getArtist(params.slug)
  if (!artist) return { title: 'Artist Not Found' }

  return {
    title: `${artist.name} - PeopleMusic`,
    description: `Verification status for ${artist.name}: ${artist.status.replace('_', ' ')}`,
  }
}

export default async function ArtistPage({ params }: PageProps) {
  const artist = await getArtist(params.slug)

  if (!artist) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Artist Header */}
      <div className="flex items-start gap-6 mb-8">
        {artist.image_url ? (
          <img
            src={artist.image_url}
            alt={artist.name}
            className="w-32 h-32 rounded-full object-cover"
          />
        ) : (
          <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        )}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{artist.name}</h1>
          {artist.genres && artist.genres.length > 0 && (
            <p className="text-gray-500 mb-4">{artist.genres.join(', ')}</p>
          )}
          <StatusBadge status={artist.status} size="lg" />
        </div>
      </div>

      {/* Verification Status Card */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Current Status</div>
            <StatusBadge status={artist.status} />
          </div>
          {artist.monthly_listeners && (
            <div>
              <div className="text-sm text-gray-500 mb-1">Monthly Listeners</div>
              <div className="font-medium">{artist.monthly_listeners.toLocaleString()}</div>
            </div>
          )}
        </div>
      </div>

      {/* Evidence Summary */}
      {artist.evidence_summary && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Evidence Summary</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 whitespace-pre-wrap">{artist.evidence_summary}</p>
          </div>
        </div>
      )}

      {/* Streaming Links */}
      {(artist.spotify_id || artist.apple_music_id) && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Listen</h2>
          <div className="flex gap-4">
            {artist.spotify_id && (
              <a
                href={`https://open.spotify.com/artist/${artist.spotify_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                </svg>
                Spotify
              </a>
            )}
            {artist.apple_music_id && (
              <a
                href={`https://music.apple.com/artist/${artist.apple_music_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.401-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81.84-.553 1.472-1.287 1.88-2.208.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.8-.228-2.403-.98-.453-.565-.628-1.222-.56-1.928.145-1.432 1.224-2.317 2.663-2.253.37.016.73.093 1.09.18.273.066.546.126.82.18V8.66c0-.2.05-.354.256-.4.168-.038.34-.058.51-.077 1.135-.132 2.27-.215 3.398-.18.052.002.104.01.155.016l-.01.164c0 .59-.002 1.18.002 1.77 0 .123-.025.24-.156.269-.35.074-.703.122-1.063.184z" />
                </svg>
                Apple Music
              </a>
            )}
          </div>
        </div>
      )}

      {/* Report Issue */}
      <div className="border-t border-gray-200 pt-8">
        <p className="text-sm text-gray-500">
          Have information about this artist?{' '}
          <a href="/submit" className="text-black underline hover:no-underline">
            Submit evidence
          </a>{' '}
          to help us verify their status.
        </p>
      </div>
    </div>
  )
}
