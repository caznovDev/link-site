
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { buildMeta } from '../utils/seo';

export default function ModelPage() {
  const { slug } = useParams();
  const [model, setModel] = useState(null);

  useEffect(() => {
    fetch('/api/models')
      .then(r => r.json())
      .then(json => {
        const m = json.results.find(x => x.slug === slug);
        setModel(m);

        if (m) {
          buildMeta({
            title: m.display_name + " - SFW Hub",
            description: m.bio || "Creator profile",
            image: m.avatar_url,
            url: `https://yourdomain.com/model/${slug}`
          });
        }
      });
  }, [slug]);

  if (!model) return <p>Loading...</p>;

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold">{model.display_name}</h1>
      <p className="opacity-70 mt-2">{model.bio}</p>
    </div>
  );
}
