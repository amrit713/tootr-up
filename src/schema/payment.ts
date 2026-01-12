import { z } from "zod";



export const createPaymentSchema = z.object({
    studentId: z.string().min(1, "Student ID is required"),
    totalFee: z.number().min(0),
    totalFeeAfterDiscount: z.number().min(0),
    taxableAmount: z.number().min(0),
    vatAmount: z.number().min(0),
    paidAmount: z.number().min(0),
    // Use optional() to match the Form's requirement for nullable inputs
    discountPercent: z.number().optional(),
    discountAmount: z.number().optional(),
    discountPrice: z.number().optional(),
});



export const updatePaymentSchema = z.object({
    dueAmount: z.coerce.number(),
})


