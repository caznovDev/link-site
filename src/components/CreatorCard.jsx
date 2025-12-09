import { Link } from 'react-router-dom'

export default function CreatorCard({ model }) {
  return (
    <Link 
      to={`/model/${model.slug}`}
      className="group bg-netflix-dark rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200"
    >
      <div className="relative aspect-video">
        {model.banner_url ? (
          <img 
            src={model.banner_url} 
            alt={model.display_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-netflix-gray flex items-center justify-center">
            <span className="text-netflix-white text-4xl">🎬</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
      </div>
      <div className="p-4 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-netflix-red">
          {model.avatar_url ? (
            <img 
              src={model.avatar_url} 
              alt={model.display_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-netflix-gray flex items-center justify-center">
              <span className="text-lg">👤</span>
            </div>
          )}
        </div>
        <div>
          <h3 className="text-netflix-white font-semibold group-hover:text-white transition-colors">
            {model.display_name}
          </h3>
          <p className="text-sm text-gray-400">
            {model.video_count || 0} vídeos
          </p>
        </div>
      </div>
    </Link>
  )
}
