import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import VideoCard from '../components/VideoCard'

export default function Model() {
  const { slug } = useParams()
  const [model, setModel] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [slug])

  async function fetchData() {
    try {
      setLoading(true)
      const [modelRes, videosRes] = await Promise.all([
        fetch(`/api/model-${slug}`),
        fetch(`/api/model-videos-${slug}`)
      ])
      
      if (modelRes.ok) {
        const modelData = await modelRes.json()
        setModel(modelData)
      }
      
      if (videosRes.ok) {
        const videosData = await videosRes.json()
        setVideos(videosData.videos || [])
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
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

  if (!model) {
    return (
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">Criador não encontrado</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <div className="relative h-64 md:h-80">
        {model.banner_url ? (
          <img 
            src={model.banner_url} 
            alt={model.display_name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-netflix-gray" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      </div>

      <main className="max-w-7xl mx-auto px-4 -mt-24 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-netflix-red flex-shrink-0">
            {model.avatar_url ? (
              <img 
                src={model.avatar_url} 
                alt={model.display_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-netflix-gray flex items-center justify-center">
                <span className="text-4xl">👤</span>
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-white mb-2">
              {model.display_name}
            </h1>
            {model.bio && (
              <p className="text-gray-400 mb-4 max-w-2xl">
                {model.bio}
              </p>
            )}
            {model.gateway_url && (
              <a
                href={`/api/gateway-${model.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-netflix-red text-white font-semibold rounded hover:bg-red-700 transition-colors"
              >
                🔞 Ver Conteúdo +18
              </a>
            )}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-netflix-white mb-4">
          Vídeos ({videos.length})
        </h2>

        {videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Nenhum vídeo disponível</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8">
            {videos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
