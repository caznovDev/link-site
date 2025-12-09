
import { useState } from 'react';

export default function CrawlerImport() {
  const [jsonUrl, setJsonUrl] = useState('');
  const [modelSlug, setModelSlug] = useState('');

  async function runImport() {
    const res = await fetch('/api/crawler/import?key=admin123', {
      method: 'POST',
      body: JSON.stringify({ jsonUrl, modelSlug })
    });
    const out = await res.json();
    alert('Imported: ' + out.count + ' videos');
  }

  return (
    <div className="p-4 bg-neutral-900 rounded">
      <h2 className="text-xl font-bold mb-2">Bulk Crawler Import</h2>
      <input className="w-full p-2 mb-2 bg-neutral-800" placeholder="JSON URL" onChange={e=>setJsonUrl(e.target.value)}/>
      <input className="w-full p-2 mb-2 bg-neutral-800" placeholder="model slug" onChange={e=>setModelSlug(e.target.value)}/>
      <button onClick={runImport} className="bg-blue-600 px-4 py-2 rounded">Import</button>
    </div>
  );
}
