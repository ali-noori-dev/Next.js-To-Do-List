import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./app/lib/data";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const userData = await getUser(credentials.token as string);
        return {
          ...credentials,
          ...userData,
          id: String(userData.id),
        };
      },
    }),
  ],
});
