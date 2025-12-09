import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import AdminGuard from '../components/AdminGuard'
import Navbar from '../components/Navbar'

export default function Admin() {
  const [searchParams] = useSearchParams()
  const adminKey = searchParams.get('key')
  
  const [activeTab, setActiveTab] = useState('model')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [modelForm, setModelForm] = useState({
    slug: '',
    display_name: '',
    bio: '',
    gateway_url: ''
  })

  const [videoForm, setVideoForm] = useState({
    model_slug: '',
    slug: '',
    title: '',
    video_url: '',
    thumbnail_url: '',
    duration_seconds: ''
  })

  const [jsonImport, setJsonImport] = useState('')
  const [uploadFile, setUploadFile] = useState(null)

  function showMessage(type, text) {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  async function handleCreateModel(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/models?key=${adminKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modelForm)
      })
      const data = await res.json()
      if (res.ok) {
        showMessage('success', 'Modelo criado com sucesso!')
        setModelForm({ slug: '', display_name: '', bio: '', gateway_url: '' })
      } else {
        showMessage('error', data.error || 'Erro ao criar modelo')
      }
    } catch (err) {
      showMessage('error', 'Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateVideo(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch(`/api/videos?key=${adminKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...videoForm,
          duration_seconds: parseInt(videoForm.duration_seconds) || 0
        })
      })
      const data = await res.json()
      if (res.ok) {
        showMessage('success', 'Vídeo criado com sucesso!')
        setVideoForm({ model_slug: '', slug: '', title: '', video_url: '', thumbnail_url: '', duration_seconds: '' })
      } else {
        showMessage('error', data.error || 'Erro ao criar vídeo')
      }
    } catch (err) {
      showMessage('error', 'Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  async function handleUpload() {
    if (!uploadFile) return
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', uploadFile)
      
      const res = await fetch(`/api/upload?key=${adminKey}`, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (res.ok) {
        showMessage('success', `Upload concluído! URL: ${data.url}`)
        setUploadFile(null)
      } else {
        showMessage('error', data.error || 'Erro no upload')
      }
    } catch (err) {
      showMessage('error', 'Erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  async function handleImportJson() {
    if (!jsonImport.trim()) return
    setLoading(true)
    try {
      const parsed = JSON.parse(jsonImport)
      const res = await fetch(`/api/crawler?key=${adminKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      })
      const data = await res.json()
      if (res.ok) {
        showMessage('success', `Importação concluída! ${data.imported || 0} itens importados.`)
        setJsonImport('')
      } else {
        showMessage('error', data.error || 'Erro na importação')
      }
    } catch (err) {
      showMessage('error', 'JSON inválido ou erro de conexão')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-netflix-gray text-white px-4 py-2 rounded border border-gray-600 focus:border-netflix-red focus:outline-none"
  const btnClass = "px-6 py-2 bg-netflix-red text-white rounded font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"

  return (
    <AdminGuard>
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        
        <main className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-white mb-6">Painel Admin</h1>

          {message.text && (
            <div className={`mb-6 p-4 rounded ${message.type === 'success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
              {message.text}
            </div>
          )}

          <div className="flex gap-2 mb-6">
            {['model', 'video', 'upload', 'import'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  activeTab === tab 
                    ? 'bg-netflix-red text-white' 
                    : 'bg-netflix-gray text-gray-300 hover:bg-gray-600'
                }`}
              >
                {tab === 'model' && 'Criar Modelo'}
                {tab === 'video' && 'Criar Vídeo'}
                {tab === 'upload' && 'Upload R2'}
                {tab === 'import' && 'Importar JSON'}
              </button>
            ))}
          </div>

          <div className="bg-netflix-dark p-6 rounded-lg">
            {activeTab === 'model' && (
              <form onSubmit={handleCreateModel} className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-1">Slug (URL)</label>
                  <input
                    type="text"
                    value={modelForm.slug}
                    onChange={e => setModelForm({...modelForm, slug: e.target.value})}
                    className={inputClass}
                    placeholder="exemplo-slug"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Nome</label>
                  <input
                    type="text"
                    value={modelForm.display_name}
                    onChange={e => setModelForm({...modelForm, display_name: e.target.value})}
                    className={inputClass}
                    placeholder="Nome do Criador"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Bio</label>
                  <textarea
                    value={modelForm.bio}
                    onChange={e => setModelForm({...modelForm, bio: e.target.value})}
                    className={inputClass}
                    rows="3"
                    placeholder="Descrição do criador..."
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Gateway URL (+18)</label>
                  <input
                    type="url"
                    value={modelForm.gateway_url}
                    onChange={e => setModelForm({...modelForm, gateway_url: e.target.value})}
                    className={inputClass}
                    placeholder="https://..."
                  />
                </div>
                <button type="submit" disabled={loading} className={btnClass}>
                  {loading ? 'Criando...' : 'Criar Modelo'}
                </button>
              </form>
            )}

            {activeTab === 'video' && (
              <form onSubmit={handleCreateVideo} className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-1">Slug do Modelo</label>
                  <input
                    type="text"
                    value={videoForm.model_slug}
                    onChange={e => setVideoForm({...videoForm, model_slug: e.target.value})}
                    className={inputClass}
                    placeholder="slug-do-modelo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Slug do Vídeo</label>
                  <input
                    type="text"
                    value={videoForm.slug}
                    onChange={e => setVideoForm({...videoForm, slug: e.target.value})}
                    className={inputClass}
                    placeholder="slug-do-video"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Título</label>
                  <input
                    type="text"
                    value={videoForm.title}
                    onChange={e => setVideoForm({...videoForm, title: e.target.value})}
                    className={inputClass}
                    placeholder="Título do vídeo"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">URL do Vídeo</label>
                  <input
                    type="url"
                    value={videoForm.video_url}
                    onChange={e => setVideoForm({...videoForm, video_url: e.target.value})}
                    className={inputClass}
                    placeholder="https://..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">URL da Thumbnail</label>
                  <input
                    type="url"
                    value={videoForm.thumbnail_url}
                    onChange={e => setVideoForm({...videoForm, thumbnail_url: e.target.value})}
                    className={inputClass}
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1">Duração (segundos)</label>
                  <input
                    type="number"
                    value={videoForm.duration_seconds}
                    onChange={e => setVideoForm({...videoForm, duration_seconds: e.target.value})}
                    className={inputClass}
                    placeholder="120"
                  />
                </div>
                <button type="submit" disabled={loading} className={btnClass}>
                  {loading ? 'Criando...' : 'Criar Vídeo'}
                </button>
              </form>
            )}

            {activeTab === 'upload' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-1">Arquivo</label>
                  <input
                    type="file"
                    onChange={e => setUploadFile(e.target.files[0])}
                    className="w-full text-white"
                  />
                </div>
                {uploadFile && (
                  <p className="text-gray-400">Selecionado: {uploadFile.name}</p>
                )}
                <button 
                  onClick={handleUpload} 
                  disabled={loading || !uploadFile} 
                  className={btnClass}
                >
                  {loading ? 'Enviando...' : 'Fazer Upload'}
                </button>
              </div>
            )}

            {activeTab === 'import' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-1">JSON de Importação</label>
                  <textarea
                    value={jsonImport}
                    onChange={e => setJsonImport(e.target.value)}
                    className={inputClass}
                    rows="10"
                    placeholder='{"videos": [{"model_slug": "...", "slug": "...", "title": "...", "video_url": "..."}]}'
                  />
                </div>
                <button 
                  onClick={handleImportJson} 
                  disabled={loading || !jsonImport.trim()} 
                  className={btnClass}
                >
                  {loading ? 'Importando...' : 'Importar JSON'}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </AdminGuard>
  )
}
