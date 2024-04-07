import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isOnSignUp = nextUrl.pathname.startsWith("/sign-up");
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn || isOnSignUp) return true;
      return false; // Redirect unauthenticated users to login page
    },
    async jwt({ token, account, profile, user }) {
      if (user?.accessToken) token.accessToken = user.accessToken;
      if (user?.userId) token.userId = user.userId;
      return token;
    },
    async session({ session, token, user }) {
      session.user.accessToken = token.accessToken ?? "";
      session.user.userId = token.userId;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  providers: [],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
} satisfies NextAuthConfig;
