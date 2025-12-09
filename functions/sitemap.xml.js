
export async function onRequestGet({ env }) {
  const { DB } = env;
  const models = await DB.prepare("SELECT slug FROM models").all();
  const videos = await DB.prepare("SELECT slug FROM videos").all();

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  xml += `<url><loc>https://yourdomain.com/</loc></url>
`;

  for (const m of models.results) {
    xml += `<url><loc>https://yourdomain.com/model/${m.slug}</loc></url>
`;
  }
  for (const v of videos.results) {
    xml += `<url><loc>https://yourdomain.com/watch/${v.slug}</loc></url>
`;
  }
  xml += `</urlset>`;

  return new Response(xml, { headers: { "Content-Type": "application/xml" }});
}
