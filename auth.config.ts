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
  },
  providers: [],
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,
} satisfies NextAuthConfig;
