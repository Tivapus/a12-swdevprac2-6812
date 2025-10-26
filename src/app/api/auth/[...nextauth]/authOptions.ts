import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import userLogIn from "@/libs/userLogIn";
import getUserProfile from "@/libs/getUserProfile";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials as { email: string; password: string };
        try {
          const res = await userLogIn(email, password);
          // Expect res to contain token
          if (res && (res as any).token) {
            const token = (res as any).token as string;
            // get profile
            const profileRes = await getUserProfile(token);
            const user = profileRes?.data ?? { name: email, email };
            // attach token
            return { ...user, accessToken: token } as any;
          }
          return null;
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // first time jwt callback is run, user object is available
      if (user) {
        // @ts-ignore
        token.accessToken = (user as any).accessToken ?? (user as any).token ?? null;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // @ts-ignore
      if (token?.accessToken) {
        // @ts-ignore
        session.accessToken = token.accessToken;
      }
      // @ts-ignore
      if (token?.user) session.user = token.user as any;
      return session;
    },
  },
  session: { strategy: "jwt" },
  pages: { signIn: "/auth/signin" },
};
