import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

export interface AccessToken {
  value: string;
  expiresAt: number;
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: AccessToken;
    userId?: number;
  }
}

declare module "next-auth" {
  interface Session {
    user: {
      accessToken?: AccessToken;
    } & DefaultSession["user"];
  }

  interface User {
    accessToken?: AccessToken;
    userId?: number;
  }
}
