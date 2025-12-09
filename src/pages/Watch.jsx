import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Plyr from 'plyr-react'
import 'plyr-react/plyr.css'
import Navbar from '../components/Navbar'
import VideoCard from '../components/VideoCard'

export default function Watch() {
  const { slug } = useParams()
  const [video, setVideo] = useState(null)
  const [model, setModel] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchVideo()
  }, [slug])

  async function fetchVideo() {
    try {
      setLoading(true)
      const res = await fetch(`/api/video-${slug}`)
      if (!res.ok) throw new Error('Video não encontrado')
      
      const data = await res.json()
      setVideo(data.video)
      setModel(data.model)
      setSuggestions(data.suggestions || [])
    } catch (err) {
      console.error('Erro ao carregar vídeo:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="flex justify-center py-20">
          <div className="text-netflix-white text-xl">Carregando...</div>
        </div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Vídeo não encontrado</p>
        </div>
      </div>
    )
  }

  const plyrOptions = {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'mute',
      'volume',
      'settings',
      'fullscreen'
    ]
  }

  const plyrSource = {
    type: 'video',
    sources: [
      {
        src: video.video_url,
        type: 'video/mp4'
      }
    ],
    poster: video.thumbnail_url
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-black rounded-lg overflow-hidden aspect-video">
              <Plyr source={plyrSource} options={plyrOptions} />
            </div>
            
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-white mb-2">
                {video.title}
              </h1>
              
              {model && (
                <Link 
                  to={`/model/${model.slug}`}
                  className="flex items-center gap-3 mt-4 group"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-netflix-red">
                    {model.avatar_url ? (
                      <img 
                        src={model.avatar_url} 
                        alt={model.display_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-netflix-gray flex items-center justify-center">
                        <span>👤</span>
                      </div>
                    )}
                  </div>
                  <span className="text-netflix-white group-hover:text-white transition-colors">
                    {model.display_name}
                  </span>
                </Link>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <h2 className="text-xl font-bold text-netflix-white mb-4">
              Mais Vídeos
            </h2>
            {suggestions.length === 0 ? (
              <p className="text-gray-400">Nenhuma sugestão disponível</p>
            ) : (
              <div className="space-y-4">
                {suggestions.map(vid => (
                  <VideoCard key={vid.id} video={vid} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
