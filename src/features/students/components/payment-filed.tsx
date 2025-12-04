"use client";

import { ControllerRenderProps, UseFormReturn } from "react-hook-form";
import z from "zod";

import { studentSchema } from "@/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn, currencyFormatter, vatCalculate } from "@/lib/utils";

type FieldType = ControllerRenderProps<
  z.infer<typeof studentSchema>,
  "enrolledPrograms"
>;

type StudentFormType = z.infer<typeof studentSchema>;

interface Props {
  form: UseFormReturn<StudentFormType>;
  isPending?: boolean;
}

export const PaymentField = ({ form, isPending }: Props) => {
  const totalFee = form.watch("totalFee");

  const handleCalculate = () => {
    const selectedPrograms = form.getValues("enrolledPrograms");
    const programFee = form.getValues("programFee");
    const discountPercent = form.getValues("discountPercent");

    form.setValue(
      "totalFee",
      selectedPrograms.length * (programFee ? programFee : 0)
    );

    const totalFee = form.getValues("totalFee");

    if (discountPercent) {
      form.setValue("discountPrice", (discountPercent * (totalFee ?? 0)) / 100);
    }
    const discountPrice = form.getValues("discountPrice");

    if (discountPrice) {
      form.setValue("totalFeeAfterDiscount", (totalFee ?? 0) - discountPrice);
    } else {
      form.setValue("totalFeeAfterDiscount", totalFee);
    }

    const totalFeeAfterDiscount = form.getValues("totalFeeAfterDiscount");

    form.setValue("taxableAmount", (totalFeeAfterDiscount ?? 0) / 1.13);
    const taxableAmount = form.getValues("taxableAmount");

    form.setValue("vatAmount", vatCalculate(taxableAmount));
  };

  return (
    <div className="">
      <div className="flex gap-4 items-end">
        <FormField
          control={form.control}
          name="programFee"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Program Fee</FormLabel>
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
          name="discountPercent"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Discount Percent</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00%"
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                  // value={field.value ?? 0}
                  disabled={!form.watch("programFee") || isPending}
                />
              </FormControl>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />

        <Button
          type="button"
          disabled={!form.watch("programFee") || isPending}
          onClick={handleCalculate}
        >
          Calculate
        </Button>
      </div>

      {totalFee && (
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
                {currencyFormatter(form.getValues("totalFeeAfterDiscount"))}
              </p>
            </div>

            <div className="flex justify-between items-center  ">
              <p className="font-lg">Taxable Amount:</p>
              <p>{currencyFormatter(form.getValues("taxableAmount"))}</p>
            </div>

            <div className="flex justify-between items-center  ">
              <p className="">VAT(13%):</p>
              <p className={cn(form.getValues("vatAmount") && "text-rose-500")}>
                +{currencyFormatter(form.getValues("vatAmount"))}
              </p>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between items-center  font-bold  ">
              <p className="">Total Amount:</p>
              <p>
                {currencyFormatter(
                  form.getValues("taxableAmount") ??
                    0 + (form.getValues("vatAmount") ?? 0)
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
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                        value={field.value ?? undefined}
                        disabled={!form.watch("programFee") || isPending}
                        required
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
    </div>
  );
};
