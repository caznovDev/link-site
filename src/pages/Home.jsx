
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [models, setModels] = useState([]);

  useEffect(() => {
    fetch('/api/models')
      .then(r => r.json())
      .then(setModels);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Creators</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {models.map(m => (
          <Link key={m.id} to={`/model/${m.slug}`}>
            <div className="bg-neutral-900 rounded-lg p-2 text-center hover:opacity-80 transition">
              <img src={m.avatar_url || '/placeholder.jpg'} className="rounded-lg" />
              <p className="mt-2 font-semibold">{m.display_name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
