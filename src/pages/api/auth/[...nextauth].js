import NextAuth from 'next-auth/next'
import Credentials from 'next-auth/providers/credentials'
import { dbUsers } from '@/actions/users'

export default NextAuth({
  providers: [
    Credentials({
      name: 'Credentials',
      async authorize (credentials, req) {
        if (!credentials) return null
        const { username, password } = credentials
        const user = await dbUsers.findUser({ username, password })
        if (!user) return null
        return user
      }
    })
  ],
  pages: {
    signIn: '/'
  },
  session: {
    strategy: 'jwt',
    maxAge: 2592000,
    updateAge: 86400
  },
  callbacks: {
    async jwt ({ token, user, account }) {
      if (account) {
        switch (account.type) {
          case 'credentials':
            token.user = user
            break
          default:
            break
        }
      }
      return token
    },
    async session ({ session, token }) {
      session.user = token.user
      return session
    }
  }
})
