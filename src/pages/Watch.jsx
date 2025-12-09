
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Player from '../components/Player';
import { buildMeta } from '../utils/seo';

export default function Watch() {
  const { slug } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch(`/api/video/meta/${slug}`)
      .then(r => r.json())
      .then(v => {
        setVideo(v);
        buildMeta({
          title: v.title + " - SFW Hub",
          description: "Watch video",
          image: v.thumbnail_url,
          url: `https://yourdomain.com/watch/${slug}`
        });
      });
  }, [slug]);

  if (!video) return <p>Loading…</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      <Player src={video.video_url} poster={video.thumbnail_url} />
      <h1 className="mt-4 text-2xl">{video.title}</h1>
    </div>
  );
}
