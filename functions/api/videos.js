export async function onRequestPost(context) {
  const { env, request } = context
  const url = new URL(request.url)
  const key = url.searchParams.get('key')

  if (key !== env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { model_slug, slug, title, thumbnail_url, video_url, duration_seconds } = body

    if (!model_slug || !slug || !title || !video_url) {
      return Response.json({ error: 'model_slug, slug, title and video_url required' }, { status: 400 })
    }

    const model = await env.DB.prepare('SELECT id FROM models WHERE slug = ?').bind(model_slug).first()
    
    if (!model) {
      return Response.json({ error: 'Model not found' }, { status: 404 })
    }

    await env.DB.prepare(`
      INSERT INTO videos (model_id, slug, title, thumbnail_url, video_url, duration_seconds)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(model.id, slug, title, thumbnail_url || null, video_url, duration_seconds || 0).run()

    return Response.json({ success: true, slug })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
