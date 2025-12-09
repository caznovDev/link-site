export async function onRequestGet(context) {
  const { env, params } = context
  const { slug } = params

  try {
    const model = await env.DB.prepare('SELECT gateway_url FROM models WHERE slug = ?').bind(slug).first()

    if (!model || !model.gateway_url) {
      return new Response('Not Found', { status: 404 })
    }

    return Response.redirect(model.gateway_url, 307)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
