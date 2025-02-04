// import axiosInstance from "@/app/utils/axios.helper";
// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import {jwtDecode} from "jwt-decode"

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       email: string;
//       role: string;
//     };
//     accessToken?: string;
//   }}

// export const authOptions: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//     maxAge: 60 * 60 * 1, //1h
//   },
//   secret: process.env.NEXT_PUBLIC_JWT_SECRET,
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {},
//       async authorize(credentials: any) {
//         try {
//           console.log("Authorizing...", credentials);
          
//           // login with API
//           const response = await axiosInstance.post("/auth/login", {
//             email: credentials.email,
//             password: credentials.password,
//           });

//           const data = response.data;
//           console.log("Login response:", data);

//           // decode token response
//           const tokenPayload = JSON.parse(atob(data.token.split('.')[1]))
//           // const withJwtDecode = jwtDecode(data.token)
//           console.log("tokenPayload", tokenPayload)
//           // console.log("withJwtDecode", withJwtDecode)

//           if (!data.token) {
//             throw new Error("Authentication Failed");
//           }

//           // Return user data
//           return {
//             id: tokenPayload.id,
//             email: tokenPayload.email,
//             role: tokenPayload.role,
//             accessToken: data.token,
//           };
//         } catch (error: any) {
//           console.error("Auth error:", error);
//           throw new Error(error.response?.data?.message || "Authentication failed");
//         }
//       },
//     }),
//   ],
  
//   callbacks: {
//     async jwt({ token, user }: any) {
//       if (user) {
//         // Save both user data and access token
//         return {
//           ...token,
//           id: user.id,
//           email: user.email,
//           role: user.role,
//           accessToken: user.accessToken // Save the access token
//         };
//       }
//       return token;
//     },

//     async session({ session, token }: any) {
//       // Add user data and token to session
//       session.user = {
//         id: token.id,
//         email: token.email,
//         role: token.role,
//       };
//       session.accessToken = token.accessToken; // Add the access token to session
//       return session;
//     },
//   },

//   pages: {
//     signIn: "/auth/login",
//     error: "/auth/login" // Add error page
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };







