import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { getUser } from "./app/lib/data";
import { authConfig } from "./auth.config";

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log({ credentials });
        const parsedCredentials = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
            id: z.number(),
            name: z.string(),
          })
          .safeParse(credentials);

        console.log({ parsedCredentials });

        if (parsedCredentials.success) {
          const { email, id, name } = parsedCredentials.data;
          const user = await getUser({ email, id, name });
          if (!user) return null;
          return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
