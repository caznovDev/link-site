
import { useState, useEffect } from 'react';

export default function VideoEditor() {
  const [videos, setVideos] = useState([]);

  useEffect(()=>{
    async function load() {
      const res = await fetch('/api/videos/list-all');
      const json = await res.json();
      setVideos(json.results || []);
    }
    load();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Videos</h2>
      <ul className="text-neutral-400">
        {videos.map(v => (
          <li key={v.id}>{v.title}</li>
        ))}
      </ul>
    </div>
  );
}
