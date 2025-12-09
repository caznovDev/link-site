
import Plyr from 'plyr';
import { useEffect, useRef } from 'react';
import 'plyr/dist/plyr.css';

export default function Player({ src, poster }) {
  const ref = useRef(null);

  useEffect(() => {
    const player = new Plyr(ref.current, {
      controls: ['play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
      autoplay: false,
      ratio: '16:9',
      iconUrl: '',
    });
    player.source = {
      type: 'video',
      sources: [{ src, type: 'video/mp4' }],
      poster,
    };
    return () => player.destroy();
  }, [src]);

  return <video ref={ref} className="plyr w-full rounded-lg" />;
}
