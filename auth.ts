import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { User } from "./app/types/definitions";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
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
        return {
          ...credentials,
          userId: userData.id,
          email: userData.email,
          name: userData.name,
        };
      },
    }),
  ],
});
