
export async function onRequestGet({ env, params }) {
  const { DB } = env;
  const slug = params.slug;

  const model = await DB.prepare("SELECT id FROM models WHERE slug = ?").bind(slug).first();
  if (!model) return new Response("Model not found", { status: 404 });

  const videos = await DB.prepare(
    "SELECT * FROM videos WHERE model_id = ? ORDER BY id DESC"
  ).bind(model.id).all();

  return new Response(JSON.stringify(videos), {
    headers: { "Content-Type": "application/json" },
  });
}
