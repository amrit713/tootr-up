"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { createPaymentSchema } from "@/schema";

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

import { cn, currencyFormatter, vatCalculate } from "@/lib/utils";

import { ButtonLoader } from "@/components/global/button-loader";
import { useModal } from "@/hooks/use-modal-store";

import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useStudentId } from "@/features/leads/hooks/use-student-id";
import { useCreatePayment } from "../api/use-create-payment";

export const CreatePaymentForm = () => {
  const { onClose } = useModal();
  const { mutate, isPending } = useCreatePayment();
  const studentId = useStudentId();

  const form = useForm<z.infer<typeof createPaymentSchema>>({
    resolver: zodResolver(createPaymentSchema),
    defaultValues: {},
  });

  const [calculated, setCalculated] = useState(false);

  const handleCalculate = () => {
    form.setValue("studentId", studentId);
    const discountPrice = form.getValues("discountPrice");

    const totalFee = form.getValues("totalFee");

    if (discountPrice) {
      form.setValue(
        "discountPercent",
        ((discountPrice / (totalFee ?? 0)) * 100).toFixed(
          2
        ) as unknown as number
      );
    } else {
      form.setValue("discountPercent", 0);
    }

    if (discountPrice) {
      form.setValue("totalFeeAfterDiscount", (totalFee ?? 0) - discountPrice);
    } else {
      form.setValue("totalFeeAfterDiscount", totalFee);
    }

    const totalFeeAfterDiscount = form.getValues("totalFeeAfterDiscount");

    form.setValue("taxableAmount", totalFeeAfterDiscount / 1.13);
    const taxableAmount = form.getValues("taxableAmount");

    form.setValue("vatAmount", vatCalculate(taxableAmount));

    setCalculated(true);
  };

  const onSubmit = (values: z.infer<typeof createPaymentSchema>) => {
    const finalValues = {
      ...values,
    };

    mutate(
      { json: finalValues },
      {
        onSuccess: () => {
          setCalculated(false);
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
            className="flex flex-col gap-8 my-2 "
          >
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <FormField
                control={form.control}
                name="totalFee"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Total Fee</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="number"
                        placeholder=" e.g. 18500"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        value={field.value ?? undefined}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discountPrice"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Discount Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Rs. 00.00"
                        {...field}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        disabled={!form.watch("totalFee") || isPending}
                      />
                    </FormControl>
                    {/* <FormMessage /> */}
                  </FormItem>
                )}
              />

              <Button
                type="button"
                disabled={!form.watch("totalFee") || isPending}
                onClick={handleCalculate}
              >
                Calculate
              </Button>
            </div>

            {calculated && (
              <Card className="shadow-none border-none ">
                <Separator />
                <CardHeader className="px-0">
                  <CardTitle className="font-space text-lg">
                    {" "}
                    Payment Summary
                  </CardTitle>
                </CardHeader>

                <div className=" font-space flex flex-col ">
                  <div className="flex justify-between font-bold items-center ">
                    <p className="  ">Total Fee:</p>
                    <p className="">
                      {currencyFormatter(form.getValues("totalFee"))}
                    </p>
                  </div>
                  <div className="flex justify-between items-center ">
                    <p className="">
                      Discount Price({form.getValues("discountPercent")}%):
                    </p>
                    <p
                      className={cn(
                        form.getValues("discountPrice") && "text-emerald-500"
                      )}
                    >
                      - {currencyFormatter(form.getValues("discountPrice"))}
                    </p>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between items-center  font-bold  ">
                    <p className="font-lg">Total Fee After Discount:</p>
                    <p>
                      {currencyFormatter(
                        form.getValues("totalFeeAfterDiscount")
                      )}
                    </p>
                  </div>

                  <div className="flex justify-between items-center  ">
                    <p className="font-lg">Taxable Amount:</p>
                    <p>{currencyFormatter(form.getValues("taxableAmount"))}</p>
                  </div>

                  <div className="flex justify-between items-center  ">
                    <p className="">VAT(13%):</p>
                    <p
                      className={cn(
                        form.getValues("vatAmount") && "text-rose-500"
                      )}
                    >
                      +{currencyFormatter(form.getValues("vatAmount"))}
                    </p>
                  </div>

                  <Separator className="my-2" />

                  <div className="flex justify-between items-center  font-bold  ">
                    <p className="">Total Amount:</p>
                    <p>
                      {currencyFormatter(
                        form.getValues("taxableAmount") +
                          form.getValues("vatAmount")
                      )}
                    </p>
                  </div>
                </div>
                {form.getValues("totalFee") && (
                  <div className="">
                    <FormField
                      control={form.control}
                      name="paidAmount"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Fee Paid Amount:</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Enter amount paid Rs.00.00"
                              {...field}
                              onChange={(e) =>
                                field.onChange(e.target.valueAsNumber)
                              }
                              value={field.value ?? undefined}
                              disabled={!form.watch("totalFee") || isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </Card>
            )}

            <div className="flex items-center  gap-4 ">
              <Button
                variant={"outline"}
                type="button"
                className={cn("flex-1 shadow-none")}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isPending} className="flex-1">
                <ButtonLoader
                  label="create payment"
                  loadingText="creating"
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
