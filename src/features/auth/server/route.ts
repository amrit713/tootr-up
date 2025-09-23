import { z } from "zod"
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";

import { auth, Variables } from "@/lib/auth";
import { HTTPException } from "hono/http-exception";
import { db } from "@/lib/db";
import { UserStatus } from "@/generated/prisma";

const app = new Hono<{
    Variables: Variables
}>()
    .use("*", async (c, next) => {
        const session = await auth.api.getSession({ headers: c.req.raw.headers });

        if (!session) {
            c.set("user", null);
            c.set("session", null);
            return next();
        }

        c.set("user", session.user);
        c.set("session", session.session);
        return next();
    })
    .post("/admin/status", zValidator("query", z.object({
        userId: z.string(), status: z.nativeEnum(UserStatus)
    })), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        if (user.role !== "admin") {
            throw new HTTPException(401, { message: "Unauthorized to perform this action" });
        }

        const { userId, status } = c.req.valid("query")



        const updatedUser = await db.user.update({
            where: {
                id: userId
            },
            data: {
                status
            }

        })

        if (!updatedUser) {
            throw new HTTPException(500, { message: "Unable to update user" });
        }


        return c.json({
            message: "updated successfully"
        })

    })
    .on(["POST", "GET"], "/*", (c) => {
        return auth.handler(c.req.raw);
    })

export default app;