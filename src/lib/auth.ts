import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { db } from "./db";

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        // autoSignIn: false
    },

    advanced: {
        crossSubDomainCookies: {
            enabled: true,
        },
        defaultCookieAttributes: {
            sameSite: "none",
            secure: true,
            partitioned: true, // New browser standards will mandate this for foreign cookies
        },
    },
});

export type Variables = {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
};