import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-netflix-black border-b border-netflix-gray px-4 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-netflix-red text-2xl font-bold">SFW</span>
          <span className="text-netflix-white text-xl">Hub</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="text-netflix-white hover:text-white transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  )
}
