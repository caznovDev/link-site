
import { useState, useEffect } from 'react';

export default function ModelEditor() {
  const [models, setModels] = useState([]);
  const [form, setForm] = useState({ slug: '', display_name: '' });

  async function load() {
    const res = await fetch('/api/models');
    const json = await res.json();
    setModels(json.results || []);
  }

  async function save() {
    await fetch('/api/models?key=admin123', {
      method: 'POST',
      body: JSON.stringify(form)
    });
    load();
  }

  useEffect(()=>{ load(); }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Models</h2>
      <input placeholder="slug" className="bg-neutral-900 p-2 mb-2"
        onChange={e=>setForm({...form, slug:e.target.value})}/>
      <input placeholder="display name" className="bg-neutral-900 p-2 mb-2"
        onChange={e=>setForm({...form, display_name:e.target.value})}/>
      <button onClick={save} className="bg-blue-600 px-4 py-2 rounded">Save</button>

      <ul className="mt-4 text-neutral-400">
        {models.map(m => <li key={m.id}>{m.display_name}</li>)}
      </ul>
    </div>
  );
}
