"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { studentSchema } from "@/schema";

import { useGetBranches } from "@/features/branches/api/use-get-branches";
import { LeadDetailType } from "@/types";
import { Gender } from "@/generated/prisma/browser";
import { snakeCaseToTitleCase } from "@/lib/utils";

import { Banknote, GraduationCap, MapPin } from "lucide-react";
import { BranchProgramMultiSelect } from "./branch-program-multi-select";
import { Button } from "@/components/ui/button";
import { PaymentField } from "./payment-filed";
import { useCreateStudent } from "../api/use-create-student";
import { ButtonLoader } from "@/components/global/button-loader";
import { useRouter } from "next/navigation";
import { DatePicker } from "@/components/global/date-picker";

interface CreateStudentProps {
  lead?: LeadDetailType;
}

export const CreateStudentForm = ({ lead }: CreateStudentProps) => {
  const router = useRouter();

  const { data: branches } = useGetBranches();
  const { mutate: createStudent, isPending } = useCreateStudent();

  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
  });

  const branchId = form.watch("branchId");
  const selectedPrograms = form.watch("enrolledPrograms") || [];
  console.log(form.getValues());

  useEffect(() => {
    if (lead) {
      form.reset({
        name: lead.studentName ?? "",
        number: lead.number ?? "",
        parentName: lead.parentName ?? "",
        email: lead.email ?? "",
        schoolName: lead.schoolName ?? "",
        address: lead.address ?? "",
        grade: lead.grade ?? "",
        gender: lead.gender ?? undefined,
        enrolledPrograms: [],
        branchId: lead.branchId ?? "",
        age: lead.age ? lead.age : 0,
      });
    }
  }, [lead, form]);

  const onSubmit = (values: z.infer<typeof studentSchema>) => {
    console.log("Submitting form with values:", values);
    createStudent(
      { json: values },
      {
        onSuccess({ data }) {
          form.reset();
          router.push(`/students/${data.id}`);
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form
        action=""
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-6 pb-8"
      >
        <Card className="md:min-w-xs  max-w-4xl mx-auto shadow-none">
          <CardHeader className="text-center ">
            <CardTitle className="font-semibold text-xl ">
              Create Your Student Account
            </CardTitle>
            <CardDescription>
              This quick registration step ensures you receive your unique
              student ID and personalized account credentials.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <h2 className="font-semibold text-accent-foreground text-xl font-space">
              Parent Information
            </h2>

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="parentName"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter a Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-2">
                    <FormLabel> Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isPending}
                        placeholder="Enter a email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Phone No.</FormLabel>
                    <FormControl>
                      <Input
                        required
                        maxLength={10}
                        disabled={isPending}
                        placeholder="Enter a phone number"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="secondaryNumber"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Secondary Phone No.</FormLabel>
                    <FormControl>
                      <Input
                        required
                        maxLength={10}
                        disabled={isPending}
                        placeholder="Enter a  phone number"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Separator className="my-2" />
            <h2 className="font-semibold text-accent-foreground text-xl font-space">
              Student Information
            </h2>

            <div className="flex flex-col md:flex-row gap-4 w-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter a name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="schoolName"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> School Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter a  school name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex  gap-4 w-full">
              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Age</FormLabel>
                    <FormControl>
                      <Input
                        min={1}
                        disabled={isPending}
                        placeholder="Enter age"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Gender</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a Status " />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.values(Gender).map((gender, idx) => (
                            <SelectItem key={idx} value={gender}>
                              {snakeCaseToTitleCase(gender)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel>Grade</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter a grade"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="Enter a address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <FormField
                control={form.control}
                name="joinedDate"
                render={({ field }) => (
                  <FormItem className="  flex flex-col gap-2 w-full">
                    <FormLabel>Joined Date</FormLabel>
                    <FormControl>
                      <DatePicker {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="attendance"
                render={({ field }) => (
                  <FormItem className=" flex flex-col gap-2 w-full">
                    <FormLabel> Attendance</FormLabel>
                    <FormControl>
                      <Input
                        // type={"number"}
                        disabled={isPending}
                        placeholder="Enter attendance"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="md:min-w-xs  max-w-4xl mx-auto shadow-none">
          <CardHeader className="">
            <CardTitle className="font-bold text-xl font-space flex items-center gap-2 ">
              <MapPin />
              <span className="">Select Branch</span>
            </CardTitle>
            <CardDescription>
              Choose your preferred skilltootr location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="branchId"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a Branch " />
                      </SelectTrigger>
                      <SelectContent>
                        {branches?.map((branch) => (
                          <SelectItem
                            key={branch.id}
                            value={branch.id}
                            className="capitalize"
                          >
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {branchId && (
          <Card className="md:min-w-xs  max-w-4xl mx-auto shadow-none">
            <CardHeader className="">
              <CardTitle className="font-bold text-xl font-space flex items-center gap-2 ">
                <GraduationCap />
                <span className="">Select Program</span>
              </CardTitle>
              <CardDescription>
                Everything looks right! Simply confirm the total amount and
                proceed to secure your spot.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="enrolledPrograms"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <BranchProgramMultiSelect
                        isPending={isPending}
                        branchId={branchId}
                        form={form}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        )}

        {selectedPrograms.length > 0 && (
          <Card className="md:min-w-xs  max-w-4xl mx-auto shadow-none">
            <CardHeader className="">
              <CardTitle className="font-bold text-xl font-space flex items-center gap-2 ">
                <Banknote />
                <span className="">Fee Payment</span>
              </CardTitle>
              <CardDescription>
                Everything looks right! Simply confirm the total amount and
                proceed to secure your spot.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentField form={form} isPending={isPending} />
            </CardContent>
          </Card>
        )}

        <div className="flex justify-end md:min-w-xs  max-w-4xl mx-auto">
          <Button type="submit" disabled={isPending}>
            <ButtonLoader
              isLoading={isPending}
              label={"Create Student"}
              loadingText="Creating"
            />
          </Button>
        </div>
      </form>
    </Form>
  );
};
