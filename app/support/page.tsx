import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support PeopleMusic',
  description: 'Help support the mission of tracking authenticity in music.',
}

export default function SupportPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Support PeopleMusic</h1>
      <p className="text-lg text-gray-600 mb-8">
        PeopleMusic is an independent project dedicated to transparency in music. Your support
        helps us maintain the database, improve our verification methods, and keep the service
        free for everyone.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-12">
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">One-Time Donation</h2>
          <p className="text-gray-600 mb-4">
            Make a one-time contribution to support our work.
          </p>
          <a
            href="#"
            className="inline-block w-full text-center bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800"
          >
            Donate via PayPal
          </a>
        </div>

        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Monthly Support</h2>
          <p className="text-gray-600 mb-4">
            Become a patron and support our ongoing work.
          </p>
          <a
            href="#"
            className="inline-block w-full text-center bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800"
          >
            Join on Patreon
          </a>
        </div>
      </div>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Where Your Support Goes</h2>
        <ul className="space-y-3 text-gray-600">
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span><strong>Database maintenance:</strong> Hosting, infrastructure, and data updates</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span><strong>Research:</strong> Improving AI detection methods and verification processes</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span><strong>Human review:</strong> Expert verification of complex cases</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-green-600 mt-1">✓</span>
            <span><strong>API development:</strong> Building tools for the music industry</span>
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Other Ways to Help</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            <strong>Submit artists:</strong> Help grow our database by{' '}
            <a href="/submit" className="text-black underline hover:no-underline">
              submitting information
            </a>{' '}
            about artists you know.
          </p>
          <p>
            <strong>Spread the word:</strong> Share PeopleMusic with music fans, journalists,
            and industry professionals who care about authenticity.
          </p>
          <p>
            <strong>Provide feedback:</strong> Help us improve by reporting inaccuracies or
            suggesting new features.
          </p>
        </div>
      </section>

      <div className="bg-gray-50 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Questions?</h2>
        <p className="text-gray-600">
          For questions about donations or partnership opportunities, reach out to us at{' '}
          <span className="font-medium">support@peoplemusic.org</span>
        </p>
      </div>
    </div>
  )
}
