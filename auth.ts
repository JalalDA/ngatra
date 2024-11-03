import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma";
import credentials from "next-auth/providers/credentials";
import { compareSync } from "bcrypt-ts";
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  pages : {
    signIn : '/login'
  },
  providers: [
    credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        const { email, password } = credentials
        const user = await prisma.user.findFirst({
          where: { email : `${email}` }
        })
        if(!user){
          throw new Error("User tidak ditemukan")
        }

        const passwordMatch = compareSync(`${password}` , user?.password!)
        if(!passwordMatch) return null

        return user
      }
    })
  ],
  callbacks : {
    authorized({auth, request : {nextUrl}}){
      const isLoggedIn = !!auth?.user?.id
      console.log({isLoggedIn});
      const protectedRoutes = [`/dashboard`]
      if(!isLoggedIn && protectedRoutes.includes(nextUrl.pathname)){
        return Response.redirect(new URL('/login', nextUrl))
      }
      if(isLoggedIn && nextUrl.pathname === "/login"){
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    }
  }
})
