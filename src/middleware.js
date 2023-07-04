import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export default async function middleware (req) {
  if (req.nextUrl.pathname.startsWith('/app')) {
    const session = await getToken({ req })
    if (!session) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
}
