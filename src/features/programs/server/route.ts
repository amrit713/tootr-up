import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
// import { z } from "zod";
import { HTTPException } from "hono/http-exception";

import { Variables } from "@/lib/auth"
import { authMiddleware } from "@/lib/hono-middleware";
import { db } from "@/lib/db";


const app = new Hono<{ Variables: Variables }>().get("/", authMiddleware, async (c) => {
    const user = c.get("user")
    if (!user) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    const programs = await db.program.findMany()

    if (!programs) {
        throw new HTTPException(500, { message: "Server Error" })
    }

    return c.json({ data: programs })

})

export default app