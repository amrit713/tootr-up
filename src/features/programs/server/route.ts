import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";

import { Variables } from "@/lib/auth"
import { authMiddleware } from "@/lib/hono-middleware";
import { db } from "@/lib/db";


const app = new Hono<{ Variables: Variables }>().get("/", authMiddleware, async (c) => {
    const user = c.get("user")
    if (!user) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    const programs = await db.program.findMany({
        orderBy: {
            createdAt: "asc"
        }
    })

    if (!programs) {
        throw new HTTPException(500, { message: "Server Error" })
    }

    return c.json({ data: programs })

}).post("/", authMiddleware, zValidator("json", z.object({
    name: z.string()

})), async (c) => {
    const user = c.get("user")
    if (!user) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    if (user.role !== "admin") {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    const { name } = c.req.valid("json")

    const program = await db.program.create({
        data: {
            name
        }
    })
    if (!program) {
        throw new HTTPException(500, { message: "Unable to created" })
    }

    return c.json({ data: program })
}).patch("/:id", authMiddleware, zValidator("json", z.object({ name: z.string() })), async (c) => {
    const user = c.get("user")
    if (!user) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    if (user.role !== "admin") {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    const { id } = c.req.param()

    const { name } = c.req.valid("json")

    const updatedProgram = await db.program.update({
        where: {
            id
        },
        data: {
            name
        }
    })

    if (!updatedProgram) {
        throw new HTTPException(500, { message: "Unable to created" })
    }

    return c.json({ data: updatedProgram })
}).delete("/:id", authMiddleware, async (c) => {

    const user = c.get("user")
    if (!user) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    if (user.role !== "admin") {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    const { id } = c.req.param()

    await db.program.delete({
        where: {
            id
        }
    })


    return c.json({
        data: { id }
    })



})

export default app