import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./app/lib/data";
import { UserData } from "./app/lib/definitions";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, id, name } = credentials as any as UserData;
        const user = await getUser({ email, id, name });
        if (!user) return null;
        return user;
      },
    }),
  ],
});
