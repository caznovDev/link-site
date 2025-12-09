
import { useState } from 'react';

export default function UploadCenter() {
  const [file, setFile] = useState(null);

  async function upload() {
    const fd = new FormData();
    fd.append('file', file);

    const res = await fetch('/api/upload?key=admin123', { method:'POST', body: fd });
    const json = await res.json();

    alert('Uploaded: ' + json.file_url);
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-3">Upload to R2</h2>
      <input type="file" onChange={e=>setFile(e.target.files[0])}/>
      <button onClick={upload} className="bg-green-600 px-4 py-2 rounded mt-2 block">Upload</button>
    </div>
  );
}
