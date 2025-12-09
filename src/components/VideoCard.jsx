import { Link } from 'react-router-dom'

function formatDuration(seconds) {
  if (!seconds) return '0:00'
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

function formatViews(views) {
  if (!views) return '0'
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`
  return views.toString()
}

export default function VideoCard({ video }) {
  return (
    <Link 
      to={`/watch/${video.slug}`}
      className="group bg-netflix-dark rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
    >
      <div className="relative aspect-video">
        {video.thumbnail_url ? (
          <img 
            src={video.thumbnail_url} 
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-netflix-gray flex items-center justify-center">
            <span className="text-netflix-white text-4xl">🎥</span>
          </div>
        )}
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
          {formatDuration(video.duration_seconds)}
        </div>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
          <span className="text-4xl opacity-0 group-hover:opacity-100 transition-opacity">▶️</span>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-netflix-white font-medium text-sm line-clamp-2 group-hover:text-white transition-colors">
          {video.title}
        </h3>
        <p className="text-xs text-gray-400 mt-1">
          {formatViews(video.views)} visualizações
        </p>
      </div>
    </Link>
  )
}
