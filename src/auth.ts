import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/app/utils/auth.helper";
import NextAuth from "next-auth";

export const {handlers, signIn, signOut, auth} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1, //1h
  },
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          console.log("Authorizing...", credentials);

          // login with API
          const data = await login(credentials);
          console.log("Login response:", data);

          if (!data.access_token) {
            throw new Error("Authentication Failed");
          }

          return data;
        } catch (error: any) {
          console.error("Auth error:", error);
          throw new Error(
            error.response?.data?.message || "Authentication failed"
          );
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.referral = user.referral
        token.access_token = user.access_token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.role = token.role as string;
        session.user.referral = token.referral as string
        session.user.access_token = token.access_token as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
    error: "/auth/login", // Add error page
  },
})