export async function onRequestGet(context) {
  const { env, request } = context
  const url = new URL(request.url)
  const key = url.searchParams.get('key')

  if (!key || key !== env.ADMIN_KEY) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return Response.json({ success: true, authorized: true })
}
