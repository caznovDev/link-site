export async function onRequestGet(context) {
  const { env, request } = context
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page')) || 1
  const limit = parseInt(url.searchParams.get('limit')) || 12
  const offset = (page - 1) * limit

  try {
    const countResult = await env.DB.prepare('SELECT COUNT(*) as total FROM models').first()
    const total = countResult?.total || 0

    const { results } = await env.DB.prepare(`
      SELECT m.*, 
        (SELECT COUNT(*) FROM videos WHERE model_id = m.id) as video_count
      FROM models m
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?
    `).bind(limit, offset).all()

    return Response.json({
      models: results,
      page,
      limit,
      total,
      hasMore: offset + results.length < total
    })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}

export async function onRequestPost(context) {
  const { env, request } = context
  const url = new URL(request.url)
  const key = url.searchParams.get('key')

  if (key !== env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { slug, display_name, avatar_url, banner_url, bio, gateway_url } = body

    if (!slug || !display_name) {
      return Response.json({ error: 'slug and display_name required' }, { status: 400 })
    }

    await env.DB.prepare(`
      INSERT INTO models (slug, display_name, avatar_url, banner_url, bio, gateway_url)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(slug, display_name, avatar_url || null, banner_url || null, bio || null, gateway_url || null).run()

    return Response.json({ success: true, slug })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
