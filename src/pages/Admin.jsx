
import { useState } from 'react';

export default function Admin() {
  const [slug, setSlug] = useState('');
  const [display_name, setName] = useState('');

  async function createModel() {
    await fetch('/api/models?key=admin123', {
      method: 'POST',
      body: JSON.stringify({ slug, display_name }),
    });
    alert('Created!');
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <input className="w-full p-2 mb-2 bg-neutral-800" placeholder="slug" onChange={e=>setSlug(e.target.value)} />
      <input className="w-full p-2 mb-2 bg-neutral-800" placeholder="name" onChange={e=>setName(e.target.value)} />
      <button onClick={createModel} className="bg-blue-600 px-4 py-2 rounded-lg">Save</button>
    </div>
  );
}
