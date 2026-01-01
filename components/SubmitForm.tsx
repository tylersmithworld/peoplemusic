'use client'

import { useState, FormEvent } from 'react'

export default function SubmitForm() {
  const [artistName, setArtistName] = useState('')
  const [email, setEmail] = useState('')
  const [claim, setClaim] = useState<'is_human' | 'is_ai'>('is_human')
  const [evidence, setEvidence] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          artist_name: artistName,
          submitted_by_email: email || null,
          claim,
          evidence_provided: evidence || null,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit')
      }

      setSubmitted(true)
    } catch {
      setError('Failed to submit. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 text-xl font-semibold mb-2">Thank you!</div>
        <p className="text-gray-600">
          Your submission has been received and will be reviewed by our team.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="artistName" className="block text-sm font-medium text-gray-700 mb-1">
          Artist Name *
        </label>
        <input
          type="text"
          id="artistName"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Your Email (optional)
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="For follow-up questions"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">What are you claiming? *</label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="claim"
              value="is_human"
              checked={claim === 'is_human'}
              onChange={() => setClaim('is_human')}
              className="text-black focus:ring-black"
            />
            <span>This artist is human</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="claim"
              value="is_ai"
              checked={claim === 'is_ai'}
              onChange={() => setClaim('is_ai')}
              className="text-black focus:ring-black"
            />
            <span>This artist is AI-generated</span>
          </label>
        </div>
      </div>

      <div>
        <label htmlFor="evidence" className="block text-sm font-medium text-gray-700 mb-1">
          Evidence or Reasoning
        </label>
        <textarea
          id="evidence"
          value={evidence}
          onChange={(e) => setEvidence(e.target.value)}
          rows={4}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          placeholder="Links, screenshots, analysis, or any information that supports your claim..."
        />
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
