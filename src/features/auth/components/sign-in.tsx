"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OctagonAlertIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ButtonLoader } from "@/components/global/button-loader";

import { loginSchema } from "@/schema";

import { useLogin } from "../api/use-login";

export const SignInView = () => {
  const { mutate, isPending, error } = useLogin();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    mutate(values);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden shadow-none min-w-sm">
        <CardContent className="">
          <CardHeader className="text-center font-bold text-2xl text-primary font-space">
            TootrUp
          </CardHeader>
          <Form {...form}>
            <form className="" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <p className="text-muted-foreground text-balance">
                    Welcome back! Sign in to manage your leads.
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="m@example.com"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="size-4 !text-destructive" />
                    <AlertTitle>{error.message}</AlertTitle>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isPending}>
                  <ButtonLoader
                    label="Sign in"
                    loadingText="Signing in"
                    isLoading={isPending}
                  />
                </Button>

                <div className="text-center text-sm  ">
                  Don&apos;t have an account?{" "}
                  <Link
                    href={"/sign-up"}
                    className="underline underline-offset-4 px-1"
                  >
                    sign-up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *[a]:hover:text-primary text-center text-xs text-balance *[a]:underline *[a]:underline-offset-4 ">
        By clicking continue, you agree to our{" "}
        <a href="#" className="">
          Terms of Services
        </a>
      </div>
    </div>
  );
};
