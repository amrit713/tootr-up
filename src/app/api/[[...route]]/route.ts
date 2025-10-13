import { Hono } from "hono"
import { handle } from 'hono/vercel'

import authentication from "@/features/auth/server/route";
import leads from "@/features/leads/server/route";
import programs from "@/features/programs/server/route";
import branches from "@/features/branches/server/route";
import followups from "@/features/followUps/server/route";
import times from "@/features/times/server/route";
import students from "@/features/students/server/route";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", authentication)
    .route("/leads", leads).route("/programs", programs)
    .route("/followups", followups)
    .route("/branches", branches)
    .route("/times", times)
    .route("/students", students)

export const GET = handle(app)
export const POST = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)

export type AppType = typeof routes