import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./app/types/definitions";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        // Fetch user data from the server using the provided credentials
        const response = await fetch(
          `${process.env.NEXT_API_BASE_URL}/auth/user`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${credentials.accessToken}`,
            },
          }
        );
        const userData: User = await response.json();

        // Return an object containing the user's authentication data
        return {
          ...credentials,
          accessToken: {
            value: credentials.accessToken as string,
            // Set expiration time for access token to 1 hour from current time
            expiresAt: Math.floor(Date.now() / 1000 + 3600),
          },
          userId: userData.id,
          email: userData.email,
          name: userData.name,
        };
      },
    }),
  ],
});
