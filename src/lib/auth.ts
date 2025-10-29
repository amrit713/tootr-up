import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin as adminPlugin, openAPI } from "better-auth/plugins";
import { createAuthMiddleware, APIError } from "better-auth/api";

import { db } from "./db";
import { User, UserStatus } from "@/generated/prisma";

export const auth = betterAuth({
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false
    },

    user: {


        additionalFields: {
            status: {
                type: "string",
                required: false,
                defaultValue: UserStatus.PENDING,
                input: false
            },
            role: {
                type: "string",
                required: false,
                defaultValue: "user",
                input: false
            },
        }
    },

    plugins: [
        adminPlugin(),
        openAPI()
    ],

    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/sign-in/email") {
                const email = ctx.body?.email;
                if (email) {
                    const user = await ctx.context.adapter.findOne<User>({
                        model: "user",
                        where: [
                            {
                                field: "email",
                                operator: "eq",
                                value: email
                            }
                        ]
                    });


                    if (user) {
                        if (user.status === UserStatus.PENDING) {
                            throw new APIError("FORBIDDEN", { message: "Account pending approval." });
                        }
                        if (user.banned) {
                            throw new APIError("FORBIDDEN", { message: `Banned: ${user.banReason ?? ""}` });
                        }
                    }
                }
            }
        })
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