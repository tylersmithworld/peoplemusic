import { Metadata } from 'next'
import SubmitForm from '@/components/SubmitForm'

export const metadata: Metadata = {
  title: 'Submit an Artist - PeopleMusic',
  description: 'Submit information about an artist to help us verify whether they are human or AI-generated.',
}

export default function SubmitPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Submit an Artist</h1>
      <p className="text-gray-600 mb-8">
        Help us build the most comprehensive database of verified artists. Submit information
        about an artist you believe should be added or whose status should be reviewed.
      </p>

      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h2 className="font-semibold text-gray-900 mb-2">What makes good evidence?</h2>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          <li>Links to interviews, live performances, or behind-the-scenes content</li>
          <li>Social media profiles with consistent activity over time</li>
          <li>Press coverage from reputable music publications</li>
          <li>Official statements from labels or management</li>
          <li>Technical analysis of audio patterns (for AI claims)</li>
        </ul>
      </div>

      <SubmitForm />
    </div>
  )
}
