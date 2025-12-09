export async function onRequestGet(context) {
  const { env, params } = context
  const { slug } = params

  try {
    const model = await env.DB.prepare(`
      SELECT m.*, 
        (SELECT COUNT(*) FROM videos WHERE model_id = m.id) as video_count
      FROM models m
      WHERE m.slug = ?
    `).bind(slug).first()

    if (!model) {
      return Response.json({ error: 'Model not found' }, { status: 404 })
    }

    return Response.json(model)
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
