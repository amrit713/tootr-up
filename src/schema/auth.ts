import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("This is not valid email"),
    password: z.string().min(6),
});

export const signupSchema = z
    .object({
        name: z.string().min(1, { message: "Name is required" }),
        email: z.string().email(),
        password: z.string().min(8, { message: "Password is too short" }),
        confirmPassword: z
            .string()
            .min(1, { message: "confirm password is required" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Password don't match",
        path: ["confirmPassword"],
    });

