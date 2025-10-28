"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { updatePaymentSchema } from "@/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { ButtonLoader } from "@/components/global/button-loader";
import { useModal } from "@/hooks/use-modal-store";
import { useUpdatePayment } from "../api/use-update-payment";

export const UpdatePaymentForm = ({
  dueAmount,
  id,
}: {
  dueAmount: number;
  id: string;
}) => {
  const { onClose } = useModal();
  const { mutate, isPending } = useUpdatePayment();

  const form = useForm<z.infer<typeof updatePaymentSchema>>({
    resolver: zodResolver(updatePaymentSchema),
    defaultValues: {
      dueAmount,
    },
  });

  const onSubmit = (values: z.infer<typeof updatePaymentSchema>) => {
    const finalValues = {
      ...values,
    };

    mutate(
      { param: { id }, json: finalValues },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Card
      className="w-full h-full border-none shadow-none
  "
    >
      <CardHeader className="flex px-6 ">
        <CardTitle className="font-bold text-xl font-space  text-center w-full">
          Update due payment
        </CardTitle>
      </CardHeader>
      <div className="px-6">
        <Form {...form}>
          <form
            action=""
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 my-2"
          >
            <FormField
              control={form.control}
              name="dueAmount"
              render={({ field }) => (
                <FormItem className=" flex flex-col gap-4">
                  <FormLabel>Due Amount</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      type="number"
                      placeholder="Remaining amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center  gap-4 ">
              <Button
                variant={"secondary"}
                type="button"
                className={cn("flex-1")}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="flex-1">
                <ButtonLoader
                  label="update payment"
                  loadingText="updating"
                  isLoading={isPending}
                />
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  );
};
