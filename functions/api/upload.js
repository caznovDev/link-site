
export async function onRequestPost({ request, env }) {
  const { R2, ADMIN_KEY } = env;
  const url = new URL(request.url);
  if (url.searchParams.get("key") !== ADMIN_KEY)
    return new Response("Unauthorized", { status: 401 });

  const form = await request.formData();
  const file = form.get("file");

  const key = `uploads/${Date.now()}_${file.name}`;
  await R2.put(key, file.stream());

  return new Response(JSON.stringify({ file_url: key }), {
    headers: { "Content-Type": "application/json" },
  });
}
