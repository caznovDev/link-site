export async function onRequestPost(context) {
  const { env, request } = context
  const url = new URL(request.url)
  const key = url.searchParams.get('key')

  if (key !== env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { videos } = body

    if (!Array.isArray(videos)) {
      return Response.json({ error: 'videos array required' }, { status: 400 })
    }

    let imported = 0
    const errors = []

    for (const video of videos) {
      try {
        const { model_slug, slug, title, thumbnail_url, video_url, duration_seconds } = video

        if (!model_slug || !slug || !title || !video_url) {
          errors.push({ slug, error: 'Missing required fields' })
          continue
        }

        const model = await env.DB.prepare('SELECT id FROM models WHERE slug = ?').bind(model_slug).first()
        
        if (!model) {
          errors.push({ slug, error: `Model ${model_slug} not found` })
          continue
        }

        await env.DB.prepare(`
          INSERT OR IGNORE INTO videos (model_id, slug, title, thumbnail_url, video_url, duration_seconds)
          VALUES (?, ?, ?, ?, ?, ?)
        `).bind(model.id, slug, title, thumbnail_url || null, video_url, duration_seconds || 0).run()

        imported++
      } catch (err) {
        errors.push({ slug: video.slug, error: err.message })
      }
    }

    return Response.json({ 
      success: true, 
      imported,
      total: videos.length,
      errors: errors.length > 0 ? errors : undefined
    })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
