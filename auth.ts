import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import {
  findUserByEmail,
  verifyPassword,
  isAccountLocked,
  incrementLoginAttempts,
  resetLoginAttempts,
} from "./lib/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        const user = findUserByEmail(email);
        if (!user) return null;

        if (isAccountLocked(user)) {
          throw new Error("AccountLocked");
        }

        const isValid = await verifyPassword(password, user.password);
        if (!isValid) {
          incrementLoginAttempts(user);
          throw new Error("InvalidCredentials");
        }

        resetLoginAttempts(user);
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/signIn",
  },
  session: {
    strategy: "jwt",
  },
});