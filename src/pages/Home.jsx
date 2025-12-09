import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import CreatorCard from '../components/CreatorCard'

export default function Home() {
  const [models, setModels] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    fetchModels()
  }, [page])

  async function fetchModels() {
    try {
      setLoading(true)
      const res = await fetch(`/api/models?page=${page}&limit=12`)
      const data = await res.json()
      setModels(data.models || [])
      setHasMore(data.hasMore || false)
    } catch (err) {
      console.error('Erro ao carregar modelos:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-netflix-black">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-netflix-white mb-2">
          Hot Challenges Hub
        </h1>
        <p className="text-gray-400 mb-8">
          Descubra os melhores criadores de conteúdo
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="text-netflix-white text-xl">Carregando...</div>
          </div>
        ) : models.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">Nenhum criador encontrado</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {models.map(model => (
                <CreatorCard key={model.id} model={model} />
              ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
              {page > 1 && (
                <button
                  onClick={() => setPage(p => p - 1)}
                  className="px-6 py-2 bg-netflix-gray text-netflix-white rounded hover:bg-netflix-red transition-colors"
                >
                  Anterior
                </button>
              )}
              {hasMore && (
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="px-6 py-2 bg-netflix-gray text-netflix-white rounded hover:bg-netflix-red transition-colors"
                >
                  Próximo
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
