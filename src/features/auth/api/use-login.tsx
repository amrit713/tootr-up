"use client";

import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useRouter } from "next/navigation";

import { authClient } from "@/lib/auth-client";
import { loginSchema } from "../../../schema/auth";
import { toast } from "sonner";

export const useLogin = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async (json: z.infer<typeof loginSchema>) => {
      const response = await authClient.signIn.email(
        {
          email: json.email,
          password: json.password,
          callbackURL: "/",
        },
        {
          onSuccess: () => {
            toast.success("User login successfully! ✅");
            router.push("/");
            router.refresh();
          },
          onError: (ctx) => {
            toast.error(`${ctx.error.message} ⚠️`);
          },
        }
      );

      return response;
    },
  });

  return mutation;
};
