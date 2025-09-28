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

    const branches = await db.branch.findMany({
        orderBy: {
            createdAt: "asc"
        }
    })

    if (!branches) {
        throw new HTTPException(500, { message: "Server Error" })
    }

    return c.json({ data: branches })

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

    const branch = await db.branch.create({
        data: {
            name
        }
    })
    if (!branch) {
        throw new HTTPException(500, { message: "Unable to created" })
    }

    return c.json({ data: branch })
})
    .patch("/:branchId", authMiddleware, zValidator("json", z.object({
        name: z.string()

    })), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }
        if (user.role !== "admin") {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { branchId } = c.req.param()
        const { name } = c.req.valid("json")

        const branch = await db.branch.update({
            where: {
                id: branchId
            },
            data: {
                name
            }

        })

        if (!branch) {
            throw new HTTPException(404, { message: "programs not found" })
        }

        return c.json({
            data: branch
        })

    }
    )
    .delete("/:branchId", authMiddleware, async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }
        if (user.role !== "admin") {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { branchId } = c.req.param()

        await db.branch.delete({
            where: {
                id: branchId
            }
        })

        return c.json({
            data: {
                id: branchId
            }
        })
    }
    )
    .get("/:branchId/branch-programs", authMiddleware, async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { branchId } = c.req.param()

        const programs = await db.branchProgram.findMany({
            where: {
                branchId
            },
            include: {
                branch: {
                    select: {
                        name: true
                    }
                },
                program: {
                    select: {
                        name: true
                    }
                }
            }
        })

        if (!programs) {
            throw new HTTPException(404, { message: "programs not found" })
        }

        return c.json({
            data: programs
        })
    }).post("/:branchId/branch-programs", authMiddleware, zValidator("json", z.object({

        programId: z.string()
    })), async (c) => {

        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        if (user.role !== "admin") {
            throw new HTTPException(401, { message: "Unauthorized" });
        }
        const { branchId } = c.req.param()

        const { programId } = c.req.valid("json")

        const existingProgram = await db.branchProgram.findFirst({
            where: {
                branchId, programId
            }
        })

        if (existingProgram) {
            throw new HTTPException(401, { message: "This program is already in this branch " });
        }

        const branchProgram = await db.branchProgram.create({
            data: {
                branchId,
                programId

            }
        })
        if (!branchProgram) {
            throw new HTTPException(500, { message: "Unable to created" })
        }

        return c.json({ data: branchProgram })

    }).delete("/:branchId/branch-programs/:id", authMiddleware, async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        if (user.role !== "admin") {
            throw new HTTPException(401, { message: "Unauthorized" });
        }
        const { id, branchId } = c.req.param()

        await db.branchProgram.delete({
            where: {
                id,
            }
        })


        return c.json({
            data: {
                id, branchId
            }
        })
    })

export default app;