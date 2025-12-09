
export async function onRequestPost({ request, env }) {
  const { DB, R2, ADMIN_KEY } = env;
  const url = new URL(request.url);
  if (url.searchParams.get("key") !== ADMIN_KEY)
    return new Response("Unauthorized", { status: 401 });

  const body = await request.json();
  const { jsonUrl, modelSlug } = body;

  const remote = await fetch(jsonUrl);
  const items = await remote.json();

  const model = await DB.prepare("SELECT id FROM models WHERE slug=?").bind(modelSlug).first();
  if (!model) return new Response(JSON.stringify({ error: "model not found"}), {status:404});

  let count=0;

  for (const v of items) {
    if (!v.video_url) continue;

    const videoRes = await fetch(v.video_url);
    const buf = await videoRes.arrayBuffer();
    const key = `videos/${Date.now()}_${Math.random().toString(36).slice(2)}.mp4`;

    await R2.put(key, buf);

    await DB.prepare(
      "INSERT INTO videos (slug,title,thumbnail_url,video_url,model_id) VALUES (?,?,?,?,?)"
    ).bind(
      v.slug || Math.random().toString(36).slice(2),
      v.title || "Untitled",
      v.thumbnail_url || "",
      key,
      model.id
    ).run();

    count++;
  }

  return new Response(JSON.stringify({ success:true, count }), { headers:{ "Content-Type":"application/json" }});
}
