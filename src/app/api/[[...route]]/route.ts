import { Hono } from "hono"
import { handle } from 'hono/vercel'

import authentication from "@/features/auth/server/route";
import leads from "@/features/leads/server/route";
import programs from "@/features/programs/server/route";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", authentication)
    .route("/leads", leads).route("/programs", programs)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes