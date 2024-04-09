import type { NextAuthConfig } from "next-auth";
import { Token } from "./app/types/definitions";

/**
 * Configuration object for NextAuth.
 * Specifies various configuration options for authentication.
 */
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  // Define callback functions for various authentication events
  callbacks: {
    // This callback is executed when a user is authorized.
    authorized({ auth, request: { nextUrl } }) {
      const isOnSignUp = nextUrl.pathname.startsWith("/sign-up");
      const isLoggedIn = !!auth?.user;
      if (isLoggedIn || isOnSignUp) return true; // Allow access if the user is logged in or on the sign-up page
      return false; // Redirect unauthenticated users to login page
    },
    // This callback is executed when a JWT token is decoded.
    async jwt({ token, account, profile, user }) {
      const accessToken = token?.accessToken;
      // User data is available only after login
      if (user) {
        token.userId = user.userId;
        token.accessToken = user.accessToken;
      } else if (accessToken?.value) {
        // If user data is not available but the access token exists
        const expiresAt = accessToken.expiresAt;
        const currentTime = Math.floor(Date.now() / 1000); // Get the current timestamp
        if (expiresAt > currentTime) {
          // If the access token has not expired, return the token as is
          return token;
        } else {
          // If the access token has expired, refresh it
          const response = await fetch(
            `${process.env.NEXT_API_BASE_URL}/auth/refresh`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${accessToken.value}`,
              },
            }
          );
          const data: Token = await response.json();
          // Update the token with the refreshed access token and expiration time
          token.accessToken = {
            value: data.token,
            expiresAt: Math.floor(Date.now() / 1000 + 3600),
          };
        }
      }
      return token; // Return the updated token
    },
    // This callback is executed when a session is created.
    async session({ session, token, user }) {
      session.user.accessToken = token.accessToken;
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
