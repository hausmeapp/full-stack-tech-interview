import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

const API_URL = process.env.API_URL || "http://localhost:5000"

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password
            })
          })

          if (!res.ok) {
            return null
          }

          const data = await res.json()
          
          return {
            id: String(data.user.id),
            email: data.user.email,
            name: data.user.name,
            accessToken: data.access_token,
            refreshToken: data.refresh_token
          }
        } catch (error) {
          console.error("Auth error:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.refreshToken = user.refreshToken
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.accessToken = token.accessToken as string
        session.refreshToken = token.refreshToken as string
      }
      return session
    }
  },
  pages: {
    signIn: "/auth/login"
  },
  session: {
    strategy: "jwt"
  }
})
