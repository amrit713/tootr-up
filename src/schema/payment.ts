import { z } from "zod";



export const createPaymentSchema = z.object({
    // payment section
    studentId: z.string(),
    totalFee: z.number(),
    totalFeeAfterDiscount: z.number(),
    taxableAmount: z.number(),
    discountPercent: z.number().optional(),
    discountPrice: z.number().optional(),
    vatAmount: z.number(),
    paidAmount: z.number(),
})



export const updatePaymentSchema = z.object({
    dueAmount: z.coerce.number(),
})


