// lib/auth.ts
import { db } from "@/lib/db";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import logger from "./logger";
import { users } from "./schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const email = credentials.email as string;
                const password = credentials.password as string;

                const [user] = await db
                    .select()
                    .from(users)
                    .where(eq(users.email, email))
                    .limit(1);

                if (!user || !user.hashedPassword) {
                    logger.warn("Authorization failed: User not found", {
                        email,
                    });
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(
                    password,
                    user.hashedPassword
                );

                if (passwordsMatch) {
                    logger.info("User authorized successfully", {
                        email: user.email,
                    });
                    return user;
                }

                logger.warn("Authorization failed: Invalid password", {
                    email: credentials.email,
                });
                return null;
            },
        }),
    ],
    events: {
        async signIn({ user }) {
            logger.info("User signed in", {
                userId: user.id,
                email: user.email,
            });
        },
        async signOut(message) {
            // message might contain session info depending on exact version
            logger.info("User signed out");
        },
    },
    pages: {
        signIn: "/login", // Use our custom login page
    },
});
