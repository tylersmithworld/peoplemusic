import Link from 'next/link'

export default function Nav() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="font-bold text-xl tracking-tight">
            PeopleMusic
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/methodology" className="text-gray-600 hover:text-gray-900 text-sm">
              Methodology
            </Link>
            <Link href="/submit" className="text-gray-600 hover:text-gray-900 text-sm">
              Submit
            </Link>
            <Link href="/api-docs" className="text-gray-600 hover:text-gray-900 text-sm">
              API
            </Link>
            <Link
              href="/support"
              className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
            >
              Support
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
