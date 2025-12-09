import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function AdminGuard({ children }) {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    verifyAccess()
  }, [searchParams])

  async function verifyAccess() {
    const key = searchParams.get('key')
    
    if (!key) {
      setError('Chave de acesso não fornecida')
      setLoading(false)
      return
    }

    try {
      const res = await fetch(`/api/auth-check?key=${encodeURIComponent(key)}`)
      
      if (res.ok) {
        setIsAuthorized(true)
      } else {
        setError('Acesso não autorizado')
        setTimeout(() => navigate('/'), 2000)
      }
    } catch (err) {
      setError('Erro ao verificar acesso')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-netflix-white text-xl">Verificando acesso...</div>
      </div>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-netflix-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <div className="text-gray-400">Redirecionando...</div>
        </div>
      </div>
    )
  }

  return children
}
