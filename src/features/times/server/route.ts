import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";

import { Variables } from "@/lib/auth"
import { authMiddleware } from "@/lib/hono-middleware";
import { db } from "@/lib/db";


const app = new Hono<{ Variables: Variables }>().get("/", authMiddleware, zValidator("query", z.object({
    branchProgramId: z.string()
})), async (c) => {
    const user = c.get("user")
    if (!user) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    const { branchProgramId } = c.req.valid("query")

    const programs = await db.timeTable.findMany({
        where: {
            branchProgramId
        }
    })

    if (!programs) {
        throw new HTTPException(500, { message: "Server Error" })
    }

    return c.json({ data: programs })

}).post("/", authMiddleware, zValidator("json", z.object({
    startTime: z.string(),
    endTime: z.string(),
    branchProgramId: z.string()

})), async (c) => {
    const user = c.get("user")
    if (!user) {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    if (user.role !== "admin") {
        throw new HTTPException(401, { message: "Unauthorized" });
    }

    const { startTime, endTime, branchProgramId } = c.req.valid("json")

    const time = await db.timeTable.create({
        data: {
            startTime, endTime, branchProgramId
        }
    })
    if (!time) {
        throw new HTTPException(500, { message: "Unable to created" })
    }

    return c.json({ data: time })
})
    .delete("/:id", authMiddleware, async (c) => {

        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        if (user.role !== "admin") {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { id } = c.req.param()

        await db.timeTable.delete({
            where: {
                id
            }
        })


        return c.json({
            data: { id }
        })



    })

export default app