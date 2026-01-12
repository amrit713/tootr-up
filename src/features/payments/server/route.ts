import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { HTTPException } from "hono/http-exception";

import { Variables } from "@/lib/auth"
import { authMiddleware } from "@/lib/hono-middleware";
import { db } from "@/lib/db";
import { createPaymentSchema, updatePaymentSchema } from "@/schema";
import { PaymentStatus } from "@/generated/prisma/browser";


const app = new Hono<{ Variables: Variables }>()
    .post("/", authMiddleware, zValidator("json", createPaymentSchema), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }



        const { totalFee, totalFeeAfterDiscount, taxableAmount, discountPrice, vatAmount, studentId, paidAmount, } = c.req.valid("json")

        const dueAmount = totalFeeAfterDiscount - paidAmount

        const payment = await db.payment.create({
            data: {
                totalFee, totalFeeAfterDiscount, taxableAmount, discountPrice, studentId, vatAmount, paidAmount, dueAmount, paymentStatus: dueAmount === 0 ? PaymentStatus.PAID : PaymentStatus.PARTIAL
            }
        })
        if (!payment) {
            throw new HTTPException(500, { message: "Unable to created" })
        }

        return c.json({ data: payment })
    }).patch("/:id", authMiddleware, zValidator("json", updatePaymentSchema), async (c) => {
        const user = c.get("user")
        if (!user) {
            throw new HTTPException(401, { message: "Unauthorized" });
        }

        const { id } = c.req.param()
        const { dueAmount } = c.req.valid("json")

        const payment = await db.payment.findUnique({
            where: { id }
        })

        if (!payment) {
            throw new HTTPException(500, { message: "Unable to find payment" })
        }

        const remainingAmount = payment.dueAmount - dueAmount

        const now = new Date().toISOString();

        const updatedPayment = await db.payment.update({
            where: {
                id
            },
            data: {
                dueAmount: remainingAmount,
                paidAmount: payment.paidAmount + dueAmount,
                lastPaidDate: new Date(now),
                paymentStatus: remainingAmount === 0 ? PaymentStatus.PAID : PaymentStatus.PARTIAL
            }

        })

        if (!updatedPayment) {
            throw new HTTPException(500, { message: "Unable to created" })
        }

        return c.json({ data: updatedPayment })
    })


export default app