import { z } from "zod";



export const createPaymentSchema = z.object({
    // payment section
    studentId: z.string(),
    totalFee: z.number(),
    totalFeeAfterDiscount: z.number(),
    taxableAmount: z.number(),
    discountPercent: z.number().optional(),
    discountAmount: z.number().optional().default(0),
    discountPrice: z.number().optional().default(0),
    vatAmount: z.number(),
    paidAmount: z.number(),
})



export const updatePaymentSchema = z.object({
    dueAmount: z.coerce.number(),
})


