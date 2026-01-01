import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Documentation - PeopleMusic',
  description: 'Documentation for the PeopleMusic API.',
}

export default function ApiDocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">API Documentation</h1>
      <p className="text-lg text-gray-600 mb-8">
        The PeopleMusic API allows you to query our database of verified artists programmatically.
      </p>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
        <p className="text-yellow-800">
          <strong>Coming Soon:</strong> The full API with authentication is currently in development.
          The endpoints below are available for basic queries.
        </p>
      </div>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Base URL</h2>
        <code className="bg-gray-100 px-3 py-2 rounded text-sm block">
          https://peoplemusic.org/api
        </code>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Endpoints</h2>

        <div className="space-y-8">
          {/* Search Artists */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded mr-2">
                GET
              </span>
              <code className="text-sm">/artists</code>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-3">Search for artists by name.</p>
              <h4 className="font-medium text-gray-900 mb-2">Query Parameters</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="pb-2 text-gray-500 font-medium">Parameter</th>
                    <th className="pb-2 text-gray-500 font-medium">Type</th>
                    <th className="pb-2 text-gray-500 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1"><code className="bg-gray-100 px-1 rounded">q</code></td>
                    <td className="py-1 text-gray-600">string</td>
                    <td className="py-1 text-gray-600">Search query</td>
                  </tr>
                </tbody>
              </table>
              <h4 className="font-medium text-gray-900 mt-4 mb-2">Example</h4>
              <code className="bg-gray-100 px-3 py-2 rounded text-sm block">
                GET /api/artists?q=taylor
              </code>
            </div>
          </div>

          {/* Get Artist by Slug */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded mr-2">
                GET
              </span>
              <code className="text-sm">/artists/[slug]</code>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-3">Get a single artist by their URL slug.</p>
              <h4 className="font-medium text-gray-900 mb-2">Path Parameters</h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left">
                    <th className="pb-2 text-gray-500 font-medium">Parameter</th>
                    <th className="pb-2 text-gray-500 font-medium">Type</th>
                    <th className="pb-2 text-gray-500 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-1"><code className="bg-gray-100 px-1 rounded">slug</code></td>
                    <td className="py-1 text-gray-600">string</td>
                    <td className="py-1 text-gray-600">Artist&apos;s URL-friendly identifier</td>
                  </tr>
                </tbody>
              </table>
              <h4 className="font-medium text-gray-900 mt-4 mb-2">Example</h4>
              <code className="bg-gray-100 px-3 py-2 rounded text-sm block">
                GET /api/artists/taylor-swift
              </code>
            </div>
          </div>

          {/* Get Stats */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded mr-2">
                GET
              </span>
              <code className="text-sm">/stats</code>
            </div>
            <div className="p-4">
              <p className="text-gray-600 mb-3">Get database statistics.</p>
              <h4 className="font-medium text-gray-900 mt-4 mb-2">Example Response</h4>
              <pre className="bg-gray-100 px-3 py-2 rounded text-sm overflow-x-auto">
{`{
  "total": 1234,
  "confirmed_human": 1000,
  "suspected_ai": 150,
  "confirmed_ai": 50,
  "unverified": 34
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Response Format</h2>
        <p className="text-gray-600 mb-4">
          All responses are returned as JSON. Artist objects include the following fields:
        </p>
        <pre className="bg-gray-100 px-4 py-3 rounded text-sm overflow-x-auto">
{`{
  "id": "uuid",
  "name": "Artist Name",
  "slug": "artist-name",
  "status": "confirmed_human" | "suspected_ai" | "confirmed_ai" | "unverified",
  "spotify_id": "string | null",
  "apple_music_id": "string | null",
  "image_url": "string | null",
  "evidence_summary": "string | null",
  "monthly_listeners": "number | null",
  "genres": ["string"],
  "verified_at": "timestamp | null"
}`}
        </pre>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Rate Limiting</h2>
        <p className="text-gray-600">
          The public API is rate limited to 100 requests per minute. For higher limits and
          additional features, please{' '}
          <a href="/support" className="text-black underline hover:no-underline">
            contact us
          </a>{' '}
          about API access.
        </p>
      </section>
    </div>
  )
}
