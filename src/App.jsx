import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Model from './pages/Model'
import Watch from './pages/Watch'
import Admin from './pages/Admin'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/model/:slug" element={<Model />} />
        <Route path="/watch/:slug" element={<Watch />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  )
}
