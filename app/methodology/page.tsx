import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Our Methodology - PeopleMusic',
  description: 'How PeopleMusic verifies whether music artists are human or AI-generated.',
}

export default function MethodologyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Our Methodology</h1>

      <div className="prose prose-gray max-w-none">
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Verify Artists</h2>
          <p className="text-gray-600 mb-4">
            PeopleMusic uses a multi-layered approach to verify whether artists are human or AI-generated.
            Our process combines automated analysis with human review to ensure accuracy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Verification Levels</h2>

          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900">Confirmed Human</h3>
              <p className="text-gray-600 text-sm">
                Artists with verifiable evidence of human identity, including live performances,
                interviews, documented history, or official label verification.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-gray-900">Suspected AI</h3>
              <p className="text-gray-600 text-sm">
                Artists flagged by our analysis but not definitively proven to be AI-generated.
                Common indicators include: no live performances, synthetic-sounding vocals,
                rapid release schedules, or algorithmic composition patterns.
              </p>
            </div>

            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-gray-900">Confirmed AI</h3>
              <p className="text-gray-600 text-sm">
                Artists confirmed to be AI-generated through admission by creators,
                technical analysis, or clear documentation.
              </p>
            </div>

            <div className="border-l-4 border-gray-400 pl-4">
              <h3 className="font-semibold text-gray-900">Unverified</h3>
              <p className="text-gray-600 text-sm">
                Artists in our database that have not yet been assessed or for which
                we have insufficient evidence to make a determination.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Our Process</h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-600">
            <li>
              <strong>Initial Screening:</strong> Artists are added through submissions or
              automated monitoring of streaming platforms.
            </li>
            <li>
              <strong>Evidence Collection:</strong> We gather publicly available information
              including interviews, social media, live performances, and press coverage.
            </li>
            <li>
              <strong>Technical Analysis:</strong> For suspected AI cases, we analyze audio
              patterns, production metadata, and release behaviors.
            </li>
            <li>
              <strong>Human Review:</strong> Our team reviews all evidence before making
              a final determination.
            </li>
            <li>
              <strong>Ongoing Monitoring:</strong> Status can be updated as new information
              becomes available.
            </li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Transparency</h2>
          <p className="text-gray-600 mb-4">
            We believe in transparency. For each artist, we provide a summary of the evidence
            that led to their classification. If you believe an artist has been incorrectly
            classified, you can submit additional evidence for review.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Limitations</h2>
          <p className="text-gray-600 mb-4">
            We acknowledge that distinguishing between human and AI-generated content is
            increasingly challenging. Our classifications represent our best assessment based
            on available evidence, but they are not infallible. We continuously update our
            methods as AI detection technology evolves.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Appeals</h2>
          <p className="text-gray-600">
            Artists or their representatives can request a review of their classification
            by submitting additional evidence through our{' '}
            <a href="/submit" className="text-black underline hover:no-underline">
              submission form
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
