import axiosInstance from "@/app/utils/axios.helper";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: string;
    };
    accessToken?: string;
  }}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 1, //1h
  },
  secret: "test",
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials: any) {
        try {
          console.log("Authorizing...", credentials);
          
          // Fix axios call
          const response = await axiosInstance.post("/auth/login", {
            email: credentials.email,
            password: credentials.password,
          });

          const data = response.data;
          console.log("Login response:", data);

          const tokenPayload = JSON.parse(atob(data.token.split('.')[1]))

          if (!data.token) {
            throw new Error("Authentication Failed");
          }

          // Return user data
          return {
            id: tokenPayload.id,
            email: tokenPayload.email,
            role: tokenPayload.role,
            accessToken: data.token,
          };
        } catch (error: any) {
          console.error("Auth error:", error);
          throw new Error(error.response?.data?.message || "Authentication failed");
        }
      },
    }),
  ],
  
callbacks: {
  async jwt({ token, user }: any) {
    if (user) {
      // Simpan data dari token JWT backend ke session token NextAuth
      token.id = user.id;
      token.name = user.name;
      token.email = user.email;
      token.role = user.role; // Token asli dari backend
    }
    return token;
  },

  async session({ session, token }: any) {
    // Masukkan data token ke session yang bisa diakses di frontend
    session.user.email = token.email;
    session.user.role = token.role;
    session.user.email = token.email;
    session.accessToken = token.accessToken;
    return session;
  },
},

  pages: {
    signIn: "/auth/login",
    error: "/auth/login" // Add error page
  },
};

// Change this part: export named handlers instead of default export
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };



