
import { useState, useEffect } from 'react';
import ModelEditor from './ModelEditor';
import VideoEditor from './VideoEditor';
import UploadCenter from './UploadCenter';

export default function AdminDashboard() {
  const [tab, setTab] = useState('models');

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <div className="flex gap-4 mb-6">
        <button onClick={()=>setTab('models')} className="px-4 py-2 bg-neutral-800 rounded">Models</button>
        <button onClick={()=>setTab('videos')} className="px-4 py-2 bg-neutral-800 rounded">Videos</button>
        <button onClick={()=>setTab('upload')} className="px-4 py-2 bg-neutral-800 rounded">Upload</button>
      </div>

      {tab === 'models' && <ModelEditor />}
      {tab === 'videos' && <VideoEditor />}
      {tab === 'upload' && <UploadCenter />}
    </div>
  );
}
