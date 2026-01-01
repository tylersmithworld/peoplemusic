import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} PeopleMusic. Tracking authenticity in music.
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="/methodology" className="text-gray-500 hover:text-gray-700">
              How We Verify
            </Link>
            <Link href="/submit" className="text-gray-500 hover:text-gray-700">
              Submit an Artist
            </Link>
            <Link href="/support" className="text-gray-500 hover:text-gray-700">
              Support Us
            </Link>
          </div>
        </div>
        {/* Ad slot placeholder */}
        <div className="mt-6 pt-6 border-t border-gray-200 text-center">
          <div className="inline-block bg-gray-100 text-gray-400 text-xs px-4 py-2 rounded">
            Ad Space
          </div>
        </div>
      </div>
    </footer>
  )
}
