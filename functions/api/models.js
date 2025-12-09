
export async function onRequestGet({ env }) {
  const { DB } = env;
  const models = await DB.prepare("SELECT * FROM models ORDER BY id DESC").all();
  return new Response(JSON.stringify(models), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function onRequestPost({ request, env }) {
  const { DB, ADMIN_KEY } = env;
  const url = new URL(request.url);
  if (url.searchParams.get("key") !== ADMIN_KEY)
    return new Response("Unauthorized", { status: 401 });

  const data = await request.json();

  await DB.prepare(
    "INSERT INTO models (slug, display_name, avatar_url, banner_url, bio) VALUES (?, ?, ?, ?, ?)"
  ).bind(data.slug, data.display_name, data.avatar_url, data.banner_url, data.bio).run();

  return new Response(JSON.stringify({ success: true }));
}
