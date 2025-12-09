export async function onRequestGet(context) {
  const { env, params, request } = context
  const { slug } = params
  const url = new URL(request.url)
  const page = parseInt(url.searchParams.get('page')) || 1
  const limit = parseInt(url.searchParams.get('limit')) || 20
  const offset = (page - 1) * limit

  try {
    const model = await env.DB.prepare('SELECT id FROM models WHERE slug = ?').bind(slug).first()
    
    if (!model) {
      return Response.json({ error: 'Model not found' }, { status: 404 })
    }

    const countResult = await env.DB.prepare('SELECT COUNT(*) as total FROM videos WHERE model_id = ?').bind(model.id).first()
    const total = countResult?.total || 0

    const { results } = await env.DB.prepare(`
      SELECT * FROM videos 
      WHERE model_id = ?
      ORDER BY created_at DESC
      LIMIT ? OFFSET ?
    `).bind(model.id, limit, offset).all()

    return Response.json({
      videos: results,
      page,
      limit,
      total,
      hasMore: offset + results.length < total
    })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
