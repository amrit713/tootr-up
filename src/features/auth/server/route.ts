import { Hono } from "hono";
import { auth, Variables } from "@/lib/auth";

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
    .on(["POST", "GET"], "/*", (c) => {
        return auth.handler(c.req.raw);
    });

export default app;