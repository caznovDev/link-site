export async function onRequestPost(context) {
  const { env, request } = context
  const url = new URL(request.url)
  const key = url.searchParams.get('key')

  if (key !== env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file')

    if (!file) {
      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    const timestamp = Date.now()
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const fileName = `${timestamp}-${safeName}`

    await env.R2_BUCKET.put(fileName, file.stream(), {
      httpMetadata: {
        contentType: file.type
      }
    })

    const publicUrl = `${env.PUBLIC_R2}/${fileName}`

    return Response.json({ 
      success: true, 
      url: publicUrl,
      fileName 
    })
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 })
  }
}
