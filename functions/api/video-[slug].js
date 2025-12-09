export async function onRequestGet(context) {
  const { env, params } = context
  const { slug } = params

  try {
    const video = await env.DB.prepare('SELECT * FROM videos WHERE slug = ?').bind(slug).first()

    if (!video) {
      return Response.json({ error: 'Video not found' }, { status: 404 })
    }

    await env.DB.prepare('UPDATE videos SET views = views + 1 WHERE id = ?').bind(video.id).run()

    const model = await env.DB.prepare('SELECT * FROM models WHERE id = ?').bind(video.model_id).first()

    const { results: suggestions } = await env.DB.prepare(`
      SELECT * FROM videos 
      WHERE model_id = ? AND id != ?
      ORDER BY RANDOM()
      LIMIT 5
    `).bind(video.model_id, video.id).all()

    return Response.json({
      video,
      model,
      suggestions
    })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
